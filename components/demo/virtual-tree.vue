<script setup lang="ts">
/**
 * 虚拟树演示组件
 * 创建日期: 2024-08-30
 * 作者: [Claude]
 */
import type { IVirtualTreeNode } from '~/components/ui/virtual/tree.vue'
import { computed, ref, watch } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 控制状态
const virtualEnabled = ref(true)
const showCheckbox = ref(true)
const expandAll = ref(false)
const selectedNode = ref<string | number>()
const currentNode = ref<IVirtualTreeNode | null>(null)
const treeData = ref<IVirtualTreeNode[]>([])
const renderTime = ref(0)
const checkedNodes = ref<IVirtualTreeNode[]>([])

// 生成树节点
function generateData(count: number) {
  const startTime = Date.now()

  const data: IVirtualTreeNode[] = []
  const maxDepth = 5 // 最大深度

  // 递归生成树节点
  function generateNodes(parentId: string, depth: number, maxNodes: number): IVirtualTreeNode[] {
    if (depth >= maxDepth)
      return []

    const nodes: IVirtualTreeNode[] = []
    const nodesCount = Math.min(
      Math.floor(Math.random() * 5) + 1, // 每个节点下1-5个子节点
      maxNodes,
    )

    for (let i = 0; i < nodesCount; i++) {
      const id = `${parentId}-${i}`
      const hasChildren = depth < maxDepth - 1 && Math.random() > 0.3

      const node: IVirtualTreeNode = {
        id,
        label: `节点 ${id}`,
        children: hasChildren ? generateNodes(id, depth + 1, Math.floor(maxNodes / nodesCount)) : [],
      }

      nodes.push(node)
    }

    return nodes
  }

  // 生成根节点
  for (let i = 0; i < Math.min(10, count / 10); i++) {
    const rootId = `root-${i}`
    const subNodesCount = Math.floor(count / 10)

    data.push({
      id: rootId,
      label: `根节点 ${i + 1}`,
      children: generateNodes(rootId, 1, subNodesCount),
    })
  }

  treeData.value = data
  renderTime.value = Date.now() - startTime
  checkedNodes.value = []
  currentNode.value = null
}

// 统计总节点数
const totalNodes = computed(() => {
  let count = 0

  function countNodes(nodes: IVirtualTreeNode[]) {
    count += nodes.length

    for (const node of nodes) {
      if (node.children && node.children.length) {
        countNodes(node.children)
      }
    }
  }

  countNodes(treeData.value)
  return count
})

// 获取节点层级
function getNodeLevel(nodeId: string | number): number {
  const parts = String(nodeId).split('-')
  return parts.length - 1
}

// 查找节点
function findNode(id: string | number, nodes: IVirtualTreeNode[] = treeData.value): IVirtualTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }

    if (node.children && node.children.length) {
      const found = findNode(id, node.children)
      if (found)
        return found
    }
  }

  return null
}

// 处理节点点击
function handleNodeClick(node: IVirtualTreeNode) {
  currentNode.value = node
}

// 处理节点展开
function handleNodeExpand(node: IVirtualTreeNode) {
  const logger = useLogger('virtual-tree-demo')
  logger.info('节点展开', node.label)
}

// 处理节点勾选状态变化
function handleCheckChange(node: IVirtualTreeNode, checked: boolean) {
  const logger = useLogger('virtual-tree-demo')
  logger.info('节点勾选状态变化', node.label, checked)

  // 更新勾选节点列表
  if (checked) {
    checkedNodes.value.push(node)
  }
  else {
    checkedNodes.value = checkedNodes.value.filter(n => n.id !== node.id)
  }
}

// 监听选中节点变化
watch(selectedNode, (newValue) => {
  if (newValue) {
    currentNode.value = findNode(newValue)
  }
  else {
    currentNode.value = null
  }
})

// 初始化
generateData(1000)
</script>

<template>
  <div class="demo-container">
    <div class="demo-controls">
      <div class="control-group">
        <label>数据量:</label>
        <button @click="generateData(100)">
          100节点
        </button>
        <button @click="generateData(1000)">
          1000节点
        </button>
        <button @click="generateData(10000)">
          10000节点
        </button>
      </div>
      <div class="control-group">
        <label>虚拟滚动:</label>
        <input v-model="virtualEnabled" type="checkbox">
        <span class="checkbox-label">{{ virtualEnabled ? '开启' : '关闭' }}</span>
      </div>
      <div class="control-group">
        <label>复选框:</label>
        <input v-model="showCheckbox" type="checkbox">
        <span class="checkbox-label">{{ showCheckbox ? '显示' : '隐藏' }}</span>
      </div>
      <div class="control-group">
        <label>展开所有:</label>
        <input v-model="expandAll" type="checkbox">
        <span class="checkbox-label">{{ expandAll ? '是' : '否' }}</span>
      </div>
    </div>

    <div class="split-container">
      <div class="tree-container">
        <ui-virtual-tree
          v-model="selectedNode"
          :data="treeData"
          :show-checkbox="showCheckbox"
          :default-expand-all="expandAll"
          height="500px"
          :virtual="{
            nodeHeight: 32,
            buffer: 10,
            enabled: virtualEnabled,
            threshold: 100,
          }"
          highlight-current
          @node-click="handleNodeClick"
          @node-expand="handleNodeExpand"
          @check-change="handleCheckChange"
        />
      </div>

      <div class="info-panel">
        <h3>节点信息</h3>
        <div class="stats">
          <div>总节点数: {{ totalNodes }}</div>
          <div>生成耗时: {{ renderTime }}ms</div>
          <div>勾选节点数: {{ checkedNodes.length }}</div>
        </div>

        <div v-if="currentNode" class="node-details">
          <h4>当前节点详情</h4>
          <div class="detail-item">
            <label>ID:</label>
            <span>{{ currentNode.id }}</span>
          </div>
          <div class="detail-item">
            <label>名称:</label>
            <span>{{ currentNode.label }}</span>
          </div>
          <div class="detail-item">
            <label>层级:</label>
            <span>{{ getNodeLevel(currentNode.id) }}</span>
          </div>
          <div class="detail-item">
            <label>子节点数:</label>
            <span>{{ currentNode.children?.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--ui-color-bg-1);
  border-radius: 4px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;

  label {
    font-weight: 500;
  }

  button {
    padding: 4px 12px;
    border: 1px solid var(--ui-color-border);
    border-radius: 4px;
    background-color: var(--ui-color-bg-0);
    cursor: pointer;

    &:hover {
      background-color: var(--ui-color-bg-1);
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  .checkbox-label {
    font-size: 14px;
  }
}

.split-container {
  display: flex;
  gap: 20px;
  height: 500px;
}

.tree-container {
  flex: 1;
  border: 1px solid var(--ui-color-border);
  border-radius: 4px;
  overflow: hidden;
}

.info-panel {
  width: 300px;
  padding: 16px;
  background-color: var(--ui-color-bg-1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  h4 {
    margin: 0 0 12px;
    font-size: 16px;
  }
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.node-details {
  padding: 12px;
  background-color: var(--ui-color-bg-0);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  label {
    font-weight: 500;
    width: 80px;
  }
}
</style>
