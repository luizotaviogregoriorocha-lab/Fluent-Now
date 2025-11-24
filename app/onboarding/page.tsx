"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import TopBalance from "@/components/TopBalance";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import WheelGame from "@/components/games/WheelGame";
import ScratchCard from "@/components/games/ScratchCard";
import {
    GraduationCap,
    Plane,
    Briefcase,
    Tv,
    Clock,
    Frown,
    Timer,
    ShieldAlert,
    Eye,
    Headphones,
    MessageSquare,
    BookOpen
} from "lucide-react";

const questions = [
    {
        id: "level",
        title: "Qual seu contato atual com o inglês?",
        subtitle: "Seja honesto, vamos personalizar tudo para você",
        options: [
            { id: "zero", label: "Zero", desc: "Nunca estudei", icon: <Frown size={24} /> },
            { id: "basic", label: "Básico", desc: "Sei algumas palavras", icon: <GraduationCap size={24} /> },
            { id: "intermediate", label: "Intermediário", desc: "Travado no intermediário", icon: <BookOpen size={24} /> },
            { id: "advanced", label: "Avançado", desc: "Quero fluência total", icon: <Plane size={24} /> },
        ]
    },
    {
        id: "goal",
        title: "Por que você precisa ser fluente?",
        subtitle: "Vamos focar no que realmente importa para você",
        options: [
            { id: "travel", label: "Viagem", desc: "Explorar o mundo", icon: <Plane size={24} /> },
            { id: "career", label: "Carreira", desc: "Crescimento profissional", icon: <Briefcase size={24} /> },
            { id: "content", label: "Conteúdo", desc: "Filmes, séries, livros", icon: <Tv size={24} /> },
            { id: "personal", label: "Realização", desc: "Desafio pessoal", icon: <GraduationCap size={24} /> },
        ]
    },
    {
        id: "obstacle",
        title: "O que te impediu até hoje?",
        subtitle: "Vamos eliminar esse obstáculo juntos",
        options: [
            { id: "boring", label: "Tédio", desc: "Métodos chatos demais", icon: <Frown size={24} /> },
            { id: "time", label: "Falta de Tempo", desc: "Rotina muito corrida", icon: <Clock size={24} /> },
            { id: "shame", label: "Vergonha", desc: "Medo de errar", icon: <ShieldAlert size={24} /> },
            { id: "method", label: "Método Errado", desc: "Nunca funcionou", icon: <Timer size={24} /> },
        ]
    },
    {
        id: "learningStyle",
        title: "Como você aprende melhor?",
        subtitle: "Vamos adaptar o conteúdo ao seu estilo",
        options: [
            { id: "visual", label: "Visual", desc: "Vídeos e imagens", icon: <Eye size={24} /> },
            { id: "audio", label: "Ouvindo", desc: "Podcasts e músicas", icon: <Headphones size={24} /> },
            { id: "practice", label: "Praticando", desc: "Conversação real", icon: <MessageSquare size={24} /> },
            { id: "reading", label: "Lendo", desc: "Textos e artigos", icon: <BookOpen size={24} /> },
        ]
    },
    {
        id: "time",
        title: "Quanto tempo você tem por dia?",
        subtitle: "Seja realista, consistência é mais importante",
        options: [
            { id: "5", label: "5 minutos", desc: "Rápido e constante", icon: <Clock size={24} /> },
            { id: "15", label: "15 minutos", desc: "Ritmo ideal", icon: <Clock size={24} /> },
            { id: "30", label: "30 minutos", desc: "Imersão diária", icon: <Clock size={24} /> },
            { id: "60", label: "1 hora", desc: "Dedicação total", icon: <Clock size={24} /> },
        ]
    }
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showGame, setShowGame] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const { progress, setPreferences, addPoints, completeOnboarding } = useUser();
    const router = useRouter();

    const currentQuestion = questions[step];
    const totalSteps = questions.length + 1; // +1 for game
    const isLastQuestion = step === questions.length - 1;

    const handleSelect = (value: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // Show game before finishing
            setShowGame(true);
        } else {
            setStep(prev => prev + 1);
        }
    };

    const handleGameComplete = (points: number) => {
        addPoints(points);
        finishOnboarding();
    };

    const finishOnboarding = () => {
        setIsGenerating(true);

        // Save preferences
        setTimeout(() => {
            setPreferences({
                level: answers.level || "",
                goal: answers.goal || "",
                time: answers.time || "",
                obstacle: answers.obstacle,
                learningStyle: answers.learningStyle,
            });

            completeOnboarding();
            router.push("/dashboard");
        }, 3000);
    };

    const canProceed = answers[currentQuestion?.id];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Top Balance */}
            <TopBalance points={progress.points} />

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 py-20">
                <AnimatePresence mode="wait">
                    {isGenerating ? (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-8 relative">
                                <div className="absolute inset-0 border-4 border-border rounded-full" />
                                <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Criando seu plano...</h2>
                            <p className="text-textSecondary">Nossa IA está personalizando sua experiência</p>
                        </motion.div>
                    ) : showGame ? (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {step % 2 === 0 ? (
                                <WheelGame onComplete={handleGameComplete} />
                            ) : (
                                <ScratchCard onComplete={handleGameComplete} />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Progress */}
                            <ProgressBar current={step + 1} total={totalSteps} />

                            {/* Question */}
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                                    {currentQuestion.title}
                                </h1>
                                <p className="text-textSecondary text-lg">
                                    {currentQuestion.subtitle}
                                </p>
                            </div>

                            {/* Options */}
                            <div className={`grid gap-4 mb-12 ${currentQuestion.options.length === 4
                                    ? "grid-cols-1 md:grid-cols-2"
                                    : "grid-cols-1"
                                }`}>
                                {currentQuestion.options.map((option) => (
                                    <QuizCard
                                        key={option.id}
                                        icon={option.icon}
                                        label={option.label}
                                        description={option.desc}
                                        selected={answers[currentQuestion.id] === option.id}
                                        onClick={() => handleSelect(option.id)}
                                        layout={currentQuestion.options.length === 4 ? "vertical" : "horizontal"}
                                    />
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => setStep(prev => prev - 1)}
                                    disabled={step === 0}
                                    className="text-textSecondary hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    ← Voltar
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed}
                                    className={`px-8 py-4 rounded-full font-bold transition-all ${canProceed
                                            ? "bg-brand text-black hover:scale-105 active:scale-95"
                                            : "bg-surface text-textSecondary cursor-not-allowed"
                                        }`}
                                >
                                    {isLastQuestion ? "Finalizar" : "Continuar"} →
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
