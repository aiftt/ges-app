<script setup lang="ts" name="UiMenu">
import type { MenuTrigger } from '~/types/interaction'
import type { MenuMode, MenuTheme, PopupPlacement } from '~/types/ui'
import type { IMenuContext } from '~/utils/inject-keys'
/**
 * 菜单组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复样式方式，符合项目规范
 * 更新日期: 2024-08-27 - 使用inject-keys，优化组件实现，增强SSR兼容性
 * 更新日期: 2024-08-28 - 使用IMenuContext接口类型
 * 更新日期: 2024-08-29 - 修复菜单样式和折叠状态问题
 * 更新日期: 2024-08-30 - 添加路由模式支持、优化折叠交互、调整默认点击展开
 * 更新日期: 2024-09-14 - 使用集中管理的类型定义
 */
import { provide } from 'vue'
import { MENU_INJECTION_KEY } from '~/utils/inject-keys'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 菜单模式
   * - vertical: 垂直菜单
   * - horizontal: 水平菜单
   * - inline: 内嵌菜单
   */
  mode?: MenuMode
  /**
   * 菜单主题
   */
  theme?: MenuTheme
  /**
   * 当前选中的菜单项key
   */
  selectedKey?: string
  /**
   * 初始展开的SubMenu菜单项key数组
   */
  defaultOpenKeys?: string[]
  /**
   * 是否折叠（仅在垂直模式有效）
   */
  collapsed?: boolean
  /**
   * 子菜单缩进宽度
   */
  inlineIndent?: number
  /**
   * 子菜单触发方式
   * - hover: 鼠标移入时触发
   * - click: 点击时触发
   */
  trigger?: MenuTrigger
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 是否启用路由模式
   * 在路由模式下，菜单项将自动匹配当前路由并高亮
   */
  router?: boolean
  /**
   * 菜单项水平间距
   */
  itemSpacing?: number
  /**
   * 弹出子菜单的位置（仅在折叠模式有效）
   */
  popupPlacement?: PopupPlacement
}>(), {
  mode: 'vertical',
  theme: 'light',
  selectedKey: '',
  defaultOpenKeys: () => [],
  collapsed: false,
  inlineIndent: 24,
  trigger: 'click', // 默认改为点击展开
  className: '',
  router: false,
  itemSpacing: 8,
  popupPlacement: 'right',
})

// 定义事件
const emit = defineEmits<{
  /**
   * 选择菜单项事件
   */
  (e: 'select', key: string): void
  /**
   * 打开/关闭子菜单事件
   */
  (e: 'openChange', openKeys: string[]): void
  /**
   * v-model支持
   */
  (e: 'update:selectedKey', key: string): void
  /**
   * v-model支持子菜单打开状态
   */
  (e: 'update:openKeys', keys: string[]): void
}>()

// 获取路由实例（用于路由模式）
const router = useRouter()
const route = useRoute()

// 菜单状态
const menuState = reactive({
  selectedKey: props.selectedKey,
  openKeys: [...props.defaultOpenKeys],
})

// 子菜单层级管理
provide('subMenuLevel', 1)

// 如果开启了路由模式，自动匹配当前路由
watch(() => route.path, () => {
  if (props.router) {
    // 寻找匹配的菜单项
    findMatchedMenuItem()
  }
}, { immediate: props.router })

// 监听选中项变化
watch(() => props.selectedKey, (newKey) => {
  menuState.selectedKey = newKey
})

// 查找与当前路由匹配的菜单项（路由模式）
function findMatchedMenuItem() {
  // 这里的实现会根据具体的路由结构来调整
  // 简单实现：将路由路径的最后一段作为菜单项的key
  if (route.path) {
    const pathSegments = route.path.split('/')
    // 使用最后一个非空段落作为key
    const lastSegment = pathSegments.filter(segment => segment).pop()
    if (lastSegment) {
      menuState.selectedKey = lastSegment
      emit('update:selectedKey', lastSegment)
    }
  }
}

// 点击选择菜单项
function handleSelect(key: string, to?: string) {
  menuState.selectedKey = key
  emit('select', key)
  emit('update:selectedKey', key)

  // 如果是路由模式且提供了to属性，则进行路由跳转
  if (props.router && to) {
    router.push(to)
  }
}

// 切换子菜单打开状态
function handleToggleOpen(key: string) {
  const index = menuState.openKeys.indexOf(key)
  const newOpenKeys = [...menuState.openKeys]

  if (index === -1) {
    // 水平模式下，一次只显示一个顶级菜单
    if (props.mode === 'horizontal') {
      // 仅保留非顶级菜单和当前打开的菜单
      const filtered = newOpenKeys.filter((k) => {
        // 假设顶级菜单key不包含:符号
        const isTopLevel = !k.includes(':')
        // 保留非顶级菜单
        return !isTopLevel
      })
      filtered.push(key)
      menuState.openKeys = filtered
    }
    else {
      // 垂直模式，直接添加
      newOpenKeys.push(key)
      menuState.openKeys = newOpenKeys
    }
  }
  else {
    // 关闭菜单
    newOpenKeys.splice(index, 1)
    menuState.openKeys = newOpenKeys
  }

  emit('openChange', menuState.openKeys)
  emit('update:openKeys', menuState.openKeys)
}

// 提供给子组件的菜单上下文
const menuContext: IMenuContext = {
  state: menuState,
  props: toRefs(props),
  router: props.router,
  handleSelect,
  handleToggleOpen,
}

provide(MENU_INJECTION_KEY, menuContext)

// 计算菜单类名
const menuClass = computed(() => {
  return [
    'ui-menu',
    `ui-menu-${props.mode}`,
    `ui-menu-${props.theme}`,
    {
      'ui-menu-collapsed': props.collapsed && props.mode === 'vertical',
      'ui-menu-root': true,
      'ui-menu-router': props.router,
    },
    props.className,
  ]
})

// 折叠状态下的宽度
const collapsedWidth = '64px'
const normalWidth = '100%'

// 计算菜单样式
const menuStyle = computed(() => {
  // 基础CSS变量
  const styles: Record<string, string> = {
    '--ui-menu-border-color': props.theme === 'light' ? 'rgba(5, 5, 5, 0.06)' : 'rgba(255, 255, 255, 0.15)',
    '--ui-menu-active-color': props.theme === 'light' ? 'var(--ui-color-primary, #3b82f6)' : '#fff',
    '--ui-menu-hover-color': props.theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
    '--ui-menu-active-bg-color': props.theme === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    '--ui-menu-indent': `${props.inlineIndent}px`,
    '--ui-menu-item-spacing': `${props.itemSpacing}px`,
    '--ui-menu-popup-placement': props.popupPlacement,
  }

  // 折叠状态下的宽度
  if (props.mode === 'vertical') {
    styles.width = props.collapsed ? collapsedWidth : normalWidth
  }

  return styles
})

// 暴露组件方法
defineExpose({
  /**
   * 获取当前选中的菜单项
   */
  getSelectedKey: () => menuState.selectedKey,
  /**
   * 获取当前展开的子菜单
   */
  getOpenKeys: () => menuState.openKeys,
})
</script>

<template>
  <ul
    class="ui-menu font-tabular m-0 box-border list-none rounded-md p-0 text-left text-sm leading-normal transition-all"
    :class="menuClass"
    :style="menuStyle"
    role="menu"
  >
    <slot />
  </ul>
</template>

<style scoped>
/* 垂直菜单 */
.ui-menu-vertical {
  border-right: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
  transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 水平菜单 */
.ui-menu-horizontal {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
  height: 56px;
  line-height: 56px;
  box-sizing: border-box;
}

/* 内联菜单 */
.ui-menu-inline {
  border-right: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
  width: 100%;
}

/* 折叠菜单 */
.ui-menu-collapsed {
  overflow: hidden;
}

.ui-menu-collapsed .ui-menu-item-content {
  justify-content: center;
  padding: 0;
}

.ui-menu-collapsed .ui-submenu-title-content {
  justify-content: center;
}

/* 添加水平间距 */
.ui-menu-item,
.ui-submenu-title {
  padding-left: var(--ui-menu-item-spacing, 8px);
  padding-right: var(--ui-menu-item-spacing, 8px);
}

/* 暗色主题 */
.ui-menu-dark {
  --ui-menu-bg-color: rgb(43, 48, 58);
  background-color: var(--ui-menu-bg-color);
  color: rgba(255, 255, 255, 0.85);
}

.ui-menu-dark.ui-menu-vertical,
.ui-menu-dark.ui-menu-inline {
  border-right-color: var(--ui-menu-border-color, rgba(255, 255, 255, 0.15));
}

.ui-menu-dark.ui-menu-horizontal {
  border-bottom-color: var(--ui-menu-border-color, rgba(255, 255, 255, 0.15));
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) .ui-menu:not(.ui-menu-light):not(.ui-menu-dark) {
    --ui-menu-bg-color: rgb(43, 48, 58);
    --ui-menu-border-color: rgba(255, 255, 255, 0.15);
    --ui-menu-active-color: #fff;
    --ui-menu-hover-color: rgba(255, 255, 255, 0.08);
    --ui-menu-active-bg-color: rgba(255, 255, 255, 0.1);
    background-color: var(--ui-menu-bg-color);
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
