<script setup lang="ts" name="UiTour">
/**
 * 漫游式引导组件
 * 创建日期: 2024-07-31
 * 作者: aiftt
 */

import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 步骤配置
   */
  steps: {
    /**
     * 目标元素选择器或DOM元素
     */
    target: string | HTMLElement
    /**
     * 提示内容
     */
    content: string
    /**
     * 提示标题
     */
    title?: string
    /**
     * 提示位置
     */
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    /**
     * 下一步按钮文本
     */
    nextText?: string
    /**
     * 上一步按钮文本
     */
    prevText?: string
    /**
     * 跳过按钮文本
     */
    skipText?: string
    /**
     * 完成按钮文本
     */
    doneText?: string
    /**
     * 自定义类名
     */
    className?: string
    /**
     * 自定义索引
     */
    index?: number
  }[]
  /**
   * 是否显示
   */
  modelValue?: boolean
  /**
   * 背景遮罩颜色
   */
  maskColor?: string
  /**
   * 遮罩透明度
   */
  maskOpacity?: number
  /**
   * 当前步骤索引
   */
  currentStep?: number
  /**
   * 自动开始
   */
  autoStart?: boolean
  /**
   * 是否显示箭头指示器
   */
  arrow?: boolean
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickMask?: boolean
  /**
   * 是否显示步骤指示器
   */
  showStepIndicator?: boolean
  /**
   * 步骤指示器类型
   */
  stepIndicatorType?: 'dot' | 'number' | 'text'
}>(), {
  modelValue: false,
  maskColor: '#000',
  maskOpacity: 0.5,
  currentStep: 0,
  autoStart: false,
  arrow: true,
  closeOnClickMask: false,
  showStepIndicator: true,
  stepIndicatorType: 'dot',
})

// 定义事件
const emit = defineEmits<{
  /**
   * 更新值
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 更新当前步骤
   */
  (e: 'update:currentStep', value: number): void
  /**
   * 当前步骤改变
   */
  (e: 'change', value: number): void
  /**
   * 关闭事件
   */
  (e: 'close'): void
  /**
   * 完成事件
   */
  (e: 'finish'): void
  /**
   * 下一步事件
   */
  (e: 'next', currentStep: number, nextStep: number): void
  /**
   * 上一步事件
   */
  (e: 'prev', currentStep: number, prevStep: number): void
  /**
   * 跳过事件
   */
  (e: 'skip'): void
}>()

// 状态
const visible = ref(props.modelValue)
const current = ref(props.currentStep)
const popoverRef = ref<HTMLElement | null>(null)
const targetRect = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
})
const popoverRect = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
})

// 监听props变化
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
  if (newVal) {
    nextTick(() => {
      updatePosition()
      // 添加事件穿透阻止
      document.body.style.overflow = 'hidden'
    })
  }
  else {
    // 移除事件穿透阻止
    document.body.style.overflow = ''
  }
})

watch(() => props.currentStep, (newVal) => {
  current.value = newVal
  if (visible.value) {
    nextTick(() => {
      updatePosition()
    })
  }
})

// 监听当前步骤变化
watch(current, (newVal) => {
  emit('update:currentStep', newVal)
  emit('change', newVal)
})

// 获取目标元素
function getTargetElement(target: string | HTMLElement | any): HTMLElement | null {
  if (!target)
    return null

  // 如果是字符串选择器
  if (typeof target === 'string') {
    return document.querySelector(target) as HTMLElement
  }

  // 如果是DOM元素
  if (target instanceof HTMLElement) {
    return target
  }

  // 如果是Vue ref
  if (target && target.$el) {
    return target.$el
  }

  // 如果是ref对象
  if (target && target.value) {
    if (target.value instanceof HTMLElement) {
      return target.value
    }
    if (target.value.$el) {
      return target.value.$el
    }
  }

  return null
}

// 更新弹窗位置并滚动到目标元素
function updatePosition() {
  const step = props.steps[current.value]
  if (!step)
    return

  const target = getTargetElement(step.target)

  if (!target) {
    console.warn(`[Tour] 找不到目标元素: ${step.target}`)
    return
  }

  // 滚动到目标元素
  scrollToElement(target)

  // 获取目标元素位置
  const rect = target.getBoundingClientRect()
  targetRect.left = rect.left + window.pageXOffset
  targetRect.top = rect.top + window.pageYOffset
  targetRect.width = rect.width
  targetRect.height = rect.height

  // 计算弹窗位置
  nextTick(() => {
    if (!popoverRef.value)
      return

    const popoverWidth = popoverRef.value.offsetWidth
    const popoverHeight = popoverRef.value.offsetHeight

    // 根据位置计算弹窗坐标
    const placement = step.placement || 'bottom'

    if (placement.includes('top')) {
      popoverRect.top = targetRect.top - popoverHeight - 10
    }
    else if (placement.includes('bottom')) {
      popoverRect.top = targetRect.top + targetRect.height + 10
    }
    else {
      popoverRect.top = targetRect.top + targetRect.height / 2 - popoverHeight / 2
    }

    if (placement.includes('left')) {
      popoverRect.left = targetRect.left - popoverWidth - 10
    }
    else if (placement.includes('right')) {
      popoverRect.left = targetRect.left + targetRect.width + 10
    }
    else {
      popoverRect.left = targetRect.left + targetRect.width / 2 - popoverWidth / 2
    }

    // 确保弹窗不超出屏幕
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (popoverRect.left < 10)
      popoverRect.left = 10
    if (popoverRect.left + popoverWidth > windowWidth - 10) {
      popoverRect.left = windowWidth - popoverWidth - 10
    }

    if (popoverRect.top < 10)
      popoverRect.top = 10
    if (popoverRect.top + popoverHeight > windowHeight - 10) {
      popoverRect.top = windowHeight - popoverHeight - 10
    }
  })
}

// 滚动到目标元素
function scrollToElement(element: HTMLElement) {
  if (!element)
    return

  const rect = element.getBoundingClientRect()
  const isInViewport = (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )

  if (!isInViewport) {
    // 计算滚动位置，使元素居中显示
    const scrollTop = rect.top + window.pageYOffset - window.innerHeight / 2 + rect.height / 2

    // 平滑滚动到元素
    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    })

    // 等待滚动完成后更新位置
    setTimeout(() => {
      updatePosition()
    }, 300)
  }
}

// 处理遮罩点击
function handleMaskClick() {
  if (props.closeOnClickMask) {
    skip()
  }
}

// 下一步
function next() {
  if (current.value < props.steps.length - 1) {
    const nextStep = current.value + 1
    emit('next', current.value, nextStep)
    current.value = nextStep
    nextTick(() => {
      updatePosition()
    })
  }
  else {
    finish()
  }
}

// 上一步
function prev() {
  if (current.value > 0) {
    const prevStep = current.value - 1
    emit('prev', current.value, prevStep)
    current.value = prevStep
    nextTick(() => {
      updatePosition()
    })
  }
}

// 跳过
function skip() {
  visible.value = false
  emit('update:modelValue', false)
  emit('skip')
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 完成
function finish() {
  visible.value = false
  emit('update:modelValue', false)
  emit('finish')
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 开始漫游
function start() {
  visible.value = true
  emit('update:modelValue', true)
  updatePosition()
}

// 自动开始
onMounted(() => {
  if (props.autoStart) {
    start()
  }
})

// 组件卸载时清理
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

// 暴露方法
defineExpose({
  start,
  finish,
  skip,
  next,
  prev,
})
</script>

<template>
  <div v-if="visible" class="ui-tour">
    <!-- 遮罩层 -->
    <div
      class="ui-tour-mask"
      :style="{
        backgroundColor: maskColor,
        opacity: maskOpacity,
      }"
      @click="handleMaskClick"
    />

    <!-- 高亮目标区域 -->
    <div
      class="ui-tour-target"
      :style="{
        left: `${targetRect.left}px`,
        top: `${targetRect.top}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
      }"
    />

    <!-- 提示弹窗 -->
    <div
      ref="popoverRef"
      class="ui-tour-popover"
      :class="steps[current]?.className"
      :style="{
        left: `${popoverRect.left}px`,
        top: `${popoverRect.top}px`,
      }"
    >
      <!-- 弹窗标题 -->
      <div v-if="steps[current]?.title" class="ui-tour-popover-title">
        {{ steps[current].title }}
      </div>

      <!-- 弹窗内容 -->
      <div class="ui-tour-popover-content">
        {{ steps[current]?.content }}
      </div>

      <!-- 步骤指示器 -->
      <div v-if="showStepIndicator && steps.length > 1" class="ui-tour-popover-indicators">
        <div
          v-for="(_, index) in steps"
          :key="index"
          class="ui-tour-popover-indicator"
          :class="{ 'ui-tour-popover-indicator-active': index === current }"
        >
          <template v-if="stepIndicatorType === 'number'">
            {{ index + 1 }}
          </template>
          <template v-else-if="stepIndicatorType === 'text'">
            {{ index === current ? '当前' : '' }}
          </template>
        </div>
      </div>

      <!-- 弹窗底部按钮 -->
      <div class="ui-tour-popover-buttons">
        <!-- 跳过按钮 -->
        <button
          v-if="current < steps.length - 1"
          class="ui-tour-popover-button ui-tour-popover-button-skip"
          @click="skip"
        >
          {{ steps[current]?.skipText || '跳过' }}
        </button>

        <!-- 上一步按钮 -->
        <button
          v-if="current > 0"
          class="ui-tour-popover-button ui-tour-popover-button-prev"
          @click="prev"
        >
          {{ steps[current]?.prevText || '上一步' }}
        </button>

        <!-- 下一步/完成按钮 -->
        <button
          class="ui-tour-popover-button ui-tour-popover-button-next"
          @click="next"
        >
          {{ current < steps.length - 1
            ? (steps[current]?.nextText || '下一步')
            : (steps[current]?.doneText || '完成')
          }}
        </button>
      </div>

      <!-- 箭头指示器 -->
      <div v-if="arrow" class="ui-tour-popover-arrow" />
    </div>
  </div>
</template>

<style scoped>
.ui-tour {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.ui-tour-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.ui-tour-target {
  position: absolute;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  pointer-events: none;
}

.ui-tour-popover {
  position: absolute;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  pointer-events: auto;
  z-index: 10000;
}

.ui-tour-popover-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #111827;
}

.ui-tour-popover-content {
  font-size: 14px;
  color: #374151;
  margin-bottom: 16px;
  line-height: 1.5;
}

.ui-tour-popover-indicators {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  gap: 8px;
}

.ui-tour-popover-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d1d5db;
}

.ui-tour-popover-indicator-active {
  background-color: #3b82f6;
}

.ui-tour-popover-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.ui-tour-popover-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.ui-tour-popover-button-skip {
  background-color: transparent;
  color: #6b7280;
}

.ui-tour-popover-button-skip:hover {
  background-color: #f3f4f6;
}

.ui-tour-popover-button-prev {
  background-color: #f3f4f6;
  color: #111827;
}

.ui-tour-popover-button-prev:hover {
  background-color: #e5e7eb;
}

.ui-tour-popover-button-next {
  background-color: #3b82f6;
  color: #fff;
}

.ui-tour-popover-button-next:hover {
  background-color: #2563eb;
}

.ui-tour-popover-arrow {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transform: rotate(45deg);
}

/* 暗黑模式适配 */
.dark .ui-tour-popover {
  background-color: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark .ui-tour-popover-title {
  color: #f9fafb;
}

.dark .ui-tour-popover-content {
  color: #e5e7eb;
}

.dark .ui-tour-popover-indicator {
  background-color: #4b5563;
}

.dark .ui-tour-popover-indicator-active {
  background-color: #60a5fa;
}

.dark .ui-tour-popover-button-skip {
  color: #9ca3af;
}

.dark .ui-tour-popover-button-skip:hover {
  background-color: #374151;
}

.dark .ui-tour-popover-button-prev {
  background-color: #374151;
  color: #f9fafb;
}

.dark .ui-tour-popover-button-prev:hover {
  background-color: #4b5563;
}

.dark .ui-tour-popover-arrow {
  background-color: #1f2937;
}
</style>
