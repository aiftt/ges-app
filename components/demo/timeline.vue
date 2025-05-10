<script setup lang="ts">
/**
 * 时间线组件演示
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
 */
import { ref } from 'vue'

// 垂直时间线数据
const timelineItems = [
  {
    label: '项目启动',
    content: '团队组建并确定项目范围',
    date: '2023-01-15',
    color: '#10b981',
    icon: 'carbon:rocket',
  },
  {
    label: '需求分析',
    content: '收集并整理用户需求，确定产品功能',
    date: '2023-02-20',
    color: '#6366f1',
    icon: 'carbon:document',
  },
  {
    label: '设计阶段',
    content: '完成UI/UX设计和数据库结构设计',
    date: '2023-03-15',
    color: '#f59e0b',
    icon: 'carbon:palette',
  },
  {
    label: '开发阶段',
    content: '前后端开发和功能实现',
    date: '2023-04-30',
    color: '#ef4444',
    icon: 'carbon:code',
  },
  {
    label: '测试与上线',
    content: '质量测试、用户验收测试和产品发布',
    date: '2023-06-10',
    color: '#8b5cf6',
    icon: 'carbon:checkmark',
  },
]

// 时间线控制参数
const direction = ref<'vertical' | 'horizontal'>('vertical')
const position = ref<'left' | 'right' | 'alternate'>('left')
const alternate = ref(false)
const reverse = ref(false)
const pending = ref(false)

// 切换方向
function toggleDirection() {
  direction.value = direction.value === 'vertical' ? 'horizontal' : 'vertical'
}

// 切换位置
function togglePosition() {
  const positions: Array<'left' | 'right' | 'alternate'> = ['left', 'right', 'alternate']
  const currentIndex = positions.indexOf(position.value)
  position.value = positions[(currentIndex + 1) % positions.length]
}

// 切换交替模式
function toggleAlternate() {
  alternate.value = !alternate.value
}

// 切换反向模式
function toggleReverse() {
  reverse.value = !reverse.value
}

// 切换连接线样式
function togglePending() {
  pending.value = !pending.value
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-xl font-bold">
      Timeline 时间线
    </h2>

    <!-- 控制面板 -->
    <div class="mb-6 flex flex-wrap gap-3">
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': direction === 'horizontal' }"
        @click="toggleDirection"
      >
        方向: {{ direction }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': position !== 'left' }"
        @click="togglePosition"
      >
        位置: {{ position }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': alternate }"
        @click="toggleAlternate"
      >
        交替模式: {{ alternate ? '开' : '关' }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': reverse }"
        @click="toggleReverse"
      >
        反向顺序: {{ reverse ? '开' : '关' }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': pending }"
        @click="togglePending"
      >
        待处理: {{ pending ? '开' : '关' }}
      </button>
    </div>

    <!-- 基础时间线 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        基础时间线
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-timeline
          :direction="direction"
          :position="position"
          :alternate="alternate"
          :reverse="reverse"
          :pending="pending"
        >
          <ui-timeline-item
            v-for="(item, index) in timelineItems"
            :key="index"
            :label="item.label"
          >
            <div class="mt-1 text-sm text-gray-500">
              {{ item.content }}
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        基础时间线组件，支持垂直和水平两种方向，以及左侧、右侧和交替三种位置模式。
      </p>
    </section>

    <!-- 自定义样式时间线 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式时间线
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-timeline>
          <ui-timeline-item
            v-for="(item, index) in timelineItems"
            :key="index"
            :color="item.color"
            :icon="item.icon"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500">{{ item.content }}</span>
              <span class="mt-2 text-xs text-gray-400">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        自定义图标、颜色和内容的时间线，可以为每个节点设置不同的样式。
      </p>
    </section>

    <!-- 右侧时间线 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        右侧时间线
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-timeline position="right">
          <ui-timeline-item
            v-for="(item, index) in timelineItems.slice(0, 3)"
            :key="index"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        右侧时间线示例，内容显示在时间线的左侧。
      </p>
    </section>

    <!-- 交替时间线 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        交替时间线
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-timeline position="alternate" color="#6366f1">
          <ui-timeline-item
            v-for="(item, index) in timelineItems"
            :key="index"
            :hollow="index % 2 === 0"
          >
            <div class="max-w-md flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500">{{ item.content }}</span>
              <span class="mt-2 text-xs text-gray-400">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        交替时间线示例，内容交替显示在时间线的两侧，部分节点使用空心样式。
      </p>
    </section>

    <!-- 水平时间线 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        水平时间线
      </h3>
      <div class="overflow-x-auto border border-gray-200 rounded-lg p-6">
        <ui-timeline direction="horizontal">
          <ui-timeline-item
            v-for="(item, index) in timelineItems.slice(0, 4)"
            :key="index"
            :color="item.color"
            :icon="item.icon"
          >
            <div class="max-w-xs flex flex-col items-center text-center">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        水平方向的时间线示例，适合展示流程步骤。
      </p>
    </section>

    <!-- 时间线使用示例：项目里程碑 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        项目里程碑时间线
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-timeline>
          <ui-timeline-item
            color="#10b981"
            icon="carbon:checkmark-filled"
          >
            <div class="flex flex-col">
              <span class="font-medium">项目立项</span>
              <span class="mt-1 text-sm text-gray-500">完成项目立项和预算审批</span>
              <span class="mt-2 text-xs text-gray-400">2023-01-10</span>
            </div>
          </ui-timeline-item>
          <ui-timeline-item
            color="#10b981"
            icon="carbon:checkmark-filled"
          >
            <div class="flex flex-col">
              <span class="font-medium">需求确认</span>
              <span class="mt-1 text-sm text-gray-500">完成需求调研和需求文档编写</span>
              <span class="mt-2 text-xs text-gray-400">2023-02-15</span>
            </div>
          </ui-timeline-item>
          <ui-timeline-item
            color="#10b981"
            icon="carbon:checkmark-filled"
          >
            <div class="flex flex-col">
              <span class="font-medium">设计完成</span>
              <span class="mt-1 text-sm text-gray-500">完成UI设计和技术架构设计</span>
              <span class="mt-2 text-xs text-gray-400">2023-03-20</span>
            </div>
          </ui-timeline-item>
          <ui-timeline-item
            color="#f59e0b"
            icon="carbon:time"
          >
            <div class="flex flex-col">
              <span class="font-medium">开发阶段</span>
              <span class="mt-1 text-sm text-gray-500">进行中，完成度80%</span>
              <span class="mt-2 text-xs text-gray-400">2023-04-15 - 2023-06-30</span>
            </div>
          </ui-timeline-item>
          <ui-timeline-item
            color="#9ca3af"
            icon="carbon:calendar"
            hollow
          >
            <div class="flex flex-col">
              <span class="font-medium">测试阶段</span>
              <span class="mt-1 text-sm text-gray-500">计划中</span>
              <span class="mt-2 text-xs text-gray-400">2023-07-01 - 2023-07-31</span>
            </div>
          </ui-timeline-item>
          <ui-timeline-item
            color="#9ca3af"
            icon="carbon:calendar"
            hollow
          >
            <div class="flex flex-col">
              <span class="font-medium">项目上线</span>
              <span class="mt-1 text-sm text-gray-500">计划中</span>
              <span class="mt-2 text-xs text-gray-400">2023-08-15</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        项目里程碑时间线示例，使用不同颜色和图标表示不同状态。
      </p>
    </section>
  </div>
</template>
