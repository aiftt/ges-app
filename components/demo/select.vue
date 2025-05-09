<script setup lang="ts" name="DemoSelect">
/**
 * Select 选择器组件演示
 * 创建日期: 2024-05-26
 * 作者: aiftt
 * 更新日期: 2024-05-27 - 添加更多功能演示
 * 更新日期: 2024-07-05 - 添加键盘导航演示，修复尺寸类型问题
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
</script>

<template>
  <div class="space-y-10">
    <!-- 基础用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        最简单的选择器用法，通过v-model绑定选中的值。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select v-model="singleValue" :options="options" placeholder="请选择一个选项" />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ singleValue || '未选择' }}
        </div>
      </div>
    </section>

    <!-- 多选模式 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        多选模式
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用multiple属性启用多选模式，可以选择多个选项。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select v-model="multipleValue" :options="options" multiple placeholder="请选择多个选项" />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ multipleValue.length ? multipleValue.join(', ') : '未选择' }}
        </div>
      </div>
    </section>

    <!-- 尺寸 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        不同尺寸
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        提供三种尺寸的选择器：小、默认、大。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <div v-for="size in sizes" :key="size" class="flex items-center">
            <div class="w-20 text-sm text-gray-600 dark:text-gray-400">
              {{ size }}:
            </div>
            <ui-select :size="size" :options="options" placeholder="请选择" />
          </div>
        </div>
      </div>
    </section>

    <!-- 可清空选择 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        可清空选择
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置clearable属性，鼠标悬停时会显示清空按钮。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select v-model="singleValue" :options="options" clearable placeholder="请选择一个选项" />
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        禁用状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置disabled属性禁用整个选择器，或者设置选项的disabled属性禁用特定选项。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select :options="options" disabled placeholder="禁用状态" />
        </div>
        <div class="mb-4">
          <ui-select :options="options" placeholder="包含禁用选项" />
        </div>
      </div>
    </section>

    <!-- 错误状态 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        错误状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置error属性显示错误状态。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select :options="options" error placeholder="错误状态" />
        </div>
      </div>
    </section>

    <!-- 自定义宽度 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义宽度
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过width属性设置选择器的宽度。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-select :options="options" width="200px" placeholder="宽度200px" />
          <ui-select :options="options" width="300px" placeholder="宽度300px" />
        </div>
      </div>
    </section>

    <!-- 大量选项 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        大量选项和自定义高度
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        当有大量选项时，可以使用maxHeight属性设置下拉菜单的最大高度。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-select :options="manyOptions" placeholder="大量选项" />
          <ui-select :options="manyOptions" max-height="150px" placeholder="下拉菜单最大高度150px" />
        </div>
      </div>
    </section>

    <!-- 可筛选选项 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        可筛选选项
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置filterable属性，可以对选项进行搜索和筛选。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="filterableValue"
            :options="options"
            filterable
            placeholder="可筛选选项"
          />
        </div>
      </div>
    </section>

    <!-- 创建新选项 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        创建新选项
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置allowCreate属性，可以创建并选中选项中不存在的条目。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="creationValue"
            :options="options"
            filterable
            allow-create
            placeholder="输入内容并回车创建新选项"
          />
        </div>
      </div>
    </section>

    <!-- 分组选项 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        分组选项
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过children属性对选项进行分组显示。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="singleValue"
            :options="groupOptions"
            placeholder="选择城市"
          />
        </div>
      </div>
    </section>

    <!-- 折叠标签的多选 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        折叠标签的多选
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用collapseTags属性和maxCollapseTagCount属性控制多选模式下的标签显示。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="collapseTagsValue"
            :options="manyOptions"
            multiple
            collapse-tags
            :max-collapse-tag-count="2"
            tag-type="primary"
            placeholder="可折叠标签的多选"
          />
        </div>
      </div>
    </section>

    <!-- 远程搜索 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        远程搜索
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用remote和remoteMethod属性进行远程搜索。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="remoteValue"
            :options="remoteOptions"
            filterable
            remote
            :remote-method="remoteSearch"
            :loading="remoteLoading"
            placeholder="输入关键字远程搜索"
          />
        </div>
      </div>
    </section>

    <!-- 自定义模板 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义选项模板
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用option插槽自定义选项的显示方式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
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
        </div>
      </div>
    </section>

    <!-- 自定义头尾 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义下拉菜单头部和底部
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用header和footer插槽自定义下拉菜单的头部和底部。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
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
        </div>
      </div>
    </section>

    <!-- 键盘导航 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        键盘导航
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持使用键盘上下箭头选择选项，回车键确认选择。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-select
            v-model="singleValue"
            :options="options"
            placeholder="使用键盘导航选择选项"
          />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <p>试试以下键盘操作：</p>
          <ul class="ml-5 mt-2 list-disc">
            <li>点击选择器，然后使用上/下箭头键浏览选项</li>
            <li>按回车键选择当前高亮的选项</li>
            <li>按ESC键关闭下拉菜单</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
