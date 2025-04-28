<script setup lang="ts" name="UiTypographyText">
/**
 * 排版文本组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */

import clientLogger from '~/utils/client-logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 文本类型
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
   * 是否添加下划线
   */
  underline?: boolean
  /**
   * 是否添加删除线
   */
  del?: boolean
  /**
   * 是否标记文本
   */
  mark?: boolean
  /**
   * 是否添加代码样式
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
   * 行数，配合ellipsis使用
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
  lines: 1,
  color: '',
})

// 记录组件参数
clientLogger.debug('Text component props:', props)

// 组件相关的logger
const logger = clientLogger.child({ tag: 'text' })

// 计算文本类名
const textClass = computed(() => {
  const classes = [
    // 基础样式
    'font-sans relative inline-flex items-center',
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

  // 文本对齐
  if (props.align === 'center') {
    classes.push('text-center')
  }
  else if (props.align === 'right') {
    classes.push('text-right')
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
    classes.push('overflow-hidden text-ellipsis max-w-full')
    if (props.lines <= 1) {
      classes.push('whitespace-nowrap')
    }
    else {
      classes.push(`line-clamp-${props.lines}`)
    }
  }

  return classes.join(' ')
})

// 标记样式
const markClass = computed(() => {
  return 'bg-yellow-100 dark:bg-yellow-900/20 px-1'
})

// 代码样式
const codeClass = computed(() => {
  return 'font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[0.9em]'
})

// 自定义颜色样式
const textStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.color) {
    style.color = props.color
  }

  return style
})

// 生成唯一ID避免冲突
const textId = Math.random().toString(36).substring(2, 10)
const copied = ref(false)

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'inline-flex items-center justify-center ml-1',
    'cursor-pointer opacity-0 transition-opacity duration-200',
    'text-gray-500 dark:text-gray-400 group-hover:opacity-100',
    copied.value ? 'text-green-500 opacity-100' : '',
  ].join(' ')
})

// 复制功能
function copyText() {
  if (props.copyable && import.meta.client) {
    const text = document.getElementById(`ui-text-${textId}`)?.textContent || ''
    logger.info('复制文本内容', { length: text.length })

    navigator.clipboard.writeText(text)
      .then(() => {
        // 复制成功
        logger.info('文本内容复制成功')
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
      .catch((err) => {
        logger.error('文本内容复制失败', err)
      })
  }
}
</script>

<template>
  <span
    :id="`ui-text-${textId}`"
    class="group" :class="[textClass]"
    :style="textStyle"
  >
    <span v-if="del"><del><slot /></del></span>
    <span v-else-if="underline"><u><slot /></u></span>
    <span v-else-if="code"><code :class="codeClass"><slot /></code></span>
    <span v-else-if="mark"><mark :class="markClass"><slot /></mark></span>
    <span v-else><slot /></span>

    <span v-if="copyable" :class="copyButtonClass" @click="copyText">
      <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
    </span>
  </span>
</template>
