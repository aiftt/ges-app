/**
 * Message消息组合式函数
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-12 - 修复 Nuxt 兼容性问题
 * 更新日期: 2025-05-10 - 修复在非Nuxt上下文环境中的错误
 * 更新日期: 2025-05-11 - 重构实现，简化代码
 */

/**
 * 消息选项接口
 */
export interface MessageOptions {
  /** 消息内容 */
  content: string
  /** 消息类型 */
  type?: 'success' | 'error' | 'warning' | 'info'
  /** 消息位置 */
  position?: 'top' | 'bottom'
  /** 显示时间，单位毫秒，设置为0则不自动关闭（常驻消息，需手动关闭） */
  duration?: number
  /** 消息关闭时的回调函数 */
  onClose?: () => void
}

/**
 * 消息实例接口
 */
export interface Message extends Omit<MessageOptions, 'duration'> {
  /** 消息唯一标识 */
  id: string
  /** 显示时间，单位毫秒 */
  duration: number
}

// 单例模式消息服务
let messageId = 0

/**
 * 提供消息提示功能的组合式函数
 *
 * @example
 * ```ts
 * const message = useMessage()
 *
 * // 基本用法
 * message.info('这是一条提示信息')
 *
 * // 成功提示
 * message.success('操作成功')
 *
 * // 错误提示
 * message.error('操作失败')
 *
 * // 警告提示
 * message.warning('警告信息')
 *
 * // 自定义配置
 * message.info({
 *   content: '自定义提示',
 *   duration: 5000,
 *   position: 'bottom'
 * })
 *
 * // 手动关闭
 * const id = message.info({
 *   content: '这条消息不会自动关闭',
 *   duration: 0
 * })
 * setTimeout(() => {
 *   message.close(id)
 * }, 3000)
 *
 * // 关闭所有消息
 * message.clearAll()
 * ```
 */
export function useMessage() {
  // 创建单例消息状态
  const messages = useState<Message[]>('messages', () => [])

  // 关闭消息
  const close = (id: string) => {
    const message = messages.value.find(m => m.id === id)
    if (message) {
      messages.value = messages.value.filter(m => m.id !== id)
      message.onClose?.()
    }
  }

  // 创建消息
  const createMessage = (options: MessageOptions) => {
    const id = `message_${++messageId}`
    const message: Message = {
      id,
      content: options.content,
      type: options.type || 'info',
      duration: options.duration ?? 3000,
      position: options.position || 'top',
      onClose: options.onClose,
    }

    messages.value = [...messages.value, message]

    if (message.duration > 0) {
      setTimeout(() => {
        close(id)
      }, message.duration)
    }

    return id
  }

  // 清除所有消息
  const clearAll = () => {
    messages.value = []
  }

  // 便捷方法
  const success = (content: string | MessageOptions, options?: Partial<Omit<MessageOptions, 'content' | 'type'>>) => {
    if (typeof content === 'string') {
      return createMessage({ content, type: 'success', ...options })
    }
    return createMessage({ ...content, type: 'success' })
  }

  const error = (content: string | MessageOptions, options?: Partial<Omit<MessageOptions, 'content' | 'type'>>) => {
    if (typeof content === 'string') {
      return createMessage({ content, type: 'error', ...options })
    }
    return createMessage({ ...content, type: 'error' })
  }

  const warning = (content: string | MessageOptions, options?: Partial<Omit<MessageOptions, 'content' | 'type'>>) => {
    if (typeof content === 'string') {
      return createMessage({ content, type: 'warning', ...options })
    }
    return createMessage({ ...content, type: 'warning' })
  }

  const info = (content: string | MessageOptions, options?: Partial<Omit<MessageOptions, 'content' | 'type'>>) => {
    if (typeof content === 'string') {
      return createMessage({ content, type: 'info', ...options })
    }
    return createMessage({ ...content, type: 'info' })
  }

  return {
    message: createMessage,
    success,
    error,
    warning,
    info,
    close,
    clearAll,
    messages,
  }
}
