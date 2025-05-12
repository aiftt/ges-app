/**
 * 用户模型
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { Collection } from 'mongodb'
import type { IUser } from '../types'
import { nanoid } from 'nanoid'
import serverLogger from '~/utils/server-logger'
import { getCollection } from '../utils/mongodb'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'user-model' })

// 集合名称
const COLLECTION_NAME = 'users'

// 用户集合缓存
let userCollection: Collection<IUser> | null = null

/**
 * 获取用户集合
 */
export async function getUserCollection(): Promise<Collection<IUser>> {
  if (!userCollection) {
    userCollection = await getCollection<IUser>(COLLECTION_NAME)

    try {
      // 创建用户名唯一索引
      const collection = userCollection
      await collection.createIndex({ username: 1 }, { unique: true })
      // 创建邮箱唯一索引
      await collection.createIndex({ email: 1 }, { unique: true })
      // 创建查询索引
      await collection.createIndex({ status: 1 })
      await collection.createIndex({ roles: 1 })
      await collection.createIndex({ createTime: 1 })

      logger.info('用户集合索引已创建')
    }
    catch (error) {
      logger.error('创建用户集合索引失败:', error)
    }
  }

  return userCollection
}

/**
 * 创建初始管理员用户（如果不存在）
 */
export async function createInitialAdmin(): Promise<void> {
  const collection = await getUserCollection()

  // 检查是否已存在管理员用户
  const adminExists = await collection.findOne({ username: 'admin' })

  if (!adminExists) {
    try {
      const admin: IUser = {
        _id: nanoid(),
        username: 'admin',
        // 密码: admin123 - 实际项目中应该使用加密
        password: 'admin123',
        email: 'admin@example.com',
        realName: '管理员',
        status: 'active',
        roles: ['admin'],
        createTime: new Date(),
        updateTime: new Date(),
      }

      await collection.insertOne(admin)
      logger.info('初始管理员用户已创建')
    }
    catch (error) {
      logger.error('创建初始管理员用户失败:', error)
    }
  }
}
