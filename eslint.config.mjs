import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        // pinned, not "detect": detection calls context.getFilename(),
        // which ESLint 10 removed. Bump this when you bump React.
        version: "19.2",
        // version: "detect",
      },
    },
  },
  // React 19 auto-imports React for JSX, so no `import React` needed
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      // export as globals document etc
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];
