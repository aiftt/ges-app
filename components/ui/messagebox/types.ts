/**
 * MessageBox组件类型定义
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 初始版本
 */

export type MessageBoxType = 'info' | 'success' | 'warning' | 'error' | 'confirm'

export interface MessageBoxOptions {
  /**
   * 消息内容
   */
  message: string
  /**
   * 标题
   */
  title?: string
  /**
   * 类型
   */
  type?: MessageBoxType
  /**
   * 是否显示关闭图标
   */
  showClose?: boolean
  /**
   * 是否显示取消按钮
   */
  showCancelButton?: boolean
  /**
   * 是否显示确认按钮
   */
  showConfirmButton?: boolean
  /**
   * 确认按钮文本
   */
  confirmButtonText?: string
  /**
   * 取消按钮文本
   */
  cancelButtonText?: string
  /**
   * 确认按钮类型
   */
  confirmButtonType?: 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 取消按钮类型
   */
  cancelButtonType?: 'default' | 'primary' | 'danger'
  /**
   * 是否显示输入框
   */
  showInput?: boolean
  /**
   * 输入框类型
   */
  inputType?: string
  /**
   * 输入框占位文本
   */
  inputPlaceholder?: string
  /**
   * 输入框初始值
   */
  inputValue?: string
  /**
   * 是否以HTML方式渲染消息
   */
  dangerouslyUseHTMLString?: boolean
  /**
   * 是否显示图标
   */
  showIcon?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 是否在点击遮罩层时关闭
   */
  closeOnClickMask?: boolean
  /**
   * 是否在按下ESC键时关闭
   */
  closeOnPressEscape?: boolean
  /**
   * 是否在点击确认按钮前进行验证
   */
  beforeConfirm?: (value?: string) => Promise<boolean | void> | boolean | void
  /**
   * 点击取消按钮时的回调
   */
  onCancel?: () => void
  /**
   * 点击确认按钮时的回调
   */
  onConfirm?: (value?: string) => void
  /**
   * 对话框关闭时的回调
   */
  onClose?: () => void
  /**
   * 自定义z-index
   */
  zIndex?: number
  /**
   * 自定义class
   */
  customClass?: string
  /**
   * 自定义宽度
   */
  width?: string | number
  /**
   * 弹框顶部距离
   */
  top?: string | number
}

export interface MessageBoxResult {
  action: 'confirm' | 'cancel' | 'close'
  value?: string
}

export interface MessageBoxServiceMethods {
  alert: (message: string, title?: string, options?: Omit<MessageBoxOptions, 'message' | 'title'>) => Promise<MessageBoxResult>
  confirm: (message: string, title?: string, options?: Omit<MessageBoxOptions, 'message' | 'title'>) => Promise<MessageBoxResult>
  prompt: (message: string, title?: string, options?: Omit<MessageBoxOptions, 'message' | 'title' | 'showInput'>) => Promise<MessageBoxResult>
  open: (options: MessageBoxOptions) => Promise<MessageBoxResult>
}
