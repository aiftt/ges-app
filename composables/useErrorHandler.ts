/**
 * 错误处理组合式函数
 * 创建日期: 2024-09-20
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from './useLogger'
import { useToast } from './useToast'

/**
 * 提供统一的错误处理方法
 */
export function useErrorHandler() {
  const logger = useLogger('error-handler')
  const toast = useToast()

  /**
   * 处理认证相关错误
   * @param error 错误对象
   */
  function handleAuthError(error: any) {
    if (!error)
      return

    let message = '认证出错，请重试'

    if (typeof error === 'string') {
      message = error
    }
    else if (error.data?.message) {
      message = error.data.message
    }
    else if (error.message) {
      message = error.message
    }

    logger.error('认证错误', error)
    toast.error(message)
  }

  /**
   * 处理API请求错误
   * @param error 错误对象
   */
  function handleApiError(error: any) {
    if (!error)
      return

    let message = '请求出错，请重试'
    let statusCode = 500

    if (typeof error === 'string') {
      message = error
    }
    else if (error.data) {
      // 处理API错误响应
      message = error.data.message || message
      statusCode = error.status || statusCode
    }
    else if (error.message) {
      message = error.message
    }

    // 特殊状态码处理
    if (statusCode === 401) {
      message = '登录已过期，请重新登录'
      // 可以在此处理登录过期逻辑
    }
    else if (statusCode === 403) {
      message = '没有权限执行此操作'
    }
    else if (statusCode === 404) {
      message = '请求的资源不存在'
    }

    logger.error(`API错误 [${statusCode}]`, error)
    toast.error(message)
  }

  /**
   * 处理一般业务逻辑错误
   * @param error 错误对象或消息
   * @param context 错误上下文信息
   */
  function handleError(error: any, context?: string) {
    if (!error)
      return

    let message = '操作出错，请重试'

    if (typeof error === 'string') {
      message = error
    }
    else if (error.message) {
      message = error.message
    }

    const contextPrefix = context ? `[${context}] ` : ''
    logger.error(`${contextPrefix}错误`, error)
    toast.error(message)
  }

  return {
    handleAuthError,
    handleApiError,
    handleError,
  }
}
