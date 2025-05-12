/**
 * 字典模型
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { Collection } from 'mongodb'
import type { IDict, IDictItem } from '../types'
import { nanoid } from 'nanoid'
import serverLogger from '~/utils/server-logger'
import { getCollection } from '../utils/mongodb'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'dict-model' })

// 集合名称
const DICT_COLLECTION_NAME = 'dicts'
const DICT_ITEM_COLLECTION_NAME = 'dict_items'

// 集合缓存
let dictCollection: Collection<IDict> | null = null
let dictItemCollection: Collection<IDictItem> | null = null

/**
 * 获取字典集合
 */
export async function getDictCollection(): Promise<Collection<IDict>> {
  if (!dictCollection) {
    dictCollection = await getCollection<IDict>(DICT_COLLECTION_NAME)

    try {
      // 创建字典编码唯一索引
      const collection = dictCollection
      await collection.createIndex({ dictCode: 1 }, { unique: true })
      // 创建查询索引
      await collection.createIndex({ dictName: 1 })
      await collection.createIndex({ status: 1 })

      logger.info('字典集合索引已创建')
    }
    catch (error) {
      logger.error('创建字典集合索引失败:', error)
    }
  }

  return dictCollection
}

/**
 * 获取字典项集合
 */
export async function getDictItemCollection(): Promise<Collection<IDictItem>> {
  if (!dictItemCollection) {
    dictItemCollection = await getCollection<IDictItem>(DICT_ITEM_COLLECTION_NAME)

    try {
      // 创建查询索引
      const collection = dictItemCollection
      await collection.createIndex({ dictId: 1 })
      await collection.createIndex({ itemValue: 1 })
      await collection.createIndex({ orderNum: 1 })
      await collection.createIndex({ status: 1 })

      logger.info('字典项集合索引已创建')
    }
    catch (error) {
      logger.error('创建字典项集合索引失败:', error)
    }
  }

  return dictItemCollection
}

/**
 * 创建初始字典数据（如果不存在）
 */
export async function createInitialDicts(): Promise<void> {
  const dictColl = await getDictCollection()
  const itemColl = await getDictItemCollection()

  // 检查是否已存在用户状态字典
  const statusDictExists = await dictColl.findOne({ dictCode: 'user_status' })

  if (!statusDictExists) {
    try {
      // 创建用户状态字典
      const statusDict: IDict = {
        _id: nanoid(),
        dictName: '用户状态',
        dictCode: 'user_status',
        description: '用户状态字典',
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      }

      const statusDictResult = await dictColl.insertOne(statusDict)

      // 创建字典项
      const statusItems: IDictItem[] = [
        {
          _id: nanoid(),
          dictId: statusDictResult.insertedId.toString(),
          itemText: '启用',
          itemValue: 'active',
          orderNum: 1,
          status: 'active',
          createTime: new Date(),
          updateTime: new Date(),
        },
        {
          _id: nanoid(),
          dictId: statusDictResult.insertedId.toString(),
          itemText: '禁用',
          itemValue: 'disabled',
          orderNum: 2,
          status: 'active',
          createTime: new Date(),
          updateTime: new Date(),
        },
      ]

      await itemColl.insertMany(statusItems)
      logger.info('用户状态字典及字典项已创建')
    }
    catch (error) {
      logger.error('创建用户状态字典失败:', error)
    }
  }

  // 检查是否已存在菜单类型字典
  const menuTypeDictExists = await dictColl.findOne({ dictCode: 'menu_type' })

  if (!menuTypeDictExists) {
    try {
      // 创建菜单类型字典
      const menuTypeDict: IDict = {
        _id: nanoid(),
        dictName: '菜单类型',
        dictCode: 'menu_type',
        description: '菜单类型字典',
        status: 'active',
        createTime: new Date(),
        updateTime: new Date(),
      }

      const menuTypeDictResult = await dictColl.insertOne(menuTypeDict)

      // 创建字典项
      const menuTypeItems: IDictItem[] = [
        {
          _id: nanoid(),
          dictId: menuTypeDictResult.insertedId.toString(),
          itemText: '菜单',
          itemValue: 'menu',
          orderNum: 1,
          status: 'active',
          createTime: new Date(),
          updateTime: new Date(),
        },
        {
          _id: nanoid(),
          dictId: menuTypeDictResult.insertedId.toString(),
          itemText: '按钮',
          itemValue: 'button',
          orderNum: 2,
          status: 'active',
          createTime: new Date(),
          updateTime: new Date(),
        },
      ]

      await itemColl.insertMany(menuTypeItems)
      logger.info('菜单类型字典及字典项已创建')
    }
    catch (error) {
      logger.error('创建菜单类型字典失败:', error)
    }
  }
}
