<script setup lang="ts" name="DemoAutoAnimate">
/**
 * 动画效果演示组件
 * 创建日期: 2025-04-29
 * 作者: aiftt
 * 更新日期: 2025-04-29 - 初始版本，实现基础动画效果展示
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
</script>

<template>
  <div class="demo-animation">
    <h1 class="demo-animation__title">
      Auto Animate 动画效果演示
    </h1>

    <div class="demo-animation__section">
      <h2 class="demo-animation__subtitle">
        列表项动画
      </h2>
      <p class="demo-animation__description">
        当列表项添加、删除或重排序时自动应用平滑过渡动画。
      </p>

      <div class="demo-animation__controls">
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

      <ul v-auto-animate class="demo-animation__list">
        <li v-for="(item, index) in items" :key="item" class="demo-animation__item">
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </div>

    <div class="demo-animation__section">
      <h2 class="demo-animation__subtitle">
        卡片切换动画
      </h2>
      <p class="demo-animation__description">
        在卡片之间切换时应用平滑过渡动画。
      </p>

      <div class="demo-animation__controls">
        <ui-button @click="prevCard">
          上一张
        </ui-button>
        <ui-button @click="nextCard">
          下一张
        </ui-button>
      </div>

      <div v-auto-animate class="demo-animation__card-container">
        <div
          :key="activeCardIndex"
          class="demo-animation__card"
          :class="cards[activeCardIndex].color"
        >
          <h3 class="demo-animation__card-title">
            {{ cards[activeCardIndex].title }}
          </h3>
          <p class="demo-animation__card-content">
            {{ cards[activeCardIndex].content }}
          </p>
        </div>
      </div>
    </div>

    <div class="demo-animation__section">
      <h2 class="demo-animation__subtitle">
        表单字段动画
      </h2>
      <p class="demo-animation__description">
        根据条件显示或隐藏额外的表单字段，并应用平滑动画。
      </p>

      <div class="demo-animation__form">
        <div class="demo-animation__form-field">
          <label>姓名:</label>
          <input type="text" placeholder="请输入姓名">
        </div>
        <div class="demo-animation__form-field">
          <label>邮箱:</label>
          <input type="email" placeholder="请输入邮箱">
        </div>

        <div class="demo-animation__form-toggle">
          <label>
            <input v-model="showAdditionalFields" type="checkbox">
            显示更多字段
          </label>
        </div>

        <div v-auto-animate>
          <template v-if="showAdditionalFields">
            <div class="demo-animation__form-field">
              <label>电话:</label>
              <input type="tel" placeholder="请输入电话号码">
            </div>
            <div class="demo-animation__form-field">
              <label>地址:</label>
              <textarea placeholder="请输入地址" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="demo-animation__section">
      <h2 class="demo-animation__subtitle">
        折叠面板动画
      </h2>
      <p class="demo-animation__description">
        展开或折叠内容面板时应用平滑动画。
      </p>

      <div class="demo-animation__accordion">
        <div
          v-for="(section, index) in sections"
          :key="section.id"
          class="demo-animation__accordion-item"
        >
          <div
            class="demo-animation__accordion-header"
            @click="toggleSection(index)"
          >
            <h3>{{ section.title }}</h3>
            <span class="demo-animation__accordion-icon">
              {{ section.isOpen ? '▲' : '▼' }}
            </span>
          </div>
          <div v-auto-animate>
            <div
              v-if="section.isOpen"
              class="demo-animation__accordion-content"
            >
              {{ section.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-animation__section">
      <h2 class="demo-animation__subtitle">
        网格布局动画
      </h2>
      <p class="demo-animation__description">
        网格项目重新排列时应用平滑过渡动画。
      </p>

      <div class="demo-animation__controls">
        <ui-button @click="shuffleGrid">
          随机排序
        </ui-button>
      </div>

      <div v-auto-animate class="demo-animation__grid">
        <div
          v-for="item in gridItems"
          :key="item"
          class="demo-animation__grid-item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-animation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.demo-animation__title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--ui-color-primary);
}

.demo-animation__subtitle {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: var(--ui-color-text);
}

.demo-animation__description {
  margin-bottom: 1.5rem;
  color: var(--ui-color-text-secondary);
}

.demo-animation__section {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-animation__controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

/* 列表项动画样式 */
.demo-animation__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.demo-animation__item {
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--ui-color-bg-subtle);
  transition: background-color 0.3s;
}

.demo-animation__item:hover {
  background-color: var(--ui-color-bg-hover);
}

/* 卡片切换动画样式 */
.demo-animation__card-container {
  position: relative;
  height: 200px;
  margin-top: 1.5rem;
}

.demo-animation__card {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.demo-animation__card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.demo-animation__card-content {
  line-height: 1.5;
}

/* 表单字段动画样式 */
.demo-animation__form {
  margin-top: 1.5rem;
}

.demo-animation__form-field {
  margin-bottom: 1rem;
}

.demo-animation__form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.demo-animation__form-field input,
.demo-animation__form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--ui-color-border);
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: var(--ui-color-bg-input);
}

.demo-animation__form-toggle {
  margin: 1.5rem 0;
}

/* 折叠面板动画样式 */
.demo-animation__accordion {
  margin-top: 1.5rem;
}

.demo-animation__accordion-item {
  margin-bottom: 1rem;
  border: 1px solid var(--ui-color-border);
  border-radius: 0.25rem;
  overflow: hidden;
}

.demo-animation__accordion-header {
  padding: 1rem;
  background-color: var(--ui-color-bg-subtle);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-animation__accordion-content {
  padding: 1rem;
  background-color: var(--ui-color-bg);
}

/* 网格布局动画样式 */
.demo-animation__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.demo-animation__grid-item {
  height: 80px;
  background-color: var(--ui-color-primary);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 0.25rem;
}

/* 暗色主题适配 */
:root.dark .demo-animation__section {
  background-color: var(--ui-color-bg-dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

:root.dark .demo-animation__item {
  background-color: var(--ui-color-bg-subtle-dark);
}

:root.dark .demo-animation__item:hover {
  background-color: var(--ui-color-bg-hover-dark);
}

:root.dark .demo-animation__form-field input,
:root.dark .demo-animation__form-field textarea {
  background-color: var(--ui-color-bg-input-dark);
  border-color: var(--ui-color-border-dark);
  color: var(--ui-color-text-dark);
}

:root.dark .demo-animation__accordion-header {
  background-color: var(--ui-color-bg-subtle-dark);
}

:root.dark .demo-animation__accordion-content {
  background-color: var(--ui-color-bg-dark);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .demo-animation__controls {
    flex-direction: column;
  }

  .demo-animation__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
