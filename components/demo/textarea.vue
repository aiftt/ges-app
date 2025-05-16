<script setup lang="ts" name="DemoTextarea">
/**
 * 文本域组件演示
 * 创建日期: 2023-06-12
 * 作者: aiftt
 * 更新日期: 2023-06-12 - 初始实现
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基本文本域
const basicTextarea = ref('')
const disabledTextarea = ref('禁用状态')
const readonlyTextarea = ref('只读状态')
const errorTextarea = ref('')

// 自动调整大小
const autosizeTextarea = ref('这是一个可以自动调整高度的文本域\n可以根据内容自动增加高度\n试试输入更多的内容...')
const fixedHeightTextarea = ref('这是一个固定高度的文本域，不会根据内容自动调整高度。')

// 显示字数统计
const countTextarea = ref('这是一个带字数统计的文本域')
const maxlengthTextarea = ref('')

// 自定义样式
const useCustomStyle = ref(false)
const borderColor = ref('#6366f1')
const bgColor = ref('#eef2ff')
const textColor = ref('#4338ca')

// 清除功能
const clearableTextarea = ref('可清除内容')

// 错误状态
const isError = ref(true)

// 切换错误状态
function toggleError() {
  isError.value = !isError.value
}

// 主题模式
const isDarkMode = ref(false)

// 切换主题模式
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  const html = document.documentElement

  if (isDarkMode.value) {
    html.classList.add('dark')
    html.dataset.codeTheme = 'github-dark'
  }
  else {
    html.classList.remove('dark')
    html.dataset.codeTheme = 'github'
  }
}

// 示例代码字符串
const basicCode = `<template>
  <ui-textarea
    v-model="value"
    placeholder="请输入内容"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
<\/script>`

const statesCode = `<template>
  <!-- 禁用状态 -->
  <ui-textarea
    v-model="disabledText"
    disabled
    placeholder="禁用状态"
  />

  <!-- 只读状态 -->
  <ui-textarea
    v-model="readonlyText"
    readonly
    placeholder="只读状态"
  />

  <!-- 错误状态 -->
  <ui-textarea
    v-model="errorText"
    :error="isError"
    error-message="输入内容不符合要求"
    placeholder="错误状态"
  />
</template>

<script setup>
import { ref } from 'vue'

const disabledText = ref('禁用状态')
const readonlyText = ref('只读状态')
const errorText = ref('')
const isError = ref(true)

function toggleError() {
  isError.value = !isError.value
}
<\/script>`

const autosizeCode = `<template>
  <!-- 自动调整高度 -->
  <ui-textarea
    v-model="autoText"
    :min-rows="2"
    :max-rows="6"
    autosize
    placeholder="可自动调整高度的文本域"
  />

  <!-- 固定高度 -->
  <ui-textarea
    v-model="fixedText"
    :autosize="false"
    placeholder="固定高度的文本域"
  />
</template>

<script setup>
import { ref } from 'vue'

const autoText = ref('这是一个可以自动调整高度的文本域\\n可以根据内容自动增加高度\\n试试输入更多的内容...')
const fixedText = ref('这是一个固定高度的文本域，不会根据内容自动调整高度。')
<\/script>`

const countCode = `<template>
  <!-- 显示字数统计 -->
  <ui-textarea
    v-model="countText"
    show-count
    placeholder="显示字数统计"
  />

  <!-- 最大字数限制 -->
  <ui-textarea
    v-model="maxlengthText"
    show-count
    :maxlength="100"
    placeholder="最大输入100个字符"
  />
</template>

<script setup>
import { ref } from 'vue'

const countText = ref('这是一个带字数统计的文本域')
const maxlengthText = ref('')
<\/script>`

const clearableCode = `<template>
  <ui-textarea
    v-model="clearableText"
    clearable
    placeholder="输入内容后可清除"
  />
</template>

<script setup>
import { ref } from 'vue'

const clearableText = ref('可清除内容')
<\/script>`

const customStyleCode = `<template>
  <ui-textarea
    placeholder="自定义样式文本域"
    :border-color="borderColor"
    :bg-color="bgColor"
    :text-color="textColor"
  />
</template>

<script setup>
import { ref } from 'vue'

// 自定义样式
const borderColor = ref('#6366f1')
const bgColor = ref('#eef2ff')
const textColor = ref('#4338ca')
<\/script>`

const themeCode = `<template>
  <ui-textarea
    placeholder="自动适应当前主题"
  />
</template>`
</script>

<template>
  <div class="mx-auto max-w-4xl px-4">
    <h1 class="mb-6 text-2xl font-bold">
      Textarea 文本域
    </h1>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      文本域组件用于输入多行文本内容，支持自动调整高度、字数统计、错误状态和主题适配。
    </p>

    <!-- 基础文本域 -->
    <ui-demo
      title="基础文本域"
      description="基本的文本域组件，用于输入多行文本内容。"
      :code="basicCode"
    >
      <div class="space-y-2">
        <ui-textarea
          v-model="basicTextarea"
          placeholder="请输入内容"
        />
        <div class="text-sm text-gray-500 dark:text-gray-400">
          值: {{ basicTextarea }}
        </div>
      </div>
    </ui-demo>

    <!-- 状态变体 -->
    <ui-demo
      title="状态变体"
      description="文本域的不同状态：禁用、只读和错误状态。"
      :code="statesCode"
    >
      <div class="space-y-4">
        <div>
          <ui-textarea
            v-model="disabledTextarea"
            disabled
            placeholder="禁用状态"
          />
        </div>

        <div>
          <ui-textarea
            v-model="readonlyTextarea"
            readonly
            placeholder="只读状态"
          />
        </div>

        <div class="space-y-2">
          <ui-textarea
            v-model="errorTextarea"
            :error="isError"
            error-message="输入内容不符合要求"
            placeholder="错误状态"
          />
          <button
            class="rounded bg-primary-500 px-4 py-2 text-white dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700"
            @click="toggleError"
          >
            切换错误状态
          </button>
        </div>
      </div>
    </ui-demo>

    <!-- 自动调整大小 -->
    <ui-demo
      title="自动调整大小"
      description="文本域可以根据内容自动调整高度，或者保持固定高度。"
      :code="autosizeCode"
    >
      <div class="space-y-4">
        <div>
          <ui-textarea
            v-model="autosizeTextarea"
            :min-rows="2"
            :max-rows="6"
            autosize
            placeholder="可自动调整高度的文本域"
          />
        </div>

        <div>
          <ui-textarea
            v-model="fixedHeightTextarea"
            :autosize="false"
            placeholder="固定高度的文本域"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 字数统计 -->
    <ui-demo
      title="字数统计"
      description="显示字数统计和最大字数限制。"
      :code="countCode"
    >
      <div class="space-y-4">
        <div>
          <ui-textarea
            v-model="countTextarea"
            show-count
            placeholder="显示字数统计"
          />
        </div>

        <div>
          <ui-textarea
            v-model="maxlengthTextarea"
            show-count
            :maxlength="100"
            placeholder="最大输入100个字符"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 可清除文本域 -->
    <ui-demo
      title="可清除文本域"
      description="可以使用清除按钮快速清空文本域内容。"
      :code="clearableCode"
    >
      <div class="space-y-2">
        <ui-textarea
          v-model="clearableTextarea"
          clearable
          placeholder="输入内容后可清除"
        />
        <div class="text-sm text-gray-500 dark:text-gray-400">
          值: {{ clearableTextarea }}
        </div>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义文本域的边框颜色、背景颜色和文本颜色。"
      :code="customStyleCode"
    >
      <div class="space-y-4">
        <div class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          <div class="mb-4">
            <label class="flex items-center">
              <input v-model="useCustomStyle" type="checkbox" class="mr-2">
              <span>启用自定义样式</span>
            </label>
          </div>

          <div v-if="useCustomStyle" class="grid grid-cols-1 mb-4 gap-4 sm:grid-cols-3">
            <div class="flex items-center">
              <label class="mr-2">边框颜色：</label>
              <input v-model="borderColor" type="color" class="h-8 w-16">
            </div>

            <div class="flex items-center">
              <label class="mr-2">背景颜色：</label>
              <input v-model="bgColor" type="color" class="h-8 w-16">
            </div>

            <div class="flex items-center">
              <label class="mr-2">文本颜色：</label>
              <input v-model="textColor" type="color" class="h-8 w-16">
            </div>
          </div>
        </div>

        <ui-textarea
          placeholder="自定义样式文本域"
          :border-color="useCustomStyle ? borderColor : undefined"
          :bg-color="useCustomStyle ? bgColor : undefined"
          :text-color="useCustomStyle ? textColor : undefined"
        />
      </div>
    </ui-demo>

    <!-- 主题适配 -->
    <ui-demo
      title="主题适配"
      description="文本域组件会自动适应当前的主题模式。"
      :code="themeCode"
    >
      <div class="space-y-4">
        <button
          class="rounded bg-primary-500 px-4 py-2 text-white dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700"
          @click="toggleDarkMode"
        >
          切换{{ isDarkMode ? '亮色' : '暗色' }}主题
        </button>

        <ui-textarea placeholder="自动适应当前主题" />
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <section class="mt-10">
      <h2 class="mb-4 text-xl font-semibold">
        API 参考
      </h2>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                属性名
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                类型
              </th>
              <th class="px-4 py-2 text-left">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                modelValue / v-model
              </td>
              <td class="px-4 py-2">
                文本域绑定值
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                ''
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                placeholder
              </td>
              <td class="px-4 py-2">
                占位文本
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                ''
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                disabled
              </td>
              <td class="px-4 py-2">
                是否禁用
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                readonly
              </td>
              <td class="px-4 py-2">
                是否只读
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                minRows
              </td>
              <td class="px-4 py-2">
                最小行数
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                2
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                maxRows
              </td>
              <td class="px-4 py-2">
                最大行数
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                6
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                autosize
              </td>
              <td class="px-4 py-2">
                是否自动调整高度
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                true
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                clearable
              </td>
              <td class="px-4 py-2">
                是否显示清除按钮
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                showCount
              </td>
              <td class="px-4 py-2">
                是否显示字数统计
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                maxlength
              </td>
              <td class="px-4 py-2">
                最大输入长度
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                error
              </td>
              <td class="px-4 py-2">
                是否为错误状态
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                errorMessage
              </td>
              <td class="px-4 py-2">
                错误提示信息
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                autofocus
              </td>
              <td class="px-4 py-2">
                是否自动获取焦点
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                borderColor
              </td>
              <td class="px-4 py-2">
                自定义边框颜色
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                bgColor
              </td>
              <td class="px-4 py-2">
                自定义背景颜色
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                textColor
              </td>
              <td class="px-4 py-2">
                自定义文本颜色
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h3>
      <div class="overflow-x-auto">
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
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                update:modelValue
              </td>
              <td class="px-4 py-2">
                输入值变化时触发
              </td>
              <td class="px-4 py-2">
                (value: string)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                focus
              </td>
              <td class="px-4 py-2">
                获取焦点时触发
              </td>
              <td class="px-4 py-2">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                blur
              </td>
              <td class="px-4 py-2">
                失去焦点时触发
              </td>
              <td class="px-4 py-2">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                change
              </td>
              <td class="px-4 py-2">
                值变化且失去焦点时触发
              </td>
              <td class="px-4 py-2">
                (value: string)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                input
              </td>
              <td class="px-4 py-2">
                输入值变化时触发
              </td>
              <td class="px-4 py-2">
                (value: string)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                clear
              </td>
              <td class="px-4 py-2">
                点击清除按钮时触发
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        方法
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                方法名
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
                focus
              </td>
              <td class="px-4 py-2">
                使文本域获取焦点
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                blur
              </td>
              <td class="px-4 py-2">
                使文本域失去焦点
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
