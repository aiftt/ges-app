<script setup lang="ts" name="DemoPagination">
/**
 * 分页组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基础分页配置
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)

// 处理分页变化
function handleChange(page: number, size: number) {
  console.warn('分页变更:', page, size)
}

// 自定义分页样式
const customColor = ref('#3B82F6')
const customCurrentPage = ref(1)
const customPageSize = ref(10)

// 简洁模式
const simpleCurrentPage = ref(1)
const simplePageSize = ref(10)

// 小尺寸模式
const smallCurrentPage = ref(1)
const smallPageSize = ref(10)

// 自定义布局
const layoutCurrentPage = ref(1)
const layoutPageSize = ref(10)
const customLayout = ref(['prev', 'pager', 'next', 'jumper'])

// 带快速跳转
const jumperCurrentPage = ref(1)
const jumperPageSize = ref(10)

// 禁用状态
const disabledCurrentPage = ref(1)
const disabledPageSize = ref(10)

// 代码示例
const basicCode = `<ui-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  @change="handleChange"
/>

<script setup>
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)

function handleChange(page, size) {
  console.warn('分页变更:', page, size)
}
<\/script>`

const customColorCode = `<ui-pagination
  v-model:current-page="customCurrentPage"
  v-model:page-size="customPageSize"
  :total="total"
  :color="customColor"
/>

<div class="mt-2 flex items-center gap-2">
  <span>选择颜色:</span>
  <button
    v-for="color in ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']"
    :key="color"
    class="h-6 w-6 border rounded-full"
    :style="{ backgroundColor: color }"
    @click="customColor = color"
  />
</div>

<script setup>
const customColor = ref('#3B82F6')
const customCurrentPage = ref(1)
const customPageSize = ref(10)
const total = ref(150)
<\/script>`

const simpleCode = `<ui-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  simple
/>

<script setup>
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)
<\/script>`

const smallCode = `<ui-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  small
/>

<script setup>
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)
<\/script>`

const layoutCode = `<ui-pagination
  v-model:current-page="layoutCurrentPage"
  v-model:page-size="layoutPageSize"
  :total="total"
  :layout="customLayout"
/>

<div class="mt-2 flex flex-wrap gap-2">
  <button
    v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
    :key="item"
    class="border rounded px-2 py-1"
    :class="{
      'bg-blue-500 text-white': customLayout.includes(item),
      'bg-white text-gray-700': !customLayout.includes(item),
    }"
    @click="customLayout.includes(item)
      ? customLayout = customLayout.filter(i => i !== item)
      : customLayout.push(item)"
  >
    {{ item }}
  </button>
</div>

<script setup>
const layoutCurrentPage = ref(1)
const layoutPageSize = ref(10)
const total = ref(150)
const customLayout = ref(['prev', 'pager', 'next', 'jumper'])
<\/script>`

const jumperCode = `<ui-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  show-jumper
/>

<script setup>
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)
<\/script>`

const disabledCode = `<ui-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  disabled
/>

<script setup>
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(150)
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Pagination 分页
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      分页组件用于控制页面中数据的分页显示，提供分页导航、页码跳转和每页显示数量等功能。
    </p>

    <!-- 基础分页 -->
    <ui-demo
      title="基础用法"
      description="基础的分页导航，支持页码切换和页码变更事件。"
      :code="basicCode"
    >
      <ui-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @change="handleChange"
      />
      <p class="mt-2 text-gray-500">
        当前页: {{ currentPage }}, 每页条数: {{ pageSize }}
      </p>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="可以通过 color 属性自定义分页组件的主题色。"
      :code="customColorCode"
    >
      <ui-pagination
        v-model:current-page="customCurrentPage"
        v-model:page-size="customPageSize"
        :total="total"
        :color="customColor"
      />
      <div class="mt-2 flex items-center gap-2">
        <span>选择颜色:</span>
        <button
          v-for="color in ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']"
          :key="color"
          class="h-6 w-6 border rounded-full"
          :style="{ backgroundColor: color }"
          @click="customColor = color"
        />
      </div>
    </ui-demo>

    <!-- 简洁模式 -->
    <ui-demo
      title="简洁模式"
      description="设置 simple 属性可以使用简洁版的分页组件，只显示前进和后退按钮。"
      :code="simpleCode"
    >
      <ui-pagination
        v-model:current-page="simpleCurrentPage"
        v-model:page-size="simplePageSize"
        :total="total"
        simple
      />
    </ui-demo>

    <!-- 小尺寸模式 -->
    <ui-demo
      title="小尺寸"
      description="设置 small 属性可以使用小尺寸的分页组件，适用于空间有限的场景。"
      :code="smallCode"
    >
      <ui-pagination
        v-model:current-page="smallCurrentPage"
        v-model:page-size="smallPageSize"
        :total="total"
        small
      />
    </ui-demo>

    <!-- 自定义布局 -->
    <ui-demo
      title="自定义布局"
      description="通过 layout 属性自定义分页组件的布局，支持多种组合方式。"
      :code="layoutCode"
    >
      <ui-pagination
        v-model:current-page="layoutCurrentPage"
        v-model:page-size="layoutPageSize"
        :total="total"
        :layout="customLayout"
      />
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
          :key="item"
          class="border rounded px-2 py-1"
          :class="{
            'bg-blue-500 text-white': customLayout.includes(item),
            'bg-white text-gray-700': !customLayout.includes(item),
          }"
          @click="customLayout.includes(item)
            ? customLayout = customLayout.filter(i => i !== item)
            : customLayout.push(item)"
        >
          {{ item }}
        </button>
      </div>
    </ui-demo>

    <!-- 带快速跳转 -->
    <ui-demo
      title="带快速跳转"
      description="设置 show-jumper 属性可以显示跳转输入框，方便快速跳转到指定页码。"
      :code="jumperCode"
    >
      <ui-pagination
        v-model:current-page="jumperCurrentPage"
        v-model:page-size="jumperPageSize"
        :total="total"
        show-jumper
      />
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="设置 disabled 属性可以禁用整个分页组件，适用于加载中或无权限操作的场景。"
      :code="disabledCode"
    >
      <ui-pagination
        v-model:current-page="disabledCurrentPage"
        v-model:page-size="disabledPageSize"
        :total="total"
        disabled
      />
    </ui-demo>
  </div>
</template>
