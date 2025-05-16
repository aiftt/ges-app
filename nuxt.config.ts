import fs from 'node:fs'
import * as process from 'node:process'
// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
    '@formkit/auto-animate/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/scss/theme.scss',
  ],

  runtimeConfig: {
    // 服务器端配置
    mongodbUrl: process.env.MONGODB_URL || 'mongodb+srv://admin:M%2F9H%25%23fZSyGp%7DV6%3BU_2.7T@cluster0.ksaathe.mongodb.net/ges0',
    jwtSecret: process.env.JWT_SECRET || 'z+XJinqNQc6MFIXKu/lu44oNexau+J51EsxYyndtGbg=',
    // 客户端配置
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api',
      publicPages: process.env.PUBLIC_PAGES?.split(',') || ['/login', '/register', '/blogs', '/demo/components'],
      publicPathPrefixes: process.env.PUBLIC_PATH_PREFIXES?.split(',') || ['/blog/'],
      logLevel: process.env.CLIENT_LOG_LEVEL || '0',
    },
    // 私有配置，仅在服务器端可用
    logLevel: process.env.LOG_LEVEL || '0',
    enableFileLogging: process.env.ENABLE_FILE_LOGGING !== 'false',
  },

  // 优化配置
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('.', import.meta.url)),
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
    plugins: [
      vueJsx(),
      {
        name: 'vite-plugin-raw-import',
        transform(code, id) {
          if (id.endsWith('?raw')) {
            const filePath = id.replace('?raw', '')
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            return `export default ${JSON.stringify(fileContent)}`
          }
        },
      },
    ],
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

  // 添加nitro配置，确保服务器API路由正确
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
      },
    },
  },
})
