<script setup lang="ts" name="UiDropdown">
import type { MenuItem } from './type'
/**
 * 下拉菜单组件
 * 创建日期: 2024-08-18
 * 作者: aiftt
 * 更新日期: 2024-08-23 - 修复显隐控制问题
 * 更新日期: 2024-08-24 - 参考Element Plus改进实现，添加递归子菜单、键盘导航
 */
import { nextTick, onMounted, onUnmounted, provide, reactive } from 'vue'

export type { MenuItem } from './type'

const props = withDefaults(defineProps<{
  /**
   * 菜单项配置
   */
  items?: MenuItem[]
  /**
   * 菜单的定位方式
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click' | 'contextmenu'
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否显示箭头
   */
  arrow?: boolean
  /**
   * 弹出延迟时间(毫秒)，hover模式时有效
   */
  showDelay?: number
  /**
   * 关闭延迟时间(毫秒)，hover模式时有效
   */
  hideDelay?: number
  /**
   * 是否可见
   */
  visible?: boolean
  /**
   * 自定义类名
   */
  popupClass?: string
  /**
   * 展开动画持续时间(毫秒)
   */
  animationDuration?: number
  /**
   * 自动关闭下拉菜单的延迟(毫秒)，如果为0，则不会自动关闭
   */
  autoClose?: number
  /**
   * 是否阻止点击事件冒泡
   */
  stopPropagation?: boolean
  /**
   * 是否阻止默认事件
   */
  preventDefault?: boolean
  /**
   * 是否启用键盘导航
   */
  keyboardNavigation?: boolean
}>(), {
  items: () => [],
  placement: 'bottom',
  trigger: 'hover',
  disabled: false,
  arrow: true,
  showDelay: 150,
  hideDelay: 150,
  visible: undefined,
  popupClass: '',
  animationDuration: 150,
  autoClose: 0,
  stopPropagation: false,
  preventDefault: false,
  keyboardNavigation: true,
})

// 事件
const emit = defineEmits<{
  (e: 'select', key: string | number, item: MenuItem): void
  (e: 'update:visible', visible: boolean): void
  (e: 'opened'): void
  (e: 'closed'): void
}>()

// 定义 v-model
const isVisible = defineModel<boolean>('visible', { default: undefined })

// 下拉菜单的引用
const dropdownRef = ref<HTMLElement | null>(null)
// 下拉菜单内容的引用
const dropdownContentRef = ref<HTMLElement | null>(null)
// 触发器元素引用
const triggerRef = ref<HTMLElement | null>(null)
// 菜单项引用集合
const menuItemsRef = ref<Map<string | number, HTMLElement>>(new Map())

// 下拉菜单状态
const state = reactive({
  visible: false,
  showTimer: null as NodeJS.Timeout | null,
  hideTimer: null as NodeJS.Timeout | null,
  closeTimer: null as NodeJS.Timeout | null,
  mouseInDropdown: false,
  mouseInTrigger: false,
  activeSubmenu: null as string | number | null,
  activeIndex: -1,
  flattenedItems: [] as MenuItem[],
})

// 处理v-model和props.visible的同步
function updateVisible(val: boolean) {
  state.visible = val
  isVisible.value = val
  emit('update:visible', val)
}

// 初始化可见性
onMounted(() => {
  // 优先使用v-model绑定值
  if (isVisible.value !== undefined) {
    state.visible = isVisible.value
  }
  // 其次使用props.visible
  else if (props.visible !== undefined) {
    state.visible = props.visible
  }
  // 都没有则默认为false
  else {
    state.visible = false
  }
})

// 扁平化菜单项，方便键盘导航
function flattenItems(items: MenuItem[], result: MenuItem[] = []): MenuItem[] {
  items.forEach((item) => {
    if (item.type !== 'divider') {
      result.push(item)
      if (item.children?.length) {
        flattenItems(item.children, result)
      }
    }
  })
  return result
}

watch(() => props.items, (items) => {
  state.flattenedItems = flattenItems(items || [])
}, { immediate: true, deep: true })

// 处理菜单点击事件
function handleMenuItemClick(item: MenuItem) {
  if (item.disabled)
    return

  emit('select', item.key, item)

  // 如果定义了点击回调，则执行
  if (typeof item.onClick === 'function') {
    item.onClick(item)
  }

  // 如果没有子菜单，则关闭dropdown
  if (!item.children?.length) {
    hideDropdown()
  }
}

// 显示下拉菜单
function showDropdown() {
  if (props.disabled)
    return

  clearTimers()

  if (props.trigger === 'hover') {
    state.showTimer = setTimeout(() => {
      updateVisible(true)
      emit('opened')
      startAutoCloseTimer()
    }, props.showDelay)
  }
  else {
    updateVisible(true)
    emit('opened')
    startAutoCloseTimer()
  }
}

// 启动自动关闭计时器
function startAutoCloseTimer() {
  if (props.autoClose > 0) {
    clearTimeout(state.closeTimer as NodeJS.Timeout)
    state.closeTimer = setTimeout(() => {
      hideDropdown()
    }, props.autoClose)
  }
}

// 隐藏下拉菜单
function hideDropdown() {
  clearTimers()

  if (props.trigger === 'hover' && (state.mouseInDropdown || state.mouseInTrigger)) {
    return
  }

  if (props.trigger === 'hover') {
    state.hideTimer = setTimeout(() => {
      updateVisible(false)
      emit('closed')
      state.activeSubmenu = null
      state.activeIndex = -1
    }, props.hideDelay)
  }
  else {
    updateVisible(false)
    emit('closed')
    state.activeSubmenu = null
    state.activeIndex = -1
  }
}

// 清除所有计时器
function clearTimers() {
  if (state.showTimer) {
    clearTimeout(state.showTimer)
    state.showTimer = null
  }
  if (state.hideTimer) {
    clearTimeout(state.hideTimer)
    state.hideTimer = null
  }
  if (state.closeTimer) {
    clearTimeout(state.closeTimer)
    state.closeTimer = null
  }
}

// 点击事件处理
function handleClick(e: MouseEvent) {
  if (props.stopPropagation) {
    e.stopPropagation()
  }
  if (props.preventDefault) {
    e.preventDefault()
  }

  if (props.disabled)
    return

  if (props.trigger === 'click') {
    if (!state.visible) {
      showDropdown()
    }
    else {
      hideDropdown()
    }
  }
}

// 右键点击事件处理
function handleContextMenu(e: MouseEvent) {
  if (props.stopPropagation) {
    e.stopPropagation()
  }
  if (props.preventDefault) {
    e.preventDefault()
  }

  if (props.disabled)
    return

  if (props.trigger === 'contextmenu') {
    if (!state.visible) {
      showDropdown()
    }
    else {
      hideDropdown()
    }
  }
}

// 鼠标事件处理
function handleMouseEnter() {
  state.mouseInTrigger = true
  if (props.trigger === 'hover') {
    showDropdown()
  }
}

function handleMouseLeave() {
  state.mouseInTrigger = false
  if (props.trigger === 'hover') {
    hideDropdown()
  }
}

// 下拉菜单鼠标事件
function handleDropdownMouseEnter() {
  state.mouseInDropdown = true
  if (props.trigger === 'hover') {
    showDropdown()
  }
}

function handleDropdownMouseLeave() {
  state.mouseInDropdown = false
  if (props.trigger === 'hover') {
    hideDropdown()
  }
}

// 子菜单鼠标事件处理
function handleSubMenuMouseEnter(key: string | number) {
  state.activeSubmenu = key
}

function handleSubMenuMouseLeave() {
  state.activeSubmenu = null
}

// 点击外部关闭
function handleClickOutside(event: MouseEvent) {
  if (props.trigger !== 'click' && props.trigger !== 'contextmenu')
    return

  const target = event.target as HTMLElement
  const triggerEl = triggerRef.value
  const dropdownEl = dropdownContentRef.value

  if (
    state.visible
    && triggerEl
    && dropdownEl
    && !triggerEl.contains(target)
    && !dropdownEl.contains(target)
  ) {
    hideDropdown()
  }
}

// 键盘导航
function handleKeyDown(e: KeyboardEvent) {
  if (!props.keyboardNavigation || !state.visible || state.flattenedItems.length === 0)
    return

  const currentIndex = state.activeIndex
  let nextIndex = currentIndex

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      nextIndex = currentIndex > 0 ? currentIndex - 1 : state.flattenedItems.length - 1
      break
    case 'ArrowDown':
      e.preventDefault()
      nextIndex = currentIndex < state.flattenedItems.length - 1 ? currentIndex + 1 : 0
      break
    case 'Enter':
      e.preventDefault()
      if (currentIndex >= 0) {
        const item = state.flattenedItems[currentIndex]
        if (!item.disabled) {
          handleMenuItemClick(item)
        }
      }
      break
    case 'Escape':
      e.preventDefault()
      hideDropdown()
      break
  }

  if (nextIndex !== currentIndex) {
    state.activeIndex = nextIndex
    const item = state.flattenedItems[nextIndex]
    const element = menuItemsRef.value.get(item.key)
    if (element) {
      nextTick(() => {
        element.scrollIntoView({ block: 'nearest' })
      })
    }
  }
}

// 监听可见性变化
watch(() => props.visible, (val) => {
  if (val !== undefined && val !== state.visible) {
    if (val)
      showDropdown()
    else hideDropdown()
  }
})

watch(() => isVisible.value, (val) => {
  if (val !== undefined && val !== state.visible) {
    if (val)
      showDropdown()
    else hideDropdown()
  }
})

// 设置事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (props.keyboardNavigation) {
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (props.keyboardNavigation) {
    document.removeEventListener('keydown', handleKeyDown)
  }
  clearTimers()
})

// 计算触发器元素的 class
const triggerClass = computed(() => [
  'ui-dropdown-trigger',
  { 'ui-dropdown-trigger-disabled': props.disabled },
])

// 注册菜单项引用
function registerMenuItemRef(key: string | number, el: HTMLElement | null) {
  if (el) {
    menuItemsRef.value.set(key, el)
  }
  else {
    menuItemsRef.value.delete(key)
  }
}

// 提供上下文给子菜单组件
provide('dropdown-context', {
  handleMenuItemClick,
  handleSubMenuMouseEnter,
  handleSubMenuMouseLeave,
  registerMenuItemRef,
  activeSubmenu: state.activeSubmenu,
  activeIndex: state.activeIndex,
  flattenedItems: state.flattenedItems,
  animationDuration: props.animationDuration,
})
</script>

<template>
  <div
    class="ui-dropdown"
    :class="{ 'ui-dropdown-disabled': disabled }"
  >
    <!-- 触发元素 -->
    <div
      ref="triggerRef"
      :class="triggerClass"
      @click="handleClick"
      @contextmenu="handleContextMenu"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>

    <!-- 下拉菜单 -->
    <ui-trigger
      ref="dropdownRef"
      :visible="state.visible"
      :placement="placement"
      :arrow="arrow"
      :transition-props="{ duration: animationDuration }"
      :popup-class="`ui-dropdown-menu ${popupClass}`"
      @mouseenter="handleDropdownMouseEnter"
      @mouseleave="handleDropdownMouseLeave"
    >
      <template #default>
        <div
          ref="dropdownContentRef"
          class="ui-dropdown-content"
          :style="`--ui-dropdown-animation-duration: ${animationDuration}ms`"
          tabindex="-1"
        >
          <slot name="content">
            <ul class="ui-dropdown-menu-list" role="menu">
              <template v-for="(item, index) in items" :key="item.key || index">
                <ui-dropdown-submenu :item="item" :level="0" />
              </template>
            </ul>
          </slot>
        </div>
      </template>
    </ui-trigger>
  </div>
</template>

<style lang="scss" scoped>
.ui-dropdown {
  display: inline-flex;
  position: relative;

  &-trigger {
    cursor: pointer;
    display: inline-flex;

    &-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &-disabled {
    cursor: not-allowed;
  }

  &-content {
    min-width: 100px;
    background-color: var(--ui-color-bg-elevation, #fff);
    border-radius: 4px;
    box-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    padding: 4px 0;
    outline: none;
  }

  &-menu {
    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
