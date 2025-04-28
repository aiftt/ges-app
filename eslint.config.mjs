// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // 常见错误
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // 一致性
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'never'],
  },
})
