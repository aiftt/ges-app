import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  // 启用预设
  presets: [
    presetUno(), // 默认预设
    presetAttributify(), // 属性化模式支持
    presetIcons({ // 图标预设
      scale: 1.2, // 图标缩放
      extraProperties: { // 额外的CSS属性
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(), // 排版预设
    presetWebFonts({ // 网络字体预设
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
    }),
  ],
  // 转换器
  transformers: [
    transformerDirectives(), // @apply, @screen 等指令支持
    transformerVariantGroup(), // 变体组支持，如 hover:(bg-gray-100 text-gray-900)
  ],
  // 主题
  theme: {
    colors: {
      primary: {
        DEFAULT: '#10b981', // 默认主色
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22',
      },
      // 可以添加其他颜色
    },
    // 可以添加断点、间距、阴影等其他主题配置
  },
  // 自定义规则
  rules: [
    // 示例：添加自定义规则
    ['ui-container', { 'max-width': '1200px', 'margin': '0 auto', 'padding': '0 1rem' }],
  ],
  // 自定义快捷方式
  shortcuts: {
    // 示例：添加常用组合样式
    'ui-btn': 'px-4 py-2 rounded-lg transition-colors duration-200',
    'ui-btn-primary': 'ui-btn bg-primary text-white hover:bg-primary-600',
    'ui-card': 'bg-white rounded-lg shadow-md p-4 dark:bg-gray-800',
    'ui-input': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600',
  },
  // 安全列表（防止生产环境中清除这些类）
  safelist: [
    'text-primary',
    'bg-primary',
  ],
})
