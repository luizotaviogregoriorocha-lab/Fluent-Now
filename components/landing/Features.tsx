"use client";

import { motion } from "framer-motion";
import { Brain, Mic, TrendingUp, Zap } from "lucide-react";

const features = [
    {
        title: "AI Roleplay",
        description: "Converse com a IA e desenvolva suas habilidades de fala em situações do dia a dia.",
        icon: Mic,
        color: "bg-yellow-500/20 text-yellow-400",
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        title: "Gamificação",
        description: "Aprenda de forma divertida! Economia de pontos, prêmios e desafios para manter você motivado.",
        icon: Zap,
        color: "bg-purple-500/20 text-purple-400",
        colSpan: "col-span-1",
    },
    {
        title: "Cards para Revisão",
        description: "Reforce seu conhecimento com cartões interativos que facilitam a revisão do que você aprendeu.",
        icon: Brain,
        color: "bg-green-500/20 text-green-400",
        colSpan: "col-span-1",
    },
    {
        title: "Aprenda Onde Quiser",
        description: "Nossos recursos são projetados para se adaptar ao seu estilo de vida agitado. Aprenda onde e quando quiser!",
        icon: TrendingUp,
        color: "bg-orange-500/20 text-orange-400",
        colSpan: "col-span-1 md:col-span-2",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4"
                    >
                        Recursos Principais
                    </motion.h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Fluent Now é ideal para quem tem pouco tempo! Aprenda em pequenas doses e veja resultados rápidos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${feature.colSpan} group relative p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:border-yellow-400 transition-colors overflow-hidden shadow-lg hover:shadow-xl`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
