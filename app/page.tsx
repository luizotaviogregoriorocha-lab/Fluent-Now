import Hero from "@/components/landing/Hero";
import VisualFeatures from "@/components/landing/VisualFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black selection:bg-yellow-500/30">
            <Hero />
            <Stats />
            <VisualFeatures />
            <HowItWorks />
            <FAQ />
            <CTA />
            <Footer />
        </main>
    );
}
