import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-var": "error",
      "prettier/prettier": "error",
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
]);
