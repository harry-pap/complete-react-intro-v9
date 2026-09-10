import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [tanstackRouter(), react()],
  // here we are "abusing" the `projects` configuration, which is meant for
  // monorepos, in order to effectively have 2 suites of tests, one running
  // with node and one running with a browser
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
    },
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          // this course uses happy-dom, going forward playwright and browser
          // tests is the way to go
          environment: "happy-dom",
          include: ["src/__tests__/**/*.node.test.jsx"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/__tests__/**/*.browser.test.jsx"],
          browser: {
            enabled: true,
            provider: playwright(),
            // @vitest/coverage-v8 does not work with firefox as it does not
            // expose a v8 profiler, either use chromium or switch to istanbul
            instances: [{ browser: "chromium" }],
            // instances: [{ browser: "firefox" }],
          },
        },
      },
    ],
  },
});
