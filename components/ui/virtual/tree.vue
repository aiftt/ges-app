<script setup lang="ts" name="UiVirtualTree">
/**
 * 虚拟化树组件
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 更新日期: 2024-09-03 - 首次实现
 */

// 类型定义
export interface IVirtualTreeNode {
  /**
   * 节点ID
   */
  id: string | number
  /**
   * 节点标签
   */
  label: string
  /**
   * 节点数据
   */
  data?: any
  /**
   * 子节点
   */
  children?: IVirtualTreeNode[]
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否懒加载
   */
  isLeaf?: boolean
  /**
   * 图标
   */
  icon?: string
  /**
   * 自定义样式
   */
  class?: string
}

export interface IVirtualTreeConfig {
  /**
   * 节点高度(px)
   */
  nodeHeight: number
  /**
   * 缓冲区域节点数量
   */
  buffer?: number
  /**
   * 是否启用虚拟滚动
   */
  enabled?: boolean
  /**
   * 虚拟滚动激活的最小节点数量
   */
  threshold?: number
}

// 展平的树节点类型
interface IFlatTreeNode {
  node: IVirtualTreeNode
  level: number
  index: number
  path: (string | number)[]
  parent: IFlatTreeNode | null
  isExpanded: boolean
  isVisible: boolean
  isSelected: boolean
  isChecked: boolean
  isIndeterminate: boolean
  isLoading: boolean
}

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 树节点数据
   */
  data: IVirtualTreeNode[]
  /**
   * 选中的节点值
   */
  modelValue?: string | number | Array<string | number>
  /**
   * 是否显示复选框
   */
  showCheckbox?: boolean
  /**
   * 是否显示连接线
   */
  showLine?: boolean
  /**
   * 是否默认展开所有节点
   */
  defaultExpandAll?: boolean
  /**
   * 默认展开的节点ID数组
   */
  defaultExpandedIds?: Array<string | number>
  /**
   * 默认选中的节点ID数组
   */
  defaultSelectedIds?: Array<string | number>
  /**
   * 默认勾选的节点ID数组
   */
  defaultCheckedIds?: Array<string | number>
  /**
   * 是否在点击节点时展开或折叠节点
   */
  expandOnClickNode?: boolean
  /**
   * 是否在复选框被点击时才触发选中事件
   */
  checkStrictly?: boolean
  /**
   * 是否多选
   */
  multiple?: boolean
  /**
   * 加载子节点数据的方法
   */
  loadData?: (node: IVirtualTreeNode) => Promise<IVirtualTreeNode[]>
  /**
   * 是否仅在叶子节点可被选择
   */
  leafOnly?: boolean
  /**
   * 是否启用拖拽
   */
  draggable?: boolean
  /**
   * 过滤方法
   */
  filterMethod?: (value: string, node: IVirtualTreeNode) => boolean
  /**
   * 过滤文本
   */
  filterText?: string
  /**
   * 节点高亮文本
   */
  highlightText?: string
  /**
   * 是否高亮当前选中节点
   */
  highlightCurrent?: boolean
  /**
   * 树的高度
   */
  height?: string | number
  /**
   * 虚拟滚动配置
   */
  virtual?: IVirtualTreeConfig
}>(), {
  showCheckbox: false,
  showLine: false,
  defaultExpandAll: false,
  expandOnClickNode: true,
  checkStrictly: false,
  multiple: false,
  leafOnly: false,
  draggable: false,
  highlightCurrent: false,
  height: '400px',
  virtual: () => ({
    nodeHeight: 32,
    buffer: 10,
    enabled: true,
    threshold: 100,
  }),
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'nodeClick', node: IVirtualTreeNode, event: MouseEvent): void
  (e: 'nodeExpand', node: IVirtualTreeNode): void
  (e: 'nodeCollapse', node: IVirtualTreeNode): void
  (e: 'checkChange', node: IVirtualTreeNode, checked: boolean): void
  (e: 'nodeDragStart', node: IVirtualTreeNode, event: DragEvent): void
  (e: 'nodeDragEnd', node: IVirtualTreeNode, event: DragEvent): void
  (e: 'nodeDrop', dragNode: IVirtualTreeNode, dropNode: IVirtualTreeNode, dropType: 'before' | 'after' | 'inner', event: DragEvent): void
}>()

// 引用
const treeRef = ref<HTMLElement>()
const scrollRef = ref<HTMLElement>()

// 内部状态
const scrollTop = ref(0)
const containerHeight = ref(0)
const expandedKeys = ref<Set<string | number>>(new Set())
const selectedKeys = ref<Set<string | number>>(new Set())
const checkedKeys = ref<Set<string | number>>(new Set())
const indeterminateKeys = ref<Set<string | number>>(new Set())
const loadingKeys = ref<Set<string | number>>(new Set())

// 初始化展开状态
if (props.defaultExpandAll) {
  // 递归收集所有节点ID来展开
  const collectAllIds = (nodes: IVirtualTreeNode[]) => {
    nodes.forEach((node) => {
      expandedKeys.value.add(node.id)
      if (node.children && node.children.length) {
        collectAllIds(node.children)
      }
    })
  }
  collectAllIds(props.data)
}
else if (props.defaultExpandedIds && props.defaultExpandedIds.length) {
  props.defaultExpandedIds.forEach(id => expandedKeys.value.add(id))
}

// 初始化选中状态
if (props.defaultSelectedIds && props.defaultSelectedIds.length) {
  props.defaultSelectedIds.forEach(id => selectedKeys.value.add(id))
}

// 初始化勾选状态
if (props.defaultCheckedIds && props.defaultCheckedIds.length) {
  props.defaultCheckedIds.forEach(id => checkedKeys.value.add(id))
}

// 双向绑定处理
const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value !== undefined) {
      emit('update:modelValue', value)
    }
  },
})

// 同步innerValue和内部选中状态
watch(() => innerValue.value, (val) => {
  selectedKeys.value.clear()
  if (val !== undefined) {
    if (Array.isArray(val)) {
      val.forEach(id => selectedKeys.value.add(id))
    }
    else {
      selectedKeys.value.add(val)
    }
  }
}, { immediate: true })

// 计算展平的树结构
const flattenedTree = computed<IFlatTreeNode[]>(() => {
  const result: IFlatTreeNode[] = []
  let index = 0

  // 递归函数展平树结构
  const flatten = (nodes: IVirtualTreeNode[], level = 0, parent: IFlatTreeNode | null = null, parentPath: (string | number)[] = []) => {
    nodes.forEach((node) => {
      const path = [...parentPath, node.id]
      const isExpanded = expandedKeys.value.has(node.id)

      // 添加当前节点
      const flatNode: IFlatTreeNode = {
        node,
        level,
        index: index++,
        path,
        parent,
        isExpanded,
        isVisible: true,
        isSelected: selectedKeys.value.has(node.id),
        isChecked: checkedKeys.value.has(node.id),
        isIndeterminate: indeterminateKeys.value.has(node.id),
        isLoading: loadingKeys.value.has(node.id),
      }

      result.push(flatNode)

      // 如果有子节点并且当前节点是展开的，继续递归
      if (node.children && node.children.length && isExpanded) {
        flatten(node.children, level + 1, flatNode, path)
      }
    })
  }

  flatten(props.data)

  // 应用过滤
  if (props.filterText && props.filterMethod) {
    // 找到匹配的节点
    const matchingNodes = new Set<string | number>()
    const collectMatchingIds = (nodes: IVirtualTreeNode[]) => {
      nodes.forEach((node) => {
        if (props.filterMethod!(props.filterText!, node)) {
          matchingNodes.add(node.id)
          // 向上遍历父节点路径
          let current = result.find(n => n.node.id === node.id)
          while (current && current.parent) {
            matchingNodes.add(current.parent.node.id)
            current = current.parent
          }
        }
        if (node.children) {
          collectMatchingIds(node.children)
        }
      })
    }

    collectMatchingIds(props.data)

    // 设置可见性
    result.forEach((node) => {
      node.isVisible = matchingNodes.has(node.node.id)
    })
  }

  return result
})

// 计算可见的展平树节点
const visibleFlatNodes = computed(() => {
  return flattenedTree.value.filter(node => node.isVisible)
})

// 检查是否应启用虚拟滚动
const shouldEnableVirtualScroll = computed(() => {
  const { enabled, threshold = 100 } = props.virtual
  return Boolean(enabled) && visibleFlatNodes.value.length >= threshold
})

// 计算容器高度
const treeContainerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

// 计算树内容的总高度
const totalHeight = computed(() => {
  if (!shouldEnableVirtualScroll.value) {
    return 'auto'
  }
  return `${visibleFlatNodes.value.length * props.virtual.nodeHeight}px`
})

// 计算可见区域的节点范围
const visibleRange = computed(() => {
  if (!shouldEnableVirtualScroll.value) {
    return { start: 0, end: visibleFlatNodes.value.length }
  }

  const { nodeHeight, buffer = 10 } = props.virtual
  const start = Math.max(0, Math.floor(scrollTop.value / nodeHeight) - buffer)
  const visibleCount = Math.ceil(containerHeight.value / nodeHeight) + 2 * buffer
  const end = Math.min(visibleFlatNodes.value.length, start + visibleCount)

  return { start, end }
})

// 需要渲染的节点数据
const visibleNodes = computed(() => {
  const { start, end } = visibleRange.value
  return visibleFlatNodes.value.slice(start, end)
})

// 计算节点是否为叶子节点
function isLeafNode(node: IVirtualTreeNode): boolean {
  return node.isLeaf === true || (!node.children || node.children.length === 0)
}

// 计算节点的样式
function getNodeStyle(index: number) {
  if (!shouldEnableVirtualScroll.value) {
    return {}
  }

  const { start } = visibleRange.value
  const { nodeHeight } = props.virtual
  const top = (start + index) * nodeHeight

  return {
    position: 'absolute' as const,
    top: `${top}px`,
    left: 0,
    right: 0,
    height: `${nodeHeight}px`,
  }
}

// 处理滚动事件
function handleScroll(event: Event) {
  if (!shouldEnableVirtualScroll.value)
    return

  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 测量容器高度
function measureContainer() {
  if (scrollRef.value) {
    containerHeight.value = scrollRef.value.clientHeight
  }
}

// 处理节点点击
function handleNodeClick(node: IVirtualTreeNode, event: MouseEvent) {
  // 如果节点被禁用，不执行任何操作
  if (node.disabled)
    return

  // 触发节点点击事件
  emit('nodeClick', node, event)

  // 处理节点选中
  if (!props.leafOnly || isLeafNode(node)) {
    if (props.multiple) {
      // 多选模式
      const newSelection = new Set(selectedKeys.value)
      if (newSelection.has(node.id)) {
        newSelection.delete(node.id)
      }
      else {
        newSelection.add(node.id)
      }

      selectedKeys.value = newSelection
      innerValue.value = Array.from(newSelection)
    }
    else {
      // 单选模式
      selectedKeys.value.clear()
      selectedKeys.value.add(node.id)
      innerValue.value = node.id
    }
  }

  // 如果配置了点击节点时展开/折叠
  if (props.expandOnClickNode && !isLeafNode(node)) {
    toggleExpand(node)
  }
}

// 处理展开/折叠图标点击
function handleExpandIconClick(node: IVirtualTreeNode, event: MouseEvent) {
  event.stopPropagation()
  if (isLeafNode(node))
    return

  toggleExpand(node)
}

// 切换展开状态
function toggleExpand(node: IVirtualTreeNode) {
  if (expandedKeys.value.has(node.id)) {
    // 折叠节点
    expandedKeys.value.delete(node.id)
    emit('nodeCollapse', node)
  }
  else {
    // 展开节点
    expandedKeys.value.add(node.id)
    emit('nodeExpand', node)

    // 处理懒加载
    if (props.loadData && node.children && node.children.length === 0 && !loadingKeys.value.has(node.id)) {
      loadChildren(node)
    }
  }
}

// 加载子节点
async function loadChildren(node: IVirtualTreeNode) {
  if (!props.loadData)
    return

  loadingKeys.value.add(node.id)

  try {
    const children = await props.loadData(node)

    // 更新节点的子节点
    if (!node.children) {
      node.children = []
    }
    node.children.push(...children)

    // 标记节点为展开状态
    expandedKeys.value.add(node.id)
  }
  catch (error) {
    console.error('加载子节点失败', error)
  }
  finally {
    loadingKeys.value.delete(node.id)
  }
}

// 处理复选框点击
function handleCheckboxClick(node: IVirtualTreeNode, event: MouseEvent) {
  event.stopPropagation()
  if (node.disabled)
    return

  const isChecked = checkedKeys.value.has(node.id)
  const newChecked = !isChecked

  if (props.checkStrictly) {
    // 严格模式，只改变当前节点状态
    if (newChecked) {
      checkedKeys.value.add(node.id)
    }
    else {
      checkedKeys.value.delete(node.id)
    }
  }
  else {
    // 关联模式，自动选中/取消选中子节点和影响父节点
    updateCheckStatus(node, newChecked)
    updateParentCheckStatus(findNodeParent(node.id))
  }

  emit('checkChange', node, newChecked)
}

// 更新节点及其子节点的选中状态
function updateCheckStatus(node: IVirtualTreeNode, checked: boolean) {
  // 设置当前节点状态
  if (checked) {
    checkedKeys.value.add(node.id)
    indeterminateKeys.value.delete(node.id)
  }
  else {
    checkedKeys.value.delete(node.id)
    indeterminateKeys.value.delete(node.id)
  }

  // 处理子节点
  if (node.children && node.children.length) {
    node.children.forEach((child) => {
      if (!child.disabled) {
        updateCheckStatus(child, checked)
      }
    })
  }
}

// 更新父节点的选中状态
function updateParentCheckStatus(node: IVirtualTreeNode | null) {
  if (!node)
    return

  const parentFlatNode = flattenedTree.value.find(n => n.node.id === node.id)
  if (!parentFlatNode || !node.children || node.children.length === 0)
    return

  // 获取子节点状态
  const childIds = node.children.map(child => child.id)
  const allChecked = childIds.every(id => checkedKeys.value.has(id))
  const someChecked = childIds.some(id => checkedKeys.value.has(id) || indeterminateKeys.value.has(id))

  // 更新父节点状态
  if (allChecked) {
    checkedKeys.value.add(node.id)
    indeterminateKeys.value.delete(node.id)
  }
  else if (someChecked) {
    checkedKeys.value.delete(node.id)
    indeterminateKeys.value.add(node.id)
  }
  else {
    checkedKeys.value.delete(node.id)
    indeterminateKeys.value.delete(node.id)
  }

  // 递归更新更高层级的父节点
  const grandParent = findNodeParent(node.id)
  if (grandParent) {
    updateParentCheckStatus(grandParent)
  }
}

// 查找节点的父节点
function findNodeParent(nodeId: string | number): IVirtualTreeNode | null {
  const node = flattenedTree.value.find(n => n.node.id === nodeId)
  return node && node.parent ? node.parent.node : null
}

// 生命周期钩子
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', measureContainer)
    nextTick(measureContainer)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', measureContainer)
  }
})

// 提供给父组件的方法
defineExpose({
  // 获取选中的节点
  getSelectedNodes: () => {
    return flattenedTree.value
      .filter(node => node.isSelected)
      .map(node => node.node)
  },

  // 获取勾选的节点
  getCheckedNodes: () => {
    return flattenedTree.value
      .filter(node => node.isChecked)
      .map(node => node.node)
  },

  // 获取半选中的节点
  getIndeterminateNodes: () => {
    return flattenedTree.value
      .filter(node => node.isIndeterminate)
      .map(node => node.node)
  },

  // 设置节点展开
  expandNode: (nodeId: string | number) => {
    expandedKeys.value.add(nodeId)
  },

  // 设置节点折叠
  collapseNode: (nodeId: string | number) => {
    expandedKeys.value.delete(nodeId)
  },

  // 设置节点勾选
  checkNode: (nodeId: string | number) => {
    const node = flattenedTree.value.find(n => n.node.id === nodeId)
    if (node) {
      updateCheckStatus(node.node, true)
      if (!props.checkStrictly) {
        updateParentCheckStatus(findNodeParent(nodeId))
      }
    }
  },

  // 设置节点取消勾选
  uncheckNode: (nodeId: string | number) => {
    const node = flattenedTree.value.find(n => n.node.id === nodeId)
    if (node) {
      updateCheckStatus(node.node, false)
      if (!props.checkStrictly) {
        updateParentCheckStatus(findNodeParent(nodeId))
      }
    }
  },

  // 滚动到指定节点
  scrollToNode: (nodeId: string | number) => {
    if (scrollRef.value) {
      const node = visibleFlatNodes.value.findIndex(n => n.node.id === nodeId)
      if (node !== -1) {
        const { nodeHeight } = props.virtual
        scrollRef.value.scrollTop = node * nodeHeight
      }
    }
  },
})
</script>

<template>
  <div
    ref="treeRef"
    class="ui-virtual-tree"
    :style="treeContainerStyle"
  >
    <div
      ref="scrollRef"
      class="ui-virtual-tree__scroll"
      @scroll="handleScroll"
    >
      <div
        class="ui-virtual-tree__nodes"
        :style="{ height: totalHeight }"
      >
        <div
          v-for="(node, index) in visibleNodes"
          :key="node.node.id"
          :style="getNodeStyle(index)"
          class="ui-virtual-tree__node" :class="[
            {
              'is-expanded': node.isExpanded,
              'is-selected': node.isSelected,
              'is-disabled': node.node.disabled,
              'is-highlight': props.highlightCurrent && node.isSelected,
              'is-leaf': isLeafNode(node.node),
            },
            node.node.class,
          ]"
          @click="handleNodeClick(node.node, $event)"
        >
          <!-- 缩进 -->
          <span
            class="ui-virtual-tree__node-indent"
            :style="{ paddingLeft: `${node.level * 16}px` }"
          />

          <!-- 展开/折叠图标 -->
          <span
            class="ui-virtual-tree__node-expand-icon"
            :class="{ 'is-leaf': isLeafNode(node.node), 'is-loading': loadingKeys.has(node.node.id) }"
            @click="handleExpandIconClick(node.node, $event)"
          >
            <ui-icon
              v-if="loadingKeys.has(node.node.id)"
              icon="carbon:renew"
              class="is-loading"
            />
            <ui-icon
              v-else-if="!isLeafNode(node.node)"
              :icon="node.isExpanded ? 'carbon:chevron-down' : 'carbon:chevron-right'"
            />
          </span>

          <!-- 复选框 -->
          <span
            v-if="showCheckbox"
            class="ui-virtual-tree__node-checkbox"
            :class="{
              'is-checked': node.isChecked,
              'is-indeterminate': node.isIndeterminate,
              'is-disabled': node.node.disabled,
            }"
            @click="handleCheckboxClick(node.node, $event)"
          >
            <ui-icon v-if="node.isChecked" icon="carbon:checkmark" />
            <ui-icon v-else-if="node.isIndeterminate" icon="carbon:subtract" />
          </span>

          <!-- 节点图标 -->
          <span v-if="node.node.icon" class="ui-virtual-tree__node-icon">
            <ui-icon :icon="node.node.icon" />
          </span>

          <!-- 节点标签 -->
          <span class="ui-virtual-tree__node-label">
            <slot
              v-if="$slots.default"
              :node="node.node"
              :highlight-text="highlightText"
            />
            <template v-else>
              {{ node.node.label }}
            </template>
          </span>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="visibleFlatNodes.length === 0"
        class="ui-virtual-tree__empty"
      >
        <slot name="empty">
          <span>暂无数据</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-virtual-tree {
  position: relative;
  font-size: 14px;
  color: var(--ui-color-text-primary, #303133);
  width: 100%;
  overflow: hidden;

  &__scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  &__nodes {
    position: relative;
    width: 100%;
  }

  &__node {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 8px;
    cursor: pointer;

    &:hover {
      background-color: var(--ui-color-background-hover, #f5f7fa);
    }

    &.is-selected {
      background-color: var(--ui-color-primary-light-9, #ecf5ff);
      color: var(--ui-color-primary, #409eff);
    }

    &.is-disabled {
      color: var(--ui-color-text-placeholder, #c0c4cc);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }

    &.is-highlight {
      background-color: var(--ui-color-primary-light-8, #d9ecff);
    }
  }

  &__node-indent {
    display: inline-block;
    height: 100%;
  }

  &__node-expand-icon {
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;

    &.is-leaf {
      visibility: hidden;
    }

    .is-loading {
      animation: ui-tree-loading 1.2s infinite linear;
    }
  }

  &__node-checkbox {
    display: inline-flex;
    width: 16px;
    height: 16px;
    border: 1px solid var(--ui-border-color, #dcdfe6);
    border-radius: 2px;
    margin-right: 8px;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      border-color: var(--ui-color-primary, #409eff);
    }

    &.is-checked {
      background-color: var(--ui-color-primary, #409eff);
      border-color: var(--ui-color-primary, #409eff);
      color: var(--ui-color-white, #ffffff);
    }

    &.is-indeterminate {
      background-color: var(--ui-color-primary, #409eff);
      border-color: var(--ui-color-primary, #409eff);
      color: var(--ui-color-white, #ffffff);
    }

    &.is-disabled {
      background-color: var(--ui-color-background-disabled, #f5f7fa);
      border-color: var(--ui-border-color-light, #e4e7ed);
      cursor: not-allowed;

      &.is-checked,
      &.is-indeterminate {
        background-color: var(--ui-color-primary-light, #b3d8ff);
        border-color: var(--ui-color-primary-light, #b3d8ff);
      }
    }
  }

  &__node-icon {
    margin-right: 4px;
  }

  &__node-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__empty {
    padding: 16px 0;
    text-align: center;
    color: var(--ui-color-text-secondary, #909399);
  }
}

@keyframes ui-tree-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
