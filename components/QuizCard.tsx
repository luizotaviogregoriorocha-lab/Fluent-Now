"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface QuizCardProps {
    icon?: React.ReactNode;
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
    layout?: "vertical" | "horizontal";
}

export default function QuizCard({
    icon,
    label,
    description,
    selected,
    onClick,
    layout = "vertical"
}: QuizCardProps) {
    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className={`
                relative w-full rounded-2xl border transition-all
                ${layout === "vertical" ? "flex flex-col items-center text-center p-6" : "flex items-center text-left p-5"}
                ${selected
                    ? "bg-brand border-brand text-black font-medium"
                    : "bg-white border-border text-black hover:border-black"
                }
            `}
        >
            {/* Icon */}
            {icon && (
                <div className={`
                    flex items-center justify-center
                    ${layout === "vertical" ? "mb-4 w-12 h-12" : "mr-4 w-10 h-10"}
                    ${selected ? "text-black" : "text-textSecondary"}
                `}>
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className="flex-1">
                <h3 className={`font-semibold tracking-tight ${layout === "vertical" ? "text-base mb-1" : "text-sm mb-0.5"}`}>
                    {label}
                </h3>
                {description && (
                    <p className={`text-xs ${selected ? "text-black/70" : "text-textSecondary"}`}>
                        {description}
                    </p>
                )}
            </div>

            {/* Check Mark */}
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 bg-black rounded-full flex items-center justify-center"
                >
                    <Check size={12} className="text-brand" />
                </motion.div>
            )}
        </motion.button>
    );
}
