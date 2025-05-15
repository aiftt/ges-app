<script setup lang="ts" name="DemoAutoAnimate">
/**
 * 动画效果演示组件
 * 创建日期: 2025-04-29
 * 作者: aiftt
 * 更新日期: 2025-04-29 - 初始版本，实现基础动画效果展示
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 列表动画示例的数据
const items = ref([
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
])

// 添加新项目
function addItem() {
  const cities = ['成都', '重庆', '武汉', '西安', '南京', '天津', '苏州', '厦门', '长沙']
  const randomCity = cities[Math.floor(Math.random() * cities.length)]

  if (!items.value.includes(randomCity)) {
    // 随机位置插入
    const position = Math.floor(Math.random() * (items.value.length + 1))
    items.value.splice(position, 0, randomCity)
  }
  else {
    addItem() // 如果城市已存在，重新尝试
  }
}

// 移除随机项目
function removeItem() {
  if (items.value.length > 1) {
    const index = Math.floor(Math.random() * items.value.length)
    items.value.splice(index, 1)
  }
}

// 随机排序项目
function shuffleItems() {
  items.value = [...items.value].sort(() => Math.random() - 0.5)
}

// 卡片切换示例
const cards = [
  { id: 1, title: '卡片 1', content: '这是第一张卡片的内容。', color: 'bg-blue-500' },
  { id: 2, title: '卡片 2', content: '这是第二张卡片的内容，它比第一张更长一些。', color: 'bg-green-500' },
  { id: 3, title: '卡片 3', content: '这是第三张卡片，内容非常丰富，可以包含很多信息。', color: 'bg-purple-500' },
]

const activeCardIndex = ref(0)

function nextCard() {
  activeCardIndex.value = (activeCardIndex.value + 1) % cards.length
}

function prevCard() {
  activeCardIndex.value = (activeCardIndex.value - 1 + cards.length) % cards.length
}

// 表单字段展示/隐藏示例
const showAdditionalFields = ref(false)

// 给未使用的函数添加下划线前缀，符合项目规范
function _toggleAdditionalFields() {
  showAdditionalFields.value = !showAdditionalFields.value
}

// 手风琴/折叠面板示例
const sections = [
  { id: 1, title: '第一部分', content: '这是第一部分的内容', isOpen: true },
  { id: 2, title: '第二部分', content: '这是第二部分的内容，它比第一部分要详细一些', isOpen: false },
  { id: 3, title: '第三部分', content: '这是第三部分的内容，包含了更多的详细信息和说明', isOpen: false },
]

function toggleSection(index: number) {
  sections[index].isOpen = !sections[index].isOpen
}

// 交错动画演示
const gridItems = ref(Array.from({ length: 9 }, (_, i) => i + 1))

function shuffleGrid() {
  gridItems.value = [...gridItems.value].sort(() => Math.random() - 0.5)
}

// 代码示例
const listAnimationCode = `<template>
  <div class="controls">
    <ui-button type="primary" @click="addItem">添加城市</ui-button>
    <ui-button type="danger" @click="removeItem">删除城市</ui-button>
    <ui-button @click="shuffleItems">随机排序</ui-button>
  </div>

  <ul v-auto-animate class="list">
    <li v-for="(item, index) in items" :key="item" class="item">
      {{ index + 1 }}. {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const items = ref(['北京', '上海', '广州', '深圳', '杭州'])

function addItem() {
  const cities = ['成都', '重庆', '武汉', '西安', '南京']
  const randomCity = cities[Math.floor(Math.random() * cities.length)]

  if (!items.value.includes(randomCity)) {
    const position = Math.floor(Math.random() * (items.value.length + 1))
    items.value.splice(position, 0, randomCity)
  }
}

function removeItem() {
  if (items.value.length > 1) {
    const index = Math.floor(Math.random() * items.value.length)
    items.value.splice(index, 1)
  }
}

function shuffleItems() {
  items.value = [...items.value].sort(() => Math.random() - 0.5)
}
<\/script>`

const cardAnimationCode = `<template>
  <div class="controls">
    <ui-button @click="prevCard">上一张</ui-button>
    <ui-button @click="nextCard">下一张</ui-button>
  </div>

  <div v-auto-animate class="card-container">
    <div
      :key="activeCardIndex"
      class="card"
      :class="cards[activeCardIndex].color"
    >
      <h3 class="card-title">{{ cards[activeCardIndex].title }}</h3>
      <p class="card-content">{{ cards[activeCardIndex].content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = [
  { id: 1, title: '卡片 1', content: '这是第一张卡片的内容。', color: 'bg-blue-500' },
  { id: 2, title: '卡片 2', content: '这是第二张卡片的内容。', color: 'bg-green-500' },
  { id: 3, title: '卡片 3', content: '这是第三张卡片的内容。', color: 'bg-purple-500' },
]

const activeCardIndex = ref(0)

function nextCard() {
  activeCardIndex.value = (activeCardIndex.value + 1) % cards.length
}

function prevCard() {
  activeCardIndex.value = (activeCardIndex.value - 1 + cards.length) % cards.length
}
<\/script>`

const formAnimationCode = `<template>
  <div class="form">
    <div class="form-field">
      <label>姓名:</label>
      <input type="text" placeholder="请输入姓名">
    </div>
    <div class="form-field">
      <label>邮箱:</label>
      <input type="email" placeholder="请输入邮箱">
    </div>

    <div class="form-toggle">
      <label>
        <input v-model="showAdditionalFields" type="checkbox">
        显示更多字段
      </label>
    </div>

    <div v-auto-animate>
      <template v-if="showAdditionalFields">
        <div class="form-field">
          <label>电话:</label>
          <input type="tel" placeholder="请输入电话号码">
        </div>
        <div class="form-field">
          <label>地址:</label>
          <textarea placeholder="请输入地址" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAdditionalFields = ref(false)
<\/script>`

const accordionAnimationCode = `<template>
  <div class="accordion">
    <div
      v-for="(section, index) in sections"
      :key="section.id"
      class="accordion-item"
    >
      <div class="accordion-header" @click="toggleSection(index)">
        <h3>{{ section.title }}</h3>
        <span class="accordion-icon">{{ section.isOpen ? '▲' : '▼' }}</span>
      </div>
      <div v-auto-animate>
        <div v-if="section.isOpen" class="accordion-content">
          {{ section.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sections = [
  { id: 1, title: '第一部分', content: '这是第一部分的内容', isOpen: true },
  { id: 2, title: '第二部分', content: '这是第二部分的内容', isOpen: false },
  { id: 3, title: '第三部分', content: '这是第三部分的内容', isOpen: false },
]

function toggleSection(index) {
  sections[index].isOpen = !sections[index].isOpen
}
<\/script>`

const gridAnimationCode = `<template>
  <div class="controls">
    <ui-button @click="shuffleGrid">随机排序</ui-button>
  </div>

  <div v-auto-animate class="grid">
    <div
      v-for="item in gridItems"
      :key="item"
      class="grid-item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gridItems = ref(Array.from({ length: 9 }, (_, i) => i + 1))

function shuffleGrid() {
  gridItems.value = [...gridItems.value].sort(() => Math.random() - 0.5)
}
<\/script>`
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      Auto Animate 动画效果演示
    </h1>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      基于 FormKit 的 Auto Animate 库，提供简单易用的自动化动画效果，无需编写复杂的动画代码。
    </p>

    <!-- 列表项动画 -->
    <ui-demo
      title="列表项动画"
      description="当列表项添加、删除或重排序时自动应用平滑过渡动画。"
      :code="listAnimationCode"
    >
      <div class="mb-4 flex flex-wrap gap-2">
        <ui-button type="primary" @click="addItem">
          添加城市
        </ui-button>
        <ui-button type="danger" @click="removeItem">
          删除城市
        </ui-button>
        <ui-button @click="shuffleItems">
          随机排序
        </ui-button>
      </div>

      <ul v-auto-animate class="border border-gray-200 rounded-lg bg-white p-0 dark:border-gray-700 dark:bg-gray-800">
        <li
          v-for="(item, index) in items"
          :key="item"
          class="border-b border-gray-200 px-4 py-3 last:border-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </ui-demo>

    <!-- 卡片切换动画 -->
    <ui-demo
      title="卡片切换动画"
      description="在卡片之间切换时应用平滑过渡动画。"
      :code="cardAnimationCode"
    >
      <div class="mb-4 flex gap-2">
        <ui-button @click="prevCard">
          上一张
        </ui-button>
        <ui-button @click="nextCard">
          下一张
        </ui-button>
      </div>

      <div v-auto-animate class="h-48 w-full">
        <div
          :key="activeCardIndex"
          class="h-full w-full rounded-lg p-6 text-white"
          :class="cards[activeCardIndex].color"
        >
          <h3 class="mb-4 text-xl font-semibold">
            {{ cards[activeCardIndex].title }}
          </h3>
          <p>
            {{ cards[activeCardIndex].content }}
          </p>
        </div>
      </div>
    </ui-demo>

    <!-- 表单字段动画 -->
    <ui-demo
      title="表单字段动画"
      description="根据条件显示或隐藏额外的表单字段，并应用平滑动画。"
      :code="formAnimationCode"
    >
      <div class="border border-gray-200 rounded-lg bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4">
          <label class="mb-1 block font-medium">姓名:</label>
          <input
            type="text"
            placeholder="请输入姓名"
            class="w-full border border-gray-300 rounded-md px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          >
        </div>
        <div class="mb-4">
          <label class="mb-1 block font-medium">邮箱:</label>
          <input
            type="email"
            placeholder="请输入邮箱"
            class="w-full border border-gray-300 rounded-md px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          >
        </div>

        <div class="mb-4">
          <label class="flex items-center">
            <input v-model="showAdditionalFields" type="checkbox" class="mr-2">
            显示更多字段
          </label>
        </div>

        <div v-auto-animate>
          <template v-if="showAdditionalFields">
            <div class="mb-4">
              <label class="mb-1 block font-medium">电话:</label>
              <input
                type="tel"
                placeholder="请输入电话号码"
                class="w-full border border-gray-300 rounded-md px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              >
            </div>
            <div class="mb-4">
              <label class="mb-1 block font-medium">地址:</label>
              <textarea
                placeholder="请输入地址"
                class="w-full border border-gray-300 rounded-md px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </template>
        </div>
      </div>
    </ui-demo>

    <!-- 折叠面板动画 -->
    <ui-demo
      title="折叠面板动画"
      description="展开或折叠内容面板时应用平滑动画。"
      :code="accordionAnimationCode"
    >
      <div class="border border-gray-200 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800">
        <div
          v-for="(section, index) in sections"
          :key="section.id"
          class="border-b border-gray-200 last:border-0 dark:border-gray-700"
        >
          <div
            class="flex cursor-pointer items-center justify-between bg-gray-50 px-4 py-3 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            @click="toggleSection(index)"
          >
            <h3 class="font-medium">
              {{ section.title }}
            </h3>
            <span class="text-sm">
              {{ section.isOpen ? '▲' : '▼' }}
            </span>
          </div>
          <div v-auto-animate>
            <div
              v-if="section.isOpen"
              class="p-4"
            >
              {{ section.content }}
            </div>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 网格布局动画 -->
    <ui-demo
      title="网格布局动画"
      description="网格项目重新排列时应用平滑过渡动画。"
      :code="gridAnimationCode"
    >
      <div class="mb-4">
        <ui-button @click="shuffleGrid">
          随机排序
        </ui-button>
      </div>

      <div v-auto-animate class="grid grid-cols-3 gap-4 sm:grid-cols-3">
        <div
          v-for="item in gridItems"
          :key="item"
          class="h-20 flex items-center justify-center rounded-lg bg-blue-500 text-xl text-white font-bold"
        >
          {{ item }}
        </div>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
/* 响应式调整 */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
