"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
    {
        number: "500+",
        label: "Frases Nativas",
        icon: MessageSquare,
        gradient: "from-purple-500 to-blue-500",
    },
    {
        number: "10+",
        label: "Cenários de Conversação",
        icon: Users,
        gradient: "from-orange-500 to-yellow-500",
    },
    {
        number: "15 min",
        label: "Por Dia",
        icon: TrendingUp,
        gradient: "from-green-500 to-emerald-500",
    },
];

export default function Stats() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon Badge */}
                            <div className="flex justify-center mb-4">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            {/* Number */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                            >
                                {stat.number}
                            </motion.div>

                            {/* Label */}
                            <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
