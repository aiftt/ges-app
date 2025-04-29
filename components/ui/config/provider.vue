<script setup lang="ts" name="UiConfigProvider">
/**
 * 全局配置组件
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-05-01 - 调整为符合规范的文件结构
 * 更新日期: 2025-05-02 - 修复主题应用问题，移除硬编码的主题变量
 * 更新日期: 2025-05-03 - 改进主题应用方式，读取并使用已定义的CSS变量作为基础
 */
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

// 定义主题类型
type Theme = 'light' | 'dark' | 'auto'
type Size = 'small' | 'default' | 'large'
type ThemeConfig = Record<string, any>

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
   * 亮色主题配置对象 - 仅需包含你想要覆盖的CSS变量
   * 会与基础CSS变量合并
   */
  lightTheme?: ThemeConfig
  /**
   * 暗色主题配置对象 - 仅需包含你想要覆盖的CSS变量
   * 会与基础CSS变量合并
   */
  darkTheme?: ThemeConfig
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
  lightTheme: () => ({}),
  darkTheme: () => ({}),
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
    lightTheme: props.lightTheme,
    darkTheme: props.darkTheme,
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
  onBeforeUnmount(() => {
    mediaQuery.removeEventListener('change', updateSystemTheme)
  })
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

    // 获取当前主题的自定义配置（仅覆盖部分变量）
    const customThemeConfig = computedTheme.value === 'dark' ? props.darkTheme : props.lightTheme

    // 只应用自定义的主题变量，不覆盖默认的CSS变量
    // 这样可以确保我们只修改需要修改的变量，而不是覆盖所有变量
    if (customThemeConfig) {
      Object.entries(customThemeConfig).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${props.namespace}-${key}`, value as string)
      })
    }
  }
}

// 提供的方法
function setTheme(theme: Theme) {
  currentTheme.value = theme
}

// 提供配置给后代组件
provide('uiConfig', config)
provide('uiSetTheme', setTheme)

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
.ui-config-provider {
  width: 100%;
  height: 100%;
}
</style>
