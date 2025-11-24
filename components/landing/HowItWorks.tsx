"use client";

import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Baixe o App",
        desc: "Disponível na App Store e Google Play. Comece em segundos!",
    },
    {
        num: "02",
        title: "Crie sua Conta",
        desc: "Cadastro rápido e fácil. Personalize seu perfil e objetivos.",
    },
    {
        num: "03",
        title: "Comece a Praticar",
        desc: "É simples assim! Aprenda no seu ritmo e veja resultados.",
    },
];

export default function HowItWorks() {
    return (
        <section id="como-funciona" className="py-24 bg-[#FFD700] text-black border-y border-black/5 relative overflow-hidden">
            {/* Animated Background Texture - Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Animated Gradient Overlay */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        'radial-gradient(circle at 0% 0%, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 100%, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 0%, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 0%, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                    ]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-black/10 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4"
                    >
                        Como Funciona
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-black/70 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Não deixe que a falta de tempo seja um obstáculo. O Fluent Now se encaixa na sua rotina!
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {/* Connecting Line (Desktop) with Animation */}
                    <motion.div
                        className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-black/10"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -8 }}
                            className="relative flex flex-col items-center text-center z-10"
                        >
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute -inset-4 bg-black/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ scale: 1.2 }}
                            />

                            <motion.div
                                className="w-24 h-24 rounded-full bg-black text-white border-4 border-white/20 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0],
                                    borderColor: "rgba(255, 255, 255, 0.4)"
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                    }}
                                />
                                <span className="text-3xl font-bold text-yellow-400 relative z-10">
                                    {step.num}
                                </span>
                            </motion.div>

                            <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                            <p className="text-black/70 max-w-xs font-medium">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(40px, 40px);
                    }
                }
            `}</style>
        </section>
    );
}
