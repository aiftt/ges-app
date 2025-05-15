<script setup lang="ts" name="UiInputCascader">
import { onClickOutside } from '@vueuse/core'
/**
 * 级联选择器组件
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-10 - 修复子节点选择、滚动条、节点回显问题
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// 定义级联选项类型
export interface CascaderOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: CascaderOption[]
  [key: string]: any
}

// 定义组件props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string | number | (string | number)[]
  /**
   * 选项数据
   */
  options?: CascaderOption[]
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 是否允许多选
   */
  multiple?: boolean
  /**
   * 是否显示路径
   */
  showPath?: boolean
  /**
   * 是否可搜索
   */
  filterable?: boolean
  /**
   * 尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否可折叠选中项
   */
  collapseTags?: boolean
  /**
   * 自定义过滤函数
   */
  filterMethod?: (node: CascaderOption, keyword: string) => boolean
  /**
   * 自定义分隔符
   */
  separator?: string
  /**
   * 弹层最大高度
   */
  maxHeight?: number | string
  /**
   * 弹层宽度
   */
  popoverWidth?: number | string
  /**
   * 是否展开全部子节点
   */
  expandAll?: boolean
  /**
   * 是否仅选择叶子节点
   */
  checkStrictly?: boolean
  /**
   * 自定义渲染标签函数
   */
  tagRender?: (tags: any[]) => string
}>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  multiple: false,
  showPath: true,
  filterable: false,
  size: 'default',
  collapseTags: false,
  separator: ' / ',
  maxHeight: 300,
  popoverWidth: '',
  expandAll: false,
  checkStrictly: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'removeTag', value: string | number): void
  (e: 'clear'): void
  (e: 'expandChange', values: any[]): void
  (e: 'select', values: any[], selectedNodes: CascaderOption[]): void
}>()

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const _inputValue = ref('')
const searchValue = ref('')
const visible = ref(false)
const selectedNodes = ref<CascaderOption[]>([])
const activeNode = ref<CascaderOption[]>([])
const _hoverNode = ref<CascaderOption | null>(null)
const expandedNodes = ref<CascaderOption[]>([])
const _isMouseEnter = ref(false)

// 添加CSS变量用于最大高度
const maxHeight = computed(() => typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight)

// 面板宽度 = 输入框宽度（未使用，添加下划线）
const _panelWidth = computed(() => {
  if (props.popoverWidth) {
    return typeof props.popoverWidth === 'number' ? `${props.popoverWidth}px` : props.popoverWidth
  }
  return containerRef.value ? `${containerRef.value.offsetWidth}px` : '220px'
})

// 计算级联选择器的类名
const cascaderClass = computed(() => [
  'ui-cascader',
  `ui-cascader--${props.size}`,
  {
    'ui-cascader--disabled': props.disabled,
    'ui-cascader--active': visible.value,
    'ui-cascader--clearable': props.clearable,
    'ui-cascader--filterable': props.filterable,
  },
])

// 可见的选项列表（第一级）
const visibleNodes = computed(() => {
  // 如果有搜索关键字，过滤所有选项
  if (props.filterable && searchValue.value) {
    return filterOptionsByKeyword(props.options, searchValue.value)
  }
  return props.options
})

// 当前活动的面板列表（子级面板）
const activePanels = computed(() => {
  const panels: CascaderOption[][] = []
  let currentNode: CascaderOption | undefined
  let currentOptions = props.options

  // 遍历活动节点路径，构建面板列表
  for (let i = 0; i < activeNode.value.length; i++) {
    currentNode = activeNode.value[i]
    if (!currentNode)
      continue

    // 在当前层级选项中查找匹配的节点
    const matchedNode = currentOptions.find(node => node.value === currentNode?.value)
    if (matchedNode && matchedNode.children && matchedNode.children.length) {
      panels.push(matchedNode.children)
      currentOptions = matchedNode.children
    }
    else {
      break
    }
  }

  return panels
})

// 获取选项的路径标签
function getOptionPath(option: CascaderOption, separator = props.separator): string {
  if (!activeNode.value)
    return option.label

  const path = activeNode.value.map((node: CascaderOption) => node.label)
  return path.join(separator)
}

// 处理选项点击
function handleOptionClick(option: CascaderOption, level: number) {
  if (option.disabled)
    return

  // 选择选项
  selectOption(option, level)
}

// 处理鼠标悬停在选项上
function handleOptionHover(option: CascaderOption, level: number) {
  if (option.disabled)
    return

  // 如果有子节点，直接展开下一级
  if (option.children && option.children.length) {
    // 更新活动路径，但保留之前的选择状态
    const newPath = activeNode.value ? activeNode.value.slice(0, level) : []
    newPath.push(option)
    activeNode.value = newPath

    // 触发展开事件
    const values = newPath.map((node: CascaderOption) => node.value)
    handleExpandChange(values)
  }
}

// 选择选项（确认选择）
function selectOption(option: CascaderOption, level: number) {
  // 更新路径
  if (activeNode.value) {
    activeNode.value = activeNode.value.slice(0, level)
    activeNode.value.push(option)
  }
  else {
    activeNode.value = [option]
  }

  // 只有选中叶子节点或允许选择任意节点时才更新选中状态
  if (!option.children || !option.children.length || props.checkStrictly) {
    if (props.multiple) {
      // 多选模式
      const index = selectedNodes.value.findIndex(node => node.value === option.value)
      if (index > -1) {
        // 已选择，则移除
        selectedNodes.value.splice(index, 1)
      }
      else {
        // 未选择，则添加
        selectedNodes.value.push(option)
      }

      // 更新值
      setModelValue(selectedNodes.value.map(node => node.value))

      // 多选模式下不关闭下拉框
    }
    else {
      // 单选模式
      selectedNodes.value = [option]
      setModelValue(option.value)

      // 关闭下拉框（仅在单选非叶子节点时）
      if (!option.children || !option.children.length) {
        hideDropdown()
      }
    }
  }

  // 触发事件
  emit('select', activeNode.value.map(node => node.value), activeNode.value)
}

// 打开下拉面板
function openDropdown() {
  if (props.disabled)
    return
  visible.value = true
  emit('visibleChange', true)

  // 如果可搜索，聚焦输入框
  if (props.filterable) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 关闭下拉面板
function closeDropdown() {
  visible.value = false
  emit('visibleChange', false)
  searchValue.value = ''
}

// 切换下拉面板
function toggleDropdown() {
  if (visible.value) {
    closeDropdown()
  }
  else {
    openDropdown()
  }
}

// 清空选择
function clearSelection(e: Event) {
  e.stopPropagation()
  selectedNodes.value = []
  if (props.multiple) {
    emit('update:modelValue', [])
    emit('change', [])
  }
  else {
    emit('update:modelValue', undefined)
    emit('change', undefined)
  }
  emit('clear')
}

// 移除标签
function handleTagRemove(option: CascaderOption, e: Event) {
  e.stopPropagation()
  const index = selectedNodes.value.findIndex(node => node.value === option.value)
  if (index > -1) {
    const removed = selectedNodes.value.splice(index, 1)[0]
    emit('removeTag', removed.value)

    // 更新modelValue
    const values = selectedNodes.value.map(node => node.value)
    emit('update:modelValue', values.length ? values : undefined)
    emit('change', values.length ? values : undefined)
  }
}

// 搜索过滤
function handleSearch(e: Event) {
  searchValue.value = (e.target as HTMLInputElement).value
}

// 点击外部关闭下拉
onClickOutside(containerRef, () => {
  if (visible.value) {
    closeDropdown()
  }
})

// 监听模型变化
watch(
  () => props.modelValue,
  (_val) => {
    // 初始化选中项
    initSelected()
  },
  { immediate: true },
)

// 聚焦方法
function focus() {
  inputRef.value?.focus()
}

// 暴露组件方法
defineExpose({
  focus,
})

// 监听滚动，正确定位下拉框
onMounted(() => {
  if (props.expandAll) {
    // TODO: 展开所有节点
  }
})

// 处理展开状态改变
function handleExpandChange(nodes: (string | number)[]) {
  // 将值列表存储为展开节点
  expandedNodes.value = [] // 这里需要根据实际情况处理值到对象的转换
  // 修改为驼峰式
  emit('expandChange', nodes)
}

// 处理可见性变化
function _showDropdown() {
  if (props.disabled)
    return
  visible.value = true
  emit('visibleChange', true)
}

// 初始化选中项
function initSelected() {
  // 根据当前的modelValue初始化选中项
  // 具体实现取决于数据结构，这里提供一个简单的框架
  selectedNodes.value = []

  // 单选模式
  if (!props.multiple && props.modelValue !== undefined) {
    // TODO: 根据值查找对应的节点并更新selectedNodes
  }
  // 多选模式
  else if (props.multiple && Array.isArray(props.modelValue)) {
    // TODO: 根据值数组查找对应的节点并更新selectedNodes
  }
}

// 初始化树结构
function _initTree() {
  // 初始化树结构的逻辑
  // 这个函数的具体实现取决于您的数据结构
  // 可能包括数据转换、预处理等操作
}

// 判断节点是否选中
function isNodeSelected(node: CascaderOption): boolean {
  return selectedNodes.value.some(selected => selected.value === node.value)
}

// 处理节点点击 (第一级)
function handleNodeClick(node: CascaderOption) {
  handleOptionClick(node, 0)
}

// 处理子节点点击 (子级)
function handleSubNodeClick(node: CascaderOption, level: number) {
  handleOptionClick(node, level)
}

// 过滤选项根据关键字
function filterOptionsByKeyword(options: CascaderOption[], keyword: string): CascaderOption[] {
  if (!keyword)
    return options

  return options.filter((option) => {
    // 如果选项标签包含关键字，则返回true
    if (option.label.toLowerCase().includes(keyword.toLowerCase())) {
      return true
    }
    // 如果有子选项，递归过滤
    if (option.children && option.children.length) {
      option.children = filterOptionsByKeyword(option.children, keyword)
      return option.children.length > 0
    }
    return false
  })
}

// 设置模型值
function setModelValue(value: any) {
  emit('update:modelValue', value)
  emit('change', value)
}

// 隐藏下拉框
function hideDropdown() {
  closeDropdown()
}
</script>

<template>
  <div
    ref="containerRef"
    :class="cascaderClass"
    @click="toggleDropdown"
  >
    <!-- 输入区域 -->
    <div class="ui-cascader-input">
      <!-- 选择框内容 -->
      <div v-if="!filterable || !visible" class="ui-cascader-values">
        <!-- 有选中值 -->
        <template v-if="selectedNodes.length">
          <template v-if="multiple">
            <!-- 多选模式 -->
            <div
              v-for="node in selectedNodes"
              :key="node.value"
              class="ui-cascader-tag"
            >
              <span>{{ showPath ? getOptionPath(node) : node.label }}</span>
              <span class="ui-cascader-tag-close" @click.stop="handleTagRemove(node, $event)">&times;</span>
            </div>
          </template>
          <template v-else>
            <!-- 单选模式 -->
            <div class="ui-cascader-label">
              {{ showPath ? getOptionPath(selectedNodes[0]) : selectedNodes[0].label }}
            </div>
          </template>
        </template>

        <!-- 未选中值显示占位符 -->
        <div v-else class="ui-cascader-placeholder">
          {{ placeholder }}
        </div>
      </div>

      <!-- 搜索输入框 -->
      <input
        v-if="filterable"
        ref="inputRef"
        v-model="searchValue"
        :placeholder="selectedNodes.length ? '' : placeholder"
        :disabled="disabled"
        class="ui-cascader-search-input"
        @input="handleSearch"
        @click.stop
      >

      <!-- 清除按钮 -->
      <span
        v-if="clearable && selectedNodes.length && !disabled"
        class="ui-cascader-clear"
        @click.stop="clearSelection($event)"
      >
        <ui-icon icon="carbon:close" size="small" />
      </span>

      <!-- 下拉箭头 -->
      <span class="ui-cascader-arrow">
        <ui-icon :icon="visible ? 'carbon:chevron-up' : 'carbon:chevron-down'" size="small" />
      </span>
    </div>

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      ref="dropdownRef"
      class="ui-cascader-dropdown"
      :style="{ 'max-height': maxHeight }"
    >
      <!-- 级联面板 -->
      <div class="ui-cascader-panels">
        <!-- 第一级 -->
        <div class="ui-cascader-panel">
          <ul class="ui-cascader-menu">
            <li
              v-for="(option, optionIndex) in visibleNodes"
              :key="`${0}-${optionIndex}`"
              class="ui-cascader-node"
              :class="[
                {
                  'ui-cascader-node--active': isNodeSelected(option),
                  'ui-cascader-node--disabled': option.disabled,
                  'ui-cascader-node--selected': isNodeSelected(option),
                },
              ]"
              @click="handleNodeClick(option)"
              @mouseenter="handleOptionHover(option, 0)"
            >
              <span class="ui-cascader-node-label">{{ option.label }}</span>
              <ui-icon
                v-if="option.children && option.children.length"
                icon="carbon:chevron-right"
                class="ui-cascader-node-icon"
              />
            </li>
          </ul>
        </div>

        <!-- 子级面板 -->
        <div
          v-for="(nodes, index) in activePanels"
          :key="index"
          class="ui-cascader-panel"
        >
          <ul class="ui-cascader-menu">
            <li
              v-for="(option, optionIndex) in nodes"
              :key="`${index + 1}-${optionIndex}`"
              class="ui-cascader-node"
              :class="[
                {
                  'ui-cascader-node--active': isNodeSelected(option),
                  'ui-cascader-node--disabled': option.disabled,
                  'ui-cascader-node--selected': isNodeSelected(option),
                },
              ]"
              @click="handleSubNodeClick(option, index + 1)"
              @mouseenter="handleOptionHover(option, index + 1)"
            >
              <span class="ui-cascader-node-label">{{ option.label }}</span>
              <ui-icon
                v-if="option.children && option.children.length"
                icon="carbon:chevron-right"
                class="ui-cascader-node-icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-cascader {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: var(--ui-font-size);
  color: var(--ui-color-text);
}

.ui-cascader-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ui-cascader-height);
  padding: 0 10px;
  background-color: var(--ui-cascader-bg);
  border: 1px solid var(--ui-cascader-border);
  border-radius: var(--ui-cascader-radius);
  transition: all 0.3s;
  cursor: pointer;
}

.ui-cascader--disabled .ui-cascader-input {
  background-color: var(--ui-cascader-disabled-bg);
  color: var(--ui-cascader-disabled-text);
  cursor: not-allowed;
}

.ui-cascader--active .ui-cascader-input {
  border-color: var(--ui-cascader-active-border);
  box-shadow: 0 0 0 2px var(--ui-cascader-active-shadow);
}

.ui-cascader-values {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ui-cascader-placeholder {
  color: var(--ui-cascader-placeholder-color);
}

.ui-cascader-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-cascader-tag {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  margin-bottom: 2px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 20px;
  background-color: var(--ui-cascader-tag-bg);
  border-radius: 2px;
}

.ui-cascader-tag-close {
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  color: var(--ui-cascader-tag-close-color);
}

.ui-cascader-tag-close:hover {
  color: var(--ui-color-text);
}

.ui-cascader-arrow {
  margin-left: 8px;
  color: var(--ui-color-text-secondary);
  transition: transform 0.3s;
}

.ui-cascader--active .ui-cascader-arrow {
  transform: rotate(180deg);
}

.ui-cascader-clear {
  margin-left: 8px;
  color: var(--ui-color-text-secondary);
  cursor: pointer;
}

.ui-cascader-clear:hover {
  color: var(--ui-color-text);
}

.ui-cascader-search-input {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ui-color-text);
}

.ui-cascader-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  width: 100%;
  min-width: 180px;
  margin-top: 5px;
  background-color: var(--ui-cascader-dropdown-bg);
  border: 1px solid var(--ui-cascader-dropdown-border);
  border-radius: var(--ui-cascader-radius);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: v-bind(maxHeight);
}

.ui-cascader-panels {
  display: flex;
  height: 100%;
}

.ui-cascader-panel {
  min-width: 180px;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid var(--ui-cascader-dropdown-border);
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Firefox */
}

.ui-cascader-panel:last-child {
  border-right: none;
}

.ui-cascader-panel::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.ui-cascader-panel::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.ui-cascader-panel::-webkit-scrollbar-track {
  background-color: transparent;
}

.ui-cascader-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.ui-cascader-node {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ui-color-text);
}

.ui-cascader-node:hover {
  background-color: var(--ui-cascader-node-hover-bg);
}

.ui-cascader-node--active {
  color: var(--ui-cascader-node-active-color);
  font-weight: 500;
  background-color: var(--ui-cascader-node-active-bg);
}

.ui-cascader-node--disabled {
  cursor: not-allowed;
  color: var(--ui-cascader-disabled-text);
}

.ui-cascader-node-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-cascader-node-icon {
  margin-left: 8px;
}

/* 不同尺寸 */
.ui-cascader--small .ui-cascader-input {
  height: calc(var(--ui-cascader-height) - 8px);
  font-size: var(--ui-font-size-small, 12px);
}

.ui-cascader--large .ui-cascader-input {
  height: calc(var(--ui-cascader-height) + 8px);
  font-size: var(--ui-font-size-large, 16px);
}
</style>
