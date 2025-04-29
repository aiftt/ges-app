<script setup lang="ts" name="UiDivider">
/**
 * 分割线组件
 * 创建日期: 2025-01-14
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量实现
 * 更新日期: 2025-03-01 - 优化为v-bind+CSS变量实现动态样式
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
  /**
   * 分割线文本
   */
  text?: string
}>(), {
  direction: 'horizontal',
  withText: false,
  textPosition: 'center',
  type: 'solid',
  color: '',
  width: '',
  margin: '1rem',
  class: '',
  text: '',
})

// 计算分割线的类名
const dividerClass = computed(() => {
  const classes = [
    'ui-divider',
    `ui-divider--${props.direction}`,
    `ui-divider--${props.type}`,
  ]

  if (props.withText) {
    classes.push('ui-divider--with-text')
    classes.push(`ui-divider--text-${props.textPosition}`)
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算CSS变量值 - 使用计算属性和v-bind
const dividerColor = computed(() => props.color || null)
const dividerWidth = computed(() => props.width ? `${props.width}` : null)
const dividerMargin = computed(() => {
  if (!props.margin)
    return null
  return props.direction === 'horizontal' ? props.margin : '0'
})
const dividerMarginX = computed(() => {
  if (!props.margin)
    return null
  return props.direction === 'vertical' ? props.margin : '0'
})
</script>

<template>
  <!-- 有文本的分割线 -->
  <div
    v-if="withText"
    :class="dividerClass"
  >
    <span class="ui-divider__before" />
    <span class="ui-divider__text">
      <slot>{{ text }}</slot>
    </span>
    <span class="ui-divider__after" />
  </div>

  <!-- 无文本分割线 -->
  <div
    v-else
    :class="dividerClass"
  />
</template>

<style scoped>
.ui-divider {
  --ui-divider-color: v-bind(dividerColor);
  --ui-divider-width: v-bind(dividerWidth);
  --ui-divider-margin-y: v-bind(dividerMargin);
  --ui-divider-margin-x: v-bind(dividerMarginX);

  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  line-height: normal;
  list-style: none;
}

.ui-divider--horizontal {
  width: 100%;
  min-width: 100%;
  height: var(--ui-divider-width, 1px);
  clear: both;
  margin-top: var(--ui-divider-margin-y, 1rem);
  margin-bottom: var(--ui-divider-margin-y, 1rem);
}

.ui-divider--vertical {
  display: inline-flex;
  height: 0.9em;
  vertical-align: middle;
  width: var(--ui-divider-width, 1px);
  margin-left: var(--ui-divider-margin-x, 1rem);
  margin-right: var(--ui-divider-margin-x, 1rem);
}

/* 边框类型 */
.ui-divider--horizontal:not(.ui-divider--with-text).ui-divider--solid {
  border-top: 1px solid var(--ui-divider-color, rgb(229, 231, 235));
}

.ui-divider--horizontal:not(.ui-divider--with-text).ui-divider--dashed {
  border-top: 1px dashed var(--ui-divider-color, rgb(229, 231, 235));
}

.ui-divider--horizontal:not(.ui-divider--with-text).ui-divider--dotted {
  border-top: 1px dotted var(--ui-divider-color, rgb(229, 231, 235));
}

.ui-divider--vertical.ui-divider--solid {
  border-left: 1px solid var(--ui-divider-color, rgb(229, 231, 235));
}

.ui-divider--vertical.ui-divider--dashed {
  border-left: 1px dashed var(--ui-divider-color, rgb(229, 231, 235));
}

.ui-divider--vertical.ui-divider--dotted {
  border-left: 1px dotted var(--ui-divider-color, rgb(229, 231, 235));
}

/* 带文本的分割线 */
.ui-divider--with-text {
  border-top: 0;
  background: transparent;
}

.ui-divider--with-text .ui-divider__text {
  display: inline-block;
  padding: 0 1rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--ui-text-color, rgb(75, 85, 99));
}

.ui-divider--with-text .ui-divider__before,
.ui-divider--with-text .ui-divider__after {
  position: relative;
  flex: 1;
  height: 1px;
  background-color: var(--ui-divider-color, rgb(229, 231, 235));
}

/* 文本位置 */
.ui-divider--text-left .ui-divider__before {
  width: 5%;
}

.ui-divider--text-left .ui-divider__after {
  width: 95%;
}

.ui-divider--text-right .ui-divider__before {
  width: 95%;
}

.ui-divider--text-right .ui-divider__after {
  width: 5%;
}

/* 暗黑模式 */
:root.dark .ui-divider--horizontal:not(.ui-divider--with-text),
:root.dark .ui-divider--vertical {
  border-color: var(--ui-divider-color, rgb(75, 85, 99));
}

:root.dark .ui-divider__before,
:root.dark .ui-divider__after {
  background-color: var(--ui-divider-color, rgb(75, 85, 99));
}

:root.dark .ui-divider__text {
  color: var(--ui-text-color-dark, rgb(209, 213, 219));
}
</style>
