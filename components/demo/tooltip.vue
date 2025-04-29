<script setup lang="ts" name="DemoTooltip">
/**
 * Tooltip组件演示
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-04-30 - 初始版本
 */
import { ref } from 'vue'

// 触发方式选项
const triggerOptions = ['hover', 'click', 'focus']
const placementOptions = ['top', 'right', 'bottom', 'left']
const themeOptions = ['dark', 'light']

// 选中的选项
const selectedTrigger = ref('hover')
const selectedPlacement = ref('top')
const selectedTheme = ref('dark')
</script>

<template>
  <div class="demo-tooltip">
    <h2 class="mb-4 text-xl font-bold">
      Tooltip 文字提示
    </h2>
    <p class="mb-4">
      简单的文字提示气泡框，鼠标悬停、点击或聚焦在元素上时显示。
    </p>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      基础用法
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <ui-tooltip content="这是一个简单的提示文本">
        <ui-button>鼠标悬停查看提示</ui-button>
      </ui-tooltip>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      不同位置
    </h3>
    <div class="demo-block mb-6 flex flex-wrap gap-4 border rounded p-4">
      <ui-tooltip content="上方提示" placement="top">
        <ui-button>上方</ui-button>
      </ui-tooltip>

      <ui-tooltip content="右侧提示" placement="right">
        <ui-button>右侧</ui-button>
      </ui-tooltip>

      <ui-tooltip content="下方提示" placement="bottom">
        <ui-button>下方</ui-button>
      </ui-tooltip>

      <ui-tooltip content="左侧提示" placement="left">
        <ui-button>左侧</ui-button>
      </ui-tooltip>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      不同主题
    </h3>
    <div class="demo-block mb-6 flex flex-wrap gap-4 border rounded p-4">
      <ui-tooltip content="深色主题" theme="dark">
        <ui-button>深色</ui-button>
      </ui-tooltip>

      <ui-tooltip content="浅色主题" theme="light">
        <ui-button>浅色</ui-button>
      </ui-tooltip>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      不同触发方式
    </h3>
    <div class="demo-block mb-6 flex flex-wrap gap-4 border rounded p-4">
      <ui-tooltip content="悬停触发" trigger="hover">
        <ui-button>悬停触发</ui-button>
      </ui-tooltip>

      <ui-tooltip content="点击触发" trigger="click">
        <ui-button>点击触发</ui-button>
      </ui-tooltip>

      <ui-tooltip content="聚焦触发" trigger="focus">
        <input
          type="text"
          placeholder="聚焦查看提示"
          class="border rounded px-3 py-2"
        >
      </ui-tooltip>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      自定义内容
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <ui-tooltip>
        <template #default>
          <ui-button>带格式的提示</ui-button>
        </template>

        <template #content>
          <div>
            <strong class="text-primary">格式化内容</strong>
            <p>支持HTML内容的文字提示</p>
            <div class="mt-2 border-t border-gray-200 pt-2 dark:border-gray-700">
              <span class="text-xs">提示信息</span>
            </div>
          </div>
        </template>
      </ui-tooltip>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      交互式配置
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <div class="grid grid-cols-1 mb-4 gap-4 md:grid-cols-3">
        <div>
          <label class="mb-2 block">触发方式:</label>
          <select v-model="selectedTrigger" class="w-full border rounded px-2 py-1">
            <option v-for="opt in triggerOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block">显示位置:</label>
          <select v-model="selectedPlacement" class="w-full border rounded px-2 py-1">
            <option v-for="opt in placementOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block">主题:</label>
          <select v-model="selectedTheme" class="w-full border rounded px-2 py-1">
            <option v-for="opt in themeOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <ui-tooltip
          content="自定义配置的提示内容"
          :trigger="selectedTrigger"
          :placement="selectedPlacement"
          :theme="selectedTheme"
        >
          <ui-button>交互式示例</ui-button>
        </ui-tooltip>
      </div>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      禁用状态
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <ui-tooltip content="此提示已禁用" disabled>
        <ui-button>禁用提示</ui-button>
      </ui-tooltip>
    </div>

    <h3 class="mb-4 mt-8 text-lg font-semibold">
      API参考
    </h3>

    <h4 class="mb-2 mt-4 font-semibold">
      Props
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border p-2 text-left">
            属性
          </th>
          <th class="border p-2 text-left">
            说明
          </th>
          <th class="border p-2 text-left">
            类型
          </th>
          <th class="border p-2 text-left">
            默认值
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">
            content
          </td>
          <td class="border p-2">
            提示文字内容
          </td>
          <td class="border p-2">
            string
          </td>
          <td class="border p-2">
            ''
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            placement
          </td>
          <td class="border p-2">
            提示框位置
          </td>
          <td class="border p-2">
            top | right | bottom | left
          </td>
          <td class="border p-2">
            top
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            theme
          </td>
          <td class="border p-2">
            提示框主题
          </td>
          <td class="border p-2">
            light | dark
          </td>
          <td class="border p-2">
            dark
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            trigger
          </td>
          <td class="border p-2">
            触发方式
          </td>
          <td class="border p-2">
            hover | click | focus
          </td>
          <td class="border p-2">
            hover
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            showDelay
          </td>
          <td class="border p-2">
            显示延迟时间(毫秒)
          </td>
          <td class="border p-2">
            number
          </td>
          <td class="border p-2">
            100
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            hideDelay
          </td>
          <td class="border p-2">
            隐藏延迟时间(毫秒)
          </td>
          <td class="border p-2">
            number
          </td>
          <td class="border p-2">
            100
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            disabled
          </td>
          <td class="border p-2">
            是否禁用
          </td>
          <td class="border p-2">
            boolean
          </td>
          <td class="border p-2">
            false
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            maxWidth
          </td>
          <td class="border p-2">
            最大宽度
          </td>
          <td class="border p-2">
            string
          </td>
          <td class="border p-2">
            200px
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-4 font-semibold">
      插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border p-2 text-left">
            名称
          </th>
          <th class="border p-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">
            default
          </td>
          <td class="border p-2">
            触发元素
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            content
          </td>
          <td class="border p-2">
            提示内容，优先级高于content属性
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.demo-tooltip {
  width: 100%;
}

.demo-block {
  background-color: var(--ui-bg-color, white);
  border-color: var(--ui-border-color, #e5e7eb);
}

:root.dark .demo-block {
  background-color: var(--ui-bg-color, #1f2937);
  border-color: var(--ui-border-color, #374151);
}
</style>
