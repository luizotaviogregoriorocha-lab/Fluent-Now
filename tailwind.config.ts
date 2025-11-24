import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // B&W+Yellow Design System
                bg: "#FFFFFF",
                text: "#000000",
                textSecondary: "#666666",
                border: "#E5E5E5",
                brand: "#FFD700",
                surface: "#FAFAFA",
                // Legacy colors (keep for compatibility)
                "brand-yellow": "#FFD700",
                "brand-black": "#000000",
                "brand-white": "#FFFFFF",
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
        },
    },
    plugins: [],
};
export default config;

