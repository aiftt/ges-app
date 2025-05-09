<script setup lang="ts">
/**
 * 表格组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 */
import { ref } from 'vue'

// 表格数据
const tableData = ref([
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

// 排序变更时的处理函数
function handleSortChange(info) {
  console.warn('排序变更:', info)
}

// 选择行变更时的处理函数
function handleSelectionChange(selection) {
  console.warn('选中行:', selection)
}

// 展开行变更时的处理函数
function handleExpandChange(row, expanded) {
  console.warn('展开行:', row, expanded)
}

// 带边框的表格
const borderTableColumns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
])

// 斑马纹表格
const stripeTableColumns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
])

// 不同尺寸表格
const tableSize = ref('default')

// 固定高度表格
const fixedHeightColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' },
  { prop: 'date', label: '日期', width: 180 },
  { prop: 'desc', label: '描述' },
])

// 准备大量数据，用于测试固定高度
const largeData = ref([])
for (let i = 0; i < 20; i++) {
  largeData.value.push({
    id: i + 1,
    name: `用户 ${i + 1}`,
    age: Math.floor(Math.random() * 40) + 20,
    address: `测试地址 ${i + 1}`,
    date: `2024-07-${Math.floor(Math.random() * 30) + 1}`,
    desc: `这是第 ${i + 1} 条测试数据的描述信息，包含一些随机的长文本内容`,
  })
}

// 当前行高亮表格
const highlightTableColumns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
])

// 行操作表格
const operationTableColumns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
  { prop: 'operation', label: '操作', slot: 'operation' },
])

// 操作行
function handleEdit(row) {
  console.warn('编辑行:', row)
}

function handleDelete(row) {
  console.warn('删除行:', row)
}
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      表格组件演示
    </h1>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础表格
      </h2>
      <ui-table :data="tableData" :columns="columns" />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带边框表格
      </h2>
      <ui-table :data="tableData" :columns="borderTableColumns" border />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带斑马纹表格
      </h2>
      <ui-table :data="tableData" :columns="stripeTableColumns" stripe />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同尺寸表格
      </h2>
      <div class="mb-4">
        <span class="mr-2">尺寸：</span>
        <button
          v-for="size in ['small', 'default', 'large']"
          :key="size"
          class="mr-2 border rounded px-3 py-1"
          :class="{ 'bg-blue-500 text-white': size === tableSize }"
          @click="tableSize = size"
        >
          {{ size }}
        </button>
      </div>
      <ui-table :data="tableData" :columns="stripeTableColumns" :size="tableSize" border />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        固定高度表格
      </h2>
      <ui-table
        :data="largeData"
        :columns="fixedHeightColumns"
        border
        :height="300"
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带序号表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
        show-index
        index-label="序号"
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        多选表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
        show-selection
        @selection-change="handleSelectionChange"
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        可排序表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
        @sort-change="handleSortChange"
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        可展开表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
        expandable
        @expand-change="handleExpandChange"
      >
        <template #expand="{ row }">
          <div class="bg-gray-50 p-4">
            <h3 class="mb-2 font-bold">
              {{ row.name }} 的详细信息
            </h3>
            <p><strong>年龄：</strong>{{ row.age }}</p>
            <p><strong>地址：</strong>{{ row.address }}</p>
            <p><strong>描述：</strong>{{ row.desc }}</p>
          </div>
        </template>
      </ui-table>
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        高亮当前行表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="highlightTableColumns"
        highlight-current-row
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义单元格内容
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
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
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        操作列表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="operationTableColumns"
      >
        <template #operation="{ row }">
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
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        空数据表格
      </h2>
      <ui-table
        :data="[]"
        :columns="columns"
        empty-text="暂无数据，请稍后再试"
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        加载中表格
      </h2>
      <ui-table
        :data="tableData"
        :columns="columns"
        loading
      />
    </section>
  </div>
</template>
