import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    // proxy /api and /public calls to avoid running into CORS errors
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
      "/public": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
  // TanStack should go before react
  plugins: [tanstackRouter(), react()],
  test: {
    // another alternative is playwright, it's the up and coming but
    // probably not mature enough yet
    environment: "happy-dom",
  },
});
