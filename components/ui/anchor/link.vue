<script setup lang="ts" name="UiAnchorLink">
/**
 * Anchor Link 锚点链接组件
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19
 */

import { inject, onBeforeUnmount, onMounted, ref } from 'vue'

// 定义属性
const props = withDefaults(defineProps<{
  /**
   * 锚点链接
   */
  href: string
  /**
   * 链接标题
   */
  title?: string
  /**
   * 自定义类名
   */
  customClass?: string
}>(), {
  title: '',
  customClass: '',
})

// 事件定义
const emit = defineEmits<{
  (e: 'click', evt: Event): void
}>()

// 注入父组件提供的属性与方法
const activeLink = inject<Ref<string>>('activeLink', ref(''))
const registerLink = inject<(hash: string, element: HTMLElement) => void>('registerLink', () => {})
const unregisterLink = inject<(hash: string) => void>('unregisterLink', () => {})
const scrollToHash = inject<(hash: string) => Promise<void>>('scrollToHash', () => Promise.resolve())
const activeClass = inject<string>('activeClass', '')

// 元素引用
const linkRef = ref<HTMLAnchorElement | null>(null)

// 处理点击事件
function handleClick(e: Event) {
  e.preventDefault()
  emit('click', e)
  scrollToHash(props.href)
}

// 注册和注销链接
onMounted(() => {
  if (linkRef.value) {
    registerLink(props.href, linkRef.value)
  }
})

onBeforeUnmount(() => {
  unregisterLink(props.href)
})
</script>

<template>
  <li class="ui-anchor-link" :class="customClass">
    <a
      ref="linkRef"
      :href="href"
      :title="title"
      class="ui-anchor-link-text" :class="[
        activeLink === href ? 'ui-anchor-link-active' : '',
        activeLink === href && activeClass ? activeClass : '',
      ]"
      @click="handleClick"
    >
      <slot>{{ title }}</slot>
    </a>
    <ul v-if="$slots.default" class="ui-anchor-link-children">
      <slot />
    </ul>
  </li>
</template>
