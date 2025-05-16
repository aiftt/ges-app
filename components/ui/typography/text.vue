<script setup lang="ts" name="UiTypographyText">
/**
 * 排版文本组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 修复内联样式问题，改用CSS变量和类名实现
 * 更新日期: 2023-12-05 - 更新为v-bind + CSS变量实现方式
 * 更新日期: 2024-08-22 - 修复水合问题，使用ref替代document.getElementById
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-17 - 增加对 ellipsis 和 copyable 的对象配置支持
 * 更新日期: 2024-09-20 - 使用 unocss 替代自定义类名，优化样式实现
 * 更新日期: 2024-09-21 - 修复展开/收起功能无效问题
 */

import type { ComponentSize, CopyableConfig, EllipsisConfig, TextType } from '~/types/ui'
import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 文本类型
   */
  type?: TextType
  /**
   * 文本大小
   */
  size?: ComponentSize
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
   * 是否可复制或复制配置
   */
  copyable?: boolean | CopyableConfig
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 文本省略配置
   */
  ellipsis?: boolean | EllipsisConfig
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

// 处理省略配置
const ellipsisConfig = computed(() => {
  if (!props.ellipsis)
    return null
  if (typeof props.ellipsis === 'boolean')
    return { rows: props.lines, expandable: false }
  return props.ellipsis
})

// 计算实际省略行数
const ellipsisRows = computed(() => {
  if (!ellipsisConfig.value)
    return 0
  return ellipsisConfig.value.rows || props.lines
})

// 控制文本是否展开
const expanded = ref(false)

// 计算文本类名
const textClass = computed(() => {
  const classes = ['font-sans relative']

  // 文本大小
  if (props.size === 'small') {
    classes.push('text-sm')
  }
  else if (props.size === 'default') {
    classes.push('text-base')
  }
  else if (props.size === 'large') {
    classes.push('text-lg')
  }

  // 文本类型/颜色
  if (!props.color) {
    if (props.type === 'default') {
      classes.push('text-gray-700 dark:text-gray-300')
    }
    else if (props.type === 'primary') {
      classes.push('text-primary')
    }
    else if (props.type === 'success') {
      classes.push('text-success')
    }
    else if (props.type === 'warning') {
      classes.push('text-warning')
    }
    else if (props.type === 'danger') {
      classes.push('text-danger')
    }
    else if (props.type === 'secondary') {
      classes.push('text-gray-500 dark:text-gray-400')
    }
  }

  // 文本对齐
  if (props.align === 'center') {
    classes.push('text-center')
  }
  else if (props.align === 'right') {
    classes.push('text-right')
  }

  // 文本样式
  if (props.bold) {
    classes.push('font-bold')
  }

  if (props.italic) {
    classes.push('italic')
  }

  if (props.underline) {
    classes.push('underline')
  }

  if (props.del) {
    classes.push('line-through')
  }

  if (props.mark) {
    classes.push('bg-amber-100 dark:bg-amber-900/50 px-1')
  }

  if (props.code) {
    classes.push('font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm')
  }

  return classes.join(' ')
})

// 文本限制样式
const ellipsisStyle = computed(() => {
  if (!props.ellipsis || expanded.value)
    return {}

  if (ellipsisRows.value === 1) {
    return {
      display: 'inline-block',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    } as const
  }
  else if (ellipsisRows.value > 1) {
    return {
      'display': '-webkit-box',
      '-webkit-line-clamp': ellipsisRows.value.toString(),
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
    } as const
  }

  return {}
})

// 计算自定义颜色样式
const textStyle = computed(() => {
  const baseStyles = ellipsisStyle.value

  if (props.color) {
    return {
      ...baseStyles,
      color: props.color,
    }
  }

  return baseStyles
})

// 生成唯一ID避免冲突 - 使用SSR兼容的ID生成器
const textRef = ref<HTMLSpanElement | null>(null)

// 处理复制配置
const copyConfig = computed(() => {
  if (!props.copyable)
    return null
  if (typeof props.copyable === 'boolean')
    return { text: '', tooltips: [] }
  return props.copyable
})

// 使用复制文本组合式函数
function getTextToCopy() {
  // 如果提供了自定义文本，则使用它
  if (copyConfig.value?.text) {
    return copyConfig.value.text
  }
  // 否则使用文本内容
  return textRef.value?.textContent || ''
}

const { copied, copy, tooltipText } = useCopyText(getTextToCopy, {
  tooltips: copyConfig.value?.tooltips as [string, string] || ['复制', '已复制'],
  onSuccess: (text) => {
    textLogger.info('文本复制成功', { length: text.length })
  },
  onError: (err) => {
    textLogger.error('文本复制失败', err)
  },
})

// 处理展开/收起
function toggleExpand() {
  expanded.value = !expanded.value
  textLogger.debug('文本展开状态变更', { expanded: expanded.value })
}

// 获取展开/收起符号
const expandSymbol = computed(() => {
  if (!ellipsisConfig.value?.expandable)
    return ''
  return ellipsisConfig.value.symbol || (expanded.value ? '收起' : '展开')
})

// 复制按钮类名
const copyButtonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center ml-2 cursor-pointer transition-opacity duration-200',
    copied.value ? 'text-success opacity-100' : 'text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100',
  ].join(' ')
})
</script>

<template>
  <div class="inline-flex items-center">
    <span
      ref="textRef"
      class="group"
      :class="textClass"
      :style="textStyle"
    >
      <slot />
    </span>

    <!-- 展开/收起按钮 -->
    <client-only>
      <a
        v-if="ellipsisConfig?.expandable"
        class="ml-1 flex-none cursor-pointer text-sm text-primary font-normal"
        @click.prevent="toggleExpand"
      >
        {{ expandSymbol }}
      </a>

      <!-- 复制按钮 -->
      <span
        v-if="copyable"
        :class="copyButtonClasses"
        :title="tooltipText"
        @click="copy"
      >
        <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
      </span>
    </client-only>
  </div>
</template>

<style scoped>
/* 已移除所有自定义类样式，仅使用unocss实现 */
</style>
