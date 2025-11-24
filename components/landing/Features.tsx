"use client";

import { motion } from "framer-motion";
import { Brain, Mic, TrendingUp, Zap } from "lucide-react";

const features = [
    {
        title: "Smart SRS Algorithm",
        description: "Forget forgetting. Our SuperMemo-2 engine schedules reviews at the perfect moment.",
        icon: Brain,
        color: "bg-purple-500/20 text-purple-400",
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        title: "AI Voice Roleplay",
        description: "Practice real conversations. Speak, listen, and get instant feedback on your pronunciation.",
        icon: Mic,
        color: "bg-yellow-500/20 text-yellow-400",
        colSpan: "col-span-1",
    },
    {
        title: "Real-time Progress",
        description: "Track your fluency with detailed analytics, streaks, and XP.",
        icon: TrendingUp,
        color: "bg-green-500/20 text-green-400",
        colSpan: "col-span-1",
    },
    {
        title: "Instant Feedback",
        description: "Know exactly what to improve with AI-powered error detection.",
        icon: Zap,
        color: "bg-orange-500/20 text-orange-400",
        colSpan: "col-span-1 md:col-span-2",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Everything you need to <span className="text-yellow-400">Fluent Now</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A complete ecosystem designed to take you from beginner to fluent, faster than ever.
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
                            className={`${feature.colSpan} group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors overflow-hidden`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
