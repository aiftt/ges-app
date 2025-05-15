<script setup lang="ts" name="UiTypographyParagraph">
/**
 * 排版段落组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-06 - 更新logger接口
 * 更新日期: 2023-12-06 - 更新为v-bind + CSS变量实现方式
 * 更新日期: 2024-08-22 - 修复水合问题，使用ref替代document.getElementById
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-17 - 更新类型定义，支持高级配置选项
 * 更新日期: 2024-09-17 - 使用通用的useCopyText组合式函数
 */

import type { Alignment, ComponentSize, CopyableConfig, EllipsisConfig, ParagraphSpacing, TextType } from '~/types/ui'
import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 段落类型
   */
  type?: TextType
  /**
   * 字体大小
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
   * 是否可复制或复制配置
   */
  copyable?: boolean | CopyableConfig
  /**
   * 文本对齐方式
   */
  align?: Alignment
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
  /**
   * 段落间距
   */
  spacing?: ParagraphSpacing
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

// 处理省略配置
const ellipsisConfig = computed(() => {
  if (!props.ellipsis)
    return null
  if (typeof props.ellipsis === 'boolean')
    return { rows: props.lines }
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
  if (props.ellipsis && !expanded.value) {
    classes.push('ui-typography-paragraph--ellipsis')

    // 处理多行省略情况
    if (ellipsisRows.value > 1) {
      classes.push(`ui-typography-paragraph--lines-${ellipsisRows.value}`)
    }

    // 如果配置了可展开，添加相应的类
    if (ellipsisConfig.value?.expandable) {
      classes.push('ui-typography-paragraph--expandable')
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
  // 否则使用段落内容
  return paragraphRef.value?.textContent || ''
}

const { copied, copy, tooltipText } = useCopyText(getTextToCopy, {
  tooltips: copyConfig.value?.tooltips as [string, string] || ['复制', '已复制'],
  onSuccess: (text) => {
    paragraphLogger.info('段落文本复制成功', { length: text.length })
  },
  onError: (err) => {
    paragraphLogger.error('段落文本复制失败', err)
  },
})

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'ui-typography-paragraph__copy-button',
    copied.value ? 'ui-typography-paragraph__copy-button--copied' : '',
  ].join(' ')
})

// 处理展开/收起
function toggleExpand() {
  expanded.value = !expanded.value
}

// 获取展开/收起符号
const expandSymbol = computed(() => {
  if (!ellipsisConfig.value?.expandable)
    return ''
  return ellipsisConfig.value.symbol || (expanded.value ? '收起' : '展开')
})
</script>

<template>
  <div class="ui-paragraph-container">
    <p
      ref="paragraphRef"
      class="group"
      :class="[paragraphClass]"
    >
      <slot />
    </p>

    <client-only>
      <!-- 展开/收起按钮 -->
      <a
        v-if="ellipsisConfig?.expandable"
        class="ui-typography-paragraph__expand-button"
        @click="toggleExpand"
      >
        {{ expandSymbol }}
      </a>

      <!-- 复制按钮 -->
      <span
        v-if="copyable"
        :class="copyButtonClass"
        :title="tooltipText"
        @click="copy"
      >
        <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
      </span>
    </client-only>
  </div>
</template>

<style scoped>
.ui-paragraph-container {
  position: relative;
}

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

/* 添加新的段落间距类型 */
.ui-typography-paragraph--spacing-compact {
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.ui-typography-paragraph--spacing-normal {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.ui-typography-paragraph--spacing-relaxed {
  margin-bottom: 1.5rem;
  line-height: 1.8;
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

/* 更通用的省略行支持 */
.ui-typography-paragraph--expandable {
  position: relative;
}

.ui-typography-paragraph__expand-button {
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  margin-left: 4px;
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
