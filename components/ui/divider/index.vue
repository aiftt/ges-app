<script setup lang="ts" name="UiDivider">
/**
 * 分割线组件
 * 创建日期: 2023-11-16
 * 作者: aiftt
 * 更新日期: 2024-01-05 - 修复垂直分割线渲染问题
 * 更新日期: 2024-09-14 - 使用集中管理的类型定义
 *
 * 用于分隔内容的水平或垂直分割线
 */

import type { Alignment, BorderType, Direction } from '~/types/ui'
import { computed } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 分割线方向
   */
  direction?: Direction
  /**
   * 分割线样式类型
   */
  type?: BorderType
  /**
   * 分割线颜色
   */
  color?: string
  /**
   * 文字位置
   */
  position?: Alignment
  /**
   * 是否虚线
   * @deprecated 使用 type='dashed' 代替
   */
  dashed?: boolean
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 自定义样式
   */
  style?: string
}>(), {
  direction: 'horizontal',
  type: 'solid',
  position: 'center',
  dashed: false,
})

// 计算分割线的类名
const dividerClass = computed(() => {
  const classes = [
    'ui-divider',
    `ui-divider--${props.direction}`,
    `ui-divider--${props.type}`,
  ]

  if (props.position) {
    classes.push(`ui-divider--text-${props.position}`)
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算CSS变量值 - 使用计算属性和v-bind
const dividerColor = computed(() => props.color || null)
const dividerWidth = computed(() => props.style ? props.style.split(';')[0].split(':')[1] : null)
const dividerMargin = computed(() => {
  if (!props.style)
    return null
  const margin = props.style.split(';').find(item => item.startsWith('margin'))
  if (margin) {
    const [, value] = margin.split(':')
    return value
  }
  return null
})
const dividerMarginX = computed(() => {
  if (!props.style)
    return null
  const marginX = props.style.split(';').find(item => item.startsWith('margin-left') || item.startsWith('margin-right'))
  if (marginX) {
    const [, value] = marginX.split(':')
    return value
  }
  return null
})
</script>

<template>
  <!-- 有文本的分割线 -->
  <div
    v-if="position"
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
