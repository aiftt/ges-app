<script setup lang="ts">
/**
 * 表格组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
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

// 加载状态
const loading = ref(false)

// 设置加载状态
function toggleLoading() {
  loading.value = !loading.value
}

// 排序变更时的处理函数
function handleSortChange(info: any) {
  console.warn('排序变更:', info)

  // 根据排序信息对数据进行实际排序
  if (info.prop && info.order) {
    tableData.value = [...tableData.value].sort((a: any, b: any) => {
      const valueA = a[info.prop]
      const valueB = b[info.prop]

      // 升序
      if (info.order === 'ascending') {
        return valueA > valueB ? 1 : -1
      }
      // 降序
      else if (info.order === 'descending') {
        return valueA < valueB ? 1 : -1
      }
      return 0
    })
  }
  else {
    // 恢复原始顺序（这里简单通过ID排序模拟）
    tableData.value = [...tableData.value].sort((a: any, b: any) => a.id - b.id)
  }
}

// 选择行变更时的处理函数
function handleSelectionChange(selection: TableItem[]) {
  console.warn('选中行:', selection)
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-xl font-bold">
      表格组件 Table
    </h2>

    <!-- 操作按钮 -->
    <div class="mb-4 flex gap-4">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white"
        @click="toggleLoading"
      >
        切换加载状态
      </button>
    </div>

    <!-- 基础表格 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        基础表格
      </h3>
      <ui-table
        :data="tableData"
        :columns="columns"
        :loading="loading"

        stripe border
        max-height="350px"
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
    </section>

    <!-- 带选择功能 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        带选择功能
      </h3>
      <ui-table
        :data="tableData"
        :columns="columns"
        show-selection border
        @selection-change="handleSelectionChange"
      />
    </section>

    <!-- 带序号 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        带序号
      </h3>
      <ui-table
        :data="tableData"
        :columns="columns.slice(0, 3)"
        show-index border
        index-label="#"
      />
    </section>

    <!-- 不同尺寸 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        不同尺寸
      </h3>
      <div class="space-y-6">
        <div>
          <h4 class="mb-2">
            大尺寸
          </h4>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 3)"
            border
            size="large"
          />
        </div>
        <div>
          <h4 class="mb-2">
            默认尺寸
          </h4>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 3)"
            border
            size="default"
          />
        </div>
        <div>
          <h4 class="mb-2">
            小尺寸
          </h4>
          <ui-table
            :data="tableData.slice(0, 2)"
            :columns="columns.slice(0, 3)"
            border
            size="small"
          />
        </div>
      </div>
    </section>
  </div>
</template>
