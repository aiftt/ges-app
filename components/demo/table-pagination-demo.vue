<script setup lang="ts" name="DemoTablePaginationDemo">
/**
 * 表格与分页组件集成演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 * 更新日期: 2024-12-14 - 使用ui-demo组件重构演示页面
 */
import { computed, ref } from 'vue'

// 定义表格数据类型
interface TableItem {
  id: number
  name: string
  age: number
  address: string
  date: string
  status: string
  desc: string
}

// 生成模拟数据
function generateMockData(count: number): TableItem[] {
  const result: TableItem[] = []
  const statusOptions = ['success', 'warning', 'danger', 'info']

  for (let i = 0; i < count; i++) {
    result.push({
      id: i + 1,
      name: `用户 ${i + 1}`,
      age: Math.floor(Math.random() * 40) + 20,
      address: `测试地址 ${i + 1}`,
      date: `2024-07-${Math.floor(Math.random() * 30) + 1}`,
      status: statusOptions[Math.floor(Math.random() * 4)],
      desc: `这是第 ${i + 1} 条测试数据的描述信息，包含一些随机的长文本内容`,
    })
  }

  return result
}

// 基础集成示例
const allData = ref<TableItem[]>(generateMockData(100))
const currentPage = ref(1)
const pageSize = ref(10)
const total = computed(() => allData.value.length)
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})

// 表格列配置
const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    width: 100,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80,
    sortable: true,
  },
  {
    prop: 'address',
    label: '地址',
    showOverflowTooltip: true,
  },
  {
    prop: 'date',
    label: '日期',
    width: 120,
    sortable: true,
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    slot: 'status',
  },
  {
    prop: 'desc',
    label: '描述',
    showOverflowTooltip: true,
  },
])

// 处理分页变化
function handlePageChange(page: number, size: number) {
  console.warn('分页变更:', page, size)
  currentPage.value = page
  pageSize.value = size
}

// 模拟服务端分页请求
const serverLoading = ref(false)
const serverCurrentPage = ref(1)
const serverPageSize = ref(10)
const serverTotal = ref(200)
const serverData = ref<TableItem[]>([])

function fetchServerData(page: number, size: number) {
  serverLoading.value = true

  // 模拟服务端请求延迟
  setTimeout(() => {
    // 生成当前页的数据
    serverData.value = generateMockData(size).map(item => ({
      ...item,
      id: (page - 1) * size + item.id,
      name: `服务端用户 ${(page - 1) * size + item.id}`,
    }))

    serverLoading.value = false
  }, 800)
}

// 初始加载数据
fetchServerData(serverCurrentPage.value, serverPageSize.value)

// 处理服务端分页
function handleServerPageChange(page: number, size: number) {
  serverCurrentPage.value = page
  serverPageSize.value = size
  fetchServerData(page, size)
}

// 代码示例
const inlinePaginationCode = `<ui-table
  :data="tableData"
  :columns="columns"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  stripe pagination border
  @page-change="handlePageChange"
>
  <template #status="{ row }">
    <span
      class="inline-block rounded-full px-2 py-1 text-sm"
      :class="{
        'bg-green-100 text-green-800': row.status === 'success',
        'bg-yellow-100 text-yellow-800': row.status === 'warning',
        'bg-red-100 text-red-800': row.status === 'danger',
        'bg-blue-100 text-blue-800': row.status === 'info',
      }"
    >
      {{ row.status }}
    </span>
  </template>
</ui-table>`

const serverPaginationCode = `<ui-table
  :data="serverData"
  :columns="columns"
  :total="serverTotal"
  :current-page="serverCurrentPage"
  :page-size="serverPageSize"
  :loading="serverLoading"
  pagination border
  @page-change="handleServerPageChange"
>
  <template #status="{ row }">
    <!-- 状态单元格内容 -->
  </template>
</ui-table>

// 在 JavaScript 中
function fetchServerData(page, size) {
  serverLoading.value = true
  // 模拟 API 请求
  setTimeout(() => {
    // 获取数据逻辑
    serverLoading.value = false
  }, 800)
}

function handleServerPageChange(page, size) {
  serverCurrentPage.value = page
  serverPageSize.value = size
  fetchServerData(page, size)
}`

const customPaginationCode = `<ui-table
  :data="tableData"
  :columns="columns.slice(0, 4)"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  :pagination-layout="['prev', 'pager', 'next', 'jumper']"
  pagination show-jumper small-pagination border
  @page-change="handlePageChange"
/>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      表格与分页组件集成
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      本示例展示了表格组件与分页功能的不同集成方式，包括前端分页、服务端分页和自定义分页配置。
    </p>

    <!-- 内置分页 -->
    <ui-demo
      title="内置分页"
      description="表格组件内置分页功能，通过 pagination 属性启用。前端分页适合数据量不大的场景，所有数据一次性加载。"
      :code="inlinePaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        stripe pagination border
        @page-change="handlePageChange"
      >
        <template #status="{ row }">
          <span
            class="inline-block rounded-full px-2 py-1 text-sm"
            :class="{
              'bg-green-100 text-green-800': row.status === 'success',
              'bg-yellow-100 text-yellow-800': row.status === 'warning',
              'bg-red-100 text-red-800': row.status === 'danger',
              'bg-blue-100 text-blue-800': row.status === 'info',
            }"
          >
            {{ row.status }}
          </span>
        </template>
      </ui-table>
      <div class="mt-4 border border-gray-200 rounded bg-gray-50 p-4 text-gray-700">
        <p>
          <strong>当前状态：</strong> 第 {{ currentPage }} 页，每页 {{ pageSize }} 条，共 {{ total }} 条
        </p>
      </div>
    </ui-demo>

    <!-- 服务端分页 -->
    <ui-demo
      title="服务端分页"
      description="模拟向服务端请求数据的场景，点击分页器会触发新的请求并展示加载状态，适合大数据量场景。"
      :code="serverPaginationCode"
    >
      <ui-table
        :data="serverData"
        :columns="columns"
        :total="serverTotal"
        :current-page="serverCurrentPage"
        :page-size="serverPageSize"
        :loading="serverLoading"
        pagination border
        @page-change="handleServerPageChange"
      >
        <template #status="{ row }">
          <span
            class="inline-block rounded-full px-2 py-1 text-sm"
            :class="{
              'bg-green-100 text-green-800': row.status === 'success',
              'bg-yellow-100 text-yellow-800': row.status === 'warning',
              'bg-red-100 text-red-800': row.status === 'danger',
              'bg-blue-100 text-blue-800': row.status === 'info',
            }"
          >
            {{ row.status }}
          </span>
        </template>
      </ui-table>
      <div class="mt-4 border border-blue-200 rounded bg-blue-50 p-4 text-blue-700">
        <p>
          <strong>提示：</strong> 点击分页器会触发新的请求并展示加载状态，模拟真实的服务端分页场景
        </p>
      </div>
    </ui-demo>

    <!-- 自定义分页配置 -->
    <ui-demo
      title="自定义分页配置"
      description="可以通过各种属性自定义分页组件的配置，满足不同的UI需求。"
      :code="customPaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 4)"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :pagination-layout="['prev', 'pager', 'next', 'jumper']"
        pagination show-jumper small-pagination border
        @page-change="handlePageChange"
      />
      <div class="mt-4 border border-gray-200 rounded bg-gray-50 p-4 text-gray-700">
        <p>
          <strong>配置说明：</strong> 小尺寸分页(small-pagination)、自定义布局(pagination-layout)、显示跳转(show-jumper)
        </p>
      </div>
    </ui-demo>
  </div>
</template>
