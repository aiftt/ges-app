# 后台管理系统开发计划

## 项目概述

基于 Nuxt.js + Vue 3 + MongoDB 开发一个现代化后台管理系统，参考 JeecgBoot 的界面布局和功能设计，实现一套完整的管理界面和功能。

## 技术栈

- **前端框架**：Nuxt.js 3 + Vue 3 (SSR模式)
- **UI组件**：现有的 ui/ 组件库
- **样式方案**：UnoCSS + CSS变量
- **数据库**：MongoDB
- **图标**：nuxt-icon
- **状态管理**：Vue 组合式API + provide/inject + pinia + @vueuse/core 持久化

## 功能模块

1. 用户认证

   - 登录页面
   - 注册功能
   - 找回密码
   - JWT认证

2. 布局和导航

   - 侧边栏菜单（可折叠）
   - 顶部导航栏
   - 面包屑导航
   - 个人信息下拉菜单

3. 系统管理

   - 菜单管理
   - 用户管理
   - 角色管理
   - 字典管理

4. 仪表盘页面
   - 数据概览统计
   - 图表展示

## 数据模型设计

### 用户模型 (User)

```typescript
interface IUser {
  _id: string
  username: string
  password: string // 加密存储
  email: string
  avatar?: string
  realName?: string
  phone?: string
  status: 'active' | 'disabled'
  roles: string[] // 角色ID数组
  createTime: Date
  updateTime: Date
  lastLoginTime?: Date
}
```

### 角色模型 (Role)

```typescript
interface IRole {
  _id: string
  roleName: string
  roleCode: string
  description?: string
  permissions: string[] // 权限标识数组
  createTime: Date
  updateTime: Date
}
```

### 菜单模型 (Menu)

```typescript
interface IMenu {
  _id: string
  parentId: string // 父菜单ID，顶级菜单为''
  name: string // 菜单名称
  path: string // 路由路径
  component?: string // 组件路径
  redirect?: string // 重定向路径
  icon?: string // 图标
  orderNum: number // 排序号
  type: 'menu' | 'button' // 菜单类型：菜单或按钮
  permission?: string // 权限标识
  status: 'active' | 'disabled' // 状态
  visible: boolean // 是否可见
  keepAlive: boolean // 是否缓存
  createTime: Date
  updateTime: Date
}
```

### 字典模型 (Dict)

```typescript
interface IDict {
  _id: string
  dictName: string // 字典名称
  dictCode: string // 字典编码
  description?: string // 描述
  status: 'active' | 'disabled' // 状态
  createTime: Date
  updateTime: Date
}

interface IDictItem {
  _id: string
  dictId: string // 所属字典ID
  itemText: string // 字典项文本
  itemValue: string // 字典项值
  description?: string // 描述
  orderNum: number // 排序号
  status: 'active' | 'disabled' // 状态
  createTime: Date
  updateTime: Date
}
```

## 接口设计

### 认证接口

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户退出
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/forgot-password` - 找回密码
- `POST /api/auth/reset-password` - 重置密码
- `GET /api/auth/current-user` - 获取当前用户信息

### 用户管理接口

- `GET /api/users` - 获取用户列表（分页）
- `GET /api/users/:id` - 获取单个用户信息
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户信息
- `DELETE /api/users/:id` - 删除用户
- `PUT /api/users/:id/status` - 修改用户状态
- `PUT /api/users/:id/password` - 修改用户密码

### 角色管理接口

- `GET /api/roles` - 获取角色列表
- `GET /api/roles/:id` - 获取单个角色信息
- `POST /api/roles` - 创建角色
- `PUT /api/roles/:id` - 更新角色信息
- `DELETE /api/roles/:id` - 删除角色

### 菜单管理接口

- `GET /api/menus` - 获取菜单列表（树形结构）
- `GET /api/menus/:id` - 获取单个菜单信息
- `POST /api/menus` - 创建菜单
- `PUT /api/menus/:id` - 更新菜单信息
- `DELETE /api/menus/:id` - 删除菜单
- `GET /api/menus/user-menus` - 获取当前用户菜单

### 字典管理接口

- `GET /api/dicts` - 获取字典列表
- `GET /api/dicts/:id` - 获取单个字典信息
- `POST /api/dicts` - 创建字典
- `PUT /api/dicts/:id` - 更新字典信息
- `DELETE /api/dicts/:id` - 删除字典
- `GET /api/dicts/:code/items` - 获取字典项列表
- `POST /api/dict-items` - 创建字典项
- `PUT /api/dict-items/:id` - 更新字典项信息
- `DELETE /api/dict-items/:id` - 删除字典项

## 开发计划

### 第一阶段：基础设施搭建

1. MongoDB 连接配置及基础模型创建
2. 布局组件开发（AdminLayout）
3. 登录页面及认证逻辑实现
4. 路由和权限控制

### 第二阶段：核心功能开发

1. 仪表盘页面（数据概览）
2. 用户管理模块
3. 角色管理模块
4. 菜单管理模块
5. 字典管理模块

### 第三阶段：功能完善与优化

1. 页面和组件的性能优化
2. 数据校验和错误处理
3. 国际化支持
4. 主题切换功能
5. 按需加载和代码拆分

## 时间安排

1. 第一阶段（基础设施）：2周
2. 第二阶段（核心功能）：3周
3. 第三阶段（完善优化）：1周

总计开发时间：6周

## 开发规范

遵循项目规范文档中的所有要求：

- 使用中文回答问题
- 使用成熟的工具库
- 使用 UnoCSS + CSS变量 实现样式
- 使用封装的logger
- 使用 import.meta.client/server 判断环境
- 遵循目录结构和命名规范
- 使用v-bind + CSS变量实现动态样式
- 使用指定的组件命名格式
