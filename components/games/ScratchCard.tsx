"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ScratchCardProps {
    onComplete: (points: number) => void;
}

export default function ScratchCard({ onComplete }: ScratchCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);
    const [prize] = useState(() => [50, 100, 150, 200][Math.floor(Math.random() * 4)]);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = 300;
        canvas.height = 200;

        // Draw silver overlay
        ctx.fillStyle = "#C0C0C0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        ctx.fillStyle = "#666666";
        ctx.font = "bold 20px Inter";
        ctx.textAlign = "center";
        ctx.fillText("Raspe aqui!", canvas.width / 2, canvas.height / 2);
    }, []);

    const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing && e.type !== "touchstart" && e.type !== "mousedown") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Check if scratched enough
        checkScratched(ctx, canvas);
    };

    const checkScratched = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) transparent++;
        }

        const percentScratched = (transparent / (pixels.length / 4)) * 100;

        if (percentScratched > 50 && !isScratched) {
            setIsScratched(true);

            // Confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#000000', '#FFD700', '#FFFFFF']
            });

            setTimeout(() => {
                onComplete(prize);
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Raspadinha!</h2>
            <p className="text-textSecondary mb-8 text-center">Descubra quantos pontos você ganhou</p>

            <div className="relative">
                {/* Prize (behind canvas) */}
                <div className="absolute inset-0 flex items-center justify-center bg-white border-4 border-black rounded-2xl">
                    <div className="text-center">
                        <p className="text-6xl font-bold text-brand mb-2">+{prize}</p>
                        <p className="text-xl font-semibold text-black">pontos!</p>
                    </div>
                </div>

                {/* Scratch Canvas */}
                <canvas
                    ref={canvasRef}
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                    onMouseMove={scratch}
                    onMouseLeave={() => setIsDrawing(false)}
                    onTouchStart={() => setIsDrawing(true)}
                    onTouchEnd={() => setIsDrawing(false)}
                    onTouchMove={scratch}
                    className="cursor-pointer rounded-2xl"
                    style={{ touchAction: "none" }}
                />
            </div>

            {isScratched && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-textSecondary"
                >
                    Parabéns! 🎉
                </motion.p>
            )}
        </div>
    );
}
