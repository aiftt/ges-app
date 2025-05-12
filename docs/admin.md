# 后台管理系统开发计划

## 项目概述

基于 Nuxt.js + Vue + MongoDB 构建的企业级后台管理系统，参考 JeecgBoot 的界面布局和功能设计。

## 技术栈

- 前端：Nuxt.js (SSR)、Vue 3、UnoCSS
- UI组件：自定义UI组件库（components/ui/目录）
- 图标：nuxt-icon（已封装在 ui-icon 组件中）
- 数据库：MongoDB
- 状态管理：Pinia
- 网络请求：useFetch

## 目录结构规划

```
├── components/         # 组件目录
│   ├── ui/             # UI组件库
│   └── admin/          # 管理后台专用组件
├── composables/        # 组合式函数
├── layouts/            # 布局组件
│   └── admin.vue       # 管理后台布局
├── pages/              # 页面组件
│   └── admin/          # 管理后台页面
│       ├── login.vue   # 登录页
│       ├── index.vue   # 仪表盘
│       └── system/     # 系统管理
│           ├── user.vue    # 用户管理
│           ├── role.vue    # 角色管理
│           ├── menu.vue    # 菜单管理
│           └── dict.vue    # 字典管理
├── server/             # 服务端目录
│   ├── api/            # API路由
│   ├── models/         # 数据模型
│   ├── utils/          # 服务端工具函数
│   └── middleware/     # 服务端中间件
└── stores/             # Pinia状态管理
```

## 开发步骤

### 阶段一：基础架构搭建

1. ✅ 创建开发计划文档
2. 配置MongoDB连接
   - 创建MongoDB连接工具
   - 使用.env配置数据库连接信息
3. 设计并实现管理后台布局
   - 创建admin布局模板
   - 实现侧边栏菜单
   - 实现顶部导航栏

### 阶段二：用户认证系统

1. 设计并实现用户数据模型
2. 实现用户认证API
   - 登录接口
   - 获取当前用户信息接口
   - 退出登录接口
3. 实现登录页面
4. 实现认证中间件

### 阶段三：核心功能模块

1. 菜单管理
   - 设计菜单数据模型
   - 实现菜单CRUD接口
   - 实现菜单管理页面
2. 用户管理
   - 完善用户数据模型
   - 实现用户CRUD接口
   - 优化用户管理页面
3. 角色管理
   - 设计角色数据模型
   - 实现角色CRUD接口
   - 实现角色管理页面
   - 实现角色-菜单权限分配
   - 实现角色-用户分配
4. 字典管理
   - 设计字典数据模型
   - 实现字典CRUD接口
   - 实现字典管理页面

### 阶段四：仪表盘与数据可视化

1. 设计仪表盘布局
2. 实现核心数据统计接口
3. 实现数据可视化图表
4. 完善仪表盘页面

### 阶段五：优化与完善

1. 性能优化
2. 体验优化
3. 兼容性测试
4. 错误处理与日志
5. 安全性增强

## 当前阶段工作计划

### 完成：阶段一 - 基础架构搭建

- [x] 配置MongoDB连接
  - [x] 创建MongoDB连接工具
  - [x] 使用.env配置数据库连接信息
  - [x] 设计基础数据模型
- [x] 设计并实现管理后台布局
  - [x] 创建admin布局模板
  - [x] 实现侧边栏菜单
  - [x] 实现顶部导航栏

### 进行中：阶段二 - 用户认证系统

- [x] 设计并实现用户数据模型
- [x] 实现用户认证API
  - [x] 登录接口
  - [x] 获取当前用户信息接口
- [x] 实现登录页面
- [x] 实现认证中间件
- [x] 实现认证工具（useAuth）

### 待开发：阶段三 - 核心功能模块

- [ ] 用户管理
  - [x] 实现用户CRUD接口
  - [ ] 优化用户管理页面
- [ ] 角色管理
  - [ ] 设计角色数据模型
  - [ ] 实现角色CRUD接口
  - [ ] 实现角色管理页面
- [ ] 菜单管理
  - [ ] 设计菜单数据模型
  - [ ] 实现菜单CRUD接口
  - [ ] 实现菜单管理页面
- [ ] 字典管理
  - [ ] 设计字典数据模型
  - [ ] 实现字典CRUD接口
  - [ ] 实现字典管理页面

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

- `GET /api/menus`
