<script setup lang="ts" name="DemoTable">
/**
 * 表格组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

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

// 定义排序信息类型
interface SortInfo {
  prop: string
  order: 'ascending' | 'descending' | null
}

// 表格数据
const tableData = ref<TableItem[]>([
  {
    id: 1,
    name: '张三',
    age: 25,
    address: '北京市朝阳区',
    date: '2024-01-15',
    status: 'success',
    desc: '这是一段很长的描述文字，用来测试表格单元格的文本溢出和显示效果。',
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    address: '上海市浦东新区',
    date: '2024-02-20',
    status: 'warning',
    desc: '这是一段很长的描述文字，用来测试表格单元格的文本溢出和显示效果。',
  },
  {
    id: 3,
    name: '王五',
    age: 28,
    address: '广州市天河区',
    date: '2024-03-10',
    status: 'danger',
    desc: '这是一段很长的描述文字，用来测试表格单元格的文本溢出和显示效果。',
  },
  {
    id: 4,
    name: '赵六',
    age: 32,
    address: '深圳市南山区',
    date: '2024-04-05',
    status: 'info',
    desc: '这是一段很长的描述文字，用来测试表格单元格的文本溢出和显示效果。',
  },
])

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
    width: 180,
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

// 排序变更时的处理函数
function handleSortChange(info: SortInfo) {
  console.warn('排序变更:', info)
}

// 选择行变更时的处理函数
function handleSelectionChange(selection: TableItem[]) {
  console.warn('选中行:', selection)
}

// 展开行变更时的处理函数
function handleExpandChange(row: TableItem, expanded: boolean) {
  console.warn('展开行:', row, expanded)
}

// 加载状态
const loading = ref(false)

// 设置加载状态
function toggleLoading() {
  loading.value = !loading.value
}

// 更换数据
function changeData() {
  // 模拟异步加载
  loading.value = true
  setTimeout(() => {
    tableData.value = [
      {
        id: 5,
        name: '周七',
        age: 27,
        address: '南京市玄武区',
        date: '2024-05-12',
        status: 'success',
        desc: '这是新加载的数据，测试表格数据更新功能',
      },
      {
        id: 6,
        name: '吴八',
        age: 31,
        address: '杭州市西湖区',
        date: '2024-06-18',
        status: 'warning',
        desc: '这是新加载的数据，测试表格数据更新功能',
      },
      {
        id: 7,
        name: '郑九',
        age: 29,
        address: '成都市武侯区',
        date: '2024-07-20',
        status: 'danger',
        desc: '这是新加载的数据，测试表格数据更新功能',
      },
    ]
    loading.value = false
  }, 1500)
}

// 操作行
function handleEdit(row: TableItem) {
  console.warn('编辑行:', row)
}

function handleDelete(row: TableItem) {
  console.warn('删除行:', row)
}

// 加载一行数据的详细信息 - 用于展开行功能
function _loadRowDetail() {
  return {
    createTime: '2024-07-01 10:30:25',
    updateTime: '2024-07-15 14:22:10',
    creator: '管理员',
    remark: '这是该记录的详细备注信息，包含更多的文本内容和说明。',
  }
}

// 代码示例
const basicTableCode = `<ui-table
  :data="tableData"
  :columns="columns"
  :loading="loading"
  loading-text="加载中..."
  stripe border
  max-height="400px"
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

<script setup>
// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 25,
    address: '北京市朝阳区',
    date: '2024-01-15',
    status: 'success',
    desc: '这是一段很长的描述文字...',
  },
  // 更多数据...
])

// 表格列配置
const columns = ref([
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80, sortable: true },
  { prop: 'address', label: '地址', width: 180, showOverflowTooltip: true },
  { prop: 'date', label: '日期', width: 120, sortable: true },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { prop: 'desc', label: '描述', showOverflowTooltip: true },
])

// 排序变更时的处理函数
function handleSortChange(info) {
  console.warn('排序变更:', info)
}
<\/script>`

const selectionTableCode = `<ui-table
  :data="tableData"
  :columns="columns"
  show-selection border
  @selection-change="handleSelectionChange"
/>

<script setup>
// 选择行变更时的处理函数
function handleSelectionChange(selection) {
  console.warn('选中行:', selection)
}
<\/script>`

const indexTableCode = `<ui-table
  :data="tableData"
  :columns="columns"
  show-index border
  index-label="#"
/>`

const actionTableCode = `<ui-table
  :data="tableData"
  :columns="columns"
  border
>
  <template #action="{ row }">
    <button
      class="mr-2 text-blue-500"
      @click="handleEdit(row)"
    >
      编辑
    </button>
    <button
      class="text-red-500"
      @click="handleDelete(row)"
    >
      删除
    </button>
  </template>
</ui-table>

<script setup>
// 操作行
function handleEdit(row) {
  console.warn('编辑行:', row)
}

function handleDelete(row) {
  console.warn('删除行:', row)
}
<\/script>`

const expandTableCode = `<ui-table
  :data="tableData"
  :columns="columns"
  show-expand border
  @expand-change="handleExpandChange"
>
  <template #expand="{ row }">
    <div class="bg-gray-50 p-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <span class="text-gray-600">创建时间：</span>
          <span>2024-07-01 10:30:25</span>
        </div>
        <div>
          <span class="text-gray-600">更新时间：</span>
          <span>2024-07-15 14:22:10</span>
        </div>
        <div>
          <span class="text-gray-600">创建人：</span>
          <span>管理员</span>
        </div>
        <div>
          <span class="text-gray-600">备注：</span>
          <span>{{ row.desc }}</span>
        </div>
      </div>
    </div>
  </template>
</ui-table>

<script setup>
// 展开行变更时的处理函数
function handleExpandChange(row, expanded) {
  console.warn('展开行:', row, expanded)
}
<\/script>`

const sizeTableCode = `<!-- 大尺寸 -->
<ui-table
  :data="tableData.slice(0, 2)"
  :columns="columns.slice(0, 4)"
  border
  size="large"
/>

<!-- 默认尺寸 -->
<ui-table
  :data="tableData.slice(0, 2)"
  :columns="columns.slice(0, 4)"
  border
  size="default"
/>

<!-- 小尺寸 -->
<ui-table
  :data="tableData.slice(0, 2)"
  :columns="columns.slice(0, 4)"
  border
  size="small"
/>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Table 表格
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      表格组件用于展示和管理结构化数据，支持排序、筛选、分页、固定表头和列、自定义单元格渲染等功能。
    </p>

    <!-- 操作按钮 -->
    <div class="mb-4 flex gap-4">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white"
        @click="toggleLoading"
      >
        切换加载状态
      </button>
      <button
        class="rounded bg-green-500 px-4 py-2 text-white"
        @click="changeData"
      >
        更换数据
      </button>
    </div>

    <!-- 基础表格 -->
    <ui-demo
      title="基础表格"
      description="基础的表格展示，支持斑马纹、边框、最大高度、文字提示和排序等功能。"
      :code="basicTableCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        :loading="loading"
        loading-text="加载中..."
        stripe border
        max-height="400px"
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

    <!-- 带选择功能 -->
    <ui-demo
      title="带选择功能"
      description="通过 show-selection 属性启用行选择功能，支持多选。"
      :code="selectionTableCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        show-selection border
        @selection-change="handleSelectionChange"
      />
    </ui-demo>

    <!-- 带序号 -->
    <ui-demo
      title="带序号"
      description="通过 show-index 属性显示行序号，index-label 属性自定义序号列标题。"
      :code="indexTableCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        show-index border
        index-label="#"
      />
    </ui-demo>

    <!-- 带操作栏 -->
    <ui-demo
      title="带操作栏"
      description="通过 #action 插槽自定义每行的操作按钮。"
      :code="actionTableCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        border
      >
        <template #action="{ row }">
          <button
            class="mr-2 text-blue-500"
            @click="handleEdit(row)"
          >
            编辑
          </button>
          <button
            class="text-red-500"
            @click="handleDelete(row)"
          >
            删除
          </button>
        </template>
      </ui-table>
    </ui-demo>

    <!-- 可展开行 -->
    <ui-demo
      title="可展开行"
      description="通过 show-expand 属性启用行展开功能，#expand 插槽自定义展开内容。"
      :code="expandTableCode"
    >
      <ui-table
        :data="tableData"
        :columns="columns"
        show-expand border
        @expand-change="handleExpandChange"
      >
        <template #expand="{ row }">
          <div class="bg-gray-50 p-4 dark:bg-gray-800">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-gray-600 dark:text-gray-400">创建时间：</span>
                <span>2024-07-01 10:30:25</span>
              </div>
              <div>
                <span class="text-gray-600 dark:text-gray-400">更新时间：</span>
                <span>2024-07-15 14:22:10</span>
              </div>
              <div>
                <span class="text-gray-600 dark:text-gray-400">创建人：</span>
                <span>管理员</span>
              </div>
              <div>
                <span class="text-gray-600 dark:text-gray-400">备注：</span>
                <span>{{ row.desc }}</span>
              </div>
            </div>
          </div>
        </template>
      </ui-table>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="表格支持大、中、小三种尺寸，通过 size 属性设置。"
      :code="sizeTableCode"
    >
      <div class="space-y-6">
        <div>
          <h3 class="mb-2 text-lg">
            大尺寸
          </h3>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 4)"
            border
            size="large"
          />
        </div>
        <div>
          <h3 class="mb-2 text-lg">
            默认尺寸
          </h3>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 4)"
            border
            size="default"
          />
        </div>
        <div>
          <h3 class="mb-2 text-lg">
            小尺寸
          </h3>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 4)"
            border
            size="small"
          />
        </div>
      </div>
    </ui-demo>
  </div>
</template>
