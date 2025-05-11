<script setup lang="ts" name="UiGrid">
/**
 * 栅格布局组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2024-09-15 - 使用集中管理的类型定义
 *
 * 提供响应式栅格布局系统，基于 CSS Grid 实现
 */
import type { ContentAlign, ItemsAlign } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 列数，可以是数字或模板字符串
   * 例如：3 表示三等分
   * 例如：'1fr 2fr 1fr' 表示左右为1单位，中间为2单位的三列
   * 例如：'200px 1fr' 表示左侧固定200px，右侧自适应
   */
  cols?: number | string
  /**
   * 行数，可以是数字或模板字符串
   */
  rows?: number | string
  /**
   * 栅格间距
   */
  gap?: string
  /**
   * 栅格列间距
   */
  colGap?: string
  /**
   * 栅格行间距
   */
  rowGap?: string
  /**
   * 栅格内容水平对齐方式
   */
  justifyItems?: ItemsAlign
  /**
   * 栅格内容垂直对齐方式
   */
  alignItems?: ItemsAlign
  /**
   * 整个栅格在容器中的水平对齐方式
   */
  justifyContent?: ContentAlign
  /**
   * 整个栅格在容器中的垂直对齐方式
   */
  alignContent?: ContentAlign
  /**
   * 是否自动填充行
   */
  autoRows?: boolean
  /**
   * 是否自动填充列
   */
  autoCols?: boolean
  /**
   * 自动填充最小尺寸
   */
  autoFill?: string
  /**
   * 是否使用密集布局 (compact)
   */
  dense?: boolean
  /**
   * 响应式配置，sm断点的列数
   */
  smCols?: number | string
  /**
   * 响应式配置，md断点的列数
   */
  mdCols?: number | string
  /**
   * 响应式配置，lg断点的列数
   */
  lgCols?: number | string
  /**
   * 响应式配置，xl断点的列数
   */
  xlCols?: number | string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  cols: 12,
  rows: '',
  gap: '',
  colGap: '',
  rowGap: '',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'start',
  alignContent: 'start',
  autoRows: false,
  autoCols: false,
  autoFill: '',
  dense: false,
  smCols: '',
  mdCols: '',
  lgCols: '',
  xlCols: '',
  class: '',
})

// 计算栅格类名
const gridClass = computed(() => {
  const classes = [
    'ui-grid',
    'grid',
  ]

  // 设置列数
  if (typeof props.cols === 'number') {
    classes.push(`grid-cols-${props.cols}`)
  }
  else if (props.cols) {
    classes.push(`grid-cols-[${props.cols}]`)
  }

  // 响应式列数
  if (props.smCols) {
    if (typeof props.smCols === 'number') {
      classes.push(`sm:grid-cols-${props.smCols}`)
    }
    else {
      classes.push(`sm:grid-cols-[${props.smCols}]`)
    }
  }

  if (props.mdCols) {
    if (typeof props.mdCols === 'number') {
      classes.push(`md:grid-cols-${props.mdCols}`)
    }
    else {
      classes.push(`md:grid-cols-[${props.mdCols}]`)
    }
  }

  if (props.lgCols) {
    if (typeof props.lgCols === 'number') {
      classes.push(`lg:grid-cols-${props.lgCols}`)
    }
    else {
      classes.push(`lg:grid-cols-[${props.lgCols}]`)
    }
  }

  if (props.xlCols) {
    if (typeof props.xlCols === 'number') {
      classes.push(`xl:grid-cols-${props.xlCols}`)
    }
    else {
      classes.push(`xl:grid-cols-[${props.xlCols}]`)
    }
  }

  // 设置行数
  if (typeof props.rows === 'number') {
    classes.push(`grid-rows-${props.rows}`)
  }
  else if (props.rows) {
    classes.push(`grid-rows-[${props.rows}]`)
  }

  // 设置间距
  if (props.gap) {
    classes.push(`gap-[${props.gap}]`)
  }

  if (props.colGap) {
    classes.push(`gap-x-[${props.colGap}]`)
  }

  if (props.rowGap) {
    classes.push(`gap-y-[${props.rowGap}]`)
  }

  // 对齐方式
  if (props.justifyItems === 'start') {
    classes.push('justify-items-start')
  }
  else if (props.justifyItems === 'end') {
    classes.push('justify-items-end')
  }
  else if (props.justifyItems === 'center') {
    classes.push('justify-items-center')
  }
  else if (props.justifyItems === 'stretch') {
    classes.push('justify-items-stretch')
  }

  if (props.alignItems === 'start') {
    classes.push('items-start')
  }
  else if (props.alignItems === 'end') {
    classes.push('items-end')
  }
  else if (props.alignItems === 'center') {
    classes.push('items-center')
  }
  else if (props.alignItems === 'stretch') {
    classes.push('items-stretch')
  }
  else if (props.alignItems === 'baseline') {
    classes.push('items-baseline')
  }

  if (props.justifyContent === 'start') {
    classes.push('justify-start')
  }
  else if (props.justifyContent === 'end') {
    classes.push('justify-end')
  }
  else if (props.justifyContent === 'center') {
    classes.push('justify-center')
  }
  else if (props.justifyContent === 'stretch') {
    classes.push('justify-stretch')
  }
  else if (props.justifyContent === 'between') {
    classes.push('justify-between')
  }
  else if (props.justifyContent === 'around') {
    classes.push('justify-around')
  }
  else if (props.justifyContent === 'evenly') {
    classes.push('justify-evenly')
  }

  if (props.alignContent === 'start') {
    classes.push('content-start')
  }
  else if (props.alignContent === 'end') {
    classes.push('content-end')
  }
  else if (props.alignContent === 'center') {
    classes.push('content-center')
  }
  else if (props.alignContent === 'stretch') {
    classes.push('content-stretch')
  }
  else if (props.alignContent === 'between') {
    classes.push('content-between')
  }
  else if (props.alignContent === 'around') {
    classes.push('content-around')
  }
  else if (props.alignContent === 'evenly') {
    classes.push('content-evenly')
  }

  // 自动填充
  if (props.autoRows) {
    classes.push('auto-rows-auto')
  }

  if (props.autoCols) {
    classes.push('auto-cols-auto')
  }

  if (props.autoFill && props.autoCols) {
    classes.push(`grid-cols-[repeat(auto-fill,minmax(${props.autoFill},1fr))]`)
  }

  // 密集布局
  if (props.dense) {
    classes.push('grid-flow-dense')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>
