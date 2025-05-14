<script setup lang="ts" name="UiGridItem">
/**
 * 栅格项组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2024-10-14 - 使用CSS变量+v-bind替代动态类名
 *
 * 用于在Grid布局中定位元素，设置跨行跨列等
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 起始列位置
   */
  colStart?: number | string
  /**
   * 结束列位置
   */
  colEnd?: number | string
  /**
   * 所占列数
   */
  colSpan?: number
  /**
   * 起始行位置
   */
  rowStart?: number | string
  /**
   * 结束行位置
   */
  rowEnd?: number | string
  /**
   * 所占行数
   */
  rowSpan?: number
  /**
   * 对齐方式
   */
  justify?: 'start' | 'end' | 'center' | 'stretch'
  /**
   * 垂直对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  colStart: '',
  colEnd: '',
  colSpan: 0,
  rowStart: '',
  rowEnd: '',
  rowSpan: 0,
  justify: undefined,
  align: undefined,
  class: '',
})

// 计算CSS变量
const colStartVar = computed(() => typeof props.colStart === 'string' ? props.colStart : null)
const colEndVar = computed(() => typeof props.colEnd === 'string' ? props.colEnd : null)
const rowStartVar = computed(() => typeof props.rowStart === 'string' ? props.rowStart : null)
const rowEndVar = computed(() => typeof props.rowEnd === 'string' ? props.rowEnd : null)

// 计算Grid Item的类名
const itemClass = computed(() => {
  const classes = [
    'ui-grid-item',
  ]

  // 列位置相关 (只保留数字类名)
  if (typeof props.colStart === 'number') {
    classes.push(`col-start-${props.colStart}`)
  }
  else if (props.colStart) {
    classes.push('ui-grid-item--custom-col-start')
  }

  if (typeof props.colEnd === 'number') {
    classes.push(`col-end-${props.colEnd}`)
  }
  else if (props.colEnd) {
    classes.push('ui-grid-item--custom-col-end')
  }

  if (props.colSpan > 0) {
    classes.push(`col-span-${props.colSpan}`)
  }

  // 行位置相关 (只保留数字类名)
  if (typeof props.rowStart === 'number') {
    classes.push(`row-start-${props.rowStart}`)
  }
  else if (props.rowStart) {
    classes.push('ui-grid-item--custom-row-start')
  }

  if (typeof props.rowEnd === 'number') {
    classes.push(`row-end-${props.rowEnd}`)
  }
  else if (props.rowEnd) {
    classes.push('ui-grid-item--custom-row-end')
  }

  if (props.rowSpan > 0) {
    classes.push(`row-span-${props.rowSpan}`)
  }

  // 对齐方式
  if (props.justify === 'start') {
    classes.push('justify-self-start')
  }
  else if (props.justify === 'end') {
    classes.push('justify-self-end')
  }
  else if (props.justify === 'center') {
    classes.push('justify-self-center')
  }
  else if (props.justify === 'stretch') {
    classes.push('justify-self-stretch')
  }

  if (props.align === 'start') {
    classes.push('self-start')
  }
  else if (props.align === 'end') {
    classes.push('self-end')
  }
  else if (props.align === 'center') {
    classes.push('self-center')
  }
  else if (props.align === 'stretch') {
    classes.push('self-stretch')
  }
  else if (props.align === 'baseline') {
    classes.push('self-baseline')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes
})
</script>

<template>
  <div :class="itemClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-grid-item--custom-col-start {
  --ui-grid-item-col-start: v-bind(colStartVar);
  grid-column-start: var(--ui-grid-item-col-start);
}

.ui-grid-item--custom-col-end {
  --ui-grid-item-col-end: v-bind(colEndVar);
  grid-column-end: var(--ui-grid-item-col-end);
}

.ui-grid-item--custom-row-start {
  --ui-grid-item-row-start: v-bind(rowStartVar);
  grid-row-start: var(--ui-grid-item-row-start);
}

.ui-grid-item--custom-row-end {
  --ui-grid-item-row-end: v-bind(rowEndVar);
  grid-row-end: var(--ui-grid-item-row-end);
}
</style>
