<script setup lang="ts" name="UiCode">
import { nanoid } from 'nanoid'
import Prism from 'prismjs'
/**
 * 代码展示组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-10 - 从highlight.js替换为Prism.js
 * 更新日期: 2023-12-12 - 添加工具栏、代码折叠、搜索和自动链接功能
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// 引入Prism核心样式 (在nuxt.config.ts中已全局引入)
// import 'prismjs/themes/prism.css'

// 引入行号插件
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// 引入工具栏插件
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

// 引入复制到剪贴板插件
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

// 引入代码折叠插件
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

// 引入搜索插件
import 'prismjs/plugins/match-braces/prism-match-braces'
import 'prismjs/plugins/match-braces/prism-match-braces.css'

// 引入自动链接插件
import 'prismjs/plugins/autolinker/prism-autolinker'
import 'prismjs/plugins/autolinker/prism-autolinker.css'

// 引入额外的语言支持
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-nginx'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 代码内容
   */
  code?: string
  /**
   * 编程语言
   */
  lang?: string
  /**
   * 是否显示行号
   */
  lineNumbers?: boolean
  /**
   * 是否显示语言标签
   */
  showLanguage?: boolean
  /**
   * 是否显示复制按钮
   */
  showCopy?: boolean
  /**
   * 是否启用代码折叠
   */
  enableFolding?: boolean
  /**
   * 是否启用搜索
   */
  enableSearch?: boolean
  /**
   * 是否启用自动链接
   */
  enableAutolink?: boolean
  /**
   * 是否显示完整工具栏
   */
  showToolbar?: boolean
  /**
   * 主题
   */
  theme?: 'light' | 'dark' | 'auto'
  /**
   * 最大高度
   */
  maxHeight?: string
  /**
   * 高亮行数，格式如 "1,3-5"
   */
  highlightLines?: string
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 文本颜色
   */
  textColor?: string
}>(), {
  code: '',
  lang: 'plaintext',
  lineNumbers: true,
  showLanguage: true,
  showCopy: true,
  enableFolding: false,
  enableSearch: false,
  enableAutolink: false,
  showToolbar: true,
  theme: 'auto',
  maxHeight: '500px',
  highlightLines: '',
})

// 生成唯一ID，避免SSR水合不匹配
const uniqueId = ref(`code-${nanoid(6)}`)

// 响应式状态
const codeElement = ref<HTMLElement | null>(null)
const codeContent = ref(props.code)
const copied = ref(false)
const expanded = ref(false)
const searchOpen = ref(false)
const searchTerm = ref('')
const searchResults = ref<number[]>([])
const currentSearchIndex = ref(-1)

// 处理代码折叠
const isCodeTruncated = ref(false)
const originalHeight = ref<string>('')

// 复制代码到剪贴板
function copyCode() {
  if (navigator.clipboard && codeContent.value) {
    navigator.clipboard.writeText(codeContent.value)
      .then(() => {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
      .catch((err) => {
        console.error('无法复制代码:', err)
      })
  }
}

// 切换代码折叠状态
function toggleExpand() {
  expanded.value = !expanded.value
}

// 切换搜索面板
function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => {
      const searchInput = document.querySelector('.ui-code-search input') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    })
  }
  else {
    searchTerm.value = ''
    searchResults.value = []
    currentSearchIndex.value = -1
    highlightCode()
  }
}

// 执行搜索
function performSearch() {
  if (!searchTerm.value || !codeElement.value)
    return

  const codeText = codeContent.value
  const term = searchTerm.value.toLowerCase()
  const results: number[] = []

  // 简单的行搜索实现
  const lines = codeText.split('\n')
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(term)) {
      results.push(index + 1)
    }
  })

  searchResults.value = results
  currentSearchIndex.value = results.length > 0 ? 0 : -1

  if (results.length > 0) {
    highlightSearchResults()
  }
}

// 高亮搜索结果
function highlightSearchResults() {
  if (searchResults.value.length > 0 && currentSearchIndex.value >= 0) {
    const line = searchResults.value[currentSearchIndex.value]

    // 移除现有高亮
    const existingHighlights = codeElement.value?.querySelectorAll('.search-highlight')
    existingHighlights?.forEach((el) => {
      el.classList.remove('search-highlight')
    })

    // 高亮当前行
    const lineElement = codeElement.value?.querySelector(`.line-numbers .line-numbers-rows > span:nth-child(${line})`)
    lineElement?.classList.add('search-highlight')

    // 滚动到视图
    lineElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

// 搜索导航
function navigateSearch(direction: 'next' | 'prev') {
  if (searchResults.value.length === 0)
    return

  if (direction === 'next') {
    currentSearchIndex.value = (currentSearchIndex.value + 1) % searchResults.value.length
  }
  else {
    currentSearchIndex.value = currentSearchIndex.value - 1
    if (currentSearchIndex.value < 0) {
      currentSearchIndex.value = searchResults.value.length - 1
    }
  }

  highlightSearchResults()
}

// 标准化语言名称，确保与Prism兼容
const normalizedLang = computed(() => {
  const langMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    html: 'html',
    css: 'css',
    scss: 'scss',
    vue: 'html',
    jsx: 'jsx',
    tsx: 'tsx',
    bash: 'bash',
    sh: 'bash',
    shell: 'bash',
    json: 'json',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    docker: 'docker',
    dockerfile: 'docker',
    nginx: 'nginx',
  }

  return langMap[props.lang.toLowerCase()] || props.lang || 'plaintext'
})

// 使用Prism高亮代码
function highlightCode() {
  if (!codeElement.value)
    return

  // 设置语言类
  codeElement.value.className = `language-${normalizedLang.value}`

  // 应用行号
  if (props.lineNumbers) {
    codeElement.value.classList.add('line-numbers')
  }
  else {
    codeElement.value.classList.remove('line-numbers')
  }

  // 应用高亮行
  if (props.highlightLines) {
    codeElement.value.setAttribute('data-line', props.highlightLines)
  }
  else {
    codeElement.value.removeAttribute('data-line')
  }

  // 应用工具栏相关类
  if (props.showToolbar) {
    codeElement.value.classList.add('code-toolbar')
  }
  else {
    codeElement.value.classList.remove('code-toolbar')
  }

  // 应用匹配括号插件
  if (props.enableFolding) {
    codeElement.value.classList.add('match-braces')
  }
  else {
    codeElement.value.classList.remove('match-braces')
  }

  // 自动链接插件不需要特殊处理，由Prism自动应用

  // 执行高亮
  Prism.highlightElement(codeElement.value)

  // 检查代码是否超出最大高度
  nextTick(() => {
    if (codeElement.value && props.maxHeight) {
      const computedHeight = window.getComputedStyle(codeElement.value.parentElement as HTMLElement).height
      originalHeight.value = computedHeight
      isCodeTruncated.value = Number.parseFloat(computedHeight) >= Number.parseFloat(props.maxHeight)
    }
  })
}

// 当代码内容或语言变化时重新高亮
watch(
  () => [props.code, props.lang, props.lineNumbers, props.theme, props.highlightLines, props.showToolbar, props.enableFolding],
  () => {
    codeContent.value = props.code
    nextTick(() => highlightCode())
  },
)

// 当搜索词变化时执行搜索
watch(searchTerm, () => {
  performSearch()
})

// 组件挂载后高亮代码
onMounted(() => {
  if (props.code) {
    codeContent.value = props.code
    nextTick(() => highlightCode())
  }
})
// 计算类名和样式
const wrapperClasses = computed(() => {
  return [
    'ui-code',
    `ui-code--${props.theme}`,
    { 'ui-code--expanded': expanded.value },
  ]
})

const wrapperStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.maxHeight && !expanded.value) {
    styles.maxHeight = props.maxHeight
  }

  if (props.borderColor) {
    styles.borderColor = props.borderColor
  }

  if (props.bgColor) {
    styles.backgroundColor = props.bgColor
  }

  return styles
})
</script>

<template>
  <div :class="wrapperClasses" :style="wrapperStyles">
    <!-- 工具栏 -->
    <div v-if="showToolbar" class="ui-code-toolbar">
      <div v-if="showLanguage" class="ui-code-language">
        {{ normalizedLang }}
      </div>

      <div class="ui-code-tools">
        <button v-if="enableSearch" class="ui-code-tool-btn" title="搜索代码" @click="toggleSearch">
          <div class="i-carbon:search text-lg" />
        </button>

        <button v-if="showCopy" class="ui-code-tool-btn" :title="copied ? '已复制' : '复制代码'" @click="copyCode">
          <div v-if="!copied" class="i-carbon:copy text-lg" />
          <div v-else class="i-carbon:checkmark text-lg text-green-500" />
        </button>

        <button v-if="isCodeTruncated" class="ui-code-tool-btn" :title="expanded ? '收起代码' : '展开代码'" @click="toggleExpand">
          <div v-if="!expanded" class="i-carbon:chevron-down text-lg" />
          <div v-else class="i-carbon:chevron-up text-lg" />
        </button>
      </div>
    </div>

    <!-- 搜索面板 -->
    <div v-if="enableSearch && searchOpen" class="ui-code-search">
      <div class="ui-code-search-input">
        <input
          v-model="searchTerm"
          placeholder="搜索代码..."
          @keydown.enter="navigateSearch('next')"
        >
        <div v-if="searchResults.length > 0" class="ui-code-search-results">
          {{ currentSearchIndex + 1 }}/{{ searchResults.length }}
        </div>
      </div>
      <div class="ui-code-search-buttons">
        <button :disabled="searchResults.length === 0" @click="navigateSearch('prev')">
          <div class="i-carbon:chevron-up text-lg" />
        </button>
        <button :disabled="searchResults.length === 0" @click="navigateSearch('next')">
          <div class="i-carbon:chevron-down text-lg" />
        </button>
        <button @click="toggleSearch">
          <div class="i-carbon:close text-lg" />
        </button>
      </div>
    </div>

    <!-- 代码展示区域 -->
    <pre :class="{ 'line-numbers': lineNumbers }" :data-line="highlightLines" :data-line-offset="1"><code
      :id="uniqueId"
      ref="codeElement"
      :class="`language-${normalizedLang}`"
    ><slot>{{ props.code }}</slot></code></pre>

    <!-- 展开/收起控制按钮 (当代码超出最大高度时显示) -->
    <div v-if="isCodeTruncated && !expanded && !showToolbar" class="ui-code-expand-control">
      <button @click="toggleExpand">
        显示更多
      </button>
    </div>

    <!-- 隐藏的原始内容 slot，用于客户端提取代码文本 -->
    <div style="display: none;">
      <slot name="raw-content" />
    </div>
  </div>
</template>

<style scoped>
.ui-code {
  --ui-code-border-color: v-bind('props.borderColor || "var(--ui-border-color, #e5e7eb)"');
  --ui-code-bg-color: v-bind('props.bgColor || "var(--ui-code-bg, #f8f9fa)"');
  --ui-code-text-color: v-bind('props.textColor || "var(--ui-code-text, #374151)"');

  position: relative;
  border: 1px solid var(--ui-code-border-color);
  border-radius: 0.375rem;
  background-color: var(--ui-code-bg-color);
  color: var(--ui-code-text-color);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 工具栏样式 */
.ui-code-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--ui-code-border-color);
  background-color: rgba(0, 0, 0, 0.03);
}

.ui-code-language {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.7;
}

.ui-code-tools {
  display: flex;
  gap: 0.5rem;
}

.ui-code-tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.25rem;
  background: transparent;
  border: none;
  color: var(--ui-code-text-color);
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-code-tool-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

/* 搜索面板样式 */
.ui-code-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--ui-code-border-color);
  background-color: rgba(0, 0, 0, 0.03);
}

.ui-code-search-input {
  display: flex;
  align-items: center;
  flex: 1;
}

.ui-code-search-input input {
  flex: 1;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--ui-code-border-color);
  border-radius: 0.25rem;
  background: #fff;
  font-size: 0.875rem;
}

.ui-code-search-results {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

.ui-code-search-buttons {
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
}

.ui-code-search-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background: transparent;
  border: none;
  color: var(--ui-code-text-color);
  opacity: 0.7;
  cursor: pointer;
}

.ui-code-search-buttons button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.ui-code-search-buttons button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 代码区域样式 */
.ui-code pre {
  margin: 0;
  padding: 1rem;
  overflow: auto;
  max-height: v-bind('expanded.value ? "none" : props.maxHeight');
  transition: max-height 0.3s ease;
}

.ui-code code {
  font-family: inherit;
  padding: 0;
  background: transparent;
  border: none;
  white-space: pre;
}

/* 展开控制按钮 */
.ui-code-expand-control {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  background: linear-gradient(to bottom, transparent, var(--ui-code-bg-color) 40%);
}

.ui-code-expand-control button {
  padding: 0.25rem 1rem;
  border: 1px solid var(--ui-code-border-color);
  border-radius: 0.25rem;
  background: var(--ui-code-bg-color);
  color: var(--ui-code-text-color);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-code-expand-control button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 暗黑主题样式 */
.ui-code.ui-code--dark,
:root.dark .ui-code.ui-code--auto {
  --ui-code-border-color: var(--ui-border-color-dark, #374151);
  --ui-code-bg-color: var(--ui-code-bg-dark, #1f2937);
  --ui-code-text-color: var(--ui-code-text-dark, #e5e7eb);
}

/* 展开状态 */
.ui-code.ui-code--expanded pre {
  max-height: none !important;
}

/* 搜索高亮 */
:deep(.search-highlight) {
  background-color: rgba(255, 213, 0, 0.3) !important;
  color: inherit !important;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .ui-code-toolbar {
    padding: 0.375rem 0.75rem;
  }

  .ui-code pre {
    padding: 0.75rem;
  }

  .ui-code-language {
    font-size: 0.7rem;
  }

  .ui-code-tool-btn {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
