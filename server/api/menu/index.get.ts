import * as process from 'node:process'
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
 * 更新日期: 2024-10-07 - 全面优化性能，实现应用启动预加载，减少响应时间
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineEventHandler } from 'h3'
import { useLogger } from '~/composables/useLogger'
import { createInitialMenus, getMenuCollection } from '~/server/models/menu.model'

// 创建日志记录器
const logger = useLogger('menus-api')

// 全局内存缓存，在服务启动时预加载
interface GlobalMenuCache {
  menus: IFrontendMenuNode[]
  timestamp: number
  isLoading: boolean
}

// 菜单缓存 - 使用全局变量，在所有请求间共享
const GLOBAL_CACHE: GlobalMenuCache = {
  menus: [],
  timestamp: 0,
  isLoading: false,
}

// 缓存配置
const CACHE_TTL = 15 * 60 * 1000 // 15分钟
const PRELOAD_CACHE = process.env.NODE_ENV !== 'development' // 生产环境预加载

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
}

/**
 * 将菜单项转换为前端所需的格式
 * 简化版本，减少对象创建和处理
 */
function convertMenuItem(menu: any): IFrontendMenuNode {
  // 确保ID正确处理
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
  }
}

/**
 * 优化版树形结构转换 - 减少遍历次数和对象创建
 */
function buildOptimizedMenuTree(menuList: any[]): IFrontendMenuNode[] {
  // 计时开始
  const startTime = Date.now()

  // 使用Map存储所有菜单项，key为ID
  const menuMap = new Map<string, IFrontendMenuNode>()

  // 使用Map存储父子关系，key为父ID，value为子菜单ID数组
  const parentChildMap = new Map<string, string[]>()

  // 顶级菜单ID集合
  const rootMenuIds: string[] = []

  // 第一次遍历：转换所有菜单项为前端格式，并建立父子关系映射
  for (const menu of menuList) {
    const id = typeof menu._id === 'object' && menu._id.toString
      ? menu._id.toString()
      : String(menu._id)

    // 转换菜单项并存入Map
    menuMap.set(id, convertMenuItem(menu))

    // 处理父子关系
    const parentId = menu.parentId
      ? (
          typeof menu.parentId === 'object' && menu.parentId.toString
            ? menu.parentId.toString()
            : String(menu.parentId)
        )
      : null

    if (!parentId) {
      // 没有父ID，是顶级菜单
      rootMenuIds.push(id)
    }
    else {
      // 有父ID，添加到父子关系Map
      if (!parentChildMap.has(parentId)) {
        parentChildMap.set(parentId, [])
      }
      parentChildMap.get(parentId)!.push(id)
    }
  }

  // 递归函数：根据ID构建菜单树
  function buildMenuTreeById(id: string): IFrontendMenuNode {
    const menuItem = menuMap.get(id)!

    // 获取所有子菜单
    const childIds = parentChildMap.get(id) || []

    if (childIds.length > 0) {
      // 按orderNum排序子菜单
      const childMenuItems = childIds
        .map((childId) => {
          const childMenu = menuList.find((m) => {
            const mId = typeof m._id === 'object' && m._id.toString
              ? m._id.toString()
              : String(m._id)
            return mId === childId
          })
          return { id: childId, orderNum: childMenu?.orderNum || 0 }
        })
        .sort((a, b) => a.orderNum - b.orderNum)
        .map(item => buildMenuTreeById(item.id))

      menuItem.children = childMenuItems
    }

    return menuItem
  }

  // 构建并返回顶级菜单
  const rootMenus = rootMenuIds
    .map((id) => {
      const menu = menuList.find((m) => {
        const mId = typeof m._id === 'object' && m._id.toString
          ? m._id.toString()
          : String(m._id)
        return mId === id
      })
      return { id, orderNum: menu?.orderNum || 0 }
    })
    .sort((a, b) => a.orderNum - b.orderNum)
    .map(item => buildMenuTreeById(item.id))

  logger.debug(`优化的菜单树构建完成，耗时: ${Date.now() - startTime}ms`)
  return rootMenus
}

/**
 * 从数据库获取菜单数据
 */
async function fetchAndProcessMenus(force = false): Promise<IFrontendMenuNode[]> {
  // 检查是否已有缓存数据且缓存未过期
  if (!force && GLOBAL_CACHE.menus.length > 0
    && (Date.now() - GLOBAL_CACHE.timestamp) < CACHE_TTL) {
    logger.debug('使用内存缓存的菜单数据')
    return GLOBAL_CACHE.menus
  }

  // 检查是否有其他请求正在加载
  if (GLOBAL_CACHE.isLoading) {
    logger.debug('菜单数据正在被其他请求加载，等待...')
    // 等待数据加载完成
    await new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (!GLOBAL_CACHE.isLoading) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 50) // 每50ms检查一次
    })
    return GLOBAL_CACHE.menus
  }

  // 标记为正在加载
  GLOBAL_CACHE.isLoading = true
  const startTime = Date.now()

  try {
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

    // 使用优化版算法转换为树形结构
    const menus = buildOptimizedMenuTree(menuList)

    // 更新全局缓存
    GLOBAL_CACHE.menus = menus
    GLOBAL_CACHE.timestamp = Date.now()

    logger.info(`菜单数据处理完成，总耗时: ${Date.now() - startTime}ms`)
    return menus
  }
  catch (error) {
    logger.error('获取或处理菜单数据失败', error)
    throw error
  }
  finally {
    // 完成加载
    GLOBAL_CACHE.isLoading = false
  }
}

// 服务启动时预加载菜单数据（仅生产环境）
if (PRELOAD_CACHE) {
  logger.info('服务启动，预加载菜单数据...')
  setTimeout(() => {
    fetchAndProcessMenus(true)
      .then(() => logger.info('菜单数据预加载完成'))
      .catch(err => logger.error('菜单数据预加载失败', err))
  }, 1000) // 延迟1秒执行，确保服务器完全初始化
}

/**
 * 菜单接口处理函数
 */
export default defineEventHandler(async () => {
  const requestStart = Date.now()
  try {
    logger.info('接收菜单数据请求')

    // 获取菜单数据（默认使用缓存）
    const menus = await fetchAndProcessMenus()

    logger.info(`菜单接口响应完成，总耗时: ${Date.now() - requestStart}ms`)

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
