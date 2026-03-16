{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "warn"
  },
  "overrides": [
    {
      "files": ["*.tsx", "*.jsx"],
      "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      }
    },
    {
      "files": ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"],
      "env": {
        "jest": true
      }
    }
  ]
}
