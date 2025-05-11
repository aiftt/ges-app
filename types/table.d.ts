/**
 * 表格和虚拟滚动相关的类型定义
 * 创建日期: 2024-09-11
 * 更新日期: 2024-09-12 - 完善 TableColumn 接口，添加缺少的属性
 */

/**
 * 虚拟表格列配置
 */
export interface IVirtualTableColumn {
  /**
   * 列标识
   */
  key: string
  /**
   * 列标题
   */
  title: string
  /**
   * 列宽度
   */
  width?: number | string
  /**
   * 最小列宽
   */
  minWidth?: number
  /**
   * 是否固定在左侧
   */
  fixed?: 'left' | 'right' | boolean
  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 自定义单元格样式
   */
  cellClass?: string | ((row: any, column: IVirtualTableColumn, rowIndex: number) => string)
  /**
   * 自定义表头样式
   */
  headerClass?: string
  /**
   * 是否可排序
   */
  sortable?: boolean
  /**
   * 是否可筛选
   */
  filterable?: boolean
  /**
   * 自定义渲染函数
   */
  render?: (row: any, column: IVirtualTableColumn, rowIndex: number) => any
}

/**
 * 虚拟表格配置
 */
export interface IVirtualTableConfig {
  /**
   * 行高(px)
   */
  rowHeight: number
  /**
   * 表头高度(px)
   */
  headerHeight?: number
  /**
   * 缓冲区域行数
   */
  buffer?: number
  /**
   * 是否启用虚拟滚动
   */
  enabled?: boolean
  /**
   * 虚拟滚动激活的最小行数
   */
  threshold?: number
}

/**
 * 普通表格列配置
 */
export interface TableColumn {
  /**
   * 字段名称
   */
  prop: string
  /**
   * 列标题
   */
  label: string
  /**
   * 列宽度
   */
  width?: number | string
  /**
   * 最小列宽
   */
  minWidth?: number | string
  /**
   * 是否固定
   */
  fixed?: boolean | 'left' | 'right'
  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 表头对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right'
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 表头自定义类名
   */
  headerClassName?: string
  /**
   * 是否可排序
   */
  sortable?: boolean
  /**
   * 排序方法
   */
  sortMethod?: (a: any, b: any) => number
  /**
   * 排序依据
   */
  sortBy?: string | string[] | ((row: any) => any)
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * 格式化函数
   */
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => any
  /**
   * 是否可筛选
   */
  filterable?: boolean
  /**
   * 筛选选项
   */
  filters?: { text: string, value: any }[]
  /**
   * 插槽名称
   */
  slot?: string
  /**
   * 表头插槽名称
   */
  headerSlot?: string
  /**
   * 是否可调整宽度
   */
  resizable?: boolean
  /**
   * 是否显示溢出提示
   */
  showOverflowTooltip?: boolean
  /**
   * 索引计算函数
   */
  index?: (index: number) => number | string
  /**
   * 复选框列是否可选中
   */
  selectable?: (row: any, index: number) => boolean
  /**
   * 是否是默认展开所有子行
   */
  defaultExpandAll?: boolean
  /**
   * 行的键值
   */
  rowKey?: string
  /**
   * 展开行的渲染方式
   */
  expandColumnKey?: string
  /**
   * 子节点属性
   */
  childrenKey?: string
}
