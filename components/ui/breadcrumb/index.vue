<script setup lang="ts" name="UiBreadcrumb">
/**
 * 面包屑导航组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 *
 * 显示当前页面在系统层级结构中的位置，并能向上返回
 */

import { computed, provide } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 分隔符
   */
  separator?: string
  /**
   * 分隔符图标，优先级高于separator
   */
  separatorIcon?: string
  /**
   * 路由模式下是否将第一个面包屑项始终渲染为 "首页"
   */
  showHome?: boolean
  /**
   * 首页文本
   */
  homeText?: string
  /**
   * 首页链接
   */
  homeLink?: string
  /**
   * 首页图标
   */
  homeIcon?: string
  /**
   * 面包屑最大宽度
   */
  maxWidth?: string
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 是否折叠过长的面包屑
   */
  collapsible?: boolean
  /**
   * 折叠时显示的最大项数
   */
  maxItems?: number
  /**
   * 以路由的方式配置面包屑
   */
  routes?: Array<{
    path: string
    name: string
    icon?: string
    disabled?: boolean
  }>
}>(), {
  separator: '/',
  separatorIcon: '',
  showHome: false,
  homeText: '首页',
  homeLink: '/',
  homeIcon: 'home',
  maxWidth: '',
  class: '',
  collapsible: false,
  maxItems: 5,
  routes: () => [],
})

// 提供上下文给BreadcrumbItem组件
provide('breadcrumb', {
  separator: () => props.separator,
  separatorIcon: () => props.separatorIcon,
})

// 样式变量
const maxWidthVar = computed(() => props.maxWidth || null)

// 计算类名
const breadcrumbClass = computed(() => {
  const classes = ['ui-breadcrumb']

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 处理路由面包屑数据
const routeItems = computed(() => {
  const items = [...props.routes]

  if (props.showHome && (items.length === 0 || items[0]?.path !== props.homeLink)) {
    items.unshift({
      path: props.homeLink,
      name: props.homeText,
      icon: props.homeIcon,
    })
  }

  return items
})

// 计算显示的面包屑项
const displayItems = computed(() => {
  if (!props.collapsible || routeItems.value.length <= props.maxItems) {
    return routeItems.value
  }

  // 如果需要折叠，保留第一项和最后 maxItems-2 项，中间显示省略号
  const firstItem = routeItems.value[0]
  const lastItems = routeItems.value.slice(-1 * (props.maxItems - 1))

  return [firstItem, { path: '', name: '...', disabled: true }, ...lastItems]
})
</script>

<template>
  <div :class="breadcrumbClass" class="ui-breadcrumb--custom-style">
    <!-- 使用配置的路由显示面包屑 -->
    <template v-if="routes && routes.length > 0">
      <ol class="ui-breadcrumb__list">
        <li
          v-for="(item, index) in displayItems"
          :key="index"
          class="ui-breadcrumb__item"
          :class="{
            'ui-breadcrumb__item--active': index === displayItems.length - 1,
            'ui-breadcrumb__item--disabled': item.disabled,
          }"
        >
          <!-- 面包屑项 -->
          <component
            :is="index === displayItems.length - 1 || item.disabled ? 'span' : 'nuxt-link'"
            :to="item.path"
            class="ui-breadcrumb__link"
          >
            <ui-icon
              v-if="item.icon"
              :icon="item.icon"
              class="ui-breadcrumb__icon"
            />
            <span>{{ item.name }}</span>
          </component>

          <!-- 分隔符 -->
          <span
            v-if="index < displayItems.length - 1"
            class="ui-breadcrumb__separator"
          >
            <ui-icon
              v-if="separatorIcon"
              :icon="separatorIcon"
              class="ui-breadcrumb__separator-icon"
            />
            <template v-else>{{ separator }}</template>
          </span>
        </li>
      </ol>
    </template>

    <!-- 插槽方式定义面包屑 -->
    <template v-else>
      <ol class="ui-breadcrumb__list">
        <slot />
      </ol>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ui-breadcrumb {
  font-size: 14px;
  line-height: 1.5;
  color: var(--ui-color-text-secondary, #6b7280);

  &--custom-style {
    --ui-breadcrumb-max-width: v-bind(maxWidthVar);
    max-width: var(--ui-breadcrumb-max-width, none);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;

    &--active {
      color: var(--ui-color-text-primary, #111827);
      font-weight: 500;

      .ui-breadcrumb__link {
        cursor: default;

        &:hover {
          color: var(--ui-color-text-primary, #111827);
          text-decoration: none;
        }
      }
    }

    &--disabled {
      color: var(--ui-color-text-disabled, #9ca3af);
      cursor: not-allowed;

      .ui-breadcrumb__link {
        cursor: not-allowed;

        &:hover {
          color: var(--ui-color-text-disabled, #9ca3af);
          text-decoration: none;
        }
      }
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--ui-color-primary, #3b82f6);
      text-decoration: underline;
    }
  }

  &__icon {
    margin-right: 4px;
    font-size: 14px;
  }

  &__separator {
    display: flex;
    align-items: center;
    margin: 0 8px;
    color: var(--ui-color-text-secondary, #6b7280);

    &-icon {
      font-size: 12px;
    }
  }
}
</style>
