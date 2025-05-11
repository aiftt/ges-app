<script setup lang="ts" name="UiDropdownSubmenu">
import type { PropType } from 'vue'
import type { MenuItem } from './type'
/**
 * 下拉菜单子菜单组件
 * 创建日期: 2024-08-24
 * 作者: aiftt
 */
import { computed, inject, toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
})

// 定义向上提供的上下文类型
interface DropdownContext {
  handleMenuItemClick: (item: MenuItem) => void
  handleSubMenuMouseEnter: (key: string | number) => void
  handleSubMenuMouseLeave: () => void
  registerMenuItemRef: (key: string | number, el: Element | null) => void
  activeSubmenu: string | number | null
  activeIndex: number
  flattenedItems: MenuItem[]
  animationDuration: number
}

// 注入父组件提供的上下文
const dropdownContext = inject<DropdownContext>('dropdown-context', {
  handleMenuItemClick: () => {},
  handleSubMenuMouseEnter: () => {},
  handleSubMenuMouseLeave: () => {},
  registerMenuItemRef: () => {},
  activeSubmenu: null,
  activeIndex: -1,
  flattenedItems: [],
  animationDuration: 150,
})

const { item, level } = toRefs(props)
const isActive = computed(() => dropdownContext.activeSubmenu === item.value.key)
const isActiveItem = computed(() => {
  return dropdownContext.activeIndex >= 0
    && dropdownContext.flattenedItems[dropdownContext.activeIndex]?.key === item.value.key
})

function handleMouseEnter(): void {
  if (!item.value.disabled && item.value.children?.length) {
    dropdownContext.handleSubMenuMouseEnter(item.value.key)
  }
}
</script>

<template>
  <!-- 分割线 -->
  <li v-if="item.type === 'divider'" class="ui-dropdown-divider" role="separator" />

  <!-- 菜单项 -->
  <li
    v-else
    :key="item.key"
    :ref="el => dropdownContext.registerMenuItemRef(item.key, el as Element | null)"
    class="ui-dropdown-menu-item"
    :class="{
      'ui-dropdown-menu-item-disabled': item.disabled,
      'ui-dropdown-menu-item-danger': item.danger,
      'ui-dropdown-menu-item-active': isActiveItem,
      'ui-dropdown-menu-item-with-submenu': item.children?.length,
      [item.className || '']: item.className,
    }"
    role="menuitem"
    :aria-disabled="item.disabled"
    @mouseenter="handleMouseEnter"
    @mouseleave="dropdownContext.handleSubMenuMouseLeave"
    @click="!item.disabled && dropdownContext.handleMenuItemClick(item)"
  >
    <!-- 图标 -->
    <ui-icon
      v-if="item.icon"
      :icon="item.icon"
      class="ui-dropdown-menu-item-icon"
    />

    <!-- 标签 -->
    <span class="ui-dropdown-menu-item-label">{{ item.label }}</span>

    <!-- 子菜单图标 -->
    <ui-icon
      v-if="item.children?.length"
      icon="carbon:chevron-right"
      class="ui-dropdown-menu-item-arrow"
    />

    <!-- 子菜单 -->
    <div
      v-if="item.children?.length"
      class="ui-dropdown-submenu"
      :class="{ 'ui-dropdown-submenu-active': isActive }"
      :style="`--ui-dropdown-animation-duration: ${dropdownContext.animationDuration}ms`"
    >
      <ul class="ui-dropdown-menu-list" role="menu">
        <ui-dropdown-submenu
          v-for="child in item.children"
          :key="child.key"
          :item="child"
          :level="level + 1"
        />
      </ul>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.ui-dropdown {
  &-menu-item {
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    position: relative;
    color: var(--ui-color-text-primary, #333);

    &:hover {
      background-color: var(--ui-color-bg-hover, #f5f5f5);
    }

    &-active {
      background-color: var(--ui-color-bg-hover, #f5f5f5);
    }

    &-icon {
      margin-right: 8px;
    }

    &-label {
      flex: 1;
    }

    &-arrow {
      margin-left: 8px;
      font-size: 0.8em;
    }

    &-disabled {
      color: var(--ui-color-text-disabled, #ccc);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }

    &-danger {
      color: var(--ui-color-danger, #f44336);
    }

    &-with-submenu {
      position: relative;
    }
  }

  &-submenu {
    position: absolute;
    left: 100%;
    top: 0;
    min-width: 100px;
    background-color: var(--ui-color-bg-elevation, #fff);
    border-radius: 4px;
    box-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    padding: 4px 0;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--ui-dropdown-animation-duration, 150ms) ease,
      visibility var(--ui-dropdown-animation-duration, 150ms) ease;

    &-active {
      opacity: 1;
      visibility: visible;
    }
  }

  &-divider {
    height: 1px;
    margin: 4px 0;
    background-color: var(--ui-color-border, #eee);
  }
}
</style>
