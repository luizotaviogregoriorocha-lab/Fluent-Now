import { PricingCard } from "@/components/PricingCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-brand-black text-brand-white p-6 flex flex-col items-center">
            <div className="w-full max-w-5xl mb-12 flex items-center">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} /> Voltar
                </Link>
            </div>

            <div className="text-center max-w-2xl mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Invista na sua <span className="text-brand-yellow">Fluência</span></h1>
                <p className="text-gray-400 text-lg">Escolha o plano ideal para o seu ritmo. Sem contratos de fidelidade, cancele quando quiser.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                <PricingCard
                    title="Mensal"
                    price="29,90"
                    period="mês"
                    features={[
                        "Acesso ilimitado a todas as lições",
                        "Sistema de Repetição Espaçada",
                        "Prática básica de pronúncia",
                        "Suporte por email"
                    ]}
                />
                <PricingCard
                    title="Semestral"
                    price="159,90"
                    period="semestre"
                    recommended={true}
                    features={[
                        "Tudo do plano Mensal",
                        "Economize 11%",
                        "Acesso ao AI Roleplay (Beta)",
                        "Estatísticas avançadas de progresso",
                        "Certificado de conclusão de nível"
                    ]}
                />
                <PricingCard
                    title="Anual"
                    price="329,90"
                    period="ano"
                    features={[
                        "Tudo do plano Semestral",
                        "Economize 2 meses (Melhor Valor)",
                        "Prioridade no suporte",
                        "Acesso antecipado a novos recursos",
                        "Mentoria mensal em grupo (ao vivo)"
                    ]}
                />
            </div>
        </main>
    );
}
