<script setup lang="ts" name="UiSpace">
/**
 * 空间组件
 * 创建日期: 2024-01-15
 * 作者: aiftt
 * 更新日期: 2024-02-27 - 将内联样式改为CSS变量
 * 更新日期: 2024-03-01 - 优化为v-bind+CSS变量实现动态样式
 *
 * 用于控制元素间距的布局组件
 */

import { Comment, Text, useSlots } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 间距大小
   */
  gap?: 'small' | 'default' | 'large' | string
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /**
   * 主轴对齐方式
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
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

// 计算容器类名
const spaceClass = computed(() => {
  const classes = ['ui-space']

  // 方向类
  classes.push(`ui-space-${props.direction}`)

  // 对齐方式类
  if (props.align !== 'center') {
    classes.push(`ui-space-align-${props.align}`)
  }

  // 主轴对齐方式
  if (props.justify !== 'start') {
    classes.push(`ui-space-justify-${props.justify}`)
  }

  // 是否换行
  if (props.wrap) {
    classes.push('ui-space-wrap')
  }

  // 自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 根据是否有默认槽位来决定是否渲染
const hasDefaultSlot = computed(() => !!slots.default)
</script>

<template>
  <div v-if="hasDefaultSlot" class="ui-space" :class="[spaceClass]">
    <template v-for="(child, index) in slots.default?.()">
      <div
        v-if="child.type !== Comment && child.type !== Text && !props.split"
        :key="index"
        class="ui-space-item"
      >
        <component :is="child" />
      </div>
      <template v-else-if="child.type !== Comment && child.type !== Text && props.split">
        <div
          :key="`${index}-item`"
          class="ui-space-item"
        >
          <component :is="child" />
        </div>
        <div
          v-if="index < (slots.default?.().length || 0) - 1"
          :key="`${index}-split`"
          class="ui-space-split-line"
        />
      </template>
    </template>
  </div>
</template>

<style scoped>
.ui-space {
  --ui-space-gap: v-bind(gapVar);

  display: flex;
}

.ui-space-item {
  flex: none;
}

/* 方向 */
.ui-space-horizontal {
  flex-direction: row;
}

.ui-space-horizontal > .ui-space-item:not(:last-child) {
  margin-right: var(--ui-space-gap);
}

.ui-space-vertical {
  flex-direction: column;
}

.ui-space-vertical > .ui-space-item:not(:last-child) {
  margin-bottom: var(--ui-space-gap);
}

/* 对齐方式 */
.ui-space-align-start {
  align-items: flex-start;
}

.ui-space-align-end {
  align-items: flex-end;
}

.ui-space-align-center {
  align-items: center;
}

.ui-space-align-baseline {
  align-items: baseline;
}

.ui-space-align-stretch {
  align-items: stretch;
}

/* 主轴对齐方式 */
.ui-space-justify-start {
  justify-content: flex-start;
}

.ui-space-justify-end {
  justify-content: flex-end;
}

.ui-space-justify-center {
  justify-content: center;
}

.ui-space-justify-space-around {
  justify-content: space-around;
}

.ui-space-justify-space-between {
  justify-content: space-between;
}

/* 是否换行 */
.ui-space-wrap {
  flex-wrap: wrap;
}

/* 分割线 */
.ui-space-split-line {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 1rem;
  width: 1px;
  background-color: var(--ui-color-split, #e5e7eb);
}

/* CSS变量已移至主题文件中 */
</style>
