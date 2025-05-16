<script setup lang="ts" name="DemoTableWithPagination">
/**
 * 集成分页的表格组件演示
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

// 表格数据(模拟后端分页)
const allData = ref<TableItem[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(85)

// 生成模拟数据
for (let i = 0; i < total.value; i++) {
  allData.value.push({
    id: i + 1,
    name: `用户 ${i + 1}`,
    age: Math.floor(Math.random() * 40) + 20,
    address: `测试地址 ${i + 1}`,
    date: `2024-07-${Math.floor(Math.random() * 30) + 1}`,
    status: ['success', 'warning', 'danger', 'info'][Math.floor(Math.random() * 4)],
    desc: `这是第 ${i + 1} 条测试数据的描述信息，包含一些随机的长文本内容`,
  })
}

// 计算当前页数据（前端分页演示）
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
    width: 120,
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
    sortable: true,
  },
  {
    prop: 'status',
    label: '状态',
    slot: 'status',
  },
  {
    prop: 'desc',
    label: '描述',
    showOverflowTooltip: true,
  },
])

// 处理页码变化
function handlePageChange(page: number, size: number) {
  console.warn('分页变更:', page, size)
  // 实际应用中，这里通常会调用API重新加载数据
}

// 排序变更时的处理函数
function handleSortChange(info: any) {
  console.warn('排序变更:', info)
  // 实际应用中，这里通常会调用API重新加载数据
}

// 自定义布局演示
const customLayout = ref(['prev', 'pager', 'next', 'sizes', 'jumper'])

// 示例代码
const basicPaginationCode = `<ui-table
  :data="tableData"
  :columns="columns"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  stripe pagination border
  @page-change="handlePageChange"
  @sort-change="handleSortChange"
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

const smallPaginationCode = `<ui-table
  :data="tableData"
  :columns="columns.slice(0, 4)"
  size="small"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  pagination small-pagination border
  @page-change="handlePageChange"
/>`

const customLayoutCode = `<ui-table
  :data="tableData"
  :columns="columns.slice(0, 4)"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  pagination border
  :pagination-layout="customLayout"
  @page-change="handlePageChange"
/>`

const selectionPaginationCode = `<ui-table
  :data="tableData"
  :columns="columns.slice(0, 4)"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  pagination show-selection show-index border
  @page-change="handlePageChange"
/>`

const jumperPaginationCode = `<ui-table
  :data="tableData"
  :columns="columns.slice(0, 4)"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  pagination show-jumper border
  @page-change="handlePageChange"
/>`
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      集成分页的表格组件演示
    </h1>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      本示例展示了表格组件与分页功能的集成使用，包括基础分页、小尺寸分页、自定义布局等功能。
    </p>

    <!-- 基础表格分页 -->
    <ui-demo
      title="基础表格分页"
      description="集成基础分页功能的表格，支持翻页、排序和状态显示。"
      :code="basicPaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        stripe pagination border
        @page-change="handlePageChange"
        @sort-change="handleSortChange"
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
    </ui-demo>

    <!-- 小尺寸分页 -->
    <ui-demo
      title="小尺寸分页"
      description="使用 small-pagination 属性启用小尺寸分页控件，适合空间有限的情况。"
      :code="smallPaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 4)"
        size="small"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        pagination small-pagination border
        @page-change="handlePageChange"
      />
    </ui-demo>

    <!-- 自定义布局 -->
    <ui-demo
      title="自定义布局"
      description="通过 pagination-layout 属性自定义分页控件的布局，可以选择显示或隐藏特定元素。"
      :code="customLayoutCode"
    >
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
          :key="item"
          class="border rounded px-2 py-1"
          :class="{
            'bg-blue-500 text-white': customLayout.includes(item),
            'bg-white text-gray-700': !customLayout.includes(item),
          }"
          @click="customLayout.includes(item)
            ? customLayout = customLayout.filter(i => i !== item)
            : customLayout.push(item)"
        >
          {{ item }}
        </button>
      </div>
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 4)"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        pagination border
        :pagination-layout="customLayout"
        @page-change="handlePageChange"
      />
    </ui-demo>

    <!-- 带选择和索引列的分页表格 -->
    <ui-demo
      title="带选择和索引列的分页表格"
      description="分页表格同样支持行选择和行序号功能，通过 show-selection 和 show-index 属性启用。"
      :code="selectionPaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 4)"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        pagination show-selection show-index border
        @page-change="handlePageChange"
      />
    </ui-demo>

    <!-- 跳转页面控件 -->
    <ui-demo
      title="跳转页面控件"
      description="使用 show-jumper 属性显示页码快速跳转输入框，方便用户快速跳转到指定页。"
      :code="jumperPaginationCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 4)"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        pagination show-jumper border
        @page-change="handlePageChange"
      />
    </ui-demo>
  </div>
</template>
