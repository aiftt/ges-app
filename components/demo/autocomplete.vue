<script setup lang="ts" name="DemoAutocomplete">
/**
 * 自动完成输入框组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 定义选项类型
type OptionValue = string | number
interface Option {
  value: OptionValue
  label: string
  disabled?: boolean
  [key: string]: any
}

// 初始化logger
const logger = useLogger('DemoAutocomplete')

// 基础演示数据
const basicValue = ref('')
const basicOptions = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

// 分组选项
const groupedOptions = [
  {
    label: '分组1',
    options: [
      { value: 'group1-1', label: '分组1选项1' },
      { value: 'group1-2', label: '分组1选项2' },
    ],
  },
  {
    label: '分组2',
    options: [
      { value: 'group2-1', label: '分组2选项1' },
      { value: 'group2-2', label: '分组2选项2' },
    ],
  },
]

// 远程搜索
const remoteValue = ref('')
const remoteOptions = ref<Option[]>([])
const remoteLoading = ref(false)

// 模拟远程搜索
async function searchRemote(query: string): Promise<Option[]> {
  if (!query) {
    remoteOptions.value = []
    return []
  }

  remoteLoading.value = true
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    const results: Option[] = [
      { value: `remote-${query}-1`, label: `${query}的搜索结果1` },
      { value: `remote-${query}-2`, label: `${query}的搜索结果2` },
      { value: `remote-${query}-3`, label: `${query}的搜索结果3` },
    ]

    remoteOptions.value = results
    return results
  }
  catch (error) {
    logger.error('远程搜索失败:', error)
    return []
  }
  finally {
    remoteLoading.value = false
  }
}

// 自定义选项过滤
const customFilterValue = ref('')
function customFilterMethod(query: string, option: Option): boolean {
  // 仅匹配以查询开头的选项
  return option.label.toLowerCase().startsWith(query.toLowerCase())
}

// 可创建新选项
const createOptionsValue = ref('')
const createOptions = ref([
  { value: 'create1', label: '可创建选项1' },
  { value: 'create2', label: '可创建选项2' },
])

// 注意：由于尺寸示例中我们使用了硬编码的尺寸值，不再需要sizes变量

// 示例代码字符串
const basicCode = `<template>
  <ui-input-autocomplete
    v-model="value"
    placeholder="请输入内容"
    :options="options"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
<\/script>`

const sizeCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div>
      <div class="mb-2 text-sm font-medium">Small</div>
      <ui-input-autocomplete
        placeholder="请输入内容"
        size="small"
        :options="options"
      />
    </div>

    <div>
      <div class="mb-2 text-sm font-medium">Default</div>
      <ui-input-autocomplete
        placeholder="请输入内容"
        size="default"
        :options="options"
      />
    </div>

    <div>
      <div class="mb-2 text-sm font-medium">Large</div>
      <ui-input-autocomplete
        placeholder="请输入内容"
        size="large"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup>
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
<\/script>`

const groupCode = `<template>
  <ui-input-autocomplete
    placeholder="请选择一个分组选项"
    :groups="groupedOptions"
  />
</template>

<script setup>
import { ref } from 'vue'

const groupedOptions = [
  {
    label: '分组1',
    options: [
      { value: 'group1-1', label: '分组1选项1' },
      { value: 'group1-2', label: '分组1选项2' },
    ],
  },
  {
    label: '分组2',
    options: [
      { value: 'group2-1', label: '分组2选项1' },
      { value: 'group2-2', label: '分组2选项2' },
    ],
  },
]
<\/script>`

const remoteCode = `<template>
  <ui-input-autocomplete
    v-model="value"
    placeholder="输入关键词进行搜索"
    :options="options"
    :loading="loading"
    remote
    :remote-method="searchRemote"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([])
const loading = ref(false)

async function searchRemote(query) {
  if (!query) {
    options.value = []
    return []
  }

  loading.value = true
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    const results = [
      { value: \`remote-\${query}-1\`, label: \`\${query}的搜索结果1\` },
      { value: \`remote-\${query}-2\`, label: \`\${query}的搜索结果2\` },
      { value: \`remote-\${query}-3\`, label: \`\${query}的搜索结果3\` },
    ]

    options.value = results
    return results
  }
  finally {
    loading.value = false
  }
}
<\/script>`

const filterCode = `<template>
  <ui-input-autocomplete
    v-model="value"
    placeholder="仅匹配选项开头的输入"
    :options="options"
    :filter-method="customFilterMethod"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

function customFilterMethod(query, option) {
  // 仅匹配以查询开头的选项
  return option.label.toLowerCase().startsWith(query.toLowerCase())
}
<\/script>`

const createCode = `<template>
  <ui-input-autocomplete
    v-model="value"
    placeholder="可创建新选项"
    :options="options"
    allow-create
    create-text="创建新选项: {query}"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'create1', label: '可创建选项1' },
  { value: 'create2', label: '可创建选项2' },
])
<\/script>`

const disabledCode = `<template>
  <ui-input-autocomplete
    placeholder="禁用状态"
    :options="options"
    disabled
  />
</template>

<script setup>
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
<\/script>`

const errorCode = `<template>
  <ui-input-autocomplete
    placeholder="错误状态"
    :options="options"
    error
    error-message="请输入有效的内容"
  />
</template>

<script setup>
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
<\/script>`

const customCode = `<template>
  <ui-input-autocomplete
    placeholder="自定义样式"
    :options="options"
    border-color="#1890ff"
    bg-color="#f0f8ff"
    text-color="#0050b3"
  />
</template>

<script setup>
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Autocomplete 自动完成输入框
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      自动完成输入框组件根据用户的输入自动筛选或从远程获取匹配的选项。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的自动完成功能，根据用户输入过滤展示匹配选项。"
      :code="basicCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          v-model="basicValue"
          placeholder="请输入内容"
          :options="basicOptions"
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        当前值: {{ basicValue }}
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种不同尺寸：small、default、large。"
      :code="sizeCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <div class="mb-2 text-sm font-medium dark:text-gray-300">
            Small
          </div>
          <ui-input-autocomplete
            placeholder="请输入内容"
            size="small"
            :options="basicOptions"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium dark:text-gray-300">
            Default
          </div>
          <ui-input-autocomplete
            placeholder="请输入内容"
            size="default"
            :options="basicOptions"
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium dark:text-gray-300">
            Large
          </div>
          <ui-input-autocomplete
            placeholder="请输入内容"
            size="large"
            :options="basicOptions"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 选项分组 -->
    <ui-demo
      title="选项分组"
      description="选项可以按照分组显示，便于分类浏览。"
      :code="groupCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          placeholder="请选择一个分组选项"
          :groups="groupedOptions"
        />
      </div>
    </ui-demo>

    <!-- 远程搜索 -->
    <ui-demo
      title="远程搜索"
      description="从服务器获取匹配的数据源，适用于大数据量的场景。"
      :code="remoteCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          v-model="remoteValue"
          placeholder="输入关键词进行搜索"
          :options="remoteOptions"
          :loading="remoteLoading"
          remote
          :remote-method="searchRemote"
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        输入关键词后将从服务器获取匹配的选项
      </div>
    </ui-demo>

    <!-- 自定义过滤方法 -->
    <ui-demo
      title="自定义过滤方法"
      description="可以自定义如何根据输入内容过滤选项。"
      :code="filterCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          v-model="customFilterValue"
          placeholder="仅匹配选项开头的输入"
          :options="basicOptions"
          :filter-method="customFilterMethod"
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        此示例只会匹配以输入内容开头的选项
      </div>
    </ui-demo>

    <!-- 可创建新选项 -->
    <ui-demo
      title="可创建新选项"
      description="当输入的内容不在选项中时，可以创建新的选项。"
      :code="createCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          v-model="createOptionsValue"
          placeholder="可创建新选项"
          :options="createOptions"
          allow-create
          create-text="创建新选项: {query}"
        />
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="输入框的禁用状态。"
      :code="disabledCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          placeholder="禁用状态"
          :options="basicOptions"
          disabled
        />
      </div>
    </ui-demo>

    <!-- 错误状态 -->
    <ui-demo
      title="错误状态"
      description="显示错误信息的输入框。"
      :code="errorCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          placeholder="错误状态"
          :options="basicOptions"
          error
          error-message="请输入有效的内容"
        />
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义输入框的边框颜色、背景色和文字颜色。"
      :code="customCode"
    >
      <div class="max-w-sm">
        <ui-input-autocomplete
          placeholder="自定义样式"
          :options="basicOptions"
          border-color="#1890ff"
          bg-color="#f0f8ff"
          text-color="#0050b3"
        />
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Autocomplete组件的属性、事件和方法。"
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
                modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                options
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选项数组
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                groups
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                分组选项数组
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
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
                占位文本
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
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入框大小
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
                error
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为错误状态
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
                errorMessage
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                错误提示信息
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
                remote
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否使用远程搜索
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
                是否正在加载数据
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
                allowCreate
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否允许创建新选项
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
                createText
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                创建新选项的文本模板
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '创建 "{query}"'
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
                选择选项或输入值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string | number)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                input
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                select
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选择选项时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (option: Option)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                focus
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                获取焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                blur
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                失去焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                create
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                创建新选项时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        方法
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                方法名
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
                focus
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                使输入框获取焦点
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                blur
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                使输入框失去焦点
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-autocomplete {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--ui-color-text);
}

.demo-box {
  padding: 1.5rem;
  border: 1px solid var(--ui-border-color);
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg-light);
}

.demo-value {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: var(--ui-color-bg);
  border-radius: 0.25rem;
  font-family: monospace;
  color: var(--ui-color-text-light);
}

.demo-tip {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--ui-color-text-light);
}

.demo-size-item {
  margin-bottom: 1rem;
}

.demo-size-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--ui-color-text-light);
}
</style>
