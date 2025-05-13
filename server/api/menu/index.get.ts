/**
 * 系统菜单接口
 * 创建日期: 2024-10-03
 * 更新日期: 2024-10-03 - 修改为从数据库获取菜单数据
 * 更新日期: 2024-10-03 - 确保使用数据库中的唯一ID
 * 更新日期: 2024-10-05 - 优化树形结构转换，支持多级嵌套菜单
 * 更新日期: 2024-10-05 - 完全重构树形结构转换，使用递归方式构建
 * 更新日期: 2024-10-05 - 调整API路径，符合Nuxt规范
 * 更新日期: 2024-10-07 - 修复菜单ID问题，确保使用数据库原始ID
 * 更新日期: 2024-10-07 - 优化接口响应速度，增加缓存机制
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineEventHandler } from 'h3'
import { useLogger } from '~/composables/useLogger'
import { createInitialMenus, getMenuCollection } from '~/server/models/menu.model'

// 创建日志记录器
const logger = useLogger('menus-api')

// 菜单缓存及过期时间（15分钟）
let cachedMenus: any[] = []
let cacheTime = 0
const CACHE_TTL = 15 * 60 * 1000 // 15分钟

/**
 * 前端菜单树节点接口
 */
interface IFrontendMenuNode {
  id: string
  title: string
  path: string
  icon: string
  roles: string[]
  isHidden: boolean
  children: IFrontendMenuNode[]
  _debug?: {
    originalId: string
    parentId: string | null
    orderNum: number
  }
}

/**
 * 将菜单项转换为前端所需的格式
 * 确保严格使用数据库中的原始ID
 */
function convertMenuItem(menu: any): IFrontendMenuNode {
  // 严格确保使用数据库中的_id作为菜单ID
  const id = typeof menu._id === 'object' && menu._id.toString
    ? menu._id.toString()
    : String(menu._id)

  return {
    id,
    title: menu.name,
    path: menu.path || '',
    icon: menu.icon || '',
    roles: menu.permission ? [menu.permission] : [],
    isHidden: !menu.visible,
    children: [],
    _debug: {
      originalId: id,
      parentId: menu.parentId
        ? (
            typeof menu.parentId === 'object' && menu.parentId.toString
              ? menu.parentId.toString()
              : String(menu.parentId)
          )
        : null,
      orderNum: menu.orderNum || 0,
    },
  }
}

/**
 * 递归构建子菜单
 */
function buildChildrenMenus(parentId: string, allMenuItems: Map<string, IFrontendMenuNode>): IFrontendMenuNode[] {
  const children: IFrontendMenuNode[] = []

  // 遍历所有菜单项，找出父ID匹配的子菜单
  for (const [id, menuItem] of allMenuItems.entries()) {
    // 检查是否是当前父菜单的子菜单
    if (menuItem._debug?.parentId === parentId) {
      // 递归查找当前菜单的子菜单
      const subChildren = buildChildrenMenus(id, allMenuItems)

      // 设置子菜单
      if (subChildren.length > 0) {
        menuItem.children = subChildren
      }

      // 将当前菜单添加到子菜单列表
      children.push(menuItem)
    }
  }

  // 按orderNum排序
  children.sort((a, b) => {
    const orderA = a._debug?.orderNum || 0
    const orderB = b._debug?.orderNum || 0
    return orderA - orderB
  })

  return children
}

/**
 * 将菜单数据转换为树形结构
 * 使用递归方式支持多级嵌套菜单结构
 */
function convertToTreeStructure(menuList: any[]): IFrontendMenuNode[] {
  const startTime = Date.now()
  logger.debug('开始转换菜单树形结构')

  // 创建一个映射表，用于快速查找菜单项
  const menuMap = new Map<string, IFrontendMenuNode>()

  // 将所有菜单项转换为前端所需格式，并放入映射表
  menuList.forEach((menu) => {
    const id = typeof menu._id === 'object' && menu._id.toString
      ? menu._id.toString()
      : String(menu._id)
    menuMap.set(id, convertMenuItem(menu))
  })

  // 找出所有顶级菜单（没有父菜单的菜单）
  const rootMenus: IFrontendMenuNode[] = []

  for (const [id, menuItem] of menuMap.entries()) {
    const parentId = menuItem._debug?.parentId

    // 如果没有父ID或父菜单不存在，则是顶级菜单
    if (!parentId || !menuMap.has(parentId)) {
      // 构建当前菜单的子菜单树
      const children = buildChildrenMenus(id, menuMap)
      if (children.length > 0) {
        menuItem.children = children
      }

      // 添加到顶级菜单列表
      rootMenus.push(menuItem)
    }
  }

  // 对顶级菜单排序
  rootMenus.sort((a, b) => {
    const orderA = a._debug?.orderNum || 0
    const orderB = b._debug?.orderNum || 0
    return orderA - orderB
  })

  logger.debug(`菜单树形结构转换完成，耗时: ${Date.now() - startTime}ms`)
  return rootMenus
}

/**
 * 从数据库获取菜单数据
 */
async function fetchMenusFromDB() {
  const startTime = Date.now()

  // 确保菜单数据存在
  await createInitialMenus()

  // 获取菜单集合
  const collection = await getMenuCollection()

  // 查询所有可见的菜单，确保包含完整信息
  const menuList = await collection
    .find({ status: 'active' })
    .sort({ orderNum: 1 })
    .toArray()

  logger.debug(`从数据库获取菜单数据完成，耗时: ${Date.now() - startTime}ms，共 ${menuList.length} 条`)

  // 输出原始菜单ID以便调试
  if (menuList.length > 0) {
    logger.debug('原始菜单数据ID示例:', menuList.slice(0, 2).map(m => ({
      _id: m._id.toString(),
      name: m.name,
      parentId: m.parentId ? m.parentId.toString() : 'null',
      orderNum: m.orderNum,
    })))
  }

  return menuList
}

export default defineEventHandler(async () => {
  const startTime = Date.now()
  try {
    logger.info('获取系统菜单数据')

    // 检查缓存是否有效
    const now = Date.now()
    if (cachedMenus.length > 0 && (now - cacheTime) < CACHE_TTL) {
      logger.info(`使用缓存的菜单数据，缓存时间: ${new Date(cacheTime).toISOString()}，共 ${cachedMenus.length} 条`)
      return {
        success: true,
        data: {
          menus: cachedMenus,
        },
      }
    }

    // 从数据库获取菜单数据
    const menuList = await fetchMenusFromDB()

    // 转换为树形结构
    const menus = convertToTreeStructure(menuList)

    // 更新缓存
    cachedMenus = menus
    cacheTime = now

    logger.info(`菜单接口总处理耗时: ${Date.now() - startTime}ms`)

    // 返回成功响应
    return {
      success: true,
      data: {
        menus,
      },
    }
  }
  catch (error) {
    logger.error('获取系统菜单数据失败', error)

    // 返回错误响应
    return {
      success: false,
      message: '获取系统菜单数据失败',
    }
  }
})
