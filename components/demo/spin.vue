<script setup lang="ts" name="DemoSpin">
/**
 * 旋转加载组件演示
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
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

// 代码示例
const basicCode = `<ui-spin />
<ui-spin type="dot" />
<ui-spin type="pulse" />`

const sizeCode = `<ui-spin size="small" />
<ui-spin />
<ui-spin size="large" />`

const tipCode = `<ui-spin tip="加载中..." />
<ui-spin type="dot" tip="请稍候..." />
<ui-spin type="pulse" tip="处理中..." />`

const colorCode = `<ui-spin color="#10b981" tip="成功" />
<ui-spin type="dot" color="#f59e0b" tip="警告" />
<ui-spin type="pulse" color="#ef4444" tip="错误" />

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

<script setup>
const customColor = ref('#3b82f6')
<\/script>`

const delayCode = `<ui-spin :spinning="delayLoading" :delay="500" tip="延迟500ms" />
<ui-button type="primary" @click="loadData">
  点击加载(3秒)
</ui-button>

<script setup>
const delayLoading = ref(false)

function loadData() {
  delayLoading.value = true
  setTimeout(() => {
    delayLoading.value = false
  }, 3000)
}
<\/script>`

const wrapCardCode = `<ui-button type="primary" @click="toggleCardLoading">
  {{ cardLoading ? '停止加载' : '开始加载' }}
</ui-button>

<ui-spin :spinning="cardLoading" tip="加载中...">
  <div class="min-h-[200px] w-full border rounded-md p-4">
    <h3 class="mb-2 text-lg font-medium">卡片标题</h3>
    <p>这是一个被包裹的卡片内容，当加载状态开启时会显示加载中的状态</p>
    <p class="mt-2">可以通过上方按钮切换加载状态</p>
  </div>
</ui-spin>

<script setup>
const cardLoading = ref(true)

function toggleCardLoading() {
  cardLoading.value = !cardLoading.value
}
<\/script>`

const wrapTableCode = `<ui-button type="primary" @click="toggleTableLoading">
  {{ tableLoading ? '停止加载' : '开始加载' }}
</ui-button>

<ui-spin :spinning="tableLoading" tip="加载数据中...">
  <table class="min-w-full border-collapse border">
    <thead>
      <tr>
        <th class="border p-2">ID</th>
        <th class="border p-2">姓名</th>
        <th class="border p-2">年龄</th>
        <th class="border p-2">地址</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.id">
        <td class="border p-2">{{ item.id }}</td>
        <td class="border p-2">{{ item.name }}</td>
        <td class="border p-2">{{ item.age }}</td>
        <td class="border p-2">{{ item.address }}</td>
      </tr>
    </tbody>
  </table>
</ui-spin>

<script setup>
const tableLoading = ref(true)
const tableData = [
  { id: 1, name: '用户1', age: 28, address: '地址1' },
  { id: 2, name: '用户2', age: 32, address: '地址2' },
  { id: 3, name: '用户3', age: 24, address: '地址3' },
]

function toggleTableLoading() {
  tableLoading.value = !tableLoading.value
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Spin 加载中
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于页面和区块的加载中状态，提供多种类型、大小和自定义选项。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的加载组件，有三种类型：默认、点状和脉冲。"
      :code="basicCode"
    >
      <div class="flex flex-wrap gap-8">
        <ui-spin />
        <ui-spin type="dot" />
        <ui-spin type="pulse" />
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种尺寸：小、默认和大。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap items-center gap-8">
        <ui-spin size="small" />
        <ui-spin />
        <ui-spin size="large" />
      </div>
    </ui-demo>

    <!-- 带提示文字 -->
    <ui-demo
      title="带提示文字"
      description="可以添加提示文字，告知用户当前状态。"
      :code="tipCode"
    >
      <div class="flex flex-wrap gap-8">
        <ui-spin tip="加载中..." />
        <ui-spin type="dot" tip="请稍候..." />
        <ui-spin type="pulse" tip="处理中..." />
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="通过color属性自定义加载图标的颜色。"
      :code="colorCode"
    >
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
    </ui-demo>

    <!-- 延迟显示 -->
    <ui-demo
      title="延迟显示"
      description="可以设置delay属性，延迟显示加载状态，避免闪烁。"
      :code="delayCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-spin :spinning="delayLoading" :delay="500" tip="延迟500ms" />
        <ui-button type="primary" @click="loadData">
          点击加载(3秒)
        </ui-button>
      </div>
    </ui-demo>

    <!-- 包裹元素 - 卡片 -->
    <ui-demo
      title="包裹元素 - 卡片"
      description="可以直接包裹内容，在加载过程中为容器添加加载动画。"
      :code="wrapCardCode"
    >
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
    </ui-demo>

    <!-- 包裹表格 -->
    <ui-demo
      title="包裹元素 - 表格"
      description="加载组件常用于表格数据加载场景，可以包裹表格内容。"
      :code="wrapTableCode"
    >
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
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <h4 class="mb-2 text-lg font-medium">
        属性
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                spinning
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否为加载中状态
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                true
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                组件大小
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' | 'default' | 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                tip
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                当作为包裹元素时的提示文字
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                delay
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                延迟显示加载效果的时间（毫秒）
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                主题颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                主题色
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                加载指示器类型
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default' | 'dot' | 'pulse'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 text-lg font-medium">
        插槽
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                名称
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                default
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                被包裹的内容
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                indicator
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义加载指示器
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
