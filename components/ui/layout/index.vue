<script setup lang="ts" name="UiLayout">
/**
 * 布局组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2023-12-02 - 改为使用CSS变量实现样式
 * 更新日期: 2024-09-13 - 使用集中管理的类型定义
 * 更新日期: 2024-10-14 - 优化CSS变量实现，解决UnoCSS问题
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

// CSS变量计算属性，添加 || null 确保undefined不会覆盖默认值
const bgColorVar = computed(() => props.bgColor || null)
const colsVar = computed(() => typeof props.cols === 'string' ? props.cols : null)
const rowsVar = computed(() => typeof props.rows === 'string' ? props.rows : null)
const gapVar = computed(() => props.gap || null)
const gapXVar = computed(() => props.gapX || null)
const gapYVar = computed(() => props.gapY || null)
const paddingVar = computed(() => props.padding || null)
const marginVar = computed(() => props.margin || null)
const widthVar = computed(() => !props.fullWidth && props.width ? props.width : null)
const heightVar = computed(() => !props.fullHeight && props.height ? props.height : null)

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

    // 网格列数 - 只保留数字形式的类名
    if (props.cols && typeof props.cols === 'number') {
      classes.push(`grid-cols-${props.cols}`)
    }

    // 网格行数 - 只保留数字形式的类名
    if (props.rows && typeof props.rows === 'number') {
      classes.push(`grid-rows-${props.rows}`)
    }
  }
  else {
    classes.push('block')
  }

  // 宽度和高度 - 保留静态类名
  if (props.fullWidth) {
    classes.push('w-full')
  }

  if (props.fullHeight) {
    classes.push('h-full')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  // 添加CSS变量标识类
  if (props.bgColor || typeof props.cols === 'string' || typeof props.rows === 'string'
    || props.gap || props.gapX || props.gapY || props.padding || props.margin
    || (!props.fullWidth && props.width) || (!props.fullHeight && props.height)) {
    classes.push('ui-layout--custom-styles')
  }

  return classes
})
</script>

<template>
  <div :class="layoutClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-layout--custom-styles {
  /* 背景颜色 */
  --ui-layout-bg-color: v-bind(bgColorVar);

  /* 网格属性 */
  --ui-layout-grid-cols: v-bind(colsVar);
  --ui-layout-grid-rows: v-bind(rowsVar);

  /* 间距 */
  --ui-layout-gap: v-bind(gapVar);
  --ui-layout-gap-x: v-bind(gapXVar);
  --ui-layout-gap-y: v-bind(gapYVar);

  /* 边距 */
  --ui-layout-padding: v-bind(paddingVar);
  --ui-layout-margin: v-bind(marginVar);

  /* 尺寸 */
  --ui-layout-width: v-bind(widthVar);
  --ui-layout-height: v-bind(heightVar);

  /* 应用CSS变量 */
  background-color: var(--ui-layout-bg-color);
  grid-template-columns: var(--ui-layout-grid-cols);
  grid-template-rows: var(--ui-layout-grid-rows);
  gap: var(--ui-layout-gap);
  column-gap: var(--ui-layout-gap-x);
  row-gap: var(--ui-layout-gap-y);
  padding: var(--ui-layout-padding);
  margin: var(--ui-layout-margin);
  width: var(--ui-layout-width);
  height: var(--ui-layout-height);
}
</style>
