/**
 * 角色相关类型定义
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

/**
 * 角色接口
 */
export interface IRole {
  _id: string
  roleName: string
  roleCode: string
  description?: string
  permissions: string[] // 权限标识数组
  createTime: Date
  updateTime: Date
}

/**
 * 创建角色请求
 */
export interface ICreateRoleRequest {
  roleName: string
  roleCode: string
  description?: string
  permissions?: string[]
}

/**
 * 更新角色请求
 */
export interface IUpdateRoleRequest {
  roleName?: string
  description?: string
  permissions?: string[]
}

/**
 * 角色查询参数
 */
export interface IRoleQueryParams {
  page?: number
  pageSize?: number
  roleName?: string
  roleCode?: string
}
