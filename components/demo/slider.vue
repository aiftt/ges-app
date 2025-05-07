<script setup lang="ts" name="DemoSlider">
/**
 * 滑块组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { ref } from 'vue'

// 基础滑块
const basicValue = ref(30)

// 禁用状态
const disabledValue = ref(40)

// 自定义步长
const stepValue = ref(0)

// 显示输入框
const inputValue = ref(50)

// 范围选择
const rangeValue = ref([20, 80])

// 带刻度点
const stopsValue = ref(60)

// 带标记点
const marksValue = ref(40)
const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: {
    label: '100°C',
    style: {
      color: '#f00',
    },
  },
}

// 垂直模式
const verticalValue = ref(30)
const verticalRangeValue = ref([20, 50])

// 垂直模式 - 反转版
const verticalReversedValue = ref(70)
const verticalReversedRangeValue = ref([40, 80])

// 自定义颜色
const customColorValue = ref(70)

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
  <div class="demo-slider">
    <div class="demo-section">
      <h2 class="demo-title">
        基础滑块
      </h2>
      <div class="demo-row">
        <ui-slider v-model="basicValue" />
        <div class="demo-value">
          值: {{ basicValue }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        禁用状态
      </h2>
      <div class="demo-row">
        <ui-slider v-model="disabledValue" disabled />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        自定义步长
      </h2>
      <div class="demo-row">
        <ui-slider v-model="stepValue" :step="10" :show-stops="true" />
        <div class="demo-value">
          值: {{ stepValue }} (步长: 10)
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        显示输入框
      </h2>
      <div class="demo-row">
        <ui-slider v-model="inputValue" :show-input="true" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        范围选择
      </h2>
      <div class="demo-row">
        <ui-slider v-model="rangeValue" range />
        <div class="demo-value">
          值: {{ rangeValue }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        显示刻度点
      </h2>
      <div class="demo-row">
        <ui-slider v-model="stopsValue" :step="10" :show-stops="true" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        带标记点
      </h2>
      <div class="demo-row">
        <ui-slider v-model="marksValue" :marks="marks" />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        垂直模式
      </h2>
      <div class="demo-vertical-container">
        <div class="demo-vertical-item">
          <ui-slider v-model="verticalValue" vertical />
          <div class="demo-value w-24">
            值: {{ verticalValue }}
          </div>
        </div>
        <div class="demo-vertical-item">
          <ui-slider v-model="verticalRangeValue" vertical range :height="250" />
          <div class="demo-value w-24">
            值: {{ verticalRangeValue }}
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        垂直模式（反转）
      </h2>
      <p class="demo-description">
        reverse属性可以控制垂直模式下值的方向，设置为true时，值0在顶部，最大值在底部。
      </p>
      <div class="demo-vertical-container">
        <div class="demo-vertical-item">
          <ui-slider v-model="verticalReversedValue" vertical reverse :height="250" />
          <div class="demo-value w-24">
            值: {{ verticalReversedValue }}
          </div>
        </div>
        <div class="demo-vertical-item">
          <ui-slider v-model="verticalReversedRangeValue" vertical range reverse :height="250" />
          <div class="demo-value w-24">
            值: {{ verticalReversedRangeValue }}
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        自定义颜色
      </h2>
      <div class="demo-row">
        <ui-slider
          v-model="customColorValue"
          color="#8B5CF6"
          inactive-color="#F3E8FF"
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
        <ui-slider v-model="basicValue" />
        <div class="demo-value">
          值: {{ basicValue }}
        </div>
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
        code="<ui-slider v-model='value' />"
        language="html"
      />

      <h3 class="demo-subtitle">
        范围选择
      </h3>
      <ui-code
        code="<ui-slider v-model='value' range />"
        language="html"
      />

      <h3 class="demo-subtitle">
        带标记点
      </h3>
      <ui-code
        code="<ui-slider v-model='value' :marks='marks' />"
        language="html"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>

      <h3 class="demo-subtitle">
        Slider 属性
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
              <td>number / number[]</td>
              <td>0</td>
            </tr>
            <tr>
              <td>min</td>
              <td>最小值</td>
              <td>number</td>
              <td>0</td>
            </tr>
            <tr>
              <td>max</td>
              <td>最大值</td>
              <td>number</td>
              <td>100</td>
            </tr>
            <tr>
              <td>step</td>
              <td>步长</td>
              <td>number</td>
              <td>1</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showStops</td>
              <td>是否显示间断点</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showTooltip</td>
              <td>是否显示提示气泡</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>showInput</td>
              <td>是否显示输入框</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>vertical</td>
              <td>是否垂直模式</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>height</td>
              <td>滑块高度，垂直模式时使用</td>
              <td>number / string</td>
              <td>200</td>
            </tr>
            <tr>
              <td>range</td>
              <td>是否为范围选择</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>marks</td>
              <td>标记点</td>
              <td>Record&lt;number, string | { label: string; style?: object }&gt;</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>color</td>
              <td>滑块颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>inactiveColor</td>
              <td>未选中部分的颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>markColor</td>
              <td>标记点颜色</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>reverse</td>
              <td>是否反转值的方向（垂直模式下有效，true时值0在顶部）</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        Slider 事件
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
              <td>值改变时触发</td>
              <td>(value: number | number[])</td>
            </tr>
            <tr>
              <td>change</td>
              <td>值改变且结束拖动时触发</td>
              <td>(value: number | number[])</td>
            </tr>
            <tr>
              <td>input</td>
              <td>值改变时触发</td>
              <td>(value: number | number[])</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-slider {
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

.demo-vertical-container {
  display: flex;
  align-items: flex-start;
  gap: 48px;
  height: 300px;
}

.demo-vertical-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demo-vertical-item .demo-value {
  margin-top: 16px;
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

.demo-description {
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;
}

:root.dark .demo-description {
  color: #9ca3af;
}
</style>
