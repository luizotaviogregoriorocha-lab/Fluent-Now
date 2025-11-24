"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white selection:bg-yellow-500/30">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                    }}
                    className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">

                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm"
                >
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">Fluent Now, seu inglês floresce aqui!</span>
                </motion.div>

                {/* Main Logo with Bounce Animation - ABOVE TITLE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100
                    }}
                    className="mb-6"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/logo-new.png"
                            alt="Fluent Now Logo"
                            width={500}
                            height={200}
                            className="drop-shadow-2xl"
                            priority
                            unoptimized
                        />
                    </motion.div>
                </motion.div>

                {/* Headline with Stagger Animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl font-semibold tracking-tight text-center mb-4 text-black"
                >
                    Aprenda inglês no seu tempo: prático, divertido e guiado por IA.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm text-center leading-relaxed mb-8 max-w-xs mx-auto text-[#666666]"
                >
                    Complete um quiz rápido e desbloqueie 7 dias de acesso total ao Fluent Now — converse com agentes de IA, revise conteúdo e conquiste recompensas, mesmo com uma rotina corrida.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex justify-center w-full"
                >
                    <Link href="/onboarding" className="w-full max-w-md">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-8 py-4 bg-[#FFD700] text-black font-medium rounded-full shadow-lg hover:bg-[#F4C430] transition-colors flex items-center justify-center gap-2"
                        >
                            <span>Comece agora: faça o quiz e ative seu teste grátis</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Floating Cards with Parallax Effect */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute top-1/4 left-[5%] hidden lg:block"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="p-4 rounded-2xl bg-white/80 border border-gray-200 backdrop-blur-xl shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-xl">🎯</span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900">Prático</div>
                                <div className="text-xs text-green-600 font-medium">Aprenda rápido</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-1/4 right-[5%] hidden lg:block"
                >
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="p-4 rounded-2xl bg-white/80 border border-gray-200 backdrop-blur-xl shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900">IA Integrada</div>
                                <div className="text-xs text-blue-600 font-medium">Conversação real</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
