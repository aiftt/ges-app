<script setup lang="ts" name="DemoColorPicker">
/**
 * ColorPicker颜色选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */
import { ref } from 'vue'

// 基本颜色
const basicColor = ref('#409EFF')

// 带透明度颜色
const alphaColor = ref('rgba(64, 158, 255, 0.5)')

// 不同格式颜色
const hexColor = ref('#67C23A')
const rgbColor = ref('rgb(103, 194, 58)')
const hslColor = ref('hsl(96, 54%, 49%)')

// 只读和禁用状态
const readonlyColor = ref('#E6A23C')
const disabledColor = ref('#F56C6C')

// 自定义预设颜色
const customPresetColor = ref('#409EFF')
const customPresets = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#000000',
  '#ffffff',
]
</script>

<template>
  <div>
    <ui-typography>
      <ui-typography-title :level="3">
        ColorPicker 颜色选择器
      </ui-typography-title>
      <ui-typography-paragraph>用于颜色选择，支持多种颜色格式。</ui-typography-paragraph>
    </ui-typography>

    <!-- 基础用法 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        基础用法
      </ui-typography-title>
      <ui-typography-paragraph>基础颜色选择器。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-input-color-picker v-model="basicColor" />
        <div class="demo-value">
          当前值: {{ basicColor }}
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="basicColor" />` }}</code></pre>
      </div>
    </div>

    <!-- 透明度 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        带透明度
      </ui-typography-title>
      <ui-typography-paragraph>通过 show-alpha 属性支持选择透明度。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-input-color-picker v-model="alphaColor" show-alpha format="rgb" />
        <div class="demo-value">
          当前值: {{ alphaColor }}
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="alphaColor" show-alpha format="rgb" />` }}</code></pre>
      </div>
    </div>

    <!-- 不同颜色格式 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        不同颜色格式
      </ui-typography-title>
      <ui-typography-paragraph>支持hex、rgb、hsl三种格式。</ui-typography-paragraph>
      <div class="demo-component">
        <div class="format-row">
          <span class="format-label">HEX:</span>
          <ui-input-color-picker v-model="hexColor" format="hex" />
          <span class="format-value">{{ hexColor }}</span>
        </div>
        <div class="format-row">
          <span class="format-label">RGB:</span>
          <ui-input-color-picker v-model="rgbColor" format="rgb" />
          <span class="format-value">{{ rgbColor }}</span>
        </div>
        <div class="format-row">
          <span class="format-label">HSL:</span>
          <ui-input-color-picker v-model="hslColor" format="hsl" />
          <span class="format-value">{{ hslColor }}</span>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="hexColor" format="hex" />
<ui-input-color-picker v-model="rgbColor" format="rgb" />
<ui-input-color-picker v-model="hslColor" format="hsl" />` }}</code></pre>
      </div>
    </div>

    <!-- 只读和禁用状态 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        只读和禁用状态
      </ui-typography-title>
      <ui-typography-paragraph>支持只读和禁用状态。</ui-typography-paragraph>
      <div class="demo-component">
        <div class="state-row">
          <span class="state-label">只读:</span>
          <ui-input-color-picker v-model="readonlyColor" readonly />
        </div>
        <div class="state-row">
          <span class="state-label">禁用:</span>
          <ui-input-color-picker v-model="disabledColor" disabled />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="readonlyColor" readonly />
<ui-input-color-picker v-model="disabledColor" disabled />` }}</code></pre>
      </div>
    </div>

    <!-- 自定义预设颜色 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        自定义预设颜色
      </ui-typography-title>
      <ui-typography-paragraph>通过 preset-colors 属性自定义预设颜色。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-input-color-picker v-model="customPresetColor" :preset-colors="customPresets" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="customPresetColor" :preset-colors="customPresets" />

// 自定义预设颜色
const customPresets = [
  '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1',
  '#1e90ff', '#c71585', '#000000', '#ffffff'
]` }}</code></pre>
      </div>
    </div>

    <!-- 尺寸 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        不同尺寸
      </ui-typography-title>
      <ui-typography-paragraph>颜色选择器提供三种不同的尺寸。</ui-typography-paragraph>
      <div class="demo-component">
        <div class="demo-sizes">
          <div>
            <span class="size-label">小:</span>
            <ui-input-color-picker v-model="basicColor" size="small" />
          </div>
          <div>
            <span class="size-label">默认:</span>
            <ui-input-color-picker v-model="basicColor" />
          </div>
          <div>
            <span class="size-label">大:</span>
            <ui-input-color-picker v-model="basicColor" size="large" />
          </div>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-input-color-picker v-model="basicColor" size="small" />
<ui-input-color-picker v-model="basicColor" />
<ui-input-color-picker v-model="basicColor" size="large" />` }}</code></pre>
      </div>
    </div>

    <!-- 属性表格 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        属性
      </ui-typography-title>
      <table class="demo-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>modelValue / v-model</td>
            <td>绑定值（十六进制颜色值）</td>
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
            <td>size</td>
            <td>尺寸</td>
            <td>'small' | 'default' | 'large'</td>
            <td>default</td>
          </tr>
          <tr>
            <td>show-alpha</td>
            <td>是否显示透明度控制</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>format</td>
            <td>格式化颜色值的格式</td>
            <td>'hex' | 'rgb' | 'hsl'</td>
            <td>hex</td>
          </tr>
          <tr>
            <td>allow-custom</td>
            <td>是否支持自定义颜色输入</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>preset-colors</td>
            <td>预设颜色</td>
            <td>string[]</td>
            <td>预设颜色列表</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>是否可清空</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>placement</td>
            <td>弹出位置</td>
            <td>'top' | 'bottom'</td>
            <td>bottom</td>
          </tr>
          <tr>
            <td>popover-width</td>
            <td>颜色面板宽度</td>
            <td>number | string</td>
            <td>250</td>
          </tr>
          <tr>
            <td>show-history</td>
            <td>是否显示历史记录</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>history-max</td>
            <td>历史记录最大数量</td>
            <td>number</td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 事件表格 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        事件
      </ui-typography-title>
      <table class="demo-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>颜色值变更时触发</td>
            <td>新颜色值（string）</td>
          </tr>
          <tr>
            <td>change</td>
            <td>颜色值变更时触发</td>
            <td>新颜色值（string）</td>
          </tr>
          <tr>
            <td>visible-change</td>
            <td>下拉面板显示/隐藏时触发</td>
            <td>是否显示（boolean）</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>色彩选择器失去焦点时触发</td>
            <td>-</td>
          </tr>
          <tr>
            <td>focus</td>
            <td>色彩选择器获得焦点时触发</td>
            <td>-</td>
          </tr>
          <tr>
            <td>clear</td>
            <td>清空颜色时触发</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 32px;
}

.demo-component {
  margin-top: 16px;
  padding: 24px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}

.demo-code {
  margin-top: 16px;
  padding: 16px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
}

.demo-value {
  margin-top: 12px;
  font-size: 14px;
  color: #606266;
}

.format-row,
.state-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.format-row:last-child,
.state-row:last-child {
  margin-bottom: 0;
}

.format-label,
.state-label,
.size-label {
  display: inline-block;
  width: 60px;
  font-size: 14px;
  color: #606266;
}

.format-value {
  margin-left: 16px;
  font-size: 14px;
  color: #606266;
}

.demo-sizes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
}

.demo-table th,
.demo-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.demo-table th {
  background-color: #f7f8fa;
  color: #606266;
  font-weight: 500;
}

.demo-table td {
  color: #606266;
}
</style>
