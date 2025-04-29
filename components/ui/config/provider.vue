<script setup lang="ts" name="UiConfigProvider">
/**
 * 全局配置组件
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-04-30 - 初始版本
 * 更新日期: 2025-05-01 - 调整为符合规范的文件结构
 */
import { computed, getCurrentInstance, onMounted, provide, ref, watch } from 'vue'

// 定义主题类型
type Theme = 'light' | 'dark' | 'auto'
type Size = 'small' | 'default' | 'large'
type ThemeConfig = Record<string, string>

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 主题模式
   */
  theme?: Theme
  /**
   * 组件尺寸
   */
  size?: Size
  /**
   * 主题配置对象
   */
  themeConfig?: ThemeConfig
  /**
   * 是否使用系统主题
   */
  followSystemTheme?: boolean
  /**
   * 组件库前缀
   */
  namespace?: string
  /**
   * z-index基础值
   */
  zIndex?: number
}>(), {
  theme: 'light',
  size: 'default',
  themeConfig: () => ({}),
  followSystemTheme: true,
  namespace: 'ui',
  zIndex: 2000,
})

// 当前应用的主题
const currentTheme = ref<Theme>(props.theme)
const systemTheme = ref<'light' | 'dark'>('light')

// 配置对象
const config = computed(() => {
  return {
    theme: currentTheme.value,
    size: props.size,
    themeConfig: props.themeConfig,
    namespace: props.namespace,
    zIndex: props.zIndex,
  }
})

// 计算当前应用的主题
const computedTheme = computed(() => {
  if (currentTheme.value === 'auto') {
    return systemTheme.value
  }
  return currentTheme.value
})

// 监听系统主题变化
function detectSystemTheme() {
  if (!import.meta.client)
    return

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    systemTheme.value = e.matches ? 'dark' : 'light'
  }

  // 初始检测
  updateSystemTheme(mediaQuery)

  // 添加监听
  mediaQuery.addEventListener('change', updateSystemTheme)

  // 组件卸载时移除监听
  const instance = getCurrentInstance()
  if (instance) {
    instance.proxy.$on('hook:beforeDestroy', () => {
      mediaQuery.removeEventListener('change', updateSystemTheme)
    })
  }
}

// 应用主题到根元素
function applyTheme() {
  if (!import.meta.client)
    return

  // 移除已有的主题类
  document.documentElement.classList.remove('light', 'dark')

  // 添加当前主题类
  if (computedTheme.value) {
    document.documentElement.classList.add(computedTheme.value)

    // 设置CSS变量
    Object.entries(props.themeConfig).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${props.namespace}-${key}`, value)
    })
  }
}

// 提供的方法
function setTheme(theme: Theme) {
  currentTheme.value = theme
}

// 提供配置给后代组件
provide('config', config)
provide('setTheme', setTheme)

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  currentTheme.value = newTheme
})

// 监听计算后的主题变化
watch(computedTheme, () => {
  applyTheme()
})

// 组件挂载时
onMounted(() => {
  // 检测系统主题
  if (props.followSystemTheme) {
    detectSystemTheme()
  }

  // 应用初始主题
  applyTheme()
})
</script>

<template>
  <div :class="`${props.namespace}-config-provider`">
    <slot />
  </div>
</template>

<style scoped>
:root {
  /* 默认亮色主题变量 */
  --ui-color-primary: #10b981;
  --ui-color-success: #10b981;
  --ui-color-warning: #f59e0b;
  --ui-color-danger: #ef4444;
  --ui-color-info: #3b82f6;

  --ui-color-text: #374151;
  --ui-color-text-secondary: #6b7280;
  --ui-color-text-disabled: #9ca3af;

  --ui-color-bg: #ffffff;
  --ui-color-bg-secondary: #f9fafb;
  --ui-color-border: #e5e7eb;

  --ui-border-radius: 0.375rem;
  --ui-border-width: 1px;
  --ui-transition-duration: 0.3s;

  --ui-font-family:
    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  --ui-font-size: 1rem;
  --ui-font-size-sm: 0.875rem;
  --ui-font-size-lg: 1.125rem;
}

:root.dark {
  /* 暗色主题变量 */
  --ui-color-primary: #059669;
  --ui-color-success: #059669;
  --ui-color-warning: #d97706;
  --ui-color-danger: #dc2626;
  --ui-color-info: #2563eb;

  --ui-color-text: #f9fafb;
  --ui-color-text-secondary: #e5e7eb;
  --ui-color-text-disabled: #6b7280;

  --ui-color-bg: #1f2937;
  --ui-color-bg-secondary: #111827;
  --ui-color-border: #374151;
}
</style>
