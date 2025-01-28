import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://e-shop-cdhd.onrender.com", 
      "/uploads/": "https://e-shop-cdhd.onrender.com",
    },
  },
});
