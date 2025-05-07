<script setup lang="ts" name="DemoRadio">
/**
 * 单选按钮组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { ref } from 'vue'

// 基本单选按钮
const checked = ref(false)

// 禁用状态
const disabledChecked = ref(true)

// 单选按钮组
const selectedFruit = ref('apple')
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]

// 垂直布局
const selectedFramework = ref('vue')
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

// 单选按钮卡片
const selectedCity = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

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
  <div class="demo-radio">
    <div class="demo-section">
      <h2 class="demo-title">
        基础单选按钮
      </h2>
      <div class="demo-row">
        <ui-radio v-model="checked">
          选择项
        </ui-radio>
        <div class="demo-value">
          值: {{ checked }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        禁用状态
      </h2>
      <div class="demo-row">
        <ui-radio disabled>
          未选中禁用
        </ui-radio>
      </div>

      <div class="demo-row">
        <ui-radio
          v-model="disabledChecked"
          disabled
        >
          选中禁用
        </ui-radio>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        尺寸变体
      </h2>
      <div class="demo-row">
        <ui-radio size="small">
          小尺寸
        </ui-radio>
      </div>

      <div class="demo-row">
        <ui-radio>
          默认尺寸
        </ui-radio>
      </div>

      <div class="demo-row">
        <ui-radio size="large">
          大尺寸
        </ui-radio>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        单选按钮组
      </h2>
      <div class="demo-row">
        <ui-radio-group
          v-model="selectedFruit"
          :options="fruitsOptions"
        />
        <div class="demo-value">
          选中值: {{ selectedFruit }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        垂直布局
      </h2>
      <div class="demo-row">
        <ui-radio-group
          v-model="selectedFramework"
          :options="frameworkOptions"
          direction="vertical"
        />
        <div class="demo-value">
          选中值: {{ selectedFramework }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        自定义单选按钮
      </h2>
      <div class="demo-row">
        <ui-radio-group v-model="selectedCity" name="city">
          <ui-radio
            v-for="city in cityOptions"
            :key="city.value"
            :value="city.value"
            class="custom-radio-card"
          >
            {{ city.label }}
          </ui-radio>
        </ui-radio-group>
        <div class="demo-value">
          选中城市: {{ selectedCity }}
        </div>
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
        <ui-radio>
          自动适应当前主题
        </ui-radio>
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
        code="<ui-radio v-model='checked'>选择项</ui-radio>"
        language="html"
      />

      <h3 class="demo-subtitle">
        单选按钮组
      </h3>
      <ui-code
        code="<ui-radio-group v-model='selectedValue' :options='options' />"
        language="html"
      />

      <h3 class="demo-subtitle">
        使用插槽自定义
      </h3>
      <ui-code
        code="<ui-radio-group v-model='selectedValue' name='group-name'>
  <ui-radio value='1'>选项一</ui-radio>
  <ui-radio value='2'>选项二</ui-radio>
  <ui-radio value='3'>选项三</ui-radio>
</ui-radio-group>"
        language="html"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>

      <h3 class="demo-subtitle">
        Radio 属性
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
              <td>value</td>
              <td>单选按钮值，用于在RadioGroup中使用</td>
              <td>string / number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>尺寸</td>
              <td>'small' / 'default' / 'large'</td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生name属性</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        Radio 事件
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
              <td>选中状态变化时触发</td>
              <td>(value: boolean)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>选中状态变化时触发</td>
              <td>(value: boolean)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        RadioGroup 属性
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
              <td>string / number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>options</td>
              <td>可选项数组</td>
              <td>Array&lt;{label, value, disabled?}&gt;</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>尺寸</td>
              <td>'small' / 'default' / 'large'</td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>direction</td>
              <td>排列方向</td>
              <td>'horizontal' / 'vertical'</td>
              <td>'horizontal'</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生name属性，用于表单提交</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        RadioGroup 事件
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
              <td>选中值变化时触发</td>
              <td>(value: string | number)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>选中值变化时触发</td>
              <td>(value: string | number)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-radio {
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
  margin-left: 16px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #2563eb;
}

.custom-radio-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.custom-radio-card.ui-radio--checked {
  border-color: var(--ui-color-primary, #10b981);
  background-color: rgba(16, 185, 129, 0.1);
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

:root.dark .custom-radio-card {
  border-color: #4b5563;
}

:root.dark .custom-radio-card.ui-radio--checked {
  border-color: var(--ui-color-primary, #10b981);
  background-color: rgba(16, 185, 129, 0.2);
}
</style>
