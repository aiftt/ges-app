<script setup lang="ts" name="DemoDynamicStyles">
/**
 * 动态样式示例
 * 创建日期: 2025-03-01
 * 作者: aiftt
 *
 * 展示如何使用v-bind + CSS变量实现动态样式
 */

// 边框组件样式控制
const borderType = ref('solid')
const borderTypes = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']
const borderWidth = ref('2px')
const borderColor = ref('#10b981')
const borderRadius = ref('8px')
const borderPadding = ref('16px')
const borderShadow = ref('md')
const shadowOptions = ['sm', 'base', 'md', 'lg', 'xl', '2xl']
const hoverBorderColor = ref('#ef4444')
const hoverScale = ref('1.05')

// 分割线组件样式控制
const dividerDirection = ref('horizontal')
const dividerType = ref('solid')
const dividerTypes = ['solid', 'dashed', 'dotted']
const dividerColor = ref('#3b82f6')
const dividerWidth = ref('2px')
const dividerMargin = ref('24px')
const dividerWithText = ref(true)
const dividerTextPosition = ref('center')
const textPositions = ['left', 'center', 'right']
const dividerText = ref('分割线文本')

// 滚动条组件样式控制
const scrollbarHeight = ref('200px')
const scrollbarBarWidth = ref('6px')
const scrollbarBarRadius = ref('3px')
const scrollbarBarColor = ref('#10b981')
const scrollbarBarHoverColor = ref('#047857')
const scrollbarDirection = ref('both')
const directions = ['vertical', 'horizontal', 'both']
const scrollbarHover = ref(true)

// 背景色切换
const isDarkMode = ref(false)
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}
</script>

<template>
  <div class="demo-dynamic-styles" :class="{ 'dark-theme': isDarkMode }">
    <h2 class="demo-title">
      动态样式示例
    </h2>
    <p class="demo-description">
      本示例展示如何使用v-bind + CSS变量实现组件动态样式
    </p>

    <div class="theme-toggle">
      <button class="toggle-btn" @click="toggleDarkMode">
        {{ isDarkMode ? '切换浅色模式' : '切换深色模式' }}
      </button>
    </div>

    <div class="demo-section">
      <h3>边框组件</h3>

      <div class="preview-container">
        <ui-border
          :type="borderType"
          :width="borderWidth"
          :color="borderColor"
          :radius="borderRadius"
          :padding="borderPadding"
          :shadow="borderShadow"
          :hover-border-color="hoverBorderColor"
          :hover-scale="hoverScale"
        >
          <div class="border-content">
            <h4>动态边框演示</h4>
            <p>该边框使用v-bind + CSS变量实现样式，可以通过调整控制面板动态改变样式</p>
          </div>
        </ui-border>
      </div>

      <div class="controls-container">
        <div class="control-item">
          <label>边框类型</label>
          <select v-model="borderType">
            <option v-for="type in borderTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="control-item">
          <label>边框宽度</label>
          <input v-model="borderWidth" type="text">
        </div>

        <div class="control-item">
          <label>边框颜色</label>
          <input v-model="borderColor" type="color">
        </div>

        <div class="control-item">
          <label>边框圆角</label>
          <input v-model="borderRadius" type="text">
        </div>

        <div class="control-item">
          <label>内边距</label>
          <input v-model="borderPadding" type="text">
        </div>

        <div class="control-item">
          <label>阴影</label>
          <select v-model="borderShadow">
            <option v-for="shadow in shadowOptions" :key="shadow" :value="shadow">
              {{ shadow }}
            </option>
          </select>
        </div>

        <div class="control-item">
          <label>悬停边框颜色</label>
          <input v-model="hoverBorderColor" type="color">
        </div>

        <div class="control-item">
          <label>悬停缩放</label>
          <input v-model="hoverScale" type="number" step="0.01" min="1" max="2">
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>分割线组件</h3>

      <div class="preview-container divider-preview">
        <ui-divider
          :direction="dividerDirection"
          :with-text="dividerWithText"
          :text-position="dividerTextPosition"
          :type="dividerType"
          :color="dividerColor"
          :width="dividerWidth"
          :margin="dividerMargin"
          :text="dividerText"
        />
      </div>

      <div class="controls-container">
        <div class="control-item">
          <label>方向</label>
          <select v-model="dividerDirection">
            <option value="horizontal">
              水平
            </option>
            <option value="vertical">
              垂直
            </option>
          </select>
        </div>

        <div class="control-item">
          <label>类型</label>
          <select v-model="dividerType">
            <option v-for="type in dividerTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="control-item">
          <label>颜色</label>
          <input v-model="dividerColor" type="color">
        </div>

        <div class="control-item">
          <label>宽度</label>
          <input v-model="dividerWidth" type="text">
        </div>

        <div class="control-item">
          <label>边距</label>
          <input v-model="dividerMargin" type="text">
        </div>

        <div class="control-item">
          <label>显示文本</label>
          <input v-model="dividerWithText" type="checkbox">
        </div>

        <div v-if="dividerWithText" class="control-item">
          <label>文本位置</label>
          <select v-model="dividerTextPosition">
            <option v-for="pos in textPositions" :key="pos" :value="pos">
              {{ pos }}
            </option>
          </select>
        </div>

        <div v-if="dividerWithText" class="control-item">
          <label>文本内容</label>
          <input v-model="dividerText" type="text">
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>滚动条组件</h3>

      <div class="preview-container">
        <ui-scrollbar
          :height="scrollbarHeight"
          :bar-width="scrollbarBarWidth"
          :bar-radius="scrollbarBarRadius"
          :bar-color="scrollbarBarColor"
          :bar-hover-color="scrollbarBarHoverColor"
          :direction="scrollbarDirection"
          :hover="scrollbarHover"
          class="scrollbar-demo"
        >
          <div class="scrollbar-content">
            <p v-for="i in 20" :key="i" class="scrollbar-item">
              这是滚动内容示例行 #{{ i }}
            </p>
          </div>
        </ui-scrollbar>
      </div>

      <div class="controls-container">
        <div class="control-item">
          <label>容器高度</label>
          <input v-model="scrollbarHeight" type="text">
        </div>

        <div class="control-item">
          <label>滚动条宽度</label>
          <input v-model="scrollbarBarWidth" type="text">
        </div>

        <div class="control-item">
          <label>滚动条圆角</label>
          <input v-model="scrollbarBarRadius" type="text">
        </div>

        <div class="control-item">
          <label>滚动条颜色</label>
          <input v-model="scrollbarBarColor" type="color">
        </div>

        <div class="control-item">
          <label>滚动条悬停颜色</label>
          <input v-model="scrollbarBarHoverColor" type="color">
        </div>

        <div class="control-item">
          <label>滚动方向</label>
          <select v-model="scrollbarDirection">
            <option v-for="dir in directions" :key="dir" :value="dir">
              {{ dir }}
            </option>
          </select>
        </div>

        <div class="control-item">
          <label>悬停显示滚动条</label>
          <input v-model="scrollbarHover" type="checkbox">
        </div>
      </div>
    </div>

    <div class="code-section">
      <h3>代码示例</h3>
      <pre><code>{{ `<script setup>
// 使用计算属性和v-bind实现CSS变量
const dividerColor = computed(() => props.color || null)
const dividerWidth = computed(() => props.width ? \`\${props.width}\` : null)
</script>

<style scoped>
.ui-component {
  --ui-component-color: v-bind(dividerColor);
  --ui-component-width: v-bind(dividerWidth);
}
</style>` }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.demo-dynamic-styles {
  --demo-bg-color: #f9fafb;
  --demo-text-color: #1f2937;
  --demo-border-color: #e5e7eb;
  --demo-highlight-color: #10b981;

  padding: 24px;
  background-color: var(--demo-bg-color);
  color: var(--demo-text-color);
  font-family: system-ui, sans-serif;
  transition: all 0.3s;
}

.dark-theme {
  --demo-bg-color: #1f2937;
  --demo-text-color: #f9fafb;
  --demo-border-color: #4b5563;
  --demo-highlight-color: #34d399;
}

.demo-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--demo-highlight-color);
}

.demo-description {
  font-size: 16px;
  margin-bottom: 24px;
}

.theme-toggle {
  margin-bottom: 24px;
}

.toggle-btn {
  padding: 8px 16px;
  background-color: var(--demo-highlight-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.demo-section {
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid var(--demo-border-color);
  border-radius: 8px;
}

.demo-section h3 {
  font-size: 18px;
  margin-bottom: 16px;
}

.preview-container {
  margin-bottom: 24px;
}

.divider-preview {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-content {
  text-align: center;
}

.border-content h4 {
  font-size: 16px;
  margin-bottom: 8px;
}

.border-content p {
  font-size: 14px;
}

.controls-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.control-item {
  display: flex;
  flex-direction: column;
}

.control-item label {
  font-size: 14px;
  margin-bottom: 4px;
}

.control-item input,
.control-item select {
  padding: 6px 8px;
  border: 1px solid var(--demo-border-color);
  border-radius: 4px;
  background-color: var(--demo-bg-color);
  color: var(--demo-text-color);
}

.code-section {
  margin-top: 32px;
}

.code-section pre {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

.scrollbar-demo {
  border: 1px solid var(--demo-border-color);
  border-radius: 4px;
}

.scrollbar-content {
  padding: 16px;
}

.scrollbar-item {
  padding: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.dark-theme .scrollbar-item {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
