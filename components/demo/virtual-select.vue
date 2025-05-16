<script setup lang="ts" name="DemoVirtualSelect">
/**
 * 虚拟化选择器演示组件
 * 创建日期: 2024-09-01
 * 作者: aiftt
 * 更新日期: 2024-09-01 - 首次实现
 * 更新日期: 2024-09-02 - 更新演示说明，强调虚拟滚动优势
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 创建一个含有大量选项的数组
const largeOptions = Array.from({ length: 10000 }, (_, index) => ({
  label: `选项 ${index + 1}`,
  value: String(index + 1),
  disabled: index % 100 === 0, // 每100个禁用一个选项
}))

// 分类数据
const categoryOptions = [
  {
    label: '前端框架',
    value: 'frontend-frameworks',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: `框架 ${idx + 1}`,
      value: `framework-${idx + 1}`,
    })),
  },
  {
    label: '后端语言',
    value: 'backend-languages',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: `语言 ${idx + 1}`,
      value: `language-${idx + 1}`,
    })),
  },
  {
    label: '数据库',
    value: 'databases',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: `数据库 ${idx + 1}`,
      value: `database-${idx + 1}`,
    })),
  },
]

// 单选值
const singleValue = ref('')

// 多选值
const multipleValue = ref<string[]>([])

// 自定义配置值
const customValue = ref('')

// 数据量
const largeDataCount = 10000

// 示例代码
const basicCode = `<template>
  <ui-virtual-select
    v-model="singleValue"
    :options="largeOptions"
    placeholder="请从10,000个选项中选择"
    filterable
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

// 创建一个含有大量选项的数组
const largeOptions = Array.from({ length: 10000 }, (_, index) => ({
  label: \`选项 \${index + 1}\`,
  value: String(index + 1),
  disabled: index % 100 === 0, // 每100个禁用一个选项
}))

const singleValue = ref('')
<\/script>`

const multipleCode = `<template>
  <ui-virtual-select
    v-model="multipleValue"
    :options="largeOptions"
    multiple
    filterable
    clearable
    placeholder="请选择多个选项"
    collapse-tags
    :max-collapse-tag-count="2"
  />
</template>

<script setup>
import { ref } from 'vue'

// 创建一个含有大量选项的数组
const largeOptions = Array.from({ length: 10000 }, (_, index) => ({
  label: \`选项 \${index + 1}\`,
  value: String(index + 1),
  disabled: index % 100 === 0, // 每100个禁用一个选项
}))

const multipleValue = ref([])
<\/script>`

const categoryCode = `<template>
  <ui-virtual-select
    v-model="customValue"
    :options="categoryOptions"
    placeholder="分组数据示例"
    filterable
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

// 分类数据
const categoryOptions = [
  {
    label: '前端框架',
    value: 'frontend-frameworks',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: \`框架 \${idx + 1}\`,
      value: \`framework-\${idx + 1}\`,
    })),
  },
  {
    label: '后端语言',
    value: 'backend-languages',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: \`语言 \${idx + 1}\`,
      value: \`language-\${idx + 1}\`,
    })),
  },
  {
    label: '数据库',
    value: 'databases',
    children: Array.from({ length: 50 }, (_, idx) => ({
      label: \`数据库 \${idx + 1}\`,
      value: \`database-\${idx + 1}\`,
    })),
  },
]

const customValue = ref('')
<\/script>`

const customConfigCode = `<template>
  <ui-virtual-select
    v-model="customValue"
    :options="largeOptions"
    placeholder="自定义配置"
    filterable
    clearable
    :virtual-scroll="{
      itemHeight: 40,
      buffer: 10,
      threshold: 50,
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

// 创建一个含有大量选项的数组
const largeOptions = Array.from({ length: 10000 }, (_, index) => ({
  label: \`选项 \${index + 1}\`,
  value: String(index + 1),
}))

const customValue = ref('')
<\/script>`

const disabledVirtualCode = `<template>
  <ui-virtual-select
    v-model="customValue"
    :options="limitedOptions"
    placeholder="禁用虚拟滚动"
    filterable
    clearable
    :virtual-scroll="{
      enabled: false,
      itemHeight: 36,
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

// 创建一个有限数量的选项数组
const limitedOptions = Array.from({ length: 100 }, (_, index) => ({
  label: \`选项 \${index + 1}\`,
  value: String(index + 1),
}))

const customValue = ref('')
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      VirtualSelect 虚拟化选择器
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      虚拟化选择器组件使用虚拟滚动技术，可以高效地渲染大量选项数据，适用于下拉选项非常多的场景。
    </p>

    <!-- 虚拟滚动技术说明 -->
    <ui-demo
      title="虚拟滚动技术"
      description="虚拟滚动技术的优势与实现原理"
      :show-code="false"
    >
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <p class="mb-3 text-gray-600 dark:text-gray-400">
          本组件使用<strong>虚拟滚动技术</strong>高效渲染大量选项数据。即使有 {{ largeDataCount.toLocaleString() }} 个选项，也只会渲染可见区域和少量缓冲区的DOM元素，而不是全部创建，大大提高性能。
        </p>

        <div class="rounded bg-green-50 p-3 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <div class="flex items-start">
            <ui-icon icon="carbon:checkmark-filled" class="mr-2 mt-1 flex-shrink-0" />
            <div>
              <p class="font-medium">
                优化实现原理：
              </p>
              <ul class="ml-2 mt-1 list-disc list-inside space-y-1">
                <li>只渲染可视区域内的选项和少量缓冲区选项</li>
                <li>滚动时动态更新视图，保持可见选项数量恒定</li>
                <li>减少了DOM节点数量，提高了内存使用效率</li>
                <li>采用高效的重用机制，避免频繁创建DOM元素</li>
                <li>多选模式下选择一个选项后保持下拉框开启状态</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法 - 大数据量"
      description="虚拟化选择器处理10,000个选项时依然保持高性能。"
      :code="basicCode"
    >
      <div class="mb-4">
        <ui-virtual-select
          v-model="singleValue"
          :options="largeOptions"
          placeholder="请从10,000个选项中选择"
          filterable
          clearable
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        当前选中值: {{ singleValue || '未选择' }}
      </div>

      <div class="mt-4 rounded bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        <ui-icon icon="carbon:information" class="mr-1 inline-block" />
        滚动此下拉列表时，仅渲染可见的少量选项，而不是全部{{ largeDataCount.toLocaleString() }}个，极大提升了性能。
      </div>
    </ui-demo>

    <!-- 多选模式 -->
    <ui-demo
      title="多选模式"
      description="多选模式下依然保持高性能，选择一项后不会自动关闭下拉框。"
      :code="multipleCode"
    >
      <div class="mb-4">
        <ui-virtual-select
          v-model="multipleValue"
          :options="largeOptions"
          multiple
          filterable
          clearable
          placeholder="请选择多个选项"
          collapse-tags
          :max-collapse-tag-count="2"
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        已选择 {{ multipleValue.length }} 项
      </div>
    </ui-demo>

    <!-- 分组数据 -->
    <ui-demo
      title="分组数据"
      description="支持分组数据显示，方便用户更好地浏览和选择数据。"
      :code="categoryCode"
    >
      <div class="mb-4">
        <ui-virtual-select
          v-model="customValue"
          :options="categoryOptions"
          placeholder="分组数据示例"
          filterable
          clearable
        />
      </div>
    </ui-demo>

    <!-- 自定义配置 -->
    <ui-demo
      title="自定义虚拟滚动配置"
      description="可以通过 virtual-scroll 属性自定义虚拟滚动的配置参数。"
      :code="customConfigCode"
    >
      <div class="mb-4">
        <ui-virtual-select
          v-model="customValue"
          :options="largeOptions"
          placeholder="自定义配置"
          filterable
          clearable
          :virtual-scroll="{
            itemHeight: 40,
            buffer: 10,
            threshold: 50,
          }"
        />
      </div>
    </ui-demo>

    <!-- 禁用虚拟滚动 -->
    <ui-demo
      title="禁用虚拟滚动"
      description="当选项数量较少时，可以禁用虚拟滚动功能。"
      :code="disabledVirtualCode"
    >
      <div class="mb-4">
        <ui-virtual-select
          v-model="customValue"
          :options="largeOptions.slice(0, 100)"
          placeholder="禁用虚拟滚动"
          filterable
          clearable
          :virtual-scroll="{
            enabled: false,
            itemHeight: 36,
          }"
        />
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <ui-demo
      title="API 参考"
      description="VirtualSelect 组件的属性、事件和方法。"
      :show-code="false"
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number | boolean | object | array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                options
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选项数据
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placeholder
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                占位文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                请选择
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                multiple
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否多选
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clearable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可清空
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                filterable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可搜索
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                collapseTags
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                多选时是否折叠标签
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                maxCollapseTagCount
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最多显示的标签数量
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                virtualScroll
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                虚拟滚动配置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                object
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                见下方说明
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        virtualScroll 配置项
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                enabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否启用虚拟滚动
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                itemHeight
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                每个选项的高度(px)
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                36
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                buffer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                缓冲区可见项数量
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                5
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                threshold
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开启虚拟滚动的最小选项数量
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选中值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选中值
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选中值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选中值
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                visible-change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                下拉框出现/隐藏时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clear
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击清空按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                focus
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                获得焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                event
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                blur
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                失去焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                event
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>
