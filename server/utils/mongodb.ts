/**
 * MongoDB 工具模块
 * 创建日期: 2024-03-19
 * 作者: aiftt
 */
import type { Collection, Document, MongoClient } from 'mongodb'
import * as process from 'node:process'
import { MongoClient as Client } from 'mongodb'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'mongodb' })

// MongoDB 连接配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'ges_admin'

// MongoDB 客户端实例
let client: MongoClient | null = null

/**
 * 获取 MongoDB 客户端实例
 */
export async function getClient(): Promise<MongoClient> {
  if (!client) {
    try {
      client = await Client.connect(MONGODB_URI)
      logger.info('MongoDB 连接成功')
    }
    catch (error) {
      logger.error('MongoDB 连接失败:', error)
      throw error
    }
  }
  return client
}

/**
 * 获取数据库集合
 * @param collectionName 集合名称
 */
export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
  const client = await getClient()
  return client.db(DB_NAME).collection<T>(collectionName)
}

/**
 * 关闭数据库连接
 */
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    logger.info('MongoDB 连接已关闭')
  }
}
