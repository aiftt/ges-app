<script setup lang="ts" name="DemoSelect">
/**
 * Select 选择器组件演示
 * 创建日期: 2024-05-26
 * 作者: aiftt
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

// 尺寸数据
const sizes = ['small', 'default', 'large'] as const

// 大量选项数据
const manyOptions = Array.from({ length: 20 }).map((_, index) => ({
  label: `选项 ${index + 1}`,
  value: String(index + 1),
  disabled: index % 10 === 9, // 每10个禁用一个选项
}))
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
  </div>
</template>
