"use client";

import { Home, BookOpen, Mic, BarChart3, Settings, Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Sidebar() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-20 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6 z-50 transition-colors duration-300">
            {/* Logo */}
            <div className="mb-12">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                    <Image src="/logo.png" alt="Fluent Now" width={40} height={40} className="object-contain" />
                </div>
            </div>

            <nav className="flex flex-col gap-6 w-full items-center flex-1">
                <NavItem icon={<Home size={24} />} active />
                <NavItem icon={<BookOpen size={24} />} />
                <NavItem icon={<Mic size={24} />} />
                <NavItem icon={<BarChart3 size={24} />} />
                <NavItem icon={<Settings size={24} />} />
            </nav>

            <button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
                {theme === "light" ? <Sun size={20} className="text-brand-yellow" /> : <Moon size={20} className="text-brand-yellow" />}
            </button>
        </div>
    );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
    return (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${active ? "bg-white/10 text-brand-yellow shadow-[0_4px_16px_rgba(255,215,0,0.2)]" : "text-gray-400 hover:bg-white/5 hover:text-brand-yellow"}`}>
            {icon}
        </div>
    );
}
