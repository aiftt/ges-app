<script setup lang="ts">
/**
 * 图片组件示例页
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 示例图片
// 导入logger
import clientLogger from '~/utils/client-logger'

const images = {
  normal: 'https://picsum.photos/600/400',
  wide: 'https://picsum.photos/800/400',
  tall: 'https://picsum.photos/400/600',
  error: 'https://example.com/not-exist.jpg',
  placeholder: 'https://via.placeholder.com/600x400/eeeeee/cccccc?text=Loading...',
  fallback: 'https://via.placeholder.com/600x400/f5f5f5/909399?text=Image+Not+Found',
}

// 适应模式
const fitModes = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

// 圆角选项
const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
const logger = clientLogger.child({ tag: 'image-demo' })

// 处理加载事件
function handleLoad() {
  if (import.meta.client) {
    logger.info('图片加载完成')
  }
}

// 处理错误事件
function handleError() {
  if (import.meta.client) {
    logger.warn('图片加载失败')
  }
}

// 处理预览事件
function handlePreview(src: string) {
  if (import.meta.client) {
    logger.info('预览图片:', { src })
  }
}
</script>

<template>
  <div class="demo-container">
    <h1 class="mb-6 text-2xl font-bold">
      图片组件示例
    </h1>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-80">
          <p class="mb-2">
            默认图片
          </p>
          <ui-image :src="images.normal" alt="示例图片" />
        </div>
      </div>
    </section>

    <!-- 加载状态与错误处理 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        加载状态与错误处理
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-80">
          <p class="mb-2">
            错误图片（不显示错误状态）
          </p>
          <ui-image :src="images.error" :show-error="false" />
        </div>
        <div class="w-80">
          <p class="mb-2">
            错误图片（显示错误状态）
          </p>
          <ui-image :src="images.error" :show-error="true" />
        </div>
        <div class="w-80">
          <p class="mb-2">
            错误图片（带备用图）
          </p>
          <ui-image
            :src="images.error"
            :fallback="images.fallback"
            alt="加载失败备用图"
          />
        </div>
        <div class="w-80">
          <p class="mb-2">
            自定义占位图
          </p>
          <ui-image
            :src="images.normal"
            :placeholder="images.placeholder"
            :lazy="false"
            alt="自定义占位图"
          />
        </div>
      </div>
    </section>

    <!-- 预览功能 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        预览功能
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-80">
          <p class="mb-2">
            可预览图片（点击查看大图）
          </p>
          <ui-image
            :src="images.normal"
            :preview="true"
            alt="可预览图片"
            title="预览标题"
            @preview="handlePreview"
          />
        </div>
      </div>
    </section>

    <!-- 适应模式 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        图片适应容器模式（fit）
      </h2>
      <div class="flex flex-wrap gap-4">
        <div v-for="mode in fitModes" :key="mode" class="w-48">
          <p class="mb-2">
            {{ mode }}
          </p>
          <ui-image
            :src="images.normal"
            :fit="mode"
            :width="150"
            :height="150"
            alt="适应模式图片"
            style="border: 1px solid #ddd"
          />
        </div>
      </div>
    </section>

    <!-- 圆角设置 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        圆角设置
      </h2>
      <div class="flex flex-wrap gap-4">
        <div v-for="radius in radiusOptions" :key="radius" class="w-48">
          <p class="mb-2">
            {{ radius }}
          </p>
          <ui-image
            :src="images.normal"
            :radius="radius"
            :width="150"
            :height="150"
            alt="圆角图片"
          />
        </div>
      </div>
    </section>

    <!-- 尺寸设置 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        尺寸设置
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-80">
          <p class="mb-2">
            原始尺寸
          </p>
          <ui-image :src="images.normal" alt="原始尺寸图片" />
        </div>
        <div class="w-80">
          <p class="mb-2">
            固定宽度（200px）
          </p>
          <ui-image :src="images.normal" :width="200" alt="固定宽度图片" />
        </div>
        <div class="w-80">
          <p class="mb-2">
            固定尺寸（200×150px）
          </p>
          <ui-image
            :src="images.normal"
            :width="200"
            :height="150"
            alt="固定尺寸图片"
            style="border: 1px solid #ddd"
          />
        </div>
        <div class="w-80">
          <p class="mb-2">
            百分比宽度（50%）
          </p>
          <ui-image :src="images.normal" width="50%" alt="百分比宽度图片" />
        </div>
      </div>
    </section>

    <!-- 懒加载 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        懒加载
      </h2>
      <div class="flex flex-col gap-4">
        <p class="mb-2">
          滚动查看下方图片（将在进入视口时加载）
        </p>
        <div class="h-96 flex items-center justify-center border-2 border-gray-300 border-dashed">
          <p class="text-gray-500">
            👇 向下滚动
          </p>
        </div>

        <div v-for="i in 3" :key="i" class="w-full">
          <ui-image
            :src="`${images.normal}?random=${i}`"
            :lazy="true"
            alt="懒加载图片"
            @load="handleLoad"
            @error="handleError"
          />
          <div class="my-4 h-96 border-2 border-gray-300 border-dashed" />
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义样式
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-80">
          <p class="mb-2">
            添加阴影和边框
          </p>
          <ui-image
            :src="images.normal"
            custom-class="shadow-xl border-4 border-blue-200"
            alt="自定义样式图片"
          />
        </div>
        <div class="w-80">
          <p class="mb-2">
            图片效果
          </p>
          <ui-image
            :src="images.normal"
            custom-class="filter grayscale hover:grayscale-0 transition-all duration-500"
            alt="图片效果"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

section {
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
