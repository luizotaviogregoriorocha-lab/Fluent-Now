"use client";

import { motion } from "framer-motion";

export function VoiceVisualizer({ isListening }: { isListening: boolean }) {
    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 bg-brand-yellow rounded-full"
                    animate={{
                        height: isListening ? [10, 24, 10] : 4,
                        opacity: isListening ? 1 : 0.3
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
