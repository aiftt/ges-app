/**
 * 菜单项类型
 */
export interface MenuItem {
  /**
   * 菜单项的键，用于识别菜单项
   */
  key: string | number
  /**
   * 菜单项的显示文本
   */
  label: string
  /**
   * 菜单项的图标
   */
  icon?: string
  /**
   * 是否禁用菜单项
   */
  disabled?: boolean
  /**
   * 是否是危险操作
   */
  danger?: boolean
  /**
   * 菜单项的类型，divider 表示分割线
   */
  type?: 'divider'
  /**
   * 子菜单项
   */
  children?: MenuItem[]
  /**
   * 点击菜单项的回调函数
   */
  onClick?: (item: MenuItem) => void
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 自定义样式
   */
  style?: Record<string, string>
  /**
   * 额外的数据
   */
  [key: string]: any
}
