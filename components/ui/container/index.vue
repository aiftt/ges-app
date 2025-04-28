<script setup lang="ts" name="UiContainer">
/**
 * 容器组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 *
 * 用于创建页面的布局容器
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 容器方向，默认为垂直排列
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 容器宽度
   */
  width?: string
  /**
   * 容器高度
   */
  height?: string
  /**
   * 内边距
   */
  padding?: string
  /**
   * 背景颜色
   */
  background?: string
  /**
   * 边框样式
   */
  border?: string
  /**
   * 圆角大小
   */
  radius?: string
  /**
   * 阴影样式
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  /**
   * 自定义阴影值（仅在shadow为custom时有效）
   */
  customShadow?: string
  /**
   * 是否铺满父容器高度
   */
  fullHeight?: boolean
  /**
   * 溢出处理方式
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  direction: 'vertical',
  width: '100%',
  height: 'auto',
  padding: '0',
  background: '',
  border: 'none',
  radius: '0',
  shadow: 'none',
  customShadow: '',
  fullHeight: false,
  overflow: 'visible',
  class: '',
})

// 获取阴影样式
const shadowStyle = computed(() => {
  switch (props.shadow) {
    case 'none':
      return 'none'
    case 'sm':
      return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    case 'md':
      return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    case 'lg':
      return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    case 'xl':
      return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    case 'custom':
      return props.customShadow
    default:
      return 'none'
  }
})

// 计算容器样式
const containerStyle = computed(() => ({
  width: props.width,
  height: props.fullHeight ? '100%' : props.height,
  padding: props.padding,
  backgroundColor: props.background,
  border: props.border,
  borderRadius: props.radius,
  boxShadow: shadowStyle.value,
  overflow: props.overflow,
  display: 'flex',
  flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
}))

// 计算容器类名
const containerClass = computed(() => {
  const classes = ['ui-container']

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <slot />
  </div>
</template>

<style scoped>
.ui-container {
  box-sizing: border-box;
}

/* 暗黑模式调整 */
:root.dark .ui-container {
  --shadow-color: rgba(0, 0, 0, 0.25);
}
</style>
