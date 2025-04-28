// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'

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
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
})
