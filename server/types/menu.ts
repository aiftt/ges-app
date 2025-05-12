/**
 * 菜单相关类型定义
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

/**
 * 菜单状态
 */
export type MenuStatus = 'active' | 'disabled'

/**
 * 菜单类型
 */
export type MenuType = 'menu' | 'button'

/**
 * 菜单接口
 */
export interface IMenu {
  _id: string
  parentId: string // 父菜单ID，顶级菜单为''
  name: string // 菜单名称
  path: string // 路由路径
  component?: string // 组件路径
  redirect?: string // 重定向路径
  icon?: string // 图标
  orderNum: number // 排序号
  type: MenuType // 菜单类型：菜单或按钮
  permission?: string // 权限标识
  status: MenuStatus // 状态
  visible: boolean // 是否可见
  keepAlive: boolean // 是否缓存
  createTime: Date
  updateTime: Date
}

/**
 * 创建菜单请求
 */
export interface ICreateMenuRequest {
  parentId: string
  name: string
  path: string
  component?: string
  redirect?: string
  icon?: string
  orderNum?: number
  type: MenuType
  permission?: string
  status?: MenuStatus
  visible?: boolean
  keepAlive?: boolean
}

/**
 * 更新菜单请求
 */
export interface IUpdateMenuRequest {
  parentId?: string
  name?: string
  path?: string
  component?: string
  redirect?: string
  icon?: string
  orderNum?: number
  type?: MenuType
  permission?: string
  status?: MenuStatus
  visible?: boolean
  keepAlive?: boolean
}

/**
 * 菜单树节点
 */
export interface IMenuTreeNode extends IMenu {
  children?: IMenuTreeNode[]
}
