// 缓存过期时间 - 24小时
export const CACHE_EXPIRES = 24 * 60 * 60 * 1000

// 清理间隔 - 1小时
export const CLEANUP_INTERVAL = 1 * 60 * 60 * 1000

// 存储前缀
export const STORAGE_PREFIX = '__ges_'

// 无需认证的路径
export const PUBLIC_PATHS = [
  // 登录注册
  '/login',
  '/register',
  '/forgot-password',
  // 系统API
  '/api/_nuxt_icon',
  '/api/__nuxt',
  // 认证API
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/captcha',
  // '/api/auth/validate-token',
  // 示例页面
  '/demo/components',
  // 系统路径
  '/.well-known',
  '/_nuxt',
]
