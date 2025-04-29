<script setup lang="ts" name="UiMenuSubmenu">
/**
 * 子菜单组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复样式方式，符合项目规范
 * 更新日期: 2023-12-05 - 修复保留关键字prop问题
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 唯一标识符
   */
  itemKey?: string
  /**
   * 菜单项标题
   */
  title?: string
  /**
   * 菜单项图标
   */
  icon?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 弹出位置（仅在horizontal模式生效）
   */
  popupPlacement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
  /**
   * 自定义类名
   */
  className?: string
}>(), {
  itemKey: '',
  title: '',
  icon: '',
  disabled: false,
  popupPlacement: 'bottomLeft',
  className: '',
})

// 注入菜单状态和方法
const menuState = inject('menuState', reactive({
  selectedKey: '',
  openKeys: [] as string[],
}))

const menuProps = inject('menuProps', reactive({
  mode: 'vertical',
  theme: 'light',
  collapsed: false,
  inlineIndent: 24,
  triggerSubMenuAction: 'hover',
}))

// 获取父级SubMenu的层级并提供给子组件
const parentLevel = inject('subMenuLevel', 1)
provide('subMenuLevel', parentLevel + 1)

// 计算当前子菜单是否打开
const isOpen = computed(() => {
  return menuState.openKeys.includes(props.itemKey)
})

// 子菜单触发方式
const isHoverMode = computed(() => {
  return menuProps.triggerSubMenuAction === 'hover'
})

// 处理切换子菜单展开/收起状态
const handleToggleOpen = inject('handleToggleOpen', (_: string) => {}) as (itemKey: string) => void

// 点击标题触发展开/收起
function handleTitleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (menuProps.mode === 'inline' || !isHoverMode.value) {
    handleToggleOpen(props.itemKey)
  }

  // 阻止冒泡，避免触发父级菜单的事件
  event.stopPropagation()
}

// 悬停交互
const hoverTimer = ref<number | null>(null)

function handleMouseEnter() {
  if (props.disabled || !isHoverMode.value)
    return

  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  hoverTimer.value = setTimeout(() => {
    if (!isOpen.value) {
      handleToggleOpen(props.itemKey)
    }
  }, 100) as unknown as number
}

function handleMouseLeave() {
  if (props.disabled || !isHoverMode.value)
    return

  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  hoverTimer.value = setTimeout(() => {
    if (isOpen.value) {
      handleToggleOpen(props.itemKey)
    }
  }, 100) as unknown as number
}

// 计算子菜单类名
const submenuClass = computed(() => {
  return [
    'ui-submenu',
    {
      'ui-submenu-open': isOpen.value,
      'ui-submenu-disabled': props.disabled,
    },
    props.className,
  ]
})

// 计算缩进类名
const paddingClass = computed(() => {
  if (menuProps.mode === 'vertical' && !menuProps.collapsed) {
    return `pl-${parentLevel * menuProps.inlineIndent / 4}`
  }
  return ''
})
// 处理子菜单内容过渡动画
function beforeEnter(el: HTMLElement) {
  el.classList.add('ui-submenu-enter')
}

function enter(el: HTMLElement) {
  // 获取内容高度
  const contentHeight = el.scrollHeight

  // 使用自定义属性存储内容高度
  el.style.setProperty('--ui-submenu-content-height', `${contentHeight}px`)

  // 添加激活类名
  el.classList.add('ui-submenu-enter-active')

  // 添加结束类名（下一帧）
  requestAnimationFrame(() => {
    el.classList.remove('ui-submenu-enter')
    el.classList.add('ui-submenu-enter-to')
  })
}

function afterEnter(el: HTMLElement) {
  // 移除所有过渡相关类名
  el.classList.remove('ui-submenu-enter-active', 'ui-submenu-enter-to')
}

function beforeLeave(el: HTMLElement) {
  // 获取内容高度
  const contentHeight = el.scrollHeight

  // 使用自定义属性存储内容高度
  el.style.setProperty('--ui-submenu-content-height', `${contentHeight}px`)

  el.classList.add('ui-submenu-leave')
}

function leave(el: HTMLElement) {
  el.classList.add('ui-submenu-leave-active')

  // 添加结束类名（下一帧）
  requestAnimationFrame(() => {
    el.classList.remove('ui-submenu-leave')
    el.classList.add('ui-submenu-leave-to')
  })
}

function afterLeave(el: HTMLElement) {
  // 移除所有过渡相关类名
  el.classList.remove('ui-submenu-leave-active', 'ui-submenu-leave-to')
}
</script>

<template>
  <li
    class="ui-submenu relative list-none"
    :class="submenuClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 子菜单标题 -->
    <div
      class="ui-submenu-title relative h-40px flex cursor-pointer items-center justify-between px-20px leading-40px transition-all"
      :class="paddingClass"
      @click="handleTitleClick"
    >
      <div class="ui-submenu-title-content flex items-center">
        <ui-icon v-if="icon" :icon="icon" class="ui-submenu-icon mr-10px h-14px w-14px" />
        <span v-if="!menuProps.collapsed || menuProps.mode !== 'vertical'" class="ui-submenu-label transition-opacity">{{ title }}</span>
      </div>
      <ui-icon
        v-if="!menuProps.collapsed || menuProps.mode !== 'vertical'"
        :icon="menuProps.mode === 'horizontal' ? 'carbon:chevron-down' : 'carbon:chevron-right'"
        class="ui-submenu-arrow absolute right-16px text-10px transition-transform"
        :class="{ 'ui-submenu-arrow-active': isOpen }"
      />
    </div>

    <!-- 子菜单内容 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <ul v-show="isOpen" class="ui-submenu-content m-0 list-none p-0 transition-all">
        <slot />
      </ul>
    </transition>
  </li>
</template>

<style scoped>
/* 悬停状态 */
.ui-submenu-title:hover {
  color: var(--ui-menu-active-color, #1890ff);
  background-color: var(--ui-menu-hover-color, rgba(0, 0, 0, 0.04));
}

:deep(.ui-menu-dark) .ui-submenu-title:hover {
  color: var(--ui-menu-dark-active-color, #fff);
  background-color: var(--ui-menu-dark-hover-color, rgba(255, 255, 255, 0.08));
}

/* 展开状态 */
.ui-submenu-open > .ui-submenu-title {
  color: var(--ui-menu-active-color, #1890ff);
}

:deep(.ui-menu-dark) .ui-submenu-open > .ui-submenu-title {
  color: var(--ui-menu-dark-active-color, #fff);
}

/* 禁用状态 */
.ui-submenu-disabled > .ui-submenu-title {
  color: var(--ui-disabled-color, rgba(0, 0, 0, 0.25)) !important;
  background: none !important;
  cursor: not-allowed;
}

:deep(.ui-menu-dark) .ui-submenu-disabled > .ui-submenu-title {
  color: var(--ui-disabled-dark-color, rgba(255, 255, 255, 0.35)) !important;
}

/* 箭头旋转状态 */
.ui-submenu-arrow-active {
  transform: rotate(90deg);
}

:deep(.ui-menu-horizontal) .ui-submenu-arrow-active {
  transform: rotate(180deg);
}

/* 水平模式 */
:deep(.ui-menu-horizontal) .ui-submenu {
  position: relative;
  display: inline-block;
  margin-right: 8px;
  vertical-align: bottom;
}

:deep(.ui-menu-horizontal) .ui-submenu-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  margin-top: 4px;
  padding: 5px 0;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  background: var(--ui-menu-bg-color, #fff);
  z-index: 1000;
}

:deep(.ui-menu-horizontal.ui-menu-dark) .ui-submenu-content {
  background: var(--ui-menu-dark-bg-color, #001529);
}

/* 垂直模式折叠状态 */
:deep(.ui-menu-vertical.ui-menu-collapsed) .ui-submenu {
  position: relative;
}

:deep(.ui-menu-vertical.ui-menu-collapsed) .ui-submenu > .ui-submenu-title {
  padding: 0 calc((46px - 14px) / 2);
  text-align: center;
}

:deep(.ui-menu-vertical.ui-menu-collapsed) .ui-submenu-content {
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 160px;
  margin-left: 4px;
  padding: 5px 0;
  border-radius: 4px;
  background: var(--ui-menu-bg-color, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

:deep(.ui-menu-vertical.ui-menu-collapsed.ui-menu-dark) .ui-submenu-content {
  background: var(--ui-menu-dark-bg-color, #001529);
}

/* 过渡动画样式 */
.ui-submenu-enter {
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.ui-submenu-enter-active {
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
  height: var(--ui-submenu-content-height);
  opacity: 1;
  overflow: hidden;
}

.ui-submenu-enter-to {
  height: var(--ui-submenu-content-height);
  opacity: 1;
}

.ui-submenu-leave {
  height: var(--ui-submenu-content-height);
  opacity: 1;
  overflow: hidden;
}

.ui-submenu-leave-active {
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.ui-submenu-leave-to {
  height: 0;
  opacity: 0;
}
</style>
