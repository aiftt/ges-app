<script setup lang="ts" name="UiThemeSwitcher">
/**
 * 主题切换组件
 * 创建日期: 2023-12-11
 * 作者: aiftt
 * 用于切换亮色主题和暗色主题
 */
import { onMounted, ref } from 'vue'

// 属性定义
const props = withDefaults(defineProps<{
  /**
   * 亮色模式图标
   */
  lightIcon?: string
  /**
   * 暗色模式图标
   */
  darkIcon?: string
  /**
   * 组件尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 组件颜色
   */
  color?: string
}>(), {
  lightIcon: 'ph:sun-bold',
  darkIcon: 'ph:moon-bold',
  size: 'default',
  color: '',
})

// 发射事件
const emit = defineEmits<{
  (e: 'change', isDark: boolean): void
}>()

// 当前主题状态
const isDarkTheme = ref(false)

// 切换主题
function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value
  applyTheme()
  emit('change', isDarkTheme.value)
}

// 应用主题到文档
function applyTheme() {
  const html = document.documentElement
  if (isDarkTheme.value) {
    html.classList.add('dark')
  }
  else {
    html.classList.remove('dark')
  }
}

// 初始化当前主题状态
onMounted(() => {
  // 从HTML或本地存储中检测暗色主题
  const html = document.documentElement
  isDarkTheme.value = html.classList.contains('dark')
})

// 样式计算
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small': return 'w-8 h-8 text-xs'
    case 'large': return 'w-12 h-12 text-lg'
    default: return 'w-10 h-10 text-base'
  }
})

// 图标尺寸
const iconSize = computed(() => {
  switch (props.size) {
    case 'small': return 'small'
    case 'large': return 'large'
    default: return 'default'
  }
})

// 颜色样式
const colorStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <button
    class="theme-switcher relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
    :class="[sizeClass, isDarkTheme ? 'bg-gray-800' : 'bg-white']"
    :style="colorStyle"
    title="切换主题模式"
    type="button"
    @click="toggleTheme"
  >
    <ui-icon
      v-if="isDarkTheme"
      :icon="darkIcon"
      :size="iconSize"
      class="text-yellow-400"
    />
    <ui-icon
      v-else
      :icon="lightIcon"
      :size="iconSize"
      class="text-orange-500"
    />
    <span class="sr-only">{{ isDarkTheme ? '切换到亮色模式' : '切换到暗色模式' }}</span>
  </button>
</template>

<style scoped>
.theme-switcher {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

:root.dark .theme-switcher {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.theme-switcher:hover {
  transform: scale(1.05);
}

.theme-switcher:active {
  transform: scale(0.95);
}
</style>
