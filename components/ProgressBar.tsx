"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            {/* Progress Text */}
            <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-textSecondary">Pergunta {current} de {total}</span>
                <span className="font-semibold text-black">{Math.round(percentage)}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-black"
                />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-3">
                {Array.from({ length: total }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${index < current ? "bg-black" : "bg-border"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
