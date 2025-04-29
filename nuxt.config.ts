// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@unocss/nuxt',
  ],

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/scss/theme.scss',
  ],

  // 优化配置
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('.', import.meta.url)),
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },

  vue: {
    compilerOptions: {
      // 不再需要将 iconify-icon 标记为自定义元素
    },
  },

  // ESLint配置
  eslint: {
    // 在开发时启用检查器，实时显示ESLint错误
    checker: true,
    config: {
      // 设置standalone为false，避免与antfu/eslint-config冲突
      standalone: false,
    },
  },
})
