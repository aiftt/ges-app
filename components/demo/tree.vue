<script setup lang="ts" name="DemoTree">
/**
 * 树形控件组件示例页面
 * 创建日期: 2024-07-30
 * 作者: aiftt
 */

import { h, ref } from 'vue'

// 基础树结构数据
const basicTreeData = [
  {
    id: '1',
    label: '一级节点 1',
    children: [
      {
        id: '1-1',
        label: '二级节点 1-1',
        children: [
          { id: '1-1-1', label: '三级节点 1-1-1' },
          { id: '1-1-2', label: '三级节点 1-1-2' },
        ],
      },
      { id: '1-2', label: '二级节点 1-2' },
    ],
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [
      { id: '2-1', label: '二级节点 2-1' },
      { id: '2-2', label: '二级节点 2-2' },
    ],
  },
]

// 可选择树的数据
const selectableTreeData = [...basicTreeData]

// 复选框树数据
const checkableTreeData = [
  {
    id: '1',
    label: '产品部',
    children: [
      { id: '1-1', label: '产品经理' },
      { id: '1-2', label: '产品助理' },
    ],
  },
  {
    id: '2',
    label: '研发部',
    children: [
      { id: '2-1', label: '前端开发' },
      { id: '2-2', label: '后端开发' },
      { id: '2-3', label: '测试工程师' },
    ],
  },
  {
    id: '3',
    label: '设计部',
    children: [
      { id: '3-1', label: 'UI设计师' },
      { id: '3-2', label: '交互设计师' },
    ],
  },
]

// 自定义图标树数据
const iconTreeData = [
  {
    id: '1',
    label: '文档',
    icon: 'carbon:folder',
    children: [
      { id: '1-1', label: '项目计划.docx', icon: 'carbon:document' },
      { id: '1-2', label: '需求文档.docx', icon: 'carbon:document' },
    ],
  },
  {
    id: '2',
    label: '图片',
    icon: 'carbon:folder',
    children: [
      { id: '2-1', label: 'logo.png', icon: 'carbon:image' },
      { id: '2-2', label: 'banner.jpg', icon: 'carbon:image' },
    ],
  },
  {
    id: '3',
    label: '视频',
    icon: 'carbon:folder',
    children: [
      { id: '3-1', label: '产品演示.mp4', icon: 'carbon:video' },
    ],
  },
]

// 可拖拽树数据
const draggableTreeData = ref([
  {
    id: '1',
    label: '一级节点 1',
    children: [
      {
        id: '1-1',
        label: '二级节点 1-1',
        children: [
          { id: '1-1-1', label: '三级节点 1-1-1' },
          { id: '1-1-2', label: '三级节点 1-1-2' },
        ],
      },
      { id: '1-2', label: '二级节点 1-2' },
    ],
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [
      { id: '2-1', label: '二级节点 2-1' },
      { id: '2-2', label: '二级节点 2-2' },
    ],
  },
])

// 可搜索树数据
const searchableTreeData = [
  {
    id: '1',
    label: '前端开发',
    children: [
      {
        id: '1-1',
        label: 'HTML/CSS',
        children: [
          { id: '1-1-1', label: 'HTML基础' },
          { id: '1-1-2', label: 'CSS布局' },
          { id: '1-1-3', label: 'CSS变量' },
        ],
      },
      {
        id: '1-2',
        label: 'JavaScript',
        children: [
          { id: '1-2-1', label: 'ES6特性' },
          { id: '1-2-2', label: '异步编程' },
        ],
      },
      {
        id: '1-3',
        label: '前端框架',
        children: [
          { id: '1-3-1', label: 'Vue.js' },
          { id: '1-3-2', label: 'React' },
          { id: '1-3-3', label: 'Angular' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: '后端开发',
    children: [
      {
        id: '2-1',
        label: 'Node.js',
        children: [
          { id: '2-1-1', label: 'Express' },
          { id: '2-1-2', label: 'Koa' },
        ],
      },
      {
        id: '2-2',
        label: 'Python',
        children: [
          { id: '2-2-1', label: 'Django' },
          { id: '2-2-2', label: 'Flask' },
        ],
      },
    ],
  },
]

// 连接线样式树数据
const lineStyleTreeData = [...basicTreeData]

// 事件处理
const selectedNode = ref<any>(null)
const selectedKeys = ref<(string | number)[]>([])
const checkedKeys = ref<(string | number)[]>(['1-1', '2-2'])
const expandedKeys = ref<(string | number)[]>(['1', '2'])
const searchValue = ref('')

// 节点选中事件处理
function handleNodeSelect(keys: (string | number)[], node: any) {
  selectedNode.value = node
  console.warn('选中节点:', node.label)
}

// 复选框选中事件处理
function handleNodeCheck(keys: (string | number)[], info: any) {
  console.warn('复选框状态变化:', info.checkedNodes.map((n: any) => n.label))
}

// 节点展开事件处理
function handleNodeExpand(keys: (string | number)[], info: any) {
  console.warn(info.expanded ? '展开节点:' : '折叠节点:', info.node.label)
}

// 自定义节点渲染
function _renderNodeLabel(node: any) {
  // 根据节点类型返回不同的渲染内容
  if (node.type === 'file') {
    return h('div', {
      class: 'flex items-center',
    }, [
      h('ui-icon', { icon: 'carbon:document', class: 'mr-1' }),
      h('span', node.label),
    ])
  }

  return node.label
}

// 处理拖拽事件
function handleDrop(info: any) {
  const { dragNode, node, dropPosition } = info
  const dragKey = dragNode.id
  const dropKey = node.id

  // 复制当前树数据
  const data = JSON.parse(JSON.stringify(draggableTreeData.value))

  // 查找被拖拽的节点
  let dragObj: any
  const loop = (data: any[], key: string | number, callback: (item: any, index: number, arr: any[]) => void) => {
    data.forEach((item, index, arr) => {
      if (item.id === key) {
        callback(item, index, arr)
        return
      }
      if (item.children) {
        loop(item.children, key, callback)
      }
    })
  }

  // 找到并移除拖拽节点
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1)
    dragObj = item
  })

  // 放置节点
  if (!dropPosition) {
    // 放在节点内部，成为其子节点
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      item.children.push(dragObj)
    })
  }
  else {
    // 放在节点前后
    loop(data, dropKey, (item, index, arr) => {
      const dropPos = dropPosition < 0 ? index : index + 1
      arr.splice(dropPos, 0, dragObj)
    })
  }

  // 更新树数据
  draggableTreeData.value = data
  console.warn('拖拽成功:', `${dragNode.label} -> ${node.label}`)
}
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      树形控件 (Tree)
    </h1>

    <div class="space-y-10">
      <!-- 基础树 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础用法
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree :data="basicTreeData" />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree :data="basicTreeData" />` }}</code></pre>
        </div>
      </section>

      <!-- 可选择树 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          可选择树
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree
            :data="selectableTreeData"
            :selected-keys="selectedKeys"

            selectable highlight-current
            @select="handleNodeSelect"
          />
          <div v-if="selectedNode" class="mt-4 rounded bg-gray-100 p-2 dark:bg-gray-700">
            <p class="text-sm">
              当前选中: {{ selectedNode.label }} (ID: {{ selectedNode.id }})
            </p>
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree
  :data="selectableTreeData"
  :selected-keys="selectedKeys"
  selectable
  highlight-current
  @select="handleNodeSelect"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 复选框树 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          复选框树
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree
            :data="checkableTreeData"
            :checked-keys="checkedKeys"
            checkable
            @check="handleNodeCheck"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree
  :data="checkableTreeData"
  :checked-keys="checkedKeys"
  checkable
  @check="handleNodeCheck"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 自定义图标 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义图标
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree
            :data="iconTreeData"
            :expanded-keys="expandedKeys"
            show-icon
            @expand="handleNodeExpand"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree
  :data="iconTreeData"
  :expanded-keys="expandedKeys"
  show-icon
  @expand="handleNodeExpand"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 可搜索树 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          可搜索树
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree
            v-model:search-value="searchValue"
            :data="searchableTreeData"
            searchable
            default-expand-all
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree
  :data="searchableTreeData"
  searchable
  v-model:search-value="searchValue"
  default-expand-all
/>` }}</code></pre>
        </div>
      </section>

      <!-- 可拖拽树 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          可拖拽树
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-tree
            :data="draggableTreeData"
            draggable
            @drop="handleDrop"
          />
          <div class="mt-4 text-sm text-gray-500">
            提示：可以拖拽节点改变其位置
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tree
  :data="draggableTreeData"
  draggable
  @drop="handleDrop"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 连接线风格 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          连接线风格
        </h2>
        <div class="grid grid-cols-1 gap-6 rounded-lg bg-white p-4 shadow md:grid-cols-2 dark:bg-gray-800">
          <div>
            <h3 class="mb-2 font-medium">
              实线连接
            </h3>
            <ui-tree
              :data="lineStyleTreeData"
              line-style="line"
              default-expand-all
            />
          </div>
          <div>
            <h3 class="mb-2 font-medium">
              虚线连接
            </h3>
            <ui-tree
              :data="lineStyleTreeData"
              line-style="dashed"
              default-expand-all
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<!-- 实线连接 -->
<ui-tree
  :data="lineStyleTreeData"
  line-style="line"
  default-expand-all
/>

<!-- 虚线连接 -->
<ui-tree
  :data="lineStyleTreeData"
  line-style="dashed"
  default-expand-all
/>` }}</code></pre>
        </div>
      </section>

      <!-- API 文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          Tree Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                data
              </td>
              <td class="border-b px-4 py-2">
                ITreeNode[]
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                树结构数据
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                checkable
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示复选框
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                defaultExpandAll
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否默认展开所有节点
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                selectedKeys
              </td>
              <td class="border-b px-4 py-2">
                (string | number)[]
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                已选中的节点值
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                checkedKeys
              </td>
              <td class="border-b px-4 py-2">
                (string | number)[]
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                已选中的复选框节点值
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                expandedKeys
              </td>
              <td class="border-b px-4 py-2">
                (string | number)[]
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                默认展开的节点值
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                draggable
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否可拖拽
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                searchable
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否可搜索
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                searchValue
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ''
              </td>
              <td class="border-b px-4 py-2">
                搜索值
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                indent
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                24
              </td>
              <td class="border-b px-4 py-2">
                节点缩进距离，单位px
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                lineStyle
              </td>
              <td class="border-b px-4 py-2">
                'line' | 'dashed' | 'none'
              </td>
              <td class="border-b px-4 py-2">
                'line'
              </td>
              <td class="border-b px-4 py-2">
                节点间连接线样式
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                selectable
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                true
              </td>
              <td class="border-b px-4 py-2">
                是否可选择
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                highlightCurrent
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否高亮当前选中节点
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                loading
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示加载状态
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                showIcon
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示节点图标
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          Tree Events
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                事件名
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
              <th class="border-b px-4 py-2 text-left">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                select
              </td>
              <td class="border-b px-4 py-2">
                节点选中状态变化
              </td>
              <td class="border-b px-4 py-2">
                (selectedKeys: (string | number)[], node: ITreeNode)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                check
              </td>
              <td class="border-b px-4 py-2">
                节点复选框状态变化
              </td>
              <td class="border-b px-4 py-2">
                (checkedKeys: (string | number)[], info: object)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                expand
              </td>
              <td class="border-b px-4 py-2">
                节点展开/折叠时触发
              </td>
              <td class="border-b px-4 py-2">
                (expandedKeys: (string | number)[], info: object)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                contextmenu
              </td>
              <td class="border-b px-4 py-2">
                节点被右键点击时触发
              </td>
              <td class="border-b px-4 py-2">
                (event: MouseEvent, node: ITreeNode)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                update:selectedKeys
              </td>
              <td class="border-b px-4 py-2">
                更新选中的节点键值
              </td>
              <td class="border-b px-4 py-2">
                (selectedKeys: (string | number)[])
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                update:checkedKeys
              </td>
              <td class="border-b px-4 py-2">
                更新选中的复选框节点键值
              </td>
              <td class="border-b px-4 py-2">
                (checkedKeys: (string | number)[])
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                update:expandedKeys
              </td>
              <td class="border-b px-4 py-2">
                更新展开的节点键值
              </td>
              <td class="border-b px-4 py-2">
                (expandedKeys: (string | number)[])
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          TreeNode 数据结构
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                id
              </td>
              <td class="border-b px-4 py-2">
                string | number
              </td>
              <td class="border-b px-4 py-2">
                节点唯一标识
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                label
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                节点标签内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                children
              </td>
              <td class="border-b px-4 py-2">
                ITreeNode[]
              </td>
              <td class="border-b px-4 py-2">
                子节点
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                disabled
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                是否禁用
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                expanded
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                是否默认展开
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                selected
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                是否默认选中
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                icon
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                节点图标
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
