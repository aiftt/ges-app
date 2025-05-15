<script setup lang="ts">
/**
 * QRCode组件演示
 * 创建日期: 2023-12-01
 * 作者: aiftt
 */
import { ref } from 'vue'

// 二维码内容
const qrValue = ref('https://example.com')
// Logo
const qrLogo = ref('')
// 渲染方式
const qrRenderAs = ref<RenderAs>('canvas')
// 校正级别
const qrErrorLevel = ref<ErrorCorrectionLevel>('M')
// 尺寸
const qrSize = ref(200)
// 边距
const qrMargin = ref(4)
// 前景色
const qrColor = ref('#000000')
// 背景色
const qrBackgroundColor = ref('#ffffff')
// 是否圆角
const qrRounded = ref(false)
// Logo尺寸比例
const qrLogoSize = ref(0.2)
// 自定义内容
const customValue = ref('')
const customQrValue = ref('https://nuxt.com')

// 校正级别选项
const errorLevelOptions = ['L', 'M', 'Q', 'H'] as const
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

// 渲染选项
const renderOptions = ['canvas', 'svg', 'img'] as const
type RenderAs = 'canvas' | 'svg' | 'img'

// 为演示准备的常量
const LEVEL_H: ErrorCorrectionLevel = 'H'
const LEVEL_M: ErrorCorrectionLevel = 'M'
const RENDER_CANVAS: RenderAs = 'canvas'

// 颜色预设
const colorPresets = [
  { name: '经典', color: '#000000', bg: '#ffffff' },
  { name: '蓝色', color: '#1677ff', bg: '#f0f9ff' },
  { name: '绿色', color: '#10b981', bg: '#f0fdf4' },
  { name: '红色', color: '#ef4444', bg: '#fef2f2' },
  { name: '紫色', color: '#8b5cf6', bg: '#f5f3ff' },
  { name: '橙色', color: '#f97316', bg: '#fff7ed' },
]

// 应用颜色预设
function applyColorPreset(preset: { color: string, bg: string }) {
  qrColor.value = preset.color
  qrBackgroundColor.value = preset.bg
}

// 更新自定义二维码内容
function updateCustomValue() {
  if (customValue.value.trim()) {
    customQrValue.value = customValue.value
  }
}
</script>

<template>
  <div class="qrcode-demo p-6">
    <h1 class="mb-6 text-2xl font-bold">
      QRCode 二维码组件
    </h1>

    <div class="flex flex-col gap-8 md:flex-row">
      <!-- 二维码预览区 -->
      <div class="flex flex-1 flex-col items-center rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h2 class="mb-4 text-xl font-bold">
          预览
        </h2>

        <div class="flex flex-col items-center gap-4">
          <ui-qrcode
            :value="qrValue"
            :size="qrSize"
            :color="qrColor"
            :background-color="qrBackgroundColor"
            :margin="qrMargin"
            :error-correction-level="qrErrorLevel"
            :render-as="qrRenderAs"
            :logo="qrLogo"
            :logo-size="qrLogoSize"
            :rounded="qrRounded"
            class-name="shadow-lg"
          />

          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ qrValue }}
          </div>
        </div>
      </div>

      <!-- 控制面板 -->
      <div class="flex-1">
        <h2 class="mb-4 text-xl font-bold">
          配置选项
        </h2>

        <div class="space-y-4">
          <!-- 内容 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">内容</label>
            <input
              v-model="qrValue"
              type="text"
              class="w-full border rounded p-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="输入要编码的内容"
            >
          </div>

          <!-- 尺寸 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">尺寸: {{ qrSize }}px</label>
            <input
              v-model="qrSize"
              type="range"
              min="100"
              max="400"
              step="10"
              class="w-full"
            >
          </div>

          <!-- 渲染方式 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">渲染方式</label>
            <div class="flex gap-2">
              <button
                v-for="option in renderOptions"
                :key="option"
                class="border rounded px-3 py-1" :class="[
                  qrRenderAs === option
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-700 dark:border-gray-600',
                ]"
                @click="qrRenderAs = option"
              >
                {{ option }}
              </button>
            </div>
          </div>

          <!-- 校正级别 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">校正级别</label>
            <div class="flex gap-2">
              <button
                v-for="option in errorLevelOptions"
                :key="option"
                class="border rounded px-3 py-1" :class="[
                  qrErrorLevel === option
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-700 dark:border-gray-600',
                ]"
                @click="qrErrorLevel = option"
              >
                {{ option }}
              </button>
            </div>
            <div class="mt-1 text-xs text-gray-500">
              L:低(7%) M:中(15%) Q:高(25%) H:最高(30%)
            </div>
          </div>

          <!-- 边距 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">边距: {{ qrMargin }}</label>
            <input
              v-model="qrMargin"
              type="range"
              min="0"
              max="10"
              class="w-full"
            >
          </div>

          <!-- 颜色主题 -->
          <div class="form-group">
            <label class="mb-1 block text-sm font-medium">颜色主题</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(preset, index) in colorPresets"
                :key="index"
                class="flex flex-col items-center border rounded p-2"
                @click="applyColorPreset(preset)"
              >
                <div
                  class="mb-1 h-10 w-10 rounded"
                  :style="{ backgroundColor: preset.bg, border: `1px solid ${preset.color}` }"
                >
                  <div class="m-auto mt-1 h-6 w-6" :style="{ backgroundColor: preset.color }" />
                </div>
                <span class="text-xs">{{ preset.name }}</span>
              </button>
            </div>
          </div>

          <!-- 自定义颜色 -->
          <div class="form-group grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium">前景色</label>
              <div class="flex items-center">
                <input
                  v-model="qrColor"
                  type="color"
                  class="h-8 w-8 border-0 p-0"
                >
                <input
                  v-model="qrColor"
                  type="text"
                  class="ml-2 flex-1 border rounded p-2 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">背景色</label>
              <div class="flex items-center">
                <input
                  v-model="qrBackgroundColor"
                  type="color"
                  class="h-8 w-8 border-0 p-0"
                >
                <input
                  v-model="qrBackgroundColor"
                  type="text"
                  class="ml-2 flex-1 border rounded p-2 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
            </div>
          </div>

          <!-- Logo设置 -->
          <div class="form-group">
            <div class="flex items-center">
              <label class="text-sm font-medium">Logo</label>
              <div class="ml-2">
                <input v-model="qrLogo" type="checkbox" value="/nuxt.svg" false-value="">
              </div>
            </div>
            <div v-if="qrLogo" class="mt-2">
              <label class="block text-sm font-medium">Logo大小: {{ Math.round(qrLogoSize * 100) }}%</label>
              <input
                v-model="qrLogoSize"
                type="range"
                min="0.1"
                max="0.3"
                step="0.01"
                class="w-full"
              >
            </div>
          </div>

          <!-- 圆角设置 -->
          <div class="form-group flex items-center">
            <label class="text-sm font-medium">圆角</label>
            <div class="ml-2">
              <input v-model="qrRounded" type="checkbox">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义内容示例 -->
    <div class="mt-12">
      <h2 class="mb-4 text-xl font-bold">
        自定义内容示例
      </h2>

      <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <div class="flex flex-col items-center gap-4 md:flex-row">
          <div class="w-full md:w-1/2">
            <label class="mb-1 block text-sm font-medium">输入自定义内容</label>
            <div class="flex">
              <input
                v-model="customValue"
                type="text"
                class="w-full border rounded-l p-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="输入网址、文本或其他内容"
              >
              <button
                class="rounded-r bg-blue-500 px-4 py-2 text-white"
                @click="updateCustomValue"
              >
                生成
              </button>
            </div>
          </div>

          <div class="flex flex-col items-center">
            <ui-qrcode
              :value="customQrValue"
              :render-as="RENDER_CANVAS"
              :error-correction-level="LEVEL_H"
              :size="150"
              :rounded="true"
              class-name="shadow-lg"
            />
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ customQrValue }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 多种用例示例 -->
    <div class="mt-12">
      <h2 class="mb-4 text-xl font-bold">
        多种用例示例
      </h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- 示例1: 基础二维码 -->
        <div class="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h3 class="mb-3 text-lg font-semibold">
            基础二维码
          </h3>
          <ui-qrcode
            value="https://github.com/"
            :size="150"
            :error-correction-level="LEVEL_M"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            默认配置
          </p>
        </div>

        <!-- 示例2: 带Logo的二维码 -->
        <div class="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h3 class="mb-3 text-lg font-semibold">
            带Logo二维码
          </h3>
          <ui-qrcode
            value="https://github.com/"
            :size="150"
            :error-correction-level="LEVEL_H"
            logo="/nuxt.svg"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            包含中心Logo
          </p>
        </div>

        <!-- 示例3: 彩色二维码 -->
        <div class="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h3 class="mb-3 text-lg font-semibold">
            彩色二维码
          </h3>
          <ui-qrcode
            value="https://github.com/"
            :size="150"
            color="#1677ff"
            background-color="#f0f9ff"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            自定义颜色和圆角
          </p>
        </div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="mt-12">
      <h2 class="mb-4 text-xl font-bold">
        使用代码示例
      </h2>

      <div class="overflow-auto rounded-lg bg-gray-800 p-4 text-gray-100">
        <pre><code>// 基础用法
&lt;ui-qrcode value="https://github.com/" /&gt;

// 自定义尺寸和校正级别
&lt;ui-qrcode
  value="https://github.com/"
  :size="200"
  error-correction-level="H"
/&gt;

// 自定义颜色
&lt;ui-qrcode
  value="https://github.com/"
  color="#1677ff"
  background-color="#f0f9ff"
/&gt;

// 带Logo
&lt;ui-qrcode
  value="https://github.com/"
  logo="/path/to/logo.png"
  :logo-size="0.2"
  error-correction-level="H"
/&gt;

// 指定渲染方式
&lt;ui-qrcode
  value="https://github.com/"
  render-as="svg"
  :size="150"
/&gt;</code></pre>
      </div>
    </div>

    <!-- 组件属性说明 -->
    <div class="mt-12">
      <h2 class="mb-4 text-xl font-bold">
        组件属性
      </h2>

      <div class="overflow-auto">
        <table class="min-w-full border bg-white dark:border-gray-700 dark:bg-gray-800">
          <thead>
            <tr>
              <th class="border-b px-4 py-2 text-left dark:border-gray-700">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left dark:border-gray-700">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left dark:border-gray-700">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left dark:border-gray-700">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                value
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                -
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                要编码的内容，必填项
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                size
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                number
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                200
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                二维码尺寸（像素）
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                color
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                #000000
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                二维码前景色
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                backgroundColor
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                #ffffff
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                二维码背景色
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                margin
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                number
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                0
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                二维码边距
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                errorCorrectionLevel
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                M
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                校正级别，可选：L(7%), M(15%), Q(25%), H(30%)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                renderAs
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                canvas
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                渲染方式，可选：canvas, svg, img
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                className
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                ''
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                自定义类名
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                logo
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                string
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                -
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                中间logo图片地址
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                logoSize
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                number
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                0.2
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                logo尺寸比例(0-1)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                rounded
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                boolean
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                false
              </td>
              <td class="border-b px-4 py-2 dark:border-gray-700">
                是否使用圆角
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-qrcode {
  padding: 1rem;
}
</style>
