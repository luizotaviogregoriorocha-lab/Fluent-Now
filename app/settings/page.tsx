"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Settings as SettingsIcon, Trash2, Download, Upload, LogOut } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
    const router = useRouter();
    const { preferences, progress, setPreferences, setProgress, completeOnboarding } = useUser();
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleResetProgress = () => {
        const newProgress = {
            streak: 0,
            totalMinutes: 0,
            accuracy: 0,
            xp: 0,
            lessonsCompleted: 0
        };
        setProgress(newProgress);
        localStorage.removeItem("fluent_cards");
        localStorage.removeItem("last_study_date");
        setShowResetConfirm(false);
        alert("Progresso resetado com sucesso!");
    };

    const handleExportData = () => {
        const data = {
            preferences,
            progress,
            cards: localStorage.getItem("fluent_cards"),
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fluent-now-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);

                if (data.preferences) setPreferences(data.preferences);
                if (data.progress) setProgress(data.progress);
                if (data.cards) localStorage.setItem("fluent_cards", data.cards);

                alert("Dados importados com sucesso!");
                window.location.reload();
            } catch (error) {
                alert("Erro ao importar dados. Verifique o arquivo.");
            }
        };
        reader.readAsText(file);
    };

    const handleRestartOnboarding = () => {
        localStorage.removeItem("fluent_onboarding_complete");
        router.push("/onboarding");
    };

    return (
        <div className="flex min-h-screen w-full bg-brand-black">
            <Sidebar />

            <main className="flex-1 ml-20 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-jumper-bold-italic font-bold mb-4 flex items-center gap-3">
                            <SettingsIcon size={36} className="text-brand-yellow" />
                            Configurações
                        </h1>
                        <p className="text-gray-400 font-jumper-thin">
                            Gerencie suas preferências e dados
                        </p>
                    </div>

                    {/* Preferences Section */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6">
                        <h2 className="text-2xl font-jumper-bold-italic font-bold mb-6">Preferências de Aprendizado</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-jumper-regular text-gray-400 mb-2">
                                    Objetivo
                                </label>
                                <select
                                    value={preferences.goal}
                                    onChange={(e) => setPreferences({ ...preferences, goal: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-jumper-regular focus:border-brand-yellow focus:outline-none transition-colors"
                                >
                                    <option value="travel">✈️ Viagem & Turismo</option>
                                    <option value="business">💼 Inglês Corporativo</option>
                                    <option value="casual">☕ Conversação Casual</option>
                                    <option value="academic">🎓 Inglês Acadêmico</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-jumper-regular text-gray-400 mb-2">
                                    Nível
                                </label>
                                <select
                                    value={preferences.level}
                                    onChange={(e) => setPreferences({ ...preferences, level: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-jumper-regular focus:border-brand-yellow focus:outline-none transition-colors"
                                >
                                    <option value="beginner">Iniciante</option>
                                    <option value="intermediate">Intermediário</option>
                                    <option value="advanced">Avançado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-jumper-regular text-gray-400 mb-2">
                                    Tempo de Estudo Diário
                                </label>
                                <select
                                    value={preferences.time}
                                    onChange={(e) => setPreferences({ ...preferences, time: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-jumper-regular focus:border-brand-yellow focus:outline-none transition-colors"
                                >
                                    <option value="5">5 minutos</option>
                                    <option value="15">15 minutos</option>
                                    <option value="30">30 minutos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Progress Stats */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6">
                        <h2 className="text-2xl font-jumper-bold-italic font-bold mb-6">Estatísticas</h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-1">
                                    {progress.streak}
                                </div>
                                <div className="text-sm text-gray-400 font-jumper-thin">Dias de Sequência</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-1">
                                    {progress.totalMinutes}
                                </div>
                                <div className="text-sm text-gray-400 font-jumper-thin">Minutos Totais</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-1">
                                    {progress.accuracy}%
                                </div>
                                <div className="text-sm text-gray-400 font-jumper-thin">Precisão</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-1">
                                    {progress.xp}
                                </div>
                                <div className="text-sm text-gray-400 font-jumper-thin">XP Total</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <div className="text-3xl font-jumper-bold-italic text-brand-yellow mb-1">
                                    {progress.lessonsCompleted}
                                </div>
                                <div className="text-sm text-gray-400 font-jumper-thin">Lições Completas</div>
                            </div>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6">
                        <h2 className="text-2xl font-jumper-bold-italic font-bold mb-6">Gerenciar Dados</h2>

                        <div className="space-y-4">
                            <button
                                onClick={handleExportData}
                                className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-yellow rounded-xl px-6 py-4 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Download size={20} className="text-brand-yellow" />
                                    <div className="text-left">
                                        <div className="font-jumper-regular font-bold">Exportar Dados</div>
                                        <div className="text-sm text-gray-400 font-jumper-thin">Baixar backup dos seus dados</div>
                                    </div>
                                </div>
                            </button>

                            <label className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-yellow rounded-xl px-6 py-4 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <Upload size={20} className="text-brand-yellow" />
                                    <div className="text-left">
                                        <div className="font-jumper-regular font-bold">Importar Dados</div>
                                        <div className="text-sm text-gray-400 font-jumper-thin">Restaurar de um backup</div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportData}
                                    className="hidden"
                                />
                            </label>

                            <button
                                onClick={handleRestartOnboarding}
                                className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-yellow rounded-xl px-6 py-4 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut size={20} className="text-brand-yellow" />
                                    <div className="text-left">
                                        <div className="font-jumper-regular font-bold">Refazer Onboarding</div>
                                        <div className="text-sm text-gray-400 font-jumper-thin">Recomeçar do início</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
                        <h2 className="text-2xl font-jumper-bold-italic font-bold mb-4 text-red-400">Zona de Perigo</h2>
                        <p className="text-gray-400 font-jumper-thin mb-6">
                            Ações irreversíveis. Tenha cuidado!
                        </p>

                        {!showResetConfirm ? (
                            <button
                                onClick={() => setShowResetConfirm(true)}
                                className="flex items-center gap-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl font-bold font-jumper-regular transition-all"
                            >
                                <Trash2 size={20} />
                                Resetar Todo Progresso
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-red-400 font-jumper-regular">
                                    Tem certeza? Esta ação não pode ser desfeita!
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleResetProgress}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold font-jumper-regular transition-all"
                                    >
                                        Sim, Resetar Tudo
                                    </button>
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold font-jumper-regular hover:border-brand-yellow transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
