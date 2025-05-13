/**
 * 存储键和过期时间配置
 * 创建日期: 2024-09-20
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */

// 存储键名枚举
export enum StorageKeys {
  AUTH_TOKEN = 'auth_token',
  AUTH_REFRESH_TOKEN = 'auth_refresh_token',
  AUTH_USER = 'auth_user',
}

// 存储过期时间配置（毫秒）
export const StorageExpires = {
  // 短期 - 1小时
  SHORT: 60 * 60 * 1000,
  // 中期 - 1天
  MEDIUM: 24 * 60 * 60 * 1000,
  // 长期 - 7天
  LONG: 7 * 24 * 60 * 60 * 1000,
  // 永久 - 1年
  PERMANENT: 365 * 24 * 60 * 60 * 1000,
} as const

/**
 * 获取Cookie选项配置
 * @param maxAge Cookie最大存活时间（秒）
 * @returns Cookie配置选项
 */
export function getCookieOptions(maxAge: number) {
  return {
    maxAge,
    httpOnly: false, // 客户端可访问
    secure: import.meta.client ? window.location.protocol === 'https:' : false,
    sameSite: 'lax' as const,
    path: '/',
  }
}
