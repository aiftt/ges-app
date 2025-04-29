<script setup lang="ts" name="UiBorder">
/**
 * 边框组件
 * 创建日期: 2025-01-15
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量实现
 * 更新日期: 2025-03-01 - 优化为v-bind+CSS变量实现动态样式
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
   * 阴影大小 (sm, base, md, lg, xl, 2xl)
   */
  shadow?: string
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
   * 悬停时的阴影大小
   */
  hoverShadow?: string
  /**
   * 悬停时的边框颜色
   */
  hoverBorderColor?: string
  /**
   * 悬停时的缩放比例
   */
  hoverScale?: string
  /**
   * 自定义类名
   */
  className?: string
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
  shadow: '',
  shadowX: '0',
  shadowY: '2px',
  shadowBlur: '4px',
  shadowSpread: '0',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  hoverShadow: '',
  hoverBorderColor: '',
  hoverScale: '',
  className: '',
})

// 计算边框类名
const borderClass = computed(() => {
  const classes = [
    'ui-border',
  ]

  // 边框位置
  if (!(props.top && props.right && props.bottom && props.left)) {
    classes.push('ui-border--partial')
  }

  // 边框位置类名
  if (props.top)
    classes.push('ui-border--top')
  if (props.right)
    classes.push('ui-border--right')
  if (props.bottom)
    classes.push('ui-border--bottom')
  if (props.left)
    classes.push('ui-border--left')

  // 边框类型
  classes.push(`ui-border--${props.type}`)

  // 预设边框宽度
  const presetWidths = ['thin', 'medium', 'thick', '1px', '2px', '4px', '8px']
  if (props.width && !presetWidths.includes(props.width)) {
    classes.push('ui-border--custom-width')
  }
  else if (props.width) {
    classes.push(`ui-border--width-${props.width.replace('px', '')}`)
  }

  // 预设边框颜色
  if (props.color) {
    if (['primary', 'success', 'warning', 'danger', 'gray-300', 'gray-500'].includes(props.color)) {
      classes.push(`ui-border--color-${props.color}`)
    }
    else if (props.color.startsWith('#') || props.color.startsWith('rgb')) {
      classes.push('ui-border--custom-color')
    }
    else {
      classes.push(`ui-border--color-${props.color}`)
    }
  }

  // 预设圆角
  if (props.radius && props.radius !== '0') {
    if (props.radius.includes(' ')) {
      classes.push('ui-border--custom-radius')
    }
    else {
      const radiusValue = Number.parseInt(props.radius)
      if (radiusValue <= 24) {
        const radiusSize = radiusValue <= 2
          ? 'sm'
          : radiusValue <= 4
            ? 'md'
            : radiusValue <= 8
              ? 'lg'
              : radiusValue <= 12
                ? 'xl'
                : radiusValue <= 16 ? '2xl' : '3xl'
        classes.push(`ui-border--radius-${radiusSize}`)
      }
      else {
        classes.push('ui-border--radius-full')
      }
    }
  }

  // 阴影
  if (props.shadow) {
    classes.push(`ui-border--shadow-${props.shadow}`)
  }

  // 自定义阴影
  if (!['sm', 'base', 'md', 'lg', 'xl', '2xl'].includes(props.shadow) && props.shadow) {
    classes.push('ui-border--custom-shadow')
  }

  // 悬停效果
  if (props.hoverShadow || props.hoverBorderColor || props.hoverScale) {
    classes.push('ui-border--with-hover')
  }

  // 悬停阴影
  if (props.hoverShadow) {
    classes.push(`ui-border--hover-shadow-${props.hoverShadow}`)
  }

  // 悬停边框颜色
  if (props.hoverBorderColor) {
    if (['primary', 'success', 'warning', 'danger', 'gray-300', 'gray-500'].includes(props.hoverBorderColor)) {
      classes.push(`ui-border--hover-color-${props.hoverBorderColor}`)
    }
    else if (props.hoverBorderColor.startsWith('#') || props.hoverBorderColor.startsWith('rgb')) {
      classes.push('ui-border--hover-custom-color')
    }
    else {
      classes.push(`ui-border--hover-color-${props.hoverBorderColor}`)
    }
  }

  // 悬停缩放
  if (props.hoverScale) {
    classes.push('ui-border--hover-scale')
  }

  // 添加自定义类名
  if (props.className) {
    classes.push(props.className)
  }

  return classes.join(' ')
})

// 使用计算属性和v-bind实现CSS变量
const borderColorVar = computed(() => {
  if (props.color && (props.color.startsWith('#') || props.color.startsWith('rgb'))) {
    return props.color
  }
  return null
})

const borderWidthVar = computed(() => {
  const presetWidths = ['thin', 'medium', 'thick', '1px', '2px', '4px', '8px']
  if (props.width && !presetWidths.includes(props.width)) {
    return props.width
  }
  return null
})

const borderRadiusVar = computed(() => {
  if (props.radius && props.radius !== '0' && props.radius.includes(' ')) {
    return props.radius
  }
  if (props.radius && props.radius !== '0' && !props.radius.includes(' ')) {
    return props.radius
  }
  return null
})

const borderPaddingVar = computed(() => {
  if (props.padding && props.padding !== '0') {
    return props.padding
  }
  return null
})

const shadowVar = computed(() => {
  if (props.shadow && !['sm', 'base', 'md', 'lg', 'xl', '2xl'].includes(props.shadow)) {
    return props.shadow
  }
  if (props.shadowX || props.shadowY || props.shadowBlur || props.shadowSpread || props.shadowColor) {
    return `${props.shadowX || '0'} ${props.shadowY || '0'} ${props.shadowBlur || '0'} ${props.shadowSpread || '0'} ${props.shadowColor || 'rgba(0,0,0,0.1)'}`
  }
  return null
})

const hoverBorderColorVar = computed(() => {
  if (props.hoverBorderColor && (props.hoverBorderColor.startsWith('#') || props.hoverBorderColor.startsWith('rgb'))) {
    return props.hoverBorderColor
  }
  return null
})

const hoverScaleVar = computed(() => props.hoverScale || null)
</script>

<template>
  <div
    class="ui-border"
    :class="borderClass"
  >
    <slot />
  </div>
</template>

<style scoped>
/* 基础样式 */
.ui-border {
  --ui-border-color: v-bind(borderColorVar);
  --ui-border-width: v-bind(borderWidthVar);
  --ui-border-radius: v-bind(borderRadiusVar);
  --ui-border-padding: v-bind(borderPaddingVar);
  --ui-border-shadow: v-bind(shadowVar);
  --ui-border-hover-color: v-bind(hoverBorderColorVar);
  --ui-border-hover-scale: v-bind(hoverScaleVar);

  display: block;
  box-sizing: border-box;
  padding: var(--ui-border-padding, 0);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: var(--ui-border-radius, 0);
  transition: all 0.3s ease;
}

/* 边框类型 */
.ui-border--solid {
  border-style: solid;
}
.ui-border--dashed {
  border-style: dashed;
}
.ui-border--dotted {
  border-style: dotted;
}
.ui-border--double {
  border-style: double;
}
.ui-border--groove {
  border-style: groove;
}
.ui-border--ridge {
  border-style: ridge;
}
.ui-border--inset {
  border-style: inset;
}
.ui-border--outset {
  border-style: outset;
}
.ui-border--none {
  border-style: none;
}

/* 部分边框 */
.ui-border--partial {
  border: none;
}
.ui-border--top {
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
}
.ui-border--right {
  border-right: 1px solid var(--ui-border-color, #e5e7eb);
}
.ui-border--bottom {
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}
.ui-border--left {
  border-left: 1px solid var(--ui-border-color, #e5e7eb);
}

/* 边框宽度 */
.ui-border--width-thin,
.ui-border--width-0\.5 {
  border-width: 0.5px;
}
.ui-border--width-medium,
.ui-border--width-1 {
  border-width: 1px;
}
.ui-border--width-thick,
.ui-border--width-2 {
  border-width: 2px;
}
.ui-border--width-4 {
  border-width: 4px;
}
.ui-border--width-8 {
  border-width: 8px;
}
.ui-border--custom-width {
  border-width: var(--ui-border-width);
}

/* 边框颜色 */
.ui-border--color-primary {
  border-color: var(--ui-color-primary, #10b981);
}
.ui-border--color-success {
  border-color: var(--ui-color-success, #10b981);
}
.ui-border--color-warning {
  border-color: var(--ui-color-warning, #f59e0b);
}
.ui-border--color-danger {
  border-color: var(--ui-color-danger, #ef4444);
}
.ui-border--color-gray-300 {
  border-color: #d1d5db;
}
.ui-border--color-gray-500 {
  border-color: #6b7280;
}
.ui-border--custom-color {
  border-color: var(--ui-border-color);
}

/* 圆角 */
.ui-border--radius-sm {
  border-radius: 0.125rem;
}
.ui-border--radius-md {
  border-radius: 0.25rem;
}
.ui-border--radius-lg {
  border-radius: 0.5rem;
}
.ui-border--radius-xl {
  border-radius: 0.75rem;
}
.ui-border--radius-2xl {
  border-radius: 1rem;
}
.ui-border--radius-3xl {
  border-radius: 1.5rem;
}
.ui-border--radius-full {
  border-radius: 9999px;
}
.ui-border--custom-radius {
  border-radius: var(--ui-border-radius);
}

/* 阴影 */
.ui-border--shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.ui-border--shadow-base {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.ui-border--shadow-md {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.ui-border--shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.ui-border--shadow-xl {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.ui-border--shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.ui-border--custom-shadow {
  box-shadow: var(--ui-border-shadow);
}

/* 悬停效果 */
.ui-border--with-hover {
  transition: all 0.3s ease;
}

/* 悬停阴影 */
.ui-border--hover-shadow-sm:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.ui-border--hover-shadow-base:hover {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.ui-border--hover-shadow-md:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.ui-border--hover-shadow-lg:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.ui-border--hover-shadow-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.ui-border--hover-shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 悬停边框颜色 */
.ui-border--hover-color-primary:hover {
  border-color: var(--ui-color-primary, #10b981);
}
.ui-border--hover-color-success:hover {
  border-color: var(--ui-color-success, #10b981);
}
.ui-border--hover-color-warning:hover {
  border-color: var(--ui-color-warning, #f59e0b);
}
.ui-border--hover-color-danger:hover {
  border-color: var(--ui-color-danger, #ef4444);
}
.ui-border--hover-color-gray-300:hover {
  border-color: #d1d5db;
}
.ui-border--hover-color-gray-500:hover {
  border-color: #6b7280;
}
.ui-border--hover-custom-color:hover {
  border-color: var(--ui-border-hover-color);
}

/* 悬停缩放 */
.ui-border--hover-scale:hover {
  transform: scale(var(--ui-border-hover-scale, 1.05));
}

/* CSS变量已移至主题文件中 */
</style>
