/**
 * 角色模型
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { Collection } from 'mongodb'
import type { IRole } from '../types'
import { nanoid } from 'nanoid'
import serverLogger from '~/utils/server-logger'
import { getCollection } from '../utils/mongodb'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'role-model' })

// 集合名称
const COLLECTION_NAME = 'roles'

// 角色集合缓存
let roleCollection: Collection<IRole> | null = null

/**
 * 获取角色集合
 */
export async function getRoleCollection(): Promise<Collection<IRole>> {
  if (!roleCollection) {
    roleCollection = await getCollection<IRole>(COLLECTION_NAME)

    try {
      // 创建角色编码唯一索引
      const collection = roleCollection
      await collection.createIndex({ roleCode: 1 }, { unique: true })
      // 创建查询索引
      await collection.createIndex({ roleName: 1 })

      logger.info('角色集合索引已创建')
    }
    catch (error) {
      logger.error('创建角色集合索引失败:', error)
    }
  }

  return roleCollection
}

/**
 * 创建初始角色（如果不存在）
 */
export async function createInitialRoles(): Promise<void> {
  const collection = await getRoleCollection()

  // 检查是否已存在管理员角色
  const adminRoleExists = await collection.findOne({ roleCode: 'ADMIN' })

  if (!adminRoleExists) {
    try {
      const adminRole: IRole = {
        _id: nanoid(),
        roleName: '管理员',
        roleCode: 'ADMIN',
        description: '系统管理员，拥有所有权限',
        permissions: ['*'], // 所有权限
        createTime: new Date(),
        updateTime: new Date(),
      }

      await collection.insertOne(adminRole)
      logger.info('初始管理员角色已创建')
    }
    catch (error) {
      logger.error('创建初始管理员角色失败:', error)
    }
  }

  // 检查是否已存在普通用户角色
  const userRoleExists = await collection.findOne({ roleCode: 'USER' })

  if (!userRoleExists) {
    try {
      const userRole: IRole = {
        _id: nanoid(),
        roleName: '普通用户',
        roleCode: 'USER',
        description: '普通用户，拥有基本权限',
        permissions: ['view'], // 基本查看权限
        createTime: new Date(),
        updateTime: new Date(),
      }

      await collection.insertOne(userRole)
      logger.info('初始普通用户角色已创建')
    }
    catch (error) {
      logger.error('创建初始普通用户角色失败:', error)
    }
  }
}
