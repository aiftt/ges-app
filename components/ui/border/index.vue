<script setup lang="ts" name="UiBorder">
/**
 * 边框组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 *
 * 用于展示不同样式的边框
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 边框类型
   */
  type?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none'
  /**
   * 边框宽度
   */
  width?: string
  /**
   * 边框颜色
   */
  color?: string
  /**
   * 边框圆角
   */
  radius?: string
  /**
   * 内边距
   */
  padding?: string
  /**
   * 是否显示顶部边框
   */
  top?: boolean
  /**
   * 是否显示右侧边框
   */
  right?: boolean
  /**
   * 是否显示底部边框
   */
  bottom?: boolean
  /**
   * 是否显示左侧边框
   */
  left?: boolean
  /**
   * 是否为阴影样式
   */
  shadow?: boolean
  /**
   * 阴影偏移 X
   */
  shadowX?: string
  /**
   * 阴影偏移 Y
   */
  shadowY?: string
  /**
   * 阴影模糊
   */
  shadowBlur?: string
  /**
   * 阴影扩散
   */
  shadowSpread?: string
  /**
   * 阴影颜色
   */
  shadowColor?: string
  /**
   * 悬停效果
   */
  hover?: boolean
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  type: 'solid',
  width: '1px',
  color: '',
  radius: '0',
  padding: '0',
  top: true,
  right: true,
  bottom: true,
  left: true,
  shadow: false,
  shadowX: '0',
  shadowY: '2px',
  shadowBlur: '4px',
  shadowSpread: '0',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  hover: false,
  class: '',
})

// 计算边框类名
const borderClass = computed(() => {
  const classes = [
    'ui-border',
  ]

  // 根据边框位置添加类名
  if (props.top && props.right && props.bottom && props.left) {
    classes.push('border')
  }
  else {
    if (props.top)
      classes.push('border-t')
    if (props.right)
      classes.push('border-r')
    if (props.bottom)
      classes.push('border-b')
    if (props.left)
      classes.push('border-l')
  }

  // 根据边框类型添加类名
  switch (props.type) {
    case 'dashed':
      classes.push('border-dashed')
      break
    case 'dotted':
      classes.push('border-dotted')
      break
    case 'double':
      classes.push('border-double')
      break
    default:
      // 其他类型在style中处理
      break
  }

  // 边框圆角
  if (props.radius && props.radius !== '0') {
    if (props.radius.includes(' ')) {
      // 自定义圆角在style中处理
    }
    else {
      const radiusValue = Number.parseInt(props.radius)
      if (radiusValue <= 2)
        classes.push('rounded-sm')
      else if (radiusValue <= 4)
        classes.push('rounded')
      else if (radiusValue <= 6)
        classes.push('rounded-md')
      else if (radiusValue <= 8)
        classes.push('rounded-lg')
      else if (radiusValue <= 12)
        classes.push('rounded-xl')
      else if (radiusValue <= 16)
        classes.push('rounded-2xl')
      else if (radiusValue <= 24)
        classes.push('rounded-3xl')
      else classes.push('rounded-full')
    }
  }

  // 阴影
  if (props.shadow) {
    if (props.shadowBlur === '4px' && props.shadowSpread === '0'
      && props.shadowX === '0' && props.shadowY === '2px') {
      classes.push('shadow')
    }
    else if (props.shadowBlur === '6px' && props.shadowSpread === '0'
      && props.shadowX === '0' && props.shadowY === '4px') {
      classes.push('shadow-md')
    }
    else if (props.shadowBlur === '8px' && props.shadowSpread === '0'
      && props.shadowX === '0' && props.shadowY === '6px') {
      classes.push('shadow-lg')
    }
    else if (props.shadowBlur === '12px' && props.shadowSpread === '0'
      && props.shadowX === '0' && props.shadowY === '8px') {
      classes.push('shadow-xl')
    }
    else if (props.shadowBlur === '16px' && props.shadowSpread === '0'
      && props.shadowX === '0' && props.shadowY === '10px') {
      classes.push('shadow-2xl')
    }
    else {
      // 自定义阴影在style中处理
    }
  }

  // 悬停效果
  if (props.hover) {
    classes.push('transition-all duration-300')

    if (props.shadow) {
      classes.push('hover:shadow-lg')
    }
    else {
      classes.push('hover:border-opacity-80')
    }
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算边框样式
const borderStyle = computed(() => {
  const style: Record<string, string> = {}

  // 设置内边距
  if (props.padding && props.padding !== '0') {
    style.padding = props.padding
  }

  // 设置边框宽度
  if (props.width && props.width !== '1px') {
    style.borderWidth = props.width
  }

  // 设置边框颜色
  if (props.color) {
    style.borderColor = props.color
  }

  // 设置边框样式 - 针对非标准类型
  if (['groove', 'ridge', 'inset', 'outset', 'none'].includes(props.type)) {
    style.borderStyle = props.type
  }

  // 设置自定义圆角
  if (props.radius && props.radius !== '0' && props.radius.includes(' ')) {
    style.borderRadius = props.radius
  }

  // 设置自定义阴影
  if (props.shadow
    && !(props.shadowBlur === '4px' && props.shadowSpread === '0' && props.shadowX === '0' && props.shadowY === '2px')
    && !(props.shadowBlur === '6px' && props.shadowSpread === '0' && props.shadowX === '0' && props.shadowY === '4px')
    && !(props.shadowBlur === '8px' && props.shadowSpread === '0' && props.shadowX === '0' && props.shadowY === '6px')
    && !(props.shadowBlur === '12px' && props.shadowSpread === '0' && props.shadowX === '0' && props.shadowY === '8px')
    && !(props.shadowBlur === '16px' && props.shadowSpread === '0' && props.shadowX === '0' && props.shadowY === '10px')) {
    style.boxShadow = `${props.shadowX} ${props.shadowY} ${props.shadowBlur} ${props.shadowSpread} ${props.shadowColor}`
  }

  return style
})
</script>

<template>
  <div :class="borderClass" :style="borderStyle">
    <slot />
  </div>
</template>

<style scoped>
.ui-border {
  --border-color: var(--ui-border-color, #e5e7eb);
  --border-hover-color: var(--ui-border-hover-color, #d1d5db);
  border-color: var(--border-color);
}

.ui-border:hover.hover {
  border-color: var(--border-hover-color);
}

/* 暗黑模式 */
:root.dark .ui-border {
  --border-color: var(--ui-border-color-dark, #374151);
  --border-hover-color: var(--ui-border-hover-color-dark, #4b5563);
}
</style>
