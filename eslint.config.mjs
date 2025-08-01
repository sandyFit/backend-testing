import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended", "plugin:prettier/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      // optional: make Prettier violations show as warnings instead of errors
      "prettier/prettier": "warn"
    }
  },
]);
