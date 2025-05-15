<script setup lang="ts" name="DemoTabs">
/**
 * 标签页组件演示
 * 创建日期: 2024-08-03
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 基础标签页当前激活标签
const activeTab = ref('1')

// 卡片式标签页当前激活标签
const activeCardTab = ref('1')

// 分段式标签页当前激活标签
const activeSegmentTab = ref('1')

// 可编辑标签页当前标签
const editableActiveTab = ref('1')

// 可编辑标签页列表
const editableTabs = ref([
  { name: '1', label: '标签 1', content: '标签页内容 1' },
  { name: '2', label: '标签 2', content: '标签页内容 2' },
])

// 标签计数器，用于添加标签
let tabIndex = 2

// 添加标签
function addTab() {
  tabIndex++
  const newTabName = String(tabIndex)

  editableTabs.value.push({
    name: newTabName,
    label: `新标签 ${tabIndex}`,
    content: `新标签内容 ${tabIndex}`,
  })

  editableActiveTab.value = newTabName
}

// 删除标签
function removeTab(targetName: string | number) {
  // 如果删除的不是当前激活标签，则无需切换
  if (editableActiveTab.value !== targetName) {
    const tabs = editableTabs.value
    const index = tabs.findIndex(tab => tab.name === targetName)
    tabs.splice(index, 1)
    return
  }

  // 删除的是当前激活标签，需要切换到其他标签
  const tabs = editableTabs.value
  const targetIndex = tabs.findIndex(tab => tab.name === targetName)

  // 确定切换方向
  let newActive = ''
  if (tabs.length === 1) {
    // 这是最后一个标签，不做处理
  }
  else if (targetIndex === 0) {
    // 如果是第一个，切换到第二个
    newActive = tabs[1].name
  }
  else {
    // 否则切换到前一个
    newActive = tabs[targetIndex - 1].name
  }

  // 删除标签
  tabs.splice(targetIndex, 1)
  editableActiveTab.value = newActive
}

// 位置选项
type TabPosition = 'top' | 'right' | 'bottom' | 'left'
const tabPosition = ref<TabPosition>('top')
const positions: TabPosition[] = ['top', 'right', 'bottom', 'left']

// 带图标的标签页当前标签
const iconTabActive = ref('1')

// 代码示例
const basicCode = `<ui-tabs v-model="activeTab">
  <ui-tabs-pane name="1" label="标签页一">
    <div class="border rounded p-4">
      <p>标签页一的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="标签页二">
    <div class="border rounded p-4">
      <p>标签页二的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="标签页三">
    <div class="border rounded p-4">
      <p>标签页三的内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
const activeTab = ref('1')
<\/script>`

const cardCode = `<ui-tabs v-model="activeCardTab" type="card">
  <ui-tabs-pane name="1" label="卡片标签一">
    <div class="border rounded p-4">
      <p>卡片标签一的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="卡片标签二">
    <div class="border rounded p-4">
      <p>卡片标签二的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="卡片标签三">
    <div class="border rounded p-4">
      <p>卡片标签三的内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
const activeCardTab = ref('1')
<\/script>`

const segmentCode = `<ui-tabs v-model="activeSegmentTab" type="segment">
  <ui-tabs-pane name="1" label="选项一">
    <div class="border rounded p-4">
      <p>选项一内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="选项二">
    <div class="border rounded p-4">
      <p>选项二内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="选项三">
    <div class="border rounded p-4">
      <p>选项三内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
const activeSegmentTab = ref('1')
<\/script>`

const positionCode = `<div class="mb-4">
  <span class="mr-2">标签位置：</span>
  <div class="inline-flex overflow-hidden border rounded">
    <button
      v-for="pos in positions"
      :key="pos"
      class="px-3 py-1"
      :class="{ 'bg-blue-500 text-white': tabPosition === pos, 'hover:bg-gray-100': tabPosition !== pos }"
      @click="tabPosition = pos"
    >
      {{ pos }}
    </button>
  </div>
</div>

<ui-tabs v-model="activeTab" :tab-position="tabPosition">
  <ui-tabs-pane name="1" label="标签页一">
    <div class="border rounded p-4">
      <p>标签页一的内容</p>
      <p class="mt-2">当前位置：{{ tabPosition }}</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="标签页二">
    <div class="border rounded p-4">
      <p>标签页二的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="标签页三">
    <div class="border rounded p-4">
      <p>标签页三的内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
type TabPosition = 'top' | 'right' | 'bottom' | 'left'
const tabPosition = ref<TabPosition>('top')
const positions: TabPosition[] = ['top', 'right', 'bottom', 'left']
const activeTab = ref('1')
<\/script>`

const editableCode = `<ui-tabs
  v-model="editableActiveTab"
  type="card"
  closable
  addable
  add-text="添加标签"
  @tab-add="addTab"
  @tab-remove="removeTab"
>
  <ui-tabs-pane
    v-for="item in editableTabs"
    :key="item.name"
    :name="item.name"
    :label="item.label"
  >
    <div class="border rounded p-4">
      <p>{{ item.content }}</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
// 可编辑标签页当前标签
const editableActiveTab = ref('1')

// 可编辑标签页列表
const editableTabs = ref([
  { name: '1', label: '标签 1', content: '标签页内容 1' },
  { name: '2', label: '标签 2', content: '标签页内容 2' },
])

// 标签计数器，用于添加标签
let tabIndex = 2

// 添加标签
function addTab() {
  tabIndex++
  const newTabName = String(tabIndex)
  editableTabs.value.push({
    name: newTabName,
    label: \`新标签 \${tabIndex}\`,
    content: \`新标签内容 \${tabIndex}\`,
  })
  editableActiveTab.value = newTabName
}

// 删除标签
function removeTab(targetName) {
  // 删除标签的完整逻辑...
}
<\/script>`

const iconCode = `<ui-tabs v-model="iconTabActive">
  <ui-tabs-pane name="1" label="个人信息" icon="carbon:user-avatar">
    <div class="border rounded p-4">
      <p>个人信息内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="安全设置" icon="carbon:security">
    <div class="border rounded p-4">
      <p>安全设置内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="消息通知" icon="carbon:notification">
    <div class="border rounded p-4">
      <p>消息通知内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<script setup>
const iconTabActive = ref('1')
<\/script>`

const disabledCode = `<ui-tabs v-model="activeTab">
  <ui-tabs-pane name="1" label="可用标签">
    <div class="border rounded p-4">
      <p>可用标签的内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="禁用标签" disabled>
    <div class="border rounded p-4">
      <p>这个内容不会显示，因为标签被禁用了</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="3" label="可用标签">
    <div class="border rounded p-4">
      <p>另一个可用标签的内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>`

const sizeCode = `<!-- 小尺寸 -->
<ui-tabs v-model="activeTab" size="small">
  <ui-tabs-pane name="1" label="标签一">
    <div class="border rounded p-2">
      <p>小尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="标签二">
    <div class="border rounded p-2">
      <p>小尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<!-- 默认尺寸 -->
<ui-tabs v-model="activeTab">
  <ui-tabs-pane name="1" label="标签一">
    <div class="border rounded p-2">
      <p>默认尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="标签二">
    <div class="border rounded p-2">
      <p>默认尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>

<!-- 大尺寸 -->
<ui-tabs v-model="activeTab" size="large">
  <ui-tabs-pane name="1" label="标签一">
    <div class="border rounded p-2">
      <p>大尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
  <ui-tabs-pane name="2" label="标签二">
    <div class="border rounded p-2">
      <p>大尺寸标签内容</p>
    </div>
  </ui-tabs-pane>
</ui-tabs>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Tabs 标签页
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      标签页组件用于在同一块区域内容切换显示不同内容，是一种常用的导航组件。
    </p>

    <!-- 基础标签页 -->
    <ui-demo
      title="基础用法"
      description="基础的标签页，支持切换不同的标签页内容。"
      :code="basicCode"
    >
      <ui-tabs v-model="activeTab">
        <ui-tabs-pane name="1" label="标签页一">
          <div class="border rounded p-4">
            <p>标签页一的内容</p>
            <p class="mt-2">
              这是第一个标签页的内容区域
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="2" label="标签页二">
          <div class="border rounded p-4">
            <p>标签页二的内容</p>
            <p class="mt-2">
              这是第二个标签页的内容区域
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="3" label="标签页三">
          <div class="border rounded p-4">
            <p>标签页三的内容</p>
            <p class="mt-2">
              这是第三个标签页的内容区域
            </p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 卡片式标签页 -->
    <ui-demo
      title="卡片式标签页"
      description="卡片样式的标签页，标签更加突出，适合内容分组展示。"
      :code="cardCode"
    >
      <ui-tabs v-model="activeCardTab" type="card">
        <ui-tabs-pane name="1" label="卡片标签一">
          <div class="border rounded p-4">
            <p>卡片标签一的内容</p>
            <p class="mt-2">
              这是使用卡片样式的标签页
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="2" label="卡片标签二">
          <div class="border rounded p-4">
            <p>卡片标签二的内容</p>
            <p class="mt-2">
              卡片样式更加突出
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="3" label="卡片标签三">
          <div class="border rounded p-4">
            <p>卡片标签三的内容</p>
            <p class="mt-2">
              适合需要分组的内容展示
            </p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 分段式标签页 -->
    <ui-demo
      title="分段式标签页"
      description="分段式的标签页，外观类似于按钮组，适合作为视图切换器。"
      :code="segmentCode"
    >
      <ui-tabs v-model="activeSegmentTab" type="segment">
        <ui-tabs-pane name="1" label="选项一">
          <div class="border rounded p-4">
            <p>选项一内容</p>
            <p class="mt-2">
              分段式标签页适合作为视图切换器
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="2" label="选项二">
          <div class="border rounded p-4">
            <p>选项二内容</p>
            <p class="mt-2">
              分段式样式更加紧凑
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="3" label="选项三">
          <div class="border rounded p-4">
            <p>选项三内容</p>
            <p class="mt-2">
              适合作为二级导航
            </p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 不同位置的标签页 -->
    <ui-demo
      title="标签位置"
      description="标签页支持四个不同的位置：上、右、下、左。"
      :code="positionCode"
    >
      <div>
        <div class="mb-4">
          <span class="mr-2">标签位置：</span>
          <div class="inline-flex overflow-hidden border rounded">
            <button
              v-for="pos in positions"
              :key="pos"
              class="px-3 py-1"
              :class="{ 'bg-blue-500 text-white': tabPosition === pos, 'hover:bg-gray-100': tabPosition !== pos }"
              @click="tabPosition = pos"
            >
              {{ pos }}
            </button>
          </div>
        </div>

        <ui-tabs v-model="activeTab" :tab-position="tabPosition">
          <ui-tabs-pane name="1" label="标签页一">
            <div class="border rounded p-4">
              <p>标签页一的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="标签页二">
            <div class="border rounded p-4">
              <p>标签页二的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="标签页三">
            <div class="border rounded p-4">
              <p>标签页三的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>
    </ui-demo>

    <!-- 可编辑标签页 -->
    <ui-demo
      title="可编辑标签页"
      description="支持添加和关闭标签的动态标签页。"
      :code="editableCode"
    >
      <ui-tabs
        v-model="editableActiveTab"
        type="card"
        closable
        addable
        add-text="添加标签"
        @tab-add="addTab"
        @tab-remove="removeTab"
      >
        <ui-tabs-pane
          v-for="item in editableTabs"
          :key="item.name"
          :name="item.name"
          :label="item.label"
        >
          <div class="border rounded p-4">
            <p>{{ item.content }}</p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 带图标的标签页 -->
    <ui-demo
      title="带图标的标签页"
      description="可以在标签上添加图标，使标签更加直观。"
      :code="iconCode"
    >
      <ui-tabs v-model="iconTabActive">
        <ui-tabs-pane name="1" label="个人信息" icon="carbon:user-avatar">
          <div class="border rounded p-4">
            <p>个人信息内容</p>
            <p class="mt-2">
              这里展示用户的个人资料
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="2" label="安全设置" icon="carbon:security">
          <div class="border rounded p-4">
            <p>安全设置内容</p>
            <p class="mt-2">
              这里展示用户的安全相关设置
            </p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="3" label="消息通知" icon="carbon:notification">
          <div class="border rounded p-4">
            <p>消息通知内容</p>
            <p class="mt-2">
              这里展示用户的消息设置
            </p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="可以禁用特定的标签页，禁用后无法点击切换。"
      :code="disabledCode"
    >
      <ui-tabs v-model="activeTab">
        <ui-tabs-pane name="1" label="可用标签">
          <div class="border rounded p-4">
            <p>可用标签的内容</p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="2" label="禁用标签" disabled>
          <div class="border rounded p-4">
            <p>这个内容不会显示，因为标签被禁用了</p>
          </div>
        </ui-tabs-pane>
        <ui-tabs-pane name="3" label="可用标签">
          <div class="border rounded p-4">
            <p>另一个可用标签的内容</p>
          </div>
        </ui-tabs-pane>
      </ui-tabs>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="标签页提供三种不同尺寸：小、默认、大。"
      :code="sizeCode"
    >
      <div class="space-y-8">
        <div>
          <p class="mb-2 text-sm font-medium">
            小尺寸：
          </p>
          <ui-tabs v-model="activeTab" size="small">
            <ui-tabs-pane name="1" label="标签一">
              <div class="border rounded p-2">
                <p>小尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
            <ui-tabs-pane name="2" label="标签二">
              <div class="border rounded p-2">
                <p>小尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
          </ui-tabs>
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            默认尺寸：
          </p>
          <ui-tabs v-model="activeTab">
            <ui-tabs-pane name="1" label="标签一">
              <div class="border rounded p-2">
                <p>默认尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
            <ui-tabs-pane name="2" label="标签二">
              <div class="border rounded p-2">
                <p>默认尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
          </ui-tabs>
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            大尺寸：
          </p>
          <ui-tabs v-model="activeTab" size="large">
            <ui-tabs-pane name="1" label="标签一">
              <div class="border rounded p-2">
                <p>大尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
            <ui-tabs-pane name="2" label="标签二">
              <div class="border rounded p-2">
                <p>大尺寸标签内容</p>
              </div>
            </ui-tabs-pane>
          </ui-tabs>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        Tabs 属性
      </h3>
      <div class="mb-6 overflow-x-auto">
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
                modelValue / v-model
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                绑定值，当前激活的标签
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
                type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签页样式类型
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'line' / 'card' / 'segment'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'line'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                tab-position
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签位置
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'top' / 'right' / 'bottom' / 'left'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'top'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                closable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签是否可关闭
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
                addable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可新增标签
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
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签页大小
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 text-lg font-medium">
        TabsPane 属性
      </h3>
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
                name
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签页标识符
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
                label
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签页显示标题
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
                disabled
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否禁用标签
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
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签图标
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
