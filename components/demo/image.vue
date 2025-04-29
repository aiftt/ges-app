<script setup lang="ts" name="DemoImage">
/**
 * Image组件演示
 * 创建日期: 2023-11-15
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 更新样式，移除demo前缀类名
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
    const logger = useLogger ? useLogger() : console
    logger.info('预览图片:', src)
    window.open(src, '_blank')
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="mb-8">
      <h3 class="mb-2 text-lg font-bold">
        基本用法
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        使用 ui-image 组件显示基本图片，可设置宽高
      </p>
      <div class="flex flex-wrap gap-4">
        <ui-image
          :src="demoImages[0]"
          width="200"
          height="150"
          alt="示例图片"
        />
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-bold">
        填充方式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        通过设置 fit 属性控制图片在容器中的填充方式
      </p>
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
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-bold">
        圆角设置
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        使用 radius 属性设置图片圆角大小
      </p>
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
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-bold">
        加载失败
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        图片加载失败时的处理和备用图片设置
      </p>
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
    </div>

    <div class="mb-8">
      <h3 class="mb-2 text-lg font-bold">
        图片预览
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        设置 preview 属性启用图片预览功能
      </p>
      <div class="flex flex-wrap gap-4">
        <ui-image
          :src="demoImages[0]"
          width="200"
          height="150"
          preview
          alt="可预览图片"
          @preview="handlePreview"
        />
      </div>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-bold">
        懒加载
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        设置 lazy 属性启用图片懒加载
      </p>
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
