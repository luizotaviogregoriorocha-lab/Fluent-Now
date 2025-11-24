/**
 * AI Voice Roleplay System
 * 
 * Implements conversation scenarios with TTS and STT
 */

export interface Scenario {
    id: string;
    title: string;
    description: string;
    category: 'travel' | 'business' | 'casual' | 'academic';
    level: 'beginner' | 'intermediate' | 'advanced';
    icon: string;
    prompts: ConversationPrompt[];
}

export interface ConversationPrompt {
    ai: string;              // What AI says
    expectedKeywords: string[]; // Keywords to look for in user response
    feedback: {
        good: string;        // Feedback if user response is good
        needsWork: string;   // Feedback if user response needs improvement
    };
}

// ============================================================================
// TRAVEL SCENARIOS
// ============================================================================

const airportCheckIn: Scenario = {
    id: 'airport_checkin',
    title: 'Airport Check-in',
    description: 'Practice checking in for your flight',
    category: 'travel',
    level: 'beginner',
    icon: '✈️',
    prompts: [
        {
            ai: "Good morning! Welcome to the airport. May I see your passport and ticket, please?",
            expectedKeywords: ['here', 'passport', 'ticket', 'please'],
            feedback: {
                good: "Perfect! Your pronunciation was clear.",
                needsWork: "Try speaking a bit louder and clearer."
            }
        },
        {
            ai: "Thank you. Would you like a window seat or an aisle seat?",
            expectedKeywords: ['window', 'aisle', 'seat', 'prefer'],
            feedback: {
                good: "Great! You expressed your preference clearly.",
                needsWork: "Remember to use 'I would like' or 'I prefer'."
            }
        },
        {
            ai: "Perfect. How many bags will you be checking today?",
            expectedKeywords: ['one', 'two', 'bag', 'bags', 'suitcase'],
            feedback: {
                good: "Excellent! Clear and concise.",
                needsWork: "Try to be more specific about the number."
            }
        }
    ]
};

const hotelReservation: Scenario = {
    id: 'hotel_reservation',
    title: 'Hotel Reservation',
    description: 'Book a room at a hotel',
    category: 'travel',
    level: 'intermediate',
    icon: '🏨',
    prompts: [
        {
            ai: "Good evening! Welcome to Grand Hotel. How may I assist you today?",
            expectedKeywords: ['reservation', 'book', 'room', 'night'],
            feedback: {
                good: "Wonderful! You stated your needs clearly.",
                needsWork: "Try to include more details about your reservation."
            }
        },
        {
            ai: "Certainly! For how many nights will you be staying?",
            expectedKeywords: ['night', 'nights', 'three', 'two', 'one'],
            feedback: {
                good: "Perfect! Clear communication.",
                needsWork: "Be more specific with the number of nights."
            }
        },
        {
            ai: "Great! Would you prefer a single or double room?",
            expectedKeywords: ['single', 'double', 'prefer', 'like'],
            feedback: {
                good: "Excellent choice! Well expressed.",
                needsWork: "Remember to state your preference clearly."
            }
        }
    ]
};

// ============================================================================
// BUSINESS SCENARIOS
// ============================================================================

const businessMeeting: Scenario = {
    id: 'business_meeting',
    title: 'Business Meeting Introduction',
    description: 'Introduce yourself in a professional setting',
    category: 'business',
    level: 'intermediate',
    icon: '💼',
    prompts: [
        {
            ai: "Good morning! Thank you for joining us today. Could you please introduce yourself?",
            expectedKeywords: ['name', 'work', 'company', 'position'],
            feedback: {
                good: "Excellent introduction! Very professional.",
                needsWork: "Try to include your name and position."
            }
        },
        {
            ai: "Nice to meet you! What brings you to this meeting today?",
            expectedKeywords: ['discuss', 'project', 'collaboration', 'opportunity'],
            feedback: {
                good: "Great! You clearly stated your purpose.",
                needsWork: "Be more specific about your objectives."
            }
        },
        {
            ai: "That sounds interesting! How long have you been working in this field?",
            expectedKeywords: ['years', 'experience', 'working', 'been'],
            feedback: {
                good: "Perfect! Clear and professional response.",
                needsWork: "Try to be more specific about your experience."
            }
        }
    ]
};

const phoneCall: Scenario = {
    id: 'business_phone',
    title: 'Business Phone Call',
    description: 'Handle a professional phone conversation',
    category: 'business',
    level: 'advanced',
    icon: '📞',
    prompts: [
        {
            ai: "Good afternoon, this is Sarah from Tech Solutions. How may I help you?",
            expectedKeywords: ['calling', 'speak', 'regarding', 'about'],
            feedback: {
                good: "Excellent! Very professional phone etiquette.",
                needsWork: "Remember to state your purpose clearly."
            }
        },
        {
            ai: "I see. Let me check on that for you. Could you please hold for a moment?",
            expectedKeywords: ['sure', 'yes', 'okay', 'problem'],
            feedback: {
                good: "Perfect! Polite and professional.",
                needsWork: "A simple 'yes' or 'sure' works well here."
            }
        }
    ]
};

// ============================================================================
// CASUAL SCENARIOS
// ============================================================================

const coffeeShop: Scenario = {
    id: 'coffee_shop',
    title: 'Ordering Coffee',
    description: 'Order your favorite drink at a café',
    category: 'casual',
    level: 'beginner',
    icon: '☕',
    prompts: [
        {
            ai: "Hi there! Welcome to Sunrise Café. What can I get for you today?",
            expectedKeywords: ['coffee', 'latte', 'cappuccino', 'tea', 'please'],
            feedback: {
                good: "Great! You ordered clearly.",
                needsWork: "Try to be more specific about what you want."
            }
        },
        {
            ai: "Sure! What size would you like? Small, medium, or large?",
            expectedKeywords: ['small', 'medium', 'large'],
            feedback: {
                good: "Perfect! Clear choice.",
                needsWork: "Just say the size you want."
            }
        },
        {
            ai: "Would you like that for here or to go?",
            expectedKeywords: ['here', 'go', 'take', 'stay'],
            feedback: {
                good: "Excellent! Well communicated.",
                needsWork: "Say 'for here' or 'to go'."
            }
        }
    ]
};

const makingFriends: Scenario = {
    id: 'making_friends',
    title: 'Making New Friends',
    description: 'Start a casual conversation',
    category: 'casual',
    level: 'intermediate',
    icon: '👋',
    prompts: [
        {
            ai: "Hey! I haven't seen you around here before. Are you new to the area?",
            expectedKeywords: ['yes', 'new', 'moved', 'visiting'],
            feedback: {
                good: "Great! Friendly and natural.",
                needsWork: "Try to add more details about yourself."
            }
        },
        {
            ai: "Cool! Where are you from originally?",
            expectedKeywords: ['from', 'brazil', 'country', 'city'],
            feedback: {
                good: "Perfect! Natural conversation flow.",
                needsWork: "Mention your hometown or country."
            }
        },
        {
            ai: "That's awesome! What do you like to do for fun?",
            expectedKeywords: ['like', 'enjoy', 'love', 'hobby'],
            feedback: {
                good: "Excellent! You shared your interests well.",
                needsWork: "Talk about your hobbies or interests."
            }
        }
    ]
};

// ============================================================================
// ACADEMIC SCENARIOS
// ============================================================================

const classDiscussion: Scenario = {
    id: 'class_discussion',
    title: 'Class Discussion',
    description: 'Participate in an academic discussion',
    category: 'academic',
    level: 'intermediate',
    icon: '🎓',
    prompts: [
        {
            ai: "Good morning, class! Today we're discussing climate change. What are your thoughts on this topic?",
            expectedKeywords: ['think', 'believe', 'important', 'issue'],
            feedback: {
                good: "Excellent! You expressed your opinion clearly.",
                needsWork: "Try to state your opinion more clearly."
            }
        },
        {
            ai: "That's an interesting perspective. Can you elaborate on that?",
            expectedKeywords: ['because', 'example', 'means', 'explain'],
            feedback: {
                good: "Great! You provided good supporting details.",
                needsWork: "Try to give examples or reasons."
            }
        }
    ]
};

const professorMeeting: Scenario = {
    id: 'professor_meeting',
    title: 'Meeting with Professor',
    description: 'Discuss your academic progress',
    category: 'academic',
    level: 'advanced',
    icon: '👨‍🏫',
    prompts: [
        {
            ai: "Hello! Come in. What can I help you with today?",
            expectedKeywords: ['question', 'assignment', 'help', 'discuss'],
            feedback: {
                good: "Perfect! Professional and clear.",
                needsWork: "State your purpose for the meeting."
            }
        },
        {
            ai: "I see. Let's discuss that. What specifically are you struggling with?",
            expectedKeywords: ['understand', 'concept', 'confused', 'difficult'],
            feedback: {
                good: "Excellent! You identified the issue clearly.",
                needsWork: "Be specific about what you don't understand."
            }
        }
    ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const scenarios: Scenario[] = [
    // Travel
    airportCheckIn,
    hotelReservation,

    // Business
    businessMeeting,
    phoneCall,

    // Casual
    coffeeShop,
    makingFriends,

    // Academic
    classDiscussion,
    professorMeeting
];

export function getScenariosByCategory(category: string): Scenario[] {
    return scenarios.filter(s => s.category === category);
}

export function getScenarioById(id: string): Scenario | undefined {
    return scenarios.find(s => s.id === id);
}
