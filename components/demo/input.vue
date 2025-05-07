<script setup lang="ts" name="DemoInput">
/**
 * 输入框组件演示
 * 创建日期: 2023-06-10
 * 作者: aiftt
 * 更新日期: 2023-06-10 - 初始实现
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
</script>

<template>
  <div class="demo-input">
    <div class="demo-section">
      <h2 class="demo-title">
        基础输入框
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="basicInput"
          placeholder="请输入内容"
        />
        <div class="demo-value">
          值: {{ basicInput }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        类型变体
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="passwordInput"
          type="password"
          placeholder="请输入密码"
        />
        <div class="demo-value">
          值: {{ passwordInput }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        状态变体
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="disabledInput"
          disabled
          placeholder="禁用状态"
        />
      </div>

      <div class="demo-row">
        <ui-input
          v-model="readonlyInput"
          readonly
          placeholder="只读状态"
        />
      </div>

      <div class="demo-row">
        <ui-input
          v-model="errorInput"
          :error="isError"
          error-message="输入内容不符合要求"
          placeholder="错误状态"
        />
        <button class="demo-button" @click="toggleError">
          切换错误状态
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        尺寸变体
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="smallInput"
          size="small"
          placeholder="小尺寸输入框"
        />
      </div>

      <div class="demo-row">
        <ui-input
          v-model="defaultInput"
          placeholder="默认尺寸输入框"
        />
      </div>

      <div class="demo-row">
        <ui-input
          v-model="largeInput"
          size="large"
          placeholder="大尺寸输入框"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        图标输入框
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="searchInput"
          prefix-icon="carbon:search"
          placeholder="搜索内容"
        />
      </div>

      <div class="demo-row">
        <ui-input
          v-model="userInput"
          prefix-icon="carbon:user"
          suffix-icon="carbon:checkmark"
          placeholder="用户名"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        可清除输入框
      </h2>
      <div class="demo-row">
        <ui-input
          v-model="clearableInput"
          clearable
          placeholder="输入内容后可清除"
        />
        <div class="demo-value">
          值: {{ clearableInput }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        自定义样式
      </h2>
      <div class="demo-controls">
        <label>
          <input v-model="useCustomStyle" type="checkbox">
          启用自定义样式
        </label>

        <template v-if="useCustomStyle">
          <div class="demo-color-picker">
            <label>边框颜色：</label>
            <input v-model="borderColor" type="color">
          </div>

          <div class="demo-color-picker">
            <label>背景颜色：</label>
            <input v-model="bgColor" type="color">
          </div>

          <div class="demo-color-picker">
            <label>文本颜色：</label>
            <input v-model="textColor" type="color">
          </div>
        </template>
      </div>

      <div class="demo-row">
        <ui-input
          placeholder="自定义样式输入框"
          :border-color="useCustomStyle ? borderColor : undefined"
          :bg-color="useCustomStyle ? bgColor : undefined"
          :text-color="useCustomStyle ? textColor : undefined"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        主题适配
      </h2>
      <button class="demo-button" @click="toggleDarkMode">
        切换{{ isDarkMode ? '亮色' : '暗色' }}主题
      </button>

      <div class="demo-row">
        <ui-input placeholder="自动适应当前主题" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        代码示例
      </h2>
      <ui-code
        code="<ui-input v-model='value' placeholder='请输入内容' />"
        lang="vue"
        :line-numbers="false"
      />

      <h3 class="demo-subtitle">
        带图标的输入框
      </h3>
      <ui-code
        code="<ui-input
  v-model='searchValue'
  prefix-icon='carbon:search'
  placeholder='搜索...'
  clearable
/>"
        lang="vue"
        :line-numbers="false"
      />

      <h3 class="demo-subtitle">
        自定义样式
      </h3>
      <ui-code
        code="<ui-input
  v-model='input'
  bg-color='#eef2ff'
  border-color='#6366f1'
  text-color='#4338ca'
  placeholder='自定义样式'
/>"
        lang="vue"
        :line-numbers="false"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>
      <h3 class="demo-subtitle">
        Props
      </h3>
      <table class="demo-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>默认值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>type</td>
            <td>string</td>
            <td>'text'</td>
            <td>输入框类型，支持所有原生input类型</td>
          </tr>
          <tr>
            <td>modelValue</td>
            <td>string</td>
            <td>''</td>
            <td>输入框的值，支持v-model</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>string</td>
            <td>''</td>
            <td>占位文本</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
            <td>undefined</td>
            <td>原生name属性</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>boolean</td>
            <td>false</td>
            <td>是否禁用</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>boolean</td>
            <td>false</td>
            <td>是否只读</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>boolean</td>
            <td>false</td>
            <td>是否可清除</td>
          </tr>
          <tr>
            <td>size</td>
            <td>'small' | 'default' | 'large'</td>
            <td>'default'</td>
            <td>输入框尺寸</td>
          </tr>
          <tr>
            <td>prefixIcon</td>
            <td>string</td>
            <td>undefined</td>
            <td>前缀图标</td>
          </tr>
          <tr>
            <td>suffixIcon</td>
            <td>string</td>
            <td>undefined</td>
            <td>后缀图标</td>
          </tr>
          <tr>
            <td>error</td>
            <td>boolean</td>
            <td>false</td>
            <td>是否为错误状态</td>
          </tr>
          <tr>
            <td>errorMessage</td>
            <td>string</td>
            <td>undefined</td>
            <td>错误提示消息</td>
          </tr>
          <tr>
            <td>maxlength</td>
            <td>number</td>
            <td>undefined</td>
            <td>最大输入长度</td>
          </tr>
          <tr>
            <td>autofocus</td>
            <td>boolean</td>
            <td>false</td>
            <td>是否自动获取焦点</td>
          </tr>
          <tr>
            <td>borderColor</td>
            <td>string</td>
            <td>undefined</td>
            <td>自定义边框颜色</td>
          </tr>
          <tr>
            <td>bgColor</td>
            <td>string</td>
            <td>undefined</td>
            <td>自定义背景颜色</td>
          </tr>
          <tr>
            <td>textColor</td>
            <td>string</td>
            <td>undefined</td>
            <td>自定义文本颜色</td>
          </tr>
        </tbody>
      </table>

      <h3 class="demo-subtitle">
        Events
      </h3>
      <table class="demo-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>(value: string)</td>
            <td>输入值变化时触发</td>
          </tr>
          <tr>
            <td>input</td>
            <td>(value: string)</td>
            <td>输入时触发</td>
          </tr>
          <tr>
            <td>change</td>
            <td>(value: string)</td>
            <td>值变化时触发</td>
          </tr>
          <tr>
            <td>focus</td>
            <td>(event: FocusEvent)</td>
            <td>获得焦点时触发</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>(event: FocusEvent)</td>
            <td>失去焦点时触发</td>
          </tr>
          <tr>
            <td>clear</td>
            <td>-</td>
            <td>点击清除按钮时触发</td>
          </tr>
        </tbody>
      </table>

      <h3 class="demo-subtitle">
        Methods
      </h3>
      <table class="demo-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>focus</td>
            <td>-</td>
            <td>使输入框获取焦点</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>-</td>
            <td>使输入框失去焦点</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-input {
  padding: 1rem;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.demo-subtitle {
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem;
}

.demo-row {
  margin-bottom: 1rem;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.demo-value {
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  font-family: monospace;
  color: #374151;
  flex-shrink: 0;
  min-width: 150px;
}

:root.dark .demo-value {
  background-color: #1f2937;
  color: #e5e7eb;
}

.demo-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.demo-button:hover {
  background-color: #2563eb;
}

.demo-controls {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

:root.dark .demo-controls {
  background-color: #111827;
  border-color: #374151;
}

.demo-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.demo-color-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.demo-table th,
.demo-table td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}

.demo-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

:root.dark .demo-table th,
:root.dark .demo-table td {
  border-color: #374151;
}

:root.dark .demo-table th {
  background-color: #1f2937;
}
</style>
