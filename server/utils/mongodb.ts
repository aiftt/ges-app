/**
 * MongoDB服务工具
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 提供MongoDB连接和操作方法
 */
import * as process from 'node:process'
import type { Db, Collection, Document } from 'mongodb'
import { MongoClient, ServerApiVersion } from 'mongodb'

// MongoDB连接相关配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'
const DB_NAME = MONGODB_URI.split('/').pop() || 'your_database_name'

// 单例客户端实例
let client: MongoClient | null = null
let dbInstance: Db | null = null

/**
 * 获取MongoDB客户端实例
 * @returns {Promise<MongoClient>} MongoDB客户端实例
 */
export async function getClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    try {
      await client.connect()
      console.log('MongoDB连接已初始化')
    } catch (error) {
      console.error('MongoDB连接失败:', error)
      throw error
    }
  }

  return client
}

/**
 * 获取数据库实例
 * @param {string} [dbName] - 可选的数据库名，默认使用连接字符串中的数据库名
 * @returns {Promise<Db>} 数据库实例
 */
export async function getDb(dbName?: string): Promise<Db> {
  if (!dbInstance) {
    const client = await getClient()
    dbInstance = client.db(dbName || DB_NAME)
  }

  return dbInstance
}

/**
 * 获取集合
 * @param {string} collectionName - 集合名称
 * @param {string} [dbName] - 可选的数据库名
 * @returns {Promise<Collection>} 集合实例
 */
export async function getCollection<T extends Document = Document>(
  collectionName: string,
  dbName?: string,
): Promise<Collection<T>> {
  const db = await getDb(dbName)
  return db.collection<T>(collectionName)
}

/**
 * 关闭MongoDB连接
 * @returns {Promise<void>}
 */
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    dbInstance = null
    console.log('MongoDB连接已关闭')
  }
}

/**
 * 在应用程序退出时自动关闭连接
 */
process.on('SIGINT', async () => {
  await closeConnection()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await closeConnection()
  process.exit(0)
})
