/**
 * 全局中间件配置
 * 创建日期: 2024-12-05
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 * 用途: 确保错误处理中间件在所有其他中间件之前加载
 */
import { defineEventHandler } from 'h3'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('global-middleware')

export default defineEventHandler(() => {
  // 这个中间件不做任何处理，仅用于确保中间件加载顺序
  // Nuxt会按照文件名字母顺序加载中间件，00前缀确保它最先加载
  // 错误处理中间件应该在认证中间件之前加载，以便正确拦截认证错误

  logger.debug('全局中间件初始化，确保中间件加载顺序正确')
})
