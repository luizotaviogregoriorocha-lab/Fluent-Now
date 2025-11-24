"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { VoiceVisualizer } from "./VoiceVisualizer";

interface Message {
    role: 'user' | 'ai';
    text: string;
}

export function RoleplaySession({ scenario }: { scenario: string }) {
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: `Hello! I see you want to practice for "${scenario}". Let's start. How can I help you today?` }
    ]);

    const toggleMic = () => {
        setIsListening(!isListening);
        // Here we would start/stop Web Speech API
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-bold text-sm">AI Tutor ({scenario})</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-brand-yellow text-brand-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isListening && (
                    <div className="flex justify-end">
                        <div className="bg-brand-yellow/20 text-brand-yellow p-4 rounded-2xl rounded-tr-none animate-pulse">
                            Ouvindo...
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-4">
                <button
                    onClick={toggleMic}
                    className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-500 text-white' : 'bg-brand-yellow text-brand-black hover:scale-105'}`}
                >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        {isListening ? "Ouvindo..." : "Toque para falar"}
                    </span>
                    <VoiceVisualizer isListening={isListening} />
                </div>
            </div>
        </div>
    );
}
