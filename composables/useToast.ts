/**
 * Toast提示组合式函数
 * 创建日期: 2024-09-20
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from './useLogger'

/**
 * Toast通知类型
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast选项接口
 */
export interface ToastOptions {
  duration?: number
  position?: 'top' | 'bottom'
  closable?: boolean
}

/**
 * 提供轻提示功能
 */
export function useToast() {
  const logger = useLogger('toast')

  /**
   * 显示Toast提示
   * @param message 提示消息
   * @param type 提示类型
   * @param options 提示选项
   */
  function show(message: string, type: ToastType = 'info', options?: ToastOptions) {
    // 默认配置
    const config = {
      duration: 3000,
      position: 'top',
      closable: true,
      ...options,
    }

    // 如果在客户端环境，则显示Toast
    if (import.meta.client) {
      logger.debug(`显示${type}类型Toast: ${message}`, config)

      // TODO: 实现实际的Toast显示逻辑
      // 这里应该调用实际的UI组件库的Toast组件
      // 例如: ElMessage, NaiveUI的message等

      // 临时实现：使用logger输出
      switch (type) {
        case 'success':
          logger.info(`✓ ${message}`)
          break
        case 'error':
          logger.error(`✗ ${message}`)
          break
        case 'warning':
          logger.warn(`⚠ ${message}`)
          break
        case 'info':
        default:
          logger.info(`ℹ ${message}`)
          break
      }
    }
    else {
      // 服务端不显示Toast，仅记录日志
      logger.debug(`服务端Toast(${type}): ${message}`)
    }
  }

  /**
   * 显示成功提示
   * @param message 提示消息
   * @param options 提示选项
   */
  function success(message: string, options?: ToastOptions) {
    show(message, 'success', options)
  }

  /**
   * 显示错误提示
   * @param message 提示消息
   * @param options 提示选项
   */
  function error(message: string, options?: ToastOptions) {
    show(message, 'error', options)
  }

  /**
   * 显示警告提示
   * @param message 提示消息
   * @param options 提示选项
   */
  function warning(message: string, options?: ToastOptions) {
    show(message, 'warning', options)
  }

  /**
   * 显示信息提示
   * @param message 提示消息
   * @param options 提示选项
   */
  function info(message: string, options?: ToastOptions) {
    show(message, 'info', options)
  }

  return {
    show,
    success,
    error,
    warning,
    info,
  }
}
