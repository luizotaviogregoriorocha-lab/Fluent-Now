import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-12 bg-black border-t border-white/10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        <Image src="/logo-icon.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-bold text-white">Fluent Now</span>
                </div>

                <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Fluent Now. All rights reserved.
                </div>

                <div className="flex gap-6">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                </div>

            </div>
        </footer>
    );
}
