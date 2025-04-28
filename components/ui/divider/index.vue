<script setup lang="ts" name="UiDivider">
/**
 * 分割线组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 *
 * 用于分隔内容的水平或垂直分割线
 */

import { computed } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 分割线方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 是否带有文字
   */
  withText?: boolean
  /**
   * 文字位置
   */
  textPosition?: 'left' | 'center' | 'right'
  /**
   * 分割线类型
   */
  type?: 'solid' | 'dashed' | 'dotted'
  /**
   * 分割线颜色
   */
  color?: string
  /**
   * 分割线宽度
   */
  width?: string
  /**
   * 分割线上下margin
   */
  margin?: string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  direction: 'horizontal',
  withText: false,
  textPosition: 'center',
  type: 'solid',
  color: '',
  width: '',
  margin: '1rem',
  class: '',
})

// 计算分割线的类名
const dividerClass = computed(() => {
  const classes = [
    // 通用样式
    'box-border relative flex items-center',
    'text-sm leading-normal list-none',

    // 方向相关样式
    props.direction === 'horizontal'
      ? 'w-full min-w-full h-px clear-both'
      : 'inline-flex h-[0.9em] align-middle',
  ]

  // 边框类型样式
  if (props.direction === 'horizontal') {
    if (!props.withText) {
      classes.push(
        props.type === 'solid'
          ? 'border-t border-solid'
          : props.type === 'dashed'
            ? 'border-t border-dashed'
            : 'border-t border-dotted',
      )
    }
  }
  else {
    classes.push(
      props.type === 'solid'
        ? 'border-l border-solid'
        : props.type === 'dashed'
          ? 'border-l border-dashed'
          : 'border-l border-dotted',
    )
  }

  // 带文本的分割线样式
  if (props.withText) {
    classes.push('border-t-0 bg-transparent')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 文本样式类
const textClass = computed(() => {
  const classes = [
    'inline-block px-4 font-medium whitespace-nowrap',
    'text-gray-600 dark:text-gray-300',
  ]

  return classes.join(' ')
})

// 分割线样式
const dividerStyle = computed(() => {
  const style: Record<string, string> = {}

  // 颜色
  if (props.color) {
    if (props.direction === 'horizontal' && !props.withText) {
      style.borderColor = props.color
    }
    else if (props.direction === 'vertical') {
      style.borderColor = props.color
    }
  }
  else {
    // 默认颜色
    style.borderColor = 'rgb(229, 231, 235)'
  }

  // 宽度
  if (props.width && props.direction === 'vertical') {
    style.borderWidth = props.width
  }

  // 边距
  if (props.margin) {
    if (props.direction === 'horizontal') {
      style.margin = `${props.margin} 0`
    }
    else {
      style.margin = `0 ${props.margin}`
    }
  }

  return style
})

// 生成伪元素样式
const pseudoElementStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.color) {
    style.backgroundColor = props.color
  }
  else {
    style.backgroundColor = 'rgb(229, 231, 235)'
  }

  return style
})

// 左侧伪元素类
const beforeClass = computed(() => {
  const classes = [
    'content-empty flex-1 h-px',
    props.textPosition === 'left' ? 'w-[5%]' : props.textPosition === 'right' ? 'w-[95%]' : '',
  ]

  return classes.join(' ')
})

// 右侧伪元素类
const afterClass = computed(() => {
  const classes = [
    'content-empty flex-1 h-px',
    props.textPosition === 'left' ? 'w-[95%]' : props.textPosition === 'right' ? 'w-[5%]' : '',
  ]

  return classes.join(' ')
})
</script>

<template>
  <div :class="dividerClass" :style="dividerStyle">
    <template v-if="withText">
      <div :class="beforeClass" :style="pseudoElementStyle" />
      <span :class="textClass">
        <slot />
      </span>
      <div :class="afterClass" :style="pseudoElementStyle" />
    </template>
  </div>
</template>
