<script setup lang="ts" name="DemoInputNumber">
/**
 * 数字输入框组件演示
 * 创建日期: 2024-07-05
 * 作者: aiftt
 * 更新日期: 2024-07-05 - 初始实现
 */

import { ref } from 'vue'

// 基础演示数据
const basicValue = ref(5)

// 小数演示数据
const decimalValue = ref(1.5)

// 最大最小值演示数据
const limitedValue = ref(5)

// 精度演示数据
const precisionValue = ref(2.5)

// 尺寸演示数据
const sizeValue = ref(5)

// 按钮位置演示数据
const positionValue = ref(5)

// 步长演示数据
const stepValue = ref(5)

// 禁用演示数据
const disabledValue = ref(10)

// 只读演示数据
const readonlyValue = ref(50)

// 自定义样式演示数据
const customValue = ref(8)
</script>

<template>
  <div class="demo-input-number">
    <h2 class="mb-6 text-2xl text-gray-900 font-semibold dark:text-white">
      Input Number 数字输入框
    </h2>

    <!-- 基础用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        最基本的数字输入框，支持键盘操作。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="basicValue"
            placeholder="请输入数字"
          />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ basicValue }}
        </div>
      </div>
    </section>

    <!-- 带小数点 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        小数支持
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持输入小数，可以设置精度。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="decimalValue"
            :precision="2"
            :step="0.1"
            placeholder="请输入小数"
          />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ decimalValue }}
        </div>
      </div>
    </section>

    <!-- 最大值和最小值 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        范围限制
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以设置最大值和最小值限制输入范围。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="limitedValue"
            :min="0"
            :max="10"
            placeholder="范围: 0-10"
          />
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ limitedValue }} (范围: 0-10)
        </div>
      </div>
    </section>

    <!-- 精度 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        精度控制
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以设置数字精度，控制小数位数。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div class="mb-2 text-sm font-medium">
              精度: 0
            </div>
            <ui-input-number
              v-model="precisionValue"
              :precision="0"
              :step="1"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              精度: 1
            </div>
            <ui-input-number
              v-model="precisionValue"
              :precision="1"
              :step="0.1"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              精度: 2
            </div>
            <ui-input-number
              v-model="precisionValue"
              :precision="2"
              :step="0.01"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        不同尺寸
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        提供三种尺寸：small、default、large。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div class="mb-2 text-sm font-medium">
              Small
            </div>
            <ui-input-number
              v-model="sizeValue"
              size="small"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              Default
            </div>
            <ui-input-number
              v-model="sizeValue"
              size="default"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              Large
            </div>
            <ui-input-number
              v-model="sizeValue"
              size="large"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 按钮位置 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        按钮位置
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以设置控制按钮的位置。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="mb-2 text-sm font-medium">
              按钮在右侧 (默认)
            </div>
            <ui-input-number
              v-model="positionValue"
              controls-position="right"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              按钮在两侧
            </div>
            <ui-input-number
              v-model="positionValue"
              controls-position="both"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 步长 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        步长设置
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以设置步长，控制点击按钮时的增减量。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div class="mb-2 text-sm font-medium">
              步长: 1 (默认)
            </div>
            <ui-input-number
              v-model="stepValue"
              :step="1"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              步长: 5
            </div>
            <ui-input-number
              v-model="stepValue"
              :step="5"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium">
              步长: 10
            </div>
            <ui-input-number
              v-model="stepValue"
              :step="10"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        禁用状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        禁用状态下，无法进行输入和点击操作。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="disabledValue"
            disabled
          />
        </div>
      </div>
    </section>

    <!-- 只读状态 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        只读状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        只读状态下，可以查看但不能修改。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="readonlyValue"
            readonly
          />
        </div>
      </div>
    </section>

    <!-- 错误状态 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        错误状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以显示错误状态和错误提示。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="basicValue"
            error
            error-message="输入的数值不符合要求"
          />
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义样式
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以自定义边框颜色、背景色和文本颜色。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="customValue"
            border-color="#8b5cf6"
            bg-color="#f5f3ff"
            text-color="#5b21b6"
          />
        </div>
      </div>
    </section>

    <!-- 键盘操作 -->
    <section class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        键盘操作
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持使用键盘上下箭头调整数值。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="max-w-xs">
          <ui-input-number
            v-model="basicValue"
            placeholder="使用方向键调整数值"
          />
        </div>
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>试试以下键盘操作：</p>
          <ul class="ml-5 mt-2 list-disc">
            <li>点击输入框，然后按上箭头键 ↑ 增加数值</li>
            <li>点击输入框，然后按下箭头键 ↓ 减少数值</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
