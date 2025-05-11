<script setup lang="ts" name="UiTree">
/**
 * 树形控件组件
 * 创建日期: 2024-07-30
 * 作者: aiftt
 * 更新日期: 2024-07-30 - 初始实现
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */

import type { ITreeNode } from '~/types/tree'
import { h } from 'vue'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 树结构数据
   */
  data: ITreeNode[]
  /**
   * 是否显示复选框
   */
  checkable?: boolean
  /**
   * 是否默认展开所有节点
   */
  defaultExpandAll?: boolean
  /**
   * 已选中的节点值
   */
  selectedKeys?: (string | number)[]
  /**
   * 已选中的复选框节点值
   */
  checkedKeys?: (string | number)[]
  /**
   * 默认展开的节点值
   */
  expandedKeys?: (string | number)[]
  /**
   * 是否可拖拽
   */
  draggable?: boolean
  /**
   * 是否可搜索
   */
  searchable?: boolean
  /**
   * 搜索值
   */
  searchValue?: string
  /**
   * 空状态提示文本
   */
  emptyText?: string
  /**
   * 自定义节点标题渲染
   */
  renderLabel?: (node: ITreeNode) => any
  /**
   * 节点缩进距离，单位 px
   */
  indent?: number
  /**
   * 节点间连接线样式，可选: line, dashed
   */
  lineStyle?: 'line' | 'dashed' | 'none'
  /**
   * 虚拟滚动配置，设置为 true 或配置对象以启用
   */
  virtual?: boolean | {
    /**
     * 虚拟列表高度
     */
    height?: number
    /**
     * 虚拟列表每项高度
     */
    itemHeight?: number
  }
  /**
   * 是否单选模式
   */
  selectable?: boolean
  /**
   * 是否高亮当前选中节点
   */
  highlightCurrent?: boolean
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 是否禁用整棵树
   */
  disabled?: boolean
  /**
   * 指定选择时是否自动展开父节点
   */
  autoExpandParent?: boolean
  /**
   * 是否显示节点图标
   */
  showIcon?: boolean
}>(), {
  checkable: false,
  defaultExpandAll: false,
  selectedKeys: () => [],
  checkedKeys: () => [],
  expandedKeys: () => [],
  draggable: false,
  searchable: false,
  searchValue: '',
  emptyText: '暂无数据',
  indent: 24,
  lineStyle: 'line',
  virtual: false,
  selectable: true,
  highlightCurrent: false,
  loading: false,
  disabled: false,
  autoExpandParent: true,
  showIcon: false,
})

// 定义事件
const emit = defineEmits<{
  /**
   * 节点选中状态变化
   */
  (e: 'select', selectedKeys: (string | number)[], node: ITreeNode): void
  /**
   * 节点复选框状态变化
   */
  (e: 'check', checkedKeys: (string | number)[], info: {
    node: ITreeNode
    checked: boolean
    checkedNodes: ITreeNode[]
    halfCheckedKeys: (string | number)[]
  }): void
  /**
   * 节点展开/折叠时触发
   */
  (e: 'expand', expandedKeys: (string | number)[], info: {
    node: ITreeNode
    expanded: boolean
  }): void
  /**
   * 节点被右键点击时触发
   */
  (e: 'contextmenu', event: MouseEvent, node: ITreeNode): void
  /**
   * 拖动开始时触发
   */
  (e: 'dragStart', node: ITreeNode, event: DragEvent): void
  /**
   * 拖动进入目标节点时触发
   */
  (e: 'dragEnter', info: {
    node: ITreeNode
    dragNode: ITreeNode
    event: DragEvent
  }): void
  /**
   * 拖动结束时触发
   */
  (e: 'dragEnd', info: {
    node: ITreeNode
    event: DragEvent
  }): void
  /**
   * 拖动成功放置时触发
   */
  (e: 'drop', info: {
    node: ITreeNode
    dragNode: ITreeNode
    dropPosition: number
    event: DragEvent
  }): void
  /**
   * 更新选中的节点键值
   */
  (e: 'update:selectedKeys', selectedKeys: (string | number)[]): void
  /**
   * 更新选中的复选框节点键值
   */
  (e: 'update:checkedKeys', checkedKeys: (string | number)[]): void
  /**
   * 更新展开的节点键值
   */
  (e: 'update:expandedKeys', expandedKeys: (string | number)[]): void
  /**
   * 更新搜索值
   */
  (e: 'update:searchValue', value: string): void
}>()

// 内部状态
const selectedKeysValue = ref<(string | number)[]>([...props.selectedKeys])
const checkedKeysValue = ref<(string | number)[]>([...props.checkedKeys])
const expandedKeysValue = ref<(string | number)[]>([...props.expandedKeys])
const halfCheckedKeys = ref<(string | number)[]>([])

// 如果设置了默认展开所有节点，则递归收集所有节点 ID
if (props.defaultExpandAll) {
  const collectExpandedKeys = (nodes: ITreeNode[]) => {
    nodes.forEach((node) => {
      if (node.children?.length) {
        expandedKeysValue.value.push(node.id)
        collectExpandedKeys(node.children)
      }
    })
  }

  collectExpandedKeys(props.data)
}

// 扁平化处理树节点，便于快速查找
const flatNodes = ref<Map<string | number, {
  node: ITreeNode
  parent: ITreeNode | null
  level: number
}>>(new Map())

function flattenTree(nodes: ITreeNode[], parent: ITreeNode | null = null, level = 0) {
  nodes.forEach((node) => {
    // 存储节点信息
    flatNodes.value.set(node.id, { node, parent, level })

    // 如果节点默认为展开状态，添加到展开键值列表
    if (node.expanded && !expandedKeysValue.value.includes(node.id)) {
      expandedKeysValue.value.push(node.id)
    }

    // 如果节点默认为选中状态，添加到选中键值列表
    if (node.selected && !selectedKeysValue.value.includes(node.id)) {
      selectedKeysValue.value.push(node.id)
    }

    // 递归处理子节点
    if (node.children?.length) {
      flattenTree(node.children, node, level + 1)
    }
  })
}

// 初始化时扁平化处理树结构
flattenTree(props.data)

// 获取节点的所有子节点ID
function getChildNodeIds(node: ITreeNode): (string | number)[] {
  const ids: (string | number)[] = []

  const traverse = (children: ITreeNode[] | undefined) => {
    if (!children)
      return

    children.forEach((child) => {
      ids.push(child.id)
      if (child.children?.length) {
        traverse(child.children)
      }
    })
  }

  traverse(node.children)
  return ids
}

// 获取节点的所有父节点ID
function getParentNodeIds(nodeId: string | number): (string | number)[] {
  const ids: (string | number)[] = []

  let currentNode = flatNodes.value.get(nodeId)
  while (currentNode?.parent) {
    ids.push(currentNode.parent.id)
    currentNode = flatNodes.value.get(currentNode.parent.id)
  }

  return ids
}

// 处理节点展开/折叠
function handleNodeExpand(node: ITreeNode) {
  const isExpanded = expandedKeysValue.value.includes(node.id)

  // 切换展开状态
  if (isExpanded) {
    expandedKeysValue.value = expandedKeysValue.value.filter(id => id !== node.id)
  }
  else {
    expandedKeysValue.value.push(node.id)
  }

  // 触发展开事件
  emit('expand', [...expandedKeysValue.value], {
    node,
    expanded: !isExpanded,
  })

  // 更新展开状态
  emit('update:expandedKeys', expandedKeysValue.value)
}

// 处理节点选中
function handleNodeSelect(node: ITreeNode) {
  if (props.disabled || node.disabled)
    return

  // 单选模式
  if (props.selectable) {
    // 切换选中状态
    const isSelected = selectedKeysValue.value.includes(node.id)

    if (isSelected) {
      // 已选中则取消选中
      selectedKeysValue.value = selectedKeysValue.value.filter(id => id !== node.id)
    }
    else {
      // 未选中则选中(单选模式下只允许选中一个)
      selectedKeysValue.value = [node.id]
    }

    // 触发选中事件
    emit('select', [...selectedKeysValue.value], node)
    emit('update:selectedKeys', selectedKeysValue.value)
  }
}

// 处理复选框勾选
function handleNodeCheck(node: ITreeNode, checked: boolean) {
  if (props.disabled || node.disabled)
    return

  let newCheckedKeys = [...checkedKeysValue.value]

  if (checked) {
    // 添加当前节点
    if (!newCheckedKeys.includes(node.id)) {
      newCheckedKeys.push(node.id)
    }

    // 添加所有子节点
    const childNodeIds = getChildNodeIds(node)
    childNodeIds.forEach((id) => {
      if (!newCheckedKeys.includes(id)) {
        newCheckedKeys.push(id)
      }
    })

    // 检查父节点状态
    const parentIds = getParentNodeIds(node.id)
    parentIds.forEach((parentId) => {
      const parent = flatNodes.value.get(parentId)?.node
      if (parent && parent.children) {
        const allChildrenChecked = parent.children.every(child =>
          newCheckedKeys.includes(child.id),
        )

        if (allChildrenChecked) {
          // 如果所有子节点都被选中，则父节点也应被选中
          if (!newCheckedKeys.includes(parentId)) {
            newCheckedKeys.push(parentId)
          }
          // 同时从半选集合中移除
          halfCheckedKeys.value = halfCheckedKeys.value.filter(id => id !== parentId)
        }
        else {
          // 如果不是所有子节点都被选中，父节点应为半选状态
          // 从选中集合中移除
          newCheckedKeys = newCheckedKeys.filter(id => id !== parentId)
          // 添加到半选集合中
          if (!halfCheckedKeys.value.includes(parentId)) {
            halfCheckedKeys.value.push(parentId)
          }
        }
      }
    })
  }
  else {
    // 取消选中当前节点
    newCheckedKeys = newCheckedKeys.filter(id => id !== node.id)

    // 取消选中所有子节点
    const childNodeIds = getChildNodeIds(node)
    newCheckedKeys = newCheckedKeys.filter(id => !childNodeIds.includes(id))

    // 检查父节点状态
    const parentIds = getParentNodeIds(node.id)
    parentIds.forEach((parentId) => {
      const parent = flatNodes.value.get(parentId)?.node
      if (parent && parent.children) {
        const anyChildChecked = parent.children.some(child =>
          newCheckedKeys.includes(child.id),
        )

        // 从选中集合中移除父节点
        newCheckedKeys = newCheckedKeys.filter(id => id !== parentId)

        if (anyChildChecked) {
          // 如果有任何子节点被选中，父节点应为半选状态
          if (!halfCheckedKeys.value.includes(parentId)) {
            halfCheckedKeys.value.push(parentId)
          }
        }
        else {
          // 如果没有子节点被选中，父节点应取消半选状态
          halfCheckedKeys.value = halfCheckedKeys.value.filter(id => id !== parentId)
        }
      }
    })
  }

  // 更新选中状态
  checkedKeysValue.value = newCheckedKeys

  // 触发复选框状态变化事件
  emit('check', [...checkedKeysValue.value], {
    node,
    checked,
    checkedNodes: checkedKeysValue.value.map(id => flatNodes.value.get(id)?.node).filter(Boolean) as ITreeNode[],
    halfCheckedKeys: [...halfCheckedKeys.value],
  })

  // 更新选中的复选框节点键值
  emit('update:checkedKeys', checkedKeysValue.value)
}

// 处理右键点击
function handleContextMenu(event: MouseEvent, node: ITreeNode) {
  if (props.disabled || node.disabled)
    return

  event.preventDefault()
  emit('contextmenu', event, node)
}

// 处理节点拖拽开始
function handleDragStart(event: DragEvent, node: ITreeNode) {
  if (!props.draggable || props.disabled || node.disabled)
    return

  if (event.dataTransfer) {
    // 设置拖拽数据
    event.dataTransfer.setData('text/plain', node.id.toString())
    event.dataTransfer.effectAllowed = 'move'
  }

  emit('dragStart', node, event)
}

// 处理拖拽进入其他节点
function handleDragEnter(event: DragEvent, node: ITreeNode) {
  if (!props.draggable || props.disabled || node.disabled)
    return

  event.preventDefault()

  // 获取被拖拽的节点ID
  const dragNodeId = event.dataTransfer?.getData('text/plain')
  if (!dragNodeId)
    return

  const dragNode = flatNodes.value.get(dragNodeId)?.node
  if (!dragNode)
    return

  emit('dragEnter', {
    node,
    dragNode,
    event,
  })
}

// 处理拖拽结束
function handleDragEnd(event: DragEvent, node: ITreeNode) {
  if (!props.draggable || props.disabled || node.disabled)
    return

  emit('dragEnd', {
    node,
    event,
  })
}

// 处理释放拖拽
function handleDrop(event: DragEvent, node: ITreeNode, dropPosition: number) {
  if (!props.draggable || props.disabled || node.disabled)
    return

  event.preventDefault()

  // 获取被拖拽的节点ID
  const dragNodeId = event.dataTransfer?.getData('text/plain')
  if (!dragNodeId)
    return

  const dragNode = flatNodes.value.get(dragNodeId)?.node
  if (!dragNode)
    return

  // 判断是否拖拽到自身或其子节点，防止循环引用
  if (dragNodeId === node.id.toString())
    return

  // 检查是否拖拽到自己的子节点，避免循环引用
  const childNodeIds = getChildNodeIds(dragNode)
  if (childNodeIds.includes(node.id))
    return

  emit('drop', {
    node,
    dragNode,
    dropPosition,
    event,
  })
}

// 渲染节点
function renderNode(node: ITreeNode, isLast = false) {
  const isSelected = selectedKeysValue.value.includes(node.id)
  const isExpanded = expandedKeysValue.value.includes(node.id)
  const isChecked = checkedKeysValue.value.includes(node.id)
  const isHalfChecked = halfCheckedKeys.value.includes(node.id)
  const nodeInfo = flatNodes.value.get(node.id)
  const level = nodeInfo ? nodeInfo.level : 0

  // Define slots based on children
  const slots = node.children && node.children.length > 0
    ? {
        default: () => node.children?.map((child, index) =>
          h('div', { key: child.id }, [
            renderNode(child, index === (node.children?.length ?? 0) - 1),
          ]),
        ),
      }
    : undefined

  return h('ui-tree-node', {
    node,
    isLast,
    isSelected,
    isExpanded,
    isChecked,
    isHalfChecked,
    checkable: props.checkable,
    disabled: props.disabled || node.disabled,
    highlightCurrent: props.highlightCurrent,
    level,
    indent: props.indent,
    showIcon: props.showIcon,
    lineStyle: props.lineStyle,
    draggable: props.draggable,
    searchValue: props.searchValue,
    onToggle: handleNodeExpand,
    onSelect: handleNodeSelect,
    onCheck: handleNodeCheck,
    onContextmenu: (event: MouseEvent) => handleContextMenu(event, node),
    onDragstart: (event: DragEvent) => handleDragStart(event, node),
    onDragenter: (event: DragEvent) => handleDragEnter(event, node),
    onDragend: (event: DragEvent) => handleDragEnd(event, node),
    onDrop: (event: DragEvent, dropNode: ITreeNode) => handleDrop(event, dropNode, 0),
  }, slots)
}

// 过滤树节点
const filteredData = computed(() => {
  if (!props.searchable || !props.searchValue) {
    return props.data
  }

  // 递归过滤树节点
  const filterNode = (nodes: ITreeNode[]): ITreeNode[] => {
    return nodes
      .map((node) => {
        // 如果节点标签包含搜索值，则保留该节点
        if (node.label.includes(props.searchValue)) {
          return { ...node }
        }

        // 如果节点有子节点，递归过滤子节点
        if (node.children?.length) {
          const filteredChildren = filterNode(node.children)
          // 如果过滤后子节点不为空，则保留父节点
          if (filteredChildren.length) {
            return { ...node, children: filteredChildren }
          }
        }

        return null
      })
      .filter(Boolean) as ITreeNode[]
  }

  return filterNode(props.data)
})

// 搜索框引用
const searchInputRef = ref<HTMLInputElement | null>(null)

// 清除搜索
function clearSearch() {
  emit('update:searchValue', '')
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}
</script>

<template>
  <div class="ui-tree">
    <!-- 搜索框 -->
    <div v-if="searchable" class="ui-tree-search mb-2">
      <ui-input
        ref="searchInputRef"
        :value="searchValue"
        placeholder="搜索..."
        clearable
        @update:model-value="(value) => emit('update:searchValue', value)"
        @clear="clearSearch"
      >
        <template #prefix>
          <ui-icon icon="carbon:search" size="small" />
        </template>
      </ui-input>
    </div>

    <!-- 树内容 -->
    <div class="ui-tree-content">
      <!-- 加载状态 -->
      <template v-if="loading">
        <div class="ui-tree-loading flex items-center justify-center py-4 text-gray-500">
          <ui-icon icon="carbon:renew" spin class="mr-2" />
          <span>加载中...</span>
        </div>
      </template>

      <!-- 空状态 -->
      <template v-else-if="!filteredData.length">
        <div class="ui-tree-empty py-4">
          <ui-empty :description="emptyText" />
        </div>
      </template>

      <!-- 树节点 -->
      <template v-else>
        <div class="ui-tree-nodes">
          <template v-for="(node, index) in filteredData" :key="node.id">
            <component
              :is="renderNode(node, index === filteredData.length - 1)"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ui-tree {
  --ui-tree-node-height: 32px;
  --ui-tree-arrow-size: 16px;
  --ui-tree-indent: v-bind('`${props.indent}px`');
  --ui-tree-node-hover-bg: rgba(0, 0, 0, 0.04);
  --ui-tree-node-selected-bg: rgba(0, 0, 0, 0.08);
  --ui-tree-line-color: #d9d9d9;

  width: 100%;
  font-size: 14px;
  color: var(--ui-color-text, #333);
}

.dark .ui-tree {
  --ui-tree-node-hover-bg: rgba(255, 255, 255, 0.08);
  --ui-tree-node-selected-bg: rgba(255, 255, 255, 0.12);
  --ui-tree-line-color: #4d4d4d;
}

.ui-tree-node {
  position: relative;
}

.ui-tree-node-content {
  display: flex;
  align-items: center;
  height: var(--ui-tree-node-height);
  padding-right: 8px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
}

.ui-tree-node-content:hover {
  background-color: var(--ui-tree-node-hover-bg);
}

.ui-tree-node-content--selected {
  background-color: var(--ui-tree-node-selected-bg);
}

.ui-tree-node-content--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ui-tree-arrow {
  width: var(--ui-tree-arrow-size);
  height: var(--ui-tree-arrow-size);
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

.ui-tree-node-children {
  padding-left: 0;
}

.ui-tree-node-line {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: var(--ui-tree-line-color);
}

.ui-tree-node-line--dashed {
  background: linear-gradient(to bottom, var(--ui-tree-line-color) 50%, transparent 50%);
  background-size: 1px 4px;
  background-repeat: repeat-y;
}

.ui-tree-node-line--last {
  height: calc(var(--ui-tree-node-height) / 2);
}

.ui-tree-search {
  margin-bottom: 8px;
}

.ui-tree-loading,
.ui-tree-empty {
  padding: 16px 0;
  text-align: center;
  color: var(--ui-color-text-secondary, #999);
}
</style>
