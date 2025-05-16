<script setup lang="ts" name="DemoMention">
/**
 * Mention 组件演示
 * 创建日期: 2024-09-01
 * 作者: Claude
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
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

// 示例代码
const basicCode = `<template>
  <ui-mention
    v-model="inputValue"
    :options="users"
    placeholder="输入 @ 提及用户"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { value: 'charlie', label: '查理', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { value: 'diana', label: '黛安娜', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  // 更多用户...
]

const inputValue = ref('')

function handleSelect(option) {
  console.log('选择了用户', option)
}
<\/script>`

const multilineCode = `<template>
  <ui-mention
    v-model="multilineValue"
    :options="users"
    placeholder="输入多行文本并使用 @ 提及用户"
    multiline
  />
</template>

<script setup>
import { ref } from 'vue'

// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  // 更多用户...
]

const multilineValue = ref('')
<\/script>`

const customPrefixCode = `<template>
  <ui-mention
    v-model="customPrefixValue"
    :options="users"
    prefix="#"
    placeholder="输入 # 提及用户"
  />
</template>

<script setup>
import { ref } from 'vue'

// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  // 更多用户...
]

const customPrefixValue = ref('')
<\/script>`

const disabledCode = `<template>
  <ui-mention
    :options="users"
    placeholder="禁用状态"
    disabled
  />
</template>

<script setup>
// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  // 更多用户...
]
<\/script>`

const customFilterCode = `<template>
  <ui-mention
    :options="users"
    :filter-method="customFilter"
    placeholder="仅按名称筛选"
  />
</template>

<script setup>
// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  // 更多用户...
]

// 自定义筛选方法
function customFilter(query, option) {
  return option.label.toLowerCase().includes(query.toLowerCase())
}
<\/script>`

const placementCode = `<template>
  <ui-mention
    :options="users"
    placement="top"
    placeholder="弹出层在顶部显示"
  />
</template>

<script setup>
// 用户列表数据
const users = [
  { value: 'alice', label: '爱丽丝', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { value: 'bob', label: '鲍勃', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  // 更多用户...
]
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Mention 提及组件
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      提及组件允许用户在输入框中通过特定字符（如@）触发用户选择，常用于评论、消息输入等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="在输入框中键入 @ 符号触发用户提及功能。"
      :code="basicCode"
    >
      <div class="mb-4">
        <ui-mention
          v-model="inputValue"
          :options="users"
          placeholder="输入 @ 提及用户"
          @select="handleSelect"
        />
        <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          当前值: {{ inputValue }}
        </div>
      </div>
    </ui-demo>

    <!-- 多行输入 -->
    <ui-demo
      title="多行输入"
      description="支持多行文本输入，适用于评论区等场景。"
      :code="multilineCode"
    >
      <div class="mb-4">
        <ui-mention
          v-model="multilineValue"
          :options="users"
          placeholder="输入多行文本并使用 @ 提及用户"
          multiline
        />
      </div>
    </ui-demo>

    <!-- 自定义前缀 -->
    <ui-demo
      title="自定义前缀"
      description="可以自定义触发提及的字符，例如使用 # 标签。"
      :code="customPrefixCode"
    >
      <div class="mb-4">
        <ui-mention
          v-model="customPrefixValue"
          :options="users"
          prefix="#"
          placeholder="输入 # 提及用户"
        />
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="禁用状态的提及组件不可交互。"
      :code="disabledCode"
    >
      <div class="mb-4">
        <ui-mention
          :options="users"
          placeholder="禁用状态"
          disabled
        />
      </div>
    </ui-demo>

    <!-- 自定义筛选 -->
    <ui-demo
      title="自定义筛选"
      description="使用自定义筛选逻辑过滤可选项，这里只按名称筛选。"
      :code="customFilterCode"
    >
      <div class="mb-4">
        <ui-mention
          :options="users"
          :filter-method="customFilter"
          placeholder="仅按名称筛选"
        />
      </div>
    </ui-demo>

    <!-- 弹出层位置 -->
    <ui-demo
      title="弹出层位置"
      description="可以设置弹出层在顶部或底部显示。"
      :code="placementCode"
    >
      <div class="mb-4">
        <ui-mention
          :options="users"
          placement="top"
          placeholder="弹出层在顶部显示"
        />
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <ui-demo
      title="API 参考"
      description="Mention 组件的属性、事件和方法。"
      :show-code="false"
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
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
                modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本框中的值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                prefix
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                提及字符前缀
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                @
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                options
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                提及选项列表
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                IMentionOption[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placeholder
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                占位符文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
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
                filterMethod
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义筛选方法
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                Function
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                默认筛选方法
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                maxLength
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最大输入长度
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placement
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                弹出层位置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'bottom' | 'top'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                bottom
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                multiline
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否支持多行输入
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
                maxHeight
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                弹出层最大高度
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                300px
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                autoTransform
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                在键入时自动转换为提及样式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
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
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                select
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选择提及选项时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                option: IMentionOption
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                focus
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入框获得焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                event: FocusEvent
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                blur
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入框失去焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                event: FocusEvent
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-mention-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
