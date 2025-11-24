import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
            <Hero />
            <Features />
            <HowItWorks />
            <FAQ />
            <CTA />
            <Footer />
        </main>
    );
}
