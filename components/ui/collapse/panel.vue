<script setup lang="ts" name="UiCollapsePanel">
/**
 * Collapse Panel 折叠面板子项组件
 * 创建日期: 2024-08-20
 * 作者: aiftt
 * 更新日期: 2024-08-20 - 初始版本
 */

import { computed } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 面板ID
   */
  id: string | number
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

// 定义事件
const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'open'): void
  (e: 'close'): void
}>()

// 使用defineModel替代useVModel
const isActive = defineModel<boolean>('active', { default: false })

// 处理点击标题事件
function handleToggle() {
  if (props.disabled)
    return

  const newState = !isActive.value
  isActive.value = newState

  emit('toggle')
  if (newState) {
    emit('open')
  }
  else {
    emit('close')
  }
}

// 计算展开图标的class
const arrowClass = computed(() =>
  isActive.value ? 'ui-collapse-panel__arrow ui-collapse-panel__arrow--expanded' : 'ui-collapse-panel__arrow',
)
</script>

<template>
  <div
    class="ui-collapse-panel"
    :class="[
      {
        'ui-collapse-panel--active': isActive,
        'ui-collapse-panel--disabled': disabled,
        'ui-collapse-panel--bordered': bordered,
      },
    ]"
  >
    <!-- 面板头部 -->
    <div
      class="ui-collapse-panel__header"
      @click="handleToggle"
    >
      <!-- 标题图标 -->
      <ui-icon
        v-if="icon"
        :icon="icon"
        class="ui-collapse-panel__icon"
      />

      <!-- 展开图标 -->
      <ui-icon
        v-if="expandIcon"
        :icon="expandIcon"
        :class="arrowClass"
      />

      <!-- 标题 -->
      <div class="ui-collapse-panel__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <!-- 右侧额外内容 -->
      <div v-if="$slots.extra || extra" class="ui-collapse-panel__extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>

    <!-- 内容区域 -->
    <div
      v-show="isActive"
      class="ui-collapse-panel__content"
    >
      <div class="ui-collapse-panel__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-collapse-panel {
  position: relative;
}

.ui-collapse-panel--bordered {
  border-bottom: 1px solid var(--ui-collapse-border, var(--ui-border-color));
}

.ui-collapse-panel--bordered:last-child {
  border-bottom: none;
}

.ui-collapse-panel--disabled {
  color: var(--ui-color-disabled-text);
  cursor: not-allowed;
}

/* 面板标题 */
.ui-collapse-panel__header {
  display: flex;
  align-items: center;
  padding: var(--ui-collapse-panel-header-padding, 12px 16px);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.ui-collapse-panel__header:hover:not(.ui-collapse-panel--disabled) {
  background-color: var(--ui-collapse-header-hover-bg, var(--ui-color-bg-hover));
}

/* 标题图标 */
.ui-collapse-panel__icon {
  margin-right: 8px;
  font-size: var(--ui-collapse-icon-size, 16px);
}

/* 展开箭头 */
.ui-collapse-panel__arrow {
  font-size: var(--ui-collapse-arrow-size, 16px);
  margin-right: 8px;
  transition: transform 0.2s;
}

.ui-collapse-panel__arrow--expanded {
  transform: rotate(90deg);
}

/* 标题 */
.ui-collapse-panel__title {
  flex: 1;
  font-weight: var(--ui-collapse-title-font-weight, 500);
}

/* 额外内容 */
.ui-collapse-panel__extra {
  margin-left: 16px;
  color: var(--ui-color-text-secondary);
}

/* 内容区域 */
.ui-collapse-panel__content {
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.ui-collapse-panel__body {
  padding: var(--ui-collapse-content-padding, 16px);
}
</style>
