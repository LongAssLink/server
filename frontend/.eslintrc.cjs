module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    `plugin:react/recommended`,
    `plugin:react/jsx-runtime`
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.?s'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ]
  }
};
