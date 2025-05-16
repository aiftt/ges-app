<script setup lang="ts" name="UiDivider">
/**
 * 分割线组件
 * 创建日期: 2023-11-16
 * 作者: aiftt
 * 更新日期: 2024-01-05 - 修复垂直分割线渲染问题
 * 更新日期: 2024-09-14 - 使用集中管理的类型定义
 * 更新日期: 2024-12-19 - 根据Element Plus完全重构组件实现
 *
 * 用于分隔内容的水平或垂直分割线
 */

import type { Alignment, BorderType, Direction } from '~/types/ui'
import { computed } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 分割线方向
   */
  direction?: Direction
  /**
   * 分割线样式类型
   */
  type?: BorderType
  /**
   * 分割线颜色
   */
  color?: string
  /**
   * 文字位置
   */
  position?: Alignment
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 分割线宽度
   */
  width?: string
  /**
   * 分割线外边距
   */
  margin?: string
}>(), {
  direction: 'horizontal',
  type: 'solid',
  position: 'center',
})

// 主题颜色映射
const colorMap = {
  primary: 'var(--ui-color-primary, #409eff)',
  success: 'var(--ui-color-success, #67c23a)',
  warning: 'var(--ui-color-warning, #e6a23c)',
  danger: 'var(--ui-color-danger, #f56c6c)',
  info: 'var(--ui-color-info, #909399)',
}

// 计算分割线样式
const dividerStyle = computed(() => {
  const style: Record<string, string> = {}

  // 处理颜色
  if (props.color) {
    const colorValue = (colorMap as Record<string, string>)[props.color] || props.color
    style['--ui-divider-color'] = colorValue
  }

  // 处理宽度
  if (props.width) {
    style['--ui-divider-width'] = props.width
  }

  // 处理边距
  if (props.margin) {
    style['--ui-divider-margin'] = props.margin
  }

  return style
})

// 计算分割线的类名
const dividerClass = computed(() => {
  const classes = [
    'ui-divider',
    `ui-divider--${props.direction}`,
    `ui-divider--${props.type}`,
  ]

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes
})
</script>

<template>
  <div
    :class="dividerClass"
    :style="dividerStyle"
    role="separator"
  >
    <div
      v-if="$slots.default && direction !== 'vertical'"
      class="ui-divider__text" :class="[`ui-divider__text--${position}`]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ui-divider {
  position: relative;
  display: block;
  box-sizing: border-box;
  font-size: 0.875rem;
}

.ui-divider--horizontal {
  display: block;
  height: var(--ui-divider-width);
  width: 100%;
  margin: var(--ui-divider-margin);
  border-top: var(--ui-divider-width) var(--ui-divider-type, solid) var(--ui-divider-color);
  clear: both;
}

.ui-divider--vertical {
  display: inline-block;
  width: var(--ui-divider-width);
  height: 1em;
  margin: 0 0.5rem;
  vertical-align: middle;
  border-left: var(--ui-divider-width) var(--ui-divider-type, solid) var(--ui-divider-color);
}

/* 边框类型 */
.ui-divider--dashed {
  --ui-divider-type: dashed;
}

.ui-divider--dotted {
  --ui-divider-type: dotted;
}

/* 带文本的分割线 */
.ui-divider--horizontal:has(.ui-divider__text) {
  display: flex;
  align-items: center;
  margin: var(--ui-divider-margin);
  border-top: 0;
}

.ui-divider--horizontal:has(.ui-divider__text)::before,
.ui-divider--horizontal:has(.ui-divider__text)::after {
  content: '';
  flex: 1;
  height: var(--ui-divider-width);
  background-color: var(--ui-divider-color);
}

.ui-divider__text {
  padding: 0 1rem;
  font-weight: 500;
  color: var(--ui-text-color, rgb(75, 85, 99));
  white-space: nowrap;
}

.ui-divider__text--left + ::after {
  flex: 20;
}

.ui-divider--horizontal:has(.ui-divider__text--right)::before {
  flex: 20;
}

.ui-divider--horizontal:has(.ui-divider__text--left)::after {
  flex: 20;
}
</style>
