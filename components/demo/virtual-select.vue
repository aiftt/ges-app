<script setup lang="ts" name="DemoVirtualSelect">
/**
 * 虚拟化选择器演示组件
 * 创建日期: 2024-09-01
 * 作者: aiftt
 * 更新日期: 2024-09-01 - 首次实现
 * 更新日期: 2024-09-02 - 更新演示说明，强调虚拟滚动优势
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
</script>

<template>
  <div class="space-y-10">
    <!-- 虚拟滚动技术说明 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        虚拟滚动技术
      </h3>
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
    </section>

    <!-- 基础用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础用法 - 大数据量
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        虚拟化选择器处理{{ largeDataCount.toLocaleString() }}个选项时依然保持高性能。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 多选模式 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        多选模式
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        多选模式下依然保持高性能，选择一项后不会自动关闭下拉框。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 分组数据 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        分组数据
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持分组数据显示。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4">
          <ui-virtual-select
            v-model="customValue"
            :options="categoryOptions"
            placeholder="分组数据示例"
            filterable
            clearable
          />
        </div>
      </div>
    </section>

    <!-- 自定义配置 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义虚拟滚动配置
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以自定义虚拟滚动的配置参数。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 禁用虚拟滚动 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        禁用虚拟滚动
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以禁用虚拟滚动，适用于选项较少的情况。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>
  </div>
</template>
