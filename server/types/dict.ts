/**
 * 字典相关类型定义
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

/**
 * 字典状态
 */
export type DictStatus = 'active' | 'disabled'

/**
 * 字典接口
 */
export interface IDict {
  _id: string
  dictName: string // 字典名称
  dictCode: string // 字典编码
  description?: string // 描述
  status: DictStatus // 状态
  createTime: Date
  updateTime: Date
}

/**
 * 字典项接口
 */
export interface IDictItem {
  _id: string
  dictId: string // 所属字典ID
  itemText: string // 字典项文本
  itemValue: string // 字典项值
  description?: string // 描述
  orderNum: number // 排序号
  status: DictStatus // 状态
  createTime: Date
  updateTime: Date
}

/**
 * 创建字典请求
 */
export interface ICreateDictRequest {
  dictName: string
  dictCode: string
  description?: string
  status?: DictStatus
}

/**
 * 更新字典请求
 */
export interface IUpdateDictRequest {
  dictName?: string
  description?: string
  status?: DictStatus
}

/**
 * 创建字典项请求
 */
export interface ICreateDictItemRequest {
  dictId: string
  itemText: string
  itemValue: string
  description?: string
  orderNum?: number
  status?: DictStatus
}

/**
 * 更新字典项请求
 */
export interface IUpdateDictItemRequest {
  itemText?: string
  itemValue?: string
  description?: string
  orderNum?: number
  status?: DictStatus
}

/**
 * 字典查询参数
 */
export interface IDictQueryParams {
  page?: number
  pageSize?: number
  dictName?: string
  dictCode?: string
  status?: DictStatus
}

/**
 * 字典项查询参数
 */
export interface IDictItemQueryParams {
  page?: number
  pageSize?: number
  dictId?: string
  itemText?: string
  itemValue?: string
  status?: DictStatus
}
