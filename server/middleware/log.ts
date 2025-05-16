/**
 * 请求日志中间件
 * 创建日期: 2024-12-23
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('request-logger')

export default defineEventHandler((event) => {
  // 添加响应拦截器跟踪请求状态
  event.res.on('finish', () => {
    const statusCode = event.res.statusCode
    const method = event.node.req.method
    const path = getRequestURL(event).pathname

    if (statusCode >= 400) {
      logger.warn(`${method} ${path} - ${statusCode}`)
    }
    else {
      logger.debug(`${method} ${path} - ${statusCode}`)
    }
  })
})
