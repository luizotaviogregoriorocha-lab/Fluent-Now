"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Zap, Clock } from "lucide-react";

const features = [
    {
        title: "AI Roleplay",
        description: "Converse com a IA e desenvolva suas habilidades de fala em situações do dia a dia.",
        icon: Mic,
        gradient: "from-purple-500 to-blue-500",
    },
    {
        title: "Gamificação",
        description: "Aprenda de forma divertida! Economia de pontos, prêmios e desafios para manter você motivado.",
        icon: Zap,
        gradient: "from-orange-500 to-yellow-500",
    },
    {
        title: "Cards para Revisão",
        description: "Reforce seu conhecimento com cartões interativos que facilitam a revisão do que você aprendeu.",
        icon: Brain,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        title: "Aprenda no Seu Ritmo",
        description: "Nossos recursos são projetados para se adaptar ao seu estilo de vida agitado. Aprenda onde e quando quiser!",
        icon: Clock,
        gradient: "from-pink-500 to-rose-500",
    },
];

export default function VisualFeatures() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Recursos Principais
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Fluent Now é ideal para quem tem pouco tempo! Aprenda em pequenas doses e veja resultados rápidos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-xl"
                        >
                            {/* Icon with Glassmorphism Effect */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg backdrop-blur-md bg-opacity-90 relative overflow-hidden`}>
                                {/* Glass shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                <feature.icon className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
