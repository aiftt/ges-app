<script setup lang="ts" name="UiGrid">
/**
 * 栅格布局组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2024-09-15 - 使用集中管理的类型定义
 * 更新日期: 2024-10-14 - 使用CSS变量+v-bind实现动态样式
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

  // 设置列数 (只保留数字预设类)
  if (typeof props.cols === 'number') {
    classes.push(`grid-cols-${props.cols}`)
  }

  // 响应式列数 (只保留数字预设类)
  if (props.smCols && typeof props.smCols === 'number') {
    classes.push(`sm:grid-cols-${props.smCols}`)
  }

  if (props.mdCols && typeof props.mdCols === 'number') {
    classes.push(`md:grid-cols-${props.mdCols}`)
  }

  if (props.lgCols && typeof props.lgCols === 'number') {
    classes.push(`lg:grid-cols-${props.lgCols}`)
  }

  if (props.xlCols && typeof props.xlCols === 'number') {
    classes.push(`xl:grid-cols-${props.xlCols}`)
  }

  // 设置行数 (只保留数字预设类)
  if (typeof props.rows === 'number') {
    classes.push(`grid-rows-${props.rows}`)
  }

  // 对齐方式 - 这些都是预定义类名，不会有问题
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

  // 密集布局
  if (props.dense) {
    classes.push('grid-flow-dense')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  // 添加CSS变量标识类
  if (typeof props.cols === 'string' || typeof props.rows === 'string'
    || props.gap || props.colGap || props.rowGap || props.autoFill
    || (typeof props.smCols === 'string')
    || (typeof props.mdCols === 'string')
    || (typeof props.lgCols === 'string')
    || (typeof props.xlCols === 'string')) {
    classes.push('ui-grid--custom-styles')
  }

  return classes
})

// 使用 v-bind 和 CSS 变量定义计算属性，添加 || null 确保不会出现undefined值
const colsVar = computed(() => typeof props.cols === 'string' ? props.cols : null)
const rowsVar = computed(() => typeof props.rows === 'string' ? props.rows : null)
const gapVar = computed(() => props.gap || null)
const colGapVar = computed(() => props.colGap || null)
const rowGapVar = computed(() => props.rowGap || null)
const autoFillVar = computed(() => props.autoFill && props.autoCols
  ? `repeat(auto-fill, minmax(${props.autoFill}, 1fr))`
  : null)
const smColsVar = computed(() => typeof props.smCols === 'string' ? props.smCols : null)
const mdColsVar = computed(() => typeof props.mdCols === 'string' ? props.mdCols : null)
const lgColsVar = computed(() => typeof props.lgCols === 'string' ? props.lgCols : null)
const xlColsVar = computed(() => typeof props.xlCols === 'string' ? props.xlCols : null)
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-grid--custom-styles {
  /* 网格模板 */
  --ui-grid-template-columns: v-bind(colsVar);
  --ui-grid-template-rows: v-bind(rowsVar);

  /* 自动填充 */
  --ui-grid-auto-fill: v-bind(autoFillVar);

  /* 间距 */
  --ui-grid-gap: v-bind(gapVar);
  --ui-grid-column-gap: v-bind(colGapVar);
  --ui-grid-row-gap: v-bind(rowGapVar);

  /* 应用CSS变量 */
  grid-template-columns: var(--ui-grid-template-columns, var(--ui-grid-auto-fill));
  grid-template-rows: var(--ui-grid-template-rows);
  gap: var(--ui-grid-gap);
  column-gap: var(--ui-grid-column-gap);
  row-gap: var(--ui-grid-row-gap);
}

/* 响应式断点样式 */
@media (min-width: 640px) {
  .ui-grid--custom-styles {
    --ui-grid-sm-cols: v-bind(smColsVar);
    grid-template-columns: var(--ui-grid-sm-cols, var(--ui-grid-template-columns, var(--ui-grid-auto-fill)));
  }
}

@media (min-width: 768px) {
  .ui-grid--custom-styles {
    --ui-grid-md-cols: v-bind(mdColsVar);
    grid-template-columns: var(
      --ui-grid-md-cols,
      var(--ui-grid-sm-cols, var(--ui-grid-template-columns, var(--ui-grid-auto-fill)))
    );
  }
}

@media (min-width: 1024px) {
  .ui-grid--custom-styles {
    --ui-grid-lg-cols: v-bind(lgColsVar);
    grid-template-columns: var(
      --ui-grid-lg-cols,
      var(--ui-grid-md-cols, var(--ui-grid-sm-cols, var(--ui-grid-template-columns, var(--ui-grid-auto-fill))))
    );
  }
}

@media (min-width: 1280px) {
  .ui-grid--custom-styles {
    --ui-grid-xl-cols: v-bind(xlColsVar);
    grid-template-columns: var(
      --ui-grid-xl-cols,
      var(
        --ui-grid-lg-cols,
        var(--ui-grid-md-cols, var(--ui-grid-sm-cols, var(--ui-grid-template-columns, var(--ui-grid-auto-fill))))
      )
    );
  }
}
</style>
