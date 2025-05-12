/**
 * 初始化中间件
 * 创建日期: 2024-12-01
 * 作者: aiftt
 * 用途: 在应用启动时初始化数据库和加载基础数据
 */
import { defineEventHandler } from 'h3'
import serverLogger from '~/utils/server-logger'
import { initializeModels } from '../models'
import { getClient } from '../utils/mongodb'

// 创建初始化中间件专用logger
const initLogger = serverLogger.child({ tag: 'init-middleware' })

// 初始化标志
let isInitialized = false

export default defineEventHandler(async () => {
  // 避免重复初始化
  if (!isInitialized) {
    try {
      // 初始化数据库连接
      await getClient()
      initLogger.info('数据库连接已在初始化中间件中建立')

      // 初始化基础数据
      await initializeModels()
      initLogger.info('基础数据初始化完成')

      isInitialized = true
    }
    catch (error) {
      initLogger.error('应用初始化失败:', error)
      // 连接失败时不会修改标志，下次请求会再次尝试连接
    }
  }
})
