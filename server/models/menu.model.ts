/**
 * 菜单模型
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { Collection } from 'mongodb'
import type { IMenu } from '../types'
import { nanoid } from 'nanoid'
import serverLogger from '~/utils/server-logger'
import { getCollection } from '../utils/mongodb'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'menu-model' })

// 集合名称
const COLLECTION_NAME = 'menus'

// 菜单集合缓存
let menuCollection: Collection<IMenu> | null = null

/**
 * 获取菜单集合
 */
export async function getMenuCollection(): Promise<Collection<IMenu>> {
  if (!menuCollection) {
    menuCollection = await getCollection<IMenu>(COLLECTION_NAME)

    try {
      // 创建查询索引
      const collection = menuCollection
      await collection.createIndex({ parentId: 1 })
      await collection.createIndex({ orderNum: 1 })
      await collection.createIndex({ type: 1 })
      await collection.createIndex({ status: 1 })

      logger.info('菜单集合索引已创建')
    }
    catch (error) {
      logger.error('创建菜单集合索引失败:', error)
    }
  }

  return menuCollection
}

/**
 * 创建初始菜单（如果不存在）
 */
export async function createInitialMenus(): Promise<void> {
  const collection = await getMenuCollection()

  // 检查是否已存在初始菜单
  const dashboardExists = await collection.findOne({ path: '/admin/dashboard' })

  if (!dashboardExists) {
    try {
      // 创建初始菜单项
      const rootId = nanoid()
      const systemId = nanoid()

      // 根菜单 - 仪表盘
      const dashboardMenu: IMenu = {
        _id: rootId,
        parentId: '',
        name: '仪表盘',
        path: '/admin/dashboard',
        component: 'admin/dashboard',
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
      const systemMenu: IMenu = {
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
      const userMenu: IMenu = {
        _id: nanoid(),
        parentId: systemId,
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
      const roleMenu: IMenu = {
        _id: nanoid(),
        parentId: systemId,
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
      const menuMenu: IMenu = {
        _id: nanoid(),
        parentId: systemId,
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
      const dictMenu: IMenu = {
        _id: nanoid(),
        parentId: systemId,
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

      // 批量插入所有菜单
      await collection.insertMany([
        dashboardMenu,
        systemMenu,
        userMenu,
        roleMenu,
        menuMenu,
        dictMenu,
      ])

      logger.info('初始菜单已创建')
    }
    catch (error) {
      logger.error('创建初始菜单失败:', error)
    }
  }
}
