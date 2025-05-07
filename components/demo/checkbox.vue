<script setup lang="ts" name="DemoCheckbox">
/**
 * 复选框组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { ref } from 'vue'

// 基本复选框
const checked = ref(false)
const indeterminate = ref(true)

// 禁用状态
const disabledChecked = ref(true)

// 复选框组
const groupValues = ref(['apple', 'orange'])
const fruitsOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape', disabled: true },
]

// 限制选择数量
const limitedValues = ref(['option1'])
const limitedOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
]

// 垂直布局
const verticalValues = ref(['react'])
const frameworkOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

// 全选功能
const allChecked = ref(false)
const allIndeterminate = ref(false)
const cities = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false },
])

// 监听全选变化
function handleCheckAllChange(val: boolean) {
  cities.value.forEach((city) => {
    city.checked = val
  })
  allIndeterminate.value = false
}

// 监听单个城市选择变化
function handleCityChange() {
  const checkedCount = cities.value.filter(city => city.checked).length
  allChecked.value = checkedCount === cities.value.length
  allIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
}

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
  <div class="demo-checkbox">
    <div class="demo-section">
      <h2 class="demo-title">
        基础复选框
      </h2>
      <div class="demo-row">
        <ui-checkbox v-model="checked">
          选项
        </ui-checkbox>
        <div class="demo-value">
          值: {{ checked }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        中间状态
      </h2>
      <div class="demo-row">
        <ui-checkbox
          v-model="checked"
          :indeterminate="indeterminate"
        >
          中间状态
        </ui-checkbox>
        <button class="demo-button" @click="indeterminate = !indeterminate">
          切换中间态: {{ indeterminate ? '开启' : '关闭' }}
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        禁用状态
      </h2>
      <div class="demo-row">
        <ui-checkbox disabled>
          未选中禁用
        </ui-checkbox>
      </div>

      <div class="demo-row">
        <ui-checkbox
          v-model="disabledChecked"
          disabled
        >
          选中禁用
        </ui-checkbox>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        尺寸变体
      </h2>
      <div class="demo-row">
        <ui-checkbox size="small">
          小尺寸
        </ui-checkbox>
      </div>

      <div class="demo-row">
        <ui-checkbox>
          默认尺寸
        </ui-checkbox>
      </div>

      <div class="demo-row">
        <ui-checkbox size="large">
          大尺寸
        </ui-checkbox>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        复选框组
      </h2>
      <div class="demo-row">
        <ui-checkbox-group
          v-model="groupValues"
          :options="fruitsOptions"
        />
        <div class="demo-value">
          选中值: {{ groupValues }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        限制选择数量
      </h2>
      <div class="demo-row">
        <ui-checkbox-group
          v-model="limitedValues"
          :options="limitedOptions"
          :min="1"
          :max="2"
        />
        <div class="demo-value">
          选中值: {{ limitedValues }}
          <br>
          限制: 最少1项，最多2项
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        垂直布局
      </h2>
      <div class="demo-row">
        <ui-checkbox-group
          v-model="verticalValues"
          :options="frameworkOptions"
          direction="vertical"
        />
        <div class="demo-value">
          选中值: {{ verticalValues }}
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        全选功能
      </h2>
      <div class="demo-row">
        <ui-checkbox
          v-model="allChecked"
          :indeterminate="allIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </ui-checkbox>
      </div>
      <div class="demo-row cities-list">
        <ui-checkbox
          v-for="city in cities"
          :key="city.value"
          v-model="city.checked"
          @change="handleCityChange"
        >
          {{ city.label }}
        </ui-checkbox>
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
        <ui-checkbox>
          自动适应当前主题
        </ui-checkbox>
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
        code="<ui-checkbox v-model='checked'>选择项</ui-checkbox>"
        language="html"
      />

      <h3 class="demo-subtitle">
        复选框组
      </h3>
      <ui-code
        code="<ui-checkbox-group v-model='values' :options='options' />"
        language="html"
      />

      <h3 class="demo-subtitle">
        使用插槽自定义
      </h3>
      <ui-code
        code="<ui-checkbox-group v-model='selectedValues'>
  <ui-checkbox value='1'>选项一</ui-checkbox>
  <ui-checkbox value='2'>选项二</ui-checkbox>
  <ui-checkbox value='3'>选项三</ui-checkbox>
</ui-checkbox-group>"
        language="html"
      />
    </div>

    <div class="demo-section">
      <h2 class="demo-title">
        API 参考
      </h2>

      <h3 class="demo-subtitle">
        Checkbox 属性
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
              <td>选项值，用于在CheckboxGroup中使用</td>
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
            <tr>
              <td>indeterminate</td>
              <td>是否为中间状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        Checkbox 事件
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
        CheckboxGroup 属性
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
              <td>绑定值数组</td>
              <td>(string | number)[]</td>
              <td>[]</td>
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
              <td>min</td>
              <td>可选的最小数量</td>
              <td>number</td>
              <td>0</td>
            </tr>
            <tr>
              <td>max</td>
              <td>可选的最大数量</td>
              <td>number</td>
              <td>Infinity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="demo-subtitle">
        CheckboxGroup 事件
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
              <td>(value: (string | number)[])</td>
            </tr>
            <tr>
              <td>change</td>
              <td>选中值变化时触发</td>
              <td>(value: (string | number)[])</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-checkbox {
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

.cities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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
