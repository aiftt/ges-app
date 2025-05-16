<script setup lang="ts" name="UiSpace">
/**
 * 空间组件
 * 创建日期: 2024-01-15
 * 作者: aiftt
 * 更新日期: 2024-02-27 - 将内联样式改为CSS变量
 * 更新日期: 2024-03-01 - 优化为v-bind+CSS变量实现动态样式
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-13 - 使用统一管理的方向和对齐方式类型
 * 更新日期: 2024-12-19 - 优化使用unocss代替自定义类名
 *
 * 用于控制元素间距的布局组件
 */

import type { Align, Direction, JustifyContent, SpaceGap } from '~/types/ui'
import { Comment, Text, useSlots } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 间距大小
   */
  gap?: SpaceGap
  /**
   * 排列方向
   */
  direction?: Direction
  /**
   * 对齐方式
   */
  align?: Align
  /**
   * 主轴对齐方式
   */
  justify?: JustifyContent
  /**
   * 是否自动换行，仅在水平方向有效
   */
  wrap?: boolean
  /**
   * 是否显示分割线
   */
  split?: boolean
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  gap: 'default',
  direction: 'horizontal',
  align: 'center',
  justify: 'start',
  wrap: false,
  split: false,
  class: '',
})

// 获取slots
const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)

// 计算间距值
const gapVar = computed(() => {
  if (typeof props.gap === 'string' && !(['small', 'default', 'large'].includes(props.gap))) {
    return props.gap
  }

  // 预设间距值
  const gapMap = {
    small: '8px',
    default: '16px',
    large: '24px',
  }

  return gapMap[props.gap as 'small' | 'default' | 'large'] || gapMap.default
})

// 分割线样式
const splitLineStyle = computed(() => ({
  margin: props.direction === 'horizontal' ? `0 ${gapVar.value}` : `${gapVar.value} 0`,
  height: props.direction === 'horizontal' ? '1rem' : '1px',
  width: props.direction === 'horizontal' ? '1px' : '100%',
}))

// 空间容器样式
const spaceItemStyle = computed(() => {
  if (props.direction === 'horizontal') {
    return {
      marginRight: props.split ? '0' : gapVar.value,
    }
  }
  else {
    return {
      marginBottom: props.split ? '0' : gapVar.value,
    }
  }
})

// 合并所有类名到一个计算属性
const containerClasses = computed(() => {
  const classes = ['ui-space', 'flex']

  // 方向类
  classes.push(props.direction === 'horizontal' ? 'flex-row' : 'flex-col')

  // 对齐方式类
  switch (props.align) {
    case 'start':
      classes.push('items-start')
      break
    case 'end':
      classes.push('items-end')
      break
    case 'stretch':
      classes.push('items-stretch')
      break
    case 'baseline':
      classes.push('items-baseline')
      break
    default:
      classes.push('items-center')
  }

  // 主轴对齐方式类
  switch (props.justify) {
    case 'end':
      classes.push('justify-end')
      break
    case 'center':
      classes.push('justify-center')
      break
    case 'around':
      classes.push('justify-around')
      break
    case 'between':
      classes.push('justify-between')
      break
    default:
      classes.push('justify-start')
  }

  // 换行类
  classes.push(props.wrap ? 'flex-wrap' : 'flex-nowrap')

  // 自定义类
  if (props.class)
    classes.push(props.class)

  return classes.join(' ')
})
</script>

<template>
  <div
    v-if="hasDefaultSlot"
    :class="containerClasses"
  >
    <template v-for="(child, index) in slots.default?.()">
      <template v-if="child.type !== Comment && child.type !== Text">
        <div
          :key="`${index}-item`"
          class="flex-none"
          :style="index < (slots.default?.().length || 0) - 1 && !split ? spaceItemStyle : {}"
        >
          <component :is="child" />
        </div>
        <div
          v-if="split && index < (slots.default?.().length || 0) - 1"
          :key="`${index}-split`"
          class="bg-gray-200 dark:bg-gray-700"
          :style="splitLineStyle"
        />
      </template>
    </template>
  </div>
</template>
