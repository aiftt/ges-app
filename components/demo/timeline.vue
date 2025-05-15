<script setup lang="ts" name="DemoTimeline">
/**
 * 时间线组件演示
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
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

// 代码示例
const interactiveCode = `<div class="mb-6 flex flex-wrap gap-3">
  <ui-button @click="toggleDirection">
    方向: {{ direction }}
  </ui-button>
  <ui-button @click="togglePosition">
    位置: {{ position }}
  </ui-button>
  <ui-button @click="toggleAlternate">
    交替模式: {{ alternate ? '开' : '关' }}
  </ui-button>
  <ui-button @click="toggleReverse">
    反向顺序: {{ reverse ? '开' : '关' }}
  </ui-button>
  <ui-button @click="togglePending">
    待处理: {{ pending ? '开' : '关' }}
  </ui-button>
</div>

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

<script setup>
const direction = ref('vertical')
const position = ref('left')
const alternate = ref(false)
const reverse = ref(false)
const pending = ref(false)

// 切换方向
function toggleDirection() {
  direction.value = direction.value === 'vertical' ? 'horizontal' : 'vertical'
}

// 切换位置
function togglePosition() {
  const positions = ['left', 'right', 'alternate']
  const currentIndex = positions.indexOf(position.value)
  position.value = positions[(currentIndex + 1) % positions.length]
}

function toggleAlternate() {
  alternate.value = !alternate.value
}

function toggleReverse() {
  reverse.value = !reverse.value
}

function togglePending() {
  pending.value = !pending.value
}

// 数据
const timelineItems = [
  {
    label: '项目启动',
    content: '团队组建并确定项目范围',
  },
  {
    label: '需求分析',
    content: '收集并整理用户需求，确定产品功能',
  },
  // ... 更多项目
]
<\/script>`

const customStyleCode = `<ui-timeline>
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

<script setup>
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
  // ... 更多项目
]
<\/script>`

const rightPositionCode = `<ui-timeline position="right">
  <ui-timeline-item
    v-for="(item, index) in timelineItems.slice(0, 3)"
    :key="index"
  >
    <div class="flex flex-col">
      <span class="font-medium">{{ item.label }}</span>
      <span class="mt-1 text-sm text-gray-500">{{ item.date }}</span>
    </div>
  </ui-timeline-item>
</ui-timeline>`

const alternateCode = `<ui-timeline position="alternate">
  <ui-timeline-item
    v-for="(item, index) in timelineItems"
    :key="index"
    :color="item.color"
  >
    <template #dot>
      <div class="flex h-8 w-8 items-center justify-center rounded-full" :style="{ backgroundColor: item.color }">
        <ui-icon :icon="item.icon" class="text-white" />
      </div>
    </template>
    <div class="flex flex-col">
      <span class="font-medium">{{ item.label }}</span>
      <span class="mt-1 text-sm text-gray-500">{{ item.content }}</span>
    </div>
  </ui-timeline-item>
</ui-timeline>`

const horizontalCode = `<ui-timeline direction="horizontal">
  <ui-timeline-item
    v-for="(item, index) in timelineItems.slice(0, 4)"
    :key="index"
    :label="item.label"
    :color="item.color"
  >
    <div class="text-sm text-gray-500">
      {{ item.date }}
    </div>
  </ui-timeline-item>
</ui-timeline>`

const pendingCode = `<ui-timeline
  pending
  pending-dot-type="loading"
>
  <ui-timeline-item
    v-for="(item, index) in timelineItems.slice(0, 3)"
    :key="index"
    :label="item.label"
  >
    <div class="mt-1 text-sm text-gray-500">
      {{ item.content }}
    </div>
  </ui-timeline-item>
  <ui-timeline-item pending>
    <span class="text-gray-400">正在进行中...</span>
  </ui-timeline-item>
</ui-timeline>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Timeline 时间线
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      Timeline 时间线组件用于垂直或水平展示时间流信息，可自定义节点样式、位置和方向。
    </p>

    <!-- 交互式时间线 -->
    <ui-demo
      title="交互式时间线"
      description="通过控制面板动态调整时间线的方向、位置、交替模式等属性。"
      :code="interactiveCode"
    >
      <div class="space-y-6">
        <div class="flex flex-wrap gap-3">
          <ui-button
            variant="outline"
            :class="{ 'bg-primary/10 border-primary': direction === 'horizontal' }"
            @click="toggleDirection"
          >
            方向: {{ direction }}
          </ui-button>
          <ui-button
            variant="outline"
            :class="{ 'bg-primary/10 border-primary': position !== 'left' }"
            @click="togglePosition"
          >
            位置: {{ position }}
          </ui-button>
          <ui-button
            variant="outline"
            :class="{ 'bg-primary/10 border-primary': alternate }"
            @click="toggleAlternate"
          >
            交替模式: {{ alternate ? '开' : '关' }}
          </ui-button>
          <ui-button
            variant="outline"
            :class="{ 'bg-primary/10 border-primary': reverse }"
            @click="toggleReverse"
          >
            反向顺序: {{ reverse ? '开' : '关' }}
          </ui-button>
          <ui-button
            variant="outline"
            :class="{ 'bg-primary/10 border-primary': pending }"
            @click="togglePending"
          >
            待处理: {{ pending ? '开' : '关' }}
          </ui-button>
        </div>

        <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
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
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.content }}
              </div>
            </ui-timeline-item>
          </ui-timeline>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义样式时间线 -->
    <ui-demo
      title="自定义样式时间线"
      description="自定义图标、颜色和内容的时间线，可以为每个节点设置不同的样式。"
      :code="customStyleCode"
    >
      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-timeline>
          <ui-timeline-item
            v-for="(item, index) in timelineItems"
            :key="index"
            :color="item.color"
            :icon="item.icon"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ item.content }}</span>
              <span class="mt-2 text-xs text-gray-400 dark:text-gray-500">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
    </ui-demo>

    <!-- 右侧时间线 -->
    <ui-demo
      title="右侧时间线"
      description="通过设置 position='right' 可以将时间线位置调整到右侧。"
      :code="rightPositionCode"
    >
      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-timeline position="right">
          <ui-timeline-item
            v-for="(item, index) in timelineItems.slice(0, 3)"
            :key="index"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ item.date }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
    </ui-demo>

    <!-- 交替时间线 -->
    <ui-demo
      title="交替时间线"
      description="通过设置 position='alternate' 可以让时间线节点在左右两侧交替显示。"
      :code="alternateCode"
    >
      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-timeline position="alternate">
          <ui-timeline-item
            v-for="(item, index) in timelineItems"
            :key="index"
            :color="item.color"
          >
            <template #dot>
              <div class="h-8 w-8 flex items-center justify-center rounded-full" :style="{ backgroundColor: item.color }">
                <ui-icon :icon="item.icon" class="text-white" />
              </div>
            </template>
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ item.content }}</span>
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
    </ui-demo>

    <!-- 水平时间线 -->
    <ui-demo
      title="水平时间线"
      description="通过设置 direction='horizontal' 可以创建水平方向的时间线。"
      :code="horizontalCode"
    >
      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-timeline direction="horizontal">
          <ui-timeline-item
            v-for="(item, index) in timelineItems.slice(0, 4)"
            :key="index"
            :label="item.label"
            :color="item.color"
          >
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ item.date }}
            </div>
          </ui-timeline-item>
        </ui-timeline>
      </div>
    </ui-demo>

    <!-- 待处理时间线 -->
    <ui-demo
      title="待处理时间线"
      description="通过 pending 属性可以设置时间线的待处理状态，最后一个节点会显示为进行中。"
      :code="pendingCode"
    >
      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-timeline
          pending
          pending-dot-type="loading"
        >
          <ui-timeline-item
            v-for="(item, index) in timelineItems.slice(0, 3)"
            :key="index"
            :label="item.label"
          >
            <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.content }}
            </div>
          </ui-timeline-item>
          <ui-timeline-item pending>
            <span class="text-gray-400 dark:text-gray-500">正在进行中...</span>
          </ui-timeline-item>
        </ui-timeline>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        Timeline Props
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
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
                direction
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                时间线方向
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'vertical' | 'horizontal'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'vertical'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                position
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                时间线位置
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left' | 'right' | 'alternate'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                alternate
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否交替显示内容
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                reverse
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否反向显示
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                pending
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否展示幽灵节点
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        TimelineItem Props
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
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
                label
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点标签
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
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点颜色
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
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                节点图标
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
                pending
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否为幽灵节点
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        TimelineItem Slots
      </h3>
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
                节点内容
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                dot
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义节点
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                label
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义标签内容
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
