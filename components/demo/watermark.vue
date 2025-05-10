<script setup lang="ts" name="DemoWatermark">
/**
 * 水印组件演示
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-02 - 优化性能，减少全屏水印导致的页面卡顿
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
</script>

<template>
  <div class="demo-card">
    <h3 class="mb-4 text-lg font-bold">
      水印组件 (Watermark)
    </h3>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- 基础文本水印 -->
      <div class="overflow-hidden border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          基础文本水印
        </h4>
        <ui-watermark :content="textContent" class="h-40 border rounded-md bg-gray-50 dark:bg-gray-800">
          <div class="h-full flex items-center justify-center">
            <p class="text-center text-gray-600 dark:text-gray-300">
              水印展示区域
            </p>
          </div>
        </ui-watermark>
        <div class="mt-4">
          <label class="mb-2 block">
            水印文本：
            <input
              v-model="textContent"
              type="text"
              class="w-full border rounded px-2 py-1"
            >
          </label>
        </div>
      </div>

      <!-- 图片水印 -->
      <div class="overflow-hidden border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          图片水印
        </h4>
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
        <div class="mt-4">
          <label class="flex items-center">
            <input
              v-model="useImage"
              type="checkbox"
              class="mr-2"
            >
            使用图片水印
          </label>
        </div>
      </div>

      <!-- 全屏水印 - 增加警告信息 -->
      <div class="overflow-hidden border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          全屏水印
        </h4>
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
        <div class="mt-4">
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
      </div>

      <!-- 自定义样式 -->
      <div class="overflow-hidden border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          自定义样式
        </h4>
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
        <div class="grid grid-cols-2 mt-4 gap-4">
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
      </div>
    </div>
  </div>
</template>
