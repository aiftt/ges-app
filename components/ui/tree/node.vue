<script setup lang="ts" name="UiTreeNode">
/**
 * 树节点组件
 * 创建日期: 2024-07-30
 * 作者: aiftt
 * 更新日期: 2024-07-30 - 初始实现
 * 更新日期: 2024-08-01 - 修复JSX语法支持
 */

import type { ITreeNode } from './index.vue'
import { h } from 'vue'

// 定义节点Props
const props = withDefaults(defineProps<{
  /**
   * 节点数据
   */
  node: ITreeNode
  /**
   * 是否是最后一个节点
   */
  isLast?: boolean
  /**
   * 节点是否选中
   */
  isSelected?: boolean
  /**
   * 节点是否展开
   */
  isExpanded?: boolean
  /**
   * 节点是否选中checkbox
   */
  isChecked?: boolean
  /**
   * 节点是否半选中
   */
  isHalfChecked?: boolean
  /**
   * 是否显示checkbox
   */
  checkable?: boolean
  /**
   * 树是否禁用
   */
  disabled?: boolean
  /**
   * 是否高亮选中节点
   */
  highlightCurrent?: boolean
  /**
   * 节点层级
   */
  level?: number
  /**
   * 缩进距离
   */
  indent?: number
  /**
   * 是否显示节点图标
   */
  showIcon?: boolean
  /**
   * 连接线样式
   */
  lineStyle?: 'line' | 'dashed' | 'none'
  /**
   * 是否可拖拽
   */
  draggable?: boolean
  /**
   * 搜索关键词，用于高亮
   */
  searchValue?: string
}>(), {
  // defaults
})

// 定义事件
const emit = defineEmits<{
  /**
   * 展开/折叠节点
   */
  (e: 'toggle', node: ITreeNode): void
  /**
   * 选中节点
   */
  (e: 'select', node: ITreeNode): void
  /**
   * 复选框选中状态变化
   */
  (e: 'check', node: ITreeNode, checked: boolean): void
  /**
   * 右键点击
   */
  (e: 'contextmenu', event: MouseEvent, node: ITreeNode): void
  /**
   * 拖拽开始
   */
  (e: 'dragstart', event: DragEvent, node: ITreeNode): void
  /**
   * 拖拽进入其他节点
   */
  (e: 'dragenter', event: DragEvent, node: ITreeNode): void
  /**
   * 拖拽结束
   */
  (e: 'dragend', event: DragEvent, node: ITreeNode): void
  /**
   * 拖拽释放
   */
  (e: 'drop', event: DragEvent, node: ITreeNode, dropPosition: number): void
}>()

// 事件处理

// 处理展开/折叠
function handleToggle() {
  const hasChildren = props.node.children && props.node.children.length > 0
  if (hasChildren) {
    emit('toggle', props.node)
  }
}

// 处理选中
function handleSelect() {
  if (props.disabled || props.node.disabled)
    return
  emit('select', props.node)
}

// 处理复选框选中
function handleCheck(checked: boolean) {
  if (props.disabled || props.node.disabled)
    return
  emit('check', props.node, checked)
}

// 处理右键菜单
function handleContextMenu(event: MouseEvent) {
  if (props.disabled || props.node.disabled)
    return
  event.preventDefault()
  emit('contextmenu', event, props.node)
}

// 处理拖拽
function handleDragStart(event: DragEvent) {
  if (!props.draggable || props.disabled || props.node.disabled)
    return
  emit('dragstart', event, props.node)
}

function handleDragEnter(event: DragEvent) {
  if (!props.draggable || props.disabled || props.node.disabled)
    return
  event.preventDefault()
  emit('dragenter', event, props.node)
}

function handleDragEnd(event: DragEvent) {
  if (!props.draggable || props.disabled || props.node.disabled)
    return
  emit('dragend', event, props.node)
}

function handleDrop(event: DragEvent) {
  if (!props.draggable || props.disabled || props.node.disabled)
    return
  event.preventDefault()
  emit('drop', event, props.node, 0)
}

function handleDragOver(event: DragEvent) {
  if (!props.draggable || props.disabled || props.node.disabled)
    return
  event.preventDefault()
}

// 处理搜索高亮
function renderLabel() {
  const { node, searchValue } = props

  // 处理搜索高亮
  if (searchValue && node.label.includes(searchValue)) {
    const index = node.label.indexOf(searchValue)
    const beforeStr = node.label.substring(0, index)
    const matchStr = node.label.substring(index, index + searchValue.length)
    const afterStr = node.label.substring(index + searchValue.length)

    // 使用h函数创建虚拟DOM而不是JSX
    return h('span', { class: 'ui-tree-node-label' }, [
      beforeStr,
      h('span', { class: 'ui-tree-node-label--highlight' }, matchStr),
      afterStr,
    ])
  }

  return h('span', { class: 'ui-tree-node-label' }, node.label)
}
</script>

<template>
  <div class="ui-tree-node">
    <!-- 节点内容 -->
    <div
      class="ui-tree-node-content"
      :class="{
        'ui-tree-node-content--selected': isSelected && highlightCurrent,
        'ui-tree-node-content--disabled': disabled || node.disabled,
      }"
      :style="{ paddingLeft: `${level * indent}px` }"
      :draggable="draggable && !disabled && !node.disabled"
      @click="handleSelect"
      @contextmenu="handleContextMenu"
      @dragstart="handleDragStart"
      @dragenter="handleDragEnter"
      @dragend="handleDragEnd"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <!-- 连接线 -->
      <div
        v-if="lineStyle !== 'none' && level > 0"
        class="ui-tree-node-line"
        :class="[
          `ui-tree-node-line--${lineStyle}`,
          { 'ui-tree-node-line--last': isLast },
        ]"
        :style="{ left: `${(level - 1) * indent + indent / 2}px` }"
      />

      <!-- 展开/折叠箭头 -->
      <div
        class="ui-tree-arrow"
        :class="{
          'ui-tree-arrow--expanded': isExpanded,
          'ui-tree-arrow--leaf': !node.children || node.children.length === 0,
        }"
        @click.stop="handleToggle"
      >
        <ui-icon
          v-if="node.children && node.children.length > 0"
          :icon="isExpanded ? 'carbon:chevron-down' : 'carbon:chevron-right'"
          size="small"
        />
      </div>

      <!-- 复选框 -->
      <ui-checkbox
        v-if="checkable"
        :model-value="isChecked"
        :indeterminate="isHalfChecked"
        :disabled="disabled || node.disabled"
        @update:model-value="handleCheck"
        @click.stop
      />

      <!-- 节点图标 -->
      <span v-if="showIcon || node.icon" class="ui-tree-node-icon">
        <ui-icon
          :icon="node.icon || (node.children?.length ? 'carbon:folder' : 'carbon:document')"
          size="small"
        />
      </span>

      <!-- 节点标签 -->
      <component :is="renderLabel()" />
    </div>

    <!-- 子节点 -->
    <div v-if="isExpanded && node.children && node.children.length > 0" class="ui-tree-node-children">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ui-tree-node {
  position: relative;
}

.ui-tree-node-content {
  display: flex;
  align-items: center;
  height: var(--ui-tree-node-height, 32px);
  padding-right: 8px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
}

.ui-tree-node-content:hover {
  background-color: var(--ui-tree-node-hover-bg, rgba(0, 0, 0, 0.04));
}

.ui-tree-node-content--selected {
  background-color: var(--ui-tree-node-selected-bg, rgba(0, 0, 0, 0.08));
}

.ui-tree-node-content--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ui-tree-arrow {
  width: var(--ui-tree-arrow-size, 16px);
  height: var(--ui-tree-arrow-size, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  transition: transform 0.2s;
}

.ui-tree-arrow--leaf {
  visibility: hidden;
}

.ui-tree-node-icon {
  margin-right: 4px;
  display: flex;
  align-items: center;
}

.ui-tree-node-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tree-node-label--highlight {
  background-color: rgba(255, 255, 0, 0.4);
  font-weight: bold;
}

.ui-tree-node-line {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: var(--ui-tree-line-color, #d9d9d9);
}

.ui-tree-node-line--dashed {
  background: linear-gradient(to bottom, var(--ui-tree-line-color, #d9d9d9) 50%, transparent 50%);
  background-size: 1px 4px;
  background-repeat: repeat-y;
}

.ui-tree-node-line--last {
  height: calc(var(--ui-tree-node-height, 32px) / 2);
}

.dark .ui-tree-node-content:hover {
  background-color: var(--ui-tree-node-hover-bg, rgba(255, 255, 255, 0.08));
}

.dark .ui-tree-node-content--selected {
  background-color: var(--ui-tree-node-selected-bg, rgba(255, 255, 255, 0.12));
}

.dark .ui-tree-node-line {
  background-color: var(--ui-tree-line-color, #4d4d4d);
}

.dark .ui-tree-node-line--dashed {
  background: linear-gradient(to bottom, var(--ui-tree-line-color, #4d4d4d) 50%, transparent 50%);
}
</style>
