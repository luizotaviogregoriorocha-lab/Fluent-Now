"use client";
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface QuizCardProps {
    icon?: React.ReactNode;
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
    layout?: "vertical" | "horizontal"; // default vertical
}

export default function QuizCard({
    icon,
    label,
    description,
    selected,
    onClick,
    layout = "vertical",
}: QuizCardProps) {
    const baseClasses = "flex items-center gap-4 p-4 border rounded-2xl transition-all cursor-pointer";
    const selectedClasses = "bg-brand text-black border-brand shadow-minimal";
    const normalClasses = "bg-white text-black border-border hover:border-black";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className={clsx(
                baseClasses,
                layout === "vertical" ? "flex-col text-center" : "flex-row",
                selected ? selectedClasses : normalClasses
            )}
            onClick={onClick}
        >
            {icon && (
                <div
                    className={clsx(
                        "flex-shrink-0",
                        layout === "vertical" ? "mb-4 w-12 h-12" : "mr-4 w-10 h-10",
                        selected ? "text-black" : "text-textSecondary"
                    )}
                >
                    {icon}
                </div>
            )}
            <div className="flex-1">
                <h3 className={clsx("font-semibold tracking-tight", layout === "vertical" ? "text-base mb-1" : "text-sm mb-0.5")}>
                    {label}
                </h3>
                {description && (
                    <p className={clsx("text-xs", selected ? "text-black/70" : "text-textSecondary")}>
                        {description}
                    </p>
                )}
            </div>
        </motion.button>
    );
}
