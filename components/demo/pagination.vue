<script setup lang="ts">
/**
 * 分页组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
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
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      分页组件演示
    </h1>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础分页
      </h2>
      <ui-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @change="handleChange"
      />
      <p class="mt-2 text-gray-500">
        当前页: {{ currentPage }}, 每页条数: {{ pageSize }}
      </p>
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义颜色
      </h2>
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
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        简洁模式
      </h2>
      <ui-pagination
        v-model:current-page="simpleCurrentPage"
        v-model:page-size="simplePageSize"
        :total="total"
        simple
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        小尺寸模式
      </h2>
      <ui-pagination
        v-model:current-page="smallCurrentPage"
        v-model:page-size="smallPageSize"
        :total="total"
        small
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义布局
      </h2>
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
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带快速跳转
      </h2>
      <ui-pagination
        v-model:current-page="jumperCurrentPage"
        v-model:page-size="jumperPageSize"
        :total="total"
        show-jumper
      />
    </section>

    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        禁用状态
      </h2>
      <ui-pagination
        v-model:current-page="disabledCurrentPage"
        v-model:page-size="disabledPageSize"
        :total="total"
        disabled
      />
    </section>
  </div>
</template>
