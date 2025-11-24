import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Fluent Now - Seu inglês floresce aqui",
    description: "Aprenda inglês de forma rápida, fácil e descomplicada.",
};

import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <link href="https://fonts.cdnfonts.com/css/jumper-3" rel="stylesheet" />
            </head>
            <body className="font-sans antialiased">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const savedTheme = localStorage.getItem('theme');
                                if (savedTheme === 'light') {
                                    document.documentElement.setAttribute('data-theme', 'light');
                                }
                            })();
                        `,
                    }}
                />
                <UserProvider>
                    <div className="app-container relative z-10 min-h-screen flex">
                        {children}
                    </div>
                </UserProvider>
            </body>
        </html>
    );
}
