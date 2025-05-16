<script setup lang="ts" name="DemoWatermark">
/**
 * 水印组件演示
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-02 - 优化性能，减少全屏水印导致的页面卡顿
 * 更新日期: 2024-06-16 - 使用ui-demo组件重构演示页面
 */

const textContent = ref('@aiftt')
const textOpacity = ref(0.15)
const textRotate = ref(-22)
const fullPage = ref(false)
const preventTamper = ref(true)

// 示例图片 - 使用内联的SVG数据URL避免跨域和加载问题
const logoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDFCODgzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1jb2RlIj48cG9seWxpbmUgcG9pbnRzPSIxNiAxOCA2IDEyIDE2IDYiPjwvcG9seWxpbmU+PC9zdmc+'
const useImage = ref(false)

// 当全屏模式启用时，自动禁用防篡改功能以避免性能问题
watch(fullPage, (value) => {
  if (value) {
    preventTamper.value = false
  }
})

// 计算属性用于处理内容和图片
const watermarkContent = computed(() => {
  return useImage.value ? undefined : textContent.value
})

const watermarkImage = computed(() => {
  return useImage.value ? logoImage : undefined
})

// 示例代码
const basicCode = `<ui-watermark content="@aiftt" class="h-40 bg-gray-50 dark:bg-gray-800">
  <div class="h-full flex items-center justify-center">
    <p class="text-center text-gray-600 dark:text-gray-300">
      水印展示区域
    </p>
  </div>
</ui-watermark>`

const imageCode = `<ui-watermark
  :image="logoImage"
  class="h-40 bg-gray-50 dark:bg-gray-800"
>
  <div class="h-full flex items-center justify-center">
    <p class="text-center text-gray-600 dark:text-gray-300">
      图片水印展示区域
    </p>
  </div>
</ui-watermark>`

const fullPageCode = `<ui-watermark
  content="@aiftt"
  :full-page="true"
  :opacity="0.15"
  :prevent-tamper="false"
>
  <!-- 页面内容 -->
</ui-watermark>`

const customStyleCode = `<ui-watermark
  content="@aiftt"
  :opacity="0.15"
  :rotate="-22"
  font-family="Arial, sans-serif"
  font-color="#10b981"
  font-size="20"
  :prevent-tamper="true"
  class="h-40 bg-gray-50 dark:bg-gray-800"
>
  <div class="h-full flex items-center justify-center">
    <p class="text-center text-gray-600 dark:text-gray-300">
      自定义水印样式
    </p>
  </div>
</ui-watermark>`
</script>

<template>
  <div class="demo-watermark">
    <h2 class="mb-6 text-xl font-bold">
      Watermark 水印
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      水印组件用于添加文本或图片水印，增强版权保护和防篡改能力，可应用于文档、图片或整个页面区域。
    </p>

    <!-- 基础文本水印 -->
    <ui-demo
      title="基础文本水印"
      description="最基本的水印用法，设置content属性提供水印文本内容。"
      :code="basicCode"
    >
      <div class="mb-4">
        <label class="mb-2 block">
          水印文本：
          <input
            v-model="textContent"
            type="text"
            class="w-full border rounded px-2 py-1"
          >
        </label>
      </div>
      <ui-watermark :content="textContent" class="h-40 border rounded-md bg-gray-50 dark:bg-gray-800">
        <div class="h-full flex items-center justify-center">
          <p class="text-center text-gray-600 dark:text-gray-300">
            水印展示区域
          </p>
        </div>
      </ui-watermark>
    </ui-demo>

    <!-- 图片水印 -->
    <ui-demo
      title="图片水印"
      description="使用image属性提供图片作为水印。当同时提供content和image时，只有image会生效。"
      :code="imageCode"
    >
      <div class="mb-4">
        <label class="flex items-center">
          <input
            v-model="useImage"
            type="checkbox"
            class="mr-2"
          >
          使用图片水印
        </label>
      </div>
      <ui-watermark
        :content="watermarkContent"
        :image="watermarkImage"
        class="h-40 border rounded-md bg-gray-50 dark:bg-gray-800"
      >
        <div class="h-full flex items-center justify-center">
          <p class="text-center text-gray-600 dark:text-gray-300">
            水印展示区域
          </p>
        </div>
      </ui-watermark>
    </ui-demo>

    <!-- 全屏水印 -->
    <ui-demo
      title="全屏水印"
      description="设置full-page属性使水印覆盖整个页面。请注意全屏水印会影响页面性能，应谨慎使用。"
      :code="fullPageCode"
    >
      <div class="mb-4">
        <label class="flex items-center">
          <input
            v-model="fullPage"
            type="checkbox"
            class="mr-2"
          >
          全屏显示水印
          <span v-if="fullPage" class="ml-2 text-xs text-red-500">
            (为避免性能问题，全屏模式下已禁用防篡改功能)
          </span>
        </label>
      </div>
      <ui-watermark
        :content="textContent"
        :full-page="fullPage"
        :opacity="textOpacity"
        :prevent-tamper="false"
        class="h-40 border rounded-md bg-gray-50 dark:bg-gray-800"
      >
        <div class="h-full flex items-center justify-center">
          <p class="text-center text-gray-600 dark:text-gray-300">
            {{ fullPage ? '水印已设置为全屏模式' : '点击开启全屏水印' }}
          </p>
        </div>
      </ui-watermark>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过设置opacity、rotate、font-family、font-color和font-size等属性自定义水印样式。"
      :code="customStyleCode"
    >
      <div class="grid grid-cols-2 mb-4 gap-4">
        <label class="block">
          不透明度：
          <input
            v-model="textOpacity"
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            class="w-full"
          >
        </label>
        <label class="block">
          旋转角度：
          <input
            v-model="textRotate"
            type="range"
            min="-90"
            max="90"
            step="1"
            class="w-full"
          >
        </label>
        <label class="flex items-center" :class="{ 'opacity-50': fullPage }">
          <input
            v-model="preventTamper"
            type="checkbox"
            class="mr-2"
            :disabled="fullPage"
          >
          防篡改功能
          <span v-if="fullPage" class="ml-2 text-xs text-red-500">
            (全屏模式下不可用)
          </span>
        </label>
      </div>
      <ui-watermark
        :content="textContent"
        :opacity="textOpacity"
        :rotate="textRotate"
        font-family="Arial, sans-serif"
        font-color="#10b981"
        font-size="20"
        :prevent-tamper="preventTamper"
        class="h-40 border rounded-md bg-gray-50 dark:bg-gray-800"
      >
        <div class="h-full flex items-center justify-center">
          <p class="text-center text-gray-600 dark:text-gray-300">
            自定义水印样式
          </p>
        </div>
      </ui-watermark>
    </ui-demo>

    <!-- API参考 -->
    <h3 class="mb-4 mt-8 text-lg font-medium">
      API 参考
    </h3>

    <h4 class="mb-2 mt-4 font-medium">
      Watermark 属性
    </h4>
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b">
          <th class="py-2">
            属性名
          </th>
          <th class="py-2">
            说明
          </th>
          <th class="py-2">
            类型
          </th>
          <th class="py-2">
            默认值
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="py-2">
            content
          </td>
          <td class="py-2">
            水印文本内容
          </td>
          <td class="py-2">
            string
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            image
          </td>
          <td class="py-2">
            水印图片URL，设置后content将被忽略
          </td>
          <td class="py-2">
            string
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            width
          </td>
          <td class="py-2">
            水印宽度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            120
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            height
          </td>
          <td class="py-2">
            水印高度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            64
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            rotate
          </td>
          <td class="py-2">
            水印旋转角度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            -22
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            zIndex
          </td>
          <td class="py-2">
            水印层级
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            9
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            opacity
          </td>
          <td class="py-2">
            水印不透明度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            0.15
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            fontSize
          </td>
          <td class="py-2">
            水印字体大小
          </td>
          <td class="py-2">
            number | string
          </td>
          <td class="py-2">
            16
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            fontFamily
          </td>
          <td class="py-2">
            水印字体
          </td>
          <td class="py-2">
            string
          </td>
          <td class="py-2">
            'sans-serif'
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            fontColor
          </td>
          <td class="py-2">
            水印字体颜色
          </td>
          <td class="py-2">
            string
          </td>
          <td class="py-2">
            'rgba(0,0,0,0.85)'
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            gapX
          </td>
          <td class="py-2">
            水印水平间距
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            100
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            gapY
          </td>
          <td class="py-2">
            水印垂直间距
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            100
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            fullPage
          </td>
          <td class="py-2">
            是否全屏显示水印
          </td>
          <td class="py-2">
            boolean
          </td>
          <td class="py-2">
            false
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            preventTamper
          </td>
          <td class="py-2">
            是否启用防篡改功能（监控DOM变更）
          </td>
          <td class="py-2">
            boolean
          </td>
          <td class="py-2">
            true
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
