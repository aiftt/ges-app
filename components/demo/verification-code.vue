<script setup lang="ts" name="DemoVerificationCode">
/**
 * 验证码输入组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoVerificationCode')

// 基础演示数据
const basicValue = ref('')

// 数字类型验证码
const numberValue = ref('')

// 带掩码的验证码
const maskedValue = ref('')

// 自动提交
const autoSubmitValue = ref('')
function handleSubmit(value: string) {
  logger.info('验证码已提交:', value)
}

// 自定义样式
const customValue = ref('')

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const

// 不同长度
const lengths = [4, 6, 8]

// 清空演示
function reset() {
  basicValue.value = ''
  numberValue.value = ''
  maskedValue.value = ''
  autoSubmitValue.value = ''
  customValue.value = ''
}

// 示例代码字符串
const basicCode = `<template>
  <ui-input-verification
    v-model="value"
    placeholder="输入验证码"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
<\/script>`

const lengthsCode = `<template>
  <div class="space-y-4">
    <!-- 4位验证码 -->
    <div>
      <div class="mb-2 text-sm font-medium">4位验证码</div>
      <ui-input-verification :length="4" />
    </div>

    <!-- 6位验证码 -->
    <div>
      <div class="mb-2 text-sm font-medium">6位验证码</div>
      <ui-input-verification :length="6" />
    </div>

    <!-- 8位验证码 -->
    <div>
      <div class="mb-2 text-sm font-medium">8位验证码</div>
      <ui-input-verification :length="8" />
    </div>
  </div>
</template>`

const sizeCode = `<template>
  <div class="space-y-4">
    <!-- 小尺寸 -->
    <div>
      <div class="mb-2 text-sm font-medium">small</div>
      <ui-input-verification size="small" />
    </div>

    <!-- 默认尺寸 -->
    <div>
      <div class="mb-2 text-sm font-medium">default</div>
      <ui-input-verification size="default" />
    </div>

    <!-- 大尺寸 -->
    <div>
      <div class="mb-2 text-sm font-medium">large</div>
      <ui-input-verification size="large" />
    </div>
  </div>
</template>`

const numberCode = `<template>
  <ui-input-verification
    v-model="value"
    type="number"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
<\/script>`

const maskedCode = `<template>
  <ui-input-verification
    v-model="value"
    mask
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
<\/script>`

const autoSubmitCode = `<template>
  <ui-input-verification
    v-model="value"
    auto-submit
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

function handleSubmit(value) {
  console.log('验证码已提交:', value)
}
<\/script>`

const separatorCode = `<template>
  <ui-input-verification
    show-separator
  />
</template>`

const uppercaseCode = `<template>
  <ui-input-verification
    uppercase
  />
</template>`

const disabledCode = `<template>
  <ui-input-verification
    disabled
  />
</template>`

const errorCode = `<template>
  <ui-input-verification
    error
    error-message="验证码错误"
  />
</template>`

const customCode = `<template>
  <ui-input-verification
    v-model="value"
    border-color="#1890ff"
    bg-color="#f0f8ff"
    text-color="#0050b3"
    focus-color="#40a9ff"
    gap="12px"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      VerificationCode 验证码输入
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      验证码输入组件用于接收短信验证码、邀请码等固定位数的字符输入场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的验证码输入框，默认6位字符。"
      :code="basicCode"
    >
      <ui-input-verification
        v-model="basicValue"
        placeholder="输入验证码"
      />
      <div class="mt-4 space-y-2">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ basicValue }}
        </div>
        <button
          class="rounded bg-primary px-4 py-2 text-white transition-opacity hover:opacity-80"
          @click="reset"
        >
          清空所有示例
        </button>
      </div>
    </ui-demo>

    <!-- 不同长度 -->
    <ui-demo
      title="不同位数"
      description="可以设置不同位数的验证码输入框。"
      :code="lengthsCode"
    >
      <div class="space-y-6">
        <div v-for="length in lengths" :key="length" class="space-y-2">
          <div class="text-sm font-medium dark:text-gray-300">
            {{ length }}位验证码
          </div>
          <ui-input-verification :length="length" />
        </div>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种不同尺寸：small、default、large。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div v-for="size in sizes" :key="size" class="space-y-2">
          <div class="text-sm font-medium dark:text-gray-300">
            {{ size }}
          </div>
          <ui-input-verification :size="size" />
        </div>
      </div>
    </ui-demo>

    <!-- 数字类型验证码 -->
    <ui-demo
      title="数字类型验证码"
      description="限制只能输入数字类型的验证码。"
      :code="numberCode"
    >
      <ui-input-verification
        v-model="numberValue"
        type="number"
      />
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        只允许输入数字，尝试输入字母将被过滤
      </div>
    </ui-demo>

    <!-- 带掩码的验证码 -->
    <ui-demo
      title="密码掩码"
      description="使用掩码隐藏输入的内容，适用于密码等敏感信息。"
      :code="maskedCode"
    >
      <ui-input-verification
        v-model="maskedValue"
        mask
      />
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        输入的字符会被掩码隐藏，适用于密码等敏感信息
      </div>
    </ui-demo>

    <!-- 自动提交 -->
    <ui-demo
      title="自动提交"
      description="当输入完所有字符后自动触发提交事件。"
      :code="autoSubmitCode"
    >
      <ui-input-verification
        v-model="autoSubmitValue"
        auto-submit
        @submit="handleSubmit"
      />
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        填写完所有字符后将自动提交，查看控制台输出
      </div>
    </ui-demo>

    <!-- 显示分隔符 -->
    <ui-demo
      title="显示分隔符"
      description="在输入框之间显示分隔符，增加可读性。"
      :code="separatorCode"
    >
      <ui-input-verification
        show-separator
      />
    </ui-demo>

    <!-- 自动大写 -->
    <ui-demo
      title="自动大写"
      description="自动将输入的字母转换为大写字母。"
      :code="uppercaseCode"
    >
      <ui-input-verification
        uppercase
      />
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        输入的字母将自动转为大写
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="验证码输入框的禁用状态。"
      :code="disabledCode"
    >
      <ui-input-verification
        disabled
      />
    </ui-demo>

    <!-- 错误状态 -->
    <ui-demo
      title="错误状态"
      description="显示错误信息的验证码输入框。"
      :code="errorCode"
    >
      <ui-input-verification
        error
        error-message="验证码错误"
      />
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义输入框的边框颜色、背景色、文字颜色和输入框间距。"
      :code="customCode"
    >
      <ui-input-verification
        v-model="customValue"
        border-color="#1890ff"
        bg-color="#f0f8ff"
        text-color="#0050b3"
        focus-color="#40a9ff"
        gap="12px"
      />
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="VerificationCode组件的属性、事件和方法。"
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
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                length
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                验证码长度
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                6
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入框类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'text' / 'number'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'text'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                mask
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否使用掩码
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
                autoSubmit
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否自动提交
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
                uppercase
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否自动大写
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
                showSeparator
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示分隔符
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
                error
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示错误状态
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
                错误提示文本
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
                placeholder
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                占位符
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
                gap
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入框间距
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '8px'
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
                update:modelValue
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
                change
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
                input
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                输入时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string, index: number)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                submit
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                提交验证码时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string)
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
                (index?: number)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clear
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                清空输入值
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
.demo-verification-code {
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

.demo-item {
  margin-bottom: 1.5rem;
}

.demo-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--ui-color-text-light);
}

.demo-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--ui-color-primary);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.demo-button:hover {
  opacity: 0.8;
}
</style>
