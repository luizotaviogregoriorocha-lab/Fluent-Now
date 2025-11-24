"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { scenarios, getScenariosByCategory, Scenario, ConversationPrompt } from "@/data/scenarios";
import { Mic, MicOff, Volume2, RotateCcw, Check } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function PracticePage() {
    const router = useRouter();
    const { preferences, hasCompletedOnboarding } = useUser();

    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [userTranscript, setUserTranscript] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [conversationComplete, setConversationComplete] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (!hasCompletedOnboarding) {
            router.push("/onboarding");
            return;
        }

        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setUserTranscript(transcript);
                setIsListening(false);
                evaluateResponse(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [hasCompletedOnboarding, router]);

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setUserTranscript("");
            setFeedback(null);
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const evaluateResponse = (transcript: string) => {
        if (!selectedScenario) return;

        const currentPrompt = selectedScenario.prompts[currentPromptIndex];
        const lowerTranscript = transcript.toLowerCase();

        // Check if transcript contains expected keywords
        const matchedKeywords = currentPrompt.expectedKeywords.filter(keyword =>
            lowerTranscript.includes(keyword.toLowerCase())
        );

        const isGoodResponse = matchedKeywords.length >= Math.ceil(currentPrompt.expectedKeywords.length / 2);

        setFeedback(isGoodResponse ? currentPrompt.feedback.good : currentPrompt.feedback.needsWork);
    };

    const handleNext = () => {
        if (!selectedScenario) return;

        if (currentPromptIndex < selectedScenario.prompts.length - 1) {
            setCurrentPromptIndex(currentPromptIndex + 1);
            setUserTranscript("");
            setFeedback(null);

            // Speak next prompt
            setTimeout(() => {
                speakText(selectedScenario.prompts[currentPromptIndex + 1].ai);
            }, 500);
        } else {
            setConversationComplete(true);
        }
    };

    const resetConversation = () => {
        setCurrentPromptIndex(0);
        setUserTranscript("");
        setFeedback(null);
        setConversationComplete(false);

        if (selectedScenario) {
            setTimeout(() => {
                speakText(selectedScenario.prompts[0].ai);
            }, 500);
        }
    };

    const selectScenario = (scenario: Scenario) => {
        setSelectedScenario(scenario);
        setCurrentPromptIndex(0);
        setUserTranscript("");
        setFeedback(null);
        setConversationComplete(false);

        // Speak first prompt
        setTimeout(() => {
            speakText(scenario.prompts[0].ai);
        }, 500);
    };

    if (!hasCompletedOnboarding) {
        return null;
    }

    // Scenario selection screen
    if (!selectedScenario) {
        const userScenarios = getScenariosByCategory(preferences.goal);

        return (
            <div className="flex min-h-screen w-full bg-brand-black">
                <Sidebar />

                <main className="flex-1 ml-20 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-10">
                            <h1 className="text-4xl font-jumper-bold-italic font-bold mb-4">
                                AI Roleplay 🎤
                            </h1>
                            <p className="text-gray-400 font-jumper-thin">
                                Pratique conversação com IA usando sua voz. Escolha um cenário abaixo:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userScenarios.map(scenario => (
                                <div
                                    key={scenario.id}
                                    onClick={() => selectScenario(scenario)}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 cursor-pointer hover:border-brand-yellow hover:-translate-y-1 transition-all group"
                                >
                                    <div className="text-5xl mb-4">{scenario.icon}</div>
                                    <h3 className="text-xl font-jumper-bold-italic font-bold mb-2 group-hover:text-brand-yellow transition-colors">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-gray-400 font-jumper-thin text-sm mb-4">
                                        {scenario.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-brand-yellow/20 text-brand-yellow px-3 py-1 rounded-full font-jumper-regular">
                                            {scenario.level}
                                        </span>
                                        <span className="text-xs text-gray-500 font-jumper-thin">
                                            {scenario.prompts.length} prompts
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {userScenarios.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🎭</div>
                                <p className="text-gray-400 font-jumper-thin">
                                    Nenhum cenário disponível para sua categoria ainda.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }

    // Conversation complete screen
    if (conversationComplete) {
        return (
            <div className="flex min-h-screen w-full bg-brand-black">
                <Sidebar />

                <main className="flex-1 ml-20 p-8 flex items-center justify-center">
                    <div className="max-w-2xl w-full text-center">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                            <div className="text-6xl mb-6">🎉</div>
                            <h1 className="text-4xl font-jumper-bold-italic font-bold mb-4">
                                Conversa Completa!
                            </h1>
                            <p className="text-gray-400 font-jumper-thin mb-8">
                                Você completou o cenário "{selectedScenario.title}"
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={resetConversation}
                                    className="flex items-center gap-2 bg-gradient-to-br from-brand-yellow to-brand-orange text-black px-8 py-4 rounded-xl font-bold font-jumper-regular hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,215,0,0.5)] transition-all"
                                >
                                    <RotateCcw size={20} />
                                    Tentar Novamente
                                </button>
                                <button
                                    onClick={() => setSelectedScenario(null)}
                                    className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold font-jumper-regular hover:border-brand-yellow transition-all"
                                >
                                    Escolher Outro Cenário
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Active conversation screen
    const currentPrompt = selectedScenario.prompts[currentPromptIndex];

    return (
        <div className="flex min-h-screen w-full bg-brand-black">
            <Sidebar />

            <main className="flex-1 ml-20 p-8">
                {/* Progress */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-jumper-regular text-gray-400">
                            {selectedScenario.title} - Prompt {currentPromptIndex + 1} de {selectedScenario.prompts.length}
                        </span>
                        <button
                            onClick={() => setSelectedScenario(null)}
                            className="text-sm text-gray-400 hover:text-brand-yellow transition-colors font-jumper-thin"
                        >
                            Voltar
                        </button>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-300"
                            style={{ width: `${((currentPromptIndex + 1) / selectedScenario.prompts.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Conversation */}
                <div className="max-w-4xl mx-auto">
                    {/* AI Message */}
                    <div className="mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center text-2xl flex-shrink-0">
                                🤖
                            </div>
                            <div className="flex-1">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rounded-tl-none p-6">
                                    <p className="text-lg font-jumper-regular mb-4">
                                        {currentPrompt.ai}
                                    </p>
                                    <button
                                        onClick={() => speakText(currentPrompt.ai)}
                                        className="flex items-center gap-2 text-brand-yellow hover:text-brand-yellow/80 transition-colors font-jumper-thin text-sm"
                                    >
                                        <Volume2 size={16} />
                                        Ouvir novamente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Response Area */}
                    <div className="mb-8">
                        <div className="flex items-start gap-4 flex-row-reverse">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                                👤
                            </div>
                            <div className="flex-1">
                                <div className="bg-brand-yellow/10 backdrop-blur-xl border border-brand-yellow/30 rounded-3xl rounded-tr-none p-6">
                                    {userTranscript ? (
                                        <p className="text-lg font-jumper-regular mb-4">
                                            {userTranscript}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 font-jumper-thin italic">
                                            {isListening ? "Ouvindo..." : "Clique no microfone para responder"}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={isListening ? stopListening : startListening}
                                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isListening
                                                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                                                    : "bg-gradient-to-br from-brand-yellow to-brand-orange hover:scale-110"
                                                }`}
                                        >
                                            {isListening ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-black" />}
                                        </button>

                                        {userTranscript && feedback && (
                                            <button
                                                onClick={handleNext}
                                                className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-6 py-3 rounded-xl font-bold font-jumper-regular transition-all"
                                            >
                                                <Check size={20} />
                                                Próximo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">💬</div>
                                <div>
                                    <h4 className="font-jumper-bold-italic font-bold mb-2">Feedback</h4>
                                    <p className="text-gray-300 font-jumper-thin">{feedback}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
