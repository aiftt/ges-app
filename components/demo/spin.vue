<script setup lang="ts">
/**
 * 旋转加载组件演示
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 */
import { ref } from 'vue'

// 控制包裹元素的加载状态
const cardLoading = ref(true)
const tableLoading = ref(true)

// 延迟显示的加载
const delayLoading = ref(false)

// 自定义颜色
const customColor = ref('#3b82f6')

// 切换加载状态
function toggleCardLoading() {
  cardLoading.value = !cardLoading.value
}

function toggleTableLoading() {
  tableLoading.value = !tableLoading.value
}

// 模拟加载延迟数据
function loadData() {
  delayLoading.value = true
  setTimeout(() => {
    delayLoading.value = false
  }, 3000)
}

// 模拟表格数据
const tableData = [
  { id: 1, name: '用户1', age: 28, address: '地址1' },
  { id: 2, name: '用户2', age: 32, address: '地址2' },
  { id: 3, name: '用户3', age: 24, address: '地址3' },
]
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      旋转加载组件演示
    </h1>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>
      <div class="flex flex-wrap gap-8">
        <ui-spin />
        <ui-spin type="dot" />
        <ui-spin type="pulse" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同尺寸
      </h2>
      <div class="flex flex-wrap items-center gap-8">
        <ui-spin size="small" />
        <ui-spin />
        <ui-spin size="large" />
      </div>
    </section>

    <!-- 带提示文字 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带提示文字
      </h2>
      <div class="flex flex-wrap gap-8">
        <ui-spin tip="加载中..." />
        <ui-spin type="dot" tip="请稍候..." />
        <ui-spin type="pulse" tip="处理中..." />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义颜色
      </h2>
      <div class="flex flex-wrap gap-8">
        <ui-spin color="#10b981" tip="成功" />
        <ui-spin type="dot" color="#f59e0b" tip="警告" />
        <ui-spin type="pulse" color="#ef4444" tip="错误" />
      </div>
      <div class="mt-4 flex items-center gap-2">
        <span>选择颜色:</span>
        <button
          v-for="color in ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']"
          :key="color"
          class="h-6 w-6 cursor-pointer border rounded-full"
          :style="{ backgroundColor: color }"
          @click="customColor = color"
        />
        <ui-spin :color="customColor" class="ml-4" />
      </div>
    </section>

    <!-- 延迟显示 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        延迟显示
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <ui-spin :spinning="delayLoading" :delay="500" tip="延迟500ms" />
        <ui-button type="primary" @click="loadData">
          点击加载(3秒)
        </ui-button>
      </div>
    </section>

    <!-- 包裹元素 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        包裹元素 - 卡片
      </h2>
      <div class="mb-4 flex flex-wrap gap-4">
        <ui-button type="primary" @click="toggleCardLoading">
          {{ cardLoading ? '停止加载' : '开始加载' }}
        </ui-button>
      </div>
      <ui-spin :spinning="cardLoading" tip="加载中...">
        <div class="min-h-[200px] w-full border rounded-md p-4">
          <h3 class="mb-2 text-lg font-medium">
            卡片标题
          </h3>
          <p>这是一个被包裹的卡片内容，当加载状态开启时会显示加载中的状态</p>
          <p class="mt-2">
            可以通过上方按钮切换加载状态
          </p>
        </div>
      </ui-spin>
    </section>

    <!-- 包裹表格 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        包裹元素 - 表格
      </h2>
      <div class="mb-4 flex flex-wrap gap-4">
        <ui-button type="primary" @click="toggleTableLoading">
          {{ tableLoading ? '停止加载' : '开始加载' }}
        </ui-button>
      </div>
      <ui-spin :spinning="tableLoading" tip="加载数据中...">
        <table class="min-w-full border-collapse border">
          <thead>
            <tr>
              <th class="border p-2">
                ID
              </th>
              <th class="border p-2">
                姓名
              </th>
              <th class="border p-2">
                年龄
              </th>
              <th class="border p-2">
                地址
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td class="border p-2">
                {{ item.id }}
              </td>
              <td class="border p-2">
                {{ item.name }}
              </td>
              <td class="border p-2">
                {{ item.age }}
              </td>
              <td class="border p-2">
                {{ item.address }}
              </td>
            </tr>
          </tbody>
        </table>
      </ui-spin>
    </section>
  </div>
</template>
