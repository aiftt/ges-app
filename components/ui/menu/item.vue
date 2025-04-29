<script setup lang="ts" name="UiMenuItem">
/**
 * 菜单项组件
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
   * 菜单项危险状态
   */
  danger?: boolean
  /**
   * 自定义类名
   */
  className?: string
}>(), {
  itemKey: '',
  title: '',
  icon: '',
  disabled: false,
  danger: false,
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
}))

// 获取父级SubMenu的层级
const parentLevel = inject('subMenuLevel', 1)

// 计算当前项是否被选中
const isSelected = computed(() => {
  return menuState.selectedKey === props.itemKey
})

// 处理选中事件
const handleSelect = inject('handleSelect', (_: string) => {}) as (itemKey: string) => void

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  handleSelect(props.itemKey)
}

// 计算菜单项类名
const itemClass = computed(() => {
  return [
    'ui-menu-item',
    {
      'ui-menu-item-selected': isSelected.value,
      'ui-menu-item-disabled': props.disabled,
      'ui-menu-item-danger': props.danger,
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
</script>

<template>
  <li
    class="ui-menu-item relative m-0 h-40px flex cursor-pointer items-center whitespace-nowrap leading-40px transition-all"
    :class="[itemClass, paddingClass]"
    @click="handleClick"
  >
    <div class="ui-menu-item-content flex items-center">
      <ui-icon v-if="icon" :icon="icon" class="ui-menu-item-icon mr-10px h-14px w-14px" />
      <span v-if="!menuProps.collapsed || menuProps.mode !== 'vertical'" class="ui-menu-item-title transition-opacity">
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
