<script setup lang="ts" name="DemoCheckbox">
/**
 * 复选框组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基本复选框
const checked = ref(false)
const indeterminate = ref(true)

// 禁用状态
const disabledChecked = ref(true)

// 复选框组
const groupValues = ref(['apple', 'orange'])
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]

// 限制选择数量
const limitedValues = ref(['option1'])
const limitedOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
]

// 垂直布局
const verticalValues = ref(['react'])
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

// 全选功能
const allChecked = ref(false)
const allIndeterminate = ref(false)
const cities = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false },
])

// 监听全选变化
function handleCheckAllChange(val: boolean) {
  cities.value.forEach((city) => {
    city.checked = val
  })
  allIndeterminate.value = false
}

// 监听单个城市选择变化
function handleCityChange() {
  const checkedCount = cities.value.filter(city => city.checked).length
  allChecked.value = checkedCount === cities.value.length
  allIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
}

// 主题模式
const isDarkMode = ref(false)

// 切换主题模式
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  const html = document.documentElement

  if (isDarkMode.value) {
    html.classList.add('dark')
  }
  else {
    html.classList.remove('dark')
  }
}

// 代码示例
const basicCode = `<ui-checkbox v-model="checked">选择项</ui-checkbox>

<script setup>
const checked = ref(false)
<\/script>`

const indeterminateCode = `<ui-checkbox
  v-model="checked"
  :indeterminate="indeterminate"
>
  中间状态
</ui-checkbox>

<script setup>
const checked = ref(false)
const indeterminate = ref(true)
<\/script>`

const disabledCode = `<ui-checkbox disabled>
  未选中禁用
</ui-checkbox>

<ui-checkbox
  v-model="disabledChecked"
  disabled
>
  选中禁用
</ui-checkbox>

<script setup>
const disabledChecked = ref(true)
<\/script>`

const sizeCode = `<ui-checkbox size="small">
  小尺寸
</ui-checkbox>

<ui-checkbox>
  默认尺寸
</ui-checkbox>

<ui-checkbox size="large">
  大尺寸
</ui-checkbox>`

const groupCode = `<ui-checkbox-group
  v-model="groupValues"
  :options="fruitsOptions"
/>

<script setup>
const groupValues = ref(['apple', 'orange'])
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]
<\/script>`

const limitedCode = `<ui-checkbox-group
  v-model="limitedValues"
  :options="limitedOptions"
  :min="1"
  :max="2"
/>

<script setup>
const limitedValues = ref(['option1'])
const limitedOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
]
<\/script>`

const verticalCode = `<ui-checkbox-group
  v-model="verticalValues"
  :options="frameworkOptions"
  direction="vertical"
/>

<script setup>
const verticalValues = ref(['react'])
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]
<\/script>`

const checkAllCode = `<ui-checkbox
  v-model="allChecked"
  :indeterminate="allIndeterminate"
  @change="handleCheckAllChange"
>
  全选
</ui-checkbox>

<div class="flex flex-wrap gap-4">
  <ui-checkbox
    v-for="city in cities"
    :key="city.value"
    v-model="city.checked"
    @change="handleCityChange"
  >
    {{ city.label }}
  </ui-checkbox>
</div>

<script setup>
const allChecked = ref(false)
const allIndeterminate = ref(false)
const cities = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false },
])

// 监听全选变化
function handleCheckAllChange(val) {
  cities.value.forEach((city) => {
    city.checked = val
  })
  allIndeterminate.value = false
}

// 监听单个城市选择变化
function handleCityChange() {
  const checkedCount = cities.value.filter(city => city.checked).length
  allChecked.value = checkedCount === cities.value.length
  allIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
}
<\/script>`

const customCode = `<ui-checkbox-group v-model="groupValues">
  <ui-checkbox value="apple">自定义苹果选项</ui-checkbox>
  <ui-checkbox value="banana">自定义香蕉选项</ui-checkbox>
  <ui-checkbox value="orange">自定义橙子选项</ui-checkbox>
</ui-checkbox-group>

<script setup>
const groupValues = ref(['apple', 'banana', 'orange'])
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Checkbox 复选框
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      复选框组件用于在一组数据中进行多选操作，支持单独使用和组合使用两种方式。
    </p>

    <!-- 基础复选框 -->
    <ui-demo
      title="基础用法"
      description="最简单的复选框用法。"
      :code="basicCode"
    >
      <div class="space-y-2">
        <ui-checkbox v-model="checked">
          选项
        </ui-checkbox>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ checked }}
        </div>
      </div>
    </ui-demo>

    <!-- 中间状态 -->
    <ui-demo
      title="中间状态"
      description="复选框的不确定状态，通常用于表示子选项有选中但未全选的情况。"
      :code="indeterminateCode"
    >
      <div class="flex items-center space-x-4">
        <ui-checkbox
          v-model="checked"
          :indeterminate="indeterminate"
        >
          中间状态
        </ui-checkbox>
        <ui-button size="small" @click="indeterminate = !indeterminate">
          {{ indeterminate ? '关闭' : '开启' }}中间态
        </ui-button>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="复选框的禁用状态，不可操作。"
      :code="disabledCode"
    >
      <div class="space-y-4">
        <ui-checkbox disabled>
          未选中禁用
        </ui-checkbox>
        <ui-checkbox
          v-model="disabledChecked"
          disabled
        >
          选中禁用
        </ui-checkbox>
      </div>
    </ui-demo>

    <!-- 尺寸变体 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种尺寸的复选框：小、默认、大。"
      :code="sizeCode"
    >
      <div class="space-y-4">
        <ui-checkbox size="small">
          小尺寸
        </ui-checkbox>
        <ui-checkbox>
          默认尺寸
        </ui-checkbox>
        <ui-checkbox size="large">
          大尺寸
        </ui-checkbox>
      </div>
    </ui-demo>

    <!-- 复选框组 -->
    <ui-demo
      title="复选框组"
      description="使用复选框组批量管理多个选项。"
      :code="groupCode"
    >
      <div class="space-y-2">
        <ui-checkbox-group
          v-model="groupValues"
          :options="fruitsOptions"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中值: {{ groupValues.length ? groupValues.join(', ') : '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 限制选择数量 -->
    <ui-demo
      title="限制选择数量"
      description="设置最小和最大可选数量，超出范围的选择将被禁用。"
      :code="limitedCode"
    >
      <div class="space-y-2">
        <ui-checkbox-group
          v-model="limitedValues"
          :options="limitedOptions"
          :min="1"
          :max="2"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中值: {{ limitedValues.length ? limitedValues.join(', ') : '未选择' }}
          <br>
          限制: 最少1项，最多2项
        </div>
      </div>
    </ui-demo>

    <!-- 垂直布局 -->
    <ui-demo
      title="垂直布局"
      description="以垂直方向排列复选框。"
      :code="verticalCode"
    >
      <div class="space-y-2">
        <ui-checkbox-group
          v-model="verticalValues"
          :options="frameworkOptions"
          direction="vertical"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中值: {{ verticalValues.length ? verticalValues.join(', ') : '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 全选功能 -->
    <ui-demo
      title="全选功能"
      description="实现全选和部分选中的交互效果。"
      :code="checkAllCode"
    >
      <div class="space-y-4">
        <ui-checkbox
          v-model="allChecked"
          :indeterminate="allIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </ui-checkbox>
        <div class="flex flex-wrap gap-4">
          <ui-checkbox
            v-for="city in cities"
            :key="city.value"
            v-model="city.checked"
            @change="handleCityChange"
          >
            {{ city.label }}
          </ui-checkbox>
        </div>
      </div>
    </ui-demo>

    <!-- 主题适配 -->
    <ui-demo
      title="主题适配"
      description="复选框组件自动适应亮色和暗色主题。"
      code=""
    >
      <div class="space-y-4">
        <ui-button @click="toggleDarkMode">
          切换{{ isDarkMode ? '亮色' : '暗色' }}主题
        </ui-button>
        <div class="mt-4">
          <ui-checkbox>
            自动适应当前主题
          </ui-checkbox>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义选项 -->
    <ui-demo
      title="使用插槽自定义"
      description="使用子元素模式自定义复选框组选项。"
      :code="customCode"
    >
      <ui-checkbox-group v-model="groupValues">
        <ui-checkbox value="apple">
          自定义苹果选项
        </ui-checkbox>
        <ui-checkbox value="banana">
          自定义香蕉选项
        </ui-checkbox>
        <ui-checkbox value="orange">
          自定义橙子选项
        </ui-checkbox>
      </ui-checkbox-group>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        Checkbox 属性
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
                绑定值
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
                value
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                选项值，用于在CheckboxGroup中使用
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string / number
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
                是否禁用
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
                尺寸
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                indeterminate
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否为中间状态
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

      <h3 class="mb-2 text-lg font-medium">
        CheckboxGroup 属性
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
                modelValue / v-model
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                绑定值数组
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (string | number)[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                options
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                可选项数组
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                Array&lt;{label, value, disabled?}&gt;
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                disabled
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否禁用
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
                direction
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                排列方向
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'horizontal' / 'vertical'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'horizontal'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                min
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                可选的最小数量
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                max
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                可选的最大数量
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                Infinity
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-checkbox {
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
  margin-bottom: 16px;
}

.cities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.demo-value {
  margin-top: 8px;
  font-size: 14px;
  color: #6b7280;
}

.demo-button {
  display: inline-block;
  margin-top: 8px;
  margin-left: 16px;
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
