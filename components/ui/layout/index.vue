<script setup lang="ts" name="UiLayout">
/**
 * 布局组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2023-12-02 - 改为使用CSS变量实现样式
 * 更新日期: 2024-09-13 - 使用集中管理的类型定义
 *
 * 用于构建页面的基本布局结构，提供灵活的布局控制
 */
import type { Align, FlexDirection, Justify, Wrap } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 布局类型
   */
  type?: 'flex' | 'grid' | 'block'
  /**
   * 方向 (对flex类型有效)
   */
  direction?: FlexDirection
  /**
   * 水平对齐方式 (对flex类型有效)
   */
  justify?: Justify
  /**
   * 垂直对齐方式 (对flex类型有效)
   */
  align?: Align
  /**
   * flex元素包裹方式 (对flex类型有效)
   */
  wrap?: Wrap
  /**
   * 元素间距 (支持x和y方向)
   */
  gap?: string
  /**
   * 元素水平间距
   */
  gapX?: string
  /**
   * 元素垂直间距
   */
  gapY?: string
  /**
   * 网格列数 (对grid类型有效)
   */
  cols?: number | string
  /**
   * 网格行数 (对grid类型有效)
   */
  rows?: number | string
  /**
   * 内边距
   */
  padding?: string
  /**
   * 外边距
   */
  margin?: string
  /**
   * 宽度
   */
  width?: string
  /**
   * 高度
   */
  height?: string
  /**
   * 是否全宽
   */
  fullWidth?: boolean
  /**
   * 是否全高
   */
  fullHeight?: boolean
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  type: 'flex',
  direction: 'row',
  justify: 'start',
  align: 'start',
  wrap: 'nowrap',
  gap: '',
  gapX: '',
  gapY: '',
  cols: '',
  rows: '',
  padding: '',
  margin: '',
  width: '',
  height: '',
  fullWidth: false,
  fullHeight: false,
  bgColor: '',
  class: '',
})

// 背景颜色样式变量
const bgColorVar = computed(() => props.bgColor || null)

// 计算布局容器的类名
const layoutClass = computed(() => {
  const classes = ['ui-layout']

  // 基础样式
  if (props.type === 'flex') {
    classes.push('flex')

    // Flex方向
    if (props.direction === 'row') {
      classes.push('flex-row')
    }
    else if (props.direction === 'row-reverse') {
      classes.push('flex-row-reverse')
    }
    else if (props.direction === 'column') {
      classes.push('flex-col')
    }
    else if (props.direction === 'column-reverse') {
      classes.push('flex-col-reverse')
    }

    // 水平对齐
    if (props.justify === 'start') {
      classes.push('justify-start')
    }
    else if (props.justify === 'end') {
      classes.push('justify-end')
    }
    else if (props.justify === 'center') {
      classes.push('justify-center')
    }
    else if (props.justify === 'between') {
      classes.push('justify-between')
    }
    else if (props.justify === 'around') {
      classes.push('justify-around')
    }
    else if (props.justify === 'evenly') {
      classes.push('justify-evenly')
    }

    // 垂直对齐
    if (props.align === 'start') {
      classes.push('items-start')
    }
    else if (props.align === 'end') {
      classes.push('items-end')
    }
    else if (props.align === 'center') {
      classes.push('items-center')
    }
    else if (props.align === 'stretch') {
      classes.push('items-stretch')
    }
    else if (props.align === 'baseline') {
      classes.push('items-baseline')
    }

    // Flex换行
    if (props.wrap === 'nowrap') {
      classes.push('flex-nowrap')
    }
    else if (props.wrap === 'wrap') {
      classes.push('flex-wrap')
    }
    else if (props.wrap === 'wrap-reverse') {
      classes.push('flex-wrap-reverse')
    }
  }
  else if (props.type === 'grid') {
    classes.push('grid')

    // 网格列数
    if (props.cols) {
      if (typeof props.cols === 'number') {
        classes.push(`grid-cols-${props.cols}`)
      }
      else {
        classes.push(`grid-cols-[${props.cols}]`)
      }
    }

    // 网格行数
    if (props.rows) {
      if (typeof props.rows === 'number') {
        classes.push(`grid-rows-${props.rows}`)
      }
      else {
        classes.push(`grid-rows-[${props.rows}]`)
      }
    }
  }
  else {
    classes.push('block')
  }

  // 间距
  if (props.gap) {
    classes.push(`gap-[${props.gap}]`)
  }

  if (props.gapX) {
    classes.push(`gap-x-[${props.gapX}]`)
  }

  if (props.gapY) {
    classes.push(`gap-y-[${props.gapY}]`)
  }

  // 宽度和高度
  if (props.fullWidth) {
    classes.push('w-full')
  }
  else if (props.width) {
    classes.push(`w-[${props.width}]`)
  }

  if (props.fullHeight) {
    classes.push('h-full')
  }
  else if (props.height) {
    classes.push(`h-[${props.height}]`)
  }

  // 内边距和外边距
  if (props.padding) {
    classes.push(`p-[${props.padding}]`)
  }

  if (props.margin) {
    classes.push(`m-[${props.margin}]`)
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  // 自定义背景色标记
  if (props.bgColor) {
    classes.push('ui-layout--custom-bg')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="layoutClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-layout--custom-bg {
  --ui-layout-bg-color: v-bind(bgColorVar);
  background-color: var(--ui-layout-bg-color);
}
</style>
