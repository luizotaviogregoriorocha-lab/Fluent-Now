"use client";

import React from "react";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";

interface TopBalanceProps {
    points: number;
}

export default function TopBalance({ points }: TopBalanceProps) {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-minimal">
                <Coins size={20} className="text-brand" />
                <span className="font-semibold tracking-tight">
                    {points} pontos
                </span>
            </div>
        </motion.div>
    );
}
