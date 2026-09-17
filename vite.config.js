import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/3D-Dev-Portfolio/" : "/",
  plugins: [react(), tailwindcss()],
});
