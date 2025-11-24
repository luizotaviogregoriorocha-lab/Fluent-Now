"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Card, calculateNextReview, generateSession, calculateStats } from "@/lib/srs";
import { initializeCards } from "@/data/phrases";
import { Volume2, RotateCcw, Check, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function LearnPage() {
    const router = useRouter();
    const { preferences, progress, setProgress, hasCompletedOnboarding } = useUser();

    const [cards, setCards] = useState<Card[]>([]);
    const [sessionCards, setSessionCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [stats, setStats] = useState({ correct: 0, total: 0 });

    // Initialize cards on mount
    useEffect(() => {
        if (!hasCompletedOnboarding) {
            router.push("/onboarding");
            return;
        }

        // Load cards from localStorage or initialize new ones
        const savedCards = localStorage.getItem("fluent_cards");
        let userCards: Card[];

        if (savedCards) {
            userCards = JSON.parse(savedCards);
        } else {
            // Initialize cards based on user preferences
            userCards = initializeCards(
                preferences.goal as any,
                preferences.level as any
            );
            localStorage.setItem("fluent_cards", JSON.stringify(userCards));
        }

        setCards(userCards);

        // Generate session
        const session = generateSession(
            userCards,
            parseInt(preferences.time),
            { goal: preferences.goal, level: preferences.level }
        );
        setSessionCards(session);
    }, [hasCompletedOnboarding, preferences, router]);

    const currentCard = sessionCards[currentIndex];

    const handleReveal = () => {
        setShowTranslation(true);
    };

    const handleResponse = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
        if (!currentCard) return;

        // Update card with SRS algorithm
        const updatedCard = calculateNextReview(currentCard, quality);

        // Update cards array
        const newCards = cards.map(c =>
            c.id === updatedCard.id ? updatedCard : c
        );
        setCards(newCards);
        localStorage.setItem("fluent_cards", JSON.stringify(newCards));

        // Update stats
        const isCorrect = quality >= 3;
        setStats(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));

        // Update progress
        const newProgress = {
            ...progress,
            lessonsCompleted: progress.lessonsCompleted + 1,
            totalMinutes: progress.totalMinutes + 0.5, // ~30 seconds per card
            accuracy: Math.round(((stats.correct + (isCorrect ? 1 : 0)) / (stats.total + 1)) * 100),
            xp: progress.xp + (isCorrect ? 10 : 5)
        };
        setProgress(newProgress);

        // Move to next card
        if (currentIndex < sessionCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowTranslation(false);
        } else {
            setSessionComplete(true);

            // Update streak
            const today = new Date().toDateString();
            const lastStudy = localStorage.getItem("last_study_date");

            if (lastStudy !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastStudy === yesterday.toDateString()) {
                    newProgress.streak += 1;
                } else {
                    newProgress.streak = 1;
                }

                localStorage.setItem("last_study_date", today);
                setProgress(newProgress);
            }
        }
    };

    const speakPhrase = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    if (!hasCompletedOnboarding) {
        return null;
    }

    if (sessionComplete) {
        const accuracy = Math.round((stats.correct / stats.total) * 100);
        const cardStats = calculateStats(cards);

        return (
            <div className="flex min-h-screen w-full bg-brand-black">
                <Sidebar />

                <main className="flex-1 ml-20 p-8 flex items-center justify-center">
                    <div className="max-w-2xl w-full text-center">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                            <div className="text-6xl mb-6">🎉</div>
                            <h1 className="text-4xl font-jumper-bold-italic font-bold mb-4">
                                Sessão Completa!
                            </h1>
                            <p className="text-gray-400 font-jumper-thin mb-8">
                                Você completou {stats.total} cards com {accuracy}% de precisão
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-2">
                                        {stats.correct}/{stats.total}
                                    </div>
                                    <div className="text-sm text-gray-400 font-jumper-thin">Acertos</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-2">
                                        +{stats.correct * 10 + (stats.total - stats.correct) * 5}
                                    </div>
                                    <div className="text-sm text-gray-400 font-jumper-thin">XP Ganho</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-2">
                                        {cardStats.dueToday}
                                    </div>
                                    <div className="text-sm text-gray-400 font-jumper-thin">Cards Restantes</div>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 bg-gradient-to-br from-brand-yellow to-brand-orange text-black px-8 py-4 rounded-xl font-bold font-jumper-regular hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,215,0,0.5)] transition-all"
                                >
                                    <RotateCcw size={20} />
                                    Nova Sessão
                                </button>
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold font-jumper-regular hover:border-brand-yellow transition-all"
                                >
                                    Voltar ao Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!currentCard) {
        return (
            <div className="flex min-h-screen w-full bg-brand-black">
                <Sidebar />
                <main className="flex-1 ml-20 p-8 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h2 className="text-2xl font-jumper-bold-italic mb-4">Carregando...</h2>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-brand-black">
            <Sidebar />

            <main className="flex-1 ml-20 p-8">
                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-jumper-regular text-gray-400">
                            Card {currentIndex + 1} de {sessionCards.length}
                        </span>
                        <span className="text-sm font-jumper-bold-italic text-brand-yellow">
                            {Math.round(((currentIndex + 1) / sessionCards.length) * 100)}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-300"
                            style={{ width: `${((currentIndex + 1) / sessionCards.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Flashcard */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center">
                            {/* Front of card */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <h2 className="text-4xl font-jumper-bold-italic font-bold">
                                        {currentCard.phrase}
                                    </h2>
                                    <button
                                        onClick={() => speakPhrase(currentCard.phrase)}
                                        className="w-12 h-12 rounded-full bg-brand-yellow/20 hover:bg-brand-yellow/30 flex items-center justify-center transition-all"
                                    >
                                        <Volume2 size={20} className="text-brand-yellow" />
                                    </button>
                                </div>

                                {showTranslation && (
                                    <div className="text-2xl text-gray-400 font-jumper-thin animate-fade-in">
                                        {currentCard.translation}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            {!showTranslation ? (
                                <button
                                    onClick={handleReveal}
                                    className="bg-gradient-to-br from-brand-yellow to-brand-orange text-black px-8 py-4 rounded-xl font-bold font-jumper-regular hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,215,0,0.5)] transition-all"
                                >
                                    Revelar Tradução
                                </button>
                            ) : (
                                <div className="space-y-4 w-full max-w-md">
                                    <p className="text-center text-gray-400 font-jumper-thin mb-4">
                                        Como foi sua resposta?
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleResponse(5)}
                                            className="flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl font-bold font-jumper-regular transition-all"
                                        >
                                            <Check size={20} />
                                            Fácil
                                        </button>
                                        <button
                                            onClick={() => handleResponse(4)}
                                            className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 px-6 py-4 rounded-xl font-bold font-jumper-regular transition-all"
                                        >
                                            <Check size={20} />
                                            Bom
                                        </button>
                                        <button
                                            onClick={() => handleResponse(3)}
                                            className="flex items-center justify-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 px-6 py-4 rounded-xl font-bold font-jumper-regular transition-all"
                                        >
                                            <Check size={20} />
                                            Difícil
                                        </button>
                                        <button
                                            onClick={() => handleResponse(1)}
                                            className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl font-bold font-jumper-regular transition-all"
                                        >
                                            <X size={20} />
                                            Esqueci
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
