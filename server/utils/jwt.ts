/**
 * JWT 工具函数
 * 创建日期: 2024-12-23
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import type { Secret } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('jwt-utils')

interface IJwtPayload {
  userId: string
  username: string
  exp?: number
  iat?: number
}

type ExpiresIn = string | number

const DEFAULT_EXPIRES_IN: ExpiresIn = '7d' // 默认7天过期

/**
 * 生成JWT令牌
 * @param payload 载荷数据
 * @param expiresIn 过期时间
 * @returns JWT令牌
 */
export function generateToken(payload: Omit<IJwtPayload, 'exp' | 'iat'>, expiresIn: ExpiresIn = DEFAULT_EXPIRES_IN): string {
  try {
    const runtimeConfig = useRuntimeConfig()
    const secret = runtimeConfig.jwtSecret as Secret

    if (!secret) {
      throw new Error('缺少JWT密钥配置')
    }

    // jsonwebtoken的类型定义有问题，这里直接传入
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn as any })
    logger.debug('生成JWT令牌成功')
    return token
  }
  catch (error) {
    logger.error('生成JWT令牌失败', error)
    throw createError({
      statusCode: 500,
      message: '生成认证令牌失败',
    })
  }
}

/**
 * 验证JWT令牌
 * @param token JWT令牌
 * @returns 解码后的载荷数据
 */
export function verifyToken(token: string): IJwtPayload | null {
  try {
    const runtimeConfig = useRuntimeConfig()
    const secret = runtimeConfig.jwtSecret as Secret

    if (!secret) {
      logger.warn('缺少JWT密钥配置')
      return null
    }

    const decoded = jwt.verify(token, secret)

    // 类型检查，确保有必要的字段
    if (typeof decoded === 'object' && decoded !== null
      && 'userId' in decoded && 'username' in decoded) {
      return decoded as IJwtPayload
    }

    logger.warn('无效的JWT载荷格式')
    return null
  }
  catch (error) {
    logger.warn('验证JWT令牌失败', error)
    return null
  }
}

/**
 * 解码JWT令牌（不验证签名）
 * @param token JWT令牌
 * @returns 解码后的载荷数据
 */
export function decodeToken(token: string): IJwtPayload | null {
  try {
    const decoded = jwt.decode(token)

    // 类型检查，确保有必要的字段
    if (typeof decoded === 'object' && decoded !== null
      && 'userId' in decoded && 'username' in decoded) {
      return decoded as IJwtPayload
    }

    logger.warn('无效的JWT载荷格式')
    return null
  }
  catch (error) {
    logger.warn('解码JWT令牌失败', error)
    return null
  }
}
