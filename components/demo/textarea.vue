<script setup lang="ts" name="DemoTextarea">
/**
 * 文本域组件演示
 * 创建日期: 2023-06-12
 * 作者: aiftt
 * 更新日期: 2023-06-12 - 初始实现
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
</script>

<template>
  <div class="demo-textarea">
    <div class="demo-section">
      <h2 class="demo-title">
        基础文本域
      </h2>
      <div class="demo-row">
        <ui-textarea
          v-model="basicTextarea"
          placeholder="请输入内容"
        />
        <div class="demo-value">
          值: {{ basicTextarea }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        状态变体
      </h2>
      <div class="demo-row">
        <ui-textarea
          v-model="disabledTextarea"
          disabled
          placeholder="禁用状态"
        />
      </div>

      <div class="demo-row">
        <ui-textarea
          v-model="readonlyTextarea"
          readonly
          placeholder="只读状态"
        />
      </div>

      <div class="demo-row">
        <ui-textarea
          v-model="errorTextarea"
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
        自动调整大小
      </h2>
      <div class="demo-row">
        <ui-textarea
          v-model="autosizeTextarea"
          :min-rows="2"
          :max-rows="6"
          autosize
          placeholder="可自动调整高度的文本域"
        />
      </div>

      <div class="demo-row">
        <ui-textarea
          v-model="fixedHeightTextarea"
          :autosize="false"
          placeholder="固定高度的文本域"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        字数统计
      </h2>
      <div class="demo-row">
        <ui-textarea
          v-model="countTextarea"
          show-count
          placeholder="显示字数统计"
        />
      </div>

      <div class="demo-row">
        <ui-textarea
          v-model="maxlengthTextarea"
          show-count
          :maxlength="100"
          placeholder="最大输入100个字符"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        可清除文本域
      </h2>
      <div class="demo-row">
        <ui-textarea
          v-model="clearableTextarea"
          clearable
          placeholder="输入内容后可清除"
        />
        <div class="demo-value">
          值: {{ clearableTextarea }}
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
        <ui-textarea
          placeholder="自定义样式文本域"
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
        <ui-textarea placeholder="自动适应当前主题" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        代码示例
      </h2>
      <ui-code
        code="<ui-textarea v-model='value' placeholder='请输入内容' />"
        language="html"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>

      <h3 class="demo-subtitle">
        属性
      </h3>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>modelValue / v-model</td>
              <td>文本域绑定值</td>
              <td>string</td>
              <td>''</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>占位文本</td>
              <td>string</td>
              <td>''</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>readonly</td>
              <td>是否只读</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>minRows</td>
              <td>最小行数</td>
              <td>number</td>
              <td>2</td>
            </tr>
            <tr>
              <td>maxRows</td>
              <td>最大行数</td>
              <td>number</td>
              <td>6</td>
            </tr>
            <tr>
              <td>autosize</td>
              <td>是否自动调整高度</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>clearable</td>
              <td>是否显示清除按钮</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showCount</td>
              <td>是否显示字数统计</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>最大输入长度</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>error</td>
              <td>是否为错误状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>errorMessage</td>
              <td>错误提示信息</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>autofocus</td>
              <td>是否自动获取焦点</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>borderColor</td>
              <td>自定义边框颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>bgColor</td>
              <td>自定义背景颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>textColor</td>
              <td>自定义文本颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        事件
      </h3>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>update:modelValue</td>
              <td>输入值变化时触发</td>
              <td>(value: string)</td>
            </tr>
            <tr>
              <td>focus</td>
              <td>获取焦点时触发</td>
              <td>(event: FocusEvent)</td>
            </tr>
            <tr>
              <td>blur</td>
              <td>失去焦点时触发</td>
              <td>(event: FocusEvent)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>值变化且失去焦点时触发</td>
              <td>(value: string)</td>
            </tr>
            <tr>
              <td>input</td>
              <td>输入值变化时触发</td>
              <td>(value: string)</td>
            </tr>
            <tr>
              <td>clear</td>
              <td>点击清除按钮时触发</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        方法
      </h3>
      <div class="demo-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>focus</td>
              <td>使文本域获取焦点</td>
              <td>-</td>
            </tr>
            <tr>
              <td>blur</td>
              <td>使文本域失去焦点</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-textarea {
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

.demo-value {
  margin-top: 8px;
  font-size: 14px;
  color: #6b7280;
}

.demo-button {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #2563eb;
}

.demo-controls {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 4px;
}

.demo-color-picker {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.demo-color-picker label {
  width: 80px;
  margin-right: 8px;
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
