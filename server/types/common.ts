/**
 * 通用类型定义
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

/**
 * 分页响应接口
 */
export interface IPaginationResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 通用响应接口
 */
export interface IApiResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

/**
 * 通用ID参数
 */
export interface IIdParam {
  id: string
}
