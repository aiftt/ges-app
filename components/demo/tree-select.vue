<script setup lang="ts" name="DemoTreeSelect">
/**
 * 树形选择器演示
 * 创建日期: 2024-08-30
 * 作者: aiftt
 */

// 基本使用
const singleSelectValue = ref('')

// 多选
const multiSelectValue = ref<string[]>([])

// 复选框
const checkableValue = ref<string[]>([])

// 只选叶子节点
const leafOnlyValue = ref('')

// 紧凑模式
const collapseTagsValue = ref<string[]>([])

// 自定义渲染
const customerRenderValue = ref('')

// 可过滤搜索
const filterableValue = ref('')

// 禁用状态
const disabledTreeData = [
  {
    id: '1',
    label: '选项1',
    children: [
      {
        id: '1-1',
        label: '选项1-1',
        disabled: true,
      },
      {
        id: '1-2',
        label: '选项1-2',
      },
    ],
  },
  {
    id: '2',
    label: '选项2',
    disabled: true,
    children: [
      {
        id: '2-1',
        label: '选项2-1',
      },
      {
        id: '2-2',
        label: '选项2-2',
      },
    ],
  },
]

// 示例数据
const treeData = [
  {
    id: '1',
    label: '一级选项1',
    children: [
      {
        id: '1-1',
        label: '二级选项1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级选项1-1-1',
          },
          {
            id: '1-1-2',
            label: '三级选项1-1-2',
          },
        ],
      },
      {
        id: '1-2',
        label: '二级选项1-2',
        children: [
          {
            id: '1-2-1',
            label: '三级选项1-2-1',
          },
          {
            id: '1-2-2',
            label: '三级选项1-2-2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    label: '一级选项2',
    children: [
      {
        id: '2-1',
        label: '二级选项2-1',
        children: [
          {
            id: '2-1-1',
            label: '三级选项2-1-1',
          },
          {
            id: '2-1-2',
            label: '三级选项2-1-2',
          },
        ],
      },
      {
        id: '2-2',
        label: '二级选项2-2',
        children: [
          {
            id: '2-2-1',
            label: '三级选项2-2-1',
          },
          {
            id: '2-2-2',
            label: '三级选项2-2-2',
          },
        ],
      },
    ],
  },
]

// 带图标的数据
const treeDataWithIcons = [
  {
    id: '1',
    label: '文档',
    icon: 'carbon:document',
    children: [
      {
        id: '1-1',
        label: 'PDF文件',
        icon: 'carbon:document-pdf',
      },
      {
        id: '1-2',
        label: 'Word文件',
        icon: 'carbon:document-word',
      },
      {
        id: '1-3',
        label: 'Excel文件',
        icon: 'carbon:spreadsheet',
      },
    ],
  },
  {
    id: '2',
    label: '图片',
    icon: 'carbon:image',
    children: [
      {
        id: '2-1',
        label: 'JPG图片',
        icon: 'carbon:image',
      },
      {
        id: '2-2',
        label: 'PNG图片',
        icon: 'carbon:image',
      },
    ],
  },
  {
    id: '3',
    label: '视频',
    icon: 'carbon:video',
    children: [
      {
        id: '3-1',
        label: 'MP4视频',
        icon: 'carbon:video',
      },
      {
        id: '3-2',
        label: 'AVI视频',
        icon: 'carbon:video',
      },
    ],
  },
]

// 尺寸选项
const sizeOptions = [
  { value: 'small', label: '小' },
  { value: 'default', label: '默认' },
  { value: 'large', label: '大' },
]

// 当前尺寸
const currentSize = ref<'small' | 'default' | 'large'>('default')

// 自定义渲染函数
function renderLabel(node: any) {
  const data = {
    label: node.label,
    icon: node.icon || 'carbon:folder',
  }

  return h('div', { class: 'flex items-center' }, [
    h('ui-icon', { icon: data.icon, class: 'mr-1 text-primary-500' }),
    h('span', { class: 'font-medium' }, data.label),
  ])
}

// 搜索处理函数
function handleSearch(query: string) {
  console.warn('搜索关键词:', query)
}
</script>

<template>
  <div class="ui-demo p-6 space-y-8">
    <h2 class="mb-4 text-2xl font-bold">
      树形选择器
    </h2>
    <div class="mb-6 text-lg text-gray-700 dark:text-gray-300">
      树形选择器用于在树形结构中选择一个或多个节点，支持单选、多选、过滤搜索等功能。
    </div>

    <!-- 基本使用 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        基本使用
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <ui-tree-select
            v-model="singleSelectValue"
            :data="treeData"
            placeholder="请选择"
            clearable
          />
        </div>
        <div v-if="singleSelectValue" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的值: {{ singleSelectValue }}
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        不同尺寸
      </h3>
      <div class="space-y-4">
        <div class="mb-4 flex items-center gap-4">
          <span>选择尺寸：</span>
          <ui-radio-group v-model="currentSize">
            <ui-radio
              v-for="option in sizeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </ui-radio>
          </ui-radio-group>
        </div>
        <div class="w-full md:w-72">
          <ui-tree-select
            :data="treeData"
            placeholder="请选择"
            :size="currentSize"
          />
        </div>
      </div>
    </section>

    <!-- 多选模式 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        多选模式
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <ui-tree-select
            v-model="multiSelectValue"
            :data="treeData"
            placeholder="请选择(多选)"

            clearable multiple
          />
        </div>
        <div v-if="multiSelectValue.length" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的值: {{ multiSelectValue.join(', ') }}
        </div>
      </div>
    </section>

    <!-- 使用复选框 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        使用复选框
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <ui-tree-select
            v-model="checkableValue"
            :data="treeData"
            placeholder="请选择(复选框)"

            multiple clearable checkable
          />
        </div>
        <div v-if="checkableValue.length" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的值: {{ checkableValue.join(', ') }}
        </div>
      </div>
    </section>

    <!-- 只选叶子节点 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        只选叶子节点
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <ui-tree-select
            v-model="leafOnlyValue"
            :data="treeData"
            placeholder="只能选择叶子节点"

            clearable leaf-only
          />
        </div>
        <div v-if="leafOnlyValue" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的值: {{ leafOnlyValue }}
        </div>
      </div>
    </section>

    <!-- 折叠标签 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        折叠标签
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <ui-tree-select
            v-model="collapseTagsValue"
            :data="treeData"
            placeholder="折叠多选标签"

            :max-collapse-tag-count="1"
            multiple clearable collapse-tags
          />
        </div>
        <div v-if="collapseTagsValue.length" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的值: {{ collapseTagsValue.join(', ') }}
        </div>
      </div>
    </section>

    <!-- 显示图标 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        显示图标
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          :data="treeDataWithIcons"
          placeholder="显示节点图标"
          show-icon
        />
      </div>
    </section>

    <!-- 自定义渲染 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        自定义渲染
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          v-model="customerRenderValue"
          :data="treeDataWithIcons"
          placeholder="自定义节点渲染"
          :render-label="renderLabel"
        />
      </div>
    </section>

    <!-- 可搜索 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        可搜索
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          v-model="filterableValue"
          :data="treeData"
          placeholder="输入关键词搜索"
          filterable
          @search-change="handleSearch"
        />
      </div>
    </section>

    <!-- 禁用选项 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        禁用选项
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          :data="disabledTreeData"
          placeholder="包含禁用选项"
        />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        禁用状态
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          :data="treeData"
          placeholder="禁用状态"
          disabled
        />
      </div>
    </section>

    <!-- 显示按钮 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        展开/折叠按钮
      </h3>
      <div class="w-full md:w-72">
        <ui-tree-select
          :data="treeData"
          placeholder="带展开折叠按钮"
          show-expand-buttons
          :default-expand-all="true"
        />
      </div>
    </section>
  </div>
</template>
