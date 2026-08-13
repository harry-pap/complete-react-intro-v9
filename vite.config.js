import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
      "/public": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
  plugins: [react()],
});
