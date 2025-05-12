/**
 * 用户相关类型定义
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

/**
 * 用户状态
 */
export type UserStatus = 'active' | 'disabled'

/**
 * 用户接口
 */
export interface IUser {
  _id: string
  username: string
  password: string // 加密存储
  email: string
  avatar?: string
  realName?: string
  phone?: string
  status: UserStatus
  roles: string[] // 角色ID数组
  createTime: Date
  updateTime: Date
  lastLoginTime?: Date
}

/**
 * 创建用户请求
 */
export interface ICreateUserRequest {
  username: string
  password: string
  email: string
  avatar?: string
  realName?: string
  phone?: string
  status?: UserStatus
  roles?: string[]
}

/**
 * 更新用户请求
 */
export interface IUpdateUserRequest {
  email?: string
  avatar?: string
  realName?: string
  phone?: string
  status?: UserStatus
  roles?: string[]
}

/**
 * 用户列表查询参数
 */
export interface IUserQueryParams {
  page?: number
  pageSize?: number
  username?: string
  email?: string
  status?: UserStatus
  realName?: string
  createTimeStart?: Date
  createTimeEnd?: Date
}

/**
 * 用户登录请求
 */
export interface ILoginRequest {
  username: string
  password: string
  remember?: boolean
}

/**
 * 用户登录响应
 */
export interface ILoginResponse {
  token: string
  user: Omit<IUser, 'password'>
}

/**
 * 修改密码请求
 */
export interface IChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

/**
 * 重置密码请求
 */
export interface IResetPasswordRequest {
  userId: string
  newPassword: string
}
