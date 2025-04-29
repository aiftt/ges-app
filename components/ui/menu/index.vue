<script setup lang="ts" name="UiMenu">
/**
 * 菜单组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复样式方式，符合项目规范
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 菜单模式
   * - vertical: 垂直菜单
   * - horizontal: 水平菜单
   * - inline: 内嵌菜单
   */
  mode?: 'vertical' | 'horizontal' | 'inline'
  /**
   * 菜单主题
   */
  theme?: 'light' | 'dark'
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
  triggerSubMenuAction?: 'hover' | 'click'
  /**
   * 自定义类名
   */
  className?: string
}>(), {
  mode: 'vertical',
  theme: 'light',
  selectedKey: '',
  defaultOpenKeys: () => [],
  collapsed: false,
  inlineIndent: 24,
  triggerSubMenuAction: 'hover',
  className: '',
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

// 菜单状态
const menuState = reactive({
  selectedKey: props.selectedKey,
  openKeys: [...props.defaultOpenKeys],
})

// 子菜单层级管理
provide('subMenuLevel', 1)

// 监听选中项变化
watch(() => props.selectedKey, (newKey) => {
  menuState.selectedKey = newKey
})

// 向子组件提供菜单状态和属性
provide('menuState', menuState)
provide('menuProps', toRefs(props))

// 点击选择菜单项
function handleSelect(key: string) {
  menuState.selectedKey = key
  emit('select', key)
  emit('update:selectedKey', key)
}

// 提供给子组件的选择方法
provide('handleSelect', handleSelect)

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

// 提供给子组件的切换展开方法
provide('handleToggleOpen', handleToggleOpen)

// 计算菜单类名
const menuClass = computed(() => {
  return [
    'ui-menu',
    `ui-menu-${props.mode}`,
    `ui-menu-${props.theme}`,
    {
      'ui-menu-collapsed': props.collapsed && props.mode === 'vertical',
      'ui-menu-root': true,
    },
    props.className,
  ]
})

// 计算菜单宽度类名
const menuWidthClass = computed(() => {
  // 垂直折叠模式下，固定宽度
  if (props.mode === 'vertical' && props.collapsed) {
    return 'w-80px'
  }
  return 'w-full'
})
</script>

<template>
  <ul
    class="ui-menu font-tabular m-0 box-border list-none rounded-md p-0 text-left text-sm leading-normal transition-all"
    :class="[menuClass, menuWidthClass]"
  >
    <slot />
  </ul>
</template>

<style scoped>
/* 垂直菜单 */
.ui-menu-vertical {
  border-right: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
}

/* 水平菜单 */
.ui-menu-horizontal {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
}

/* 内联菜单 */
.ui-menu-inline {
  border-right: 1px solid var(--ui-menu-border-color, rgba(5, 5, 5, 0.06));
}

/* 折叠菜单 */
.ui-menu-collapsed {
  overflow: hidden;
}

/* 暗色主题 */
.ui-menu-dark {
  color: var(--ui-menu-dark-text-color, rgba(255, 255, 255, 0.65));
  background: var(--ui-menu-dark-bg-color, #001529);
  border-right-color: var(--ui-menu-dark-border-color, rgba(253, 253, 253, 0.1));
}

.ui-menu-dark.ui-menu-horizontal {
  border-bottom-color: var(--ui-menu-dark-border-color, rgba(253, 253, 253, 0.1));
}

/* CSS变量已移至主题文件中 */

.ui-menu {
  color: var(--ui-color-text, rgba(0, 0, 0, 0.88));
  background: var(--ui-menu-bg-color, #fff);
  transition:
    background 0.3s,
    width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}
</style>
