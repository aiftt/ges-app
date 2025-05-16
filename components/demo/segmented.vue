<script setup lang="ts" name="DemoSegmented">
/**
 * 分段控制器组件演示
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-01 - 初始实现
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

// 基础示例
const basicValue = ref('daily')
const basicOptions = [
  { label: '日', value: 'daily' },
  { label: '周', value: 'weekly' },
  { label: '月', value: 'monthly' },
  { label: '年', value: 'yearly' },
]

// 带图标示例
const iconValue = ref('list')
const iconOptions = [
  { label: '列表', value: 'list', icon: 'carbon:list-boxes' },
  { label: '网格', value: 'grid', icon: 'carbon:grid' },
  { label: '卡片', value: 'card', icon: 'carbon:carbon-for-ibm-product' },
]

// 尺寸示例
const sizeValue = ref('default')
type SegmentSize = 'small' | 'default' | 'large'
const segmentSizes: SegmentSize[] = ['small', 'default', 'large']

// 禁用示例
const disabledValue = ref('option1')
const disabledOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2', disabled: true },
  { label: '选项3', value: 'option3' },
]

// 可取消选中示例
const cancelableValue = ref('a')

// 圆角示例
const roundedValue = ref('circle')

// 块级示例
const blockValue = ref('left')
const blockOptions = [
  { label: '左对齐', value: 'left', icon: 'carbon:align-horizontal-left' },
  { label: '居中', value: 'center', icon: 'carbon:align-horizontal-center' },
  { label: '右对齐', value: 'right', icon: 'carbon:align-horizontal-right' },
]

// 加载示例
const loadingValue = ref('loading')
const isLoading = ref(false)

function toggleLoading() {
  isLoading.value = !isLoading.value

  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}

// 示例代码
const basicCode = `<ui-segmented
  v-model="basicValue"
  :options="basicOptions"
/>

<script setup>
const basicValue = ref('daily')
const basicOptions = [
  { label: '日', value: 'daily' },
  { label: '周', value: 'weekly' },
  { label: '月', value: 'monthly' },
  { label: '年', value: 'yearly' },
]
<\/script>`

const iconCode = `<ui-segmented
  v-model="iconValue"
  :options="iconOptions"
/>

<script setup>
const iconValue = ref('list')
const iconOptions = [
  { label: '列表', value: 'list', icon: 'carbon:list-boxes' },
  { label: '网格', value: 'grid', icon: 'carbon:grid' },
  { label: '卡片', value: 'card', icon: 'carbon:carbon-for-ibm-product' },
]
<\/script>`

const sizeCode = `<div class="space-y-4">
  <div v-for="(sz, index) in segmentSizes" :key="index" class="flex items-center">
    <span class="w-16 text-sm">{{ sz }}:</span>
    <ui-segmented
      v-model="sizeValue"
      :options="basicOptions"
      :size="sz"
    />
  </div>
</div>

<script setup>
const sizeValue = ref('default')
type SegmentSize = 'small' | 'default' | 'large'
const segmentSizes: SegmentSize[] = ['small', 'default', 'large']
<\/script>`

const disabledCode = `<div class="space-y-4">
  <!-- 部分选项禁用 -->
  <ui-segmented
    v-model="disabledValue"
    :options="disabledOptions"
  />

  <!-- 整个组件禁用 -->
  <ui-segmented
    v-model="disabledValue"
    :options="basicOptions"
    disabled
  />
</div>

<script setup>
const disabledValue = ref('option1')
const disabledOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2', disabled: true },
  { label: '选项3', value: 'option3' },
]
<\/script>`

const cancelableCode = `<ui-segmented
  v-model="cancelableValue"
  :options="['a', 'b', 'c']"
  allow-empty
/>

<script setup>
const cancelableValue = ref('a')
<\/script>`

const roundedCode = `<ui-segmented
  v-model="roundedValue"
  :options="[
    { label: '默认', value: 'default' },
    { label: '圆形', value: 'circle' },
  ]"
  rounded
/>`

const blockCode = `<ui-segmented
  v-model="blockValue"
  :options="blockOptions"
  block
/>

<script setup>
const blockValue = ref('left')
const blockOptions = [
  { label: '左对齐', value: 'left', icon: 'carbon:align-horizontal-left' },
  { label: '居中', value: 'center', icon: 'carbon:align-horizontal-center' },
  { label: '右对齐', value: 'right', icon: 'carbon:align-horizontal-right' },
]
<\/script>`

const loadingCode = `<div class="space-y-2">
  <ui-segmented
    v-model="loadingValue"
    :options="[
      { label: '加载中', value: 'loading' },
      { label: '完成', value: 'done' },
      { label: '失败', value: 'error' },
    ]"
    :loading="isLoading"
  />
  <ui-button size="small" @click="toggleLoading">
    {{ isLoading ? '取消加载' : '模拟加载' }}
  </ui-button>
</div>

<script setup>
const loadingValue = ref('loading')
const isLoading = ref(false)

function toggleLoading() {
  isLoading.value = !isLoading.value

  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <h2 class="mb-6 text-2xl font-bold">
      Segmented 分段控制器
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      分段控制器组件用于在有限选项间切换，提供直观的视觉反馈和交互方式，常用于切换视图、过滤器和偏好设置等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的分段控制器，使用v-model绑定选中值和options设置选项。"
      :code="basicCode"
    >
      <ui-segmented
        v-model="basicValue"
        :options="basicOptions"
      />
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        当前选中: {{ basicValue }}
      </div>
    </ui-demo>

    <!-- 带图标 -->
    <ui-demo
      title="带图标"
      description="设置选项的icon属性可以在选项中显示图标。"
      :code="iconCode"
    >
      <ui-segmented
        v-model="iconValue"
        :options="iconOptions"
      />
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        当前选中: {{ iconValue }}
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="组件支持small、default、large三种尺寸。"
      :code="sizeCode"
    >
      <div class="space-y-4">
        <div v-for="(sz, index) in segmentSizes" :key="index" class="flex items-center">
          <span class="w-16 text-sm">{{ sz }}:</span>
          <ui-segmented
            v-model="sizeValue"
            :options="basicOptions"
            :size="sz"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="可以禁用整个组件或特定选项。设置选项的disabled属性可禁用单个选项，设置组件的disabled属性可禁用整个组件。"
      :code="disabledCode"
    >
      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            部分选项禁用:
          </p>
          <ui-segmented
            v-model="disabledValue"
            :options="disabledOptions"
          />
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            整个组件禁用:
          </p>
          <ui-segmented
            v-model="disabledValue"
            :options="basicOptions"
            disabled
          />
        </div>
      </div>
    </ui-demo>

    <!-- 可取消选中 -->
    <ui-demo
      title="可取消选中"
      description="设置allow-empty属性允许取消选中，再次点击当前选中项可取消选择。"
      :code="cancelableCode"
    >
      <ui-segmented
        v-model="cancelableValue"
        :options="['a', 'b', 'c']"
        allow-empty
      />
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        当前选中: {{ cancelableValue || '无' }}
      </div>
    </ui-demo>

    <!-- 圆角样式 -->
    <ui-demo
      title="圆角样式"
      description="设置rounded属性使选项卡呈现更圆润的外观。"
      :code="roundedCode"
    >
      <ui-segmented
        v-model="roundedValue"
        :options="[
          { label: '默认', value: 'default' },
          { label: '圆形', value: 'circle' },
        ]"
        rounded
      />
    </ui-demo>

    <!-- 块级布局 -->
    <ui-demo
      title="块级布局"
      description="设置block属性使组件占满父容器宽度，选项宽度平均分配。"
      :code="blockCode"
    >
      <ui-segmented
        v-model="blockValue"
        :options="blockOptions"
        block
      />
    </ui-demo>

    <!-- 加载状态 -->
    <ui-demo
      title="加载状态"
      description="设置loading属性显示加载状态，此时组件不可交互。"
      :code="loadingCode"
    >
      <div class="space-y-2">
        <ui-segmented
          v-model="loadingValue"
          :options="[
            { label: '加载中', value: 'loading' },
            { label: '完成', value: 'done' },
            { label: '失败', value: 'error' },
          ]"
          :loading="isLoading"
        />
        <ui-button size="small" @click="toggleLoading">
          {{ isLoading ? '取消加载' : '模拟加载' }}
        </ui-button>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Segmented 属性
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
            string | number | boolean
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            绑定值
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            options
          </td>
          <td class="px-4 py-2">
            array | string[] | number[]
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            选项数组，可以是简单数组或对象数组
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            size
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            default
          </td>
          <td class="px-4 py-2">
            尺寸，可选值：small / default / large
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
            是否禁用
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            block
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否为块级元素
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            rounded
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否使用圆角样式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            allow-empty
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否允许取消选中状态
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            loading
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示加载状态
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Segmented 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            update:modelValue
          </td>
          <td class="px-4 py-2">
            (value: string | number | boolean)
          </td>
          <td class="px-4 py-2">
            选中值变化时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            change
          </td>
          <td class="px-4 py-2">
            (value: string | number | boolean)
          </td>
          <td class="px-4 py-2">
            选中值变化时触发
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Option 选项配置
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
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            label
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            选项显示文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            value
          </td>
          <td class="px-4 py-2">
            string | number | boolean
          </td>
          <td class="px-4 py-2">
            选项值
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
            选项图标
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
            是否禁用该选项
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
