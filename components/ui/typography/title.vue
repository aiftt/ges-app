<script setup lang="ts" name="UiTypographyTitle">
/**
 * 排版标题组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-05 - 更新为v-bind + CSS变量实现方式，添加自定义颜色支持
 * 更新日期: 2024-08-22 - 修复水合问题，使用ref替代document.getElementById
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-17 - 使用通用的useCopyText组合式函数
 * 更新日期: 2024-09-17 - 增强省略功能，支持可展开的省略文本
 * 更新日期: 2024-09-17 - 完善复制功能，支持自定义提示文本和复制内容
 */

import type { Alignment, CopyableConfig, EllipsisConfig, TagType } from '~/types/ui'
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
  type?: TagType
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
  align?: Alignment
  /**
   * 是否为可交互的标题(添加悬停样式)
   */
  hoverable?: boolean
  /**
   * 是否可复制或复制配置
   */
  copyable?: boolean | CopyableConfig
  /**
   * 文本省略配置
   */
  ellipsis?: boolean | EllipsisConfig
  /**
   * 自定义颜色
   */
  color?: string
  /**
   * 标题内容
   */
  title?: string
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

// 处理省略配置
const ellipsisConfig = computed(() => {
  if (!props.ellipsis)
    return null
  if (typeof props.ellipsis === 'boolean')
    return { expandable: false }
  return props.ellipsis
})

// 处理复制配置
const copyConfig = computed(() => {
  if (!props.copyable)
    return null
  if (typeof props.copyable === 'boolean')
    return { text: '', tooltips: [] }
  return props.copyable
})

// 控制文本是否展开
const expanded = ref(false)

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
    'ui-typography-title--ellipsis': props.ellipsis && !expanded.value,
    'ui-typography-title--expandable': ellipsisConfig.value?.expandable,
    'ui-typography-title--custom-color': Boolean(props.color),
  },
])

// 生成唯一ID避免冲突
const titleRef = ref<HTMLHeadingElement | null>(null)

// 自定义颜色CSS变量
const colorVar = computed(() => props.color || null)

// 使用复制文本组合式函数
function getTextToCopy() {
  // 如果提供了自定义文本，则使用它
  if (copyConfig.value?.text) {
    return copyConfig.value.text
  }
  // 否则使用标题内容
  return titleRef.value?.textContent || ''
}

const { copied, copy, tooltipText } = useCopyText(getTextToCopy, {
  tooltips: copyConfig.value?.tooltips as [string, string] || ['复制', '已复制'],
  onSuccess: (text) => {
    titleLogger.info('标题文本复制成功', { level: props.level, length: text.length })
  },
  onError: (err) => {
    titleLogger.error('标题文本复制失败', err)
  },
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
  <div class="ui-title-container">
    <component
      :is="`h${level}`"
      ref="titleRef"
      :class="titleClasses"
      @click="hoverable && copyable && copy()"
    >
      <slot>{{ title }}</slot>
      <client-only>
        <span
          v-if="copyable"
          class="ui-typography-title__copyable"
          :class="{ copied }"
          :title="tooltipText"
          @click.stop="copy"
        >
          <ui-icon :icon="copied ? 'carbon:checkmark' : 'carbon:copy'" size="small" />
        </span>
      </client-only>
    </component>

    <!-- 展开/收起按钮 -->
    <client-only>
      <a
        v-if="ellipsisConfig?.expandable"
        class="ui-typography-title__expand-button"
        @click="toggleExpand"
      >
        {{ expandSymbol }}
      </a>
    </client-only>
  </div>
</template>

<style scoped>
.ui-title-container {
  position: relative;
}

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

/* 可展开省略样式 */
.ui-typography-title--expandable {
  position: relative;
}

.ui-typography-title__expand-button {
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  margin-left: 4px;
  font-size: 0.875em;
  font-weight: normal;
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
