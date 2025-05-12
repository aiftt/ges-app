import { createError, defineEventHandler, getQuery } from 'h3'
/**
 * 获取用户列表API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { getUsers } from '~/server/models/user'

const logger = useLogger('users-api')

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)

    // 解析分页参数
    const page = Number.parseInt(query.page as string || '1', 10)
    const pageSize = Number.parseInt(query.pageSize as string || '10', 10)

    // 解析查询条件
    const username = query.username as string || ''
    const email = query.email as string || ''
    const status = query.status as string || ''

    // 获取用户列表
    const result = await getUsers({
      page,
      pageSize,
      username,
      email,
      status,
    })

    // 返回响应
    return {
      success: true,
      data: result,
    }
  }
  catch (error) {
    logger.error('获取用户列表失败', error)

    return createError({
      statusCode: 500,
      statusMessage: '获取用户列表失败',
    })
  }
})
