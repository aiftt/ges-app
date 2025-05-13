/**
 * 系统字典类型接口
 * 创建日期: 2024-10-03
 * 更新日期: 2024-10-03 - 修改为从数据库获取字典数据
 * 更新日期: 2024-10-05 - 调整API路径，符合Nuxt规范
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineEventHandler } from 'h3'
import { useLogger } from '~/composables/useLogger'
import { createInitialDicts, getDictCollection, getDictItemCollection } from '~/server/models/dict.model'

// 创建日志记录器
const logger = useLogger('dict-types-api')

export default defineEventHandler(async (_event) => {
  try {
    logger.info('获取系统字典类型数据')

    // 确保字典数据存在
    await createInitialDicts()

    // 获取字典集合和字典项集合
    const dictCollection = await getDictCollection()
    const dictItemCollection = await getDictItemCollection()

    // 查询所有启用的字典类型
    const dictTypes = await dictCollection
      .find({ status: 'active' })
      .sort({ dictCode: 1 })
      .toArray()

    // 查询所有启用的字典项
    const dictItems = await dictItemCollection
      .find({ status: 'active' })
      .sort({ orderNum: 1 })
      .toArray()

    // 按照字典类型分组字典项，并转换为前端所需格式
    const formattedDictTypes = dictTypes.map((dict) => {
      // 查找当前字典类型下的所有字典项
      const items = dictItems
        .filter(item => item.dictId === dict._id.toString())
        .map(item => ({
          code: item.itemValue,
          name: item.itemText,
          status: item.status,
        }))

      return {
        code: dict.dictCode,
        name: dict.dictName,
        items,
      }
    })

    // 返回成功响应
    return {
      success: true,
      data: {
        dictTypes: formattedDictTypes,
      },
    }
  }
  catch (error) {
    logger.error('获取系统字典类型数据失败', error)

    // 返回错误响应
    return {
      success: false,
      message: '获取系统字典类型数据失败',
    }
  }
})
