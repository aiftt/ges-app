/**
 * 数据库连接中间件
 * 创建日期: 2024-12-01
 * 更新日期: 2024-09-22 - 移除初始化逻辑，只保留数据库连接
 * 作者: aiftt
 * 用途: 在应用启动时建立数据库连接
 */
import { defineEventHandler } from 'h3'
import serverLogger from '~/utils/server-logger'
import { getClient } from '../utils/mongodb'

// 创建数据库连接中间件专用logger
const dbLogger = serverLogger.child({ tag: 'db-connection' })

export default defineEventHandler(async () => {
  try {
    // 建立数据库连接
    await getClient()
    dbLogger.debug('数据库连接已建立')
  }
  catch (error) {
    dbLogger.error('数据库连接失败:', error)
  }
})
