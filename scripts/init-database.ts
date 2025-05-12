/**
 * 数据库初始化脚本
 * 创建日期: 2024-07-01
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 *
 * 作用：初始化数据库，添加基本的用户、角色、菜单和字典数据
 * 运行方式：pnpm tsx scripts/init-database.ts
 */

import type { IDict, IDictItem, IMenu, IRole } from '../server/types'
import * as process from 'node:process'
import { hash } from 'bcrypt'
import { ObjectId } from 'mongodb'
import { UserStatus } from '../server/models/user'
import { closeDatabase, connectToDatabase } from '../server/utils/db'

// 控制台颜色
const colors = {
  reset: '\x1B[0m',
  bright: '\x1B[1m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
}

// 日志函数
const logger = {
  info: (message: string) => console.log(`${colors.cyan}[INFO]${colors.reset} ${message}`),
  success: (message: string) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`),
  warn: (message: string) => console.log(`${colors.yellow}[WARN]${colors.reset} ${message}`),
  error: (message: string) => console.log(`${colors.red}[ERROR]${colors.reset} ${message}`),
}

// 初始化角色数据
async function initRoles() {
  logger.info('初始化角色数据...')

  const db = await connectToDatabase()
  const roleCollection = db.collection('roles')

  // 检查管理员角色是否存在
  const adminRoleExists = await roleCollection.findOne({ roleCode: 'admin' })
  if (!adminRoleExists) {
    const adminRole: Omit<IRole, '_id'> & { _id?: ObjectId } = {
      roleName: '系统管理员',
      roleCode: 'admin',
      description: '系统管理员，拥有所有权限',
      permissions: ['*'], // 所有权限
      createTime: new Date(),
      updateTime: new Date(),
    }

    await roleCollection.insertOne(adminRole)
    logger.success('创建管理员角色成功')
  }
  else {
    logger.warn('管理员角色已存在，跳过创建')
  }

  // 检查普通用户角色是否存在
  const userRoleExists = await roleCollection.findOne({ roleCode: 'user' })
  if (!userRoleExists) {
    const userRole: Omit<IRole, '_id'> & { _id?: ObjectId } = {
      roleName: '普通用户',
      roleCode: 'user',
      description: '普通用户，拥有基本权限',
      permissions: ['dashboard', 'profile'], // 基础权限
      createTime: new Date(),
      updateTime: new Date(),
    }

    await roleCollection.insertOne(userRole)
    logger.success('创建普通用户角色成功')
  }
  else {
    logger.warn('普通用户角色已存在，跳过创建')
  }

  // 获取所有角色ID用于后续使用
  const roles = await roleCollection.find({}).toArray()
  return roles.map(role => role._id.toString())
}

// 初始化用户数据
async function initUsers(roleIds: string[]) {
  logger.info('初始化用户数据...')

  const db = await connectToDatabase()
  const userCollection = db.collection('users')

  // 检查管理员用户是否存在
  const adminUserExists = await userCollection.findOne({ username: 'admin' })
  if (!adminUserExists) {
    // 使用bcrypt加密密码
    const hashedPassword = await hash('admin123', 10)

    // 创建MongoDB文档对象
    const adminUser = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      realName: '系统管理员',
      avatar: '',
      status: UserStatus.ACTIVE,
      roles: [roleIds[0]], // 管理员角色ID
      createTime: new Date(),
      updateTime: new Date(),
      lastLoginTime: undefined, // 使用undefined而非null
      remark: '系统内置管理员账号', // 自定义字段
    }

    await userCollection.insertOne(adminUser)
    logger.success('创建管理员用户成功')
  }
  else {
    logger.warn('管理员用户已存在，跳过创建')
  }

  // 创建测试用户
  const testUserExists = await userCollection.findOne({ username: 'test' })
  if (!testUserExists) {
    const hashedPassword = await hash('test123', 10)

    // 创建MongoDB文档对象
    const testUser = {
      username: 'test',
      password: hashedPassword,
      email: 'test@example.com',
      realName: '测试用户',
      avatar: '',
      status: UserStatus.ACTIVE,
      roles: [roleIds[1]], // 普通用户角色ID
      createTime: new Date(),
      updateTime: new Date(),
      lastLoginTime: undefined, // 使用undefined而非null
      remark: '测试账号', // 自定义字段
    }

    await userCollection.insertOne(testUser)
    logger.success('创建测试用户成功')
  }
  else {
    logger.warn('测试用户已存在，跳过创建')
  }
}

// 初始化菜单数据
async function initMenus() {
  logger.info('初始化菜单数据...')

  const db = await connectToDatabase()
  const menuCollection = db.collection('menus')

  // 检查是否已有菜单数据
  const menuCount = await menuCollection.countDocuments()
  if (menuCount > 0) {
    logger.warn('菜单数据已存在，跳过创建')
    return
  }

  // 创建根菜单
  const dashboardId = new ObjectId()
  const systemId = new ObjectId()

  // 仪表盘
  const dashboardMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: dashboardId,
    parentId: '',
    name: '仪表盘',
    path: '/admin',
    component: 'admin/index',
    icon: 'carbon:dashboard',
    orderNum: 1,
    type: 'menu',
    permission: 'dashboard',
    status: 'active',
    visible: true,
    keepAlive: true,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 系统管理
  const systemMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: systemId,
    parentId: '',
    name: '系统管理',
    path: '/admin/system',
    redirect: '/admin/system/user',
    icon: 'carbon:settings',
    orderNum: 2,
    type: 'menu',
    permission: 'system',
    status: 'active',
    visible: true,
    keepAlive: false,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 用户管理
  const userMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: new ObjectId(),
    parentId: systemId.toString(),
    name: '用户管理',
    path: '/admin/system/user',
    component: 'admin/system/user',
    icon: 'carbon:user',
    orderNum: 1,
    type: 'menu',
    permission: 'system:user',
    status: 'active',
    visible: true,
    keepAlive: true,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 角色管理
  const roleMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: new ObjectId(),
    parentId: systemId.toString(),
    name: '角色管理',
    path: '/admin/system/role',
    component: 'admin/system/role',
    icon: 'carbon:user-role',
    orderNum: 2,
    type: 'menu',
    permission: 'system:role',
    status: 'active',
    visible: true,
    keepAlive: true,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 菜单管理
  const menuMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: new ObjectId(),
    parentId: systemId.toString(),
    name: '菜单管理',
    path: '/admin/system/menu',
    component: 'admin/system/menu',
    icon: 'carbon:list',
    orderNum: 3,
    type: 'menu',
    permission: 'system:menu',
    status: 'active',
    visible: true,
    keepAlive: true,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 字典管理
  const dictMenu: Omit<IMenu, '_id'> & { _id: ObjectId } = {
    _id: new ObjectId(),
    parentId: systemId.toString(),
    name: '字典管理',
    path: '/admin/system/dict',
    component: 'admin/system/dict',
    icon: 'carbon:book',
    orderNum: 4,
    type: 'menu',
    permission: 'system:dict',
    status: 'active',
    visible: true,
    keepAlive: true,
    createTime: new Date(),
    updateTime: new Date(),
  }

  // 批量插入菜单
  await menuCollection.insertMany([
    dashboardMenu,
    systemMenu,
    userMenu,
    roleMenu,
    menuMenu,
    dictMenu,
  ])

  logger.success('创建菜单数据成功')
}

// 初始化字典数据
async function initDicts() {
  logger.info('初始化字典数据...')

  const db = await connectToDatabase()
  const dictCollection = db.collection('dicts')
  const dictItemCollection = db.collection('dict_items')

  // 检查用户状态字典是否存在
  const userStatusExists = await dictCollection.findOne({ dictCode: 'user_status' })
  if (!userStatusExists) {
    // 创建用户状态字典
    const userStatusDict: Omit<IDict, '_id'> & { _id?: ObjectId } = {
      dictName: '用户状态',
      dictCode: 'user_status',
      description: '用户状态字典',
      status: 'active',
      createTime: new Date(),
      updateTime: new Date(),
    }

    const result = await dictCollection.insertOne(userStatusDict)
    logger.success('创建用户状态字典成功')

    // 创建字典项
    const dictItems: Array<Omit<IDictItem, '_id'> & { _id?: ObjectId }> = [
      {
        _id: new ObjectId(),
        dictId: result.insertedId.toString(),
        itemText: '正常',
        itemValue: 'active',
        orderNum: 1,
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      },
      {
        _id: new ObjectId(),
        dictId: result.insertedId.toString(),
        itemText: '禁用',
        itemValue: 'disabled',
        orderNum: 2,
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      },
    ]

    await dictItemCollection.insertMany(dictItems)
    logger.success('创建用户状态字典项成功')
  }
  else {
    logger.warn('用户状态字典已存在，跳过创建')
  }

  // 检查菜单类型字典是否存在
  const menuTypeExists = await dictCollection.findOne({ dictCode: 'menu_type' })
  if (!menuTypeExists) {
    // 创建菜单类型字典
    const menuTypeDict: Omit<IDict, '_id'> & { _id?: ObjectId } = {
      dictName: '菜单类型',
      dictCode: 'menu_type',
      description: '菜单类型字典',
      status: 'active',
      createTime: new Date(),
      updateTime: new Date(),
    }

    const result = await dictCollection.insertOne(menuTypeDict)
    logger.success('创建菜单类型字典成功')

    // 创建字典项
    const dictItems: Array<Omit<IDictItem, '_id'> & { _id?: ObjectId }> = [
      {
        _id: new ObjectId(),
        dictId: result.insertedId.toString(),
        itemText: '菜单',
        itemValue: 'menu',
        orderNum: 1,
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      },
      {
        _id: new ObjectId(),
        dictId: result.insertedId.toString(),
        itemText: '按钮',
        itemValue: 'button',
        orderNum: 2,
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      },
    ]

    await dictItemCollection.insertMany(dictItems)
    logger.success('创建菜单类型字典项成功')
  }
  else {
    logger.warn('菜单类型字典已存在，跳过创建')
  }
}

// 主函数
async function main() {
  try {
    logger.info('开始初始化数据库...')

    // 初始化角色并获取角色ID
    const roleIds = await initRoles()

    // 初始化用户
    await initUsers(roleIds)

    // 初始化菜单
    await initMenus()

    // 初始化字典
    await initDicts()

    logger.success('数据库初始化完成！')
  }
  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logger.error(`初始化失败: ${errorMessage}`)
    console.error(error)
    process.exit(1)
  }
  finally {
    // 关闭数据库连接
    await closeDatabase()
  }
}

// 执行主函数
main()
