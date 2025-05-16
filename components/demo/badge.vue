<script setup lang="ts" name="DemoBadge">
/**
 * Badge 徽章组件演示
 * 创建日期: 2024-06-20
 * 作者: aiftt
 * 更新日期: 2024-06-20 - 初始版本
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 管理计数器值
const count = ref(12)

// 增加计数
function increment() {
  count.value += 1
}

// 减少计数
function decrement() {
  if (count.value > 0) {
    count.value -= 1
  }
}

// 基础用法示例代码
const basicCode = `<script setup>
import { ref } from 'vue'

// 管理计数器值
const count = ref(12)

// 增加计数
function increment() {
  count.value += 1
}

// 减少计数
function decrement() {
  if (count.value > 0) {
    count.value -= 1
  }
}
<\/script>

<template>
  <ui-badge :value="5">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      默认
    </div>
  </ui-badge>

  <ui-badge :value="0">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      零值
    </div>
  </ui-badge>

  <ui-badge value="hot">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      文本
    </div>
  </ui-badge>

  <ui-badge :value="count">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      动态值
    </div>
  </ui-badge>

  <div class="flex items-center mt-4">
    <ui-button size="small" @click="decrement">-</ui-button>
    <span class="mx-2">{{ count }}</span>
    <ui-button size="small" @click="increment">+</ui-button>
  </div>
</template>`

// 最大值示例代码
const maxValueCode = `<ui-badge :value="99" :max="10">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    最大值 10
  </div>
</ui-badge>

<ui-badge :value="200" :max="99">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    最大值 99
  </div>
</ui-badge>

<ui-badge :value="1000" :max="999">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    最大值 999
  </div>
</ui-badge>`

// 徽章类型示例代码
const typeCode = `<ui-badge :value="5" type="primary">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    主要
  </div>
</ui-badge>

<ui-badge :value="5" type="success">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    成功
  </div>
</ui-badge>

<ui-badge :value="5" type="warning">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    警告
  </div>
</ui-badge>

<ui-badge :value="5" type="danger">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    危险
  </div>
</ui-badge>

<ui-badge :value="5" type="info">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    信息
  </div>
</ui-badge>`

// 小圆点示例代码
const dotCode = `<ui-badge is-dot>
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    默认
  </div>
</ui-badge>

<ui-badge is-dot type="primary">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    主要
  </div>
</ui-badge>

<ui-badge is-dot type="success">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    成功
  </div>
</ui-badge>

<ui-badge is-dot type="warning">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    警告
  </div>
</ui-badge>

<ui-badge is-dot type="info">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    信息
  </div>
</ui-badge>`

// 位置示例代码
const positionCode = `<ui-badge :value="5" position="top-right">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    右上角
  </div>
</ui-badge>

<ui-badge :value="5" position="top-left">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    左上角
  </div>
</ui-badge>

<ui-badge :value="5" position="bottom-right">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    右下角
  </div>
</ui-badge>

<ui-badge :value="5" position="bottom-left">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    左下角
  </div>
</ui-badge>`

// 自定义偏移示例代码
const offsetCode = `<ui-badge :value="5" :offset="[10, 10]">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    偏移 [10, 10]
  </div>
</ui-badge>

<ui-badge :value="5" :offset="[20, 0]">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    偏移 [20, 0]
  </div>
</ui-badge>

<ui-badge :value="5" :offset="[0, 20]">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    偏移 [0, 20]
  </div>
</ui-badge>

<ui-badge :value="5" :offset="[-10, -10]" position="bottom-left">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    负偏移 [-10, -10]
  </div>
</ui-badge>`

// 自定义颜色示例代码
const colorCode = `<ui-badge :value="5" bg-color="#8B5CF6">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    紫色
  </div>
</ui-badge>

<ui-badge :value="5" bg-color="#EC4899" color="#FFFFFF">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    粉色
  </div>
</ui-badge>

<ui-badge :value="5" bg-color="#34D399" color="#064E3B">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    绿色
  </div>
</ui-badge>

<ui-badge :value="5" bg-color="#FBBF24" color="#92400E">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    橙色
  </div>
</ui-badge>

<ui-badge :value="5" bg-color="#FFFFFF" color="#374151" bordered>
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    白色带边框
  </div>
</ui-badge>`

// 独立使用示例代码
const standaloneCode = `<div class="grid grid-cols-8 gap-2">
  <ui-badge :value="5" />
  <ui-badge value="new" />
  <ui-badge is-dot />
  <ui-badge is-dot type="success" />
  <ui-badge :value="99" :max="10" type="warning" />
</div>`

// 隐藏徽章示例代码
const hiddenCode = `<script setup>
import { ref } from 'vue'

const count = ref(12)

function increment() {
  count.value += 1
}

function decrement() {
  if (count.value > 0) {
    count.value -= 1
  }
}
<\/script>

<template>
  <ui-badge :value="0" :hidden="true">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      强制隐藏
    </div>
  </ui-badge>

  <ui-badge :value="count" :hidden="count === 0">
    <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      计数为0时隐藏
    </div>
  </ui-badge>

  <div class="flex items-center mt-4">
    <ui-button size="small" @click="decrement">-</ui-button>
    <span class="mx-2">{{ count }}</span>
    <ui-button size="small" @click="increment">+</ui-button>
  </div>
</template>`

// 非圆形徽章示例代码
const squareCode = `<ui-badge :value="5" :round="false">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    方形
  </div>
</ui-badge>

<ui-badge value="NEW" :round="false" type="primary">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    文本
  </div>
</ui-badge>`

// 带边框徽章示例代码
const borderedCode = `<ui-badge :value="5" bordered>
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    默认边框
  </div>
</ui-badge>

<ui-badge :value="5" bordered border-color="#3B82F6">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    蓝色边框
  </div>
</ui-badge>

<ui-badge :value="5" bordered border-color="#10B981" bg-color="#FFFFFF" color="#10B981">
  <div class="demo-box w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    绿色边框白底
  </div>
</ui-badge>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Badge 徽章
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      Badge 徽章组件用于显示数字、文本或状态标记，通常用于消息提醒、通知或状态标识，支持多种形式和位置。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="Badge 组件可以包裹其他元素，显示在右上角，可以展示数字或文本信息。数字为0时也会显示徽章。"
      :code="basicCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <ui-badge :value="5">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            默认
          </div>
        </ui-badge>
        <ui-badge :value="0">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            零值
          </div>
        </ui-badge>
        <ui-badge value="hot">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            文本
          </div>
        </ui-badge>
        <ui-badge :value="count">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            动态值
          </div>
        </ui-badge>
        <div class="flex items-center">
          <ui-button size="small" @click="decrement">
            -
          </ui-button>
          <span class="mx-2">{{ count }}</span>
          <ui-button size="small" @click="increment">
            +
          </ui-button>
        </div>
      </div>
    </ui-demo>

    <!-- 最大值 -->
    <ui-demo
      title="最大值"
      description="通过 max 属性设置数字最大值，超过最大值时会显示 {max}+。"
      :code="maxValueCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="99" :max="10">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            最大值 10
          </div>
        </ui-badge>
        <ui-badge :value="200" :max="99">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            最大值 99
          </div>
        </ui-badge>
        <ui-badge :value="1000" :max="999">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            最大值 999
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 徽章类型 -->
    <ui-demo
      title="徽章类型"
      description="支持不同类型的徽章，通过 type 属性指定不同的类型样式。"
      :code="typeCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" type="primary">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            主要
          </div>
        </ui-badge>
        <ui-badge :value="5" type="success">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            成功
          </div>
        </ui-badge>
        <ui-badge :value="5" type="warning">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            警告
          </div>
        </ui-badge>
        <ui-badge :value="5" type="danger">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            危险
          </div>
        </ui-badge>
        <ui-badge :value="5" type="info">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            信息
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 小圆点 -->
    <ui-demo
      title="小圆点"
      description="设置 is-dot 属性，只显示一个小圆点，通常用来表示有新消息或提醒。"
      :code="dotCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge is-dot>
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            默认
          </div>
        </ui-badge>
        <ui-badge is-dot type="primary">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            主要
          </div>
        </ui-badge>
        <ui-badge is-dot type="success">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            成功
          </div>
        </ui-badge>
        <ui-badge is-dot type="warning">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            警告
          </div>
        </ui-badge>
        <ui-badge is-dot type="info">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            信息
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 位置 -->
    <ui-demo
      title="徽章位置"
      description="通过 position 属性设置徽章的显示位置，支持四个角落。"
      :code="positionCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" position="top-right">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            右上角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="top-left">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            左上角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="bottom-right">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            右下角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="bottom-left">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            左下角
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 自定义偏移 -->
    <ui-demo
      title="自定义偏移"
      description="通过 offset 属性设置徽章的位置偏移，接受一个数组，格式为 [x, y]，单位为像素。"
      :code="offsetCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" :offset="[10, 10]">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            偏移 [10, 10]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[20, 0]">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            偏移 [20, 0]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[0, 20]">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            偏移 [0, 20]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[-10, -10]" position="bottom-left">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            负偏移 [-10, -10]
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="通过 bg-color 和 color 属性自定义徽章的背景色和文本颜色。"
      :code="colorCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" bg-color="#8B5CF6">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            紫色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#EC4899" color="#FFFFFF">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            粉色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#34D399" color="#064E3B">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            绿色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#FBBF24" color="#92400E">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            橙色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#FFFFFF" color="#374151" bordered>
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            白色带边框
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 独立使用 -->
    <ui-demo
      title="独立使用"
      description="徽章可以不包裹任何元素，独立使用。"
      :code="standaloneCode"
    >
      <div class="grid grid-cols-8 gap-2">
        <ui-badge :value="5" />
        <ui-badge value="new" />
        <ui-badge is-dot />
        <ui-badge is-dot type="success" />
        <ui-badge :value="99" :max="10" type="warning" />
      </div>
    </ui-demo>

    <!-- 隐藏徽章 -->
    <ui-demo
      title="隐藏徽章"
      description="通过 hidden 属性控制徽章的显示与隐藏，可以根据条件动态隐藏徽章。"
      :code="hiddenCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <ui-badge :value="0" :hidden="true">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            强制隐藏
          </div>
        </ui-badge>
        <ui-badge :value="count" :hidden="count === 0">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            计数为0时隐藏
          </div>
        </ui-badge>
        <div class="flex items-center">
          <ui-button size="small" @click="decrement">
            -
          </ui-button>
          <span class="mx-2">{{ count }}</span>
          <ui-button size="small" @click="increment">
            +
          </ui-button>
        </div>
      </div>
    </ui-demo>

    <!-- 非圆形徽章 -->
    <ui-demo
      title="非圆形徽章"
      description="设置 round 属性为 false，使徽章显示为方形。"
      :code="squareCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" :round="false">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            方形
          </div>
        </ui-badge>
        <ui-badge value="NEW" :round="false" type="primary">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            文本
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- 带边框徽章 -->
    <ui-demo
      title="带边框徽章"
      description="设置 bordered 属性为 true，给徽章添加边框，可以通过 border-color 设置边框颜色。"
      :code="borderedCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-badge :value="5" bordered>
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            默认边框
          </div>
        </ui-badge>
        <ui-badge :value="5" bordered border-color="#3B82F6">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            蓝色边框
          </div>
        </ui-badge>
        <ui-badge :value="5" bordered border-color="#10B981" bg-color="#FFFFFF" color="#10B981">
          <div class="demo-box h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            绿色边框白底
          </div>
        </ui-badge>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Badge 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            value
          </td>
          <td class="px-4 py-2">
            number | string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            徽章显示的内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            max
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            最大值，超过会显示 {max}+
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            type
          </td>
          <td class="px-4 py-2">
            primary | success | warning | danger | info
          </td>
          <td class="px-4 py-2">
            danger
          </td>
          <td class="px-4 py-2">
            徽章类型
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            is-dot
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示为小圆点
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            hidden
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否隐藏徽章
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            position
          </td>
          <td class="px-4 py-2">
            top-right | top-left | bottom-right | bottom-left
          </td>
          <td class="px-4 py-2">
            top-right
          </td>
          <td class="px-4 py-2">
            徽章位置
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            offset
          </td>
          <td class="px-4 py-2">
            [number, number]
          </td>
          <td class="px-4 py-2">
            [0, 0]
          </td>
          <td class="px-4 py-2">
            徽章位置偏移，格式为 [x, y]
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            徽章文本颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            bg-color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            徽章背景颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            bordered
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示边框
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            border-color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            边框颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            round
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            true
          </td>
          <td class="px-4 py-2">
            是否为圆形徽章
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Badge 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            default
          </td>
          <td class="px-4 py-2">
            徽章包裹的内容
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
