<script setup lang="ts" name="UiTypographyParagraph">
/**
 * 排版段落组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-06 - 更新logger接口
 * 更新日期: 2023-12-06 - 更新为v-bind + CSS变量实现方式
 * 更新日期: 2024-08-22 - 修复水合问题，使用ref替代document.getElementById
 */

import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 段落类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  /**
   * 字体大小
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
   * 是否可复制
   */
  copyable?: boolean
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'center' | 'right' | 'justify'
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
  /**
   * 段落间距
   */
  spacing?: 'small' | 'default' | 'large'
}>(), {
  type: 'default',
  size: 'default',
  bold: false,
  italic: false,
  copyable: false,
  align: 'left',
  ellipsis: false,
  lines: 3,
  color: '',
  spacing: 'default',
})

// 在组件初始化时记录debug日志（只在客户端）
logger.client.debug('Paragraph component props:', props)

// 组件相关的logger - 使用专用的客户端子日志器
const paragraphLogger = logger.client.child({ tag: 'paragraph' })

// 计算段落类名
const paragraphClass = computed(() => {
  const classes = [
    // 基础样式
    'ui-typography-paragraph',
  ]

  // 文本大小
  classes.push(`ui-typography-paragraph--size-${props.size}`)

  // 文本类型
  classes.push(`ui-typography-paragraph--type-${props.type}`)

  // 段落间距
  classes.push(`ui-typography-paragraph--spacing-${props.spacing}`)

  // 文本对齐
  classes.push(`ui-typography-paragraph--align-${props.align}`)

  // 文本样式
  if (props.bold) {
    classes.push('ui-typography-paragraph--bold')
  }

  if (props.italic) {
    classes.push('ui-typography-paragraph--italic')
  }

  // 省略样式
  if (props.ellipsis) {
    classes.push('ui-typography-paragraph--ellipsis')

    if (props.lines > 1) {
      classes.push(`ui-typography-paragraph--lines-${props.lines}`)
    }
  }

  // 自定义颜色
  if (props.color) {
    classes.push('ui-typography-paragraph--custom-color')
  }

  return classes.join(' ')
})

// 自定义颜色CSS变量
const colorVar = computed(() => props.color || null)

// 生成唯一ID避免冲突 - 使用SSR兼容的ID生成器
const paragraphRef = ref<HTMLParagraphElement | null>(null)
const copied = ref(false)

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'ui-typography-paragraph__copy-button',
    copied.value ? 'ui-typography-paragraph__copy-button--copied' : '',
  ].join(' ')
})

// 复制功能
function copyText() {
  if (!props.copyable || !import.meta.client)
    return

  const text = paragraphRef.value?.textContent || ''
  paragraphLogger.info('复制段落文本', { length: text.length })

  navigator.clipboard.writeText(text)
    .then(() => {
      // 复制成功
      paragraphLogger.info('段落文本复制成功')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch((err) => {
      paragraphLogger.error('段落文本复制失败', err)
    })
}
</script>

<template>
  <p
    ref="paragraphRef"
    class="group"
    :class="[paragraphClass]"
  >
    <slot />

    <span v-if="copyable" :class="copyButtonClass" @click="copyText">
      <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
    </span>
  </p>
</template>

<style scoped>
.ui-typography-paragraph {
  /* CSS变量绑定 */
  --ui-paragraph-custom-color: v-bind(colorVar);

  font-family: var(--ui-font-family, sans-serif);
  margin-top: 0;
  position: relative;
  line-height: 1.5;
}

/* 段落大小 */
.ui-typography-paragraph--size-small {
  font-size: 0.875rem;
}

.ui-typography-paragraph--size-default {
  font-size: 1rem;
}

.ui-typography-paragraph--size-large {
  font-size: 1.125rem;
}

/* 文本类型/颜色 */
.ui-typography-paragraph--type-default {
  color: var(--ui-color-text, #374151);
}

.ui-typography-paragraph--type-primary {
  color: var(--ui-color-primary, #3b82f6);
}

.ui-typography-paragraph--type-success {
  color: var(--ui-color-success, #10b981);
}

.ui-typography-paragraph--type-warning {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-typography-paragraph--type-danger {
  color: var(--ui-color-danger, #ef4444);
}

.ui-typography-paragraph--type-secondary {
  color: var(--ui-color-text-secondary, #6b7280);
}

/* 自定义颜色 */
.ui-typography-paragraph--custom-color {
  color: var(--ui-paragraph-custom-color);
}

/* 段落间距 */
.ui-typography-paragraph--spacing-small {
  margin-bottom: 0.75rem;
}

.ui-typography-paragraph--spacing-default {
  margin-bottom: 1.25rem;
}

.ui-typography-paragraph--spacing-large {
  margin-bottom: 2rem;
}

/* 文本对齐 */
.ui-typography-paragraph--align-left {
  text-align: left;
}

.ui-typography-paragraph--align-center {
  text-align: center;
}

.ui-typography-paragraph--align-right {
  text-align: right;
}

.ui-typography-paragraph--align-justify {
  text-align: justify;
}

/* 文本样式 */
.ui-typography-paragraph--bold {
  font-weight: bold;
}

.ui-typography-paragraph--italic {
  font-style: italic;
}

/* 省略样式 */
.ui-typography-paragraph--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-typography-paragraph--lines-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-paragraph--lines-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-paragraph--lines-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ui-typography-paragraph--lines-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  white-space: normal;
}

/* 复制按钮样式 */
.ui-typography-paragraph__copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: var(--ui-color-text-secondary, #6b7280);
}

.group:hover .ui-typography-paragraph__copy-button {
  opacity: 1;
}

.ui-typography-paragraph__copy-button--copied {
  color: var(--ui-color-success, #10b981);
  opacity: 1;
}

/* CSS变量已移至主题文件中 */
</style>
