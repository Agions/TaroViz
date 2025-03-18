module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'varsIgnorePattern': 'React|^_',
      'argsIgnorePattern': '^_'
    }],
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'warn'
  },
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      rules: {
        'react/react-in-jsx-scope': 'off'
      }
    }
  ]
};
