<script setup lang="ts" name="UiLoader">
/**
 * CSS加载器组件
 * 创建日期: 2023-12-06
 * 作者: Claude
 * 更新日期: 2023-12-06 - 初始创建
 * 更新日期: 2024-12-06 - 添加插槽支持，移动样式到全局文件
 * 更新日期: 2024-12-07 - 添加多种类型加载器支持
 * 更新日期: 2024-12-07 - 优化为纯CSS实现，不添加额外DOM元素
 * 更新日期: 2024-12-07 - 添加环形、波浪和文本加载器支持
 * 更新日期: 2024-12-08 - 扩展支持全部CSS Loaders类型
 */

// 类型定义
type LoaderCategory =
  'polygon' | 'spinner' | 'dots' | 'bars' | 'ring' | 'wave' | 'text' |
  'classic' | 'shape' | '3d' | 'progress' | 'wobble' | 'infinity' | 'zigzag' |
  'mechanic' | 'filling' | 'bouncing' | 'glowing' | 'rolling' | 'flipping' |
  'continuous' | 'pulsing' | 'arcade' | 'hypnotic' | 'square' | 'circle' |
  'squarevscircle' | 'colorful' | 'nature' | 'time' | 'hungry' | 'shuriken' |
  'dancers' | 'moving' | 'eyes' | 'line' | 'thin' | 'cut' | 'clones' |
  'arrow' | 'blob' | 'maze' | 'factory'

type PolygonType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// Props定义
const props = withDefaults(defineProps<{
  /**
   * 加载器类型 (可选值见官方文档或demo页)
   */
  type?: number | string | PolygonType | `${LoaderCategory}-${number}`
  /**
   * 加载器大小
   */
  size?: string
  /**
   * 加载器颜色
   */
  color?: string
  /**
   * 是否包含内容
   */
  withContent?: boolean
  /**
   * 加载器类别
   */
  category?: LoaderCategory
}>(), {
  type: 1,
  size: '48px',
  color: 'var(--ges-color-primary, #1890ff)',
  withContent: false,
  category: 'polygon',
})

// 提取颜色RGB部分的函数
function extractRGB(color: string) {
  // 如果是十六进制颜色
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    // 转换为RGB
    if (hex.length === 3) {
      const r = Number.parseInt(hex[0] + hex[0], 16)
      const g = Number.parseInt(hex[1] + hex[1], 16)
      const b = Number.parseInt(hex[2] + hex[2], 16)
      return `${r}, ${g}, ${b}`
    }
    else if (hex.length === 6) {
      const r = Number.parseInt(hex.slice(0, 2), 16)
      const g = Number.parseInt(hex.slice(2, 4), 16)
      const b = Number.parseInt(hex.slice(4, 6), 16)
      return `${r}, ${g}, ${b}`
    }
  }
  // 如果是rgb颜色
  else if (color.startsWith('rgb(')) {
    return color.replace('rgb(', '').replace(')', '').trim()
  }
  // 如果是rgba颜色
  else if (color.startsWith('rgba(')) {
    return color.replace('rgba(', '').replace(/,[^,]*\)$/, '').trim()
  }
  // 默认返回蓝色
  return '24, 144, 255'
}

// 获取插槽
const slots = useSlots()

// 计算是否有默认插槽内容
const hasSlotContent = computed(() => !!slots.default)

// 计算加载器类别和类型
const loaderInfo = computed(() => {
  // 如果type是字符串并且包含'-'，则解析类别和类型
  if (typeof props.type === 'string' && props.type.includes('-')) {
    const [category, typeStr] = props.type.split('-')
    const type = Number.parseInt(typeStr)
    return { category, type }
  }

  // 否则使用默认类别和传入类型
  return {
    category: props.category,
    type: typeof props.type === 'number' ? props.type : Number.parseInt(props.type as string),
  }
})

// 计算样式变量
const loaderVars = computed(() => {
  const colorRGB = extractRGB(props.color)

  return {
    '--ges-loader-size': props.size,
    '--ges-loader-color': props.color,
    '--ges-loader-color-rgb': colorRGB,
  }
})

// 计算最终的类名
const loaderClass = computed(() => {
  const { category, type } = loaderInfo.value

  if (category === 'polygon') {
    return [
      'ges-loader',
      `ges-loader-type-${type}`,
      {
        'ges-loader-with-content': hasSlotContent.value || props.withContent,
      },
    ]
  }

  return [
    `ges-loader-${category}-${type}`,
    {
      'ges-loader-with-content': hasSlotContent.value || props.withContent,
    },
  ]
})
</script>

<template>
  <div
    :class="loaderClass"
    :style="loaderVars"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
/* 样式已全局导入，无需在组件中重复 */
</style>
