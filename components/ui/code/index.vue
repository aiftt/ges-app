<script setup lang="ts" name="UiCode">
/**
 * 代码展示组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-10 - 从highlight.js替换为Prism.js
 * 更新日期: 2023-12-12 - 添加工具栏、代码折叠、搜索和自动链接功能
 * 更新日期: 2023-04-29 - 修复行号显示问题和代码高亮
 * 更新日期: 2023-05-06 - 修复文字重影问题
 * 更新日期: 2023-05-07 - 修复服务端和客户端渲染不一致问题
 * 更新日期: 2023-05-08 - 简化组件，移除工具栏和搜索功能，使用Prism默认样式
 * 更新日期: 2023-05-09 - 移除自定义样式，完全使用Prism默认样式
 * 更新日期: 2023-05-10 - 从Prism.js替换回Highlight.js
 * 更新日期: 2023-05-11 - 从Prism.js更换为Highlight.js，添加主题支持，改进代码高亮
 * 更新日期: 2023-05-12 - 添加更多主题支持，实现主题切换功能
 * 更新日期: 2023-05-13 - 修复主题加载问题，精简支持的主题列表
 * 更新日期: 2023-05-14 - 改进主题切换方式，使用data-code-theme属性替代类名切换
 * 更新日期: 2023-05-14 - 将样式移动到全局样式文件中
 * 更新日期: 2023-06-10 - 重构组件，使用v-bind+CSS变量实现样式，符合UI组件规范
 */
import { nanoid } from 'nanoid'
import logger from '~/utils/logger'

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
   * 主题
   */
  theme?: string
  /**
   * 高亮行数，格式如 "1,3-5"
   */
  highlightLines?: string
  /**
   * 最大高度
   */
  maxHeight?: string
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 头部背景颜色
   */
  headerBgColor?: string
}>(), {
  code: '',
  lang: 'plaintext',
  lineNumbers: true,
  showLanguage: true,
  theme: 'github-dark',
  highlightLines: '',
})

// 创建代码组件专用logger
const codeLogger = logger.client.child({ tag: 'code' })

// 可用的主题列表（确保和已导入的CSS文件一致）
const availableThemes = [
  { value: 'auto', label: '自动' },
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
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

// 当前选择的主题
const currentTheme = ref(props.theme)

// Highlight.js及其语言模块
let hljs: any = null

// 同步导入highlight.js，解决加载问题
if (import.meta.client) {
  import('highlight.js').then((module) => {
    hljs = module.default
    highlightCode()
  }).catch((error) => {
    codeLogger.error('Failed to load highlight.js:', error)
  })
}

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  currentTheme.value = newTheme
  updateCodeTheme(newTheme)
}, { immediate: true })

// 更新代码主题
function updateCodeTheme(themeName: string) {
  if (import.meta.client) {
    // 设置data属性到html元素上来切换主题
    document.documentElement.dataset.codeTheme = themeName
  }
}

// 生成唯一ID，避免SSR水合不匹配
const uniqueId = ref(`code-${nanoid(6)}`)

// 响应式状态
const codeElement = ref<HTMLElement | null>(null)
const highlightedCode = ref('')
const isHighlighting = ref(false)

// 标准化语言名称
const normalizedLang = computed(() => {
  const langMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    html: 'xml',
    vue: 'xml',
    htm: 'xml',
    xml: 'xml',
    css: 'css',
    scss: 'scss',
    json: 'json',
    bash: 'bash',
    sh: 'bash',
    shell: 'bash',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    dockerfile: 'dockerfile',
    docker: 'dockerfile',
    nginx: 'nginx',
  }

  return langMap[props.lang.toLowerCase()] || props.lang || 'plaintext'
})

// 按需加载语言模块
async function loadLanguage(lang: string) {
  if (!hljs || lang === 'plaintext')
    return

  // 检查语言是否已加载
  if (hljs.getLanguage(lang))
    return

  try {
    // 按需加载语言模块
    const langModule = await import(/* @vite-ignore */ `highlight.js/lib/languages/${lang}`).catch(() => null)
    if (langModule) {
      hljs.registerLanguage(lang, langModule.default)
      codeLogger.info(`Language loaded: ${lang}`)
    }
  }
  catch (error) {
    codeLogger.error(`Failed to load language: ${lang}`, error)
  }
}

// 高亮显示代码
async function highlightCode() {
  if (!import.meta.client || !props.code) {
    highlightedCode.value = escapeHtml(props.code)
    return
  }

  if (!hljs) {
    // hljs还未加载完成
    highlightedCode.value = escapeHtml(props.code)
    return
  }

  isHighlighting.value = true

  try {
    // 如果是指定语言，确保语言模块已加载
    if (normalizedLang.value !== 'plaintext') {
      await loadLanguage(normalizedLang.value)
    }

    // 尝试使用指定语言高亮
    if (normalizedLang.value !== 'plaintext' && hljs.getLanguage(normalizedLang.value)) {
      highlightedCode.value = hljs.highlight(props.code, { language: normalizedLang.value }).value
    }
    else {
      // 否则使用自动检测
      highlightedCode.value = hljs.highlightAuto(props.code).value
    }
  }
  catch (error) {
    codeLogger.error('Failed to highlight code:', error)
    highlightedCode.value = escapeHtml(props.code)
  }
  finally {
    isHighlighting.value = false
  }
}

// HTML转义函数
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 当代码内容或语言变化时重新高亮
watch(
  () => [props.code, props.lang],
  () => {
    highlightCode()
  },
  { immediate: true },
)

// 组件挂载后高亮代码
onMounted(() => {
  if (import.meta.client) {
    highlightCode()
    updateCodeTheme(currentTheme.value)
  }
})

// 切换主题
function changeTheme(newTheme: string) {
  currentTheme.value = newTheme
  updateCodeTheme(newTheme)
}

// CSS变量计算属性
const maxHeightVar = computed(() => props.maxHeight || null)
const bgColorVar = computed(() => props.bgColor || null)
const borderColorVar = computed(() => props.borderColor || null)
const headerBgColorVar = computed(() => props.headerBgColor || null)
</script>

<template>
  <div class="ui-code">
    <!-- 主题选择和语言显示 -->
    <div class="ui-code-header">
      <!-- 主题选择 -->
      <div class="flex items-center">
        <span class="mr-2 text-xs text-gray-500 dark:text-gray-400">主题:</span>
        <select
          v-if="availableThemes.length > 0"
          class="border border-gray-300 rounded p-1 text-xs dark:border-gray-600 dark:bg-gray-700"
          :value="currentTheme"
          @change="(e: Event) => changeTheme((e.target as HTMLSelectElement).value)"
        >
          <option v-for="themeOption in availableThemes" :key="themeOption.value" :value="themeOption.value">
            {{ themeOption.label }}
          </option>
        </select>
      </div>

      <!-- 语言显示 -->
      <div v-if="showLanguage" class="rounded px-2 py-1 text-xs font-medium uppercase opacity-70">
        {{ normalizedLang }}
      </div>
    </div>

    <!-- 代码展示区域 -->
    <div class="ui-code-content relative">
      <div class="ui-code-wrapper w-full flex overflow-x-auto">
        <!-- 代码内容 -->
        <client-only>
          <pre class="m-0 flex-1 overflow-auto"><code
            :id="uniqueId"
            ref="codeElement"
            class="hljs px-4 !text-shadow-none"
            v-html="highlightedCode"
          /></pre>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-code {
  --ui-code-bg-color: v-bind(bgColorVar);
  --ui-code-border-color: v-bind(borderColorVar);
  --ui-code-header-bg-color: v-bind(headerBgColorVar);
  --ui-code-max-height: v-bind(maxHeightVar);

  margin: 1rem 0;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: var(--ui-code-border-color, var(--ui-border-color, #e5e7eb));
  border-radius: 0.375rem;
  background-color: var(--ui-code-bg-color, var(--ui-bg-color, #ffffff));
}

.ui-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--ui-code-border-color, var(--ui-border-color, #e5e7eb));
  background-color: var(--ui-code-header-bg-color, var(--ui-bg-color-secondary, #f9fafb));
  padding: 0.5rem 0.75rem;
}

.ui-code-content {
  max-height: var(--ui-code-max-height, none);
  overflow: auto;
}

/* 深色模式适配 */
:root.dark .ui-code {
  border-color: var(--ui-code-border-color, var(--ui-border-color-dark, #374151));
  background-color: var(--ui-code-bg-color, var(--ui-bg-color-dark, #1f2937));
}

:root.dark .ui-code-header {
  border-color: var(--ui-code-border-color, var(--ui-border-color-dark, #374151));
  background-color: var(--ui-code-header-bg-color, var(--ui-bg-color-secondary-dark, #111827));
}
</style>
