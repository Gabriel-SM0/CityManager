import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
    ...js.configs.recommended,
    rules: {
      semi: ["error", "always"],
    },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: "./tsconfig.json" },
      globals: globals.node,
    },
    ...tseslint.configs.recommended,
    rules: {
      semi: ["error", "always"],
    },
  },
]);
