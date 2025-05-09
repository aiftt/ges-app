<script setup lang="ts" name="UiCollapseItem">
/**
 * CollapseItem 折叠面板项组件
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-06-25 - 修复 TypeScript 错误
 */

import { computed, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 面板唯一标识
   */
  name: string
  /**
   * 面板标题
   */
  title?: string
  /**
   * 面板禁用状态
   */
  disabled?: boolean
  /**
   * 自定义展开图标
   */
  expandIcon?: string
  /**
   * 展开额外内容
   */
  extra?: string
  /**
   * 自定义标题图标
   */
  icon?: string
  /**
   * 是否显示边框
   */
  bordered?: boolean
}>(), {
  disabled: false,
  bordered: true,
})

// 内容高度计算
const contentRef = ref<HTMLElement>()
const contentHeight = ref(0)

// 父组件注入的上下文
const {
  activeItems,
  updateActiveItems,
  accordion: _parentAccordion,
  expandIcon: parentExpandIcon,
  iconPosition,
  showArrow,
  simple,
} = inject('collapseContext', {
  activeItems: ref<string[]>([]),
  updateActiveItems: (_name: string) => {},
  accordion: computed(() => false),
  expandIcon: computed(() => undefined),
  iconPosition: computed(() => 'left'),
  showArrow: computed(() => true),
  simple: computed(() => false),
})

// 获取slots
const slots = useSlots()

// 计算是否为激活状态
const isActive = computed(() => {
  return activeItems.value.includes(props.name)
})

// 使用的展开图标
const finalExpandIcon = computed(() => {
  return props.expandIcon || parentExpandIcon.value || 'heroicons:chevron-right-20-solid'
})

// 计算图标的 class
const arrowClass = computed(() => {
  return isActive.value ? 'ui-collapse-item__arrow ui-collapse-item__arrow--expanded' : 'ui-collapse-item__arrow'
})

// 处理点击标题事件
function handleHeaderClick() {
  if (props.disabled)
    return
  updateActiveItems(props.name)
}

// 计算内容区域的样式
const contentStyle = computed(() => {
  return {
    height: isActive.value ? `${contentHeight.value}px` : '0',
    opacity: isActive.value ? 1 : 0,
    overflow: isActive.value ? 'visible' : 'hidden',
  }
})

// 更新内容高度
function updateContentHeight() {
  if (contentRef.value) {
    const contentEl = contentRef.value
    contentHeight.value = contentEl.scrollHeight
  }
}

// 观察内容变化
onMounted(() => {
  updateContentHeight()
  window.addEventListener('resize', updateContentHeight)

  // 使用MutationObserver监听内容变化
  if (contentRef.value) {
    const observer = new MutationObserver(updateContentHeight)
    observer.observe(contentRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContentHeight)
})

// 监听激活状态变化
watch(isActive, () => {
  updateContentHeight()
}, { immediate: true })
</script>

<template>
  <div
    class="ui-collapse-item"
    :class="[
      {
        'ui-collapse-item--active': isActive,
        'ui-collapse-item--disabled': disabled,
        'ui-collapse-item--bordered': bordered && simple === false,
        'ui-collapse-item--simple': simple === true,
      },
    ]"
  >
    <!-- 面板头部 -->
    <div
      class="ui-collapse-item__header"
      :class="[
        `ui-collapse-item__header--${iconPosition}`,
      ]"
      @click="handleHeaderClick"
    >
      <!-- 左侧图标 -->
      <ui-icon
        v-if="icon"
        :icon="icon"
        class="ui-collapse-item__icon"
      />

      <!-- 展开图标 (左侧) -->
      <ui-icon
        v-if="showArrow && iconPosition === 'left'"
        :icon="finalExpandIcon"
        :class="arrowClass"
      />

      <!-- 标题 -->
      <div class="ui-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <!-- 右侧额外内容 -->
      <div v-if="slots.extra || extra" class="ui-collapse-item__extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>

      <!-- 展开图标 (右侧) -->
      <ui-icon
        v-if="showArrow && iconPosition === 'right'"
        :icon="finalExpandIcon"
        :class="arrowClass"
      />
    </div>

    <!-- 内容区域 -->
    <div
      class="ui-collapse-item__content"
      :style="contentStyle"
    >
      <div ref="contentRef" class="ui-collapse-item__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-collapse-item {
  position: relative;
}

.ui-collapse-item:last-child.ui-collapse-item--bordered {
  border-bottom: none;
}

.ui-collapse-item--bordered {
  border-bottom: 1px solid var(--ui-collapse-border, var(--ui-border-color));
}

.ui-collapse-item--disabled {
  color: var(--ui-color-disabled-text);
  cursor: not-allowed;
}

/* 面板标题 */
.ui-collapse-item__header {
  display: flex;
  align-items: center;
  padding: var(--ui-collapse-header-padding, 12px 16px);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.ui-collapse-item__header:hover:not(.ui-collapse-item--disabled) {
  background-color: var(--ui-collapse-header-hover-bg, var(--ui-color-bg-hover));
}

/* 标题图标 */
.ui-collapse-item__icon {
  margin-right: 8px;
  font-size: var(--ui-collapse-icon-size, 16px);
}

/* 展开箭头 */
.ui-collapse-item__arrow {
  font-size: var(--ui-collapse-arrow-size, 16px);
  transition: transform 0.2s;
}

.ui-collapse-item__header--left .ui-collapse-item__arrow {
  margin-right: 8px;
}

.ui-collapse-item__header--right .ui-collapse-item__arrow {
  margin-left: 8px;
}

.ui-collapse-item__arrow--expanded {
  transform: rotate(90deg);
}

/* 标题 */
.ui-collapse-item__title {
  flex: 1;
  font-weight: 500;
}

/* 额外内容 */
.ui-collapse-item__extra {
  margin-left: 12px;
}

/* 内容区域 */
.ui-collapse-item__content {
  height: 0;
  opacity: 0;
  transition:
    height 0.2s,
    opacity 0.2s;
  overflow: hidden;
}

.ui-collapse-item__body {
  padding: var(--ui-collapse-content-padding, 0 16px 16px);
  width: 100%;
  box-sizing: border-box;
}

/* 嵌套折叠面板的样式 */
.ui-collapse-item .ui-collapse {
  width: 100%;
  margin: 0;
  border: none;
  box-sizing: border-box;
}

/* 简洁模式 */
.ui-collapse-item--simple .ui-collapse-item__header {
  padding: var(--ui-collapse-simple-header-padding, 8px 0);
}

.ui-collapse-item--simple .ui-collapse-item__body {
  padding: var(--ui-collapse-simple-content-padding, 0 0 8px 24px);
}
</style>
