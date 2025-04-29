<script setup lang="ts" name="UiImage">
/**
 * 图片组件
 * 创建日期: 2025-01-15
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量
 * 更新日期: 2025-03-02 - 改进CSS变量实现，移除内联style
 */

import { computed, onMounted, ref } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 图片源URL
   */
  src: string
  /**
   * 图片加载失败时显示的图片
   */
  fallback?: string
  /**
   * 图片说明
   */
  alt?: string
  /**
   * 预览图片的URL, 不设置则使用src
   */
  previewSrc?: string
  /**
   * 图片宽度
   */
  width?: string | number
  /**
   * 图片高度
   */
  height?: string | number
  /**
   * 图片填充方式
   * fill: 填充整个容器，可能裁剪
   * contain: 保持宽高比，缩放至完全显示
   * cover: 保持宽高比，填充容器
   * none: 原始大小
   * scale-down: 保持宽高比，缩放至完全显示，不大于原始大小
   */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /**
   * 图片圆角大小
   */
  radius?: string | number
  /**
   * 是否懒加载
   */
  lazy?: boolean
  /**
   * 懒加载触发阈值
   */
  lazyOffset?: number
  /**
   * 加载图片时显示的占位图
   */
  placeholder?: string
  /**
   * 是否显示图片预览
   */
  preview?: boolean
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 是否隐藏图片加载失败时显示的图标
   */
  hideOnError?: boolean
  /**
   * 初始是否可见（用于懒加载）
   */
  initialVisible?: boolean
}>(), {
  alt: '',
  fit: 'cover',
  lazy: false,
  lazyOffset: 200,
  preview: false,
  customClass: '',
  hideOnError: false,
  initialVisible: true,
})

// 定义事件
const emit = defineEmits<{
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
  (e: 'preview', src: string): void
}>()

// 状态
const isLoaded = ref(false)
const isError = ref(false)
const isVisible = ref(props.initialVisible)
const imageRef = ref<HTMLImageElement | null>(null)
const observerRef = ref<IntersectionObserver | null>(null)

// 计算 CSS 变量
const widthVar = computed(() => {
  if (props.width) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return null
})

const heightVar = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return null
})

const radiusVar = computed(() => {
  if (props.radius) {
    return typeof props.radius === 'number' ? `${props.radius}px` : props.radius
  }
  return null
})

const fitVar = computed(() => props.fit || null)

// 图片源
const imageSrc = computed(() => {
  if (isError.value && props.fallback) {
    return props.fallback
  }
  return isVisible.value ? props.src : ''
})

// 处理图片加载事件
function handleLoad(event: Event) {
  isLoaded.value = true
  isError.value = false
  emit('load', event)
}

// 处理图片加载错误
function handleError(event: Event) {
  isError.value = true
  emit('error', event)
}

// 处理图片预览
function handlePreview() {
  if (props.preview && !isError.value) {
    emit('preview', props.previewSrc || props.src)
  }
}

// 设置懒加载
onMounted(() => {
  if (props.lazy && typeof IntersectionObserver !== 'undefined') {
    observerRef.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true
          observerRef.value?.disconnect()
        }
      },
      {
        rootMargin: `${props.lazyOffset}px`,
      },
    )

    if (imageRef.value) {
      observerRef.value.observe(imageRef.value)
    }
  }
})
</script>

<template>
  <div
    ref="imageRef"
    class="ui-image"
    :class="[
      customClass,
      {
        'ui-image--loading': !isLoaded && !isError,
        'ui-image--error': isError,
        'ui-image--preview': preview,
        'ui-image--custom-size': width || height,
        'ui-image--custom-radius': radius,
      },
    ]"
    @click="handlePreview"
  >
    <!-- 图片 -->
    <img
      v-if="isVisible"
      :src="imageSrc"
      :alt="alt"
      class="ui-image__img"
      @load="handleLoad"
      @error="handleError"
    >

    <!-- 加载占位 -->
    <div v-if="!isLoaded && !isError" class="ui-image__placeholder">
      <img v-if="placeholder" :src="placeholder" class="ui-image__placeholder-img" alt="Loading placeholder">
      <div v-else class="ui-image__loading-icon">
        <div class="ui-image__loading-spinner" />
      </div>
    </div>

    <!-- 错误占位 -->
    <div v-if="isError && !hideOnError && !fallback" class="ui-image__error">
      <ui-icon icon="carbon:image-error" width="24" height="24" />
      <span class="ui-image__error-text">图片加载失败</span>
    </div>

    <!-- 预览图标 -->
    <div v-if="preview && isLoaded && !isError" class="ui-image__preview-icon">
      <ui-icon icon="carbon:zoom-in" width="20" height="20" />
    </div>
  </div>
</template>

<style scoped>
.ui-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: auto;
  height: auto;
  border-radius: 0;
}

.ui-image--custom-size {
  --ui-image-width: v-bind(widthVar);
  --ui-image-height: v-bind(heightVar);
  width: var(--ui-image-width, auto);
  height: var(--ui-image-height, auto);
}

.ui-image--custom-radius {
  --ui-image-radius: v-bind(radiusVar);
  border-radius: var(--ui-image-radius, 0);
}

.ui-image__img {
  display: block;
  width: 100%;
  height: 100%;
  --ui-image-object-fit: v-bind(fitVar);
  object-fit: var(--ui-image-object-fit, cover);
}

.ui-image--loading .ui-image__img {
  opacity: 0;
}

.ui-image--error .ui-image__img {
  opacity: 0;
}

.ui-image--preview {
  cursor: pointer;
  transition: transform 0.3s;
}

.ui-image--preview:hover {
  transform: scale(1.05);
}

.ui-image__placeholder,
.ui-image__error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ui-color-background-light, #f3f4f6);
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-image__error-icon,
.ui-image__placeholder-icon {
  font-size: 1.5rem;
  opacity: 0.6;
}

.ui-image__placeholder-img {
  max-width: 100%;
  max-height: 100%;
}

.ui-image__loading-icon {
  font-size: 20px;
}

.ui-image__loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--ui-image-spinner, #e6e6e6);
  border-top-color: var(--ui-image-spinner-active, #409eff);
  border-radius: 50%;
  animation: ui-image-rotate 1s linear infinite;
}

.ui-image__error-text {
  margin-top: 8px;
}

.ui-image__preview-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: zoom-in;
  opacity: 0;
  transition: opacity 0.3s;
}

.ui-image--preview:hover .ui-image__preview-icon {
  opacity: 1;
}

@keyframes ui-image-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 暗黑模式 */
:root.dark .ui-image {
  background-color: var(--ui-image-bg-dark, #262626);
}

:root.dark .ui-image__loading-spinner {
  border-color: var(--ui-image-spinner-dark, #444);
  border-top-color: var(--ui-image-spinner-active-dark, #69b1ff);
}

:root.dark .ui-image__error,
:root.dark .ui-image__placeholder {
  background-color: var(--ui-color-background-dark, #1f2937);
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}
</style>
