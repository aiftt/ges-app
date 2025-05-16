<script setup lang="ts" name="DemoRate">
/**
 * Rate评分组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoRate')

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

// 处理评分变更事件
function handleChange(value: number) {
  logger.info('评分变更:', value)
}

// 处理鼠标悬停事件
function handleHoverChange(value: number) {
  logger.info('鼠标悬停:', value)
}

// 示例代码字符串
const basicCode = `<template>
  <ui-rate v-model="value" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(3)

function handleChange(value) {
  console.log('评分变更:', value)
}
<\/script>`

const halfCode = `<template>
  <ui-rate v-model="value" allow-half />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(2.5)
<\/script>`

const colorCode = `<template>
  <ui-rate v-model="value" color="#409EFF" void-color="#EBEEF5" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(4)
<\/script>`

const iconCode = `<template>
  <ui-rate
    v-model="value"
    icon="mdi:heart"
    void-icon="mdi:heart-outline"
    color="#F56C6C"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(3)
<\/script>`

const readonlyCode = `<template>
  <ui-rate v-model="value" allow-half readonly />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(3.5)
<\/script>`

const textCode = `<template>
  <ui-rate v-model="value" show-text :texts="texts" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(4)
const texts = ['极差', '失望', '一般', '满意', '惊喜']
<\/script>`

const gradientCode = `<template>
  <ui-rate v-model="value" :colors="colors" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(3)
// 渐变色数组
const colors = [
  '#F56C6C', // 低分颜色，红色
  '#E6A23C', // 中低分颜色，橙色
  '#FFCC00', // 中等分颜色，黄色
  '#67C23A', // 中高分颜色，绿色
  '#409EFF'  // 高分颜色，蓝色
]
<\/script>`

const sizeCode = `<template>
  <div class="space-y-4">
    <div>
      <span class="inline-block w-16 text-sm">小:</span>
      <ui-rate v-model="value" size="small" />
    </div>
    <div>
      <span class="inline-block w-16 text-sm">默认:</span>
      <ui-rate v-model="value" />
    </div>
    <div>
      <span class="inline-block w-16 text-sm">大:</span>
      <ui-rate v-model="value" size="large" />
    </div>
    <div>
      <span class="inline-block w-16 text-sm">自定义:</span>
      <ui-rate v-model="value" :size="32" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(3)
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Rate 评分
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      评分组件允许用户通过点击星星来给项目评分，可用于评价、打分等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最简单的评分组件用法。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-rate v-model="basicRate" @change="handleChange" @hover-change="handleHoverChange" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前评分: {{ basicRate }}
        </div>
      </div>
    </ui-demo>

    <!-- 半星 -->
    <ui-demo
      title="半星"
      description="通过allow-half属性可以支持选择半星。"
      :code="halfCode"
    >
      <div class="space-y-4">
        <ui-rate v-model="halfRate" allow-half />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前评分: {{ halfRate }}
        </div>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="可以通过color和void-color属性自定义评分组件的颜色。"
      :code="colorCode"
    >
      <ui-rate v-model="colorRate" color="#409EFF" void-color="#EBEEF5" />
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="可以通过icon和void-icon属性自定义评分组件的图标。"
      :code="iconCode"
    >
      <ui-rate v-model="iconRate" icon="mdi:heart" void-icon="mdi:heart-outline" color="#F56C6C" />
    </ui-demo>

    <!-- 只读状态 -->
    <ui-demo
      title="只读状态"
      description="readonly属性将评分设置为只读状态，通常用于展示评分。"
      :code="readonlyCode"
    >
      <ui-rate v-model="readonlyRate" allow-half readonly />
    </ui-demo>

    <!-- 辅助文字 -->
    <ui-demo
      title="辅助文字"
      description="通过show-text和texts属性显示辅助文字。"
      :code="textCode"
    >
      <ui-rate v-model="textRate" show-text :texts="rateTexts" />
    </ui-demo>

    <!-- 渐变颜色 -->
    <ui-demo
      title="渐变颜色"
      description="通过colors属性设置不同分值对应的颜色。"
      :code="gradientCode"
    >
      <ui-rate v-model="gradientRate" :colors="gradientColors" />
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="评分组件提供三种不同的尺寸，以及支持自定义尺寸。"
      :code="sizeCode"
    >
      <div class="space-y-4">
        <div>
          <span class="inline-block w-16 text-sm dark:text-gray-400">小:</span>
          <ui-rate v-model="basicRate" size="small" />
        </div>
        <div>
          <span class="inline-block w-16 text-sm dark:text-gray-400">默认:</span>
          <ui-rate v-model="basicRate" />
        </div>
        <div>
          <span class="inline-block w-16 text-sm dark:text-gray-400">大:</span>
          <ui-rate v-model="basicRate" size="large" />
        </div>
        <div>
          <span class="inline-block w-16 text-sm dark:text-gray-400">自定义:</span>
          <ui-rate v-model="basicRate" :size="32" />
        </div>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Rate组件的属性、事件和方法。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                名称
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                modelValue / v-model
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                评分值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                0
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                max
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最大分值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                5
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                readonly
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否只读
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                allow-half
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否允许半选
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clearable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可清空
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                icon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                评分图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                carbon:star-filled
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                void-icon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                未选中图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                carbon:star
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                评分颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                #FFCC00
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                void-color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                未选中颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                #C6D1DE
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                colors
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                不同分值对应的颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                图标大小
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' | 'default' | 'large' | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                default
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                show-text
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示辅助文字
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                texts
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                辅助文字字典
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                text-position
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                辅助文字位置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left' | 'right'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                right
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                show-score
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示分数
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                text-template
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文字模板
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                {value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                评分值变更时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                新评分值（number）
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                评分值变更时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                新评分值（number）
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                hover-change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                鼠标悬停在不同值时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当前悬停的值（number）
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
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
