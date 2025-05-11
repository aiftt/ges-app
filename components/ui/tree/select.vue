<script setup lang="ts" name="UiTreeSelect">
/**
 * 树形选择器组件
 * 创建日期: 2024-08-30
 * 作者: aiftt
 * 更新日期: 2024-09-12 - 使用集中管理的类型定义
 *
 * 提供从树形结构数据中选择一个或多个节点的功能
 */

import type { VNode } from 'vue'
import type { ITreeNode } from '~/types/tree'
import type { TagType } from '~/types/ui'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值，单选时为string或number，多选时为字符串或数字数组
   */
  modelValue?: string | number | Array<string | number>
  /**
   * 树结构数据
   */
  data: ITreeNode[]
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 是否多选
   */
  multiple?: boolean
  /**
   * 选择器尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 下拉最大高度
   */
  maxHeight?: string
  /**
   * 宽度
   */
  width?: string
  /**
   * 是否可筛选选项
   */
  filterable?: boolean
  /**
   * 是否使用复选框
   */
  checkable?: boolean
  /**
   * 是否默认展开所有节点
   */
  defaultExpandAll?: boolean
  /**
   * 是否显示节点图标
   */
  showIcon?: boolean
  /**
   * 是否显示展开所有/折叠所有按钮
   */
  showExpandButtons?: boolean
  /**
   * 是否只能选择叶子节点
   */
  leafOnly?: boolean
  /**
   * 选中父节点时是否自动选中所有子节点
   */
  checkStrictly?: boolean
  /**
   * 最大选择数量（多选模式）
   */
  maxSelections?: number
  /**
   * 多选时是否将选中值按文字的形式展示
   */
  collapseTags?: boolean
  /**
   * 多选时最多显示的标签数
   */
  maxCollapseTagCount?: number
  /**
   * 多选时标签的类型
   */
  tagType?: TagType
  /**
   * 节点缩进距离
   */
  indent?: number
  /**
   * 节点间连接线样式
   */
  lineStyle?: 'line' | 'dashed' | 'none'
  /**
   * 自定义节点标题渲染
   */
  renderLabel?: (node: ITreeNode) => any
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 加载中文字
   */
  loadingText?: string
  /**
   * 无数据时显示的文字
   */
  noDataText?: string
  /**
   * 无匹配数据时显示的文字
   */
  noMatchText?: string
  /**
   * 下拉框的弹出位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 远程搜索方法
   */
  remoteMethod?: (query: string) => void
  /**
   * 是否使用虚拟滚动
   */
  virtual?: boolean
}>(), {
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: false,
  multiple: false,
  size: 'default',
  error: false,
  maxHeight: '300px',
  filterable: false,
  checkable: false,
  defaultExpandAll: false,
  showIcon: false,
  showExpandButtons: false,
  leafOnly: false,
  checkStrictly: false,
  maxSelections: Infinity,
  collapseTags: false,
  maxCollapseTagCount: 1,
  tagType: 'default',
  indent: 16,
  lineStyle: 'line',
  loading: false,
  loadingText: '加载中...',
  noDataText: '暂无数据',
  noMatchText: '无匹配数据',
  placement: 'bottom',
  virtual: false,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'clear'): void
  (e: 'searchChange', query: string): void
  (e: 'visibleChange', visible: boolean): void
}>()

// 状态
const isOpen = ref(false)
const inputRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const searchValue = ref('')
const selectedNodes = ref<ITreeNode[]>([])
const expandedKeys = ref<(string | number)[]>([])
const tempSelectedKeys = ref<(string | number)[]>([])

// 计算属性和工具函数
// 将树形数据平铺为一维数组，方便查找
const flattenedNodes = computed(() => {
  const result: ITreeNode[] = []
  const flatten = (nodes: ITreeNode[]) => {
    nodes.forEach((node) => {
      result.push(node)
      if (node.children && node.children.length) {
        flatten(node.children)
      }
    })
  }
  flatten(props.data)
  return result
})

// 根据id查找节点
function findNodeById(id: string | number): ITreeNode | undefined {
  return flattenedNodes.value.find(node => node.id === id)
}

// 获取所有叶子节点ID
const _allLeafNodeIds = computed(() => {
  const leafIds: (string | number)[] = []
  const findLeafNodes = (nodes: ITreeNode[]) => {
    nodes.forEach((node) => {
      if (!node.children || node.children.length === 0) {
        leafIds.push(node.id)
      }
      else {
        findLeafNodes(node.children)
      }
    })
  }
  findLeafNodes(props.data)
  return leafIds
})

// 获取节点所有子节点ID
function getChildNodeIds(node: ITreeNode): (string | number)[] {
  const ids: (string | number)[] = []
  const collectIds = (n: ITreeNode) => {
    ids.push(n.id)
    if (n.children && n.children.length) {
      n.children.forEach(collectIds)
    }
  }
  if (node.children && node.children.length) {
    node.children.forEach(collectIds)
  }
  return ids
}

// 获取节点所有父节点ID
function getParentNodeIds(node: ITreeNode): (string | number)[] {
  const ids: (string | number)[] = []
  const findParent = (n: ITreeNode, target: string | number): boolean => {
    if (n.children && n.children.length) {
      for (const child of n.children) {
        if (child.id === target) {
          ids.push(n.id)
          return true
        }
        if (findParent(child, target)) {
          ids.push(n.id)
          return true
        }
      }
    }
    return false
  }

  props.data.forEach(n => findParent(n, node.id))
  return ids
}

// 计算过滤后的树数据
const filteredData = computed(() => {
  if (!searchValue.value || !props.filterable) {
    return props.data
  }

  const filterTree = (nodes: ITreeNode[]): ITreeNode[] => {
    return nodes
      .map((node) => {
        // 创建节点的副本，以避免修改原始数据
        const newNode = { ...node }

        // 如果当前节点包含搜索文本，则保留该节点
        const matchesSearch = node.label.toLowerCase().includes(searchValue.value.toLowerCase())

        if (node.children && node.children.length) {
          // 递归过滤子节点
          newNode.children = filterTree(node.children)

          // 如果子节点中有匹配项，即使当前节点不匹配，也保留该节点
          if (newNode.children && newNode.children.length) {
            return newNode
          }
        }

        // 只有当节点匹配搜索条件时才返回
        return matchesSearch ? newNode : null
      })
      .filter(Boolean) as ITreeNode[]
  }

  return filterTree(props.data)
})

// 当前选中节点的标签
const _selectedLabels = computed(() => {
  return selectedNodes.value.map(node => node.label)
})

// 是否达到最大选择数量限制
const _isMaxedOut = computed(() => {
  return props.multiple && selectedNodes.value.length >= props.maxSelections
})

// 禁用状态
const isDisabled = computed(() => {
  return props.disabled || props.readonly || props.loading
})

// 尺寸样式类
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-sm h-8'
    case 'large':
      return 'text-lg h-12'
    default:
      return 'text-base h-10'
  }
})

// 获取显示标签的文本
const displayText = computed(() => {
  if (selectedNodes.value.length === 0) {
    return ''
  }

  if (!props.multiple) {
    return selectedNodes.value[0].label
  }

  if (props.collapseTags && selectedNodes.value.length > props.maxCollapseTagCount) {
    const visibleTags = selectedNodes.value.slice(0, props.maxCollapseTagCount)
    return `${visibleTags.map(n => n.label).join(', ')} 等${selectedNodes.value.length}项`
  }

  return selectedNodes.value.map(n => n.label).join(', ')
})

// 方法
function toggleDropdown() {
  if (isDisabled.value)
    return

  isOpen.value = !isOpen.value

  if (isOpen.value) {
    emit('focus')
    emit('visibleChange', true)

    // 默认展开所有节点
    if (props.defaultExpandAll && expandedKeys.value.length === 0) {
      const keys: (string | number)[] = []
      const collectExpandableIds = (nodes: ITreeNode[]) => {
        nodes.forEach((node) => {
          if (node.children && node.children.length) {
            keys.push(node.id)
            collectExpandableIds(node.children)
          }
        })
      }
      collectExpandableIds(props.data)
      expandedKeys.value = keys
    }

    // 初始化临时选中状态
    if (props.modelValue) {
      if (props.multiple && Array.isArray(props.modelValue)) {
        tempSelectedKeys.value = [...props.modelValue]
      }
      else if (props.modelValue) {
        // 确保 modelValue 是单个值
        tempSelectedKeys.value = [props.modelValue as string | number]
      }
    }
    else {
      tempSelectedKeys.value = []
    }
  }
  else {
    emit('blur')
    emit('visibleChange', false)
    searchValue.value = ''
  }
}

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as Node
  if (
    isOpen.value
    && inputRef.value
    && dropdownRef.value
    && !inputRef.value.contains(target)
    && !dropdownRef.value.contains(target)
  ) {
    isOpen.value = false
    emit('blur')
    emit('visibleChange', false)
    searchValue.value = ''
  }
}

function handleNodeSelect(nodeId: string | number) {
  const node = findNodeById(nodeId)
  if (!node || node.disabled)
    return

  // 如果只允许选择叶子节点，但当前节点有子节点，则不执行选择操作
  if (props.leafOnly && node.children && node.children.length > 0) {
    return
  }

  if (props.multiple) {
    const index = tempSelectedKeys.value.indexOf(nodeId)

    if (index > -1) {
      // 取消选择
      tempSelectedKeys.value.splice(index, 1)

      // 如果是严格模式，需要同时处理子节点和父节点
      if (!props.checkStrictly) {
        // 取消选择所有子节点
        if (node.children && node.children.length) {
          const childrenIds = getChildNodeIds(node)
          tempSelectedKeys.value = tempSelectedKeys.value.filter(id => !childrenIds.includes(id))
        }

        // 检查是否需要取消选择父节点
        const parentIds = getParentNodeIds(node)
        parentIds.forEach((parentId) => {
          const parentNode = findNodeById(parentId)
          if (parentNode && parentNode.children) {
            // 只有当父节点的所有子节点都未被选中时，才取消选择父节点
            const allChildrenUnselected = parentNode.children.every(child =>
              !tempSelectedKeys.value.includes(child.id),
            )
            if (allChildrenUnselected) {
              const parentIndex = tempSelectedKeys.value.indexOf(parentId)
              if (parentIndex > -1) {
                tempSelectedKeys.value.splice(parentIndex, 1)
              }
            }
          }
        })
      }
    }
    else {
      // 检查是否超出最大选择数量
      if (tempSelectedKeys.value.length >= props.maxSelections) {
        return
      }

      // 添加选择
      tempSelectedKeys.value.push(nodeId)

      // 如果是严格模式，需要同时处理子节点和父节点
      if (!props.checkStrictly) {
        // 选择所有子节点
        if (node.children && node.children.length) {
          const childrenIds = getChildNodeIds(node)
          childrenIds.forEach((id) => {
            if (!tempSelectedKeys.value.includes(id)) {
              tempSelectedKeys.value.push(id)
            }
          })
        }

        // 检查是否需要选择父节点
        const parentIds = getParentNodeIds(node)
        parentIds.forEach((parentId) => {
          const parentNode = findNodeById(parentId)
          if (parentNode && parentNode.children) {
            // 只有当父节点的所有子节点都被选中时，才选择父节点
            const allChildrenSelected = parentNode.children.every(child =>
              tempSelectedKeys.value.includes(child.id),
            )
            if (allChildrenSelected && !tempSelectedKeys.value.includes(parentId)) {
              tempSelectedKeys.value.push(parentId)
            }
          }
        })
      }
    }

    updateSelectedNodes()
    const result = [...tempSelectedKeys.value]
    emit('update:modelValue', result)
    emit('change', result)

    // 如果不是多选，则关闭下拉菜单
    if (!props.multiple) {
      isOpen.value = false
    }
  }
  else {
    // 单选模式
    tempSelectedKeys.value = [nodeId]
    updateSelectedNodes()
    emit('update:modelValue', nodeId)
    emit('change', nodeId)
    isOpen.value = false
  }
}

function updateSelectedNodes() {
  selectedNodes.value = tempSelectedKeys.value
    .map(id => findNodeById(id))
    .filter(Boolean) as ITreeNode[]
}

function handleNodeExpand(nodeId: string | number) {
  const index = expandedKeys.value.indexOf(nodeId)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  }
  else {
    expandedKeys.value.push(nodeId)
  }
}

function expandAll() {
  const keys: (string | number)[] = []
  const collectExpandableIds = (nodes: ITreeNode[]) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length) {
        keys.push(node.id)
        collectExpandableIds(node.children)
      }
    })
  }
  collectExpandableIds(props.data)
  expandedKeys.value = keys
}

function collapseAll() {
  expandedKeys.value = []
}

function handleSearch() {
  if (props.remoteMethod) {
    props.remoteMethod(searchValue.value)
  }
  emit('searchChange', searchValue.value)
}

function clearSelection() {
  selectedNodes.value = []
  tempSelectedKeys.value = []
  emit('update:modelValue', props.multiple ? [] : '')
  emit('change', props.multiple ? [] : '')
  emit('clear')
}

function renderTree(nodes: ITreeNode[], level = 0): VNode[] {
  if (!nodes || !nodes.length)
    return []

  return nodes.map((node): VNode => {
    const isExpanded = expandedKeys.value.includes(node.id)
    const isSelected = tempSelectedKeys.value.includes(node.id)
    const hasChildren = node.children && node.children.length > 0
    const _isLeaf = !hasChildren

    // 判断是否显示该节点（搜索过滤）
    let showNode = true
    if (searchValue.value && props.filterable) {
      showNode = node.label.toLowerCase().includes(searchValue.value.toLowerCase())

      // 如果节点不匹配但有子节点，需要检查子节点是否匹配
      if (!showNode && hasChildren) {
        const hasMatchingChild = node.children!.some(child =>
          child.label.toLowerCase().includes(searchValue.value.toLowerCase()),
        )
        showNode = hasMatchingChild
      }
    }

    if (!showNode)
      return h('div') // 返回空div而不是null

    return h('div', { class: 'tree-node' }, [
      h('div', {
        class: [
          'flex items-center py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
          isSelected ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : '',
          node.disabled ? 'opacity-50 cursor-not-allowed' : '',
        ],
        style: { paddingLeft: `${level * props.indent}px` },
        onClick: () => {
          if (!node.disabled) {
            handleNodeSelect(node.id)
          }
        },
      }, [
        // 展开/折叠图标
        hasChildren
          ? h('span', {
              class: 'mr-1 w-5 flex-none transition-transform duration-200',
              style: isExpanded ? 'transform: rotate(90deg)' : '',
              onClick: (e: Event) => {
                e.stopPropagation()
                handleNodeExpand(node.id)
              },
            }, [
              h('ui-icon', { icon: 'carbon:chevron-right' }),
            ])
          : h('span', { class: 'mr-1 w-5 flex-none' }),

        // 复选框（如果启用）
        props.checkable
          ? h('span', {
              class: 'mr-2 flex-none',
              onClick: (e: Event) => {
                e.stopPropagation()
                handleNodeSelect(node.id)
              },
            }, [
              h('div', {
                class: [
                  'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                  isSelected
                    ? 'bg-primary-500 border-primary-500 dark:bg-primary-600 dark:border-primary-600'
                    : 'border-gray-300 dark:border-gray-600',
                  node.disabled ? 'opacity-50' : '',
                ],
              }, isSelected
                ? [h('ui-icon', {
                    icon: 'carbon:checkmark',
                    class: 'text-white text-xs',
                  })]
                : []),
            ])
          : null,

        // 节点图标
        props.showIcon && node.icon
          ? h('span', {
              class: 'mr-1 flex-none',
            }, [
              h('ui-icon', { icon: node.icon }),
            ])
          : null,

        // 节点标签
        props.renderLabel
          ? h('div', { class: 'flex-grow truncate' }, [props.renderLabel(node)])
          : h('span', { class: 'flex-grow truncate' }, node.label),
      ]),

      // 子节点
      isExpanded && hasChildren
        ? h('div', {
            class: 'tree-node-children',
          }, renderTree(node.children!, level + 1))
        : null,
    ])
  })
}

// 监听props
watch(() => props.modelValue, (newValue) => {
  if (newValue === undefined || newValue === null) {
    selectedNodes.value = []
    tempSelectedKeys.value = []
    return
  }

  if (props.multiple && Array.isArray(newValue)) {
    tempSelectedKeys.value = [...newValue]
  }
  else if (newValue) {
    // 确保类型正确
    tempSelectedKeys.value = [newValue as string | number]
  }
  else {
    tempSelectedKeys.value = []
  }

  updateSelectedNodes()
}, { immediate: true })

// 生命周期钩子
onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleDocumentClick)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>

<template>
  <div class="ui-tree-select relative w-full">
    <!-- 选择器输入框 -->
    <div
      ref="inputRef"
      class="w-full flex cursor-pointer items-center border rounded px-3 transition-colors duration-150" :class="[
        sizeClass,
        isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-70 dark:bg-gray-800' : 'bg-white dark:bg-gray-900',
        error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700',
        isOpen ? 'border-primary-500 dark:border-primary-400' : '',
      ]"
      :style="width ? `width: ${width}` : ''"
      @click="toggleDropdown"
    >
      <!-- 多选标签展示 -->
      <div v-if="multiple && selectedNodes.length > 0" class="flex flex-grow flex-wrap gap-1 py-1">
        <template v-if="collapseTags && selectedNodes.length > maxCollapseTagCount">
          <!-- 折叠显示标签模式 -->
          <ui-tag
            v-for="node in selectedNodes.slice(0, maxCollapseTagCount)"
            :key="node.id"
            :type="tagType"
            :closable="!isDisabled && clearable"
            size="small"
            @close.stop="handleNodeSelect(node.id)"
          >
            {{ node.label }}
          </ui-tag>
          <ui-tag :type="tagType" size="small">
            +{{ selectedNodes.length - maxCollapseTagCount }}
          </ui-tag>
        </template>
        <template v-else>
          <!-- 全部显示标签模式 -->
          <ui-tag
            v-for="node in selectedNodes"
            :key="node.id"
            :type="tagType"
            :closable="!isDisabled && clearable"
            size="small"
            @close.stop="handleNodeSelect(node.id)"
          >
            {{ node.label }}
          </ui-tag>
        </template>
      </div>

      <!-- 单选文本展示 -->
      <div v-else class="flex-grow truncate">
        {{ displayText || placeholder }}
      </div>

      <!-- 操作图标 -->
      <div class="ml-2 flex items-center">
        <ui-icon
          v-if="clearable && selectedNodes.length > 0 && !isDisabled"
          icon="carbon:close-filled"
          class="mr-1 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          @click.stop="clearSelection"
        />
        <ui-icon
          icon="carbon:chevron-down"
          class="text-gray-400 transition-transform dark:text-gray-500"
          :class="isOpen ? 'transform rotate-180' : ''"
        />
      </div>
    </div>

    <!-- 下拉面板 -->
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="absolute z-50 mt-1 w-full border border-gray-200 rounded bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800" :class="[
        placement === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
      ]"
      :style="{ maxHeight, overflow: 'auto' }"
    >
      <!-- 搜索框 -->
      <div v-if="filterable" class="border-b border-gray-200 p-2 dark:border-gray-700">
        <div class="relative">
          <ui-icon
            icon="carbon:search"
            class="absolute left-2 top-1/2 transform text-gray-400 -translate-y-1/2 dark:text-gray-500"
          />
          <input
            v-model="searchValue"
            type="text"
            class="w-full border border-gray-300 rounded py-1.5 pl-8 pr-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="搜索..."
            @input="handleSearch"
          >
        </div>
      </div>

      <!-- 展开/折叠按钮 -->
      <div v-if="showExpandButtons" class="flex border-b border-gray-200 p-2 dark:border-gray-700">
        <button
          class="mr-2 rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="expandAll"
        >
          展开所有
        </button>
        <button
          class="rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="collapseAll"
        >
          折叠所有
        </button>
      </div>

      <!-- 加载中状态 -->
      <div
        v-if="loading"
        class="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400"
      >
        <ui-icon icon="carbon:circle-dash" class="mr-2 animate-spin" />
        {{ loadingText }}
      </div>

      <!-- 空数据状态 -->
      <div
        v-else-if="!filteredData.length"
        class="p-4 text-center text-gray-500 dark:text-gray-400"
      >
        {{ searchValue ? noMatchText : noDataText }}
      </div>

      <!-- 树结构内容 -->
      <div v-else class="p-2">
        <component :is="renderTree(filteredData)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-node-children {
  transition: height 0.3s ease;
}
</style>
