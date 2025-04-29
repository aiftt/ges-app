import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

// 创建基础配置
const antfuConfig = antfu({
  formatters: true,
  unocss: true,
  vue: true,
  nuxt: true,
  rules: {
    'no-console': 'error', // 将console用法标记为错误
  },
  ignores: ['**/assets/demo-code/**/*'],
})

// 为scripts目录创建特殊规则，允许使用console
const scriptsConfig = {
  files: ['**/scripts/**/*.{ts,js}'],
  rules: {
    'no-console': 'off', // 在脚本中允许使用console
  },
}

// 使用withNuxt包装并导出配置
export default withNuxt(antfuConfig, scriptsConfig)
