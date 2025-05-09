<script setup lang="ts">
/**
 * 轮播图组件演示
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
 */
import { ref } from 'vue'

// 图片轮播数据
const images = ref([
  'https://images.unsplash.com/photo-1682685796063-d2604827f7b3?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=1170&auto=format&fit=crop',
])

// 卡片轮播数据
const cards = ref([
  {
    title: '前端开发技术',
    content: '现代前端开发涵盖React, Vue, Angular等框架，以及TypeScript、Webpack等工具链。',
    color: '#4ade80',
  },
  {
    title: '后端开发架构',
    content: '后端架构包括微服务、serverless和传统的单体应用，各有优缺点和适用场景。',
    color: '#60a5fa',
  },
  {
    title: '数据库设计',
    content: '合理的数据库设计能有效提升应用性能，要考虑索引优化、分区策略等因素。',
    color: '#f472b6',
  },
  {
    title: '云原生技术',
    content: 'Kubernetes、Docker、Service Mesh等云原生技术正在改变应用的部署和运维方式。',
    color: '#a78bfa',
  },
])

// 轮播属性控制
const direction = ref<'horizontal' | 'vertical'>('horizontal')
const effect = ref<'slide' | 'fade'>('slide')
const autoplay = ref(true)
const interval = ref(3000)
const loop = ref(true)
const arrow = ref<'always' | 'hover' | 'never'>('hover')
const indicatorPosition = ref<'inside' | 'outside' | 'none'>('inside')
const imageMode = ref<'auto' | 'always' | 'never'>('auto')

// 切换方向
function toggleDirection() {
  direction.value = direction.value === 'horizontal' ? 'vertical' : 'horizontal'
}

// 切换效果
function toggleEffect() {
  effect.value = effect.value === 'slide' ? 'fade' : 'slide'
}

// 切换自动播放
function toggleAutoplay() {
  autoplay.value = !autoplay.value
}

// 切换循环播放
function toggleLoop() {
  loop.value = !loop.value
}

// 切换箭头显示
function toggleArrow() {
  const arrowOptions: Array<'always' | 'hover' | 'never'> = ['always', 'hover', 'never']
  const currentIndex = arrowOptions.indexOf(arrow.value)
  arrow.value = arrowOptions[(currentIndex + 1) % arrowOptions.length]
}

// 切换指示器位置
function toggleIndicatorPosition() {
  const positionOptions: Array<'inside' | 'outside' | 'none'> = ['inside', 'outside', 'none']
  const currentIndex = positionOptions.indexOf(indicatorPosition.value)
  indicatorPosition.value = positionOptions[(currentIndex + 1) % positionOptions.length]
}

// 修改轮播间隔
function changeInterval(value: number) {
  interval.value = Math.max(1000, interval.value + value)
}

// 处理轮播切换事件
function handleCarouselChange(index: number, oldIndex: number) {
  console.warn(`轮播切换: ${oldIndex} -> ${index}`)
}

// 处理指示器点击事件
function handleIndicatorClick(index: number) {
  console.warn(`指示器点击: ${index}`)
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-xl font-bold">
      轮播图 Carousel
    </h2>

    <!-- 控制面板 -->
    <div class="mb-6 flex flex-wrap gap-3">
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': direction === 'vertical' }"
        @click="toggleDirection"
      >
        方向: {{ direction }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': effect === 'fade' }"
        @click="toggleEffect"
      >
        效果: {{ effect }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': autoplay }"
        @click="toggleAutoplay"
      >
        自动播放: {{ autoplay ? '开' : '关' }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': loop }"
        @click="toggleLoop"
      >
        循环播放: {{ loop ? '开' : '关' }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        @click="toggleArrow"
      >
        箭头: {{ arrow }}
      </button>
      <button
        class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
        @click="toggleIndicatorPosition"
      >
        指示器: {{ indicatorPosition }}
      </button>
      <div class="flex items-center gap-2">
        <button
          class="border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-100"
          @click="changeInterval(-500)"
        >
          -
        </button>
        <span class="text-sm">{{ interval }}ms</span>
        <button
          class="border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-100"
          @click="changeInterval(500)"
        >
          +
        </button>
      </div>
    </div>

    <!-- 基本图片轮播 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        基本图片轮播
      </h3>
      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="images"
          :direction="direction"
          :effect="effect"
          :autoplay="autoplay"
          :interval="interval"
          :loop="loop"
          :arrow="arrow"
          :indicator-position="indicatorPosition"
          image-mode="always"
          :img-quality="90"
          img-format="webp"
          :img-lazy="true"
          height="400px"
          @change="handleCarouselChange"
        />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        基本的图片轮播，使用<code>image-mode="always"</code>自动优化图片加载，支持自动播放、循环播放、切换方向和效果。
      </p>
    </section>

    <!-- 卡片轮播 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        自定义内容轮播
      </h3>
      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="cards"
          :direction="direction"
          :effect="effect"
          :autoplay="autoplay"
          :interval="interval"
          :loop="loop"
          :arrow="arrow"
          :indicator-position="indicatorPosition"
          image-mode="never"
          height="300px"
          @change="handleCarouselChange"
        >
          <template #item="{ item }">
            <div
              class="h-full w-full flex flex-col items-center justify-center p-8 text-center text-white"
              :style="{ backgroundColor: item.color }"
            >
              <h3 class="mb-4 text-2xl font-bold">
                {{ item.title }}
              </h3>
              <p class="text-lg">
                {{ item.content }}
              </p>
            </div>
          </template>
        </ui-carousel>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        使用自定义内容的轮播，可以轮播任何类型的内容，不仅限于图片。
      </p>
    </section>

    <!-- 垂直轮播 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        垂直方向轮播
      </h3>
      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="cards"
          direction="vertical"
          effect="slide"
          :autoplay="autoplay"
          :interval="interval"
          :loop="loop"
          :arrow="arrow"
          :indicator-position="indicatorPosition"
          height="300px"
          @change="handleCarouselChange"
        >
          <template #item="{ item }">
            <div
              class="h-full w-full flex flex-col items-center justify-center p-8 text-center text-white"
              :style="{ backgroundColor: item.color }"
            >
              <h3 class="mb-4 text-2xl font-bold">
                {{ item.title }}
              </h3>
              <p class="text-lg">
                {{ item.content }}
              </p>
            </div>
          </template>
        </ui-carousel>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        垂直方向的轮播，内容从上到下滚动，适合一些特定场景。
      </p>
    </section>

    <!-- 淡入淡出效果 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        淡入淡出效果
      </h3>
      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="images"
          direction="horizontal"
          effect="fade"
          :autoplay="autoplay"
          :interval="interval"
          :loop="loop"
          :arrow="arrow"
          :image-mode="imageMode"
          :indicator-position="indicatorPosition"
          height="400px"
          @change="handleCarouselChange"
        />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        使用淡入淡出效果的轮播，切换时内容会平滑过渡。
      </p>
    </section>

    <!-- 自定义箭头和指示器 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        自定义箭头和指示器
      </h3>
      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="images"
          direction="horizontal"
          effect="slide"
          :autoplay="autoplay"
          :interval="interval"
          :loop="loop"
          arrow="always"
          :image-mode="imageMode"
          indicator-position="inside"
          height="400px"
          @change="handleCarouselChange"
        >
          <template #arrow-prev>
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-md">
              <ui-icon icon="carbon:arrow-left" class="text-xl" />
            </div>
          </template>
          <template #arrow-next>
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-md">
              <ui-icon icon="carbon:arrow-right" class="text-xl" />
            </div>
          </template>
          <template #indicators="{ activeIndex, count }">
            <div class="flex items-center gap-2">
              <div
                v-for="index in count"
                :key="index"
                class="h-2 rounded-full transition-all"
                :class="[
                  activeIndex === index - 1 ? 'w-6 bg-white' : 'w-2 bg-white bg-opacity-50',
                ]"
                @click="$event.stopPropagation(); handleIndicatorClick(index - 1)"
              />
            </div>
          </template>
        </ui-carousel>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        自定义轮播图的箭头和指示器，可以完全控制它们的样式和行为。
      </p>
    </section>

    <!-- 图片模式选项 -->
    <section class="mb-12">
      <h3 class="mb-4 text-lg font-medium">
        图片模式选项
      </h3>

      <div class="mb-4 flex flex-wrap gap-3">
        <button
          v-for="mode in ['auto', 'always', 'never']"
          :key="mode"
          class="border border-gray-300 rounded px-3 py-1.5 text-sm transition hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-blue-500': imageMode === mode }"
          @click="imageMode = mode as 'auto' | 'always' | 'never'"
        >
          {{ mode }}
        </button>
      </div>

      <div class="border border-gray-200 rounded-lg">
        <ui-carousel
          :items="['https://images.unsplash.com/photo-1682685796063-d2604827f7b3?q=80&w=1170&auto=format&fit=crop', 'https://picsum.photos/id/1/800/400', 'This is not an image URL']"
          direction="horizontal"
          effect="slide"
          :autoplay="false"
          :loop="true"
          arrow="always"
          indicator-position="inside"
          :image-mode="imageMode"
          height="300px"
        />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        演示不同的<code>imageMode</code>选项：
        <ul class="ml-5 mt-2 list-disc">
          <li><code>auto</code>: 自动检测字符串是否为图片URL</li>
          <li><code>always</code>: 始终将items中的字符串作为图片URL处理</li>
          <li><code>never</code>: 不将字符串自动处理为图片，直接显示内容或使用slot</li>
        </ul>
      </p>
    </section>
  </div>
</template>
