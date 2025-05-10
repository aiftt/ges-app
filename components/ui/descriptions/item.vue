<script setup lang="ts" name="UiDescriptionsItem">
/**
 * 描述列表项组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-08-01 - 修复渲染问题，增强span属性支持
 */

const _props = defineProps<{
  /**
   * 标签
   */
  label?: string
  /**
   * 跨度，默认为1
   */
  span?: number
  /**
   * 标签样式
   */
  labelStyle?: Record<string, string>
  /**
   * 内容样式
   */
  contentStyle?: Record<string, string>
}>()

// 注入描述列表上下文
const _descriptionsContext = inject('descriptions', {
  bordered: false,
  layout: 'horizontal',
  colon: true,
  column: 3,
  labelStyle: {},
  contentStyle: {},
  labelAlign: 'left',
  contentAlign: 'left',
})

// 注意：合并样式的逻辑移至父组件中处理，这里只是为了提供类型支持
</script>

<template>
  <slot />
</template>
