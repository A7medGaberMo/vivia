import { defineConfig } from "vite";
import { resolve } from "path"

export default defineConfig({
    plugins: [],
    build: {
        lib: {
            entry: resolve(__dirname, "embed.ts"),
            name: "ViviaWidget",
            fileName: "widget",
            formats: ["iife"]
        },
        rollupOptions: {
            output: {
                extend: true,
            }
        }
    },
    server: {
        port: 3002,
        open: "/demo.html"
    }
});