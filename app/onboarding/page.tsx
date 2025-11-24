"use client";

import React, { useState } from "react";
import { ArrowRight, Briefcase, Plane, Coffee, GraduationCap, Check, Clock, BarChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";

const goals = [
    { id: "travel", icon: Plane, label: "Viagem", desc: "Aeroporto, hotel, direções" },
    { id: "business", icon: Briefcase, label: "Carreira", desc: "Reuniões, emails, networking" },
    { id: "casual", icon: Coffee, label: "Casual", desc: "Filmes, músicas, conversas" },
    { id: "academic", icon: GraduationCap, label: "Estudos", desc: "Artigos, palestras, intercâmbio" },
];

const levels = [
    { id: "beginner", label: "Iniciante", desc: "Sei poucas palavras ou nada" },
    { id: "intermediate", label: "Intermediário", desc: "Consigo manter conversas básicas" },
    { id: "advanced", label: "Avançado", desc: "Entendo bem, quero fluência total" },
];

const times = [
    { id: "5", label: "5 min/dia", desc: "Rápido e constante" },
    { id: "15", label: "15 min/dia", desc: "Ritmo ideal" },
    { id: "30", label: "30 min/dia", desc: "Imersão total" },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [preferences, setPreferencesState] = useState({
        goal: "",
        level: "",
        time: ""
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const { setPreferences, completeOnboarding } = useUser();
    const router = useRouter();

    const handleSelect = (key: string, value: string) => {
        setPreferencesState(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = () => {
        setIsGenerating(true);
        // Simulate AI plan generation
        setTimeout(() => {
            setPreferences(preferences);
            completeOnboarding();
            router.push("/dashboard");
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Progress Bar */}
                <div className="mb-12 flex justify-center gap-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-brand-yellow' : 'w-2 bg-white/10'}`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {isGenerating ? (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 mx-auto mb-8 relative">
                                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                                <div className="absolute inset-0 border-4 border-brand-yellow rounded-full border-t-transparent animate-spin" />
                            </div>
                            <h2 className="text-3xl font-bold font-jumper-bold-italic mb-4">Criando seu plano...</h2>
                            <p className="text-gray-400 font-jumper-thin">Nossa IA está personalizando sua experiência.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 && (
                                <StepContent
                                    title={<span>Qual é o seu <span className="text-brand-yellow">foco principal</span>?</span>}
                                    subtitle="Vamos personalizar suas lições e conversas com IA baseadas nisso."
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {goals.map((goal) => (
                                            <OptionCard
                                                key={goal.id}
                                                selected={preferences.goal === goal.id}
                                                onClick={() => handleSelect("goal", goal.id)}
                                                icon={<goal.icon size={24} />}
                                                label={goal.label}
                                                desc={goal.desc}
                                            />
                                        ))}
                                    </div>
                                </StepContent>
                            )}

                            {step === 2 && (
                                <StepContent
                                    title={<span>Qual seu <span className="text-brand-yellow">nível atual</span>?</span>}
                                    subtitle="Para ajustarmos a dificuldade das conversas."
                                >
                                    <div className="space-y-4">
                                        {levels.map((level) => (
                                            <OptionCard
                                                key={level.id}
                                                selected={preferences.level === level.id}
                                                onClick={() => handleSelect("level", level.id)}
                                                icon={<BarChart size={24} />}
                                                label={level.label}
                                                desc={level.desc}
                                                horizontal
                                            />
                                        ))}
                                    </div>
                                </StepContent>
                            )}

                            {step === 3 && (
                                <StepContent
                                    title={<span>Quanto <span className="text-brand-yellow">tempo</span> você tem?</span>}
                                    subtitle="Defina sua meta diária de prática."
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {times.map((time) => (
                                            <OptionCard
                                                key={time.id}
                                                selected={preferences.time === time.id}
                                                onClick={() => handleSelect("time", time.id)}
                                                icon={<Clock size={24} />}
                                                label={time.label}
                                                desc={time.desc}
                                                centered
                                            />
                                        ))}
                                    </div>
                                </StepContent>
                            )}

                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={handleNext}
                                    disabled={(step === 1 && !preferences.goal) || (step === 2 && !preferences.level) || (step === 3 && !preferences.time)}
                                    className={`px-8 py-4 rounded-xl font-bold font-jumper-regular text-lg flex items-center gap-3 transition-all ${((step === 1 && preferences.goal) || (step === 2 && preferences.level) || (step === 3 && preferences.time))
                                        ? 'bg-gradient-to-br from-brand-yellow to-brand-orange text-black hover:scale-105 shadow-[0_4px_20px_rgba(255,215,0,0.3)]'
                                        : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                                        }`}
                                >
                                    {step === 3 ? "Finalizar" : "Continuar"} <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

function StepContent({ title, subtitle, children }: { title: React.ReactNode, subtitle: string, children: React.ReactNode }) {
    return (
        <div>
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-jumper-bold-italic mb-4">{title}</h1>
                <p className="text-gray-400 font-jumper-thin text-lg">{subtitle}</p>
            </div>
            {children}
        </div>
    );
}

function OptionCard({ selected, onClick, icon, label, desc, horizontal = false, centered = false }: any) {
    return (
        <button
            onClick={onClick}
            className={`group relative overflow-hidden transition-all duration-300 ${horizontal ? 'w-full flex items-center text-left p-6' : centered ? 'flex flex-col items-center text-center p-8' : 'flex items-center text-left p-6'
                } rounded-2xl border ${selected
                    ? 'bg-brand-yellow/10 border-brand-yellow shadow-[0_0_30px_rgba(255,215,0,0.1)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
        >
            <div className={`rounded-2xl flex items-center justify-center transition-colors ${horizontal ? 'w-12 h-12 mr-6' : centered ? 'w-14 h-14 mb-4' : 'w-12 h-12 mr-4'
                } ${selected ? 'bg-brand-yellow text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                {icon}
            </div>

            <div className="flex-1">
                <h3 className={`font-bold font-jumper-regular text-lg mb-1 ${selected ? 'text-brand-yellow' : 'text-white'}`}>{label}</h3>
                <p className="text-sm text-gray-400 font-jumper-thin">{desc}</p>
            </div>

            {selected && (
                <div className={`absolute ${horizontal ? 'right-6' : 'top-4 right-4'} w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center`}>
                    <Check size={14} className="text-black" />
                </div>
            )}
        </button>
    );
}
