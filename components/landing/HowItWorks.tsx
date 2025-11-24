"use client";

import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Set Your Goal",
        desc: "Choose your focus: Travel, Business, or Casual conversation.",
    },
    {
        num: "02",
        title: "Practice Daily",
        desc: "Spend 15 mins/day with AI roleplay and smart flashcards.",
    },
    {
        num: "03",
        title: "Master Fluency",
        desc: "Watch your stats grow as you gain real-world confidence.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-[#FFD700] text-black border-y border-black/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">How it Works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-black/10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center z-10"
                        >
                            <div className="w-24 h-24 rounded-full bg-black text-white border-4 border-white/20 flex items-center justify-center mb-6 group hover:scale-110 transition-transform duration-300 shadow-xl">
                                <span className="text-3xl font-bold text-yellow-400">
                                    {step.num}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                            <p className="text-black/70 max-w-xs font-medium">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
