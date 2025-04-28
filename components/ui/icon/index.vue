<script setup lang="ts" name="UiIcon">
/**
 * 图标组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 图标名称（使用iconify格式，如：'carbon:home'）
   */
  icon: string
  /**
   * 图标尺寸
   */
  size?: 'small' | 'default' | 'large' | string
  /**
   * 图标颜色，可以是任何有效的CSS颜色值
   */
  color?: string
  /**
   * 是否旋转图标
   */
  spin?: boolean
  /**
   * 自定义样式类名
   */
  class?: string
}>(), {
  size: 'default',
  color: '',
  spin: false,
  class: '',
})

// 计算尺寸
const sizeMap = {
  small: '1rem',
  default: '1.5rem',
  large: '2rem',
}

// 计算实际尺寸
const actualSize = computed(() => {
  if (props.size in sizeMap) {
    return sizeMap[props.size as keyof typeof sizeMap]
  }
  return props.size
})

// 计算样式
const iconStyle = computed(() => {
  const style: Record<string, string> = {}

  if (actualSize.value) {
    style.fontSize = actualSize.value
    style.width = actualSize.value
    style.height = actualSize.value
  }

  if (props.color) {
    style.color = props.color
  }

  return style
})

// 计算类名
const iconClass = computed(() => {
  const classes = [
    'inline-flex items-center justify-center align-middle leading-none',
  ]

  if (props.spin) {
    classes.push('animate-spin')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <iconify-icon
    :icon="icon"
    :style="iconStyle"
    :class="iconClass"
    inline
  />
</template>
