"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface WheelGameProps {
    onComplete: (points: number) => void;
}

const prizes = [10, 20, 50, 100, 20, 10, 50, 20];

export default function WheelGame({ onComplete }: WheelGameProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState<number | null>(null);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        const spins = 5 + Math.random() * 3; // 5-8 rotações
        const randomIndex = Math.floor(Math.random() * prizes.length);
        const prizeAngle = (360 / prizes.length) * randomIndex;
        const finalRotation = 360 * spins + prizeAngle;

        setRotation(finalRotation);

        setTimeout(() => {
            const wonPrize = prizes[randomIndex];
            setPrize(wonPrize);

            // Confetti B&W+Yellow
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#000000', '#FFD700', '#FFFFFF']
            });

            setTimeout(() => {
                onComplete(wonPrize);
            }, 2000);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Gire a Roleta!</h2>
            <p className="text-textSecondary mb-8 text-center">Ganhe pontos extras</p>

            {/* Wheel */}
            <div className="relative w-64 h-64 mb-8">
                {/* Arrow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-black" />
                </div>

                {/* Wheel */}
                <motion.div
                    animate={{ rotate: rotation }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="w-full h-full rounded-full border-4 border-black overflow-hidden relative"
                >
                    {prizes.map((points, index) => {
                        const angle = (360 / prizes.length) * index;
                        const isYellow = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`absolute w-full h-full ${isYellow ? 'bg-brand' : 'bg-white'}`}
                                style={{
                                    transform: `rotate(${angle}deg)`,
                                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((360 / prizes.length) * Math.PI / 180)}% ${50 - 50 * Math.cos((360 / prizes.length) * Math.PI / 180)}%)`
                                }}
                            >
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 font-bold text-black">
                                    {points}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Result */}
            {prize !== null && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center mb-6"
                >
                    <p className="text-4xl font-bold text-brand mb-2">+{prize} pontos!</p>
                    <p className="text-textSecondary">Parabéns!</p>
                </motion.div>
            )}

            {/* Spin Button */}
            {!prize && (
                <button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className="bg-brand text-black px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                >
                    {isSpinning ? "Girando..." : "Girar Roleta"}
                </button>
            )}
        </div>
    );
}
