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
  if (props.ellipsis && !expanded.value) {
    classes.push('ui-typography-text--ellipsis')

    // 处理多行省略情况
    if (ellipsisRows.value > 1) {
      classes.push(`ui-typography-text--lines-${ellipsisRows.value}`)
    }

    // 如果配置了可展开，添加相应的类
    if (ellipsisConfig.value?.expandable) {
      classes.push('ui-typography-text--expandable')
    }
  }

  // 自定义颜色
  if (props.color) {
    classes.push('ui-typography-text--custom-color')
  }

  return classes.join(' ')
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

// 复制按钮样式
const copyButtonClass = computed(() => {
  return [
    'ui-typography-text-copy-button',
    copied.value ? 'ui-typography-text-copy-button--copied' : '',
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

// 自定义颜色CSS变量
const colorVar = computed(() => props.color || null)
</script>

<template>
  <div class="ui-text-container">
    <span
      ref="textRef"
      class="group ui-typography-text"
      :class="[textClass]"
    >
      <slot />
    </span>

    <!-- 展开/收起按钮 -->
    <client-only>
      <a
        v-if="ellipsisConfig?.expandable"
        class="ui-typography-text__expand-button"
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
.ui-text-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.ui-typography-text {
  /* CSS变量绑定 */
  --ui-text-custom-color: v-bind(colorVar);

  font-family: var(--ui-font-family, sans-serif);
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

/* 可展开省略样式 */
.ui-typography-text--expandable {
  position: relative;
}

.ui-typography-text__expand-button {
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  margin-left: 4px;
  font-size: 0.875em;
  font-weight: normal;
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
