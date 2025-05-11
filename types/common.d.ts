/**
 * 通用类型定义
 * 创建日期: 2024-09-11
 * 更新日期: 2024-09-12 - 添加 IOverflowItem 接口
 */

/**
 * 折叠列表项接口
 */
export interface IOverflowItem {
  /**
   * 项目唯一标识
   */
  [key: string]: any
}

/**
 * 锚点链接接口
 */
export interface IAnchorLink {
  /**
   * 链接ID
   */
  id: string
  /**
   * 链接标题
   */
  title: string
  /**
   * 链接href
   */
  href?: string
  /**
   * 子链接
   */
  children?: IAnchorLink[]
}

/**
 * 上传文件接口
 */
export interface IUploadFile {
  /**
   * 文件ID
   */
  uid: string
  /**
   * 文件名
   */
  name: string
  /**
   * 文件大小
   */
  size: number
  /**
   * 文件类型
   */
  type: string
  /**
   * 文件状态
   */
  status: 'ready' | 'uploading' | 'success' | 'error'
  /**
   * 文件URL
   */
  url?: string
  /**
   * 上传进度
   */
  percent?: number
  /**
   * 错误信息
   */
  error?: string
  /**
   * 服务器响应数据
   */
  response?: any
  /**
   * 原始文件对象
   */
  raw?: File
}

/**
 * 卡片组件属性接口
 */
export interface ICardProps {
  /**
   * 卡片标题
   */
  title?: string
  /**
   * 卡片副标题
   */
  subtitle?: string
  /**
   * 是否显示阴影
   */
  shadow?: 'always' | 'hover' | 'never'
  /**
   * 卡片背景色
   */
  bgColor?: string
  /**
   * 卡片边框颜色
   */
  borderColor?: string
  /**
   * 卡片圆角
   */
  radius?: string
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 卡片头部样式
   */
  headerStyle?: Record<string, string>
  /**
   * 卡片内容样式
   */
  bodyStyle?: Record<string, string>
  /**
   * 卡片额外样式
   */
  extraStyle?: Record<string, string>
}

/**
 * 徽章组件属性接口
 */
export interface IBadgeProps {
  /**
   * 显示的数值
   */
  value?: number | string
  /**
   * 最大数值，超过显示为 {max}+
   */
  max?: number
  /**
   * 是否显示小红点
   */
  dot?: boolean
  /**
   * 自定义内容
   */
  content?: string
  /**
   * 是否隐藏徽章
   */
  hidden?: boolean
  /**
   * 类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * 徽章位置
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /**
   * 自定义徽章的颜色
   */
  color?: string
  /**
   * 是否为独立的徽章，不依附于其他元素
   */
  standalone?: boolean
}

/**
 * 调整大小盒子属性接口
 */
export interface IResizeBoxProps {
  /**
   * 初始宽度
   */
  width?: number | string
  /**
   * 初始高度
   */
  height?: number | string
  /**
   * 可调整的方向
   */
  directions?: Array<'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft'>
  /**
   * 最小宽度
   */
  minWidth?: number
  /**
   * 最小高度
   */
  minHeight?: number
  /**
   * 最大宽度
   */
  maxWidth?: number
  /**
   * 最大高度
   */
  maxHeight?: number
}

/**
 * 日历组件属性接口
 */
export interface ICalendarProps {
  /**
   * 绑定值
   */
  modelValue?: Date
  /**
   * 日期范围
   */
  range?: [Date, Date]
  /**
   * 日历类型
   */
  type?: 'month' | 'year' | 'week'
  /**
   * 是否显示当前时间
   */
  showToday?: boolean
  /**
   * 是否显示周数
   */
  showWeekNumber?: boolean
  /**
   * 一周的第一天
   */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /**
   * 日历事件
   */
  events?: Array<{
    date: Date
    title: string
    type?: string
    content?: string
  }>
}

/**
 * 下拉菜单项接口
 */
export interface IMenuItem {
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
  children?: IMenuItem[]
  /**
   * 点击菜单项的回调函数
   */
  onClick?: (item: IMenuItem) => void
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
