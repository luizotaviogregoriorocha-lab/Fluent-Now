"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCw } from "lucide-react";

interface FlashcardProps {
    front: string;
    back: string;
    audioSrc?: string;
    onResult: (quality: number) => void;
}

export function Flashcard({ front, back, onResult }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <div className="relative h-96 w-full cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                <motion.div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center text-center backface-hidden"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <span className="text-sm text-brand-yellow uppercase tracking-widest font-bold mb-8">Inglês</span>
                    <h2 className="text-3xl font-bold text-white">{front}</h2>
                    <button className="mt-8 p-3 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-black transition-colors" onClick={(e) => { e.stopPropagation(); /* Play Audio */ }}>
                        <Volume2 size={24} />
                    </button>
                    <p className="absolute bottom-8 text-gray-500 text-sm flex items-center gap-2">
                        <RotateCw size={14} /> Toque para virar
                    </p>
                </motion.div>

                <motion.div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-brand-yellow text-brand-black p-8 flex flex-col items-center justify-center text-center backface-hidden"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 0 : -180 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <span className="text-sm text-brand-black/60 uppercase tracking-widest font-bold mb-8">Português</span>
                    <h2 className="text-3xl font-bold">{back}</h2>

                    <div className="absolute bottom-8 w-full px-8 flex justify-between gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onResult(1); }} className="flex-1 py-2 bg-black/10 rounded-lg font-bold hover:bg-black/20">Difícil</button>
                        <button onClick={(e) => { e.stopPropagation(); onResult(3); }} className="flex-1 py-2 bg-black/10 rounded-lg font-bold hover:bg-black/20">Bom</button>
                        <button onClick={(e) => { e.stopPropagation(); onResult(5); }} className="flex-1 py-2 bg-black/10 rounded-lg font-bold hover:bg-black/20">Fácil</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
