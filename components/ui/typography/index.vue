<script setup lang="ts" name="UiTypography">
/**
 * 排版组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */

// 定义props
withDefaults(defineProps<{
  /**
   * 组件类型
   */
  component?: 'article' | 'section' | 'div'
}>(), {
  component: 'div',
})
</script>

<template>
  <component :is="component" class="ui-typography">
    <slot />
  </component>
</template>

<style scoped>
.ui-typography {
  font-family: var(--ui-font-family, sans-serif);
  color: var(--ui-color-text, #374151);
  line-height: 1.5;
}

/* Typography组件内的标题样式 */
.ui-typography :deep(h1),
.ui-typography :deep(h2),
.ui-typography :deep(h3),
.ui-typography :deep(h4),
.ui-typography :deep(h5),
.ui-typography :deep(h6) {
  margin-top: 2em;
  margin-bottom: 1em;
  font-weight: 600;
  line-height: 1.25;
  color: var(--ui-color-text-heading, #111827);
}

.ui-typography :deep(h1) {
  font-size: 2.25rem;
  margin-top: 0;
}

.ui-typography :deep(h2) {
  font-size: 1.875rem;
}

.ui-typography :deep(h3) {
  font-size: 1.5rem;
}

.ui-typography :deep(h4) {
  font-size: 1.25rem;
}

.ui-typography :deep(h5) {
  font-size: 1.125rem;
}

.ui-typography :deep(h6) {
  font-size: 1rem;
}

/* Typography组件内的段落样式 */
.ui-typography :deep(p) {
  margin-top: 0;
  margin-bottom: 1.25em;
}

/* Typography组件内的列表样式 */
.ui-typography :deep(ul),
.ui-typography :deep(ol) {
  margin-top: 0;
  margin-bottom: 1.25em;
  padding-left: 2em;
}

.ui-typography :deep(li) {
  margin-bottom: 0.5em;
}

.ui-typography :deep(li > ul),
.ui-typography :deep(li > ol) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* Typography组件内的引用块样式 */
.ui-typography :deep(blockquote) {
  margin: 1.5em 0;
  padding: 0.5em 1em;
  border-left: 4px solid var(--ui-color-primary, #3b82f6);
  background-color: var(--ui-blockquote-bg, rgba(59, 130, 246, 0.1));
  color: var(--ui-color-text-secondary, #6b7280);
}

/* Typography组件内的代码块样式 */
.ui-typography :deep(pre) {
  margin: 1.5em 0;
  padding: 1em;
  overflow-x: auto;
  border-radius: 0.375rem;
  background-color: var(--ui-code-bg, #f3f4f6);
}

.ui-typography :deep(code) {
  font-family: var(--ui-font-mono, monospace);
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  background-color: var(--ui-code-inline-bg, rgba(0, 0, 0, 0.05));
}

.ui-typography :deep(pre code) {
  padding: 0;
  background-color: transparent;
}

/* Typography组件内的表格样式 */
.ui-typography :deep(table) {
  width: 100%;
  margin: 1.5em 0;
  border-collapse: collapse;
}

.ui-typography :deep(th),
.ui-typography :deep(td) {
  padding: 0.75em;
  border: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-typography :deep(th) {
  font-weight: 600;
  background-color: var(--ui-table-header-bg, #f9fafb);
}

.ui-typography :deep(tr:nth-child(even)) {
  background-color: var(--ui-table-stripe-bg, #f3f4f6);
}

/* Typography组件内的分割线样式 */
.ui-typography :deep(hr) {
  margin: 2em 0;
  border: 0;
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
}

/* Typography组件内的链接样式 */
.ui-typography :deep(a) {
  color: var(--ui-color-primary, #3b82f6);
  text-decoration: none;
  transition: color 0.2s;
}

.ui-typography :deep(a:hover) {
  text-decoration: underline;
}

/* Typography组件内的图片样式 */
.ui-typography :deep(img) {
  max-width: 100%;
  margin: 1.5em 0;
  border-radius: 0.375rem;
}

/* CSS变量已移至主题文件中 */
</style>
