<script setup lang="ts" name="UiMenuSubmenu">
import type { IMenuContext } from '~/utils/inject-keys'
/**
 * 子菜单组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复样式方式，符合项目规范
 * 更新日期: 2023-12-05 - 修复保留关键字prop问题
 * 更新日期: 2025-05-05 - 改用 CSS 变量 + v-bind 方式实现动态样式
 * 更新日期: 2024-08-27 - 使用inject-keys，优化组件实现，增强SSR兼容性
 * 更新日期: 2024-08-29 - 修复TypeScript类型错误，优化内容显示逻辑
 * 更新日期: 2024-08-30 - 添加折叠状态下的悬浮子菜单和路由支持
 */
import { MENU_INJECTION_KEY } from '~/utils/inject-keys'

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
  /**
   * 路由地址（当子菜单也可以点击跳转时使用）
   */
  to?: string
}>(), {
  itemKey: '',
  title: '',
  icon: '',
  disabled: false,
  popupPlacement: 'bottomLeft',
  className: '',
  to: '',
})

// 获取菜单上下文
const menuContext = inject<IMenuContext>(MENU_INJECTION_KEY, {
  state: {
    selectedKey: '',
    openKeys: [],
  },
  props: {
    mode: ref('vertical'),
    theme: ref('light'),
    collapsed: ref(false),
    inlineIndent: ref(24),
    trigger: ref('hover'),
    itemSpacing: ref(8),
    popupPlacement: ref('right'),
  },
  router: false,
  handleSelect: () => {},
  handleToggleOpen: () => {},
})

// 解构菜单状态和方法
const { state: menuState, props: menuProps, handleToggleOpen, handleSelect, router: isRouterMode } = menuContext

// 获取父级SubMenu的层级并提供给子组件
const parentLevel = inject('subMenuLevel', 1)
provide('subMenuLevel', parentLevel + 1)

// 计算当前子菜单是否打开
const isOpen = computed(() => {
  return menuState.openKeys.includes(props.itemKey)
})

// 判断当前菜单是否处于折叠状态
const isCollapsed = computed(() => {
  return menuProps.collapsed.value && menuProps.mode.value === 'vertical'
})

// 判断是否处于悬浮菜单模式
const isPopupMode = computed(() => {
  // 水平模式或折叠状态下的垂直模式
  return menuProps.mode.value === 'horizontal' || isCollapsed.value
})

// 子菜单触发方式
const isHoverMode = computed(() => {
  return menuProps.trigger.value === 'hover'
})

// 点击标题触发展开/收起或路由跳转
function handleTitleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  // 如果有to属性并且启用了路由模式，则进行路由跳转
  if (props.to && isRouterMode) {
    handleSelect(props.itemKey, props.to)
  }
  else if (menuProps.mode.value === 'inline' || !isHoverMode.value) {
    // 内联模式或点击触发模式下，点击展开/收起子菜单
    handleToggleOpen(props.itemKey)
  }

  // 阻止冒泡，避免触发父级菜单的事件
  event.stopPropagation()
}

// 悬停交互
const hoverTimer = ref<number | null>(null)
const popoverVisible = ref(false)

function handleMouseEnter() {
  if (props.disabled)
    return

  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  hoverTimer.value = setTimeout(() => {
    // 对于悬浮模式或折叠状态
    if (isHoverMode.value || isCollapsed.value) {
      if (isCollapsed.value) {
        // 折叠状态下展示弹出菜单
        popoverVisible.value = true
      }
      else if (!isOpen.value) {
        // 悬浮展开子菜单
        handleToggleOpen(props.itemKey)
      }
    }
  }, 100) as unknown as number
}

function handleMouseLeave() {
  if (props.disabled)
    return

  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  hoverTimer.value = setTimeout(() => {
    // 对于悬浮模式或折叠状态
    if (isHoverMode.value || isCollapsed.value) {
      if (isCollapsed.value) {
        // 折叠状态下隐藏弹出菜单
        popoverVisible.value = false
      }
      else if (isOpen.value) {
        // 悬浮关闭子菜单
        handleToggleOpen(props.itemKey)
      }
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
      'ui-submenu-popup': isPopupMode.value,
      'ui-submenu-route': isRouterMode && props.to,
    },
    props.className,
  ]
})

// 计算标题样式
const titleStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (menuProps.mode.value === 'vertical' && !isCollapsed.value) {
    // 使用CSS变量计算缩进大小
    styles.paddingLeft = `calc(${parentLevel} * var(--ui-menu-indent, 24px) / 4 * 1px)`
  }

  return styles
})

// 计算弹出菜单样式
const popupMenuStyle = computed(() => {
  const styles: Record<string, string> = {}

  // 设置弹出位置
  if (isCollapsed.value) {
    const placement = menuProps.popupPlacement.value
    styles.position = 'fixed'
    styles.zIndex = '1050'
    styles.backgroundColor = 'var(--ui-menu-bg-color, #fff)'
    styles.boxShadow = '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
    styles.borderRadius = '4px'
    styles.padding = '4px 0'
    styles.minWidth = '200px'

    if (placement === 'right') {
      styles.left = 'calc(100% + 4px)'
      styles.top = '0'
    }
    else {
      styles.right = 'calc(100% + 4px)'
      styles.top = '0'
    }
  }

  return styles
})

// 判断是否显示内容
const shouldShowContent = computed(() => {
  return !isCollapsed.value || menuProps.mode.value !== 'vertical'
})

// 判断是否显示箭头
const shouldShowArrow = computed(() => {
  return !isCollapsed.value || menuProps.mode.value !== 'vertical'
})

// 计算箭头图标
const arrowIcon = computed(() => {
  if (menuProps.mode.value === 'horizontal') {
    return 'carbon:chevron-down'
  }

  // 折叠模式下，根据弹出位置决定箭头方向
  if (isCollapsed.value) {
    return menuProps.popupPlacement.value === 'right' ? 'carbon:chevron-right' : 'carbon:chevron-left'
  }

  return 'carbon:chevron-right'
})

// 内容高度变量
const contentHeight = ref('0px')

// 处理子菜单内容过渡动画
function beforeEnter(el: HTMLElement) {
  el.classList.add('ui-submenu-enter')
  contentHeight.value = '0px'
}

function enter(el: HTMLElement, done: () => void) {
  // 获取内容高度
  contentHeight.value = `${el.scrollHeight}px`

  // 添加激活类名
  el.classList.add('ui-submenu-enter-active')

  // 添加结束类名（下一帧）
  requestAnimationFrame(() => {
    el.classList.remove('ui-submenu-enter')
    el.classList.add('ui-submenu-enter-to')
    done()
  })
}

function afterEnter(el: HTMLElement) {
  // 移除所有过渡相关类名
  el.classList.remove('ui-submenu-enter-active', 'ui-submenu-enter-to')
  // 重置高度
  contentHeight.value = 'auto'
}

function beforeLeave(el: HTMLElement) {
  // 获取内容高度
  contentHeight.value = `${el.scrollHeight}px`
  el.classList.add('ui-submenu-leave')
}

function leave(el: HTMLElement, done: () => void) {
  el.classList.add('ui-submenu-leave-active')

  // 设置为0高度触发动画
  requestAnimationFrame(() => {
    contentHeight.value = '0px'
    el.classList.remove('ui-submenu-leave')
    el.classList.add('ui-submenu-leave-to')
    done()
  })
}

function afterLeave(el: HTMLElement) {
  // 移除所有过渡相关类名
  el.classList.remove('ui-submenu-leave-active', 'ui-submenu-leave-to')
  contentHeight.value = '0px'
}

// 获取子菜单的DOM元素（用于折叠状态下的定位）
const submenuEl = ref<HTMLElement | null>(null)
const popupMenuEl = ref<HTMLElement | null>(null)

// 更新弹出菜单位置
function updatePopupPosition() {
  if (import.meta.client && isCollapsed.value && popoverVisible.value && submenuEl.value && popupMenuEl.value) {
    const rect = submenuEl.value.getBoundingClientRect()
    popupMenuEl.value.style.top = `${rect.top}px`

    if (menuProps.popupPlacement.value === 'right') {
      popupMenuEl.value.style.left = `${rect.right + 4}px`
    }
    else {
      popupMenuEl.value.style.right = `${window.innerWidth - rect.left + 4}px`
    }
  }
}

// 在组件挂载时添加窗口大小变化监听
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', updatePopupPosition)
  }
})

// 监听折叠状态或弹出状态变化时更新位置
watch([isCollapsed, popoverVisible], () => {
  if (isCollapsed.value && popoverVisible.value) {
    // 使用nextTick确保DOM更新后再获取位置
    nextTick(updatePopupPosition)
  }
})

// 在组件卸载时清除定时器和事件监听器
onBeforeUnmount(() => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  if (import.meta.client) {
    window.removeEventListener('resize', updatePopupPosition)
  }
})
</script>

<template>
  <li
    ref="submenuEl"
    class="ui-submenu relative list-none"
    :class="submenuClass"
    role="menuitem"
    :aria-expanded="isOpen"
    :aria-disabled="disabled"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 子菜单标题 -->
    <div
      class="ui-submenu-title relative h-40px flex cursor-pointer items-center justify-between leading-40px transition-all"
      :style="titleStyle"
      @click="handleTitleClick"
    >
      <div class="ui-submenu-title-content flex items-center">
        <ui-icon v-if="icon" :icon="icon" class="ui-submenu-icon mr-10px h-14px w-14px" />
        <span v-if="shouldShowContent" class="ui-submenu-label transition-opacity">{{ title }}</span>
      </div>
      <ui-icon
        v-if="shouldShowArrow"
        :icon="arrowIcon"
        class="ui-submenu-arrow absolute right-16px text-10px transition-transform"
        :class="isOpen ? 'ui-submenu-arrow-active' : ''"
      />
    </div>

    <!-- 折叠状态下的弹出子菜单 -->
    <teleport v-if="isCollapsed" to="body">
      <ul
        v-if="popoverVisible"
        ref="popupMenuEl"
        class="ui-submenu-popup m-0 list-none overflow-hidden p-0 transition-all"
        :style="popupMenuStyle"
        role="group"
      >
        <slot />
      </ul>
    </teleport>

    <!-- 非折叠状态下的普通子菜单 -->
    <transition
      v-if="!isCollapsed"
      @before-enter="(el: Element) => beforeEnter(el as HTMLElement)"
      @enter="(el: Element, done: () => void) => enter(el as HTMLElement, done)"
      @after-enter="(el: Element) => afterEnter(el as HTMLElement)"
      @before-leave="(el: Element) => beforeLeave(el as HTMLElement)"
      @leave="(el: Element, done: () => void) => leave(el as HTMLElement, done)"
      @after-leave="(el: Element) => afterLeave(el as HTMLElement)"
    >
      <ul
        v-show="isOpen"
        class="ui-submenu-content m-0 list-none overflow-hidden p-0 transition-all"
        :style="{ height: contentHeight }"
        role="group"
      >
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

/* 展开状态下的箭头 */
.ui-submenu-arrow-active {
  transform: rotate(90deg);
}

:deep(.ui-menu-horizontal) .ui-submenu-arrow-active {
  transform: rotate(180deg);
}

/* 折叠状态下的样式 */
:deep(.ui-menu-collapsed) .ui-submenu-icon {
  margin-right: 0;
}

:deep(.ui-menu-collapsed) .ui-submenu-title {
  justify-content: center;
  padding: 0 8px;
}

/* 弹出菜单样式 */
.ui-submenu-popup {
  min-width: 160px;
  background-color: #fff;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  z-index: 1050;
}

:deep(.ui-menu-dark) + .ui-submenu-popup {
  background-color: var(--ui-menu-bg-color, rgb(43, 48, 58));
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.48),
    0 6px 16px 0 rgba(0, 0, 0, 0.32),
    0 9px 28px 8px rgba(0, 0, 0, 0.2);
}

/* 内联菜单子菜单样式 */
:deep(.ui-menu-inline) .ui-submenu-content {
  padding-left: calc(var(--ui-menu-indent, 24px) / 4 * 1px);
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

/* 过渡动画样式 */
.ui-submenu-enter-active,
.ui-submenu-leave-active {
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
}

/* 水平模式的特殊处理 */
:deep(.ui-menu-horizontal) .ui-submenu {
  position: relative;
  display: inline-flex;
  vertical-align: bottom;
}

:deep(.ui-menu-horizontal) .ui-submenu-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  margin-top: 4px;
  padding: 4px 0;
  background-color: #fff;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  z-index: 1050;
}

:deep(.ui-menu-horizontal.ui-menu-dark) .ui-submenu-content {
  background-color: var(--ui-menu-bg-color, rgb(43, 48, 58));
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.48),
    0 6px 16px 0 rgba(0, 0, 0, 0.32),
    0 9px 28px 8px rgba(0, 0, 0, 0.2);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) :deep(.ui-menu:not(.ui-menu-light)) .ui-submenu-content,
  :root:not(.light) :deep(.ui-menu:not(.ui-menu-light)) + .ui-submenu-popup {
    background-color: var(--ui-menu-bg-color, rgb(43, 48, 58));
    box-shadow:
      0 3px 6px -4px rgba(0, 0, 0, 0.48),
      0 6px 16px 0 rgba(0, 0, 0, 0.32),
      0 9px 28px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
