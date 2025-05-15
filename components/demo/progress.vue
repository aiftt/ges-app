<script setup lang="ts" name="DemoProgress">
/**
 * 进度条组件演示
 * 创建日期: 2024-08-03
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 普通进度值
const percentage = ref(30)

// 环形进度值
const circularPercentage = ref(50)

// 条纹动画进度值
const stripedPercentage = ref(70)

// 动态改变进度值
const dynamicPercentage = ref(0)
const dynamicStatus = ref<'' | 'success' | 'error'>('')

// 动态进度值的定时器
let timer: NodeJS.Timeout | null = null

// 开始动态进度演示
function startDynamicProgress() {
  // 先重置
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  dynamicPercentage.value = 0
  dynamicStatus.value = ''

  // 创建定时器每200ms增加进度
  timer = setInterval(() => {
    dynamicPercentage.value += 5
    if (dynamicPercentage.value > 100) {
      clearInterval(timer!)
      timer = null
      dynamicStatus.value = 'success'
    }
    else {
      if (dynamicPercentage.value > 80) {
        dynamicStatus.value = 'success'
      }
      else if (dynamicPercentage.value > 50) {
        dynamicStatus.value = 'error'
      }
    }
  }, 200)
}

// 自定义格式化函数
function customFormat(percentage: number): string {
  if (percentage < 30) {
    return '起步阶段'
  }
  else if (percentage < 70) {
    return '进行中'
  }
  else {
    return '接近完成'
  }
}

// 颜色随百分比变化
const colorPercentage = ref(20)
const colorChange = computed(() => {
  // 从红到绿的渐变
  if (colorPercentage.value < 30) {
    return '#f56c6c'
  }
  else if (colorPercentage.value < 60) {
    return '#e6a23c'
  }
  else if (colorPercentage.value < 80) {
    return '#1989fa'
  }
  else {
    return '#10b981'
  }
})

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 颜色数组演示
const colorArray = [
  { percentage: 20, color: '#f56c6c' },
  { percentage: 40, color: '#e6a23c' },
  { percentage: 60, color: '#1989fa' },
  { percentage: 80, color: '#10b981' },
  { percentage: 100, color: '#67c23a' },
]

// 代码示例
const basicCode = `<ui-progress :percentage="percentage" />
<ui-progress :percentage="percentage" status="success" />
<ui-progress :percentage="percentage" status="error" />
<ui-progress :percentage="percentage" color="#f59e0b" />
<ui-progress :percentage="percentage" color="#3b82f6" />

<script setup>
const percentage = ref(30)
<\/script>`

const sizeCode = `<ui-progress :percentage="percentage" size="small" />
<ui-progress :percentage="percentage" />
<ui-progress :percentage="percentage" size="large" />
<ui-progress
  :percentage="percentage"
  :stroke-width="26"
  color="#8b5cf6"
/>

<script setup>
const percentage = ref(30)
<\/script>`

const circularCode = `<ui-progress
  :percentage="circularPercentage"
  circular
/>

<ui-progress
  :percentage="circularPercentage"
  circular
  status="success"
/>

<ui-progress
  :percentage="circularPercentage"
  circular
  status="error"
/>

<ui-progress
  :percentage="circularPercentage"
  circular
  color="#f59e0b"
/>

<ui-progress
  :percentage="circularPercentage"
  circular
  color="#8b5cf6"
  :width="120"
  :stroke-width="12"
/>

<script setup>
const circularPercentage = ref(50)
<\/script>`

const stripedCode = `<ui-progress
  :percentage="stripedPercentage"
  striped
/>

<ui-progress
  :percentage="stripedPercentage"
  striped
  striped-animation
/>

<ui-progress
  :percentage="stripedPercentage"
  striped
  striped-animation
  status="success"
/>

<script setup>
const stripedPercentage = ref(70)
<\/script>`

const dynamicCode = `<ui-progress
  :percentage="dynamicPercentage"
  :status="dynamicStatus"
/>

<ui-button @click="startDynamicProgress">
  开始进度演示
</ui-button>

<script setup>
const dynamicPercentage = ref(0)
const dynamicStatus = ref('')
let timer = null

function startDynamicProgress() {
  // 先重置
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  dynamicPercentage.value = 0
  dynamicStatus.value = ''

  // 创建定时器每200ms增加进度
  timer = setInterval(() => {
    dynamicPercentage.value += 5
    if (dynamicPercentage.value > 100) {
      clearInterval(timer)
      timer = null
      dynamicStatus.value = 'success'
    }
    else {
      if (dynamicPercentage.value > 80) {
        dynamicStatus.value = 'success'
      }
      else if (dynamicPercentage.value > 50) {
        dynamicStatus.value = 'error'
      }
    }
  }, 200)
}
<\/script>`

const formatCode = `<ui-progress
  :percentage="percentage"
  :format="customFormat"
/>

<ui-progress
  :percentage="percentage"
  :show-text="false"
/>

<script setup>
const percentage = ref(30)

// 自定义格式化函数
function customFormat(percentage) {
  if (percentage < 30) {
    return '起步阶段'
  }
  else if (percentage < 70) {
    return '进行中'
  }
  else {
    return '接近完成'
  }
}
<\/script>`

const colorCode = `<!-- 颜色随进度变化 -->
<ui-progress
  :percentage="colorPercentage"
  :color="colorChange"
/>

<!-- 颜色数组 -->
<ui-progress
  :percentage="percentage"
  :color="colorArray"
/>

<script setup>
const percentage = ref(30)
const colorPercentage = ref(20)

// 计算属性 - 颜色随百分比变化
const colorChange = computed(() => {
  if (colorPercentage.value < 30) {
    return '#f56c6c'
  }
  else if (colorPercentage.value < 60) {
    return '#e6a23c'
  }
  else if (colorPercentage.value < 80) {
    return '#1989fa'
  }
  else {
    return '#10b981'
  }
})

// 颜色数组
const colorArray = [
  { percentage: 20, color: '#f56c6c' },
  { percentage: 40, color: '#e6a23c' },
  { percentage: 60, color: '#1989fa' },
  { percentage: 80, color: '#10b981' },
  { percentage: 100, color: '#67c23a' },
]
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Progress 进度条
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      Progress 进度条用于展示操作进度或任务完成度，支持线性和环形两种形式。
    </p>

    <!-- 基础进度条 -->
    <ui-demo
      title="基础进度条"
      description="标准的进度条，支持不同的状态显示：默认、成功(success)、警告(warning)、危险(danger)、信息(info)。"
      :code="basicCode"
    >
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <span class="text-sm">进度值：{{ percentage }}%</span>
          <ui-slider v-model="percentage" :min="0" :max="100" :step="5" class="w-64" />
        </div>

        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm font-medium">
              默认进度条：
            </p>
            <ui-progress :percentage="percentage" />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium">
              成功状态：
            </p>
            <ui-progress :percentage="percentage" status="success" />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium">
              警告状态：
            </p>
            <ui-progress :percentage="percentage" color="#f59e0b" />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium">
              危险状态：
            </p>
            <ui-progress :percentage="percentage" status="error" />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium">
              信息状态：
            </p>
            <ui-progress :percentage="percentage" color="#3b82f6" />
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 进度条尺寸 -->
    <ui-demo
      title="进度条尺寸"
      description="进度条提供不同的尺寸：小型(small)、默认、大型(large)，也可以通过 stroke-width 自定义高度。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm font-medium">
            小尺寸：
          </p>
          <ui-progress :percentage="percentage" size="small" />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            默认尺寸：
          </p>
          <ui-progress :percentage="percentage" />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            大尺寸：
          </p>
          <ui-progress :percentage="percentage" size="large" />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            自定义高度和颜色：
          </p>
          <ui-progress
            :percentage="percentage"
            :stroke-width="26"
            color="#8b5cf6"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 环形进度条 -->
    <ui-demo
      title="环形进度条"
      description="设置 type='circle' 使用环形进度条，同样支持不同状态和自定义样式。"
      :code="circularCode"
    >
      <div>
        <div class="mb-4 flex items-center justify-between">
          <span class="text-sm">环形进度值：{{ circularPercentage }}%</span>
          <ui-slider v-model="circularPercentage" :min="0" :max="100" :step="5" class="w-64" />
        </div>

        <div class="flex flex-wrap gap-6">
          <div>
            <p class="mb-2 text-center text-sm font-medium">
              默认
            </p>
            <ui-progress
              :percentage="circularPercentage"
              circular
            />
          </div>

          <div>
            <p class="mb-2 text-center text-sm font-medium">
              成功
            </p>
            <ui-progress
              :percentage="circularPercentage"
              circular
              status="success"
            />
          </div>

          <div>
            <p class="mb-2 text-center text-sm font-medium">
              警告
            </p>
            <ui-progress
              :percentage="circularPercentage"
              circular
              color="#f59e0b"
            />
          </div>

          <div>
            <p class="mb-2 text-center text-sm font-medium">
              危险
            </p>
            <ui-progress
              :percentage="circularPercentage"
              circular
              status="error"
            />
          </div>

          <div>
            <p class="mb-2 text-center text-sm font-medium">
              自定义
            </p>
            <ui-progress
              :percentage="circularPercentage"
              circular
              color="#8b5cf6"
              :width="120"
              :stroke-width="12"
            />
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 条纹进度条 -->
    <ui-demo
      title="条纹进度条"
      description="通过 striped 属性设置条纹效果，striped-animation 属性可以添加动画效果。"
      :code="stripedCode"
    >
      <div class="space-y-6">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-sm">条纹进度值：{{ stripedPercentage }}%</span>
          <ui-slider v-model="stripedPercentage" :min="0" :max="100" :step="5" class="w-64" />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            条纹效果：
          </p>
          <ui-progress
            :percentage="stripedPercentage"
            striped
          />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            动画条纹：
          </p>
          <ui-progress
            :percentage="stripedPercentage"
            striped
            striped-animation
          />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            带状态的动画条纹：
          </p>
          <ui-progress
            :percentage="stripedPercentage"
            striped
            striped-animation
            status="success"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 动态进度条 -->
    <ui-demo
      title="动态进度条"
      description="通过代码动态设置进度值，实现动态变化的进度条。"
      :code="dynamicCode"
    >
      <div class="space-y-4">
        <ui-progress
          :percentage="dynamicPercentage"
          :status="dynamicStatus"
        />

        <div class="flex items-center gap-2">
          <ui-button @click="startDynamicProgress">
            开始进度演示
          </ui-button>
          <div class="text-sm text-gray-500">
            当前进度：{{ dynamicPercentage }}%
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 格式化文本 -->
    <ui-demo
      title="自定义文本显示"
      description="通过 format 属性自定义进度条文本内容，或使用 show-text=false 隐藏文本。"
      :code="formatCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm font-medium">
            自定义文本格式：
          </p>
          <ui-progress
            :percentage="percentage"
            :format="customFormat"
          />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            不显示文本：
          </p>
          <ui-progress
            :percentage="percentage"
            :show-text="false"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="通过 color 属性自定义进度条颜色，可以设置单一颜色、根据进度变化颜色或颜色数组。"
      :code="colorCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm font-medium">
            颜色随进度变化：
          </p>
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm">颜色进度值：{{ colorPercentage }}%</span>
            <ui-slider v-model="colorPercentage" :min="0" :max="100" :step="5" class="w-64" />
          </div>
          <ui-progress
            :percentage="colorPercentage"
            :color="colorChange"
          />
        </div>

        <div>
          <p class="mb-2 text-sm font-medium">
            颜色数组：
          </p>
          <ui-progress
            :percentage="percentage"
            :color="colorArray"
          />
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <!-- 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  percentage
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度百分比（必填）
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  0
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  type
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度条类型
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default' | 'success' | 'warning' | 'danger' | 'info'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  circular
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否为环形进度条
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  status
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度条状态
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  ''
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  size
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度条尺寸
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'small' | 'default' | 'large'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度条颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string | function | object[]
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  ''
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  stroke-width
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  进度条宽度
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  6
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  show-text
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否显示进度文字
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  true
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  format
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义文字格式
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  (percentage: number) => string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  percentage => `${percentage}%`
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  striped
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否显示条纹
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  striped-animation
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  条纹是否有动画
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 插槽 -->
      <div>
        <h4 class="mb-2 text-lg font-medium">
          插槽
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  名称
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  default
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义进度条内容
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
