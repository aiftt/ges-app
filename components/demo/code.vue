<script setup lang="ts" name="DemoCode">
/**
 * 代码展示组件示例
 * 创建日期: 2023-10-15
 * 作者: aiftt
 * 更新日期: 2023-10-20 - 添加更多语言支持和主题选项
 * 更新日期: 2023-05-11 - 更新为支持Highlight.js的新版本
 * 更新日期: 2023-06-10 - 添加自定义样式演示
 */

import { computed, ref } from 'vue'

import cssCode from '~/assets/demo-code/css.css?raw'
import htmlCode from '~/assets/demo-code/html.html?raw'
// 示例代码
import jsCode from '~/assets/demo-code/javascript.js?raw'
import tsCode from '~/assets/demo-code/typescript.ts?raw'
import vueCode from '~/assets/demo-code/vue.vue?raw'

// 当前主题
const currentTheme = ref('light')
// 是否显示行号
const showLineNumbers = ref(true)
// 当前选中的语言
const selectedLanguage = ref('javascript')

// 启用高级功能
const useHighlightLines = ref(false)
const highlightLines = ref('1,3-5')

// 自定义样式
const useCustomStyle = ref(false)
const bgColor = ref('#f8f9fa')
const borderColor = ref('#ced4da')
const headerBgColor = ref('#e9ecef')
const maxHeight = ref('400px')

// 语言选项
const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'jsx', label: 'JSX' },
  { value: 'vue', label: 'Vue' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'yaml', label: 'YAML' },
  { value: 'plaintext', label: '纯文本' },
]

// 主题选项
const themes = [
  { value: 'auto', label: '自动(跟随系统)' },
  { value: 'light', label: '浅色主题' },
  { value: 'dark', label: '暗色主题' },
  // GitHub系列
  { value: 'github', label: 'GitHub' },
  { value: 'github-dark', label: 'GitHub暗色' },
  { value: 'github-dark-dimmed', label: 'GitHub暗淡' },
  // Atom系列
  { value: 'atom-one-dark', label: 'Atom One Dark' },
  { value: 'atom-one-light', label: 'Atom One Light' },
  // Monokai系列
  { value: 'monokai', label: 'Monokai' },
  { value: 'monokai-sublime', label: 'Monokai Sublime' },
  // VS系列
  { value: 'vs', label: 'Visual Studio' },
  { value: 'vs2015', label: 'Visual Studio 2015' },
  // 其他流行主题
  { value: 'a11y-dark', label: 'A11y Dark' },
  { value: 'a11y-light', label: 'A11y Light' },
  { value: 'nord', label: 'Nord' },
  { value: 'xcode', label: 'XCode' },
  { value: 'tokyo-night-dark', label: 'Tokyo Night Dark' },
  { value: 'tokyo-night-light', label: 'Tokyo Night Light' },
]

// 定义内联代码示例
const highlightLinesExample = `function example() {
  // 这行被高亮
  const x = 1;
  // 这些行也被高亮
  const y = 2;
  return x + y;
}`

const customStyleExample = `// 自定义样式示例
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomStyleExample',
  setup() {
    const message = 'Hello World'
    return { message }
  }
})`

// 根据选择的语言切换代码示例
const currentCode = computed(() => {
  switch (selectedLanguage.value) {
    case 'javascript':
      return jsCode
    case 'html':
      return htmlCode
    case 'css':
      return cssCode
    case 'vue':
      return vueCode
    case 'typescript':
      return tsCode
    default:
      return jsCode
  }
})

// 修改主题
function changeTheme(theme: string) {
  currentTheme.value = theme
  // 更新HTML根元素的data-code-theme属性
  if (import.meta.client) {
    document.documentElement.dataset.codeTheme = theme
  }
}

// 主题变化处理
function onThemeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const theme = target.value
  changeTheme(theme)
}
</script>

<template>
  <div class="demo-code">
    <h1 class="demo-code__title">
      代码展示组件
    </h1>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        基础使用
      </h2>

      <div class="demo-code__controls">
        <div class="control-group">
          <label for="demo-lang-select">语言:</label>
          <select
            id="demo-lang-select"
            v-model="selectedLanguage"
          >
            <option
              v-for="lang in languages"
              :key="lang.value"
              :value="lang.value"
            >
              {{ lang.label }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label for="demo-line-numbers">显示行号:</label>
          <input
            id="demo-line-numbers"
            v-model="showLineNumbers"
            type="checkbox"
          >
        </div>

        <div class="control-group">
          <label for="demo-theme-select">主题:</label>
          <select
            id="demo-theme-select"
            v-model="currentTheme"
            @change="onThemeChange"
          >
            <option
              v-for="theme in themes"
              :key="theme.value"
              :value="theme.value"
            >
              {{ theme.label }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label for="demo-highlight">高亮行:</label>
          <input
            id="demo-highlight"
            v-model="useHighlightLines"
            type="checkbox"
          >
          <input
            v-if="useHighlightLines"
            v-model="highlightLines"
            type="text"
            class="highlight-input"
            placeholder="1,3-5"
          >
        </div>
      </div>

      <ui-code
        :code="currentCode"
        :lang="selectedLanguage"
        :line-numbers="showLineNumbers"
        :theme="currentTheme"
        :highlight-lines="useHighlightLines ? highlightLines : ''"
      />
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        行高亮示例
      </h2>
      <p class="demo-code__description">
        使用高亮行功能可以突出显示代码的特定行，格式为：1,3-5（第1行和第3至5行）
      </p>
      <ui-code
        :code="highlightLinesExample"
        lang="javascript"
        :line-numbers="true"
        theme="github"
        highlight-lines="1,3-5"
      />
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        自定义样式
      </h2>
      <p class="demo-code__description">
        使用CSS变量可以自定义代码块的样式
      </p>

      <div class="demo-code__controls">
        <div class="control-group">
          <label for="demo-custom-style">使用自定义样式:</label>
          <input
            id="demo-custom-style"
            v-model="useCustomStyle"
            type="checkbox"
          >
        </div>

        <template v-if="useCustomStyle">
          <div class="control-group">
            <label for="demo-bg-color">背景颜色:</label>
            <input
              id="demo-bg-color"
              v-model="bgColor"
              type="color"
            >
          </div>

          <div class="control-group">
            <label for="demo-border-color">边框颜色:</label>
            <input
              id="demo-border-color"
              v-model="borderColor"
              type="color"
            >
          </div>

          <div class="control-group">
            <label for="demo-header-bg-color">头部背景:</label>
            <input
              id="demo-header-bg-color"
              v-model="headerBgColor"
              type="color"
            >
          </div>

          <div class="control-group">
            <label for="demo-max-height">最大高度:</label>
            <input
              id="demo-max-height"
              v-model="maxHeight"
              type="text"
              placeholder="400px"
            >
          </div>
        </template>
      </div>

      <ui-code
        :code="customStyleExample"
        lang="typescript"
        :line-numbers="true"
        theme="github"
        :bg-color="useCustomStyle ? bgColor : undefined"
        :border-color="useCustomStyle ? borderColor : undefined"
        :header-bg-color="useCustomStyle ? headerBgColor : undefined"
        :max-height="useCustomStyle ? maxHeight : undefined"
      />
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        API参考
      </h2>
      <div class="demo-api">
        <h3>Props</h3>
        <table class="demo-api__table">
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
              <td>code</td>
              <td>string</td>
              <td>''</td>
              <td>代码内容</td>
            </tr>
            <tr>
              <td>lang</td>
              <td>string</td>
              <td>'plaintext'</td>
              <td>编程语言</td>
            </tr>
            <tr>
              <td>lineNumbers</td>
              <td>boolean</td>
              <td>true</td>
              <td>是否显示行号</td>
            </tr>
            <tr>
              <td>showLanguage</td>
              <td>boolean</td>
              <td>true</td>
              <td>是否显示语言标签</td>
            </tr>
            <tr>
              <td>theme</td>
              <td>string</td>
              <td>'github'</td>
              <td>代码高亮主题</td>
            </tr>
            <tr>
              <td>highlightLines</td>
              <td>string</td>
              <td>''</td>
              <td>高亮行数，格式如："1,3-5"</td>
            </tr>
            <tr>
              <td>maxHeight</td>
              <td>string</td>
              <td>undefined</td>
              <td>代码块最大高度</td>
            </tr>
            <tr>
              <td>bgColor</td>
              <td>string</td>
              <td>undefined</td>
              <td>自定义背景颜色</td>
            </tr>
            <tr>
              <td>borderColor</td>
              <td>string</td>
              <td>undefined</td>
              <td>自定义边框颜色</td>
            </tr>
            <tr>
              <td>headerBgColor</td>
              <td>string</td>
              <td>undefined</td>
              <td>自定义头部背景颜色</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-code {
  padding: 1rem;
}

.demo-code__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.demo-code__subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
}

.demo-code__description {
  margin-bottom: 1rem;
  color: #666;
}

.demo-code__section {
  margin-bottom: 2rem;
}

.demo-code__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.highlight-input {
  width: 5rem;
  padding: 0.25rem;
}

.demo-api__table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.demo-api__table th,
.demo-api__table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

.demo-api__table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

:root.dark .demo-code__controls {
  background-color: #2d3748;
}

:root.dark .demo-code__description {
  color: #a0aec0;
}

:root.dark .demo-api__table th {
  background-color: #2d3748;
}

:root.dark .demo-api__table th,
:root.dark .demo-api__table td {
  border-color: #4a5568;
}
</style>
