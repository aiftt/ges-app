<script setup lang="ts" name="UiMenuItem">
import type { IMenuContext } from '~/utils/inject-keys'
/**
 * 菜单项组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复样式方式，符合项目规范
 * 更新日期: 2023-12-05 - 修复保留关键字prop问题
 * 更新日期: 2024-08-27 - 使用inject-keys，优化组件实现，增强SSR兼容性
 * 更新日期: 2024-08-29 - 修复TypeScript类型错误，优化内容显示逻辑
 * 更新日期: 2024-08-30 - 添加路由模式支持、改进间距样式
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
   * 菜单项危险状态
   */
  danger?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 路由地址，用于路由模式
   */
  to?: string
}>(), {
  itemKey: '',
  title: '',
  icon: '',
  disabled: false,
  danger: false,
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
const { state: menuState, props: menuProps, handleSelect, router: isRouterMode } = menuContext

// 获取父级SubMenu的层级
const parentLevel = inject('subMenuLevel', 1)

// 计算当前项是否被选中
const isSelected = computed(() => {
  return menuState.selectedKey === props.itemKey
})

// 判断当前菜单是否处于折叠状态
const isCollapsed = computed(() => {
  return menuProps.collapsed.value && menuProps.mode.value === 'vertical'
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  // 路由模式下传递to参数
  handleSelect(props.itemKey, props.to)
}

// 计算菜单项类名
const itemClass = computed(() => {
  return [
    'ui-menu-item',
    {
      'ui-menu-item-selected': isSelected.value,
      'ui-menu-item-disabled': props.disabled,
      'ui-menu-item-danger': props.danger,
      'ui-menu-item-route': isRouterMode && props.to,
    },
    props.className,
  ]
})

// 计算菜单项样式
const itemStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (menuProps.mode.value === 'vertical' && !isCollapsed.value) {
    // 使用CSS变量计算缩进大小，每级缩进固定大小
    styles.paddingLeft = `calc(${parentLevel} * var(--ui-menu-indent, 24px) / 4 * 1px)`
  }

  return styles
})

// 判断是否显示内容
const shouldShowContent = computed(() => {
  return !isCollapsed.value || menuProps.mode.value !== 'vertical'
})
</script>

<template>
  <li
    class="ui-menu-item relative m-0 h-40px flex cursor-pointer items-center whitespace-nowrap leading-40px transition-all"
    :class="itemClass"
    :style="itemStyle"
    role="menuitem"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <div class="ui-menu-item-content flex items-center">
      <ui-icon v-if="icon" :icon="icon" class="ui-menu-item-icon mr-10px h-14px w-14px" />
      <span v-if="shouldShowContent" class="ui-menu-item-title transition-opacity">
        <slot>{{ title }}</slot>
      </span>
    </div>
  </li>
</template>

<style scoped>
/* 水平模式特殊处理 */
:deep(.ui-menu-horizontal) .ui-menu-item {
  display: inline-flex;
  margin-right: 8px;
  border-bottom: 2px solid transparent;
}

/* 折叠模式下只显示图标 */
:deep(.ui-menu-collapsed) .ui-menu-item-icon {
  margin-right: 0;
}

/* 悬停状态 */
.ui-menu-item:hover {
  color: var(--ui-menu-active-color, #1890ff);
  background-color: var(--ui-menu-hover-color, rgba(0, 0, 0, 0.04));
}

:deep(.ui-menu-dark) .ui-menu-item:hover {
  color: var(--ui-menu-dark-active-color, #fff);
  background-color: var(--ui-menu-dark-hover-color, rgba(255, 255, 255, 0.08));
}

/* 选中状态 */
.ui-menu-item-selected {
  color: var(--ui-menu-active-color, #1890ff);
  background-color: var(--ui-menu-active-bg-color, rgba(24, 144, 255, 0.1));
  font-weight: 500;
}

:deep(.ui-menu-dark) .ui-menu-item-selected {
  color: var(--ui-menu-dark-active-color, #fff);
  background-color: var(--ui-menu-dark-active-bg-color, rgba(255, 255, 255, 0.1));
}

:deep(.ui-menu-horizontal) .ui-menu-item-selected {
  border-bottom: 2px solid var(--ui-menu-active-color, #1890ff);
}

:deep(.ui-menu-horizontal.ui-menu-dark) .ui-menu-item-selected {
  border-bottom-color: var(--ui-menu-dark-active-color, #fff);
}

/* 禁用状态 */
.ui-menu-item-disabled {
  color: var(--ui-disabled-color, rgba(0, 0, 0, 0.25)) !important;
  background: none !important;
  cursor: not-allowed;
}

:deep(.ui-menu-dark) .ui-menu-item-disabled {
  color: var(--ui-disabled-dark-color, rgba(255, 255, 255, 0.35)) !important;
}

/* 危险状态 */
.ui-menu-item-danger {
  color: var(--ui-color-danger, #ff4d4f);
}

.ui-menu-item-danger:hover {
  color: var(--ui-color-danger-hover, #ff7875);
}

:deep(.ui-menu-dark) .ui-menu-item-danger {
  color: var(--ui-color-danger-dark, #ff7875);
}

:deep(.ui-menu-dark) .ui-menu-item-danger:hover {
  color: var(--ui-color-danger-dark-hover, #ffa39e);
}
</style>
