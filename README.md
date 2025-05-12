# GES 管理系统

基于 Nuxt 3 + Vue 3 + MongoDB 开发的后台管理系统。

## 功能特性

- 用户认证与授权
- 用户管理
- 角色管理
- 菜单管理
- 字典管理
- ...

## 开发环境设置

### 前提条件

- Node.js 18+
- MongoDB 6.0+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 数据库初始化

项目提供了数据库初始化脚本，用于创建基础数据：

1. 用户数据：管理员账号和测试账号
2. 角色数据：管理员角色和普通用户角色
3. 菜单数据：基础的系统菜单结构
4. 字典数据：常用的字典数据

### 运行初始化脚本

```bash
pnpm tsx scripts/init-database.ts
```

### 默认账号

初始化后将创建以下账号：

- 管理员账号
  - 用户名：admin
  - 密码：admin123
- 测试账号
  - 用户名：test
  - 密码：test123

## 项目目录结构

```
.
├── assets/         # 静态资源
├── components/     # 组件
├── composables/    # 组合式函数
├── layouts/        # 布局组件
├── middleware/     # 中间件
├── pages/          # 页面
├── public/         # 公共文件
├── scripts/        # 脚本
├── server/         # 服务端代码
│   ├── api/        # API接口
│   ├── middleware/ # 服务端中间件
│   ├── models/     # 数据模型
│   ├── types/      # 类型定义
│   └── utils/      # 工具函数
└── types/          # 全局类型定义
```

## 许可证

[MIT](LICENSE)
