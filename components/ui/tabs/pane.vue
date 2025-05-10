<script setup lang="ts" name="UiTabsPane">
/**
 * 标签页面板组件
 * 创建日期: 2024-08-03
 * 作者: aiftt
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 标签页名称，作为唯一标识符
   */
  name: string | number
  /**
   * 标签页显示的标题
   */
  label: string
  /**
   * 标签页图标
   */
  icon?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否可关闭
   */
  closable?: boolean
  /**
   * 标签页自定义样式
   */
  tabStyle?: Record<string, any>
  /**
   * 标签页内容自定义样式
   */
  contentStyle?: Record<string, any>
  /**
   * 是否懒加载
   */
  lazy?: boolean
  /**
   * 自定义标签内容插槽名称
   */
  titleSlot?: string
}>(), {
  disabled: false,
  lazy: false,
})

// 从父组件注入上下文
const tabs = inject('tabs', null)
const activeTab = computed(() => tabs?.activeTab)

// 是否为当前激活的面板
const isActive = computed(() => activeTab.value === props.name)

// 是否已经渲染过（用于懒加载）
const hasRendered = ref(!props.lazy)

// 监听激活状态
watch(isActive, (val) => {
  if (val && props.lazy) {
    hasRendered.value = true
  }
})

// 当组件挂载时注册到tabs
onMounted(() => {
  if (tabs && typeof tabs.registerPane === 'function') {
    tabs.registerPane({
      name: props.name,
      label: props.label,
      icon: props.icon,
      disabled: props.disabled,
      closable: props.closable,
      tabStyle: props.tabStyle,
      contentStyle: props.contentStyle,
      titleSlot: props.titleSlot,
    })
  }
})

// 当组件卸载时从tabs注销
onBeforeUnmount(() => {
  if (tabs && typeof tabs.unregisterPane === 'function') {
    tabs.unregisterPane(props.name)
  }
})
</script>

<template>
  <div
    v-show="isActive"
    class="ui-tabs-pane"
    :style="contentStyle"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot v-if="hasRendered || isActive" />
  </div>
</template>

<style scoped>
.ui-tabs-pane {
  width: 100%;
}
</style>
