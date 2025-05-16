<script setup lang="ts" name="DemoSwitch">
/**
 * 开关组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基础开关
const basicSwitch = ref(false)

// 禁用状态
const disabledSwitch = ref(true)

// 加载状态
const loadingSwitch = ref(true)

// 不同尺寸
const smallSwitch = ref(false)
const defaultSwitch = ref(true)
const largeSwitch = ref(false)

// 自定义颜色
const customColorSwitch = ref(true)

// 带有文本描述
const withTextSwitch = ref(false)

// 方形开关
const squareSwitch = ref(true)

// 示例代码字符串
const basicCode = `<template>
  <ui-switch v-model="checked" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
<\/script>`

const disabledCode = `<template>
  <div class="space-x-4">
    <ui-switch disabled />
    <ui-switch disabled :model-value="true" />
  </div>
</template>`

const loadingCode = `<template>
  <div class="space-x-4">
    <ui-switch loading />
    <ui-switch loading :model-value="true" />
  </div>
</template>`

const sizeCode = `<template>
  <div class="space-x-4">
    <ui-switch v-model="small" size="small" />
    <ui-switch v-model="medium" />
    <ui-switch v-model="large" size="large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const small = ref(false)
const medium = ref(true)
const large = ref(false)
<\/script>`

const colorCode = `<template>
  <ui-switch v-model="checked" active-color="#8B5CF6" inactive-color="#F3E8FF" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
<\/script>`

const textCode = `<template>
  <ui-switch
    v-model="checked"
    active-text="开启"
    inactive-text="关闭"
  />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
<\/script>`

const squareCode = `<template>
  <ui-switch v-model="checked" square />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Switch 开关
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      开关组件用于表示两种互斥状态的切换，如开/关、显示/隐藏。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的开关组件，绑定v-model到一个Boolean值。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-switch v-model="basicSwitch" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ basicSwitch }}
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="通过disabled属性设置开关为禁用状态。"
      :code="disabledCode"
    >
      <div class="flex space-x-4">
        <ui-switch disabled />
        <ui-switch disabled :model-value="disabledSwitch" />
      </div>
    </ui-demo>

    <!-- 加载状态 -->
    <ui-demo
      title="加载状态"
      description="通过loading属性设置开关为加载状态。"
      :code="loadingCode"
    >
      <div class="flex space-x-4">
        <ui-switch loading />
        <ui-switch loading :model-value="loadingSwitch" />
      </div>
    </ui-demo>

    <!-- 尺寸变体 -->
    <ui-demo
      title="尺寸变体"
      description="提供三种不同的尺寸：small、default、large。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex flex-col items-center">
          <span class="mb-2 text-sm dark:text-gray-300">small</span>
          <ui-switch v-model="smallSwitch" size="small" />
        </div>
        <div class="flex flex-col items-center">
          <span class="mb-2 text-sm dark:text-gray-300">default</span>
          <ui-switch v-model="defaultSwitch" />
        </div>
        <div class="flex flex-col items-center">
          <span class="mb-2 text-sm dark:text-gray-300">large</span>
          <ui-switch v-model="largeSwitch" size="large" />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="可以通过activeColor和inactiveColor属性自定义开关的颜色。"
      :code="colorCode"
    >
      <ui-switch v-model="customColorSwitch" active-color="#8B5CF6" inactive-color="#F3E8FF" />
    </ui-demo>

    <!-- 带有文本描述 -->
    <ui-demo
      title="带有文本描述"
      description="可以通过activeText和inactiveText属性设置开关的文本描述。"
      :code="textCode"
    >
      <ui-switch
        v-model="withTextSwitch"
        active-text="开启"
        inactive-text="关闭"
      />
    </ui-demo>

    <!-- 方形按钮 -->
    <ui-demo
      title="方形按钮"
      description="通过square属性可以设置为方形按钮样式。"
      :code="squareCode"
    >
      <ui-switch v-model="squareSwitch" square />
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Switch组件的属性、事件和方法。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                名称
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                modelValue / v-model
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                loading
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为加载状态
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开关尺寸
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' / 'default' / 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                activeText
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开启状态的文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                inactiveText
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭状态的文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                activeValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开启状态的值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / number / boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                inactiveValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭状态的值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / number / boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                activeColor
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开启状态的颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                inactiveColor
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭状态的颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                square
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为方形按钮
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                状态变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                新状态的值
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                input
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                状态变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                新状态的值
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-switch {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.demo-subtitle {
  font-size: 18px;
  font-weight: bold;
  margin: 24px 0 16px 0;
}

.demo-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-value {
  margin-left: 16px;
  font-size: 14px;
  color: #6b7280;
}

.demo-button {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #2563eb;
}

.demo-table {
  overflow-x: auto;
}

.demo-table table {
  width: 100%;
  border-collapse: collapse;
}

.demo-table th,
.demo-table td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.demo-table th {
  background-color: #f9fafb;
  font-weight: bold;
}

:root.dark .demo-controls {
  background-color: #1f2937;
}

:root.dark .demo-table th {
  background-color: #111827;
}

:root.dark .demo-table th,
:root.dark .demo-table td {
  border-color: #374151;
}

:root.dark .demo-value {
  color: #9ca3af;
}

:root.dark .demo-title {
  border-color: #374151;
}
</style>
