"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Junte-se a milhares que já estão falando inglês{" "}
                        <span className="text-yellow-400">com confiança</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        O futuro do seu inglês começa agora! Baixe agora e transforme sua prática de inglês.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/onboarding">
                            <button className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors text-lg">
                                Baixar App
                            </button>
                        </Link>
                        <div className="flex gap-4">
                            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                                <div className="w-40 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                    <span className="text-sm font-medium">App Store</span>
                                </div>
                            </a>
                            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                                <div className="w-40 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                    <span className="text-sm font-medium">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
