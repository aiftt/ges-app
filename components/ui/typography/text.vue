<script setup lang="ts" name="UiTypographyText">
/**
 * 排版文本组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 修复内联样式问题，改用CSS变量和类名实现
 * 更新日期: 2023-12-05 - 更新为v-bind + CSS变量实现方式
 */

import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 文本类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  /**
   * 文本大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否加粗
   */
  bold?: boolean
  /**
   * 是否斜体
   */
  italic?: boolean
  /**
   * 是否添加下划线
   */
  underline?: boolean
  /**
   * 是否添加删除线
   */
  del?: boolean
  /**
   * 是否标记
   */
  mark?: boolean
  /**
   * 是否代码风格
   */
  code?: boolean
  /**
   * 是否可复制
   */
  copyable?: boolean
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 文本省略
   */
  ellipsis?: boolean
  /**
   * 省略显示的行数
   */
  lines?: number
  /**
   * 文本颜色
   */
  color?: string
}>(), {
  type: 'default',
  size: 'default',
  bold: false,
  italic: false,
  underline: false,
  del: false,
  mark: false,
  code: false,
  copyable: false,
  align: 'left',
  ellipsis: false,
  lines: 3,
  color: '',
})

// 在组件初始化时记录debug日志（只在客户端）
logger.client.debug('Text component props:', props)

// 组件相关的logger - 使用专用的客户端子日志器
const textLogger = logger.client.child({ tag: 'text' })

// 计算文本类名
const textClass = computed(() => {
  const classes = [
    // 基础样式
    'ui-typography-text',
  ]

  // 文本大小
  classes.push(`ui-typography-text--size-${props.size}`)

  // 文本类型/颜色
  classes.push(`ui-typography-text--type-${props.type}`)

  // 文本对齐
  if (props.align !== 'left') {
    classes.push(`ui-typography-text--align-${props.align}`)
  }

  // 文本样式
  if (props.bold) {
    classes.push('ui-typography-text--bold')
  }

  if (props.italic) {
    classes.push('ui-typography-text--italic')
  }

  if (props.underline) {
    classes.push('ui-typography-text--underline')
  }

  if (props.del) {
    classes.push('ui-typography-text--del')
  }

  if (props.mark) {
    classes.push('ui-typography-text--mark')
  }

  if (props.code) {
    classes.push('ui-typography-text--code')
  }

  // 省略样式
  if (props.ellipsis) {
    classes.push('ui-typography-text--ellipsis')

    if (props.lines > 1) {
      classes.push(`ui-typography-text--lines-${props.lines}`)
    }
  }

  // 自定义颜色
  if (props.color) {
    classes.push('ui-typography-text--custom-color')
  }

  return classes.join(' ')
})

// 生成唯一ID避免冲突 - 确保在SSR中稳定
const textId = import.meta.client
  ? Math.random().toString(36).substring(2, 10)
  : 'ssr-placeholder'

const copied = ref(false)

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'ui-typography-text-copy-button',
    copied.value ? 'ui-typography-text-copy-button--copied' : '',
  ].join(' ')
})

// 复制功能
function copyText() {
  if (!props.copyable || !import.meta.client)
    return

  const text = document.getElementById(`ui-text-${textId}`)?.textContent || ''
  textLogger.info('复制文本', { length: text.length })

  navigator.clipboard.writeText(text)
    .then(() => {
      // 复制成功
      textLogger.info('文本复制成功')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch((err) => {
      textLogger.error('文本复制失败', err)
    })
}

// 自定义颜色CSS变量
const colorVar = computed(() => props.color || null)
</script>

<template>
  <span
    :id="`ui-text-${textId}`"
    class="group ui-typography-text"
    :class="[textClass]"
  >
    <slot />

    <span v-if="copyable" :class="copyButtonClass" @click="copyText">
      <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
    </span>
  </span>
</template>

<style scoped>
.ui-typography-text {
  /* CSS变量绑定 */
  --ui-text-custom-color: v-bind(colorVar);

  font-family: var(--ui-font-family, sans-serif);
  display: inline-flex;
  align-items: center;
  position: relative;
}

/* 文本大小 */
.ui-typography-text--size-small {
  font-size: 0.875rem;
}

.ui-typography-text--size-default {
  font-size: 1rem;
}

.ui-typography-text--size-large {
  font-size: 1.125rem;
}

/* 文本类型/颜色 */
.ui-typography-text--type-default {
  color: var(--ui-color-text, #374151);
}

.ui-typography-text--type-primary {
  color: var(--ui-color-primary, #10b981);
}

.ui-typography-text--type-success {
  color: var(--ui-color-success, #10b981);
}

.ui-typography-text--type-warning {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-typography-text--type-danger {
  color: var(--ui-color-danger, #ef4444);
}

.ui-typography-text--type-secondary {
  color: var(--ui-color-text-secondary, #6b7280);
}

/* 自定义颜色 */
.ui-typography-text--custom-color {
  color: var(--ui-text-custom-color);
}

/* 文本对齐 */
.ui-typography-text--align-center {
  text-align: center;
}

.ui-typography-text--align-right {
  text-align: right;
}

/* 文本样式 */
.ui-typography-text--bold {
  font-weight: bold;
}

.ui-typography-text--italic {
  font-style: italic;
}

.ui-typography-text--underline {
  text-decoration: underline;
}

.ui-typography-text--del {
  text-decoration: line-through;
}

.ui-typography-text--mark {
  background-color: var(--ui-color-mark-bg, #fef3c7);
  padding: 0 0.25em;
}

.ui-typography-text--code {
  font-family: var(--ui-font-family-code, monospace);
  background-color: var(--ui-color-code-bg, #f3f4f6);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.875em;
}

/* 省略样式 */
.ui-typography-text--ellipsis {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-typography-text--lines-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-text--lines-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-text--lines-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-text--lines-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  white-space: normal;
}

/* 复制按钮样式 */
.ui-typography-text-copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: var(--ui-color-text-secondary, #6b7280);
}

.group:hover .ui-typography-text-copy-button {
  opacity: 1;
}

.ui-typography-text-copy-button--copied {
  color: var(--ui-color-success, #10b981);
  opacity: 1;
}

/* CSS变量已移至主题文件中 */
</style>
