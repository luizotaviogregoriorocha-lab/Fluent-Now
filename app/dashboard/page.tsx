"use client";

import Link from "next/link";
import { Play, Mic, Settings, Search, BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, calculateStats, getDueCards } from "@/lib/srs";

export default function DashboardPage() {
    const { preferences, progress, hasCompletedOnboarding } = useUser();
    const router = useRouter();
    const [srsStats, setSrsStats] = useState({ dueToday: 0, totalCards: 0, masteredCards: 0 });

    // Redirect to onboarding if not completed
    useEffect(() => {
        if (!hasCompletedOnboarding) {
            router.push("/onboarding");
            return;
        }

        // Load SRS stats
        const savedCards = localStorage.getItem("fluent_cards");
        if (savedCards) {
            const cards: Card[] = JSON.parse(savedCards);
            const stats = calculateStats(cards);
            setSrsStats(stats);
        }
    }, [hasCompletedOnboarding, router]);

    // Get personalized greeting based on goal
    const getGoalInfo = () => {
        const goalMap: Record<string, { icon: string; title: string; focus: string }> = {
            travel: { icon: "✈️", title: "Viagem & Turismo", focus: "Frases para aeroporto, hotel e direções" },
            business: { icon: "💼", title: "Inglês Corporativo", focus: "Reuniões, emails e networking" },
            casual: { icon: "☕", title: "Conversação Casual", focus: "Filmes, músicas e conversas do dia a dia" },
            academic: { icon: "🎓", title: "Inglês Acadêmico", focus: "Artigos, palestras e intercâmbio" }
        };
        return goalMap[preferences.goal] || goalMap.casual;
    };

    const goalInfo = getGoalInfo();

    // Calculate daily goal progress
    const dailyGoalMinutes = parseInt(preferences.time) || 15;
    const dailyProgress = Math.min((progress.totalMinutes / dailyGoalMinutes) * 100, 100);

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />

            <main className="flex-1 ml-20 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold font-jumper-bold-italic bg-gradient-to-br from-white to-brand-yellow bg-clip-text text-transparent">
                            Olá! 👋
                        </h1>
                        <p className="text-gray-400 font-jumper-thin mt-2">Continue sua jornada de aprendizado</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 min-w-[300px] focus-within:border-brand-yellow focus-within:shadow-[0_4px_24px_rgba(255,215,0,0.2)] transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-transparent border-none outline-none text-white w-full font-jumper-thin placeholder:text-gray-600"
                            />
                        </div>
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange cursor-pointer hover:scale-110 transition-transform shadow-[0_4px_16px_rgba(255,215,0,0.3)]" />
                    </div>
                </header>

                {/* Personalized Goal Card */}
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 mb-8 shadow-2xl">
                    <div className="absolute -top-1/2 -right-[20%] w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[100px] animate-pulse" />

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="text-5xl">{goalInfo.icon}</div>
                        <div>
                            <h2 className="text-2xl font-jumper-bold-italic font-bold">
                                Seu foco: <span className="text-brand-yellow">{goalInfo.title}</span>
                            </h2>
                            <p className="text-gray-400 font-jumper-thin">{goalInfo.focus}</p>
                        </div>
                    </div>

                    {/* Daily Goal Progress */}
                    <div className="mt-6 relative z-10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-jumper-regular text-gray-400">Meta diária: {dailyGoalMinutes} minutos</span>
                            <span className="text-sm font-jumper-bold-italic text-brand-yellow">{Math.round(dailyProgress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-500 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                                style={{ width: `${dailyProgress}% ` }}
                            />
                        </div>
                    </div>

                    <Link href="/learn" className="mt-6 inline-block">
                        <button className="flex items-center gap-3 bg-gradient-to-br from-brand-yellow to-brand-orange text-black px-8 py-4 rounded-xl font-bold font-jumper-regular hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,215,0,0.5)] transition-all">
                            <Play size={20} fill="black" />
                            Continuar lição
                        </button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Sequência" value={progress.streak.toString()} label="dias seguidos" icon="🔥" />
                    <StatCard title="Tempo hoje" value={progress.totalMinutes.toString()} label="minutos praticados" icon="⏱️" />
                    <StatCard title="Precisão" value={`${progress.accuracy}% `} label="na última sessão" icon="🎯" />
                </div>

                {/* Progress & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold font-jumper-regular mb-6">Seu Progresso</h3>
                        <div className="space-y-4">
                            <CourseItem icon={goalInfo.icon} title={goalInfo.title} progress={45} meta={`${progress.lessonsCompleted} lições completadas`} />
                            <CourseItem icon="🎤" title="Prática de Conversação" progress={30} meta="8 sessões de roleplay" />
                            <CourseItem icon="📚" title="Vocabulário Geral" progress={60} meta="120 palavras aprendidas" />
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold font-jumper-regular mb-6">Ações Rápidas</h3>
                        <div className="space-y-3">
                            <ActionButton primary icon={<Play size={18} fill="black" />} label="Revisão Diária" href="/learn" />
                            <ActionButton icon={<Mic size={18} />} label="AI Roleplay" href="/practice" />
                            <ActionButton icon={<BarChart3 size={18} />} label="Ver Estatísticas" href="/dashboard" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, label, icon }: { title: string, value: string, label: string, icon: string }) {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 font-medium font-jumper-regular">{title}</span>
                <span className="text-xl">{icon}</span>
            </div>
            <div className="text-4xl font-bold font-jumper-bold-italic text-brand-yellow mb-2 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">{value}</div>
            <div className="text-sm text-gray-400 font-jumper-thin">{label}</div>
        </div>
    );
}

function CourseItem({ icon, title, progress, meta }: { icon: string, title: string, progress: number, meta: string }) {
    return (
        <div className="flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-yellow hover:translate-x-1 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center text-2xl shadow-[0_4px_16px_rgba(255,215,0,0.3)]">
                {icon}
            </div>
            <div className="flex-1">
                <div className="font-bold font-jumper-regular mb-2">{title}</div>
                <div className="flex gap-4 text-sm text-gray-400 font-jumper-thin">
                    <span>{meta}</span>
                    <span>•</span>
                    <span>{progress}% completo</span>
                </div>
            </div>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-500 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                    style={{ width: `${progress}% ` }}
                />
            </div>
        </div>
    );
}

function ActionButton({ icon, label, href, primary = false }: { icon: React.ReactNode, label: string, href: string, primary?: boolean }) {
    return (
        <Link href={href}>
            <div className={`w - full p - 5 rounded - 2xl flex items - center gap - 3 font - bold font - jumper - regular transition - all hover: translate - x - 1 ${primary
                    ? "bg-gradient-to-br from-brand-yellow to-brand-orange text-black shadow-[0_4px_16px_rgba(255,215,0,0.3)] hover:shadow-[0_8px_24px_rgba(255,215,0,0.5)]"
                    : "bg-white/5 border border-white/10 text-white hover:border-brand-yellow hover:shadow-[0_4px_16px_rgba(255,215,0,0.2)]"
                } `}>
                {icon}
                {label}
            </div>
        </Link>
    );
}
```
