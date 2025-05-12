/**
 * 数据模型导出和初始化
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import serverLogger from '~/utils/server-logger'

export * from './dict.model'
export * from './menu.model'
export * from './role.model'
// 导出所有模型
export * from './user.model'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'models-init' })

/**
 * 初始化所有模型数据
 */
export async function initializeModels(): Promise<void> {
  try {
    const { createInitialAdmin } = await import('./user.model')
    const { createInitialRoles } = await import('./role.model')
    const { createInitialMenus } = await import('./menu.model')
    const { createInitialDicts } = await import('./dict.model')

    logger.info('开始初始化数据模型...')

    // 按顺序初始化各个模型
    await createInitialRoles()
    await createInitialAdmin()
    await createInitialMenus()
    await createInitialDicts()

    logger.info('数据模型初始化完成')
  }
  catch (error) {
    logger.error('数据模型初始化失败:', error)
  }
}
