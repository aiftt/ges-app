<script setup lang="ts" name="UiScrollbar">
/**
 * 滚动条组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 *
 * 自定义滚动条组件，提供更好的样式和控制
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 容器高度
   */
  height?: string
  /**
   * 容器最大高度
   */
  maxHeight?: string
  /**
   * 是否总是显示滚动条
   */
  always?: boolean
  /**
   * 是否只在hover时显示滚动条
   */
  hover?: boolean
  /**
   * 滚动方向
   */
  direction?: 'vertical' | 'horizontal' | 'both'
  /**
   * 滚动条宽度
   */
  barWidth?: string
  /**
   * 滚动条圆角
   */
  barRadius?: string
  /**
   * 滚动条颜色
   */
  barColor?: string
  /**
   * 滚动条悬停颜色
   */
  barHoverColor?: string
  /**
   * 滚动容器背景颜色
   */
  bgColor?: string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  height: '',
  maxHeight: '',
  always: false,
  hover: true,
  direction: 'both',
  barWidth: '6px',
  barRadius: '3px',
  barColor: '',
  barHoverColor: '',
  bgColor: '',
  class: '',
})

// 计算滚动容器的类名
const scrollbarClass = computed(() => {
  const classes = [
    'ui-scrollbar',
    'overflow-auto',
  ]

  // 是否只在hover时显示滚动条
  if (props.hover && !props.always) {
    classes.push('scrollbar-hide hover:scrollbar-default')
  }

  // 滚动方向控制
  if (props.direction === 'vertical') {
    classes.push('overflow-x-hidden')
  }
  else if (props.direction === 'horizontal') {
    classes.push('overflow-y-hidden')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 滚动容器的样式
const scrollbarStyle = computed(() => {
  const style: Record<string, string> = {}

  // 设置高度和最大高度
  if (props.height) {
    style.height = props.height
  }

  if (props.maxHeight) {
    style.maxHeight = props.maxHeight
  }

  // 设置背景色
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }

  // 设置滚动条样式
  const scrollbarStyles = []

  if (props.barWidth) {
    scrollbarStyles.push(`width: ${props.barWidth}`)
  }

  if (props.barRadius) {
    scrollbarStyles.push(`border-radius: ${props.barRadius}`)
  }

  if (props.barColor) {
    scrollbarStyles.push(`background-color: ${props.barColor}`)
  }

  if (scrollbarStyles.length > 0) {
    style['--scrollbar-thumb'] = `{${scrollbarStyles.join(';')}}`
  }

  // 设置滚动条悬停样式
  if (props.barHoverColor) {
    style['--scrollbar-thumb-hover'] = `{background-color: ${props.barHoverColor}}`
  }

  return style
})
</script>

<template>
  <div :class="scrollbarClass" :style="scrollbarStyle">
    <slot />
  </div>
</template>

<style>
.ui-scrollbar::-webkit-scrollbar {
  width: var(--scrollbar-width, 6px);
  height: var(--scrollbar-width, 6px);
}

.ui-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color, rgba(0, 0, 0, 0.2));
  border-radius: var(--scrollbar-radius, 3px);
}

.ui-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-hover-color, rgba(0, 0, 0, 0.4));
}

.ui-scrollbar::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-color, rgba(0, 0, 0, 0.05));
}

/* 暗黑模式 */
html.dark .ui-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color-dark, rgba(255, 255, 255, 0.2));
}

html.dark .ui-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-hover-color-dark, rgba(255, 255, 255, 0.4));
}

html.dark .ui-scrollbar::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-color-dark, rgba(255, 255, 255, 0.05));
}

/* 隐藏滚动条但保留功能 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hover\:scrollbar-default:hover::-webkit-scrollbar {
  display: block;
}

.hover\:scrollbar-default:hover {
  -ms-overflow-style: auto;
  scrollbar-width: auto;
}
</style>
