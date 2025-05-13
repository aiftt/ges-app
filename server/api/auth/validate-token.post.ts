/**
 * Token验证接口
 * 创建日期: 2024-09-22
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import jwt from 'jsonwebtoken'
import { useAuthFromHeader } from '~/composables/useAuthFromHeader'
import { JWT_SECRET } from '~/utils/db-config'
import serverLogger from '~/utils/server-logger'

const logger = serverLogger.child({ tag: 'validate-token' })

export default defineEventHandler(async (event) => {
  try {
    // 从请求头中获取token
    const token = useAuthFromHeader(event)

    if (!token) {
      return {
        success: false,
        message: 'Token未提供',
      }
    }

    // 获取JWT密钥
    const jwtSecret = JWT_SECRET

    try {
      // 验证token
      const decoded = jwt.verify(token, jwtSecret)

      if (!decoded) {
        logger.warn('Token验证失败：无效的token')
        return {
          success: false,
          message: '无效的Token',
        }
      }

      // 需要验证的其他逻辑，例如：
      // 1. 检查token是否在黑名单中（如用户主动登出）
      // 2. 检查用户是否仍然有效（如被禁用）

      return {
        success: true,
        message: 'Token有效',
      }
    }
    catch (jwtError) {
      logger.warn('Token验证异常', jwtError)
      return {
        success: false,
        message: 'Token已过期或无效',
      }
    }
  }
  catch (error) {
    logger.error('Token验证处理异常', error)
    return {
      success: false,
      message: '服务器内部错误',
    }
  }
})
