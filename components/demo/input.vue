<script setup lang="ts" name="DemoInput">
/**
 * 输入框组件演示
 * 创建日期: 2023-06-10
 * 作者: aiftt
 * 更新日期: 2025-05-10 - 添加更多表单功能和SSR兼容性的演示
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基本输入框
const basicInput = ref('')
const passwordInput = ref('')
const disabledInput = ref('禁用状态')
const readonlyInput = ref('只读状态')
const errorInput = ref('')

// 大小变体
const smallInput = ref('')
const defaultInput = ref('')
const largeInput = ref('')

// 带图标输入框
const searchInput = ref('')
const userInput = ref('')

// 自定义样式
const useCustomStyle = ref(false)
const borderColor = ref('#6366f1')
const bgColor = ref('#eef2ff')
const textColor = ref('#4338ca')

// 清除功能
const clearableInput = ref('可清除内容')

// 错误状态
const isError = ref(true)

// 键盘事件
const keyEventValue = ref('')
const lastKeyEvent = ref('无')

// 输入模式
const numericInput = ref('')
const telInput = ref('')
const emailInput = ref('')

// 切换错误状态
function toggleError() {
  isError.value = !isError.value
}

// 键盘事件处理
function handleKeyDown(event: KeyboardEvent) {
  lastKeyEvent.value = `keydown: ${event.key}`
}

function handleKeyUp(event: KeyboardEvent) {
  lastKeyEvent.value = `keyup: ${event.key}`
}

function handleKeyPress(event: KeyboardEvent) {
  lastKeyEvent.value = `keypress: ${event.key}`
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

// 示例代码片段
const basicInputCode = '<ui-input v-model="value" placeholder="请输入内容" />'

const typesInputCode = '<ui-input v-model="password" type="password" placeholder="请输入密码" />'

const statesInputCode = `<ui-input disabled placeholder="禁用状态" />

<ui-input readonly placeholder="只读状态" />

<ui-input
  :error="isError"
  error-message="输入内容不符合要求"
  placeholder="错误状态"
/>

<script setup>
const isError = ref(true)

function toggleError() {
  isError.value = !isError.value
}
<\/script>`

const sizesInputCode = `<ui-input size="small" placeholder="小尺寸输入框" />

<ui-input placeholder="默认尺寸输入框" />

<ui-input size="large" placeholder="大尺寸输入框" />`

const iconInputCode = `<ui-input prefix-icon="carbon:search" placeholder="搜索内容" />

<ui-input
  prefix-icon="carbon:user"
  suffix-icon="carbon:checkmark"
  placeholder="用户名"
/>`

const clearableInputCode = `<ui-input
  v-model="clearableInput"
  clearable
  placeholder="输入内容后可清除"
/>`

const keyboardEventCode = `<ui-input
  v-model="keyEventValue"
  placeholder="按下键盘按键触发事件"
  @keydown="handleKeyDown"
  @keyup="handleKeyUp"
  @keypress="handleKeyPress"
/>

<script setup>
const keyEventValue = ref('')
const lastKeyEvent = ref('无')

function handleKeyDown(event) {
  lastKeyEvent.value = \`keydown: \${event.key}\`
}

function handleKeyUp(event) {
  lastKeyEvent.value = \`keyup: \${event.key}\`
}

function handleKeyPress(event) {
  lastKeyEvent.value = \`keypress: \${event.key}\`
}
<\/script>`

const inputModeCode = `<ui-input
  inputmode="numeric"
  placeholder="数字输入(移动设备显示数字键盘)"
/>

<ui-input
  inputmode="tel"
  placeholder="电话号码输入"
/>

<ui-input
  inputmode="email"
  autocapitalize="off"
  placeholder="邮箱地址输入"
/>`

const formAttributesCode = `<form action="#" method="get">
  <ui-input
    name="username"
    placeholder="用户名"
    autocomplete="username"
  />

  <ui-input
    type="password"
    name="password"
    placeholder="密码"
    autocomplete="current-password"
  />

  <button type="submit">提交表单</button>
</form>`

const customStyleCode = `<ui-input
  placeholder="自定义样式输入框"
  border-color="#6366f1"
  bg-color="#eef2ff"
  text-color="#4338ca"
/>`

const themeAdaptiveCode = `<!-- 输入框会自动适应当前主题 -->
<ui-input placeholder="自动适应当前主题" />`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Input 输入框
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      输入框组件允许用户输入和编辑文本，支持各种状态和样式自定义。
    </p>

    <!-- 基础输入框 -->
    <ui-demo
      title="基础用法"
      description="基础的输入框用法，通过v-model绑定数据。"
      :code="basicInputCode"
    >
      <div class="flex items-center gap-4">
        <ui-input
          v-model="basicInput"
          placeholder="请输入内容"
        />
        <div class="rounded bg-gray-100 p-2 text-sm font-mono dark:bg-gray-800">
          值: {{ basicInput }}
        </div>
      </div>
    </ui-demo>

    <!-- 类型变体 -->
    <ui-demo
      title="类型变体"
      description="输入框支持多种类型，如文本、密码等。"
      :code="typesInputCode"
    >
      <div class="flex items-center gap-4">
        <ui-input
          v-model="passwordInput"
          type="password"
          placeholder="请输入密码"
        />
        <div class="rounded bg-gray-100 p-2 text-sm font-mono dark:bg-gray-800">
          值: {{ passwordInput }}
        </div>
      </div>
    </ui-demo>

    <!-- 状态变体 -->
    <ui-demo
      title="状态变体"
      description="输入框的禁用状态、只读状态和错误状态。"
      :code="statesInputCode"
    >
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <ui-input
            v-model="disabledInput"
            disabled
            placeholder="禁用状态"
          />
        </div>

        <div class="flex items-center gap-4">
          <ui-input
            v-model="readonlyInput"
            readonly
            placeholder="只读状态"
          />
        </div>

        <div class="flex items-center gap-4">
          <ui-input
            v-model="errorInput"
            :error="isError"
            error-message="输入内容不符合要求"
            placeholder="错误状态"
          />
          <ui-button @click="toggleError">
            {{ isError ? '移除错误' : '显示错误' }}
          </ui-button>
        </div>
      </div>
    </ui-demo>

    <!-- 尺寸变体 -->
    <ui-demo
      title="尺寸变体"
      description="输入框支持三种尺寸：小、默认和大。"
      :code="sizesInputCode"
    >
      <div class="space-y-4">
        <ui-input
          v-model="smallInput"
          size="small"
          placeholder="小尺寸输入框"
        />

        <ui-input
          v-model="defaultInput"
          placeholder="默认尺寸输入框"
        />

        <ui-input
          v-model="largeInput"
          size="large"
          placeholder="大尺寸输入框"
        />
      </div>
    </ui-demo>

    <!-- 图标输入框 -->
    <ui-demo
      title="图标输入框"
      description="在输入框前后添加图标，增强交互体验。"
      :code="iconInputCode"
    >
      <div class="space-y-4">
        <ui-input
          v-model="searchInput"
          prefix-icon="carbon:search"
          placeholder="搜索内容"
        />

        <ui-input
          v-model="userInput"
          prefix-icon="carbon:user"
          suffix-icon="carbon:checkmark"
          placeholder="用户名"
        />
      </div>
    </ui-demo>

    <!-- 可清除输入框 -->
    <ui-demo
      title="可清除输入框"
      description="添加清除按钮，方便用户一键清空输入内容。"
      :code="clearableInputCode"
    >
      <div class="flex items-center gap-4">
        <ui-input
          v-model="clearableInput"
          clearable
          placeholder="输入内容后可清除"
        />
        <div class="rounded bg-gray-100 p-2 text-sm font-mono dark:bg-gray-800">
          值: {{ clearableInput }}
        </div>
      </div>
    </ui-demo>

    <!-- 键盘事件监听 -->
    <ui-demo
      title="键盘事件监听"
      description="监听输入框的键盘事件，如keydown、keyup和keypress。"
      :code="keyboardEventCode"
    >
      <div class="flex items-center gap-4">
        <ui-input
          v-model="keyEventValue"
          placeholder="按下键盘按键触发事件"
          @keydown="handleKeyDown"
          @keyup="handleKeyUp"
          @keypress="handleKeyPress"
        />
        <div class="rounded bg-gray-100 p-2 text-sm font-mono dark:bg-gray-800">
          最后触发的事件: {{ lastKeyEvent }}
        </div>
      </div>
    </ui-demo>

    <!-- 输入模式 -->
    <ui-demo
      title="输入模式"
      description="设置不同的输入模式，在移动设备上显示相应的键盘类型。"
      :code="inputModeCode"
    >
      <div class="space-y-4">
        <ui-input
          v-model="numericInput"
          inputmode="numeric"
          placeholder="数字输入(移动设备显示数字键盘)"
        />

        <ui-input
          v-model="telInput"
          inputmode="tel"
          placeholder="电话号码输入"
        />

        <ui-input
          v-model="emailInput"
          inputmode="email"
          autocapitalize="off"
          placeholder="邮箱地址输入"
        />
      </div>
    </ui-demo>

    <!-- 表单属性 -->
    <ui-demo
      title="表单属性"
      description="支持原生表单属性，如name、autocomplete等。"
      :code="formAttributesCode"
    >
      <form class="space-y-4" action="#" method="get">
        <ui-input
          name="username"
          placeholder="用户名"
          autocomplete="username"
        />

        <ui-input
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="current-password"
        />

        <ui-button type="submit">
          提交表单
        </ui-button>
      </form>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过传入颜色属性自定义输入框的样式。"
      :code="customStyleCode"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-4 rounded bg-gray-50 p-4 dark:bg-gray-800">
          <label class="flex items-center gap-2">
            <input v-model="useCustomStyle" type="checkbox">
            <span>启用自定义样式</span>
          </label>

          <template v-if="useCustomStyle">
            <div class="flex items-center gap-2">
              <span>边框颜色：</span>
              <input v-model="borderColor" type="color">
            </div>

            <div class="flex items-center gap-2">
              <span>背景颜色：</span>
              <input v-model="bgColor" type="color">
            </div>

            <div class="flex items-center gap-2">
              <span>文本颜色：</span>
              <input v-model="textColor" type="color">
            </div>
          </template>
        </div>

        <ui-input
          placeholder="自定义样式输入框"
          :border-color="useCustomStyle ? borderColor : undefined"
          :bg-color="useCustomStyle ? bgColor : undefined"
          :text-color="useCustomStyle ? textColor : undefined"
        />
      </div>
    </ui-demo>

    <!-- 主题适配 -->
    <ui-demo
      title="主题适配"
      description="输入框会自动适应亮色/暗色主题。"
      :code="themeAdaptiveCode"
    >
      <div class="space-y-4">
        <ui-button @click="toggleDarkMode">
          切换{{ isDarkMode ? '亮色' : '暗色' }}主题
        </ui-button>

        <ui-input placeholder="自动适应当前主题" />
      </div>
    </ui-demo>
  </div>
</template>
