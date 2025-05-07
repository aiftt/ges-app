<script setup lang="ts" name="DemoSwitch">
/**
 * 开关组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { ref } from 'vue'

// 基础开关
const basicSwitch = ref(false)

// 禁用状态
const disabledSwitch = ref(true)

// 加载状态
const loadingSwitch = ref(true)

// 不同尺寸
const smallSwitch = ref(false)
const defaultSwitch = ref(true)
const largeSwitch = ref(false)

// 自定义颜色
const customColorSwitch = ref(true)

// 带有文本描述
const withTextSwitch = ref(false)

// 方形开关
const squareSwitch = ref(true)

// 主题模式
const isDarkMode = ref(false)

// 切换主题模式
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  const html = document.documentElement

  if (isDarkMode.value) {
    html.classList.add('dark')
  }
  else {
    html.classList.remove('dark')
  }
}
</script>

<template>
  <div class="demo-switch">
    <div class="demo-section">
      <h2 class="demo-title">
        基础开关
      </h2>
      <div class="demo-row">
        <ui-switch v-model="basicSwitch" />
        <div class="demo-value">
          值: {{ basicSwitch }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        禁用状态
      </h2>
      <div class="demo-row">
        <ui-switch disabled />
        <ui-switch disabled :model-value="disabledSwitch" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        加载状态
      </h2>
      <div class="demo-row">
        <ui-switch loading />
        <ui-switch loading :model-value="loadingSwitch" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        尺寸变体
      </h2>
      <div class="demo-row">
        <ui-switch v-model="smallSwitch" size="small" />
        <ui-switch v-model="defaultSwitch" />
        <ui-switch v-model="largeSwitch" size="large" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        自定义颜色
      </h2>
      <div class="demo-row">
        <ui-switch v-model="customColorSwitch" active-color="#8B5CF6" inactive-color="#F3E8FF" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        带有文本描述
      </h2>
      <div class="demo-row">
        <ui-switch
          v-model="withTextSwitch"
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        方形按钮
      </h2>
      <div class="demo-row">
        <ui-switch v-model="squareSwitch" square />
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
        <ui-switch />
        <ui-switch model-value />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        代码示例
      </h2>
      <h3 class="demo-subtitle">
        基础用法
      </h3>
      <ui-code
        code="<ui-switch v-model='checked' />"
        language="html"
      />

      <h3 class="demo-subtitle">
        禁用状态
      </h3>
      <ui-code
        code="<ui-switch v-model='checked' disabled />"
        language="html"
      />

      <h3 class="demo-subtitle">
        自定义颜色
      </h3>
      <ui-code
        code="<ui-switch v-model='checked' active-color='#8B5CF6' inactive-color='#F3E8FF' />"
        language="html"
      />

      <h3 class="demo-subtitle">
        带有文本描述
      </h3>
      <ui-code
        code="<ui-switch v-model='checked' active-text='开启' inactive-text='关闭' />"
        language="html"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>

      <h3 class="demo-subtitle">
        Switch 属性
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
              <td>绑定值</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>是否为加载状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>开关尺寸</td>
              <td>'small' / 'default' / 'large'</td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>activeText</td>
              <td>开启状态的文本</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>inactiveText</td>
              <td>关闭状态的文本</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>activeValue</td>
              <td>开启状态的值</td>
              <td>string / number / boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>inactiveValue</td>
              <td>关闭状态的值</td>
              <td>string / number / boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>activeColor</td>
              <td>开启状态的颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>inactiveColor</td>
              <td>关闭状态的颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生name属性</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>square</td>
              <td>是否为方形按钮</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        Switch 事件
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
              <td>开关状态变化时触发</td>
              <td>(value: boolean)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>开关状态变化时触发</td>
              <td>(value: boolean)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-switch {
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-value {
  margin-left: 16px;
  font-size: 14px;
  color: #6b7280;
}

.demo-button {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #2563eb;
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
