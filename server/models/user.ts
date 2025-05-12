import { compare, hash } from 'bcrypt'
/**
 * 用户数据模型
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { ObjectId } from 'mongodb'
import { useLogger } from '~/composables/useLogger'
import { getDb } from '~/server/utils/db'

const logger = useLogger('user-model')

// 用户集合名称
const COLLECTION_NAME = 'users'

/**
 * 用户状态枚举
 */
export enum UserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

/**
 * 用户接口定义
 */
export interface IUser {
  _id?: string | ObjectId
  username: string
  password?: string
  email: string
  realName?: string
  avatar?: string
  status: UserStatus
  roles: string[]
  createTime: Date
  updateTime: Date
  lastLoginTime?: Date
  remark?: string
}

/**
 * 创建用户
 */
export async function createUser(userData: Omit<IUser, 'createTime' | 'updateTime'>): Promise<IUser> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 检查用户名是否已存在
    const existingUser = await collection.findOne({ username: userData.username })
    if (existingUser) {
      throw new Error('用户名已存在')
    }

    // 加密密码
    let hashedPassword = userData.password
    if (userData.password) {
      hashedPassword = await hash(userData.password, 10)
    }

    // 创建新用户
    const newUser: IUser = {
      ...userData,
      password: hashedPassword,
      createTime: new Date(),
      updateTime: new Date(),
    }

    // 插入数据库
    const result = await collection.insertOne(newUser as any)

    // 返回创建的用户对象
    const createdUser = { ...newUser, _id: result.insertedId }

    // 不返回密码
    delete createdUser.password

    return createdUser
  }
  catch (error) {
    logger.error('创建用户失败', error)
    throw error
  }
}

/**
 * 更新用户信息
 */
export async function updateUser(
  userId: string | ObjectId,
  userData: Partial<Omit<IUser, '_id' | 'createTime' | 'updateTime'>>,
): Promise<IUser | null> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 如果要更新密码，先加密
    if (userData.password) {
      userData.password = await hash(userData.password, 10)
    }

    // 转换ID
    const id = typeof userId === 'string' ? new ObjectId(userId) : userId

    // 更新用户
    const updateData = {
      ...userData,
      updateTime: new Date(),
    }

    // 更新数据库
    await collection.updateOne(
      { _id: id },
      { $set: updateData },
    )

    // 获取更新后的用户
    const updatedUser = await collection.findOne({ _id: id }) as unknown as IUser

    // 不返回密码
    if (updatedUser) {
      delete updatedUser.password
    }

    return updatedUser
  }
  catch (error) {
    logger.error('更新用户失败', error)
    throw error
  }
}

/**
 * 获取单个用户
 */
export async function getUserById(userId: string | ObjectId): Promise<IUser | null> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 转换ID
    const id = typeof userId === 'string' ? new ObjectId(userId) : userId

    // 查询用户
    const user = await collection.findOne({ _id: id }) as unknown as IUser

    // 不返回密码
    if (user) {
      delete user.password
    }

    return user
  }
  catch (error) {
    logger.error('获取用户失败', error)
    throw error
  }
}

/**
 * 根据用户名获取用户（包含密码，用于验证）
 */
export async function getUserByUsername(username: string): Promise<IUser | null> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 查询用户
    const user = await collection.findOne({ username }) as unknown as IUser

    return user
  }
  catch (error) {
    logger.error('获取用户失败', error)
    throw error
  }
}

/**
 * 验证用户密码
 */
export async function verifyUserPassword(
  username: string,
  password: string,
): Promise<{ valid: boolean, user: IUser | null }> {
  try {
    // 获取用户（包含密码）
    const user = await getUserByUsername(username)

    if (!user || !user.password) {
      return { valid: false, user: null }
    }

    // 验证密码
    const isValid = await compare(password, user.password)

    // 如果验证成功，返回不含密码的用户对象
    if (isValid) {
      // 深拷贝用户对象
      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password

      return { valid: true, user: userWithoutPassword }
    }

    return { valid: false, user: null }
  }
  catch (error) {
    logger.error('验证用户密码失败', error)
    return { valid: false, user: null }
  }
}

/**
 * 获取用户列表
 */
export async function getUsers(options: {
  page: number
  pageSize: number
  username?: string
  email?: string
  status?: string
}): Promise<{ items: IUser[], total: number }> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 构建查询条件
    const query: Record<string, any> = {}

    if (options.username) {
      query.username = { $regex: options.username, $options: 'i' }
    }

    if (options.email) {
      query.email = { $regex: options.email, $options: 'i' }
    }

    if (options.status) {
      query.status = options.status
    }

    // 计算总数
    const total = await collection.countDocuments(query)

    // 查询用户列表
    const skip = (options.page - 1) * options.pageSize
    const users = await collection
      .find(query)
      .sort({ createTime: -1 })
      .skip(skip)
      .limit(options.pageSize)
      .toArray() as unknown as IUser[]

    // 不返回密码
    const usersWithoutPassword = users.map((user) => {
      const userCopy = { ...user }
      delete userCopy.password
      return userCopy
    })

    return {
      items: usersWithoutPassword,
      total,
    }
  }
  catch (error) {
    logger.error('获取用户列表失败', error)
    throw error
  }
}

/**
 * 删除用户
 */
export async function deleteUser(userId: string | ObjectId): Promise<boolean> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 转换ID
    const id = typeof userId === 'string' ? new ObjectId(userId) : userId

    // 删除用户
    const result = await collection.deleteOne({ _id: id })

    return result.deletedCount > 0
  }
  catch (error) {
    logger.error('删除用户失败', error)
    throw error
  }
}

/**
 * 批量删除用户
 */
export async function deleteUsers(userIds: (string | ObjectId)[]): Promise<number> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 转换ID
    const ids = userIds.map(id => typeof id === 'string' ? new ObjectId(id) : id)

    // 批量删除用户
    const result = await collection.deleteMany({ _id: { $in: ids } })

    return result.deletedCount
  }
  catch (error) {
    logger.error('批量删除用户失败', error)
    throw error
  }
}

/**
 * 更新用户最后登录时间
 */
export async function updateUserLastLoginTime(userId: string | ObjectId): Promise<void> {
  try {
    const db = await getDb()
    const collection = db.collection(COLLECTION_NAME)

    // 转换ID
    const id = typeof userId === 'string' ? new ObjectId(userId) : userId

    // 更新最后登录时间
    await collection.updateOne(
      { _id: id },
      { $set: { lastLoginTime: new Date(), updateTime: new Date() } },
    )
  }
  catch (error) {
    logger.error('更新用户最后登录时间失败', error)
    throw error
  }
}
