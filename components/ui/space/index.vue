<script setup lang="ts" name="UiSpace">
/**
 * 空间间距组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 *
 * 用于设置元素之间的间距，提供水平和垂直方向的间隔
 */

// 定义props
// 定义VNode类型
import type { VNode } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 间距大小
   */
  size?: 'small' | 'medium' | 'large' | number | string
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline'
  /**
   * 是否环绕式布局
   */
  wrap?: boolean
  /**
   * 是否渲染为行内元素
   */
  inline?: boolean
  /**
   * 是否填充父容器
   */
  fill?: boolean
  /**
   * 分隔符
   */
  split?: boolean
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  direction: 'horizontal',
  size: 'medium',
  align: 'center',
  wrap: false,
  inline: false,
  fill: false,
  split: false,
  class: '',
})

// 计算空间容器的类名
const spaceClass = computed(() => {
  const classes = [
    'flex',
    'items-center',
  ]

  // 间距方向
  if (props.direction === 'vertical') {
    classes.push('flex-col')
  }
  else {
    classes.push('flex-row')
  }

  // 对齐方式
  if (props.align === 'start') {
    classes.push('items-start')
  }
  else if (props.align === 'end') {
    classes.push('items-end')
  }
  else if (props.align === 'center') {
    classes.push('items-center')
  }
  else if (props.align === 'baseline') {
    classes.push('items-baseline')
  }

  // 换行
  if (props.wrap) {
    classes.push('flex-wrap')
  }

  // 行内显示
  if (props.inline) {
    classes.push('inline-flex')
  }

  // 填充父容器
  if (props.fill) {
    classes.push('w-full')

    // 子元素均分空间
    classes.push('children:flex-1')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算间距样式
const spacingStyle = computed(() => {
  let gapSize: string

  // 计算间距大小
  if (typeof props.size === 'number') {
    gapSize = `${props.size}px`
  }
  else if (props.size === 'small') {
    gapSize = '8px'
  }
  else if (props.size === 'large') {
    gapSize = '24px'
  }
  else if (typeof props.size === 'string' && !['small', 'medium', 'large'].includes(props.size)) {
    gapSize = props.size
  }
  else {
    // 默认medium
    gapSize = '16px'
  }

  // 根据方向使用合适的间距
  return {
    gap: gapSize,
  }
})

// 处理子元素，过滤掉null和undefined
const filteredChildren = computed(() => {
  return filterEmptyChildren($slots.default?.())
})

// 过滤空子元素
function filterEmptyChildren(children?: VNode[]): VNode[] {
  if (!children)
    return []

  return children.filter((child) => {
    // 检查子元素是否为注释或空值
    return child && !(typeof child.type === 'symbol')
  })
}
</script>

<template>
  <div :class="spaceClass" :style="spacingStyle">
    <template v-for="(child, index) in filteredChildren" :key="index">
      <div class="ui-space-item">
        <component :is="child" />
      </div>
      <div v-if="split && index < filteredChildren.length - 1" class="ui-space-split">
        <div class="mx-2 h-4 w-px bg-gray-200 dark:bg-gray-700" />
      </div>
    </template>
  </div>
</template>
