<script setup lang="ts">
/**
 * 虚拟表格演示组件
 * 创建日期: 2024-08-30
 * 作者: [Claude]
 */
import type { IVirtualTableColumn } from '~/components/ui/virtual/table.vue'
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
    render: (row) => {
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
</script>

<template>
  <div class="demo-container">
    <div class="demo-controls">
      <div class="control-group">
        <label>数据量:</label>
        <button @click="generateData(100)">
          100行
        </button>
        <button @click="generateData(1000)">
          1000行
        </button>
        <button @click="generateData(10000)">
          10000行
        </button>
      </div>
      <div class="control-group">
        <label>虚拟滚动:</label>
        <input v-model="virtualEnabled" type="checkbox">
        <span class="checkbox-label">{{ virtualEnabled ? '开启' : '关闭' }}</span>
      </div>
      <div class="control-group">
        <label>表格高度:</label>
        <select v-model="tableHeight">
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
</template>

<style lang="scss" scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--ui-color-bg-1);
  border-radius: 4px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;

  label {
    font-weight: 500;
  }

  button {
    padding: 4px 12px;
    border: 1px solid var(--ui-color-border);
    border-radius: 4px;
    background-color: var(--ui-color-bg-0);
    cursor: pointer;

    &:hover {
      background-color: var(--ui-color-bg-1);
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  select {
    padding: 4px 8px;
    border: 1px solid var(--ui-color-border);
    border-radius: 4px;
    background-color: var(--ui-color-bg-0);
  }

  .checkbox-label {
    font-size: 14px;
  }
}

.table-container {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--ui-color-border);
}

.stats {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  background-color: var(--ui-color-bg-1);
  border-radius: 4px;
  font-size: 14px;

  div {
    display: flex;
    align-items: center;
  }
}
</style>
