import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base: '/GradeCalculator/'  // exactly as your repo name
});
