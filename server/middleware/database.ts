/**
 * 数据库连接中间件
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 在服务器启动时初始化数据库连接
 */
import { defineEventHandler } from 'h3'
import serverLogger from '~/utils/server-logger'
import { getClient } from '../utils/mongodb'

// 创建数据库中间件专用logger
const dbLogger = serverLogger.child({ tag: 'database-middleware' })

// 初始化标志
let isInitialized = false

export default defineEventHandler(async () => {
  // 避免重复初始化
  if (!isInitialized) {
    try {
      // 初始化数据库连接
      await getClient()
      dbLogger.info('数据库连接已在中间件中初始化')
      isInitialized = true
    }
    catch (error) {
      dbLogger.error('数据库连接初始化失败:', error)
      // 连接失败时不会修改标志，下次请求会再次尝试连接
    }
  }
})
