// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Base JS setup
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      // Prettier integration
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    },
  },
  // Turn off rules that conflict with Prettier
  prettier,
])
