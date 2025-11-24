import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black">
            {/* Header */}
            <header className="w-full max-w-5xl flex justify-between items-center py-8">
                <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Fluent Now" width={40} height={40} className="object-contain" />
                    <div className="text-2xl font-bold tracking-tighter text-brand-yellow">
                        Fluent<span className="text-white">now</span>
                    </div>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="#features" className="hover:text-brand-yellow transition-colors">Como funciona</Link>
                    <Link href="/pricing" className="hover:text-brand-yellow transition-colors">Preços</Link>
                    <Link href="/login" className="hover:text-brand-yellow transition-colors">Entrar</Link>
                </nav>
                <Link href="/onboarding" className="bg-brand-yellow text-brand-black px-5 py-2 rounded-full font-bold hover:bg-white transition-colors">
                    Começar Agora
                </Link>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center max-w-3xl mt-12 md:mt-24 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow text-xs font-medium uppercase tracking-wider">
                    <Zap size={14} /> Novo: AI Roleplay
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                    Seu inglês <span className="text-brand-yellow">floresce</span> aqui.
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                    Aprenda inglês de forma rápida e descomplicada. Sem gamificação inútil, apenas o que funciona: Repetição Espaçada e Conversação com IA.
                </p>
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center pt-4">
                    <Link href="/onboarding" className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2">
                        Começar Gratuitamente <ArrowRight size={20} />
                    </Link>
                    <Link href="#demo" className="border border-white/20 bg-white/5 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                        Ver Demo
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 mb-12">
                {[
                    { title: "Rápido & Direto", desc: "Lições de 5 minutos focadas em frases úteis, não palavras soltas." },
                    { title: "IA Personalizada", desc: "Converse com uma IA que simula situações reais baseadas no seu objetivo." },
                    { title: "Repetição Espaçada", desc: "O algoritmo garante que você nunca esqueça o que aprendeu." }
                ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-yellow/50 transition-colors">
                        <CheckCircle2 className="text-brand-yellow mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.desc}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
