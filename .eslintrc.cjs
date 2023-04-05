module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser'
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser'
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
