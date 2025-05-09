<script setup lang="ts" name="UiOverflowlist">
/**
 * 折叠列表组件 - 当空间不足时自动折叠列表项
 * 创建日期: 2024-07-19
 * 作者: aiftt
 * 更新日期: 2024-07-19 - 初始实现
 * 2024-07-20 - 添加展开/收起动画效果
 * 2024-07-22 - 优化展开/收起动画，改进垂直模式下按钮样式
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

// 定义 props
const props = withDefaults(defineProps<{
  /**
   * 列表项数据
   */
  items: any[]
  /**
   * 最小可见项数量
   */
  minVisibleItems?: number
  /**
   * 折叠项显示的文本
   */
  overflowText?: string
  /**
   * 列表项的唯一标识字段
   */
  itemKey?: string
  /**
   * 折叠项的位置，默认为末尾
   */
  overflowPosition?: 'start' | 'end'
  /**
   * 是否禁用折叠功能
   */
  disabled?: boolean
  /**
   * 列表项之间的间距
   */
  gap?: string | number
  /**
   * 列表项的类名
   */
  itemClass?: string
  /**
   * 折叠项的类名
   */
  overflowClass?: string
  /**
   * 列表项的最小宽度，确保项目显示完整
   */
  minItemWidth?: string | number
  /**
   * 点击更多按钮时是否展开所有项目
   */
  expandOnClick?: boolean
  /**
   * 排列方向，水平或垂直
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 最大高度，当direction为vertical时生效
   */
  maxHeight?: string | number
  /**
   * 收起按钮文本
   */
  collapseText?: string
  /**
   * 是否启用动画
   */
  animated?: boolean
}>(), {
  minVisibleItems: 0,
  overflowText: '更多',
  itemKey: 'id',
  overflowPosition: 'end',
  disabled: false,
  gap: '8px',
  minItemWidth: 'auto',
  expandOnClick: false,
  direction: 'horizontal',
  maxHeight: '300px',
  collapseText: '收起',
  animated: true,
})

// 定义 emits
const emit = defineEmits<{
  /**
   * 点击折叠项时触发
   */
  (e: 'overflowClick', hiddenItems: any[]): void
  /**
   * 可见项变化时触发
   */
  (e: 'visibilityChange', visibleItems: any[], hiddenItems: any[]): void
}>()

// 内部状态
const containerRef = ref<HTMLElement | null>(null)
const visibleItems = ref<any[]>([])
const hiddenItems = ref<any[]>([])
const isOverflowing = ref(false)
const needsRecalculation = ref(true)
const resizeObserver = ref<ResizeObserver | null>(null)
const isExpanded = ref(false)

// 容器样式
const containerStyle = computed(() => {
  const style: Record<string, string> = {}

  // 设置间距
  if (props.direction === 'horizontal') {
    style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  }
  else {
    style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  }

  // 垂直方向时设置最大高度和滚动
  if (props.direction === 'vertical' && !isExpanded.value) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }

  return style
})

// 项目容器样式
const itemsContainerStyle = computed(() => {
  const style: Record<string, string> = {
    gap: containerStyle.value.gap || '',
  }

  // 水平方向展开时设置flex-wrap为wrap，允许内容换行显示
  if (props.direction === 'horizontal' && isExpanded.value) {
    style.flexWrap = 'wrap'
  }

  return style
})

// 项目样式
const itemStyle = computed(() => {
  return {
    minWidth: typeof props.minItemWidth === 'number' ? `${props.minItemWidth}px` : props.minItemWidth,
  }
})

// 计算要显示的项
function updateVisibleItems() {
  if (!containerRef.value || props.disabled) {
    visibleItems.value = [...props.items]
    hiddenItems.value = []
    isOverflowing.value = false
    return
  }

  // 如果展开状态，显示所有项目
  if (isExpanded.value) {
    visibleItems.value = [...props.items]
    hiddenItems.value = []
    isOverflowing.value = props.items.length > 0 // 仍然保持溢出状态以显示收起按钮
    return
  }

  // 初始设置所有项可见
  visibleItems.value = [...props.items]
  hiddenItems.value = []
  isOverflowing.value = false

  // 需要等待DOM更新后再计算
  nextTick(() => {
    if (!containerRef.value)
      return

    const container = containerRef.value

    // 处理垂直方向的情况
    if (props.direction === 'vertical') {
      handleVerticalOverflow(container)
      return
    }

    // 处理水平方向的情况
    handleHorizontalOverflow(container)
  })
}

// 处理水平方向的溢出计算
function handleHorizontalOverflow(container: HTMLElement) {
  const containerWidth = container.clientWidth

  // 先计算更多按钮的宽度
  const moreButtonWidth = getMoreButtonWidth(container)

  // 获取列表项容器
  const itemsContainer = container.querySelector('.ui-overflowlist-items')
  if (!itemsContainer)
    return

  // 获取所有项目元素
  const itemElements = Array.from(itemsContainer.children)

  if (itemElements.length > 0) {
    let totalWidth = 0
    let visibleCount = 0

    // 可用于项目的空间 = 容器宽度 - 更多按钮宽度 - 间距
    const availableWidth = containerWidth - moreButtonWidth - 8 // 减去按钮的左右margin

    // 根据位置决定计算方向
    if (props.overflowPosition === 'end') {
      // 从前向后计算
      for (let i = 0; i < itemElements.length; i++) {
        const itemWidth = itemElements[i].getBoundingClientRect().width

        // 添加当前项宽度 + 间距
        if (i > 0) {
          // 考虑间距
          const computedStyle = window.getComputedStyle(container)
          const gapSize = Number.parseFloat(computedStyle.columnGap || props.gap as string)
          totalWidth += gapSize
        }

        totalWidth += itemWidth

        // 检查是否超过可用空间
        if (totalWidth > availableWidth) {
          isOverflowing.value = true
          // 确保至少显示最小可见项数
          if (visibleCount < props.minVisibleItems) {
            visibleCount = props.minVisibleItems
          }
          break
        }

        visibleCount++
      }
    }
    else {
      // 从后向前计算
      for (let i = itemElements.length - 1; i >= 0; i--) {
        const itemWidth = itemElements[i].getBoundingClientRect().width

        // 添加当前项宽度 + 间距
        if (i < itemElements.length - 1) {
          // 考虑间距
          const computedStyle = window.getComputedStyle(container)
          const gapSize = Number.parseFloat(computedStyle.columnGap || props.gap as string)
          totalWidth += gapSize
        }

        totalWidth += itemWidth

        // 检查是否超过可用空间
        if (totalWidth > availableWidth) {
          isOverflowing.value = true
          // 确保至少显示最小可见项数
          if (visibleCount < props.minVisibleItems) {
            visibleCount = props.minVisibleItems
          }
          break
        }

        visibleCount++
      }
    }

    // 更新可见和隐藏项
    if (isOverflowing.value) {
      if (props.overflowPosition === 'end') {
        // 前面的项可见
        visibleItems.value = props.items.slice(0, Math.max(visibleCount, props.minVisibleItems))
        hiddenItems.value = props.items.slice(Math.max(visibleCount, props.minVisibleItems))
      }
      else {
        // 后面的项可见
        visibleItems.value = props.items.slice(props.items.length - Math.max(visibleCount, props.minVisibleItems))
        hiddenItems.value = props.items.slice(0, props.items.length - Math.max(visibleCount, props.minVisibleItems))
      }
    }
    else {
      // 所有项都可见
      visibleItems.value = [...props.items]
      hiddenItems.value = []
    }

    // 触发可见性变化事件
    emit('visibilityChange', visibleItems.value, hiddenItems.value)
  }
}

// 处理垂直方向的溢出计算
function handleVerticalOverflow(container: HTMLElement) {
  const maxHeight = typeof props.maxHeight === 'number'
    ? props.maxHeight
    : Number.parseFloat(props.maxHeight)

  // 先计算更多按钮的高度
  const moreButtonHeight = getMoreButtonHeight(container)

  // 获取列表项容器
  const itemsContainer = container.querySelector('.ui-overflowlist-items')
  if (!itemsContainer)
    return

  // 获取所有项目元素
  const itemElements = Array.from(itemsContainer.children)

  if (itemElements.length > 0) {
    let totalHeight = 0
    let visibleCount = 0

    // 可用于项目的高度 = 最大高度 - 更多按钮高度 - 间距
    const availableHeight = maxHeight - moreButtonHeight - 8 // 减去按钮的上下margin

    // 根据位置决定计算方向
    if (props.overflowPosition === 'end') {
      // 从上向下计算
      for (let i = 0; i < itemElements.length; i++) {
        const itemHeight = itemElements[i].getBoundingClientRect().height

        // 添加当前项高度 + 间距
        if (i > 0) {
          // 考虑间距
          const computedStyle = window.getComputedStyle(container)
          const gapSize = Number.parseFloat(computedStyle.rowGap || props.gap as string)
          totalHeight += gapSize
        }

        totalHeight += itemHeight

        // 检查是否超过可用空间
        if (totalHeight > availableHeight) {
          isOverflowing.value = true
          // 确保至少显示最小可见项数
          if (visibleCount < props.minVisibleItems) {
            visibleCount = props.minVisibleItems
          }
          break
        }

        visibleCount++
      }
    }
    else {
      // 从下向上计算
      for (let i = itemElements.length - 1; i >= 0; i--) {
        const itemHeight = itemElements[i].getBoundingClientRect().height

        // 添加当前项高度 + 间距
        if (i < itemElements.length - 1) {
          // 考虑间距
          const computedStyle = window.getComputedStyle(container)
          const gapSize = Number.parseFloat(computedStyle.rowGap || props.gap as string)
          totalHeight += gapSize
        }

        totalHeight += itemHeight

        // 检查是否超过可用空间
        if (totalHeight > availableHeight) {
          isOverflowing.value = true
          // 确保至少显示最小可见项数
          if (visibleCount < props.minVisibleItems) {
            visibleCount = props.minVisibleItems
          }
          break
        }

        visibleCount++
      }
    }

    // 更新可见和隐藏项
    if (isOverflowing.value) {
      if (props.overflowPosition === 'end') {
        // 前面的项可见
        visibleItems.value = props.items.slice(0, Math.max(visibleCount, props.minVisibleItems))
        hiddenItems.value = props.items.slice(Math.max(visibleCount, props.minVisibleItems))
      }
      else {
        // 后面的项可见
        visibleItems.value = props.items.slice(props.items.length - Math.max(visibleCount, props.minVisibleItems))
        hiddenItems.value = props.items.slice(0, props.items.length - Math.max(visibleCount, props.minVisibleItems))
      }
    }
    else {
      // 所有项都可见
      visibleItems.value = [...props.items]
      hiddenItems.value = []
    }

    // 触发可见性变化事件
    emit('visibilityChange', visibleItems.value, hiddenItems.value)
  }
}

// 计算"更多"按钮的宽度
function getMoreButtonWidth(container: HTMLElement): number {
  const tempMoreEl = document.createElement('div')
  tempMoreEl.className = 'ui-overflowlist-more'
  if (props.overflowClass) {
    tempMoreEl.className += ` ${props.overflowClass}`
  }
  tempMoreEl.style.visibility = 'hidden'
  tempMoreEl.style.position = 'absolute'
  tempMoreEl.textContent = props.overflowText
  container.appendChild(tempMoreEl)
  const width = tempMoreEl.getBoundingClientRect().width + 16 // 包括左右margin和内边距
  container.removeChild(tempMoreEl)
  return width
}

// 计算"更多"按钮的高度
function getMoreButtonHeight(container: HTMLElement): number {
  const tempMoreEl = document.createElement('div')
  tempMoreEl.className = 'ui-overflowlist-more'
  if (props.overflowClass) {
    tempMoreEl.className += ` ${props.overflowClass}`
  }
  tempMoreEl.style.visibility = 'hidden'
  tempMoreEl.style.position = 'absolute'
  tempMoreEl.textContent = props.overflowText
  container.appendChild(tempMoreEl)
  const height = tempMoreEl.getBoundingClientRect().height + 8 // 包括上下margin和内边距
  container.removeChild(tempMoreEl)
  return height
}

// 处理点击更多按钮
function handleOverflowClick() {
  if (props.expandOnClick) {
    isExpanded.value = !isExpanded.value
    updateVisibleItems() // 更新可见项目列表
  }

  // 触发点击事件
  emit('overflowClick', hiddenItems.value)
}

// 监听项目变化
watch(() => props.items, () => {
  isExpanded.value = false
  needsRecalculation.value = true
  nextTick(() => {
    updateVisibleItems()
  })
}, { deep: true })

// 监听其他属性变化
watch([
  () => props.minVisibleItems,
  () => props.overflowPosition,
  () => props.disabled,
  () => props.gap,
  () => props.minItemWidth,
], () => {
  isExpanded.value = false
  needsRecalculation.value = true
  nextTick(() => {
    updateVisibleItems()
  })
})

// 在组件挂载后设置ResizeObserver以响应容器大小变化
onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver.value = new ResizeObserver(() => {
      needsRecalculation.value = true
      updateVisibleItems()
    })

    if (containerRef.value) {
      resizeObserver.value.observe(containerRef.value)
    }
  }

  // 初始计算
  updateVisibleItems()
})

// 在组件卸载时清理ResizeObserver
onUnmounted(() => {
  if (resizeObserver.value && containerRef.value) {
    resizeObserver.value.unobserve(containerRef.value)
    resizeObserver.value.disconnect()
  }
})

// 提供给父组件的更新方法
defineExpose({
  recalculate: updateVisibleItems,
})
</script>

<template>
  <div
    ref="containerRef"
    class="ui-overflowlist"
    :class="[
      `ui-overflowlist--${direction}`,
      { 'ui-overflowlist--expanded': isExpanded },
      { 'ui-overflowlist--animated': animated },
    ]"
    :style="containerStyle"
  >
    <!-- 开头的折叠项 -->
    <div
      v-if="(isOverflowing && overflowPosition === 'start' && hiddenItems.length > 0) || (expandOnClick && isExpanded && overflowPosition === 'start')"
      class="ui-overflowlist-more flex-none"
      :class="[
        overflowClass,
        { 'ui-overflowlist-more--expanded': isExpanded },
        { 'ui-overflowlist-more--vertical': direction === 'vertical' },
      ]"
      @click="handleOverflowClick"
    >
      <slot name="overflow" :hidden-items="hiddenItems" :is-expanded="isExpanded">
        {{ isExpanded ? collapseText : overflowText }}
        <ui-icon v-if="isExpanded" icon="carbon:chevron-up" class="ui-overflowlist-more-icon rotate-icon" />
        <ui-icon v-else icon="carbon:chevron-down" class="ui-overflowlist-more-icon" />
      </slot>
    </div>

    <!-- 可见项容器 -->
    <div
      class="ui-overflowlist-items"
      :style="itemsContainerStyle"
    >
      <!-- 基本可见项 -->
      <div
        v-for="item in visibleItems"
        :key="itemKey ? item[itemKey] : item"
        class="ui-overflowlist-item"
        :class="itemClass"
        :style="itemStyle"
      >
        <slot name="item" :item="item">
          {{ item }}
        </slot>
      </div>

      <!-- 展开时显示的隐藏项 -->
      <transition-group
        v-if="isExpanded && expandOnClick"
        name="item-fade"
        tag="div"
        class="ui-overflowlist-hidden-items"
      >
        <div
          v-for="item in hiddenItems"
          :key="itemKey ? item[itemKey] : item"
          class="ui-overflowlist-item ui-overflowlist-hidden-item"
          :class="itemClass"
          :style="itemStyle"
        >
          <slot name="item" :item="item">
            {{ item }}
          </slot>
        </div>
      </transition-group>
    </div>

    <!-- 结尾的折叠项 -->
    <div
      v-if="(isOverflowing && overflowPosition === 'end' && hiddenItems.length > 0) || (expandOnClick && isExpanded && overflowPosition === 'end')"
      class="ui-overflowlist-more flex-none"
      :class="[
        overflowClass,
        { 'ui-overflowlist-more--expanded': isExpanded },
        { 'ui-overflowlist-more--vertical': direction === 'vertical' },
      ]"
      @click="handleOverflowClick"
    >
      <slot name="overflow" :hidden-items="hiddenItems" :is-expanded="isExpanded">
        {{ isExpanded ? collapseText : overflowText }}
        <ui-icon v-if="isExpanded" icon="carbon:chevron-up" class="ui-overflowlist-more-icon rotate-icon" />
        <ui-icon v-else icon="carbon:chevron-down" class="ui-overflowlist-more-icon" />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ui-overflowlist {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.ui-overflowlist--horizontal {
  flex-direction: row;
}

.ui-overflowlist--vertical {
  flex-direction: column;
  align-items: stretch;
  overflow: hidden; /* 添加溢出隐藏，以便动画效果更好 */
}

.ui-overflowlist-items {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
  flex: 1;
  min-width: 0; /* 确保容器可以缩小 */
}

/* 隐藏项容器 */
.ui-overflowlist-hidden-items {
  display: contents;
}

/* 水平方向展开状态 */
.ui-overflowlist--expanded.ui-overflowlist--horizontal .ui-overflowlist-items {
  flex-wrap: wrap;
  row-gap: 8px;
  overflow: visible;
}

.ui-overflowlist--vertical .ui-overflowlist-items {
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
}

/* 展开状态下的垂直容器显示滚动条 */
.ui-overflowlist--vertical.ui-overflowlist--expanded .ui-overflowlist-items {
  max-height: none;
  overflow-y: auto;
}

.ui-overflowlist-item {
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 水平方向展开状态下的项目样式 */
.ui-overflowlist--expanded.ui-overflowlist--horizontal .ui-overflowlist-item {
  margin-bottom: 4px;
}

.ui-overflowlist--vertical .ui-overflowlist-item {
  white-space: normal;
  width: 100%;
}

.ui-overflowlist-more {
  flex-shrink: 0;
  cursor: pointer;
  white-space: nowrap;
  color: var(--ui-color-primary, #10b981);
  font-weight: 500;
  padding: 4px 8px;
  box-sizing: border-box;
  margin: 0 4px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

.ui-overflowlist--vertical .ui-overflowlist-more {
  width: 100%;
  justify-content: center;
  margin: 8px 0;
  padding: 6px 12px;
}

/* 水平模式下的按钮样式 */
.ui-overflowlist-more:hover:not(.ui-overflowlist-more--vertical) {
  background-color: var(--ui-color-primary-light, #ecfdf5);
}

.ui-overflowlist-more--expanded:not(.ui-overflowlist-more--vertical) {
  background-color: var(--ui-color-primary-light, #ecfdf5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 垂直模式下的按钮样式 */
.ui-overflowlist-more--vertical {
  background-color: transparent !important;
  box-shadow: none !important;
  border-top: 1px dashed var(--ui-color-border, #e5e7eb);
  border-bottom: 1px dashed var(--ui-color-border, #e5e7eb);
  border-radius: 0;
}

.ui-overflowlist-more--vertical:hover {
  color: var(--ui-color-primary-dark, #059669);
}

.ui-overflowlist-more-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.rotate-icon {
  transform: rotate(180deg);
}

/* 展开/收起动画 */
.ui-overflowlist--animated.ui-overflowlist--vertical {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease;
}

.ui-overflowlist--animated.ui-overflowlist--horizontal .ui-overflowlist-items {
  transition: all 0.3s ease-in-out;
}

.ui-overflowlist--animated .ui-overflowlist-hidden-items {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* 项目淡入淡出动画 */
.item-fade-enter-active,
.item-fade-leave-active {
  transition: all 0.3s ease;
}

.item-fade-enter-from,
.item-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 水平方向的展开动画 */
.ui-overflowlist--horizontal .item-fade-enter-from,
.ui-overflowlist--horizontal .item-fade-leave-to {
  transform: translateY(5px);
}

/* 垂直方向的展开动画 */
.ui-overflowlist--vertical .item-fade-enter-from,
.ui-overflowlist--vertical .item-fade-leave-to {
  transform: translateX(10px);
}

/* 容器展开收起动画 */
.ui-overflowlist--animated.ui-overflowlist--expanded .ui-overflowlist-items {
  animation: expand 0.3s ease-out forwards;
}

.ui-overflowlist--animated:not(.ui-overflowlist--expanded) .ui-overflowlist-items {
  animation: collapse 0.3s ease-in forwards;
}

@keyframes expand {
  0% {
    opacity: 0.8;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes collapse {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.8;
    transform: translateY(-5px);
  }
}
</style>
