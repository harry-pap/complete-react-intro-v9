import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
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
  plugins: [
    tanstackRouter(),
    react(),
    // plugin-react v6 transpiles with oxc and no longer takes a `babel`
    // option, so the React Compiler runs through @rolldown/plugin-babel
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
