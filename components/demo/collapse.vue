<script setup lang="ts" name="DemoCollapse">
/**
 * Collapse 折叠面板组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 单值模式（手风琴）
const activeKey = ref('1')

// 多值模式
const activeKeys = ref(['1'])

// 自定义模式
const customActiveKeys = ref(['custom1'])

// 基础折叠面板示例代码
const basicCode = `<script setup>
import { ref } from 'vue'

// 多值模式
const activeKeys = ref(['1'])
<\/script>

<template>
  <ui-collapse v-model="activeKeys">
    <ui-collapse-item name="1" title="面板标题 1">
      <p>这是第一个面板的内容</p>
      <p>可以包含任何内容，包括文本、图片、表格等</p>
    </ui-collapse-item>
    <ui-collapse-item name="2" title="面板标题 2">
      <p>这是第二个面板的内容</p>
    </ui-collapse-item>
    <ui-collapse-item name="3" title="面板标题 3">
      <p>这是第三个面板的内容</p>
    </ui-collapse-item>
  </ui-collapse>
</template>`

// 手风琴模式示例代码
const accordionCode = `<script setup>
import { ref } from 'vue'

// 单值模式（手风琴）
const activeKey = ref('1')
<\/script>

<template>
  <ui-collapse v-model="activeKey" accordion>
    <ui-collapse-item name="1" title="面板标题 1">
      <p>这是第一个面板的内容</p>
    </ui-collapse-item>
    <ui-collapse-item name="2" title="面板标题 2">
      <p>这是第二个面板的内容</p>
    </ui-collapse-item>
    <ui-collapse-item name="3" title="面板标题 3">
      <p>这是第三个面板的内容</p>
    </ui-collapse-item>
  </ui-collapse>
</template>`

// 嵌套面板示例代码
const nestedCode = `<script setup>
import { ref } from 'vue'

const activeKeys = ref(['1'])
<\/script>

<template>
  <ui-collapse v-model="activeKeys">
    <ui-collapse-item name="1" title="嵌套面板">
      <ui-collapse>
        <ui-collapse-item name="nested1" title="嵌套面板 1">
          <p>这是嵌套面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="nested2" title="嵌套面板 2">
          <p>这是嵌套面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-collapse-item>
    <ui-collapse-item name="2" title="面板标题 2">
      <p>这是第二个面板的内容</p>
    </ui-collapse-item>
  </ui-collapse>
</template>`

// 自定义样式示例代码
const customCode = `<script setup>
import { ref } from 'vue'

const customActiveKeys = ref(['custom1'])
<\/script>

<template>
  <ui-collapse
    v-model="customActiveKeys"
    icon-position="right"
    expand-icon="heroicons:chevron-down-20-solid"
  >
    <ui-collapse-item
      name="custom1"
      title="自定义图标"
      icon="heroicons:bell-20-solid"
    >
      <p>这是使用自定义图标的面板内容</p>
    </ui-collapse-item>
    <ui-collapse-item
      name="custom2"
      disabled
      title="禁用状态"
    >
      <p>此面板已禁用，无法点击</p>
    </ui-collapse-item>
    <ui-collapse-item
      name="custom3"
      title="带额外内容"
      extra="额外信息"
    >
      <p>这是带有额外内容的面板</p>
    </ui-collapse-item>
  </ui-collapse>
</template>`

// 简洁模式示例代码
const simpleCode = `<ui-collapse simple>
  <ui-collapse-item name="simple1" title="简洁模式标题 1">
    <p>这是简洁模式的内容</p>
  </ui-collapse-item>
  <ui-collapse-item name="simple2" title="简洁模式标题 2">
    <p>这是简洁模式的内容</p>
  </ui-collapse-item>
</ui-collapse>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Collapse 折叠面板
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      折叠面板组件，用于将复杂的内容区域分组展示，保持页面的整洁，同时提高用户浏览效率。
    </p>

    <!-- 基础折叠面板 -->
    <ui-demo
      title="基础折叠面板"
      description="同时展开多个面板，点击面板头部切换折叠状态。"
      :code="basicCode"
    >
      <ui-collapse v-model="activeKeys">
        <ui-collapse-item name="1" title="面板标题 1">
          <p>这是第一个面板的内容</p>
          <p>可以包含任何内容，包括文本、图片、表格等</p>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="3" title="面板标题 3">
          <p>这是第三个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-demo>

    <!-- 手风琴模式 -->
    <ui-demo
      title="手风琴模式"
      description="每次只能展开一个面板，其他面板会自动折叠。通过设置 accordion 属性启用手风琴模式。"
      :code="accordionCode"
    >
      <ui-collapse v-model="activeKey" accordion>
        <ui-collapse-item name="1" title="面板标题 1">
          <p>这是第一个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="3" title="面板标题 3">
          <p>这是第三个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-demo>

    <!-- 嵌套面板 -->
    <ui-demo
      title="嵌套面板"
      description="折叠面板可以相互嵌套，实现多层级结构。"
      :code="nestedCode"
    >
      <ui-collapse v-model="activeKeys">
        <ui-collapse-item name="1" title="嵌套面板">
          <ui-collapse>
            <ui-collapse-item name="nested1" title="嵌套面板 1">
              <p>这是嵌套面板的内容</p>
            </ui-collapse-item>
            <ui-collapse-item name="nested2" title="嵌套面板 2">
              <p>这是嵌套面板的内容</p>
            </ui-collapse-item>
          </ui-collapse>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="自定义折叠面板的图标位置和样式，支持设置面板项的禁用状态和额外内容。"
      :code="customCode"
    >
      <ui-collapse
        v-model="customActiveKeys"
        icon-position="right"
        expand-icon="heroicons:chevron-down-20-solid"
      >
        <ui-collapse-item
          name="custom1"
          title="自定义图标"
          icon="heroicons:bell-20-solid"
        >
          <p>这是使用自定义图标的面板内容</p>
        </ui-collapse-item>
        <ui-collapse-item
          name="custom2"
          disabled
          title="禁用状态"
        >
          <p>此面板已禁用，无法点击</p>
        </ui-collapse-item>
        <ui-collapse-item
          name="custom3"
          title="带额外内容"
          extra="额外信息"
        >
          <p>这是带有额外内容的面板</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-demo>

    <!-- 简洁模式 -->
    <ui-demo
      title="简洁模式"
      description="不带边框的简洁样式，通过设置 simple 属性启用简洁模式。"
      :code="simpleCode"
    >
      <ui-collapse simple>
        <ui-collapse-item name="simple1" title="简洁模式标题 1">
          <p>这是简洁模式的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="simple2" title="简洁模式标题 2">
          <p>这是简洁模式的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Collapse 属性
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
            modelValue / v-model
          </td>
          <td class="px-4 py-2">
            string | string[]
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            当前激活的面板名称
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            accordion
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否使用手风琴模式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            simple
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否使用简洁模式
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
            true
          </td>
          <td class="px-4 py-2">
            是否显示边框
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            icon-position
          </td>
          <td class="px-4 py-2">
            'left' | 'right'
          </td>
          <td class="px-4 py-2">
            'left'
          </td>
          <td class="px-4 py-2">
            展开图标的位置
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            expand-icon
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义展开图标
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Collapse 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            change
          </td>
          <td class="px-4 py-2">
            激活面板改变时触发
          </td>
          <td class="px-4 py-2">
            (activeNames: string | string[])
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CollapseItem 属性
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
            name
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            面板唯一标识符
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            面板标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            disabled
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否禁用面板
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            icon
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义面板图标
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            extra
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            面板头部的额外内容
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CollapseItem 插槽
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
            面板内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            自定义面板标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            extra
          </td>
          <td class="px-4 py-2">
            自定义面板头部额外内容
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section:last-child {
  margin-bottom: 0;
}
</style>
