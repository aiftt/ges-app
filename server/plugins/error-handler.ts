/**
 * 全局错误处理插件
 * 创建日期: 2024-12-23
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */

import { useLogger } from '~/composables/useLogger'

const logger = useLogger('error-handler-plugin')

export default defineNitroPlugin((nitroApp) => {
  // 添加全局错误处理器
  nitroApp.hooks.hook('error', (error, { event }) => {
    // 记录错误日志
    logger.error('服务器错误', {
      path: event ? getRequestURL(event).pathname : undefined,
      error: error.message,
      stack: import.meta.dev ? error.stack : undefined,
    })

    // 在这里可以添加额外的错误处理逻辑，例如发送到监控系统

    // 不修改原始错误，让 Nuxt 继续处理
    return error
  })
})
