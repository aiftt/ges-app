<script setup lang="ts" name="DemoRadio">
/**
 * 单选按钮组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基本单选按钮
const checked = ref(false)

// 禁用状态
const disabledChecked = ref(true)

// 单选按钮组
const selectedFruit = ref('apple')
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]

// 垂直布局
const selectedFramework = ref('vue')
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

// 单选按钮卡片
const selectedCity = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

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
const basicCode = `<ui-radio v-model="checked">选择项</ui-radio>

<script setup>
const checked = ref(false)
<\/script>`

const disabledCode = `<ui-radio disabled>
  未选中禁用
</ui-radio>

<ui-radio
  v-model="disabledChecked"
  disabled
>
  选中禁用
</ui-radio>

<script setup>
const disabledChecked = ref(true)
<\/script>`

const sizeCode = `<ui-radio size="small">
  小尺寸
</ui-radio>

<ui-radio>
  默认尺寸
</ui-radio>

<ui-radio size="large">
  大尺寸
</ui-radio>`

const groupCode = `<ui-radio-group
  v-model="selectedFruit"
  :options="fruitsOptions"
/>

<script setup>
const selectedFruit = ref('apple')
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]
<\/script>`

const verticalCode = `<ui-radio-group
  v-model="selectedFramework"
  :options="frameworkOptions"
  direction="vertical"
/>

<script setup>
const selectedFramework = ref('vue')
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]
<\/script>`

const customCode = `<ui-radio-group v-model="selectedCity" name="city">
  <ui-radio
    v-for="city in cityOptions"
    :key="city.value"
    :value="city.value"
    class="custom-radio-card"
  >
    {{ city.label }}
  </ui-radio>
</ui-radio-group>

<style scoped>
.custom-radio-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.custom-radio-card.ui-radio--checked {
  border-color: var(--ui-color-primary);
  background-color: rgba(16, 185, 129, 0.1);
}
</style>

<script setup>
const selectedCity = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Radio 单选按钮
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      单选按钮组件用于在一组选项中选择一个选项，仅允许用户选择一个选项。
    </p>

    <!-- 基础单选按钮 -->
    <ui-demo
      title="基础用法"
      description="最简单的单选按钮用法。"
      :code="basicCode"
    >
      <div class="space-y-2">
        <ui-radio v-model="checked">
          选择项
        </ui-radio>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ checked }}
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="单选按钮的禁用状态，不可操作。"
      :code="disabledCode"
    >
      <div class="space-y-4">
        <ui-radio disabled>
          未选中禁用
        </ui-radio>
        <ui-radio
          v-model="disabledChecked"
          disabled
        >
          选中禁用
        </ui-radio>
      </div>
    </ui-demo>

    <!-- 尺寸变体 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种尺寸的单选按钮：小、默认、大。"
      :code="sizeCode"
    >
      <div class="space-y-4">
        <ui-radio size="small">
          小尺寸
        </ui-radio>
        <ui-radio>
          默认尺寸
        </ui-radio>
        <ui-radio size="large">
          大尺寸
        </ui-radio>
      </div>
    </ui-demo>

    <!-- 单选按钮组 -->
    <ui-demo
      title="单选按钮组"
      description="使用单选按钮组批量管理多个选项。"
      :code="groupCode"
    >
      <div class="space-y-2">
        <ui-radio-group
          v-model="selectedFruit"
          :options="fruitsOptions"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中值: {{ selectedFruit }}
        </div>
      </div>
    </ui-demo>

    <!-- 垂直布局 -->
    <ui-demo
      title="垂直布局"
      description="以垂直方向排列单选按钮。"
      :code="verticalCode"
    >
      <div class="space-y-2">
        <ui-radio-group
          v-model="selectedFramework"
          :options="frameworkOptions"
          direction="vertical"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中值: {{ selectedFramework }}
        </div>
      </div>
    </ui-demo>

    <!-- 自定义单选按钮 -->
    <ui-demo
      title="自定义样式"
      description="使用自定义样式创建卡片式单选按钮。"
      :code="customCode"
    >
      <div class="space-y-2">
        <ui-radio-group v-model="selectedCity" name="city">
          <div class="flex flex-wrap gap-4">
            <ui-radio
              v-for="city in cityOptions"
              :key="city.value"
              :value="city.value"
              class="custom-radio-card"
            >
              {{ city.label }}
            </ui-radio>
          </div>
        </ui-radio-group>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          选中城市: {{ selectedCity }}
        </div>
      </div>
    </ui-demo>

    <!-- 主题适配 -->
    <ui-demo
      title="主题适配"
      description="单选按钮组件自动适应亮色和暗色主题。"
      code=""
    >
      <div class="space-y-4">
        <ui-button @click="toggleDarkMode">
          切换{{ isDarkMode ? '亮色' : '暗色' }}主题
        </ui-button>
        <div class="mt-4">
          <ui-radio>
            自动适应当前主题
          </ui-radio>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        Radio 属性
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
                单选按钮值，用于在RadioGroup中使用
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
                name
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                原生name属性
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

      <h3 class="mb-2 text-lg font-medium">
        RadioGroup 属性
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
                绑定值
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
                name
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                原生name属性，用于表单提交
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

<style scoped>
.custom-radio-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.custom-radio-card.ui-radio--checked {
  border-color: var(--ui-color-primary, #10b981);
  background-color: rgba(16, 185, 129, 0.1);
}

:root.dark .custom-radio-card {
  border-color: #4b5563;
}

:root.dark .custom-radio-card.ui-radio--checked {
  border-color: var(--ui-color-primary, #10b981);
  background-color: rgba(16, 185, 129, 0.2);
}
</style>
