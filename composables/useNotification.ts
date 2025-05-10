/**
 * Notification通知组合式函数
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
 */

/**
 * 通知选项接口
 */
export interface NotificationOptions {
  /** 通知标题 */
  title: string
  /** 通知内容 */
  content?: string
  /** 通知类型 */
  type?: 'success' | 'error' | 'warning' | 'info'
  /** 通知位置 */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** 显示时间，单位毫秒，设置为0则不自动关闭（常驻通知，需手动关闭） */
  duration?: number
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 图标，支持自定义图标名称 */
  icon?: string
  /** 通知关闭时的回调函数 */
  onClose?: () => void
  /** 点击通知时的回调函数 */
  onClick?: () => void
}

/**
 * 通知实例接口
 */
export interface Notification extends Omit<NotificationOptions, 'duration' | 'showClose'> {
  /** 通知唯一标识 */
  id: string
  /** 显示时间，单位毫秒 */
  duration: number
  /** 是否显示关闭按钮 */
  showClose: boolean
}

// 单例模式通知服务
let notificationId = 0

/**
 * 提供通知功能的组合式函数
 *
 * @example
 * ```ts
 * const notification = useNotification()
 *
 * // 基本用法
 * notification.info({
 *   title: '通知标题',
 *   content: '这是一条通知信息'
 * })
 *
 * // 成功通知
 * notification.success({
 *   title: '操作成功',
 *   content: '您的操作已完成'
 * })
 *
 * // 错误通知
 * notification.error({
 *   title: '操作失败',
 *   content: '请稍后重试'
 * })
 *
 * // 警告通知
 * notification.warning({
 *   title: '警告',
 *   content: '请注意您的操作'
 * })
 *
 * // 自定义配置
 * notification.info({
 *   title: '自定义通知',
 *   content: '这是内容详情',
 *   duration: 5000,
 *   position: 'bottom-right',
 *   showClose: true
 * })
 *
 * // 自定义图标
 * notification.info({
 *   title: '自定义图标',
 *   content: '使用自定义图标的通知',
 *   icon: 'carbon:thumbs-up'
 * })
 *
 * // 手动关闭
 * const id = notification.info({
 *   title: '这条通知不会自动关闭',
 *   content: '需要手动关闭',
 *   duration: 0
 * })
 * setTimeout(() => {
 *   notification.close(id)
 * }, 3000)
 *
 * // 关闭所有通知
 * notification.clearAll()
 * ```
 */
export function useNotification() {
  // 创建单例通知状态
  const notifications = useState<Notification[]>('notifications', () => [])

  // 关闭通知
  const close = (id: string) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notifications.value = notifications.value.filter(n => n.id !== id)
      notification.onClose?.()
    }
  }

  // 创建通知
  const createNotification = (options: NotificationOptions) => {
    const id = `notification_${++notificationId}`
    const notification: Notification = {
      id,
      title: options.title,
      content: options.content,
      type: options.type || 'info',
      duration: options.duration ?? 4500,
      position: options.position || 'top-right',
      showClose: options.showClose ?? true,
      icon: options.icon,
      onClose: options.onClose,
      onClick: options.onClick,
    }

    notifications.value = [...notifications.value, notification]

    if (notification.duration > 0) {
      setTimeout(() => {
        close(id)
      }, notification.duration)
    }

    return id
  }

  // 清除所有通知
  const clearAll = () => {
    notifications.value = []
  }

  // 便捷方法
  const success = (options: Omit<NotificationOptions, 'type'> | string) => {
    if (typeof options === 'string') {
      return createNotification({ title: options, type: 'success' })
    }
    return createNotification({ ...options, type: 'success' })
  }

  const error = (options: Omit<NotificationOptions, 'type'> | string) => {
    if (typeof options === 'string') {
      return createNotification({ title: options, type: 'error' })
    }
    return createNotification({ ...options, type: 'error' })
  }

  const warning = (options: Omit<NotificationOptions, 'type'> | string) => {
    if (typeof options === 'string') {
      return createNotification({ title: options, type: 'warning' })
    }
    return createNotification({ ...options, type: 'warning' })
  }

  const info = (options: Omit<NotificationOptions, 'type'> | string) => {
    if (typeof options === 'string') {
      return createNotification({ title: options, type: 'info' })
    }
    return createNotification({ ...options, type: 'info' })
  }

  return {
    notification: createNotification,
    success,
    error,
    warning,
    info,
    close,
    clearAll,
    notifications,
  }
}
