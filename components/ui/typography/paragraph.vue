<script setup lang="ts" name="UiTypographyParagraph">
/**
 * 排版段落组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */

import clientLogger from '~/utils/client-logger'

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

// 记录组件参数
clientLogger.debug('Paragraph component props:', props)

// 组件相关的logger
const logger = clientLogger.child({ tag: 'paragraph' })

// 计算段落类名
const paragraphClass = computed(() => {
  const classes = [
    // 基础样式
    'font-sans leading-normal mt-0 relative',
  ]

  // 文本大小
  if (props.size === 'small') {
    classes.push('text-sm')
  }
  else if (props.size === 'large') {
    classes.push('text-lg')
  }
  else {
    classes.push('text-base')
  }

  // 文本颜色
  if (props.type === 'default') {
    classes.push('text-gray-700 dark:text-gray-200')
  }
  else if (props.type === 'primary') {
    classes.push('text-primary')
  }
  else if (props.type === 'success') {
    classes.push('text-green-500')
  }
  else if (props.type === 'warning') {
    classes.push('text-yellow-500')
  }
  else if (props.type === 'danger') {
    classes.push('text-red-500')
  }
  else if (props.type === 'secondary') {
    classes.push('text-gray-500 dark:text-gray-400')
  }

  // 段落间距
  if (props.spacing === 'small') {
    classes.push('mb-3')
  }
  else if (props.spacing === 'large') {
    classes.push('mb-8')
  }
  else {
    classes.push('mb-5')
  }

  // 文本对齐
  if (props.align === 'center') {
    classes.push('text-center')
  }
  else if (props.align === 'right') {
    classes.push('text-right')
  }
  else if (props.align === 'justify') {
    classes.push('text-justify')
  }
  else {
    classes.push('text-left')
  }

  // 文本样式
  if (props.bold) {
    classes.push('font-bold')
  }

  if (props.italic) {
    classes.push('italic')
  }

  // 省略样式
  if (props.ellipsis) {
    classes.push('overflow-hidden text-ellipsis')
    if (props.lines <= 1) {
      classes.push('whitespace-nowrap')
    }
    else {
      classes.push(`line-clamp-${props.lines}`)
    }
  }

  return classes.join(' ')
})

// 自定义颜色样式
const paragraphStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.color) {
    style.color = props.color
  }

  return style
})

// 生成唯一ID避免冲突
const paragraphId = Math.random().toString(36).substring(2, 10)
const copied = ref(false)

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'inline-flex items-center justify-center ml-2',
    'cursor-pointer opacity-0 transition-opacity duration-200',
    'text-gray-500 dark:text-gray-400 group-hover:opacity-100',
    copied.value ? 'text-green-500 opacity-100' : '',
  ].join(' ')
})

// 复制功能
function copyText() {
  if (props.copyable && import.meta.client) {
    const text = document.getElementById(`ui-paragraph-${paragraphId}`)?.textContent || ''
    logger.info('复制段落文本', { length: text.length })

    navigator.clipboard.writeText(text)
      .then(() => {
        // 复制成功
        logger.info('段落文本复制成功')
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
      .catch((err) => {
        logger.error('段落文本复制失败', err)
      })
  }
}
</script>

<template>
  <p
    :id="`ui-paragraph-${paragraphId}`"
    class="group" :class="[paragraphClass]"
    :style="paragraphStyle"
  >
    <slot />

    <span v-if="copyable" :class="copyButtonClass" @click="copyText">
      <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
    </span>
  </p>
</template>
