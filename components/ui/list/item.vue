<script setup lang="ts" name="UiListItem">
/**
 * 列表项组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-07-29
 */

const props = withDefaults(defineProps<{
  /**
   * 列表项内容
   */
  content?: string
  /**
   * 列表项标题
   */
  title?: string
  /**
   * 列表项描述
   */
  description?: string
  /**
   * 列表项前缀
   */
  prefix?: string
  /**
   * 列表项后缀
   */
  suffix?: string
  /**
   * 列表项图标
   */
  icon?: string
  /**
   * 列表项图片
   */
  image?: string
  /**
   * 列表项操作列表
   */
  actions?: Array<{
    label: string
    icon?: string
    onClick?: () => void
  }>
  /**
   * 列表项点击事件
   */
  onClick?: () => void
  /**
   * 列表项是否可点击
   */
  clickable?: boolean
  /**
   * 列表项是否选中
   */
  selected?: boolean
  /**
   * 列表项是否禁用
   */
  disabled?: boolean
}>(), {
  clickable: false,
  selected: false,
  disabled: false,
  actions: () => [],
})

// 计算列表项类名
const itemClass = computed(() => {
  const classes = ['ui-list-item']

  if (props.clickable) {
    classes.push('ui-list-item--clickable')
  }

  if (props.selected) {
    classes.push('ui-list-item--selected')
  }

  if (props.disabled) {
    classes.push('ui-list-item--disabled')
  }

  return classes.join(' ')
})

// 列表项点击处理
function handleClick() {
  if (props.disabled)
    return
  if (props.onClick)
    props.onClick()
}
</script>

<template>
  <li :class="itemClass" @click="handleClick">
    <!-- 前缀区域 -->
    <div v-if="$slots.prefix || prefix || icon || image" class="ui-list-item-prefix">
      <slot name="prefix">
        <ui-icon v-if="icon" :icon="icon" class="ui-list-item-icon" />
        <img v-else-if="image" :src="image" alt="Item image" class="ui-list-item-image">
        <span v-else>{{ prefix }}</span>
      </slot>
    </div>

    <!-- 内容区域 -->
    <div class="ui-list-item-content">
      <slot>
        <div v-if="title" class="ui-list-item-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="description" class="ui-list-item-description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
        <div v-if="content" class="ui-list-item-text">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </slot>
    </div>

    <!-- 后缀区域 -->
    <div v-if="$slots.suffix || suffix" class="ui-list-item-suffix">
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </div>

    <!-- 操作区域 -->
    <div v-if="actions && actions.length" class="ui-list-item-actions">
      <slot name="actions">
        <div v-for="(action, index) in actions" :key="index" class="ui-list-item-action" @click.stop="action.onClick && action.onClick()">
          <ui-icon v-if="action.icon" :icon="action.icon" class="mr-1" />
          <span>{{ action.label }}</span>
        </div>
      </slot>
    </div>
  </li>
</template>

<style scoped>
.ui-list-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  position: relative;
}

.ui-list-item--clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.ui-list-item--clickable:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-list-item--selected {
  background-color: var(--ui-color-bg-selected, #ebf5ff);
}

.ui-list-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-list-item-prefix {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-list-item-icon {
  font-size: 20px;
  color: var(--ui-color-text-light, #6b7280);
}

.ui-list-item-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--ui-border-radius, 0.375rem);
}

.ui-list-item-content {
  flex: 1;
  min-width: 0;
}

.ui-list-item-title {
  font-weight: 500;
  color: var(--ui-color-text, #374151);
  margin-bottom: 4px;
}

.ui-list-item-description {
  font-size: 0.875rem;
  color: var(--ui-color-text-light, #6b7280);
  margin-bottom: 4px;
}

.ui-list-item-text {
  color: var(--ui-color-text, #374151);
}

.ui-list-item-suffix {
  margin-left: 12px;
  color: var(--ui-color-text-light, #6b7280);
}

.ui-list-item-actions {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.ui-list-item-action {
  display: flex;
  align-items: center;
  color: var(--ui-color-primary, #3b82f6);
  padding: 0 8px;
  font-size: 0.875rem;
  cursor: pointer;
}

.ui-list-item-action:not(:last-child) {
  border-right: 1px solid var(--ui-border-color, #e5e7eb);
}

:root.dark .ui-list-item--clickable:hover {
  background-color: var(--ui-color-bg-hover-dark, #2d3748);
}

:root.dark .ui-list-item--selected {
  background-color: var(--ui-color-bg-selected-dark, #1e3a8a);
}

:root.dark .ui-list-item-title {
  color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-list-item-description {
  color: var(--ui-color-text-light-dark, #9ca3af);
}

:root.dark .ui-list-item-text {
  color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-list-item-suffix {
  color: var(--ui-color-text-light-dark, #9ca3af);
}

:root.dark .ui-list-item-action:not(:last-child) {
  border-right-color: var(--ui-border-color-dark, #374151);
}
</style>
