<script setup lang="ts" name="UiTable">
import type { CSSProperties } from 'vue'
/**
 * 表格组件
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */
import type { TableColumn } from '~/types/table'
import { computed, onMounted, ref, toRef, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 表格数据
   */
  data?: any[]
  /**
   * 表格列配置
   */
  columns?: TableColumn[]
  /**
   * 是否带边框
   */
  border?: boolean
  /**
   * 是否带斑马纹
   */
  stripe?: boolean
  /**
   * 是否显示表头
   */
  showHeader?: boolean
  /**
   * 表格高度
   */
  height?: string | number
  /**
   * 表格最大高度
   */
  maxHeight?: string | number
  /**
   * 是否显示行索引
   */
  showIndex?: boolean
  /**
   * 索引列名
   */
  indexLabel?: string
  /**
   * 索引列宽度
   */
  indexWidth?: number | string
  /**
   * 索引起始值
   */
  indexStart?: number
  /**
   * 是否显示多选框
   */
  showSelection?: boolean
  /**
   * 多选框列宽
   */
  selectionWidth?: number | string
  /**
   * 行键值
   */
  rowKey?: string | ((row: any) => string)
  /**
   * 是否懒加载
   */
  lazy?: boolean
  /**
   * 懒加载函数
   */
  load?: (row: any, treeNode: any, resolve: (data: any[]) => void) => void
  /**
   * 树形表格子节点键值
   */
  childrenKey?: string
  /**
   * 树形表格是否默认展开所有节点
   */
  defaultExpandAll?: boolean
  /**
   * 展开行的键值
   */
  expandRowKeys?: string[]
  /**
   * 是否支持展开行
   */
  expandable?: boolean
  /**
   * 表格尺寸
   */
  size?: 'large' | 'default' | 'small'
  /**
   * 表格样式
   */
  tableStyle?: string | CSSProperties
  /**
   * 表格类名
   */
  tableClass?: string
  /**
   * 是否显示加载中
   */
  loading?: boolean
  /**
   * 加载文本
   */
  loadingText?: string
  /**
   * 空数据文本
   */
  emptyText?: string
  /**
   * 是否高亮当前行
   */
  highlightCurrentRow?: boolean
  /**
   * 当前行的键值
   */
  currentRowKey?: string | number
  /**
   * 表头行类名
   */
  headerRowClassName?: string | ((row: any, index: number) => string)
  /**
   * 表头行样式
   */
  headerRowStyle?: CSSProperties | ((row: any, index: number) => CSSProperties)
  /**
   * 行类名
   */
  rowClassName?: string | ((row: any, index: number) => string)
  /**
   * 行样式
   */
  rowStyle?: CSSProperties | ((row: any, index: number) => CSSProperties)
  /**
   * 单元格类名
   */
  cellClassName?: string | ((row: any, column: TableColumn, index: number) => string)
  /**
   * 单元格样式
   */
  cellStyle?: CSSProperties | ((row: any, column: TableColumn, index: number) => CSSProperties)
  /**
   * 是否启用分页
   */
  pagination?: boolean
  /**
   * 总条目数，启用分页时必须提供
   */
  total?: number
  /**
   * 当前页码
   */
  currentPage?: number
  /**
   * 每页显示条数
   */
  pageSize?: number
  /**
   * 可选的每页条数选项
   */
  pageSizes?: number[]
  /**
   * 分页组件的布局
   */
  paginationLayout?: string[]
  /**
   * 是否显示条目总数
   */
  showTotal?: boolean
  /**
   * 分页小尺寸
   */
  smallPagination?: boolean
  /**
   * 是否显示跳转页码控件
   */
  showJumper?: boolean
}>(), {
  data: () => [],
  columns: () => [],
  border: false,
  stripe: false,
  showHeader: true,
  showIndex: false,
  indexLabel: '序号',
  indexWidth: 50,
  indexStart: 1,
  showSelection: false,
  selectionWidth: 50,
  childrenKey: 'children',
  defaultExpandAll: false,
  expandable: false,
  size: 'default',
  loading: false,
  loadingText: '加载中...',
  emptyText: '暂无数据',
  highlightCurrentRow: false,
  pagination: false,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: () => ['total', 'prev', 'pager', 'next', 'sizes'],
  showTotal: true,
  smallPagination: false,
  showJumper: false,
})

// 定义emit
const emit = defineEmits<{
  /**
   * 选择项发生变化时触发
   */
  (e: 'selectionChange', selection: any[]): void
  /**
   * 当用户点击排序头时触发
   */
  (e: 'sortChange', { column, prop, order }: { column: TableColumn, prop: string, order: string | null }): void
  /**
   * 当用户手动过滤时触发
   */
  (e: 'filterChange', filters: Record<string, any[]>): void
  /**
   * 当某一行被点击时会触发该事件
   */
  (e: 'rowClick', row: any, column: TableColumn, event: Event): void
  /**
   * 当单元格被点击时会触发该事件
   */
  (e: 'cellClick', row: any, column: TableColumn, cell: HTMLElement, event: Event): void
  /**
   * 当某一行被鼠标右键点击时会触发该事件
   */
  (e: 'rowContextmenu', row: any, column: TableColumn, event: Event): void
  /**
   * 当单元格被鼠标右键点击时会触发该事件
   */
  (e: 'cellContextmenu', row: any, column: TableColumn, cell: HTMLElement, event: Event): void
  /**
   * 当某一行被双击时会触发该事件
   */
  (e: 'rowDblclick', row: any, column: TableColumn, event: Event): void
  /**
   * 当某一列的表头被点击时会触发该事件
   */
  (e: 'headerClick', column: TableColumn, event: Event): void
  /**
   * 当某一列的表头被鼠标右键点击时触发该事件
   */
  (e: 'headerContextmenu', column: TableColumn, event: Event): void
  /**
   * 当表格的当前行发生变化时触发
   */
  (e: 'currentChange', currentRow: any, oldCurrentRow: any): void
  /**
   * 当拖动表头改变了列的宽度时触发
   */
  (e: 'headerDragend', newWidth: number, oldWidth: number, column: TableColumn, event: Event): void
  /**
   * 当展开行时触发
   */
  (e: 'expandChange', row: any, expanded: boolean): void
  /**
   * 当前页变化
   */
  (e: 'update:currentPage', page: number): void
  /**
   * 每页条数变化
   */
  (e: 'update:pageSize', size: number): void
  /**
   * 分页变化
   */
  (e: 'pageChange', page: number, size: number): void
}>()

// 内部状态
const tableRef = ref<HTMLElement | null>(null)
const dataSource = toRef(props, 'data')
const tableColumns = toRef(props, 'columns')

// 选中行数据
const selectedRows = ref<any[]>([])
// 当前排序字段和方式
const sortInfo = ref<{ prop: string, order: string | null }>({
  prop: '',
  order: null,
})
// 当前过滤条件
const filterInfo = ref<Record<string, any[]>>({})
// 当前高亮行
const currentRow = ref<any>(null)
// 展开行
const expandedRows = ref<any[]>([])

// 表格布局类
const tableClass = computed(() => {
  return {
    'ui-table': true,
    'ui-table--border': props.border,
    'ui-table--stripe': props.stripe,
    'ui-table--large': props.size === 'large',
    'ui-table--default': props.size === 'default',
    'ui-table--small': props.size === 'small',
    [props.tableClass || '']: !!props.tableClass,
  }
})

// 表格样式
const tableStyle = computed(() => {
  const style: CSSProperties = {}

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }

  return {
    ...style,
    ...(typeof props.tableStyle === 'object' ? props.tableStyle : {}),
  }
})

// 获取所有可见列
const visibleColumns = computed(() => {
  const columns: TableColumn[] = []

  // 添加索引列
  if (props.showIndex) {
    columns.push({
      prop: '__index',
      label: props.indexLabel,
      width: props.indexWidth,
      align: 'center',
      className: 'ui-table-column--index',
    })
  }

  // 添加选择列
  if (props.showSelection) {
    columns.push({
      prop: '__selection',
      label: '选择',
      width: props.selectionWidth,
      align: 'center',
      className: 'ui-table-column--selection',
    })
  }

  // 添加展开列
  if (props.expandable) {
    columns.push({
      prop: '__expand',
      label: '展开',
      width: 50,
      align: 'center',
      className: 'ui-table-column--expand',
    })
  }

  // 添加用户配置列
  columns.push(...tableColumns.value.filter(col => col.visible !== false))

  return columns
})

// 行选择相关方法
function toggleRowSelection(row: any, selected?: boolean) {
  const exists = selectedRows.value.includes(row)

  if (selected === undefined) {
    // 切换选中状态
    if (exists) {
      selectedRows.value = selectedRows.value.filter(r => r !== row)
    }
    else {
      selectedRows.value.push(row)
    }
  }
  else if (selected) {
    // 设为选中
    if (!exists) {
      selectedRows.value.push(row)
    }
  }
  else {
    // 取消选中
    if (exists) {
      selectedRows.value = selectedRows.value.filter(r => r !== row)
    }
  }

  emit('selectionChange', selectedRows.value)
}

function toggleAllSelection(selected: boolean) {
  if (selected) {
    // 全选
    const selectableRows = dataSource.value.filter((row, index) =>
      !props.columns.find(col => col.selectable)?.selectable
      || props.columns.find(col => col.selectable)?.selectable?.(row, index),
    )
    selectedRows.value = selectableRows
  }
  else {
    // 全不选
    selectedRows.value = []
  }

  emit('selectionChange', selectedRows.value)
}

function isSelected(row: any): boolean {
  return selectedRows.value.includes(row)
}

function clearSelection() {
  selectedRows.value = []
  emit('selectionChange', selectedRows.value)
}

// 行展开相关方法
function toggleRowExpansion(row: any, expanded?: boolean) {
  const exists = expandedRows.value.includes(row)

  if (expanded === undefined) {
    // 切换展开状态
    if (exists) {
      expandedRows.value = expandedRows.value.filter(r => r !== row)
    }
    else {
      expandedRows.value.push(row)
    }
  }
  else if (expanded) {
    // 设为展开
    if (!exists) {
      expandedRows.value.push(row)
    }
  }
  else {
    // 取消展开
    if (exists) {
      expandedRows.value = expandedRows.value.filter(r => r !== row)
    }
  }

  emit('expandChange', row, expandedRows.value.includes(row))
}

function isExpanded(row: any): boolean {
  return expandedRows.value.includes(row)
}

// 排序相关方法
function handleSortClick(column: TableColumn, order: string | null) {
  if (!column.sortable)
    return

  // 如果点击的是当前已经排序的列，并且使用相同的排序方式，则取消排序
  if (sortInfo.value.prop === column.prop && sortInfo.value.order === order) {
    sortInfo.value = { prop: '', order: null }
  }
  else {
    sortInfo.value = { prop: column.prop, order }
  }

  emit('sortChange', {
    column,
    prop: column.prop,
    order: sortInfo.value.order,
  })
}

// 过滤相关方法
function _handleFilterChange(column: TableColumn, values: any[]) {
  filterInfo.value[column.prop] = values

  emit('filterChange', filterInfo.value)
}

// 行点击相关方法
function handleRowClick(row: any, column: TableColumn, event: Event) {
  emit('rowClick', row, column, event)

  if (props.highlightCurrentRow) {
    setCurrentRow(row)
  }
}

function setCurrentRow(row: any) {
  const oldCurrentRow = currentRow.value
  currentRow.value = row

  if (oldCurrentRow !== row) {
    emit('currentChange', row, oldCurrentRow)
  }
}

// 单元格点击相关方法
function handleCellClick(row: any, column: TableColumn, cell: HTMLElement, event: Event) {
  emit('cellClick', row, column, cell, event)
}

// 获取单元格内容
function getCellValue(row: any, column: TableColumn): any {
  const value = row[column.prop]

  if (column.formatter) {
    return column.formatter(row, column, value, dataSource.value.indexOf(row))
  }

  return value
}

// 初始化方法
function initialize() {
  // 初始化展开行
  if (props.defaultExpandAll) {
    expandedRows.value = [...dataSource.value]
  }
  else if (props.expandRowKeys && props.rowKey) {
    expandedRows.value = dataSource.value.filter((row) => {
      const rowKey = typeof props.rowKey === 'function'
        ? props.rowKey(row)
        : row[props.rowKey as string]
      return props.expandRowKeys?.includes(rowKey)
    })
  }

  // 初始化当前行
  if (props.currentRowKey && props.rowKey) {
    const targetRow = dataSource.value.find((row) => {
      const rowKey = typeof props.rowKey === 'function'
        ? props.rowKey(row)
        : row[props.rowKey as string]
      return rowKey === props.currentRowKey
    })

    if (targetRow) {
      currentRow.value = targetRow
    }
  }
}

// 暴露给父组件的方法
defineExpose({
  toggleRowSelection,
  toggleAllSelection,
  isSelected,
  clearSelection,
  toggleRowExpansion,
  isExpanded,
  setCurrentRow,
})

// 处理分页变化
function handlePageChange(page: number, size: number) {
  emit('update:currentPage', page)
  emit('update:pageSize', size)
  emit('pageChange', page, size)
}

// 修复删除未使用的tableClass变量
// const tableClass 不是未使用的变量，而是在模板中使用的计算属性

// 修复icon类属性
function getFilterIconClass(column: TableColumn) {
  return filterInfo.value[column.prop]?.length > 0 ? 'ui-table-filter-icon--active' : ''
}

onMounted(() => {
  initialize()
})

// 监听数据源变化
watch(dataSource, () => {
  initialize()
}, { deep: true })
</script>

<template>
  <div class="ui-table-wrapper">
    <!-- 表格加载中遮罩 -->
    <div v-if="loading" class="ui-table-loading-mask">
      <div class="ui-table-loading-content">
        <ui-icon icon="carbon:progress-bar" spin />
        <span>{{ loadingText }}</span>
      </div>
    </div>

    <!-- 表格主体部分 -->
    <div
      ref="tableRef"
      :class="tableClass"
      :style="tableStyle"
    >
      <!-- 表头 -->
      <div v-if="showHeader" class="ui-table-header">
        <table class="ui-table-header-table">
          <colgroup>
            <col v-for="(column, colIndex) in visibleColumns" :key="`col-${colIndex}`" :width="column.width || column.minWidth">
          </colgroup>
          <thead>
            <tr class="ui-table-header-row">
              <th
                v-for="(column, colIndex) in visibleColumns"
                :key="`header-${colIndex}`"
                class="ui-table-cell ui-table-header-cell" :class="[
                  column.headerClassName,
                  column.className,
                  {
                    'ui-table-cell--sortable': column.sortable,
                    'ui-table-cell--filterable': column.filterable,
                    'ui-table-cell--align-left': column.headerAlign === 'left' || (!column.headerAlign && column.align === 'left'),
                    'ui-table-cell--align-center': column.headerAlign === 'center' || (!column.headerAlign && column.align === 'center'),
                    'ui-table-cell--align-right': column.headerAlign === 'right' || (!column.headerAlign && column.align === 'right'),
                  },
                ]"
                @click="column.sortable && handleSortClick(column, 'ascending')"
              >
                <!-- 选择列 -->
                <template v-if="column.prop === '__selection'">
                  <ui-checkbox
                    :model-value="selectedRows.length === data.length"
                    :indeterminate="selectedRows.length > 0 && selectedRows.length < data.length"
                    @update:model-value="toggleAllSelection($event)"
                  />
                </template>

                <!-- 展开列 -->
                <template v-else-if="column.prop === '__expand'">
                  <!-- 展开列无表头文字 -->
                </template>

                <!-- 普通列 -->
                <template v-else>
                  <!-- 使用通过插槽 -->
                  <slot
                    v-if="column.headerSlot"
                    :name="column.headerSlot"
                    :column="column"
                  >
                    {{ column.label }}
                  </slot>

                  <!-- 默认内容 -->
                  <template v-else>
                    {{ column.label }}
                  </template>

                  <!-- 排序图标 -->
                  <span
                    v-if="column.sortable"
                    class="ui-table-sort-icon"
                  >
                    <!-- 升序箭头 -->
                    <ui-icon
                      icon="carbon:caret-up"
                      :class="`ui-table-sort-icon-up ${sortInfo.prop === column.prop && sortInfo.order === 'ascending' ? 'ui-table-sort-icon--active' : ''}`"
                      @click.stop="handleSortClick(column, 'ascending')"
                    />
                    <!-- 降序箭头 -->
                    <ui-icon
                      icon="carbon:caret-down"
                      :class="`ui-table-sort-icon-down ${sortInfo.prop === column.prop && sortInfo.order === 'descending' ? 'ui-table-sort-icon--active' : ''}`"
                      @click.stop="handleSortClick(column, 'descending')"
                    />
                  </span>

                  <!-- 筛选图标和下拉菜单 -->
                  <div v-if="column.filterable" class="ui-table-filter">
                    <ui-icon
                      icon="carbon:filter"
                      class="ui-table-filter-icon"
                      :class="getFilterIconClass(column)"
                    />
                    <!-- 这里需要实现过滤下拉面板 -->
                  </div>
                </template>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表格内容 -->
      <div class="ui-table-body">
        <table class="ui-table-body-table">
          <colgroup>
            <col v-for="(column, colIndex) in visibleColumns" :key="`col-${colIndex}`" :width="column.width || column.minWidth">
          </colgroup>
          <tbody>
            <!-- 无数据时显示空状态 -->
            <tr v-if="data.length === 0" class="ui-table-empty-row">
              <td :colspan="visibleColumns.length" class="ui-table-empty-cell">
                <div class="ui-table-empty-text">
                  <slot name="empty">
                    {{ emptyText }}
                  </slot>
                </div>
              </td>
            </tr>

            <!-- 表格数据行 -->
            <template v-for="(row, rowIndex) in data" :key="rowKey ? (typeof rowKey === 'function' ? rowKey(row) : row[rowKey]) : rowIndex">
              <!-- 数据行 -->
              <tr
                class="ui-table-row"
                :class="[
                  typeof rowClassName === 'function' ? rowClassName(row, rowIndex) : rowClassName,
                  {
                    'ui-table-row--striped': stripe && rowIndex % 2 !== 0,
                    'ui-table-row--current': currentRow === row,
                  },
                ]"
                :style="typeof rowStyle === 'function' ? rowStyle(row, rowIndex) : rowStyle"
                @click.stop="(event) => handleRowClick(row, {} as TableColumn, event)"
              >
                <td
                  v-for="(column, colIndex) in visibleColumns"
                  :key="`cell-${colIndex}`"
                  class="ui-table-cell" :class="[
                    column.className,
                    {
                      'ui-table-cell--show-overflow-tooltip': column.showOverflowTooltip,
                      'ui-table-cell--align-left': column.align === 'left',
                      'ui-table-cell--align-center': column.align === 'center',
                      'ui-table-cell--align-right': column.align === 'right',
                    },
                    typeof cellClassName === 'function' ? cellClassName(row, column, rowIndex) : cellClassName,
                  ]"
                  :title="column.showOverflowTooltip ? getCellValue(row, column) : ''"
                  :style="typeof cellStyle === 'function' ? cellStyle(row, column, rowIndex) : cellStyle"
                  @click.stop="(event) => handleCellClick(row, column, event.target as HTMLElement, event)"
                >
                  <!-- 索引列 -->
                  <template v-if="column.prop === '__index'">
                    {{ typeof column.index === 'function' ? column.index(rowIndex) : indexStart + rowIndex }}
                  </template>

                  <!-- 选择列 -->
                  <template v-else-if="column.prop === '__selection'">
                    <ui-checkbox
                      :model-value="isSelected(row)"
                      :disabled="column.selectable && !column.selectable(row, rowIndex)"
                      @update:model-value="toggleRowSelection(row, $event)"
                    />
                  </template>

                  <!-- 展开列 -->
                  <template v-else-if="column.prop === '__expand'">
                    <ui-icon
                      :icon="isExpanded(row) ? 'carbon:subtract' : 'carbon:add'"
                      class="ui-table-expand-icon"
                      @click.stop="toggleRowExpansion(row)"
                    />
                  </template>

                  <!-- 普通列使用插槽 -->
                  <template v-else-if="column.slot">
                    <slot :name="column.slot" :row="row" :column="column" :index="rowIndex">
                      {{ getCellValue(row, column) }}
                    </slot>
                  </template>

                  <!-- 默认单元格渲染 -->
                  <template v-else>
                    {{ getCellValue(row, column) }}
                  </template>
                </td>
              </tr>

              <!-- 展开行 -->
              <tr
                v-if="expandable && isExpanded(row)"
                class="ui-table-expand-row"
              >
                <td :colspan="visibleColumns.length" class="ui-table-expand-cell">
                  <div class="ui-table-expand-content">
                    <slot name="expand" :row="row" />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- 表尾 -->
      <div v-if="$slots.footer" class="ui-table-footer">
        <slot name="footer" />
      </div>
    </div>

    <!-- 分页组件 -->
    <div v-if="pagination" class="ui-table-pagination">
      <ui-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :show-total="showTotal"
        :show-jumper="showJumper"
        :small="smallPagination"
        @update:current-page="(page) => emit('update:currentPage', page)"
        @update:page-size="(size) => emit('update:pageSize', size)"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.ui-table-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.ui-table {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: var(--ui-font-size);
  background-color: var(--ui-color-bg);
  border-radius: var(--ui-border-radius);
}

.ui-table--border {
  border: 1px solid var(--ui-border-color);
}

/* 表格头部 */
.ui-table-header {
  width: 100%;
  overflow: hidden;
}

.ui-table-header-table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  min-width: 100%;
}

.ui-table-header-row {
  height: 48px;
  background-color: var(--ui-color-bg-hover);
}

.ui-table--small .ui-table-header-row {
  height: 40px;
}

.ui-table--large .ui-table-header-row {
  height: 56px;
}

/* 表格主体 */
.ui-table-body {
  flex: 1;
  overflow: auto;
  width: 100%;
}

.ui-table-body-table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  min-width: 100%;
}

.ui-table-row {
  height: 48px;
  transition: background-color 0.2s;
}

.ui-table--small .ui-table-row {
  height: 40px;
}

.ui-table--large .ui-table-row {
  height: 56px;
}

.ui-table-row:hover {
  background-color: var(--ui-color-bg-hover);
}

.ui-table-row--striped {
  background-color: var(--ui-color-bg-lighter);
}

.ui-table-row--current {
  background-color: var(--ui-color-primary-light);
}

/* 单元格通用样式 */
.ui-table-cell {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--ui-border-color);
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
  line-height: 1.5;
}

.ui-table--small .ui-table-cell {
  padding: 6px 8px;
}

.ui-table--large .ui-table-cell {
  padding: 12px 16px;
}

.ui-table--border .ui-table-cell:not(:last-child) {
  border-right: 1px solid var(--ui-border-color);
}

.ui-table-cell--align-center {
  text-align: center;
}

.ui-table-cell--align-right {
  text-align: right;
}

.ui-table-cell--show-overflow-tooltip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 表头单元格 */
.ui-table-header-cell {
  font-weight: 500;
  color: var(--ui-color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}

.ui-table-header-cell.ui-table-cell--sortable {
  cursor: pointer;
}

/* 排序图标 */
.ui-table-sort-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  vertical-align: middle;
  color: var(--ui-color-text-secondary);
  line-height: 0;
  height: 1rem; /* 减小整体高度 */
  position: relative;
  top: -1px; /* 微调使其与文字垂直居中 */
}

.ui-table-sort-icon-up,
.ui-table-sort-icon-down {
  cursor: pointer;
  color: var(--ui-color-text-secondary);
  padding: 0;
  font-size: 1rem;
  line-height: 0;
  display: flex;
  align-items: center;
  margin: -2px 0; /* 增加负margin进一步减少间距 */
}

.ui-table-sort-icon--active {
  color: var(--ui-color-primary);
}

/* 筛选图标 */
.ui-table-filter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  vertical-align: middle;
  cursor: pointer;
}

.ui-table-filter-icon {
  color: var(--ui-color-text-secondary);
}

.ui-table-filter-icon--active {
  color: var(--ui-color-primary);
}

/* 展开行 */
.ui-table-expand-row {
  background-color: var(--ui-color-bg-hover);
}

.ui-table-expand-cell {
  padding: 0;
}

.ui-table-expand-content {
  padding: 16px;
}

.ui-table-expand-icon {
  cursor: pointer;
  transition: transform 0.2s;
}

/* 空状态 */
.ui-table-empty-row {
  height: 100px;
}

.ui-table-empty-cell {
  text-align: center;
  border-bottom: none;
}

.ui-table-empty-text {
  color: var(--ui-color-text-secondary);
  font-size: 14px;
}

/* 加载中遮罩 */
.ui-table-loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.ui-table-loading-content {
  display: flex;
  align-items: center;
  color: var(--ui-color-primary);
  font-size: 14px;
}

.ui-table-loading-icon {
  margin-right: 8px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 分页样式 */
.ui-table-pagination {
  margin-top: 16px;
}
</style>
