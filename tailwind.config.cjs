/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                light: {
                    fondo: {
                        primary: "#fafbfc",
                        secondary: "#fff",
                    },
                    texto: {
                        primary: "#191919",
                        secondary: "#252525",
                    },
                    gray: {
                        primary: "#666",
                        secondary: "#bbb",
                    },
                },
                dark: {
                    fondo: {
                        primary: "#121212",
                        secondary: "#1a1a1a",
                    },
                    texto: {
                        primary: "#f3f3f3",
                        secondary: "#ccc",
                    },
                    gray: {
                        primary: "#999",
                        secondary: "#555",
                    },
                },
                primary: "#006fff",
            },
            gridTemplateColumns: {
                modal: "auto 23rem",
            },
            maxHeight: {
                "accordion-expanded": "500px",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
