"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Qual é a duração das aulas?",
        answer: "As lições são projetadas para serem curtas e práticas, durando entre 5 a 15 minutos. Você aprende no seu ritmo!",
    },
    {
        question: "É necessário pagar para utilizar todas as funcionalidades?",
        answer: "O Fluent Now oferece um plano gratuito com recursos essenciais. Para desbloquear funcionalidades premium, oferecemos planos acessíveis.",
    },
    {
        question: "Posso usar o app offline?",
        answer: "Sim! Muitas funcionalidades estão disponíveis offline após o download inicial do conteúdo.",
    },
    {
        question: "O app é adequado para iniciantes?",
        answer: "Absolutamente! O Fluent Now foi projetado para todos os níveis, desde iniciantes até avançados.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Tire suas dúvidas sobre o Fluent Now
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <span className="font-bold text-gray-900">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-600 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 bg-white">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
