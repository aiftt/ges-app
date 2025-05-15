<script setup lang="ts" name="DemoAlert">
/**
 * Alert 警告提示组件示例
 * 创建日期: 2024-06-24
 * 作者: aiftt
 * 更新日期: 2024-06-24 - 初始版本
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('AlertDemo')

// 自定义关闭处理
function handleClose() {
  logger.info('Alert已关闭')
}

// 控制是否可见
const visible = ref(true)
function toggleVisible() {
  visible.value = !visible.value
}

// 处理折叠切换
function handleToggle(expanded: boolean) {
  logger.info('折叠状态改变:', expanded ? '展开' : '折叠')
}

// 代码示例
const basicCode = `<ui-alert>
  这是一条信息提示
</ui-alert>`

const typesCode = `<ui-alert type="info">
  这是一条信息提示
</ui-alert>
<ui-alert type="success">
  这是一条成功提示
</ui-alert>
<ui-alert type="warning">
  这是一条警告提示
</ui-alert>
<ui-alert type="error">
  这是一条错误提示
</ui-alert>`

const noIconCode = `<ui-alert type="info" :show-icon="false">
  这是一条不带图标的信息提示
</ui-alert>
<ui-alert type="success" :show-icon="false">
  这是一条不带图标的成功提示
</ui-alert>`

const customIconCode = `<ui-alert type="info" icon="heroicons:light-bulb-20-solid">
  使用自定义图标的信息提示
</ui-alert>`

const withTitleCode = `<ui-alert
  type="success"
  title="成功提示标题"
  description="这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。"
/>
<ui-alert type="warning" title="警告提示标题">
  这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。
</ui-alert>`

const closableCode = `<ui-alert
  type="info"
  closable
  title="可关闭的提示"
  description="点击右上角的关闭按钮可以关闭这个警告提示"
  @close="handleClose"
/>

<div class="flex items-center gap-4">
  <ui-button @click="toggleVisible">
    {{ visible ? '关闭' : '显示' }}警告提示
  </ui-button>
  <ui-alert v-if="visible" type="warning" closable>
    这是一个可通过外部控制的警告提示
  </ui-alert>
</div>

<script setup>
import { ref } from 'vue'

// 控制是否可见
const visible = ref(true)
function toggleVisible() {
  visible.value = !visible.value
}

// 自定义关闭处理
function handleClose() {
  console.log('Alert已关闭')
}
<\/script>`

const centerCode = `<ui-alert
  type="info"
  center
  title="居中显示的标题"
  description="这是居中显示的描述文本，包括标题和内容都会居中对齐。"
/>`

const noBorderCode = `<ui-alert type="info" :border="false">
  这是一条没有边框的信息提示
</ui-alert>
<ui-alert type="success" :border="false">
  这是一条没有边框的成功提示
</ui-alert>`

const shadowCode = `<ui-alert type="warning" shadow>
  这是一条带有阴影效果的警告提示
</ui-alert>
<ui-alert type="error" shadow>
  这是一条带有阴影效果的错误提示
</ui-alert>`

const collapsibleCode = `<ui-alert
  type="info"
  collapsible
  title="可折叠的提示"
  description="点击标题或箭头图标可以展开或折叠这个提示的详细内容。这对于长内容的提示特别有用，可以节省页面空间。"
  @toggle="handleToggle"
/>
<ui-alert
  type="warning"
  collapsible
  :default-open="false"
  title="默认折叠的提示"
  description="这个提示默认是折叠状态的，点击标题或箭头图标可以展开查看详细内容。"
/>

<script setup>
function handleToggle(expanded) {
  console.log('折叠状态改变:', expanded ? '展开' : '折叠')
}
<\/script>`

const customStyleCode = `<ui-alert
  bg-color="#edeafd"
  text-color="#5b21b6"
  border-color="#c4b5fd"
  border-radius="8px"
>
  这是一个紫色主题的自定义样式提示
</ui-alert>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Alert 警告提示
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于展示重要的提示信息，包括成功、信息、警告、错误等不同类型的通知。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="Alert 组件的最基本用法，默认为信息类型。"
      :code="basicCode"
    >
      <ui-alert>
        这是一条信息提示
      </ui-alert>
    </ui-demo>

    <!-- 不同类型 -->
    <ui-demo
      title="不同类型"
      description="提供四种不同类型的警告提示：信息、成功、警告和错误。"
      :code="typesCode"
    >
      <ui-alert type="info">
        这是一条信息提示
      </ui-alert>
      <ui-alert type="success">
        这是一条成功提示
      </ui-alert>
      <ui-alert type="warning">
        这是一条警告提示
      </ui-alert>
      <ui-alert type="error">
        这是一条错误提示
      </ui-alert>
    </ui-demo>

    <!-- 不带图标 -->
    <ui-demo
      title="不带图标"
      description="可以通过 show-icon 属性控制是否显示图标。"
      :code="noIconCode"
    >
      <ui-alert type="info" :show-icon="false">
        这是一条不带图标的信息提示
      </ui-alert>
      <ui-alert type="success" :show-icon="false">
        这是一条不带图标的成功提示
      </ui-alert>
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="可以通过 icon 属性自定义图标。"
      :code="customIconCode"
    >
      <ui-alert type="info" icon="heroicons:light-bulb-20-solid">
        使用自定义图标的信息提示
      </ui-alert>
    </ui-demo>

    <!-- 带标题和描述 -->
    <ui-demo
      title="带标题和描述"
      description="可以设置标题和详细描述，适用于复杂内容的展示。"
      :code="withTitleCode"
    >
      <ui-alert
        type="success"
        title="成功提示标题"
        description="这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。"
      />
      <ui-alert type="warning" title="警告提示标题">
        这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。
      </ui-alert>
    </ui-demo>

    <!-- 可关闭的警告提示 -->
    <ui-demo
      title="可关闭的警告提示"
      description="添加 closable 属性可以使警告提示可关闭，可以通过事件或外部控制显示状态。"
      :code="closableCode"
    >
      <div class="mb-4">
        <ui-alert
          type="info"
          closable
          title="可关闭的提示"
          description="点击右上角的关闭按钮可以关闭这个警告提示"
          @close="handleClose"
        />
      </div>
      <div class="flex items-center gap-4">
        <ui-button @click="toggleVisible">
          {{ visible ? '关闭' : '显示' }}警告提示
        </ui-button>
        <ui-alert v-if="visible" type="warning" closable>
          这是一个可通过外部控制的警告提示
        </ui-alert>
      </div>
    </ui-demo>

    <!-- 居中显示 -->
    <ui-demo
      title="居中显示"
      description="通过 center 属性可以使内容居中对齐。"
      :code="centerCode"
    >
      <ui-alert
        type="info"
        center
        title="居中显示的标题"
        description="这是居中显示的描述文本，包括标题和内容都会居中对齐。"
      />
    </ui-demo>

    <!-- 无边框 -->
    <ui-demo
      title="无边框"
      description="可以通过 border 属性控制是否显示边框。"
      :code="noBorderCode"
    >
      <ui-alert type="info" :border="false">
        这是一条没有边框的信息提示
      </ui-alert>
      <ui-alert type="success" :border="false">
        这是一条没有边框的成功提示
      </ui-alert>
    </ui-demo>

    <!-- 带阴影 -->
    <ui-demo
      title="带阴影"
      description="通过 shadow 属性可以添加阴影效果，增强视觉层级。"
      :code="shadowCode"
    >
      <ui-alert type="warning" shadow>
        这是一条带有阴影效果的警告提示
      </ui-alert>
      <ui-alert type="error" shadow>
        这是一条带有阴影效果的错误提示
      </ui-alert>
    </ui-demo>

    <!-- 可折叠的提示 -->
    <ui-demo
      title="可折叠的提示"
      description="使用 collapsible 属性可以使提示内容可折叠，适用于长内容的显示。"
      :code="collapsibleCode"
    >
      <ui-alert
        type="info"
        collapsible
        title="可折叠的提示"
        description="点击标题或箭头图标可以展开或折叠这个提示的详细内容。这对于长内容的提示特别有用，可以节省页面空间。"
        @toggle="handleToggle"
      />
      <ui-alert
        type="warning"
        collapsible
        :default-open="false"
        title="默认折叠的提示"
        description="这个提示默认是折叠状态的，点击标题或箭头图标可以展开查看详细内容。"
      />
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以通过 bg-color、text-color、border-color 等属性自定义样式。"
      :code="customStyleCode"
    >
      <ui-alert
        bg-color="#edeafd"
        text-color="#5b21b6"
        border-color="#c4b5fd"
        border-radius="8px"
      >
        这是一个紫色主题的自定义样式提示
      </ui-alert>
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
                type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                提示类型
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'info' | 'success' | 'warning' | 'error'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'info'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                title
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标题
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
                description
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                详细描述
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
                show-icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示图标
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
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义图标
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
                closable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可关闭
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
                center
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否居中显示
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
                border
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示边框
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
                shadow
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示阴影
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
                collapsible
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可折叠
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
                default-open
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                可折叠时的默认展开状态
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                true
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                close
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                关闭时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                toggle
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                折叠状态改变时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (expanded: boolean) => void
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
                描述内容
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义图标
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                title
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义标题
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
