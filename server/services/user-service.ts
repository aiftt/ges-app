/**
 * 用户服务
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 提供用户相关的业务逻辑和数据操作
 */
import type { Collection} from 'mongodb'
import { ObjectId } from 'mongodb'
import { getCollection } from '../utils/mongodb'
import type { IUser } from '../types/models'

// 集合名称常量
const COLLECTION_NAME = 'users'

/**
 * 用户服务类
 */
export class UserService {
  private collection: Promise<Collection<IUser>>

  /**
   * 构造函数，初始化集合
   */
  constructor() {
    this.collection = getCollection<IUser>(COLLECTION_NAME)
  }

  /**
   * 创建新用户
   * @param {Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>} userData - 用户数据
   * @returns {Promise<IUser>} 创建的用户
   */
  async createUser(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    // 确保必需字段存在
    if (!userData.username || !userData.email || !userData.role) {
      throw new Error('缺少必要的用户信息: username, email, role')
    }

    const now = new Date()
    const newUser: IUser = {
      username: userData.username,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive ?? true,
      // 可选字段
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      // 系统生成字段
      _id: new ObjectId(),
      createdAt: now,
      updatedAt: now,
    }

    const coll = await this.collection
    await coll.insertOne(newUser)
    return newUser
  }

  /**
   * 通过ID查找用户
   * @param {string} id - 用户ID
   * @returns {Promise<IUser | null>} 用户数据或null
   */
  async findUserById(id: string): Promise<IUser | null> {
    const coll = await this.collection
    return coll.findOne({ _id: new ObjectId(id) })
  }

  /**
   * 通过用户名或邮箱查找用户
   * @param {string} usernameOrEmail - 用户名或邮箱
   * @returns {Promise<IUser | null>} 用户数据或null
   */
  async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<IUser | null> {
    const coll = await this.collection
    return coll.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    })
  }

  /**
   * 获取所有用户
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @returns {Promise<{ users: IUser[]; total: number }>} 用户列表和总数
   */
  async getAllUsers(page: number = 1, limit: number = 20): Promise<{ users: IUser[]; total: number }> {
    const coll = await this.collection
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      coll.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      coll.countDocuments(),
    ])

    return { users, total }
  }

  /**
   * 更新用户信息
   * @param {string} id - 用户ID
   * @param {Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>} userData - 更新的用户数据
   * @returns {Promise<IUser | null>} 更新后的用户数据或null
   */
  async updateUser(
    id: string,
    userData: Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<IUser | null> {
    const coll = await this.collection

    const result = await coll.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...userData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' },
    )

    return result
  }

  /**
   * 删除用户
   * @param {string} id - 用户ID
   * @returns {Promise<boolean>} 操作是否成功
   */
  async deleteUser(id: string): Promise<boolean> {
    const coll = await this.collection
    const result = await coll.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  /**
   * 记录用户登录
   * @param {string} id - 用户ID
   * @returns {Promise<void>}
   */
  async recordLogin(id: string): Promise<void> {
    const coll = await this.collection
    await coll.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          lastLogin: new Date(),
          updatedAt: new Date(),
        },
      },
    )
  }

  /**
   * 修改用户状态
   * @param {string} id - 用户ID
   * @param {boolean} isActive - 是否激活
   * @returns {Promise<boolean>} 操作是否成功
   */
  async setUserStatus(id: string, isActive: boolean): Promise<boolean> {
    const coll = await this.collection
    const result = await coll.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isActive,
          updatedAt: new Date(),
        },
      },
    )
    return result.modifiedCount === 1
  }

  /**
   * 搜索用户
   * @param {string} query - 搜索关键词
   * @param {number} limit - 结果数量限制
   * @returns {Promise<IUser[]>} 搜索结果
   */
  async searchUsers(query: string, limit: number = 10): Promise<IUser[]> {
    const coll = await this.collection

    return coll.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ],
    })
    .limit(limit)
    .toArray()
  }
}
