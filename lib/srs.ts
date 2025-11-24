/**
 * Spaced Repetition System (SRS) - SuperMemo-2 Algorithm
 * 
 * This implements a simplified version of the SM-2 algorithm for optimal
 * learning intervals based on user performance.
 */

export interface Card {
    id: string;
    phrase: string;
    translation: string;
    category: 'travel' | 'business' | 'casual' | 'academic';
    level: 'beginner' | 'intermediate' | 'advanced';

    // SRS Data
    interval: number;        // Days until next review
    repetitions: number;     // Number of successful reviews
    easeFactor: number;      // Difficulty multiplier (1.3 - 2.5)
    nextReview: Date;        // Next review date
    lastReviewed?: Date;     // Last review date
}

export interface ReviewResult {
    cardId: string;
    quality: 0 | 1 | 2 | 3 | 4 | 5; // 0-5 quality rating
    timestamp: Date;
}

/**
 * Calculate next review interval based on SM-2 algorithm
 * 
 * @param card - The flashcard being reviewed
 * @param quality - User's performance (0-5)
 *   0-1: Complete blackout, incorrect response
 *   2: Incorrect response, but correct answer seemed familiar
 *   3: Correct response, but required significant effort
 *   4: Correct response, after some hesitation
 *   5: Perfect response, immediate recall
 * 
 * @returns Updated card with new SRS values
 */
export function calculateNextReview(card: Card, quality: 0 | 1 | 2 | 3 | 4 | 5): Card {
    let { interval, repetitions, easeFactor } = card;

    // If quality < 3, reset the card (user forgot)
    if (quality < 3) {
        repetitions = 0;
        interval = 1; // Review again tomorrow
    } else {
        // Successful recall
        if (repetitions === 0) {
            interval = 1; // First review: 1 day
        } else if (repetitions === 1) {
            interval = 6; // Second review: 6 days
        } else {
            // Subsequent reviews: multiply by ease factor
            interval = Math.round(interval * easeFactor);
        }

        repetitions += 1;
    }

    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    // Constrain ease factor between 1.3 and 2.5
    easeFactor = Math.max(1.3, Math.min(2.5, easeFactor));

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
        ...card,
        interval,
        repetitions,
        easeFactor,
        nextReview,
        lastReviewed: new Date()
    };
}

/**
 * Get cards that are due for review
 * 
 * @param cards - All user's cards
 * @returns Cards that should be reviewed today
 */
export function getDueCards(cards: Card[]): Card[] {
    const now = new Date();
    return cards.filter(card => new Date(card.nextReview) <= now);
}

/**
 * Generate a study session based on user preferences
 * 
 * @param cards - All available cards
 * @param timeMinutes - Session duration (5, 15, or 30 minutes)
 * @param preferences - User's learning preferences
 * @returns Array of cards for the session
 */
export function generateSession(
    cards: Card[],
    timeMinutes: number,
    preferences: { goal: string; level: string }
): Card[] {
    // Estimate ~30 seconds per card
    const maxCards = Math.floor((timeMinutes * 60) / 30);

    // Filter cards by user's goal and level
    let filteredCards = cards.filter(card =>
        card.category === preferences.goal &&
        card.level === preferences.level
    );

    // Get due cards first
    const dueCards = getDueCards(filteredCards);

    // If not enough due cards, add new cards
    if (dueCards.length < maxCards) {
        const newCards = filteredCards
            .filter(card => card.repetitions === 0)
            .slice(0, maxCards - dueCards.length);

        return [...dueCards, ...newCards].slice(0, maxCards);
    }

    // Sort by urgency (oldest first)
    return dueCards
        .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())
        .slice(0, maxCards);
}

/**
 * Create a new card with default SRS values
 * 
 * @param phrase - English phrase
 * @param translation - Portuguese translation
 * @param category - Card category
 * @param level - Difficulty level
 * @returns New card object
 */
export function createCard(
    phrase: string,
    translation: string,
    category: Card['category'],
    level: Card['level']
): Card {
    return {
        id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        phrase,
        translation,
        category,
        level,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5, // Default ease factor
        nextReview: new Date(), // Available immediately
    };
}

/**
 * Calculate user statistics from review history
 * 
 * @param cards - All user's cards
 * @returns Statistics object
 */
export function calculateStats(cards: Card[]) {
    const totalCards = cards.length;
    const reviewedCards = cards.filter(c => c.repetitions > 0).length;
    const masteredCards = cards.filter(c => c.repetitions >= 5).length;

    const dueToday = getDueCards(cards).length;

    // Calculate average accuracy (based on ease factor)
    const avgEaseFactor = cards.reduce((sum, card) => sum + card.easeFactor, 0) / totalCards;
    const accuracy = Math.round(((avgEaseFactor - 1.3) / (2.5 - 1.3)) * 100);

    return {
        totalCards,
        reviewedCards,
        masteredCards,
        dueToday,
        accuracy: isNaN(accuracy) ? 0 : accuracy,
        completionRate: Math.round((reviewedCards / totalCards) * 100)
    };
}
