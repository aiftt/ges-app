// TypeScript示例
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  settings?: UserSettings
}

interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  language: string
}

// 泛型函数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

// 类型守卫
function isAdmin(user: User): user is User & { role: 'admin' } {
  return user.role === 'admin'
}

// 使用示例
const user: User = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  role: 'admin',
  settings: {
    theme: 'dark',
    notifications: true,
    language: 'zh-CN',
  },
}

if (isAdmin(user)) {
  console.log('用户是管理员')
}

const userName = getProperty(user, 'name')
console.log(userName) // 输出: 张三
