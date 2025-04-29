<script setup lang="ts" name="DemoCode">
/**
 * 代码展示组件示例
 * 创建日期: 2023-10-15
 * 作者: aiftt
 * 更新日期: 2023-10-20 - 添加更多语言支持和主题选项
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
const searchable = ref(false)
const foldable = ref(false)
const autolink = ref(false)
const showToolbar = ref(false)
const useHighlightLines = ref(false)
const highlightLines = ref('1,3-5')

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
  { value: 'light', label: '亮色主题' },
  { value: 'dark', label: '暗色主题' },
  { value: 'auto', label: '自动(跟随系统)' },
]

// 定义内联代码示例
const highlightLinesExample = `function example() {
  // 这行被高亮
  const x = 1;
  // 这些行也被高亮
  const y = 2;
  return x + y;
}`

const searchExample = `// 启用搜索
const data = {
  name: "UI代码组件",
  version: "1.0.0"
};`

const autolinkExample = `// 自动识别链接
const url = "example.com";
const email = "contact@example.com";`

const foldingExample = `// 启用代码折叠功能
function longFunction() {
  // 这是一个很长的函数
  const a = 1;
  const b = 2;
  const c = 3;
  // 继续更多代码...
  return a + b + c;
}`

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
function changeTheme(theme) {
  currentTheme.value = theme
}

// 主题变化处理
function onThemeChange(event) {
  const theme = event.target.value
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
          <label for="demo-searchable">搜索功能:</label>
          <input
            id="demo-searchable"
            v-model="searchable"
            type="checkbox"
          >
        </div>

        <div class="control-group">
          <label for="demo-foldable">代码折叠:</label>
          <input
            id="demo-foldable"
            v-model="foldable"
            type="checkbox"
          >
        </div>

        <div class="control-group">
          <label for="demo-autolink">自动链接:</label>
          <input
            id="demo-autolink"
            v-model="autolink"
            type="checkbox"
          >
        </div>

        <div class="control-group">
          <label for="demo-toolbar">显示工具栏:</label>
          <input
            id="demo-toolbar"
            v-model="showToolbar"
            type="checkbox"
          >
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
        :enable-search="searchable"
        :enable-folding="foldable"
        :enable-autolink="autolink"
        :show-toolbar="showToolbar"
        :highlight-lines="useHighlightLines ? highlightLines : ''"
        max-height="400px"
      />
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        使用插槽
      </h2>
      <ui-code lang="javascript">
        const greeting = "Hello, World!";
        console.log(greeting);

        function add(a, b) {
        return a + b;
        }
      </ui-code>
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        自定义样式
      </h2>
      <ui-code
        lang="css"
        bg-color="#3b82f61a"
        text-color="#1e40af"
        border-color="#3b82f6"
      >
        .custom-styled {
        background-color: #f3f4f6;
        padding: 1rem;
        border-radius: 0.5rem;
        }
      </ui-code>
    </div>

    <div class="demo-code__section">
      <h2 class="demo-code__subtitle">
        高级功能展示
      </h2>

      <div class="feature-cards">
        <div class="feature-card">
          <h3>行号和高亮</h3>
          <ui-code
            :code="highlightLinesExample"
            lang="javascript"
            highlight-lines="2,4-5"
          />
        </div>

        <div class="feature-card">
          <h3>搜索功能</h3>
          <ui-code
            :code="searchExample"
            lang="javascript"
            :enable-search="true"
            :show-toolbar="true"
          />
        </div>

        <div class="feature-card">
          <h3>自动链接</h3>
          <ui-code
            :code="autolinkExample"
            lang="javascript"
            :enable-autolink="true"
            theme="auto"
          />
        </div>

        <div class="feature-card">
          <h3>代码折叠</h3>
          <ui-code
            :code="foldingExample"
            lang="javascript"
            :enable-folding="true"
            :show-toolbar="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-code {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.demo-code__title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--ui-color-primary);
}

.demo-code__subtitle {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: var(--ui-color-text);
}

.demo-code__section {
  margin-bottom: 3rem;
}

.demo-code__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--ui-color-bg-subtle);
  border-radius: 0.5rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.875rem;
  font-weight: 500;
}

.control-group select,
.control-group input[type='text'] {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--ui-color-border);
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.highlight-input {
  width: 100px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-card {
  border: 1px solid var(--ui-color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: var(--ui-color-bg);
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--ui-color-primary);
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .demo-code__controls {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .feature-card {
    background-color: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

/* 响应式 */
@media (max-width: 640px) {
  .demo-code__controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .control-group {
    width: 100%;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }
}
</style>
