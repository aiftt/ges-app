/**
 * MongoDB数据库连接工具
 * 创建日期: 2024-06-19
 * 更新日期: 2024-10-03 - 优化连接池和超时设置
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import type { Db } from 'mongodb'
import * as process from 'node:process'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { useLogger } from '~/composables/useLogger'
import { MONGODB_DB_NAME, MONGODB_URL } from '~/utils/db-config'

// 创建日志记录器
const logger = useLogger('mongodb-connection')
// 获取环境变量
const config = {
  uri: MONGODB_URL,
  dbName: MONGODB_DB_NAME,
}

// MongoDB客户端
let client: MongoClient | null = null
let dbInstance: Db | null = null

// 定义连接选项
const mongoOptions = {
  maxPoolSize: 10, // 连接池大小
  minPoolSize: 5, // 最小连接数
  connectTimeoutMS: 5000, // 连接超时
  socketTimeoutMS: 45000, // Socket超时
  serverSelectionTimeoutMS: 5000, // 服务器选择超时
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

/**
 * 连接MongoDB数据库
 */
export async function connectToDatabase(): Promise<Db> {
  if (dbInstance) {
    return dbInstance
  }

  try {
    logger.info('正在连接到MongoDB数据库...')

    client = new MongoClient(config.uri, mongoOptions)
    await client.connect()

    dbInstance = client.db(config.dbName)

    // 执行ping命令以确认连接成功
    await dbInstance.command({ ping: 1 })
    logger.info('MongoDB数据库连接成功')

    return dbInstance
  }
  catch (error) {
    logger.error('MongoDB数据库连接失败', error)
    throw error
  }
}

// 预连接数据库，减少首次请求延迟
if (import.meta.server) {
  connectToDatabase().catch((err) => {
    logger.error('数据库预连接失败', err)
  })
}

/**
 * 获取数据库实例
 */
export async function getDb(): Promise<Db> {
  if (!dbInstance) {
    return connectToDatabase()
  }
  return dbInstance
}

/**
 * 关闭数据库连接
 */
export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close()
    dbInstance = null
    client = null
    logger.info('MongoDB数据库连接已关闭')
  }
}

// 处理进程退出时关闭数据库连接
if (import.meta.server) {
  const handleExit = async () => {
    await closeDatabase()
    process.exit(0)
  }

  // 使用node:process模块的实例来注册事件
  try {
    // 确保process是正确的Node.js进程对象
    const nodeProcess = process
    if (typeof nodeProcess.on === 'function') {
      nodeProcess.on('SIGINT', handleExit)
      nodeProcess.on('SIGTERM', handleExit)
      logger.info('已注册进程退出事件处理程序')
    }
    else {
      logger.warn('无法注册进程退出事件处理程序：process.on不是一个函数')
    }
  }
  catch (error) {
    logger.error('注册进程退出事件处理程序时出错', error)
  }
}
