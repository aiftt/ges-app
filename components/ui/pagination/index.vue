<script setup lang="ts" name="UiPagination">
/**
 * 分页组件
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 */
import { computed, ref, watch } from 'vue'

// 组件属性
const props = withDefaults(defineProps<{
  /**
   * 总条目数
   */
  total: number
  /**
   * 当前页码
   */
  currentPage?: number
  /**
   * 每页显示条数
   */
  pageSize?: number
  /**
   * 可选的每页条数
   */
  pageSizes?: number[]
  /**
   * 页码按钮的数量
   */
  pagerCount?: number
  /**
   * 是否显示总条目数
   */
  showTotal?: boolean
  /**
   * 简洁模式
   */
  simple?: boolean
  /**
   * 禁用状态
   */
  disabled?: boolean
  /**
   * 是否显示快速跳转
   */
  showJumper?: boolean
  /**
   * 布局结构
   * total: 总条目数
   * sizes: 每页显示条数选择器
   * prev: 上一页
   * pager: 页码
   * next: 下一页
   * jumper: 快速跳转
   */
  layout?: string[]
  /**
   * 每页条数变化时附加的参数
   */
  pageSizeOptions?: Record<string, any>
  /**
   * 主题颜色
   */
  color?: string
  /**
   * 是否使用小尺寸
   */
  small?: boolean
}>(), {
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  pagerCount: 7,
  showTotal: true,
  simple: false,
  disabled: false,
  showJumper: false,
  layout: () => ['total', 'prev', 'pager', 'next', 'sizes', 'jumper'],
  pageSizeOptions: () => ({}),
  small: false,
})

// 组件事件
const emit = defineEmits<{
  /**
   * 当前页码变化
   */
  (e: 'update:currentPage', page: number): void
  /**
   * 每页条数变化
   */
  (e: 'update:pageSize', size: number): void
  /**
   * 分页发生变化
   */
  (e: 'change', current: number, size: number): void
}>()

// 跳转页码输入框
const jumpPageInput = ref('')

// 计算总页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

// 处理页码变化
function handleCurrentChange(page: number) {
  if (page < 1)
    page = 1
  if (page > totalPages.value)
    page = totalPages.value

  if (page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('change', page, props.pageSize)
  }
}

// 处理每页条数变化
function handleSizeChange(size: number) {
  if (size !== props.pageSize) {
    emit('update:pageSize', size)
    // 重新计算当前页，避免超出范围
    const newCurrentPage = Math.min(props.currentPage, Math.ceil(props.total / size))
    if (newCurrentPage !== props.currentPage) {
      emit('update:currentPage', newCurrentPage)
    }
    emit('change', newCurrentPage, size)
  }
}

// 前往上一页
function prevPage() {
  if (props.disabled || props.currentPage <= 1)
    return
  handleCurrentChange(props.currentPage - 1)
}

// 前往下一页
function nextPage() {
  if (props.disabled || props.currentPage >= totalPages.value)
    return
  handleCurrentChange(props.currentPage + 1)
}

// 页码列表
const pagers = computed(() => {
  const halfPagerCount = Math.floor(props.pagerCount / 2)
  const currentPage = props.currentPage
  const totalPages = Math.max(1, Math.ceil(props.total / props.pageSize))

  let startPage = 1
  let endPage = totalPages

  if (totalPages > props.pagerCount) {
    if (currentPage > halfPagerCount) {
      startPage = Math.min(currentPage - halfPagerCount, totalPages - props.pagerCount + 1)
    }
    endPage = Math.min(startPage + props.pagerCount - 1, totalPages)
  }

  // 生成页码数组
  const result = []
  for (let i = startPage; i <= endPage; i++) {
    result.push(i)
  }

  return result
})

// 跳转到指定页
function jumpToPage() {
  if (!jumpPageInput.value)
    return
  const pageNum = Number.parseInt(jumpPageInput.value, 10)
  if (Number.isNaN(pageNum))
    return

  handleCurrentChange(pageNum)
  jumpPageInput.value = ''
}

// 快速前进
function fastForward() {
  if (props.currentPage + 5 <= totalPages.value) {
    handleCurrentChange(props.currentPage + 5)
  }
  else {
    handleCurrentChange(totalPages.value)
  }
}

// 快速后退
function fastBackward() {
  if (props.currentPage - 5 >= 1) {
    handleCurrentChange(props.currentPage - 5)
  }
  else {
    handleCurrentChange(1)
  }
}

// 计算按钮样式
const btnClass = computed(() => {
  return {
    'ui-pagination-btn': true,
    'ui-pagination-btn--disabled': props.disabled,
    'ui-pagination-btn--small': props.small,
  }
})

// 计算当前页按钮样式
const currentBtnClass = computed(() => {
  return {
    'ui-pagination-btn': true,
    'ui-pagination-btn--current': true,
    'ui-pagination-btn--small': props.small,
  }
})

// 自定义颜色变量
const colorVar = computed(() => props.color || null)

// 监听总页数变化
watch(() => totalPages.value, (newVal) => {
  // 如果当前页超出范围，调整到最后一页
  if (props.currentPage > newVal) {
    handleCurrentChange(newVal)
  }
})

// 处理前进后退按钮禁用状态
const isPrevDisabled = computed(() => props.disabled || props.currentPage <= 1)
const isNextDisabled = computed(() => props.disabled || props.currentPage >= totalPages.value)
</script>

<template>
  <div class="ui-pagination" :class="{ 'ui-pagination--simple': simple, 'ui-pagination--small': small }">
    <!-- 总条目数 -->
    <div v-if="showTotal && layout.includes('total')" class="ui-pagination-total">
      共 {{ total }} 条
    </div>

    <!-- 上一页按钮 -->
    <button
      v-if="layout.includes('prev')"
      type="button"
      :class="[btnClass, { 'ui-pagination-btn--disabled': isPrevDisabled }]"
      :disabled="isPrevDisabled"
      @click="prevPage"
    >
      <ui-icon icon="carbon:chevron-left" />
    </button>

    <!-- 页码按钮 - 简洁模式 -->
    <div v-if="simple && layout.includes('pager')" class="ui-pagination-simple">
      <span>{{ currentPage }}</span>
      <span>/</span>
      <span>{{ totalPages }}</span>
    </div>

    <!-- 页码按钮 - 普通模式 -->
    <div v-else-if="layout.includes('pager')" class="ui-pagination-pager">
      <!-- 第一页和快速向前 -->
      <template v-if="pagers[0] > 1">
        <button
          type="button"
          :class="btnClass"
          @click="handleCurrentChange(1)"
        >
          1
        </button>

        <button
          v-if="pagers[0] > 2"
          type="button"
          :class="btnClass"
          @click="fastBackward"
        >
          <ui-icon icon="carbon:overflow-menu-horizontal" />
        </button>
      </template>

      <!-- 页码按钮 -->
      <button
        v-for="page in pagers"
        :key="page"
        type="button"
        :class="page === currentPage ? currentBtnClass : btnClass"
        @click="handleCurrentChange(page)"
      >
        {{ page }}
      </button>

      <!-- 最后一页和快速向后 -->
      <template v-if="pagers[pagers.length - 1] < totalPages">
        <button
          v-if="pagers[pagers.length - 1] < totalPages - 1"
          type="button"
          :class="btnClass"
          @click="fastForward"
        >
          <ui-icon icon="carbon:overflow-menu-horizontal" />
        </button>

        <button
          type="button"
          :class="btnClass"
          @click="handleCurrentChange(totalPages)"
        >
          {{ totalPages }}
        </button>
      </template>
    </div>

    <!-- 下一页按钮 -->
    <button
      v-if="layout.includes('next')"
      type="button"
      :class="[btnClass, { 'ui-pagination-btn--disabled': isNextDisabled }]"
      :disabled="isNextDisabled"
      @click="nextPage"
    >
      <ui-icon icon="carbon:chevron-right" />
    </button>

    <!-- 每页条数选择 -->
    <div v-if="layout.includes('sizes')" class="ui-pagination-sizes">
      <select
        class="ui-pagination-select"
        :class="{ 'ui-pagination-select--small': small }"
        :disabled="disabled"
        :value="pageSize"
        @change="handleSizeChange(Number(($event.target as HTMLSelectElement).value))"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }} 条/页
        </option>
      </select>
    </div>

    <!-- 跳转到指定页 -->
    <div v-if="showJumper && layout.includes('jumper')" class="ui-pagination-jumper">
      <span>前往</span>
      <input
        v-model="jumpPageInput"
        class="ui-pagination-jumper-input"
        :class="{ 'ui-pagination-jumper-input--small': small }"
        type="number"
        :min="1"
        :max="totalPages"
        :disabled="disabled"
        @keyup.enter="jumpToPage"
      >
      <span>页</span>
    </div>
  </div>
</template>

<style scoped>
.ui-pagination {
  --ui-pagination-color: v-bind(colorVar);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: var(--ui-font-size, 14px);
}

.ui-pagination--small {
  font-size: var(--ui-font-size-sm, 12px);
}

.ui-pagination-total {
  margin-right: 8px;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background-color: var(--ui-color-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #d1d5db);
  border-radius: var(--ui-border-radius, 4px);
  color: var(--ui-color-text, #374151);
  cursor: pointer;
  transition: all 0.2s;
}

.ui-pagination-btn--small {
  min-width: 24px;
  height: 24px;
  padding: 0 4px;
  font-size: var(--ui-font-size-sm, 12px);
}

.ui-pagination-btn:hover:not(.ui-pagination-btn--disabled, .ui-pagination-btn--current) {
  border-color: var(--ui-pagination-color, var(--ui-color-primary, #10b981));
  color: var(--ui-pagination-color, var(--ui-color-primary, #10b981));
}

.ui-pagination-btn--current {
  background-color: var(--ui-pagination-color, var(--ui-color-primary, #10b981));
  border-color: var(--ui-pagination-color, var(--ui-color-primary, #10b981));
  color: white;
}

.ui-pagination-btn--disabled {
  background-color: var(--ui-color-bg-disabled, #f3f4f6);
  border-color: var(--ui-border-color, #d1d5db);
  color: var(--ui-color-text-disabled, #9ca3af);
  cursor: not-allowed;
}

.ui-pagination-pager {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ui-pagination-simple {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--ui-color-text, #374151);
}

.ui-pagination-sizes {
  margin-left: 8px;
}

.ui-pagination-select {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--ui-border-color, #d1d5db);
  border-radius: var(--ui-border-radius, 4px);
  background-color: var(--ui-color-bg, #ffffff);
  color: var(--ui-color-text, #374151);
  cursor: pointer;
}

.ui-pagination-select--small {
  height: 24px;
  padding: 0 4px;
  font-size: var(--ui-font-size-sm, 12px);
}

.ui-pagination-select:disabled {
  background-color: var(--ui-color-bg-disabled, #f3f4f6);
  color: var(--ui-color-text-disabled, #9ca3af);
  cursor: not-allowed;
}

.ui-pagination-jumper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-pagination-jumper-input {
  width: 50px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--ui-border-color, #d1d5db);
  border-radius: var(--ui-border-radius, 4px);
  background-color: var(--ui-color-bg, #ffffff);
  color: var(--ui-color-text, #374151);
  text-align: center;
}

.ui-pagination-jumper-input--small {
  height: 24px;
  padding: 0 4px;
  font-size: var(--ui-font-size-sm, 12px);
}

.ui-pagination-jumper-input:disabled {
  background-color: var(--ui-color-bg-disabled, #f3f4f6);
  color: var(--ui-color-text-disabled, #9ca3af);
  cursor: not-allowed;
}

/* 去除数字输入框的上下箭头 */
.ui-pagination-jumper-input::-webkit-outer-spin-button,
.ui-pagination-jumper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ui-pagination-jumper-input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
