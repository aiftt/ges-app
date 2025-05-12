/**
 * 仪表盘统计数据接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { defineEventHandler } from 'h3'
import { getDictCollection } from '~/server/models/dict.model'
import { getMenuCollection } from '~/server/models/menu.model'
import { getRoleCollection } from '~/server/models/role.model'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'dashboard-api' })

export default defineEventHandler(async () => {
  try {
    // 获取各集合
    const userCollection = await getUserCollection()
    const roleCollection = await getRoleCollection()
    const menuCollection = await getMenuCollection()
    const dictCollection = await getDictCollection()

    // 统计数量
    const userCount = await userCollection.countDocuments()
    const roleCount = await roleCollection.countDocuments()
    const menuCount = await menuCollection.countDocuments()
    const dictCount = await dictCollection.countDocuments()

    // 返回统计结果
    return {
      code: 200,
      success: true,
      message: '获取仪表盘统计数据成功',
      data: {
        userCount,
        roleCount,
        menuCount,
        dictCount,
      },
    }
  }
  catch (error) {
    logger.error('获取仪表盘统计数据失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
