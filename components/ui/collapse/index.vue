<script setup lang="ts" name="UiCollapse">
/**
 * Collapse 折叠面板组件
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-08-20 - 添加对active-panels的支持
 */

import { computed, provide, ref, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 当前激活的面板，手风琴模式下为string，非手风琴模式下为string[]
   */
  modelValue?: string | string[]
  /**
   * 当前激活的面板，支持对象数组形式
   */
  activePanels?: Array<{ id: string | number, active?: boolean, title?: string }>
  /**
   * 是否开启手风琴模式（只允许单个面板展开）
   */
  accordion?: boolean
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 自定义展开图标
   */
  expandIcon?: string
  /**
   * 图标位置
   */
  iconPosition?: 'left' | 'right'
  /**
   * 是否显示箭头
   */
  showArrow?: boolean
  /**
   * 是否为简洁模式
   */
  simple?: boolean
  /**
   * 自定义样式
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  textColor?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
}>(), {
  modelValue: () => [],
  activePanels: () => [],
  accordion: false,
  bordered: true,
  iconPosition: 'left',
  showArrow: true,
  simple: false,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
  (e: 'update:activePanels', value: Array<{ id: string | number, active?: boolean, title?: string }>): void
  (e: 'change', value: string | string[]): void
}>()

// 计算CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const borderColorVar = computed(() => props.borderColor || null)

// 内部激活的面板数组
const activeItems = ref<string[]>(Array.isArray(props.modelValue)
  ? [...props.modelValue]
  : props.modelValue ? [props.modelValue] : [])

// 更新激活状态 - 传统方式
function updateActiveItems(name: string) {
  if (props.accordion) {
    // 手风琴模式，只保留一个激活项
    const newActive = activeItems.value.includes(name) ? [] : [name]
    activeItems.value = newActive
    emit('update:modelValue', newActive[0] || '')
    emit('change', newActive[0] || '')
  }
  else {
    // 多面板模式
    const newActive = [...activeItems.value]
    const index = newActive.indexOf(name)
    if (index > -1) {
      newActive.splice(index, 1)
    }
    else {
      newActive.push(name)
    }
    activeItems.value = newActive
    emit('update:modelValue', newActive)
    emit('change', newActive)
  }
}

// 更新面板状态 - 对象数组方式
function updateActivePanel(id: string | number, active: boolean) {
  if (!props.activePanels)
    return

  const newPanels = [...props.activePanels]
  const index = newPanels.findIndex(panel => panel.id === id)

  if (index > -1) {
    if (props.accordion && active) {
      // 手风琴模式，关闭其他面板
      newPanels.forEach((panel, i) => {
        if (i !== index) {
          panel.active = false
        }
      })
    }
    newPanels[index].active = active
  }

  emit('update:activePanels', newPanels)
}

// 监听props变化
watch(() => props.modelValue, (newVal) => {
  activeItems.value = Array.isArray(newVal) ? [...newVal] : newVal ? [newVal] : []
}, { deep: true })

// 提供给子组件的上下文
provide('collapseContext', {
  activeItems,
  updateActiveItems,
  updateActivePanel,
  accordion: computed(() => props.accordion),
  expandIcon: computed(() => props.expandIcon),
  iconPosition: computed(() => props.iconPosition),
  showArrow: computed(() => props.showArrow),
  simple: computed(() => props.simple),
})
</script>

<template>
  <div
    class="ui-collapse"
    :class="[
      { 'ui-collapse--bordered': bordered && !simple },
      { 'ui-collapse--simple': simple },
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.ui-collapse {
  /* 动态变量绑定 */
  --ui-collapse-bg-color: v-bind(bgColorVar);
  --ui-collapse-text-color: v-bind(textColorVar);
  --ui-collapse-border-color: v-bind(borderColorVar);

  width: 100%;
  background-color: var(--ui-collapse-bg-color, var(--ui-collapse-bg, var(--ui-color-bg)));
  color: var(--ui-collapse-text-color, var(--ui-collapse-color, var(--ui-color-text)));
  border-radius: var(--ui-collapse-border-radius, 4px);
  overflow: hidden;
}

.ui-collapse--bordered {
  border: 1px solid var(--ui-collapse-border-color, var(--ui-collapse-border, var(--ui-border-color)));
}

.ui-collapse--simple {
  background-color: transparent;
  border: none;
  overflow: visible;
}
</style>
