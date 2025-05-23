<script setup lang="ts" name="DemoTree">
/**
 * 树形控件组件示例页面
 * 创建日期: 2024-07-30
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
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

// 代码示例
const basicCode = `<ui-tree :data="basicTreeData" />

<script setup>
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
<\/script>`

const selectableCode = `<ui-tree
  :data="selectableTreeData"
  :selected-keys="selectedKeys"
  selectable
  highlight-current
  @select="handleNodeSelect"
/>

<script setup>
const selectedKeys = ref([])
const selectedNode = ref(null)

function handleNodeSelect(keys, node) {
  selectedNode.value = node
  console.warn('选中节点:', node.label)
}
<\/script>`

const checkableCode = `<ui-tree
  :data="checkableTreeData"
  :checked-keys="checkedKeys"
  checkable
  @check="handleNodeCheck"
/>

<script setup>
const checkedKeys = ref(['1-1', '2-2'])

function handleNodeCheck(keys, info) {
  console.warn('复选框状态变化:', info.checkedNodes.map(n => n.label))
}
<\/script>`

const iconCode = `<ui-tree
  :data="iconTreeData"
  :expanded-keys="expandedKeys"
  show-icon
  @expand="handleNodeExpand"
/>

<script setup>
const expandedKeys = ref(['1', '2'])
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
  // 更多数据...
]
<\/script>`

const searchableCode = `<ui-tree
  v-model:search-value="searchValue"
  :data="searchableTreeData"
  searchable
  default-expand-all
/>

<script setup>
const searchValue = ref('')
// 数据结构...
<\/script>`

const draggableCode = `<ui-tree
  :data="draggableTreeData"
  draggable
  @drop="handleDrop"
/>

<script setup>
const draggableTreeData = ref([/* 树结构数据 */])

function handleDrop(info) {
  const { dragNode, node, dropPosition } = info
  // 处理拖拽逻辑...
}
<\/script>`

const lineStyleCode = `<!-- 实线连接 -->
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
/>`
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      树形控件 (Tree)
    </h1>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      树形控件用于展示具有层级关系的数据结构，支持选择、复选框、搜索、拖拽等功能。
    </p>

    <!-- 基础树 -->
    <ui-demo
      title="基础用法"
      description="最基本的树形结构展示，默认可展开和折叠。"
      :code="basicCode"
    >
      <ui-tree :data="basicTreeData" />
    </ui-demo>

    <!-- 可选择树 -->
    <ui-demo
      title="可选择树"
      description="设置 selectable 属性启用节点选择功能，highlight-current 可以高亮当前选中节点。"
      :code="selectableCode"
    >
      <div>
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
    </ui-demo>

    <!-- 复选框树 -->
    <ui-demo
      title="复选框树"
      description="设置 checkable 属性显示复选框，支持多选和级联选择。"
      :code="checkableCode"
    >
      <ui-tree
        :data="checkableTreeData"
        :checked-keys="checkedKeys"
        checkable
        @check="handleNodeCheck"
      />
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="通过 show-icon 属性显示图标，每个节点可以设置自己的图标。"
      :code="iconCode"
    >
      <ui-tree
        :data="iconTreeData"
        :expanded-keys="expandedKeys"
        show-icon
        @expand="handleNodeExpand"
      />
    </ui-demo>

    <!-- 可搜索树 -->
    <ui-demo
      title="可搜索树"
      description="设置 searchable 属性启用搜索功能，可以快速筛选节点。"
      :code="searchableCode"
    >
      <ui-tree
        v-model:search-value="searchValue"
        :data="searchableTreeData"
        searchable
        default-expand-all
      />
    </ui-demo>

    <!-- 可拖拽树 -->
    <ui-demo
      title="可拖拽树"
      description="设置 draggable 属性启用拖拽功能，可以调整节点位置。"
      :code="draggableCode"
    >
      <div>
        <ui-tree
          :data="draggableTreeData"
          draggable
          @drop="handleDrop"
        />
        <div class="mt-4 text-sm text-gray-500">
          提示：可以拖拽节点改变其位置
        </div>
      </div>
    </ui-demo>

    <!-- 连接线风格 -->
    <ui-demo
      title="连接线风格"
      description="通过 line-style 属性设置节点间连接线的样式，支持实线、虚线和无连接线。"
      :code="lineStyleCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </ui-demo>

    <!-- API 文档 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 mt-4 text-lg font-medium">
        Tree Props
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                data
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                ITreeNode[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                树结构数据
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                checkable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示复选框
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                defaultExpandAll
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否默认展开所有节点
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                selectedKeys
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (string | number)[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                已选中的节点值
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                checkedKeys
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (string | number)[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                已选中的复选框节点值
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                expandedKeys
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (string | number)[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                默认展开的节点值
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                draggable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可拖拽
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                searchable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可搜索
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                searchValue
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                ''
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                搜索值
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                lineStyle
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'line' | 'dashed' | 'none'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'line'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点间连接线样式
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        Tree Events
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                select
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点选中状态变化
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (selectedKeys: (string | number)[], node: ITreeNode)
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                check
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点复选框状态变化
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (checkedKeys: (string | number)[], info: object)
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                expand
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点展开/折叠时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (expandedKeys: (string | number)[], info: object)
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                drop
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                拖拽完成时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (info: {dragNode, node, dropPosition})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
