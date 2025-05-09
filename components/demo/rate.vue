<script setup lang="ts" name="DemoRate">
/**
 * Rate评分组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */
import { ref } from 'vue'

// 基本评分值
const basicRate = ref(3)

// 半星评分值
const halfRate = ref(2.5)

// 自定义颜色评分值
const colorRate = ref(4)

// 自定义图标评分值
const iconRate = ref(3)

// 只读评分值
const readonlyRate = ref(3.5)

// 带文字评分值
const textRate = ref(4)

// 渐变色评分值
const gradientRate = ref(3)

// 渐变色数组
const gradientColors = [
  '#F56C6C', // 低分颜色，红色
  '#E6A23C', // 中低分颜色，橙色
  '#FFCC00', // 中等分颜色，黄色
  '#67C23A', // 中高分颜色，绿色
  '#409EFF', // 高分颜色，蓝色
]

// 描述文本数组
const rateTexts = ['极差', '失望', '一般', '满意', '惊喜']
</script>

<template>
  <div>
    <ui-typography>
      <ui-typography-title :level="3">
        Rate 评分组件
      </ui-typography-title>
      <ui-typography-paragraph>评分组件允许用户通过点击星星来给项目评分，可用于评价、打分等场景。</ui-typography-paragraph>
    </ui-typography>

    <!-- 基础用法 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        基础用法
      </ui-typography-title>
      <ui-typography-paragraph>最简单的评分组件用法。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="basicRate" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="basicRate" />` }}</code></pre>
      </div>
    </div>

    <!-- 半星 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        半星
      </ui-typography-title>
      <ui-typography-paragraph>通过 allow-half 属性可以支持选择半星。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="halfRate" allow-half />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="halfRate" allow-half />` }}</code></pre>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        自定义颜色
      </ui-typography-title>
      <ui-typography-paragraph>可以通过 color 和 void-color 属性自定义颜色。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="colorRate" color="#409EFF" void-color="#EBEEF5" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="colorRate" color="#409EFF" void-color="#EBEEF5" />` }}</code></pre>
      </div>
    </div>

    <!-- 自定义图标 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        自定义图标
      </ui-typography-title>
      <ui-typography-paragraph>可以通过 icon 和 void-icon 属性自定义图标。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="iconRate" icon="carbon:heart-filled" void-icon="carbon:heart" color="#F56C6C" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="iconRate" icon="carbon:heart-filled" void-icon="carbon:heart" color="#F56C6C" />` }}</code></pre>
      </div>
    </div>

    <!-- 只读 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        只读状态
      </ui-typography-title>
      <ui-typography-paragraph>readonly 属性将评分设置为只读状态，通常用于展示评分。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="readonlyRate" readonly allow-half />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="readonlyRate" readonly allow-half />` }}</code></pre>
      </div>
    </div>

    <!-- 辅助文字 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        辅助文字
      </ui-typography-title>
      <ui-typography-paragraph>通过 show-text 和 texts 属性显示辅助文字。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="textRate" show-text :texts="rateTexts" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="textRate" show-text :texts="rateTexts" />

// 描述文本数组
const rateTexts = ['极差', '失望', '一般', '满意', '惊喜']` }}</code></pre>
      </div>
    </div>

    <!-- 其他功能 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        渐变颜色
      </ui-typography-title>
      <ui-typography-paragraph>通过 colors 属性设置渐变颜色。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-rate v-model="gradientRate" :colors="gradientColors" />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="gradientRate" :colors="gradientColors" />

// 渐变色数组
const gradientColors = [
  '#F56C6C', // 低分颜色，红色
  '#E6A23C', // 中低分颜色，橙色
  '#FFCC00', // 中等分颜色，黄色
  '#67C23A', // 中高分颜色，绿色
  '#409EFF'  // 高分颜色，蓝色
]` }}</code></pre>
      </div>
    </div>

    <!-- 尺寸 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        不同尺寸
      </ui-typography-title>
      <ui-typography-paragraph>评分组件提供三种不同的尺寸。</ui-typography-paragraph>
      <div class="demo-component">
        <div class="demo-sizes">
          <div>
            <span class="size-label">小:</span>
            <ui-rate v-model="basicRate" size="small" />
          </div>
          <div>
            <span class="size-label">默认:</span>
            <ui-rate v-model="basicRate" />
          </div>
          <div>
            <span class="size-label">大:</span>
            <ui-rate v-model="basicRate" size="large" />
          </div>
          <div>
            <span class="size-label">自定义:</span>
            <ui-rate v-model="basicRate" :size="32" />
          </div>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-rate v-model="basicRate" size="small" />
<ui-rate v-model="basicRate" />
<ui-rate v-model="basicRate" size="large" />
<ui-rate v-model="basicRate" :size="32" />` }}</code></pre>
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
            <td>评分值</td>
            <td>number</td>
            <td>0</td>
          </tr>
          <tr>
            <td>max</td>
            <td>最大分值</td>
            <td>number</td>
            <td>5</td>
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
            <td>allow-half</td>
            <td>是否允许半选</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>是否可清空</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>评分图标</td>
            <td>string</td>
            <td>carbon:star-filled</td>
          </tr>
          <tr>
            <td>void-icon</td>
            <td>未选中图标</td>
            <td>string</td>
            <td>carbon:star</td>
          </tr>
          <tr>
            <td>color</td>
            <td>评分颜色</td>
            <td>string</td>
            <td>#FFCC00</td>
          </tr>
          <tr>
            <td>void-color</td>
            <td>未选中颜色</td>
            <td>string</td>
            <td>#C6D1DE</td>
          </tr>
          <tr>
            <td>colors</td>
            <td>不同分值对应的颜色</td>
            <td>string[]</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>size</td>
            <td>图标大小</td>
            <td>'small' | 'default' | 'large' | number</td>
            <td>default</td>
          </tr>
          <tr>
            <td>show-text</td>
            <td>是否显示辅助文字</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>texts</td>
            <td>辅助文字字典</td>
            <td>string[]</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>text-position</td>
            <td>辅助文字位置</td>
            <td>'left' | 'right'</td>
            <td>right</td>
          </tr>
          <tr>
            <td>show-score</td>
            <td>是否显示分数</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>text-template</td>
            <td>文字模板</td>
            <td>string</td>
            <td>{value}</td>
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
            <td>评分值变更时触发</td>
            <td>新评分值（number）</td>
          </tr>
          <tr>
            <td>change</td>
            <td>评分值变更时触发</td>
            <td>新评分值（number）</td>
          </tr>
          <tr>
            <td>hover-change</td>
            <td>鼠标悬停在不同值时触发</td>
            <td>当前悬停的值（number）</td>
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

.demo-sizes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-label {
  display: inline-block;
  width: 60px;
  font-size: 14px;
  color: #606266;
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
