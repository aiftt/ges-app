/**
 * 树组件相关的类型定义
 * 创建日期: 2024-09-11
 * 更新日期: 2024-09-12 - 完善 ITreeNode 接口，添加 selected 属性
 */

/**
 * 树节点接口
 */
export interface ITreeNode {
  /**
   * 节点ID
   */
  id: string | number
  /**
   * 节点标签
   */
  label: string
  /**
   * 子节点
   */
  children?: ITreeNode[]
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否是叶子节点
   */
  isLeaf?: boolean
  /**
   * 节点图标
   */
  icon?: string
  /**
   * 是否选中
   */
  checked?: boolean
  /**
   * 是否展开
   */
  expanded?: boolean
  /**
   * 是否被选中(单选模式)
   */
  selected?: boolean
  /**
   * 自定义数据
   */
  data?: any
}

/**
 * 虚拟树节点接口
 */
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

/**
 * 虚拟树配置接口
 */
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

/**
 * 展平的虚拟树节点
 */
export interface IFlatTreeNode {
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
