<script setup lang="ts" name="UiVirtualTable">
/**
 * 虚拟化表格组件
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 更新日期: 2024-09-03 - 首次实现
 * 更新日期: 2024-09-12 - 使用集中管理的类型定义
 */

import type { IVirtualTableColumn, IVirtualTableConfig } from '~/types/table'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 表格数据
   */
  data: any[]
  /**
   * 表格列配置
   */
  columns: IVirtualTableColumn[]
  /**
   * 行唯一标识字段，默认为'id'
   */
  rowKey?: string
  /**
   * 表格高度，支持像素值或百分比
   */
  height?: string | number
  /**
   * 表格宽度，支持像素值或百分比
   */
  width?: string | number
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 表格尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示斑马纹
   */
  striped?: boolean
  /**
   * 是否启用行悬停效果
   */
  hover?: boolean
  /**
   * 空数据时显示的文本
   */
  emptyText?: string
  /**
   * 是否显示表头
   */
  showHeader?: boolean
  /**
   * 虚拟滚动配置
   */
  virtual?: IVirtualTableConfig
}>(), {
  rowKey: 'id',
  bordered: false,
  size: 'default',
  striped: false,
  hover: true,
  emptyText: '暂无数据',
  showHeader: true,
  virtual: () => ({
    rowHeight: 48,
    headerHeight: 48,
    buffer: 10,
    enabled: true,
    threshold: 100,
  }),
})

// 定义事件
const emit = defineEmits<{
  (e: 'sortChange', column: IVirtualTableColumn, direction: 'asc' | 'desc' | null): void
  (e: 'filterChange', column: IVirtualTableColumn, filters: any[]): void
  (e: 'rowClick', row: any, rowIndex: number, event: MouseEvent): void
  (e: 'cellClick', row: any, column: IVirtualTableColumn, rowIndex: number, event: MouseEvent): void
  (e: 'rowHover', row: any, rowIndex: number): void
  (e: 'scroll', event: Event): void
}>()

// 引用
const tableRef = ref<HTMLElement>()
const tableBodyRef = ref<HTMLElement>()

// 内部状态
const scrollTop = ref(0)
const scrollLeft = ref(0)
const containerHeight = ref(0)
const containerWidth = ref(0)
const tableWidth = ref(0)
const hoveringRowIndex = ref(-1)
const sortStates = ref<Record<string, 'asc' | 'desc' | null>>({})

// 计算属性
// 检查是否应启用虚拟滚动
const shouldEnableVirtualScroll = computed(() => {
  const { enabled, threshold = 100 } = props.virtual
  return Boolean(enabled) && props.data.length >= threshold
})

// 计算内容区总高度
const totalHeight = computed(() => {
  if (!shouldEnableVirtualScroll.value) {
    return 'auto'
  }
  return `${props.data.length * props.virtual.rowHeight}px`
})

// 计算可见区域的行范围
const visibleRange = computed(() => {
  if (!shouldEnableVirtualScroll.value) {
    return { start: 0, end: props.data.length }
  }

  const { rowHeight, buffer = 10 } = props.virtual
  const start = Math.max(0, Math.floor(scrollTop.value / rowHeight) - buffer)
  const visibleCount = Math.ceil(containerHeight.value / rowHeight) + 2 * buffer
  const end = Math.min(props.data.length, start + visibleCount)

  return { start, end }
})

// 需要渲染的行数据
const visibleData = computed(() => {
  const { start, end } = visibleRange.value
  return props.data.slice(start, end)
})

// 计算表格宽度
const tableStyles = computed(() => {
  const style: Record<string, string> = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return style
})

// 方法
// 计算行样式
function getRowStyle(index: number) {
  if (!shouldEnableVirtualScroll.value) {
    return {}
  }

  const { start } = visibleRange.value
  const { rowHeight } = props.virtual
  const top = (start + index) * rowHeight

  return {
    position: 'absolute' as const,
    top: `${top}px`,
    height: `${rowHeight}px`,
    width: '100%',
  }
}

// 处理滚动事件
function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
  scrollLeft.value = target.scrollLeft
  emit('scroll', event)
}

// 计算容器尺寸
function measureContainer() {
  if (tableBodyRef.value) {
    containerHeight.value = tableBodyRef.value.clientHeight
    containerWidth.value = tableBodyRef.value.clientWidth
  }

  if (tableRef.value) {
    tableWidth.value = tableRef.value.clientWidth
  }
}

// 处理排序点击
function handleSortClick(column: IVirtualTableColumn) {
  if (!column.sortable)
    return

  const key = column.key
  const currentState = sortStates.value[key] || null

  // 循环切换排序状态：null -> asc -> desc -> null
  let newState: 'asc' | 'desc' | null = null

  if (currentState === null) {
    newState = 'asc'
  }
  else if (currentState === 'asc') {
    newState = 'desc'
  }
  else {
    newState = null
  }

  // 更新排序状态
  sortStates.value = {
    // 清除其他列的排序状态
    ...Object.fromEntries(Object.entries(sortStates.value).map(([k]) => [k, null])),
    [key]: newState,
  }

  emit('sortChange', column, newState)
}

// 处理行点击
function handleRowClick(row: any, rowIndex: number, event: MouseEvent) {
  emit('rowClick', row, rowIndex, event)
}

// 处理单元格点击
function handleCellClick(row: any, column: IVirtualTableColumn, rowIndex: number, event: MouseEvent) {
  emit('cellClick', row, column, rowIndex, event)
  event.stopPropagation()
}

// 处理行悬停
function handleRowHover(row: any, rowIndex: number) {
  hoveringRowIndex.value = rowIndex
  emit('rowHover', row, rowIndex)
}

// 获取单元格类名
function getCellClass(row: any, column: IVirtualTableColumn, rowIndex: number) {
  const classes = ['ui-virtual-table__cell']

  // 添加对齐方式
  if (column.align) {
    classes.push(`ui-virtual-table__cell--${column.align}`)
  }

  // 添加自定义类名
  if (column.cellClass) {
    if (typeof column.cellClass === 'function') {
      const customClass = column.cellClass(row, column, rowIndex)
      if (customClass) {
        classes.push(customClass)
      }
    }
    else {
      classes.push(column.cellClass)
    }
  }

  return classes.join(' ')
}

// 渲染单元格内容
function renderCell(row: any, column: IVirtualTableColumn, rowIndex: number) {
  if (column.render) {
    return column.render(row, column, rowIndex)
  }
  return row[column.key]
}

// 生命周期钩子
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', measureContainer)
    nextTick(measureContainer)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', measureContainer)
  }
})

// 暴露方法
defineExpose({
  scrollTo: (options: { top?: number, left?: number }) => {
    if (tableBodyRef.value) {
      if (options.top !== undefined) {
        tableBodyRef.value.scrollTop = options.top
      }
      if (options.left !== undefined) {
        tableBodyRef.value.scrollLeft = options.left
      }
    }
  },
  scrollToRow: (rowIndex: number) => {
    if (tableBodyRef.value && rowIndex >= 0 && rowIndex < props.data.length) {
      const { rowHeight } = props.virtual
      tableBodyRef.value.scrollTop = rowIndex * rowHeight
    }
  },
})
</script>

<template>
  <div
    ref="tableRef"
    class="ui-virtual-table"
    :class="[
      `ui-virtual-table--${size}`,
      {
        'ui-virtual-table--bordered': bordered,
        'ui-virtual-table--striped': striped,
        'ui-virtual-table--hover': hover,
      },
    ]"
    :style="tableStyles"
  >
    <!-- 表头 -->
    <div v-if="showHeader" class="ui-virtual-table__header">
      <table class="ui-virtual-table__header-table">
        <colgroup>
          <col v-for="column in columns" :key="column.key" :style="{ width: column.width || 'auto', minWidth: column.minWidth ? `${column.minWidth}px` : 'auto' }">
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="ui-virtual-table__header-cell" :class="[
                column.headerClass,
                column.align ? `ui-virtual-table__header-cell--${column.align}` : '',
                {
                  'ui-virtual-table__header-cell--sortable': column.sortable,
                  'ui-virtual-table__header-cell--sorted': sortStates[column.key],
                },
              ]"
              @click="handleSortClick(column)"
            >
              <div class="ui-virtual-table__header-cell-content">
                <span>{{ column.title }}</span>
                <!-- 排序图标 -->
                <span v-if="column.sortable" class="ui-virtual-table__sort-icon">
                  <ui-icon
                    :icon="sortStates[column.key] === 'asc' ? 'carbon:chevron-up'
                      : sortStates[column.key] === 'desc' ? 'carbon:chevron-down'
                        : 'carbon:arrows-vertical'"
                    :class="sortStates[column.key] ? 'is-active' : ''"
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <!-- 表格主体 -->
    <div
      ref="tableBodyRef"
      class="ui-virtual-table__body"
      @scroll="handleScroll"
    >
      <div
        class="ui-virtual-table__body-wrapper"
        :style="{ height: totalHeight }"
      >
        <table class="ui-virtual-table__body-table">
          <colgroup>
            <col v-for="column in columns" :key="column.key" :style="{ width: column.width || 'auto', minWidth: column.minWidth ? `${column.minWidth}px` : 'auto' }">
          </colgroup>
          <tbody>
            <template v-if="visibleData.length">
              <tr
                v-for="(row, index) in visibleData"
                :key="row[rowKey]"
                :style="getRowStyle(index)"
                class="ui-virtual-table__row"
                :class="{ 'is-hovering': hoveringRowIndex === index + visibleRange.start }"
                @click="handleRowClick(row, index + visibleRange.start, $event)"
                @mouseenter="handleRowHover(row, index + visibleRange.start)"
              >
                <td
                  v-for="column in columns"
                  :key="column.key"
                  :class="getCellClass(row, column, index + visibleRange.start)"
                  @click="handleCellClick(row, column, index + visibleRange.start, $event)"
                >
                  {{ renderCell(row, column, index + visibleRange.start) }}
                </td>
              </tr>
            </template>
            <tr v-else class="ui-virtual-table__empty-row">
              <td :colspan="columns.length" class="ui-virtual-table__empty-cell">
                <slot name="empty">
                  <div class="ui-virtual-table__empty-text">
                    {{ emptyText }}
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-virtual-table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--ui-color-white, #ffffff);
  font-size: 14px;
  color: var(--ui-color-text-primary, #303133);

  // 表头
  &__header {
    width: 100%;
    overflow: hidden;
    background-color: var(--ui-color-background-light, #f5f7fa);
    border-bottom: 1px solid var(--ui-border-color-light, #ebeef5);
  }

  &__header-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  &__header-cell {
    padding: 12px 8px;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--sortable {
      cursor: pointer;

      &:hover {
        background-color: var(--ui-color-background, #f0f2f5);
      }
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 18px;
    }
  }

  &__sort-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ui-color-text-secondary, #909399);
    font-size: 14px;

    .is-active {
      color: var(--ui-color-primary, #409eff);
    }
  }

  // 表格主体
  &__body {
    position: relative;
    width: 100%;
    overflow: auto;
    height: calc(100% - var(--header-height, 48px));
  }

  &__body-wrapper {
    position: relative;
    width: 100%;
  }

  &__body-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  &__row {
    transition: background-color 0.25s ease;

    &.is-hovering {
      background-color: var(--ui-color-background-hover, #f5f7fa);
    }
  }

  &__cell {
    padding: 12px 8px;
    border-bottom: 1px solid var(--ui-border-color-light, #ebeef5);
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__empty-cell {
    padding: 32px 0;
    text-align: center;
  }

  &__empty-text {
    color: var(--ui-color-text-secondary, #909399);
    font-size: 14px;
  }

  // 边框样式
  &--bordered {
    border: 1px solid var(--ui-border-color-light, #ebeef5);

    .ui-virtual-table__cell,
    .ui-virtual-table__header-cell {
      border-right: 1px solid var(--ui-border-color-light, #ebeef5);

      &:last-child {
        border-right: none;
      }
    }
  }

  // 斑马纹
  &--striped {
    .ui-virtual-table__row:nth-child(even) {
      background-color: var(--ui-color-background-light, #fafafa);
    }
  }

  // 尺寸变体
  &--small {
    font-size: 12px;

    .ui-virtual-table__header-cell,
    .ui-virtual-table__cell {
      padding: 8px 6px;
    }

    :deep(.ui-virtual-table__body) {
      --header-height: 36px;
    }
  }

  &--large {
    font-size: 16px;

    .ui-virtual-table__header-cell,
    .ui-virtual-table__cell {
      padding: 16px 10px;
    }

    :deep(.ui-virtual-table__body) {
      --header-height: 56px;
    }
  }

  // 默认尺寸
  &--default {
    :deep(.ui-virtual-table__body) {
      --header-height: 48px;
    }
  }
}
</style>
