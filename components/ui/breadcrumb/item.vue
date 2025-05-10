<script setup lang="ts" name="UiBreadcrumbItem">
/**
 * 面包屑项组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 */

import { computed, inject, onMounted, ref } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 面包屑导航链接
   */
  to?: string
  /**
   * 面包屑项是否禁用
   */
  disabled?: boolean
  /**
   * 面包屑图标
   */
  icon?: string
  /**
   * 是否替换当前历史记录
   */
  replace?: boolean
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  to: '',
  disabled: false,
  icon: '',
  replace: false,
  class: '',
})

// 注入来自 Breadcrumb 的上下文
interface BreadcrumbContext {
  separator: () => string
  separatorIcon: () => string
}

const breadcrumb = inject<{
  separator: BreadcrumbContext['separator']
  separatorIcon: BreadcrumbContext['separatorIcon']
}>('breadcrumb', {
  separator: () => '/',
  separatorIcon: () => '',
})

// 使用ref保存元素引用
const itemRef = ref<HTMLLIElement | null>(null)
const isLast = ref(false)

// 挂载后确定是否为最后一个元素
onMounted(() => {
  if (itemRef.value) {
    const parentNode = itemRef.value.parentNode
    if (parentNode) {
      const children = Array.from(parentNode.children)
      isLast.value = children.indexOf(itemRef.value) === children.length - 1
    }
  }
})

// 计算是否应该是链接
const isLink = computed(() => props.to && !props.disabled && !isLast.value)

// 面包屑项类名
const itemClass = computed(() => {
  const classes = ['ui-breadcrumb__item']

  if (isLast.value) {
    classes.push('ui-breadcrumb__item--active')
  }

  if (props.disabled) {
    classes.push('ui-breadcrumb__item--disabled')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <li ref="itemRef" :class="itemClass">
    <!-- 链接形式 -->
    <nuxt-link
      v-if="isLink"
      :to="to"
      :replace="replace"
      class="ui-breadcrumb__link"
    >
      <ui-icon
        v-if="icon"
        :icon="icon"
        class="ui-breadcrumb__icon"
      />
      <slot />
    </nuxt-link>

    <!-- 非链接形式 -->
    <span v-else class="ui-breadcrumb__link">
      <ui-icon
        v-if="icon"
        :icon="icon"
        class="ui-breadcrumb__icon"
      />
      <slot />
    </span>

    <!-- 分隔符 -->
    <span
      v-if="!isLast"
      class="ui-breadcrumb__separator"
    >
      <ui-icon
        v-if="breadcrumb.separatorIcon()"
        :icon="breadcrumb.separatorIcon()"
        class="ui-breadcrumb__separator-icon"
      />
      <template v-else>{{ breadcrumb.separator() }}</template>
    </span>
  </li>
</template>

<style lang="scss" scoped>
/* 样式由父组件 breadcrumb/index.vue 提供 */
</style>
