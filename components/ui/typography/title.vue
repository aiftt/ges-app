<script setup lang="ts" name="UiTypographyTitle">
/**
 * 排版标题组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-05 - 更新为v-bind + CSS变量实现方式，添加自定义颜色支持
 */

import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 标题级别，1-6对应h1-h6
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * 标题类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 字体粗细
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  /**
   * 是否添加下边距
   */
  withMargin?: boolean
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 是否为可交互的标题(添加悬停样式)
   */
  hoverable?: boolean
  /**
   * 是否可复制
   */
  copyable?: boolean
  /**
   * 文本省略
   */
  ellipsis?: boolean
  /**
   * 自定义颜色
   */
  color?: string
}>(), {
  level: 1,
  type: 'default',
  weight: 'bold',
  withMargin: true,
  align: 'left',
  hoverable: false,
  copyable: false,
  ellipsis: false,
  color: '',
})

// 记录组件参数
logger.client.debug('Title component props:', props)

// 组件相关的logger
const titleLogger = logger.client.child({ tag: 'title' })

// 计算标题类名
const titleClasses = computed(() => [
  'ui-typography-title',
  `ui-typography-title--level-${props.level}`,
  `ui-typography-title--${props.type}`,
  `ui-typography-title--${props.weight}`,
  `ui-typography-title--align-${props.align}`,
  {
    'ui-typography-title--with-margin': props.withMargin,
    'ui-typography-title--hoverable': props.hoverable,
    'ui-typography-title--ellipsis': props.ellipsis,
    'ui-typography-title--custom-color': Boolean(props.color),
  },
])

// 生成唯一ID避免冲突
const titleId = import.meta.client
  ? Math.random().toString(36).substring(2, 10)
  : 'ssr-placeholder'
const copied = ref(false)

// 自定义颜色CSS变量
const colorVar = computed(() => props.color || null)

// 复制功能
function copyText() {
  if (props.copyable && import.meta.client) {
    const text = document.getElementById(`ui-title-${titleId}`)?.textContent || ''
    titleLogger.info('复制标题文本', { level: props.level, length: text.length })

    navigator.clipboard.writeText(text)
      .then(() => {
        // 复制成功
        titleLogger.info('标题文本复制成功')
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
      .catch((err) => {
        titleLogger.error('标题文本复制失败', err)
      })
  }
}
</script>

<template>
  <component
    :is="`h${level}`"
    :id="`ui-title-${titleId}`"
    :class="titleClasses"
    @click="copyable && copyText()"
  >
    <slot />
    <span v-if="copyable" class="ui-typography-title__copyable" :class="{ copied }">
      <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
    </span>
  </component>
</template>

<style scoped>
.ui-typography-title {
  /* CSS变量绑定 */
  --ui-title-custom-color: v-bind(colorVar);

  font-family: var(--ui-font-family, sans-serif);
  color: var(--ui-color-text-heading, #111827);
  line-height: 1.2;
  margin-top: 0;
  position: relative;
}

/* 级别样式 */
.ui-typography-title--level-1 {
  font-size: var(--ui-title-h1-size, 2.25rem);
}

.ui-typography-title--level-2 {
  font-size: var(--ui-title-h2-size, 1.875rem);
}

.ui-typography-title--level-3 {
  font-size: var(--ui-title-h3-size, 1.5rem);
}

.ui-typography-title--level-4 {
  font-size: var(--ui-title-h4-size, 1.25rem);
}

.ui-typography-title--level-5 {
  font-size: var(--ui-title-h5-size, 1.125rem);
}

.ui-typography-title--level-6 {
  font-size: var(--ui-title-h6-size, 1rem);
}

/* 类型样式 */
.ui-typography-title--default {
  color: var(--ui-color-text-heading, #111827);
}

.ui-typography-title--primary {
  color: var(--ui-color-primary, #3b82f6);
}

.ui-typography-title--success {
  color: var(--ui-color-success, #10b981);
}

.ui-typography-title--warning {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-typography-title--danger {
  color: var(--ui-color-danger, #ef4444);
}

/* 自定义颜色 */
.ui-typography-title--custom-color {
  color: var(--ui-title-custom-color);
}

/* 字重样式 */
.ui-typography-title--light {
  font-weight: 300;
}

.ui-typography-title--normal {
  font-weight: 400;
}

.ui-typography-title--medium {
  font-weight: 500;
}

.ui-typography-title--semibold {
  font-weight: 600;
}

.ui-typography-title--bold {
  font-weight: 700;
}

/* 边距 */
.ui-typography-title--with-margin {
  margin-bottom: var(--ui-title-margin-bottom, 1rem);
}

/* 对齐方式 */
.ui-typography-title--align-left {
  text-align: left;
}

.ui-typography-title--align-center {
  text-align: center;
}

.ui-typography-title--align-right {
  text-align: right;
}

/* 悬停样式 */
.ui-typography-title--hoverable {
  cursor: pointer;
  transition: color 0.2s;
}

.ui-typography-title--hoverable:hover {
  color: var(--ui-color-primary, #3b82f6);
}

/* 省略样式 */
.ui-typography-title--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* 复制按钮 */
.ui-typography-title__copyable {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-typography-title:hover .ui-typography-title__copyable {
  opacity: 1;
}

.ui-typography-title__copyable.copied {
  color: var(--ui-color-success, #10b981);
  opacity: 1;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .ui-typography-title--default {
    color: var(--ui-color-text-heading-dark, #f9fafb);
  }
}
</style>
