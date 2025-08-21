import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/ui/**/*.{ts,tsx}", "src/ui/**/*.{js}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: ["@infrastructure/*"] }],
    },
  },
  {
    files: [
      "src/domain/**/*.{ts,tsx}",
      "src/application/**/*.{ts,tsx}",
      "src/domain/**/*.{js}",
      "src/application/**/*.{js}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: ["@ui/*", "@infrastructure/*", "next/*", "react", "react-dom"] },
      ],
    },
  },
];

export default eslintConfig;
