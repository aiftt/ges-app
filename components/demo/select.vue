<script setup lang="ts" name="DemoSelect">
/**
 * Select 选择器组件演示
 * 创建日期: 2024-05-26
 * 作者: aiftt
 * 更新日期: 2024-07-05 - 添加键盘导航演示，修复尺寸类型问题
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 单选演示数据
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '禁用选项', value: '6', disabled: true },
]

// 单选值
const singleValue = ref('')

// 多选值
const multipleValue = ref<string[]>([])

// 尺寸数据 - 使用as const确保正确的类型推断
const sizes = ['small', 'default', 'large'] as const

// 大量选项数据
const manyOptions = Array.from({ length: 20 }).map((_, index) => ({
  label: `选项 ${index + 1}`,
  value: String(index + 1),
  disabled: index % 10 === 9, // 每10个禁用一个选项
}))

// 分组选项数据
const groupOptions = [
  {
    value: 'hotcities',
    label: '热门城市',
    children: [
      { value: 'shanghai', label: '上海' },
      { value: 'beijing', label: '北京' },
      { value: 'guangzhou', label: '广州' },
      { value: 'shenzhen', label: '深圳' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
]

// 可筛选值
const filterableValue = ref('')

// 可创建值
const creationValue = ref('')

// 多选折叠标签值
const collapseTagsValue = ref<string[]>([])

// 远程搜索值
const remoteValue = ref('')

// 远程选项
const remoteOptions = ref<Array<{ label: string, value: string }>>([])

// 远程搜索
const remoteLoading = ref(false)
function remoteSearch(query: string) {
  remoteLoading.value = true
  setTimeout(() => {
    remoteOptions.value = query
      ? Array.from({ length: 5 }).map((_, idx) => ({
          value: `${query}-${idx}`,
          label: `${query}-${idx}`,
        }))
      : []
    remoteLoading.value = false
  }, 1000)
}

// 代码示例
const basicCode = `<ui-select v-model="singleValue" :options="options" placeholder="请选择一个选项" />

<script setup>
// 选项数据
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '禁用选项', value: '6', disabled: true },
]

const singleValue = ref('')
<\/script>`

const multipleCode = `<ui-select
  v-model="multipleValue"
  :options="options"
  multiple
  placeholder="请选择多个选项"
/>`

const sizesCode = `<ui-select size="small" :options="options" placeholder="请选择" />
<ui-select size="default" :options="options" placeholder="请选择" />
<ui-select size="large" :options="options" placeholder="请选择" />`

const clearableCode = `<ui-select
  v-model="singleValue"
  :options="options"
  clearable
  placeholder="请选择一个选项"
/>`

const disabledCode = `<!-- 整个选择器禁用 -->
<ui-select :options="options" disabled placeholder="禁用状态" />

<!-- 特定选项禁用 -->
<ui-select :options="options" placeholder="包含禁用选项" />`

const errorCode = `<ui-select :options="options" error placeholder="错误状态" />`

const widthCode = `<ui-select :options="options" width="200px" placeholder="宽度200px" />
<ui-select :options="options" width="300px" placeholder="宽度300px" />`

const manyOptionsCode = `<!-- 正常显示 -->
<ui-select :options="manyOptions" placeholder="大量选项" />

<!-- 限制最大高度 -->
<ui-select :options="manyOptions" max-height="150px" placeholder="下拉菜单最大高度150px" />`

const filterableCode = `<ui-select
  v-model="filterableValue"
  :options="options"
  filterable
  placeholder="可筛选选项"
/>`

const allowCreateCode = `<ui-select
  v-model="creationValue"
  :options="options"
  filterable
  allow-create
  placeholder="输入内容并回车创建新选项"
/>`

const groupOptionsCode = `<ui-select
  v-model="singleValue"
  :options="groupOptions"
  placeholder="选择城市"
/>

<script setup>
// 分组选项数据
const groupOptions = [
  {
    value: 'hotcities',
    label: '热门城市',
    children: [
      { value: 'shanghai', label: '上海' },
      { value: 'beijing', label: '北京' },
      { value: 'guangzhou', label: '广州' },
      { value: 'shenzhen', label: '深圳' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
]
<\/script>`

const collapseTagsCode = `<ui-select
  v-model="collapseTagsValue"
  :options="manyOptions"
  multiple
  collapse-tags
  :max-collapse-tag-count="2"
  tag-type="primary"
  placeholder="可折叠标签的多选"
/>`

const remoteSearchCode = `<ui-select
  v-model="remoteValue"
  :options="remoteOptions"
  filterable
  remote
  :remote-method="remoteSearch"
  :loading="remoteLoading"
  placeholder="输入关键字远程搜索"
/>

<script setup>
const remoteValue = ref('')
const remoteOptions = ref([])
const remoteLoading = ref(false)

function remoteSearch(query) {
  remoteLoading.value = true
  // 模拟远程请求
  setTimeout(() => {
    remoteOptions.value = query
      ? Array.from({ length: 5 }).map((_, idx) => ({
          value: query + '-' + idx,
          label: query + '-' + idx,
        }))
      : []
    remoteLoading.value = false
  }, 1000)
}
<\/script>`

const customTemplateCode = `<ui-select
  v-model="singleValue"
  :options="options"
  placeholder="自定义选项模板"
>
  <template #option="{ option, selected }">
    <div class="flex items-center" :class="[selected ? 'text-blue-500' : '']">
      <ui-icon icon="carbon:user" class="mr-2" />
      <span>{{ option.label }}</span>
      <span v-if="selected" class="ml-auto">
        <ui-icon icon="carbon:checkmark" />
      </span>
    </div>
  </template>
</ui-select>`

const customHeaderFooterCode = `<ui-select
  v-model="singleValue"
  :options="options"
  placeholder="自定义下拉菜单头部和底部"
>
  <template #header>
    <div class="border-b border-gray-200 p-2 text-center text-sm text-blue-600 dark:border-gray-700">
      自定义头部内容
    </div>
  </template>
  <template #footer>
    <div class="p-2 text-center text-sm text-gray-500">
      自定义底部内容
    </div>
  </template>
</ui-select>`

const keyboardNavCode = `<ui-select
  v-model="singleValue"
  :options="options"
  placeholder="使用键盘导航选择选项"
/>

<!-- 支持的键盘操作：
- 上/下箭头键浏览选项
- 回车键选择当前高亮的选项
- ESC键关闭下拉菜单
-->`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Select 选择器
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      选择器组件用于在多个选项中选择一个或多个值，支持单选、多选、搜索、远程数据等功能。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最简单的选择器用法，通过v-model绑定选中的值。"
      :code="basicCode"
    >
      <div class="space-y-2">
        <ui-select v-model="singleValue" :options="options" placeholder="请选择一个选项" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ singleValue || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 多选模式 -->
    <ui-demo
      title="多选模式"
      description="使用multiple属性启用多选模式，可以选择多个选项。"
      :code="multipleCode"
    >
      <div class="space-y-2">
        <ui-select v-model="multipleValue" :options="options" multiple placeholder="请选择多个选项" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ multipleValue.length ? multipleValue.join(', ') : '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种尺寸的选择器：小、默认、大。"
      :code="sizesCode"
    >
      <div class="space-y-4">
        <div v-for="size in sizes" :key="size" class="flex items-center">
          <div class="w-20 text-sm text-gray-600 dark:text-gray-400">
            {{ size }}:
          </div>
          <ui-select :size="size" :options="options" placeholder="请选择" />
        </div>
      </div>
    </ui-demo>

    <!-- 可清空选择 -->
    <ui-demo
      title="可清空选择"
      description="设置clearable属性，鼠标悬停时会显示清空按钮。"
      :code="clearableCode"
    >
      <ui-select v-model="singleValue" :options="options" clearable placeholder="请选择一个选项" />
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="设置disabled属性禁用整个选择器，或者设置选项的disabled属性禁用特定选项。"
      :code="disabledCode"
    >
      <div class="space-y-4">
        <ui-select :options="options" disabled placeholder="禁用状态" />
        <ui-select :options="options" placeholder="包含禁用选项" />
      </div>
    </ui-demo>

    <!-- 错误状态 -->
    <ui-demo
      title="错误状态"
      description="设置error属性显示错误状态。"
      :code="errorCode"
    >
      <ui-select :options="options" error placeholder="错误状态" />
    </ui-demo>

    <!-- 自定义宽度 -->
    <ui-demo
      title="自定义宽度"
      description="通过width属性设置选择器的宽度。"
      :code="widthCode"
    >
      <div class="space-y-4">
        <ui-select :options="options" width="200px" placeholder="宽度200px" />
        <ui-select :options="options" width="300px" placeholder="宽度300px" />
      </div>
    </ui-demo>

    <!-- 大量选项 -->
    <ui-demo
      title="大量选项和自定义高度"
      description="当有大量选项时，可以使用maxHeight属性设置下拉菜单的最大高度。"
      :code="manyOptionsCode"
    >
      <div class="space-y-4">
        <ui-select :options="manyOptions" placeholder="大量选项" />
        <ui-select :options="manyOptions" max-height="150px" placeholder="下拉菜单最大高度150px" />
      </div>
    </ui-demo>

    <!-- 可筛选选项 -->
    <ui-demo
      title="可筛选选项"
      description="设置filterable属性，可以对选项进行搜索和筛选。"
      :code="filterableCode"
    >
      <ui-select
        v-model="filterableValue"
        :options="options"
        filterable
        placeholder="可筛选选项"
      />
    </ui-demo>

    <!-- 创建新选项 -->
    <ui-demo
      title="创建新选项"
      description="设置allowCreate属性，可以创建并选中选项中不存在的条目。"
      :code="allowCreateCode"
    >
      <ui-select
        v-model="creationValue"
        :options="options"
        filterable
        allow-create
        placeholder="输入内容并回车创建新选项"
      />
    </ui-demo>

    <!-- 分组选项 -->
    <ui-demo
      title="分组选项"
      description="通过children属性对选项进行分组显示。"
      :code="groupOptionsCode"
    >
      <ui-select
        v-model="singleValue"
        :options="groupOptions"
        placeholder="选择城市"
      />
    </ui-demo>

    <!-- 折叠标签的多选 -->
    <ui-demo
      title="折叠标签的多选"
      description="使用collapseTags属性和maxCollapseTagCount属性控制多选模式下的标签显示。"
      :code="collapseTagsCode"
    >
      <ui-select
        v-model="collapseTagsValue"
        :options="manyOptions"
        multiple
        collapse-tags
        :max-collapse-tag-count="2"
        tag-type="primary"
        placeholder="可折叠标签的多选"
      />
    </ui-demo>

    <!-- 远程搜索 -->
    <ui-demo
      title="远程搜索"
      description="使用remote和remoteMethod属性进行远程搜索。"
      :code="remoteSearchCode"
    >
      <ui-select
        v-model="remoteValue"
        :options="remoteOptions"
        filterable
        remote
        :remote-method="remoteSearch"
        :loading="remoteLoading"
        placeholder="输入关键字远程搜索"
      />
    </ui-demo>

    <!-- 自定义模板 -->
    <ui-demo
      title="自定义选项模板"
      description="使用option插槽自定义选项的显示方式。"
      :code="customTemplateCode"
    >
      <ui-select
        v-model="singleValue"
        :options="options"
        placeholder="自定义选项模板"
      >
        <template #option="{ option, selected }">
          <div class="flex items-center" :class="[selected ? 'text-blue-500' : '']">
            <ui-icon icon="carbon:user" class="mr-2" />
            <span>{{ option.label }}</span>
            <span v-if="selected" class="ml-auto">
              <ui-icon icon="carbon:checkmark" />
            </span>
          </div>
        </template>
      </ui-select>
    </ui-demo>

    <!-- 自定义头尾 -->
    <ui-demo
      title="自定义下拉菜单头部和底部"
      description="使用header和footer插槽自定义下拉菜单的头部和底部。"
      :code="customHeaderFooterCode"
    >
      <ui-select
        v-model="singleValue"
        :options="options"
        placeholder="自定义下拉菜单头部和底部"
      >
        <template #header>
          <div class="border-b border-gray-200 p-2 text-center text-sm text-blue-600 dark:border-gray-700">
            自定义头部内容
          </div>
        </template>
        <template #footer>
          <div class="p-2 text-center text-sm text-gray-500">
            自定义底部内容
          </div>
        </template>
      </ui-select>
    </ui-demo>

    <!-- 键盘导航 -->
    <ui-demo
      title="键盘导航"
      description="支持使用键盘上下箭头选择选项，回车键确认选择。"
      :code="keyboardNavCode"
    >
      <div class="space-y-4">
        <ui-select
          v-model="singleValue"
          :options="options"
          placeholder="使用键盘导航选择选项"
        />
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <p>试试以下键盘操作：</p>
          <ul class="ml-5 mt-2 list-disc">
            <li>点击选择器，然后使用上/下箭头键浏览选项</li>
            <li>按回车键选择当前高亮的选项</li>
            <li>按ESC键关闭下拉菜单</li>
          </ul>
        </div>
      </div>
    </ui-demo>
  </div>
</template>
