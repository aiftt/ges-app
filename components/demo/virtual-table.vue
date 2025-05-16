<script setup lang="ts" name="DemoVirtualTable">
/**
 * 虚拟表格演示组件
 * 创建日期: 2024-08-30
 * 作者: [Claude]
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */
import type { IVirtualTableColumn } from '~/types/table'
import { onMounted, ref } from 'vue'

// 表格数据
const tableData = ref<any[]>([])
const renderTime = ref(0)
const selectedRow = ref<any>(null)
const virtualEnabled = ref(true)
const tableHeight = ref('400px')

// 列定义
const columns = ref<IVirtualTableColumn[]>([
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    key: 'name',
    title: '姓名',
    width: 200,
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'address',
    title: '地址',
    minWidth: 300,
  },
  {
    key: 'phone',
    title: '电话',
    width: 150,
  },
  {
    key: 'email',
    title: '邮箱',
    width: 220,
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    render: (row: any) => {
      const status = row.status
      let color = ''
      let text = ''

      if (status === 'active') {
        color = '#67C23A'
        text = '正常'
      }
      else if (status === 'inactive') {
        color = '#909399'
        text = '未激活'
      }
      else {
        color = '#F56C6C'
        text = '禁用'
      }

      return `<span style="color: ${color}">${text}</span>`
    },
    sortable: true,
  },
])

// 生成随机数据
function generateData(count: number) {
  const startTime = Date.now()

  const data = []
  const statusList = ['active', 'inactive', 'disabled']

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `用户${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      address: `北京市朝阳区某某街道第${Math.floor(Math.random() * 100) + 1}号`,
      phone: `1${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000000).toString().padStart(9, '0')}`,
      email: `user${i + 1}@example.com`,
      status: statusList[Math.floor(Math.random() * statusList.length)],
    })
  }

  tableData.value = data
  renderTime.value = Date.now() - startTime
}

// 处理排序
function handleSortChange(column: IVirtualTableColumn, direction: 'asc' | 'desc' | null) {
  if (!direction) {
    // 恢复原始排序
    generateData(tableData.value.length)
    return
  }

  const key = column.key
  const startTime = Date.now()

  tableData.value.sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1
    }
    else {
      return valueA < valueB ? 1 : -1
    }
  })

  renderTime.value = Date.now() - startTime
}

// 处理行点击
function handleRowClick(row: any) {
  selectedRow.value = row
}

// 组件挂载时生成默认数据
onMounted(() => {
  generateData(1000)
})

// 示例代码
const basicCode = `<script setup lang="ts">
import type { IVirtualTableColumn } from '~/types/table'
import { onMounted, ref } from 'vue'

// 表格数据
const tableData = ref<any[]>([])
const renderTime = ref(0)
const selectedRow = ref<any>(null)
const virtualEnabled = ref(true)
const tableHeight = ref('400px')

// 列定义
const columns = ref<IVirtualTableColumn[]>([
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    key: 'name',
    title: '姓名',
    width: 200,
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'address',
    title: '地址',
    minWidth: 300,
  },
  {
    key: 'phone',
    title: '电话',
    width: 150,
  },
  {
    key: 'email',
    title: '邮箱',
    width: 220,
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    render: (row: any) => {
      const status = row.status
      let color = ''
      let text = ''

      if (status === 'active') {
        color = '#67C23A'
        text = '正常'
      }
      else if (status === 'inactive') {
        color = '#909399'
        text = '未激活'
      }
      else {
        color = '#F56C6C'
        text = '禁用'
      }

      return \`<span style="color: \${color}">\${text}</span>\`
    },
    sortable: true,
  },
])

// 生成随机数据
function generateData(count: number) {
  const startTime = Date.now()

  const data = []
  const statusList = ['active', 'inactive', 'disabled']

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: \`用户\${i + 1}\`,
      age: Math.floor(Math.random() * 50) + 18,
      address: \`北京市朝阳区某某街道第\${Math.floor(Math.random() * 100) + 1}号\`,
      phone: \`1\${Math.floor(Math.random() * 10)}\${Math.floor(Math.random() * 10000000000).toString().padStart(9, '0')}\`,
      email: \`user\${i + 1}@example.com\`,
      status: statusList[Math.floor(Math.random() * statusList.length)],
    })
  }

  tableData.value = data
  renderTime.value = Date.now() - startTime
}

// 处理排序
function handleSortChange(column: IVirtualTableColumn, direction: 'asc' | 'desc' | null) {
  if (!direction) {
    // 恢复原始排序
    generateData(tableData.value.length)
    return
  }

  const key = column.key
  const startTime = Date.now()

  tableData.value.sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1
    }
    else {
      return valueA < valueB ? 1 : -1
    }
  })

  renderTime.value = Date.now() - startTime
}

// 处理行点击
function handleRowClick(row: any) {
  selectedRow.value = row
}

// 组件挂载时生成默认数据
onMounted(() => {
  generateData(1000)
})
<\/script>

<template>
  <div class="demo-container">
    <div class="demo-controls">
      <div class="control-group">
        <label>数据量:</label>
        <button @click="generateData(100)">100行</button>
        <button @click="generateData(1000)">1000行</button>
        <button @click="generateData(10000)">10000行</button>
      </div>
      <div class="control-group">
        <label>虚拟滚动:</label>
        <input v-model="virtualEnabled" type="checkbox">
        <span class="checkbox-label">{{ virtualEnabled ? '开启' : '关闭' }}</span>
      </div>
      <div class="control-group">
        <label>表格高度:</label>
        <select v-model="tableHeight">
          <option value="300px">300px</option>
          <option value="400px">400px</option>
          <option value="500px">500px</option>
        </select>
      </div>
    </div>

    <div class="table-container">
      <ui-virtual-table
        :data="tableData"
        :columns="columns"
        :height="tableHeight"
        bordered
        hover
        :virtual="{
          rowHeight: 48,
          buffer: 10,
          enabled: virtualEnabled,
          threshold: 100,
        }"
        @sort-change="handleSortChange"
        @row-click="handleRowClick"
      />
    </div>

    <div class="stats">
      <div>总行数: {{ tableData.length }}</div>
      <div>渲染耗时: {{ renderTime }}ms</div>
      <div v-if="selectedRow">
        选中行: {{ selectedRow.name }} (ID: {{ selectedRow.id }})
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      VirtualTable 虚拟表格
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      虚拟表格组件用于展示大量数据时提高渲染性能，它通过虚拟滚动技术只渲染可视区域内的行，支持固定列、排序和高性能渲染。
    </p>

    <ui-demo
      title="基础虚拟表格"
      description="虚拟表格基本用法，支持大数据量渲染、排序、虚拟滚动控制等功能。"
      :code="basicCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
          <div class="flex items-center gap-2">
            <span class="font-medium">数据量:</span>
            <button
              class="border border-gray-300 rounded bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="generateData(100)"
            >
              100行
            </button>
            <button
              class="border border-gray-300 rounded bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="generateData(1000)"
            >
              1000行
            </button>
            <button
              class="border border-gray-300 rounded bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="generateData(10000)"
            >
              10000行
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">虚拟滚动:</span>
            <label class="flex cursor-pointer items-center gap-2">
              <input v-model="virtualEnabled" type="checkbox" class="cursor-pointer">
              <span>{{ virtualEnabled ? '开启' : '关闭' }}</span>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">表格高度:</span>
            <select
              v-model="tableHeight"
              class="border border-gray-300 rounded bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="300px">
                300px
              </option>
              <option value="400px">
                400px
              </option>
              <option value="500px">
                500px
              </option>
            </select>
          </div>
        </div>

        <div class="overflow-hidden border border-gray-200 rounded-md dark:border-gray-700">
          <ui-virtual-table
            :data="tableData"
            :columns="columns"
            :height="tableHeight"
            bordered
            hover
            :virtual="{
              rowHeight: 48,
              buffer: 10,
              enabled: virtualEnabled,
              threshold: 100,
            }"
            @sort-change="handleSortChange"
            @row-click="handleRowClick"
          />
        </div>

        <div class="flex flex-wrap gap-4 rounded-md bg-gray-50 p-3 text-sm dark:bg-gray-800">
          <div class="font-medium">
            总行数: <span class="text-blue-600 dark:text-blue-400">{{ tableData.length }}</span>
          </div>
          <div class="font-medium">
            渲染耗时: <span class="text-green-600 dark:text-green-400">{{ renderTime }}ms</span>
          </div>
          <div v-if="selectedRow" class="font-medium">
            选中行: <span class="text-purple-600 dark:text-purple-400">{{ selectedRow.name }} (ID: {{ selectedRow.id }})</span>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      VirtualTable 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            data
          </td>
          <td class="px-4 py-2">
            array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            表格数据
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            columns
          </td>
          <td class="px-4 py-2">
            array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            表格列配置
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            height
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            400px
          </td>
          <td class="px-4 py-2">
            表格高度
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            bordered
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示边框
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            hover
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否高亮悬停行
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            virtual
          </td>
          <td class="px-4 py-2">
            object
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            虚拟滚动配置
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      虚拟滚动配置
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            enabled
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            true
          </td>
          <td class="px-4 py-2">
            是否启用虚拟滚动
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            rowHeight
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            48
          </td>
          <td class="px-4 py-2">
            行高（像素）
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            buffer
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            5
          </td>
          <td class="px-4 py-2">
            缓冲行数（可视区域外额外渲染的行数）
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            threshold
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            100
          </td>
          <td class="px-4 py-2">
            启用虚拟滚动的数据量阈值
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      列配置
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            key
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列唯一标识，对应数据对象的属性
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            width
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列宽度（像素）
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            minWidth
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列最小宽度（像素）
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            align
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            left
          </td>
          <td class="px-4 py-2">
            对齐方式，可选值：left/center/right
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            sortable
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否可排序
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            fixed
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列固定位置，可选值：left/right
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            render
          </td>
          <td class="px-4 py-2">
            function
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义单元格渲染函数
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      VirtualTable 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            row-click
          </td>
          <td class="px-4 py-2">
            (row: object)
          </td>
          <td class="px-4 py-2">
            点击行时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            sort-change
          </td>
          <td class="px-4 py-2">
            (column: object, direction: string | null)
          </td>
          <td class="px-4 py-2">
            排序变化时触发
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
