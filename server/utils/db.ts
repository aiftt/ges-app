/**
 * MongoDB数据库连接工具
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import type { Db } from 'mongodb'
import * as process from 'node:process'
import { MongoClient } from 'mongodb'
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

/**
 * 连接MongoDB数据库
 */
export async function connectToDatabase(): Promise<Db> {
  if (dbInstance) {
    return dbInstance
  }

  try {
    logger.info('正在连接到MongoDB数据库...')

    client = new MongoClient(config.uri)
    await client.connect()

    dbInstance = client.db(config.dbName)

    logger.info('MongoDB数据库连接成功')
    return dbInstance
  }
  catch (error) {
    logger.error('MongoDB数据库连接失败', error)
    throw error
  }
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

  process.on('SIGINT', handleExit)
  process.on('SIGTERM', handleExit)
}
