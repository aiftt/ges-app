<script setup lang="ts" name="DemoMention">
/**
 * Mention 组件演示
 * 创建日期: 2024-09-01
 * 作者: Claude
 */
import { ref } from 'vue'

// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { value: 'charlie', label: '查理', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { value: 'diana', label: '黛安娜', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { value: 'edward', label: '爱德华', avatar: 'https://randomuser.me/api/portraits/men/20.jpg' },
  { value: 'fiona', label: '菲奥娜', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { value: 'george', label: '乔治', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { value: 'helen', label: '海伦', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
]

// 绑定的输入值
const inputValue = ref('')
const multilineValue = ref('')
const customPrefixValue = ref('')

// 处理选中事件
function handleSelect(option: any) {
  logger.info('选择了用户', option)
}

// 自定义筛选方法
function customFilter(query: string, option: any) {
  return option.label.toLowerCase().includes(query.toLowerCase())
}
</script>

<template>
  <div class="demo-mention-container">
    <h2 class="mb-4 text-xl font-bold">
      Mention 提及组件
    </h2>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        基础用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        在输入框中键入 @ 符号触发用户提及功能。
      </p>

      <div class="mb-4">
        <ui-mention
          v-model="inputValue"
          :options="users"
          placeholder="输入 @ 提及用户"
          @select="handleSelect"
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ inputValue }}
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        多行输入
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持多行文本输入，适用于评论区等场景。
      </p>

      <div class="mb-4">
        <ui-mention
          v-model="multilineValue"
          :options="users"
          placeholder="输入多行文本并使用 @ 提及用户"
          multiline
        />
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        自定义前缀
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以自定义触发提及的字符，例如使用 # 标签。
      </p>

      <div class="mb-4">
        <ui-mention
          v-model="customPrefixValue"
          :options="users"
          prefix="#"
          placeholder="输入 # 提及用户"
        />
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        禁用状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        禁用的提及组件。
      </p>

      <div class="mb-4">
        <ui-mention
          :options="users"
          placeholder="禁用状态"
          disabled
        />
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        自定义筛选
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用自定义筛选逻辑。
      </p>

      <div class="mb-4">
        <ui-mention
          :options="users"
          :filter-method="customFilter"
          placeholder="仅按名称筛选"
        />
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">
        弹出层位置
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以设置弹出层在顶部或底部显示。
      </p>

      <div class="mb-4">
        <ui-mention
          :options="users"
          placement="top"
          placeholder="弹出层在顶部显示"
        />
      </div>
    </div>

    <div class="mt-8 border border-gray-200 rounded bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-2 text-lg font-medium">
        属性说明
      </h3>
      <ul class="ml-6 list-disc text-sm space-y-2">
        <li><code>modelValue</code>: 文本框中的值</li>
        <li><code>prefix</code>: 提及字符前缀，默认为 @</li>
        <li><code>options</code>: 提及选项列表</li>
        <li><code>placeholder</code>: 占位符文本</li>
        <li><code>disabled</code>: 是否禁用</li>
        <li><code>scrollable</code>: 是否可滚动，默认为 true</li>
        <li><code>filterMethod</code>: 自定义筛选方法</li>
        <li><code>maxLength</code>: 最大输入长度</li>
        <li><code>placement</code>: 弹出层位置，可选 'bottom' 或 'top'</li>
        <li><code>autoTransform</code>: 在键入时自动转换为提及样式，默认为 true</li>
        <li><code>maxHeight</code>: 弹出层最大高度</li>
        <li><code>multiline</code>: 是否支持多行输入，默认为 false</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-mention-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
