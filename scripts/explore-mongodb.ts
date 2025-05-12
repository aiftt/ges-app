import type { Document } from 'mongodb'
/**
 * MongoDB数据库结构探索脚本
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 连接MongoDB数据库并探索其结构和数据
 */
import * as process from 'node:process'
import { MongoClient, ServerApiVersion } from 'mongodb'

/**
 * 探索MongoDB数据库结构
 * @returns {Promise<void>}
 */
async function exploreMongoDB(): Promise<void> {
  // 创建MongoDB客户端
  const client = new MongoClient(MONGODB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  try {
    // 连接到MongoDB
    await client.connect()
    console.log('成功连接到MongoDB!')

    // 获取数据库名列表
    const adminDb = client.db('admin')
    const databasesList = await adminDb.admin().listDatabases()

    console.log('\n=== 数据库列表 ===')
    databasesList.databases.forEach((db) => {
      console.log(`- ${db.name} (${db.sizeOnDisk} bytes)`)
    })

    // 获取当前数据库
    const dbName = MONGODB_URL.split('/').pop() || 'your_database_name'
    const db = client.db(dbName)

    // 获取集合列表
    const collections = await db.listCollections().toArray()
    console.log(`\n=== ${dbName} 数据库中的集合 ===`)

    if (collections.length === 0) {
      console.log('此数据库中没有集合')
    }
    else {
      for (const collection of collections) {
        console.log(`\n📁 集合: ${collection.name}`)

        // 获取集合数据
        const coll = db.collection(collection.name)
        const count = await coll.countDocuments()
        console.log(`  文档数量: ${count}`)

        // 获取集合的字段结构（通过查看第一个文档）
        if (count > 0) {
          const sampleDoc = await coll.findOne({})
          console.log('  字段结构:')

          if (sampleDoc) {
            // 分析文档结构
            analyzeDocumentStructure(sampleDoc)

            // 显示示例文档
            console.log('  示例文档:')
            console.log(JSON.stringify(sampleDoc, null, 2))
          }

          // 显示索引信息
          const indexes = await coll.indexes()
          console.log('  索引:')
          indexes.forEach((index) => {
            console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`)
          })
        }
      }
    }

    console.log('\n数据库探索完成!')
  }
  catch (error) {
    console.error('MongoDB连接或查询出错:', error)
  }
  finally {
    await client.close()
    console.log('MongoDB连接已关闭')
  }
}

/**
 * 递归分析文档结构
 * @param {Document} doc - 文档对象
 * @param {string} prefix - 字段前缀（用于嵌套字段）
 */
function analyzeDocumentStructure(doc: Document, prefix = ''): void {
  for (const key in doc) {
    const fieldName = prefix ? `${prefix}.${key}` : key
    const value = doc[key]
    const type = Array.isArray(value) ? 'array' : typeof value

    if (type === 'object' && value !== null && !(value instanceof Date)) {
      if (value && typeof value === 'object' && '_bsontype' in value && value._bsontype === 'ObjectID') {
        console.log(`  - ${fieldName}: ObjectId`)
      }
      else {
        console.log(`  - ${fieldName}: Object`)
        analyzeDocumentStructure(value as Document, fieldName)
      }
    }
    else if (type === 'array' && value.length > 0) {
      const elementType = typeof value[0]
      console.log(`  - ${fieldName}: Array<${elementType}>`)

      // 如果数组元素是对象，分析第一个元素的结构
      if (elementType === 'object' && value[0] !== null) {
        analyzeDocumentStructure(value[0] as Document, `${fieldName}[0]`)
      }
    }
    else {
      console.log(`  - ${fieldName}: ${value instanceof Date ? 'Date' : type}`)
    }
  }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  try {
    await exploreMongoDB()
    process.exit(0)
  }
  catch (error) {
    console.error('脚本执行失败:', error)
    process.exit(1)
  }
}

// 执行主函数
main().catch((error) => {
  console.error('未捕获错误:', error)
  process.exit(1)
})
