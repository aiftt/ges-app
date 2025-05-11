<script setup lang="ts" name="UiContainer">
/**
 * 容器组件
 * 创建日期: 2025-01-15
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量
 * 更新日期: 2025-03-02 - 改进CSS变量实现，移除内联style
 * 更新日期: 2024-09-13 - 使用集中管理的类型定义
 *
 * 用于创建页面的布局容器
 */
import type { Direction, Overflow, Shadow } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 容器方向，默认为垂直排列
   */
  direction?: Direction
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
  shadow?: Shadow
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
  overflow?: Overflow
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

// 计算阴影样式
const shadowValue = computed(() => {
  switch (props.shadow) {
    case 'none':
      return 'none'
    case 'sm':
      return 'var(--ui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))'
    case 'md':
      return 'var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))'
    case 'lg':
      return 'var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))'
    case 'xl':
      return 'var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04))'
    case 'custom':
      return props.customShadow
    default:
      return 'none'
  }
})

// 计算容器样式类名
const containerClass = computed(() => {
  const classes = ['ui-container']

  // 方向
  classes.push(props.direction === 'horizontal' ? 'ui-container--horizontal' : 'ui-container--vertical')

  // 满高度
  if (props.fullHeight) {
    classes.push('ui-container--full-height')
  }

  // 溢出处理
  if (props.overflow !== 'visible') {
    classes.push(`ui-container--overflow-${props.overflow}`)
  }

  // 自定义样式标记
  classes.push('ui-container--custom-style')

  // 自定义类
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// CSS变量计算
const widthVar = computed(() => props.width || null)
const heightVar = computed(() => props.fullHeight ? '100%' : props.height || null)
const paddingVar = computed(() => props.padding || null)
const backgroundVar = computed(() => props.background || null)
const borderVar = computed(() => props.border !== 'none' ? props.border : null)
const radiusVar = computed(() => props.radius !== '0' ? props.radius : null)
const shadowVar = computed(() => shadowValue.value)
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-container {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: auto;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.ui-container--custom-style {
  --ui-container-width: v-bind(widthVar);
  --ui-container-height: v-bind(heightVar);
  --ui-container-padding: v-bind(paddingVar);
  --ui-container-background: v-bind(backgroundVar);
  --ui-container-border: v-bind(borderVar);
  --ui-container-radius: v-bind(radiusVar);
  --ui-container-shadow: v-bind(shadowVar);

  width: var(--ui-container-width, 100%);
  height: var(--ui-container-height, auto);
  padding: var(--ui-container-padding, 0);
  background-color: var(--ui-container-background, transparent);
  border: var(--ui-container-border, none);
  border-radius: var(--ui-container-radius, 0);
  box-shadow: var(--ui-container-shadow, none);
}

.ui-container--horizontal {
  flex-direction: row;
}

.ui-container--vertical {
  flex-direction: column;
}

.ui-container--full-height {
  height: 100%;
}

.ui-container--overflow-hidden {
  overflow: hidden;
}

.ui-container--overflow-scroll {
  overflow: scroll;
}

.ui-container--overflow-auto {
  overflow: auto;
}

/* CSS变量已移至主题文件中 */
</style>
