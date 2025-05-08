<script setup lang="ts" name="UiCard">
/**
 * Card 卡片组件
 * 创建日期: 2024-06-21
 * 作者: aiftt
 * 更新日期: 2024-06-21 - 初始版本
 * 更新日期: 2024-06-22 - 修复TypeScript错误
 */

import { computed, useSlots } from 'vue'

// 定义props类型
interface CardProps {
  /**
   * 卡片标题
   */
  title?: string
  /**
   * 卡片副标题
   */
  subtitle?: string
  /**
   * 卡片阴影显示时机
   */
  shadow?: 'always' | 'hover' | 'never'
  /**
   * 卡片边框
   */
  bordered?: boolean
  /**
   * 是否显示分割线
   */
  divided?: boolean
  /**
   * 卡片大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 卡片头部内容对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right'
  /**
   * 卡片底部内容对齐方式
   */
  footerAlign?: 'left' | 'center' | 'right'
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 卡片内容是否包含内边距
   */
  bodyPadding?: boolean
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  color?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
}

// 定义props默认值
const props = withDefaults(defineProps<CardProps>(), {
  shadow: 'hover',
  bordered: true,
  divided: false,
  size: 'default',
  headerAlign: 'left',
  footerAlign: 'left',
  loading: false,
  bodyPadding: true,
})

// 获取插槽
const slots = useSlots()

// CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.color || null)
const borderColorVar = computed(() => props.borderColor || null)

// 组件类名
const cardClasses = computed(() => {
  const classes = ['ui-card']

  // 阴影
  classes.push(`ui-card--shadow-${props.shadow}`)

  // 尺寸
  classes.push(`ui-card--${props.size}`)

  // 边框
  if (props.bordered) {
    classes.push('ui-card--bordered')
  }

  // 分割线
  if (props.divided) {
    classes.push('ui-card--divided')
  }

  // 内容内边距
  if (!props.bodyPadding) {
    classes.push('ui-card--no-body-padding')
  }

  // 加载状态
  if (props.loading) {
    classes.push('ui-card--loading')
  }

  return classes.join(' ')
})

// 标题区域类名
const headerClasses = computed(() => {
  const classes = ['ui-card-header']

  // 对齐方式
  classes.push(`ui-card-header--${props.headerAlign}`)

  return classes.join(' ')
})

// 底部区域类名
const footerClasses = computed(() => {
  const classes = ['ui-card-footer']

  // 对齐方式
  classes.push(`ui-card-footer--${props.footerAlign}`)

  return classes.join(' ')
})

// 是否显示标题区域
const showHeader = computed(() => {
  return props.title || props.subtitle || !!slots.header
})

// 是否显示底部区域
const showFooter = computed(() => {
  return !!slots.footer
})
</script>

<template>
  <div :class="cardClasses">
    <!-- 卡片头部 -->
    <div v-if="showHeader" :class="headerClasses">
      <slot name="header">
        <div v-if="title || subtitle" class="ui-card-title-wrapper">
          <div v-if="title" class="ui-card-title">
            {{ title }}
          </div>
          <div v-if="subtitle" class="ui-card-subtitle">
            {{ subtitle }}
          </div>
        </div>
      </slot>
    </div>

    <!-- 卡片内容 -->
    <div class="ui-card-body">
      <div v-if="loading" class="ui-card-loading-mask">
        <div class="ui-card-loading-spinner" />
      </div>
      <slot />
    </div>

    <!-- 卡片底部 -->
    <div v-if="showFooter" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.ui-card {
  /* 动态变量绑定 */
  --ui-card-bg-color: v-bind(bgColorVar);
  --ui-card-text-color: v-bind(textColorVar);
  --ui-card-border-color: v-bind(borderColorVar);

  position: relative;
  background-color: var(--ui-card-bg-color, var(--ui-card-bg, var(--ui-color-bg, #ffffff)));
  color: var(--ui-card-text-color, var(--ui-card-color, var(--ui-color-text, #333333)));
  border-radius: var(--ui-card-border-radius, 6px);
  overflow: hidden;
  transition: all 0.3s;
}

/* 尺寸 */
.ui-card--small {
  font-size: var(--ui-card-font-small, 14px);
}

.ui-card--default {
  font-size: var(--ui-card-font-default, 14px);
}

.ui-card--large {
  font-size: var(--ui-card-font-large, 16px);
}

/* 边框 */
.ui-card--bordered {
  border: 1px solid var(--ui-card-border-color, var(--ui-border-color, #e5e7eb));
}

/* 阴影 */
.ui-card--shadow-always {
  box-shadow: var(--ui-card-shadow, var(--ui-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)));
}

.ui-card--shadow-hover {
  transition: box-shadow 0.3s;
}

.ui-card--shadow-hover:hover {
  box-shadow: var(--ui-card-shadow, var(--ui-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)));
}

.ui-card--shadow-never {
  box-shadow: none;
}

/* 卡片头部 */
.ui-card-header {
  padding: var(--ui-card-header-padding, 16px);
  border-bottom: 1px solid transparent;
}

.ui-card--divided .ui-card-header {
  border-bottom-color: var(--ui-card-border-color, var(--ui-border-color, #e5e7eb));
}

.ui-card-header--left {
  text-align: left;
}

.ui-card-header--center {
  text-align: center;
}

.ui-card-header--right {
  text-align: right;
}

.ui-card-title-wrapper {
  display: flex;
  flex-direction: column;
}

.ui-card-title {
  font-size: var(--ui-card-title-font-size, 16px);
  font-weight: var(--ui-card-title-font-weight, 500);
  margin: 0;
  color: var(--ui-card-title-color, var(--ui-color-text-heading, #111111));
}

.ui-card-subtitle {
  font-size: var(--ui-card-subtitle-font-size, 14px);
  margin: var(--ui-card-subtitle-margin, 4px 0 0 0);
  color: var(--ui-card-subtitle-color, var(--ui-color-text-secondary, #6b7280));
}

/* 卡片内容 */
.ui-card-body {
  position: relative;
  padding: var(--ui-card-body-padding, 16px);
}

.ui-card--no-body-padding .ui-card-body {
  padding: 0;
}

/* 卡片底部 */
.ui-card-footer {
  padding: var(--ui-card-footer-padding, 16px);
  border-top: 1px solid transparent;
}

.ui-card--divided .ui-card-footer {
  border-top-color: var(--ui-card-border-color, var(--ui-border-color, #e5e7eb));
}

.ui-card-footer--left {
  text-align: left;
}

.ui-card-footer--center {
  text-align: center;
}

.ui-card-footer--right {
  text-align: right;
}

/* 加载状态 */
.ui-card--loading {
  overflow: hidden;
}

.ui-card-loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--ui-card-loading-bg, rgba(255, 255, 255, 0.7));
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-card-loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--ui-card-spinner-color, var(--ui-color-primary, #1890ff));
  border-radius: 50%;
  border-top-color: transparent;
  animation: ui-card-loading-spin 0.8s linear infinite;
}

@keyframes ui-card-loading-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
