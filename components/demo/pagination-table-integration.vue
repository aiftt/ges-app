<script setup lang="ts">
/**
 * 分页组件与表格组件集成演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 */
import { computed, reactive, ref } from 'vue'

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
const basicData = ref<TableItem[]>(generateMockData(100))
const basicCurrentPage = ref(1)
const basicPageSize = ref(10)
const basicTotal = computed(() => basicData.value.length)
const basicTableData = computed(() => {
  const start = (basicCurrentPage.value - 1) * basicPageSize.value
  const end = start + basicPageSize.value
  return basicData.value.slice(start, end)
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
  // 实际应用中，这里通常会调用API重新加载数据
}

// 服务端分页示例
const serverData = ref<TableItem[]>([])
const serverCurrentPage = ref(1)
const serverPageSize = ref(10)
const serverTotal = ref(200)
const serverLoading = ref(false)

// 模拟服务端分页请求
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

// 自定义布局示例
const customLayoutData = ref<TableItem[]>(generateMockData(80))
const customCurrentPage = ref(1)
const customPageSize = ref(10)
const customTotal = computed(() => customLayoutData.value.length)
const customTableData = computed(() => {
  const start = (customCurrentPage.value - 1) * customPageSize.value
  const end = start + customPageSize.value
  return customLayoutData.value.slice(start, end)
})
const customLayout = ref(['prev', 'pager', 'next', 'jumper'])

// 高级功能示例 - 排序结合分页
const advancedData = ref<TableItem[]>(generateMockData(150))
const advancedCurrentPage = ref(1)
const advancedPageSize = ref(10)
const advancedTotal = computed(() => advancedData.value.length)
const advancedSortInfo = reactive({
  prop: '',
  order: null as 'ascending' | 'descending' | null,
})

// 排序并分页的表格数据
const advancedTableData = computed(() => {
  const filteredData = [...advancedData.value]

  // 应用排序
  if (advancedSortInfo.prop && advancedSortInfo.order) {
    filteredData.sort((a: any, b: any) => {
      const valueA = a[advancedSortInfo.prop]
      const valueB = b[advancedSortInfo.prop]

      // 数字类型比较
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return advancedSortInfo.order === 'ascending'
          ? valueA - valueB
          : valueB - valueA
      }

      // 字符串类型比较
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return advancedSortInfo.order === 'ascending'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      }

      return 0
    })
  }

  // 应用分页
  const start = (advancedCurrentPage.value - 1) * advancedPageSize.value
  const end = start + advancedPageSize.value
  return filteredData.slice(start, end)
})

// 处理排序变化
function handleSortChange(info: any) {
  console.warn('排序变更:', info)
  advancedSortInfo.prop = info.prop
  advancedSortInfo.order = info.order
  // 排序后回到第一页
  advancedCurrentPage.value = 1
}

// 小尺寸分页示例
const smallData = ref<TableItem[]>(generateMockData(120))
const smallCurrentPage = ref(1)
const smallPageSize = ref(5)
const smallTotal = computed(() => smallData.value.length)
const smallTableData = computed(() => {
  const start = (smallCurrentPage.value - 1) * smallPageSize.value
  const end = start + smallPageSize.value
  return smallData.value.slice(start, end)
})
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      分页组件与表格组件集成演示
    </h1>

    <!-- 基础集成示例 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        基础集成示例
      </h2>
      <p class="mb-4 text-gray-600">
        表格组件内置的分页功能，通过pagination属性启用
      </p>
      <ui-table
        :data="basicTableData"
        :columns="columns"
        :total="basicTotal"
        :current-page="basicCurrentPage"
        :page-size="basicPageSize"

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
          <strong>当前状态：</strong> 第 {{ basicCurrentPage }} 页，每页 {{ basicPageSize }} 条，共 {{ basicTotal }} 条
        </p>
      </div>
    </section>

    <!-- 模拟服务端分页 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        模拟服务端分页
      </h2>
      <p class="mb-4 text-gray-600">
        通过事件处理函数向服务端请求数据，结合loading状态展示加载过程
      </p>
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
          <strong>说明：</strong> 此示例模拟向服务端请求数据的场景，点击分页器会触发新的请求并展示加载状态
        </p>
      </div>
    </section>

    <!-- 自定义分页布局 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        自定义分页布局
      </h2>
      <p class="mb-4 text-gray-600">
        通过paginationLayout属性可以自定义分页器的布局
      </p>
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
          :key="item"
          class="border rounded px-2 py-1 transition-colors"
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
        :data="customTableData"
        :columns="columns"
        :total="customTotal"
        :current-page="customCurrentPage"
        :page-size="customPageSize"

        pagination border
        :pagination-layout="customLayout"
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
          <strong>当前布局：</strong> {{ customLayout.join(' → ') }}
        </p>
      </div>
    </section>

    <!-- 排序与分页结合 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        排序与分页结合
      </h2>
      <p class="mb-4 text-gray-600">
        展示排序功能与分页的结合使用，点击列头进行排序
      </p>
      <ui-table
        :data="advancedTableData"
        :columns="columns"
        :total="advancedTotal"
        :current-page="advancedCurrentPage"
        :page-size="advancedPageSize"

        pagination border
        @page-change="(page, size) => { advancedCurrentPage = page; advancedPageSize = size; }"
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
      <div class="mt-4 border border-green-200 rounded bg-green-50 p-4 text-green-700">
        <p>
          <strong>提示：</strong> 点击"年龄"或"日期"列的表头进行排序，排序后会重置到第一页，模拟真实应用场景
        </p>
        <p v-if="advancedSortInfo.prop">
          <strong>当前排序：</strong> {{ advancedSortInfo.prop }} - {{ advancedSortInfo.order === 'ascending' ? '升序' : advancedSortInfo.order === 'descending' ? '降序' : '无序' }}
        </p>
      </div>
    </section>

    <!-- 小尺寸表格与分页 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        小尺寸表格与分页
      </h2>
      <p class="mb-4 text-gray-600">
        展示小尺寸表格与匹配的小尺寸分页组件
      </p>
      <ui-table
        :data="smallTableData"
        :columns="columns.slice(0, 4)"
        :total="smallTotal"
        :current-page="smallCurrentPage"
        :page-size="smallPageSize"

        size="small"
        pagination small-pagination border
        @page-change="(page, size) => { smallCurrentPage = page; smallPageSize = size; }"
      />
      <div class="mt-4 border border-gray-200 rounded bg-gray-50 p-4 text-gray-700">
        <p>
          <strong>说明：</strong> 使用size="small"设置表格为小尺寸，使用small-pagination设置分页组件为小尺寸
        </p>
      </div>
    </section>

    <!-- 分页器的独立使用 -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold">
        分页器的独立使用
      </h2>
      <p class="mb-4 text-gray-600">
        分页组件可以独立于表格使用，手动控制其状态
      </p>
      <div class="space-y-8">
        <!-- 基础分页 -->
        <div>
          <h3 class="mb-2 text-lg">
            基础分页
          </h3>
          <ui-pagination
            :total="100"
            :current-page="1"
            :page-size="10"
          />
        </div>

        <!-- 简洁模式 -->
        <div>
          <h3 class="mb-2 text-lg">
            简洁模式
          </h3>
          <ui-pagination
            :total="100"
            :current-page="1"
            :page-size="10"
            simple
          />
        </div>

        <!-- 小尺寸 -->
        <div>
          <h3 class="mb-2 text-lg">
            小尺寸分页
          </h3>
          <ui-pagination
            :total="100"
            :current-page="1"
            :page-size="10"
            small
          />
        </div>

        <!-- 自定义颜色 -->
        <div>
          <h3 class="mb-2 text-lg">
            自定义颜色
          </h3>
          <ui-pagination
            :total="100"
            :current-page="1"
            :page-size="10"
            color="#3B82F6"
          />
        </div>

        <!-- 带页码跳转 -->
        <div>
          <h3 class="mb-2 text-lg">
            带页码跳转
          </h3>
          <ui-pagination
            :total="100"
            :current-page="1"
            :page-size="10"
            show-jumper
          />
        </div>
      </div>
    </section>
  </div>
</template>
