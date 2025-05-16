<script setup lang="ts" name="DemoInputNumber">
/**
 * 数字输入框组件演示
 * 创建日期: 2024-07-05
 * 作者: aiftt
 * 更新日期: 2024-07-05 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
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

// 示例代码字符串
const basicCode = `<template>
  <ui-input-number
    v-model="value"
    placeholder="请输入数字"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(5)
<\/script>`

const decimalCode = `<template>
  <ui-input-number
    v-model="value"
    :precision="2"
    :step="0.1"
    placeholder="请输入小数"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(1.5)
<\/script>`

const limitedCode = `<template>
  <ui-input-number
    v-model="value"
    :min="0"
    :max="10"
    placeholder="范围: 0-10"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(5)
<\/script>`

const precisionCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div>
      <div class="mb-2 text-sm font-medium">
        精度: 0
      </div>
      <ui-input-number
        v-model="value"
        :precision="0"
        :step="1"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        精度: 1
      </div>
      <ui-input-number
        v-model="value"
        :precision="1"
        :step="0.1"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        精度: 2
      </div>
      <ui-input-number
        v-model="value"
        :precision="2"
        :step="0.01"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(2.5)
<\/script>`

const sizeCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div>
      <div class="mb-2 text-sm font-medium">
        Small
      </div>
      <ui-input-number
        v-model="value"
        size="small"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        Default
      </div>
      <ui-input-number
        v-model="value"
        size="default"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        Large
      </div>
      <ui-input-number
        v-model="value"
        size="large"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(5)
<\/script>`

const positionCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <div class="mb-2 text-sm font-medium">
        按钮在右侧 (默认)
      </div>
      <ui-input-number
        v-model="value"
        controls-position="right"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        按钮在两侧
      </div>
      <ui-input-number
        v-model="value"
        controls-position="both"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(5)
<\/script>`

const stepCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div>
      <div class="mb-2 text-sm font-medium">
        步长: 1 (默认)
      </div>
      <ui-input-number
        v-model="value"
        :step="1"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        步长: 2
      </div>
      <ui-input-number
        v-model="value"
        :step="2"
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        步长: 5
      </div>
      <ui-input-number
        v-model="value"
        :step="5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(5)
<\/script>`

const disabledCode = `<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <div class="mb-2 text-sm font-medium">
        禁用状态
      </div>
      <ui-input-number
        v-model="value"
        disabled
      />
    </div>
    <div>
      <div class="mb-2 text-sm font-medium">
        只读状态
      </div>
      <ui-input-number
        v-model="readonlyValue"
        readonly
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(10)
const readonlyValue = ref(50)
<\/script>`

const customCode = `<template>
  <ui-input-number
    v-model="value"
    border-color="#6366f1"
    bg-color="#eef2ff"
    text-color="#4338ca"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(8)
<\/script>`
</script>

<template>
  <div class="demo-input-number">
    <h2 class="mb-6 text-2xl text-gray-900 font-semibold dark:text-white">
      Input Number 数字输入框
    </h2>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的数字输入框，支持键盘操作。"
      :code="basicCode"
    >
      <div class="max-w-xs">
        <ui-input-number
          v-model="basicValue"
          placeholder="请输入数字"
        />
      </div>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        当前值: {{ basicValue }}
      </div>
    </ui-demo>

    <!-- 带小数点 -->
    <ui-demo
      title="小数支持"
      description="支持输入小数，可以设置精度。"
      :code="decimalCode"
    >
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
    </ui-demo>

    <!-- 最大值和最小值 -->
    <ui-demo
      title="范围限制"
      description="可以设置最大值和最小值限制输入范围。"
      :code="limitedCode"
    >
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
    </ui-demo>

    <!-- 精度 -->
    <ui-demo
      title="精度控制"
      description="可以设置数字精度，控制小数位数。"
      :code="precisionCode"
    >
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
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种尺寸：small、default、large。"
      :code="sizeCode"
    >
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
    </ui-demo>

    <!-- 按钮位置 -->
    <ui-demo
      title="按钮位置"
      description="可以设置控制按钮的位置。"
      :code="positionCode"
    >
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
    </ui-demo>

    <!-- 步长 -->
    <ui-demo
      title="步长设置"
      description="可以设置步长，控制点击按钮时的增减量。"
      :code="stepCode"
    >
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
            步长: 2
          </div>
          <ui-input-number
            v-model="stepValue"
            :step="2"
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
      </div>
    </ui-demo>

    <!-- 禁用和只读 -->
    <ui-demo
      title="禁用和只读"
      description="支持禁用和只读状态。"
      :code="disabledCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div class="mb-2 text-sm font-medium">
            禁用状态
          </div>
          <ui-input-number
            v-model="disabledValue"
            disabled
          />
        </div>
        <div>
          <div class="mb-2 text-sm font-medium">
            只读状态
          </div>
          <ui-input-number
            v-model="readonlyValue"
            readonly
          />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过CSS变量定制输入框样式。"
      :code="customCode"
    >
      <div class="max-w-xs">
        <ui-input-number
          v-model="customValue"
          border-color="#6366f1"
          bg-color="#eef2ff"
          text-color="#4338ca"
        />
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="InputNumber组件的属性、事件和方法。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                名称
              </th>
              <th class="px-4 py-2 text-left">
                描述
              </th>
              <th class="px-4 py-2 text-left">
                类型
              </th>
              <th class="px-4 py-2 text-left">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                modelValue
              </td>
              <td class="px-4 py-2">
                绑定值
              </td>
              <td class="px-4 py-2">
                number / string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                placeholder
              </td>
              <td class="px-4 py-2">
                占位文本
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                ''
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                disabled
              </td>
              <td class="px-4 py-2">
                是否禁用
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                readonly
              </td>
              <td class="px-4 py-2">
                是否只读
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                size
              </td>
              <td class="px-4 py-2">
                输入框大小
              </td>
              <td class="px-4 py-2">
                'small' / 'default' / 'large'
              </td>
              <td class="px-4 py-2">
                'default'
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                controls
              </td>
              <td class="px-4 py-2">
                是否显示控制按钮
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                true
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                step
              </td>
              <td class="px-4 py-2">
                步长
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                1
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                min
              </td>
              <td class="px-4 py-2">
                最小值
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                max
              </td>
              <td class="px-4 py-2">
                最大值
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                precision
              </td>
              <td class="px-4 py-2">
                数值精度
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                0
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                controlsPosition
              </td>
              <td class="px-4 py-2">
                控制按钮位置
              </td>
              <td class="px-4 py-2">
                'right' / 'both'
              </td>
              <td class="px-4 py-2">
                'right'
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                名称
              </th>
              <th class="px-4 py-2 text-left">
                描述
              </th>
              <th class="px-4 py-2 text-left">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                change
              </td>
              <td class="px-4 py-2">
                值变化时触发（失焦或按下回车）
              </td>
              <td class="px-4 py-2">
                (value: number | string)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                input
              </td>
              <td class="px-4 py-2">
                输入时触发
              </td>
              <td class="px-4 py-2">
                (value: number | string)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                focus
              </td>
              <td class="px-4 py-2">
                获取焦点时触发
              </td>
              <td class="px-4 py-2">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                blur
              </td>
              <td class="px-4 py-2">
                失去焦点时触发
              </td>
              <td class="px-4 py-2">
                (event: FocusEvent)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>
