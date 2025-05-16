<script setup lang="ts" name="DemoImage">
/**
 * Image组件演示
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 更新样式，移除demo前缀类名
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

const demoImages = [
  'https://picsum.photos/id/1018/600/400',
  'https://picsum.photos/id/1015/600/400',
  'https://picsum.photos/id/1019/600/400',
  'https://picsum.photos/id/1016/600/400',
]

// 错误图片URL
const errorImageUrl = 'https://non-existing-image.jpg'

// 处理预览事件
function handlePreview(src: string) {
  // 这里可以实现更复杂的预览功能，如使用modal等
  if (import.meta.client) {
    // 使用logger代替console
    const logger = useLogger ? useLogger('image') : console
    logger.info('预览图片:', src)
    window.open(src, '_blank')
  }
}

// 基本用法示例代码
const basicCode = `<ui-image
  src="https://picsum.photos/id/1018/600/400"
  width="200"
  height="150"
  alt="示例图片"
/>`

// 填充方式示例代码
const fitCode = `<div class="flex flex-wrap gap-4">
  <div v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']" :key="fit" class="flex flex-col items-center">
    <ui-image
      src="https://picsum.photos/id/1015/600/400"
      width="150"
      height="150"
      :fit="fit"
      alt="示例图片"
    />
    <span class="mt-2">{{ fit }}</span>
  </div>
</div>`

// 圆角设置示例代码
const radiusCode = `<div class="flex flex-wrap gap-4">
  <ui-image
    src="https://picsum.photos/id/1019/600/400"
    width="150"
    height="150"
    radius="0"
    alt="无圆角"
  />
  <ui-image
    src="https://picsum.photos/id/1019/600/400"
    width="150"
    height="150"
    radius="8"
    alt="中等圆角"
  />
  <ui-image
    src="https://picsum.photos/id/1019/600/400"
    width="150"
    height="150"
    radius="75"
    alt="圆形"
  />
</div>`

// 加载失败示例代码
const errorCode = `<div class="flex flex-wrap gap-4">
  <ui-image
    src="https://non-existing-image.jpg"
    width="200"
    height="150"
    alt="加载失败示例"
  />
  <ui-image
    src="https://non-existing-image.jpg"
    width="200"
    height="150"
    :fallback="'https://picsum.photos/id/1016/600/400'"
    alt="备用图片示例"
  />
</div>`

// 图片预览示例代码
const previewCode = `<script setup>
// 处理预览事件
function handlePreview(src) {
  // 这里可以实现更复杂的预览功能，如使用modal等
  console.log('预览图片:', src)
  window.open(src, '_blank')
}
<\/script>

<template>
  <ui-image
    src="https://picsum.photos/id/1018/600/400"
    width="200"
    height="150"
    preview
    alt="可预览图片"
    @preview="handlePreview"
  />
</template>`

// 懒加载示例代码
const lazyCode = `<div class="flex flex-wrap gap-4">
  <ui-image
    v-for="(img, index) in Array(10).fill('').map((_, i) => [
      'https://picsum.photos/id/1018/600/400',
      'https://picsum.photos/id/1015/600/400',
      'https://picsum.photos/id/1019/600/400',
      'https://picsum.photos/id/1016/600/400'
    ][i % 4])"
    :key="index"
    :src="img"
    width="200"
    height="150"
    :alt="\`懒加载图片 \${index + 1}\`"
    lazy
  />
</div>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Image 图片
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      Image组件用于在应用中展示和处理图片，支持多种填充方式、圆角设置、懒加载和预览功能。
    </p>

    <!-- 基本用法 -->
    <ui-demo
      title="基本用法"
      description="使用 ui-image 组件显示基本图片，可设置宽高。"
      :code="basicCode"
    >
      <ui-image
        :src="demoImages[0]"
        width="200"
        height="150"
        alt="示例图片"
      />
    </ui-demo>

    <!-- 填充方式 -->
    <ui-demo
      title="填充方式"
      description="通过设置 fit 属性控制图片在容器中的填充方式。"
      :code="fitCode"
    >
      <div class="flex flex-wrap gap-4">
        <div v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']" :key="fit" class="flex flex-col items-center">
          <ui-image
            :src="demoImages[1]"
            width="150"
            height="150"
            :fit="fit as any"
            alt="示例图片"
          />
          <span class="mt-2">{{ fit }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 圆角设置 -->
    <ui-demo
      title="圆角设置"
      description="使用 radius 属性设置图片圆角大小。"
      :code="radiusCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-image
          :src="demoImages[2]"
          width="150"
          height="150"
          radius="0"
          alt="无圆角"
        />
        <ui-image
          :src="demoImages[2]"
          width="150"
          height="150"
          radius="8"
          alt="中等圆角"
        />
        <ui-image
          :src="demoImages[2]"
          width="150"
          height="150"
          radius="75"
          alt="圆形"
        />
      </div>
    </ui-demo>

    <!-- 加载失败 -->
    <ui-demo
      title="加载失败"
      description="图片加载失败时的处理和备用图片设置。"
      :code="errorCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-image
          :src="errorImageUrl"
          width="200"
          height="150"
          alt="加载失败示例"
        />
        <ui-image
          :src="errorImageUrl"
          width="200"
          height="150"
          :fallback="demoImages[3]"
          alt="备用图片示例"
        />
      </div>
    </ui-demo>

    <!-- 图片预览 -->
    <ui-demo
      title="图片预览"
      description="设置 preview 属性启用图片预览功能。"
      :code="previewCode"
    >
      <ui-image
        :src="demoImages[0]"
        width="200"
        height="150"
        preview
        alt="可预览图片"
        @preview="handlePreview"
      />
    </ui-demo>

    <!-- 懒加载 -->
    <ui-demo
      title="懒加载"
      description="设置 lazy 属性启用图片懒加载。"
      :code="lazyCode"
    >
      <div class="max-h-96 overflow-auto">
        <div class="flex flex-wrap gap-4">
          <ui-image
            v-for="(img, index) in Array(10).fill('').map((_, i) => demoImages[i % demoImages.length])"
            :key="index"
            :src="img"
            width="200"
            height="150"
            :alt="`懒加载图片 ${index + 1}`"
            lazy
          />
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Image 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            src
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图片源地址
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            alt
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图片替代文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            width
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图片宽度
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            height
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图片高度
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            fit
          </td>
          <td class="px-4 py-2">
            fill | contain | cover | none | scale-down
          </td>
          <td class="px-4 py-2">
            fill
          </td>
          <td class="px-4 py-2">
            图片在容器中的填充方式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            radius
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            图片圆角大小
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            preview
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否启用图片预览
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            lazy
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否启用懒加载
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            fallback
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图片加载失败时的备用图片地址
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Image 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            load
          </td>
          <td class="px-4 py-2">
            event: Event
          </td>
          <td class="px-4 py-2">
            图片加载成功时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            error
          </td>
          <td class="px-4 py-2">
            event: Event
          </td>
          <td class="px-4 py-2">
            图片加载失败时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            preview
          </td>
          <td class="px-4 py-2">
            src: string
          </td>
          <td class="px-4 py-2">
            点击图片预览时触发
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.demo-component {
  width: 100%;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section:last-child {
  margin-bottom: 0;
}

.demo-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.demo-section-desc {
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.5);
}

.dark .demo-section-desc {
  color: rgba(255, 255, 255, 0.6);
}

.demo-section-content {
  padding: 1rem 0;
}
</style>
