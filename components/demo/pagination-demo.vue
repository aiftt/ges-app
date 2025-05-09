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
  currentPage.value = page
  pageSize.value = size
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
  <div>
    <h2 class="mb-6 text-xl font-bold">
      分页组件 Pagination
    </h2>

    <!-- 基础分页 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        基础分页
      </h3>
      <ui-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @change="handleChange"
      />
      <div class="mt-4 border border-gray-200 rounded bg-gray-50 p-4 text-gray-700">
        <p>
          <strong>当前状态：</strong> 第 {{ currentPage }} 页，每页 {{ pageSize }} 条，共 {{ total }} 条
        </p>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        小尺寸
      </h3>
      <ui-pagination
        :total="150"
        :current-page="smallCurrentPage"
        :page-size="smallPageSize"
        small
        @change="(page, size) => { smallCurrentPage = page; smallPageSize = size }"
      />
    </section>

    <!-- 简洁模式 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        简洁模式
      </h3>
      <ui-pagination
        :total="150"
        :current-page="simpleCurrentPage"
        :page-size="simplePageSize"
        simple
        @change="(page, size) => { simpleCurrentPage = page; simplePageSize = size }"
      />
    </section>

    <!-- 自定义布局 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        自定义布局
      </h3>
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
          :key="item"
          class="border rounded px-2 py-1 transition-colors"
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
      <ui-pagination
        :total="150"
        :current-page="layoutCurrentPage"
        :page-size="layoutPageSize"
        :layout="customLayout"
        @change="(page, size) => { layoutCurrentPage = page; layoutPageSize = size }"
      />
      <div class="mt-4 border border-gray-200 rounded bg-gray-50 p-4 text-gray-700">
        <p>
          <strong>当前布局：</strong> {{ customLayout.join(' → ') }}
        </p>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        自定义颜色
      </h3>
      <div class="mb-4">
        <input
          v-model="customColor"
          type="color"
          class="border rounded p-1"
        >
      </div>
      <ui-pagination
        :total="150"
        :current-page="customCurrentPage"
        :page-size="customPageSize"
        :color="customColor"
        @change="(page, size) => { customCurrentPage = page; customPageSize = size }"
      />
    </section>

    <!-- 跳转页面 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        页码跳转
      </h3>
      <ui-pagination
        :total="150"
        :current-page="jumperCurrentPage"
        :page-size="jumperPageSize"
        show-jumper
        @change="(page, size) => { jumperCurrentPage = page; jumperPageSize = size }"
      />
    </section>

    <!-- 禁用状态 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        禁用状态
      </h3>
      <ui-pagination
        :total="150"
        :current-page="disabledCurrentPage"
        :page-size="disabledPageSize"
        disabled
        @change="(page, size) => { disabledCurrentPage = page; disabledPageSize = size }"
      />
    </section>

    <!-- 集成表格示例 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        集成表格演示
      </h3>
      <p class="mb-4 text-gray-600">
        表格组件内置集成了分页组件，更多示例可查看 <a href="/demo/components?name=table" class="text-blue-500 hover:text-blue-700">Table 组件示例</a>。
      </p>
    </section>
  </div>
</template>
