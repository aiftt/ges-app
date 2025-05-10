<script setup lang="ts" name="UiList">
/**
 * 列表组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-08-01 - 修复水平布局问题
 */

const props = withDefaults(defineProps<{
  /**
   * 列表数据
   */
  dataSource?: any[]
  /**
   * 列表布局方向
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * 列表大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 是否显示分割线
   */
  split?: boolean
  /**
   * 列表头部
   */
  header?: string
  /**
   * 列表底部
   */
  footer?: string
  /**
   * 是否加载中
   */
  loading?: boolean
  /**
   * 加载中的文本
   */
  loadingText?: string
  /**
   * 是否显示分页
   */
  pagination?: boolean | Record<string, any>
  /**
   * 空状态文本
   */
  emptyText?: string
  /**
   * 列表项间距
   */
  itemGap?: number | string
  /**
   * 列表项内边距
   */
  itemPadding?: number | string
}>(), {
  dataSource: () => [],
  layout: 'vertical',
  size: 'default',
  bordered: false,
  split: true,
  loading: false,
  loadingText: '加载中...',
  pagination: false,
  emptyText: '暂无数据',
  itemGap: 0,
  itemPadding: 0,
})

// 导出事件
const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

// 计算样式变量
const itemGapVar = computed(() => {
  if (!props.itemGap)
    return null
  return typeof props.itemGap === 'number' ? `${props.itemGap}px` : props.itemGap
})

const itemPaddingVar = computed(() => {
  if (!props.itemPadding)
    return null
  return typeof props.itemPadding === 'number' ? `${props.itemPadding}px` : props.itemPadding
})

// 计算样式类名
const listClass = computed(() => {
  const classes = ['ui-list']

  classes.push(`ui-list--${props.layout}`)
  classes.push(`ui-list--${props.size}`)

  if (props.bordered) {
    classes.push('ui-list--bordered')
  }

  if (props.split) {
    classes.push('ui-list--split')
  }

  return classes.join(' ')
})

// 是否有数据
const hasData = computed(() => props.dataSource && props.dataSource.length > 0)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 计算当前页数据
const currentPageData = computed(() => {
  if (!props.pagination)
    return props.dataSource

  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value

  return props.dataSource.slice(start, end)
})

// 分页变化处理
function handlePageChange(page: number) {
  currentPage.value = page
}
</script>

<template>
  <div :class="listClass">
    <!-- 列表头部 -->
    <div v-if="$slots.header || header" class="ui-list-header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>

    <!-- 列表加载中 -->
    <div v-if="loading" class="ui-list-loading">
      <slot name="loading">
        <div class="ui-list-loading-content">
          <ui-icon icon="carbon:circle-dash" class="mr-2 animate-spin" />
          {{ loadingText }}
        </div>
      </slot>
    </div>

    <!-- 列表内容 -->
    <div v-else-if="hasData" class="ui-list-content">
      <ul class="ui-list-items">
        <slot name="items" :items="currentPageData">
          <li
            v-for="(item, index) in currentPageData"
            :key="index"
            class="ui-list-item"
          >
            <slot name="item" :item="item" :index="index">
              {{ item }}
            </slot>
          </li>
        </slot>
      </ul>
    </div>

    <!-- 空状态 -->
    <div v-else class="ui-list-empty">
      <slot name="empty">
        <ui-empty :description="emptyText">
          <slot name="emptyContent" />
        </ui-empty>
      </slot>
    </div>

    <!-- 列表底部 -->
    <div v-if="$slots.footer || footer" class="ui-list-footer">
      <slot name="footer">
        {{ footer }}
      </slot>
    </div>

    <!-- 分页 -->
    <div v-if="pagination && hasData" class="ui-list-pagination">
      <slot name="pagination">
        <ui-pagination
          v-if="typeof pagination === 'boolean'"
          :current-page="currentPage"
          :total="dataSource.length"
          :page-size="pageSize"
          @change="(page) => {
            handlePageChange(page)
            emit('change', page)
          }"
        />
        <ui-pagination
          v-else
          v-bind="pagination"
          :current-page="currentPage"
          :total="dataSource.length"
          :page-size="pageSize"
          @change="(page) => {
            handlePageChange(page)
            emit('change', page)
          }"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ui-list {
  --ui-list-item-gap: v-bind(itemGapVar);
  --ui-list-item-padding: v-bind(itemPaddingVar);

  position: relative;
  color: var(--ui-color-text, #374151);
}

.ui-list--bordered {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: var(--ui-border-radius, 0.375rem);
}

.ui-list-header,
.ui-list-footer {
  padding: 12px 16px;
  background-color: var(--ui-color-bg-light, #f9fafb);
  color: var(--ui-color-text, #374151);
}

.ui-list-header {
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-list-footer {
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-list-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ui-list-item {
  position: relative;
  padding: var(--ui-list-item-padding, 12px 16px);
}

.ui-list--split .ui-list-item {
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-list--split .ui-list-item:last-child {
  border-bottom: none;
}

/* 水平布局 */
.ui-list--horizontal .ui-list-items {
  display: flex;
  flex-wrap: wrap;
}

.ui-list--horizontal .ui-list-item {
  margin-right: 16px;
  margin-bottom: 16px;
}

/* 垂直布局 */
.ui-list--vertical .ui-list-item + .ui-list-item {
  margin-top: var(--ui-list-item-gap, 0);
}

/* 列表项 */
.ui-list-item {
  position: relative;
  padding: var(--ui-list-item-padding, 12px 16px);
}

/* 分割线 */
.ui-list--split .ui-list-item {
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-list--split .ui-list-item:last-child {
  border-bottom: none;
}

/* 水平布局的分割线处理 */
.ui-list--horizontal.ui-list--split .ui-list-item {
  border-bottom: none;
  border-right: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-list--horizontal.ui-list--split .ui-list-item:last-child {
  border-right: none;
}

/* 尺寸 */
.ui-list--small .ui-list-item {
  padding: 8px 12px;
}

.ui-list--large .ui-list-item {
  padding: 16px 24px;
}

/* 加载中状态 */
.ui-list-loading {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.ui-list-loading-content {
  display: flex;
  align-items: center;
  color: var(--ui-color-text-secondary, #6b7280);
}

/* 空状态 */
.ui-list-empty {
  padding: 16px;
  text-align: center;
  color: var(--ui-color-text-secondary, #6b7280);
}

/* 分页 */
.ui-list-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 暗黑模式适配 */
.dark .ui-list {
  color: var(--ui-color-text-dark, #e5e7eb);
}

.dark .ui-list--bordered {
  border-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-list-header,
.dark .ui-list-footer {
  background-color: var(--ui-color-bg-dark, #1f2937);
  color: var(--ui-color-text-dark, #e5e7eb);
}

.dark .ui-list-header {
  border-bottom-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-list-footer {
  border-top-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-list--split .ui-list-item {
  border-bottom-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-list--horizontal.ui-list--split .ui-list-item {
  border-right-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-list-loading-content,
.dark .ui-list-empty {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}
</style>
