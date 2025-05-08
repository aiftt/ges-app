<script setup lang="ts" name="UiBadge">
/**
 * Badge 徽章组件
 * 创建日期: 2024-06-20
 * 作者: aiftt
 * 更新日期: 2024-06-20 - 初始版本
 * 更新日期: 2024-06-21 - 修复TypeScript类型错误
 */

import { computed } from 'vue'

// 定义props类型
interface BadgeProps {
  /**
   * 显示的内容
   */
  value?: string | number
  /**
   * 最大值，超过最大值会显示 {max}+
   */
  max?: number
  /**
   * 是否显示小圆点
   */
  isDot?: boolean
  /**
   * 是否隐藏徽标
   */
  hidden?: boolean
  /**
   * 徽标类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * 徽标位置
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /**
   * 徽标偏移
   */
  offset?: [number, number]
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  color?: string
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 是否显示为圆形徽标
   */
  round?: boolean
}

// 定义props
const props = withDefaults(defineProps<BadgeProps>(), {
  type: 'danger',
  position: 'top-right',
  offset: () => [0, 0],
  round: true,
  bordered: false,
  isDot: false,
  hidden: false,
})

// 计算徽标显示的内容
const displayValue = computed(() => {
  if (props.isDot)
    return ''

  if (props.value === undefined || props.value === null)
    return ''

  if (props.max && typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`
  }

  return String(props.value)
})

// 计算是否需要显示徽标
const shouldShow = computed(() => {
  if (props.hidden)
    return false

  if (props.isDot)
    return true

  return !!props.value || props.value === 0
})

// 计算偏移样式
const offsetStyle = computed(() => {
  const [x, y] = props.offset

  // 根据位置设置不同的偏移属性
  const style: Record<string, string> = {}

  if (props.position.includes('top')) {
    style.top = `${y}px`
  }
  else {
    style.bottom = `${y}px`
  }

  if (props.position.includes('right')) {
    style.right = `${x}px`
  }
  else {
    style.left = `${x}px`
  }

  return style
})

// 自定义颜色变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.color || null)
const borderColorVar = computed(() => props.borderColor || null)

// 计算徽标类名
const badgeClasses = computed(() => {
  const classes = ['ui-badge']

  // 类型
  classes.push(`ui-badge--${props.type}`)

  // 位置
  classes.push(`ui-badge--${props.position}`)

  // 圆点模式
  if (props.isDot) {
    classes.push('ui-badge--dot')
  }

  // 边框
  if (props.bordered) {
    classes.push('ui-badge--bordered')
  }

  // 圆形
  if (props.round) {
    classes.push('ui-badge--round')
  }

  // 自定义颜色
  if (props.bgColor || props.color || props.borderColor) {
    classes.push('ui-badge--custom')
  }

  return classes.join(' ')
})
</script>

<template>
  <div class="ui-badge-wrapper">
    <slot />
    <span
      v-if="shouldShow"
      :class="badgeClasses"
      :style="offsetStyle"
    >
      {{ displayValue }}
    </span>
  </div>
</template>

<style scoped>
.ui-badge-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.ui-badge {
  /* 动态变量绑定 */
  --ui-badge-bg-color: v-bind(bgColorVar);
  --ui-badge-text-color: v-bind(textColorVar);
  --ui-badge-border-color: v-bind(borderColorVar);

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(50%, -50%);
  transform-origin: 100% 0%;
  font-size: var(--ui-badge-font-size, 12px);
  font-weight: var(--ui-badge-font-weight, 500);
  line-height: 1;
  padding: var(--ui-badge-padding, 0.25rem 0.4rem);
  white-space: nowrap;
  min-width: 20px;
  height: 20px;
  box-sizing: border-box;
  z-index: 1;
  background-color: var(--ui-badge-bg-color, var(--ui-badge-bg, var(--ui-color-danger, #ef4444)));
  color: var(--ui-badge-text-color, var(--ui-badge-color, white));
}

.ui-badge--dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  padding: 0;
}

.ui-badge--bordered {
  border: 1px solid var(--ui-badge-border-color, var(--ui-color-border, white));
}

.ui-badge--round {
  border-radius: 9999px;
}

.ui-badge--top-right {
  top: 0;
  right: 0;
}

.ui-badge--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.ui-badge--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.ui-badge--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

.ui-badge--primary {
  background-color: var(--ui-color-primary, #3b82f6);
}

.ui-badge--success {
  background-color: var(--ui-color-success, #10b981);
}

.ui-badge--warning {
  background-color: var(--ui-color-warning, #f59e0b);
}

.ui-badge--danger {
  background-color: var(--ui-color-danger, #ef4444);
}

.ui-badge--info {
  background-color: var(--ui-color-info, #6b7280);
}

/* 当不包含内容时只显示badge */
.ui-badge-wrapper:not(:has(*:not(.ui-badge))) {
  width: auto;
  height: auto;
}
</style>
