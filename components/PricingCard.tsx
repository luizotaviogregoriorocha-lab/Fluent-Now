import { Check } from "lucide-react";

interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    recommended?: boolean;
    buttonText?: string;
}

export function PricingCard({ title, price, period, features, recommended = false, buttonText = "Assinar Agora" }: PricingCardProps) {
    return (
        <div className={`relative flex flex-col p-8 rounded-2xl border ${recommended ? 'border-brand-yellow bg-brand-yellow/10' : 'border-white/10 bg-white/5'} transition-all hover:scale-105`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    Mais Popular
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-400">R$</span>
                <span className="text-4xl font-extrabold text-white">{price}</span>
                <span className="text-sm text-gray-400">/{period}</span>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="text-brand-yellow shrink-0" size={18} />
                        {feature}
                    </li>
                ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-colors ${recommended ? 'bg-brand-yellow text-brand-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white hover:text-brand-black'}`}>
                {buttonText}
            </button>
        </div>
    );
}
