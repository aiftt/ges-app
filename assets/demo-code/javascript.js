// TypeScript示例

// 泛型函数
function getProperty(obj, key) {
  return obj[key]
}

// 类型守卫
function isAdmin(user) {
  return user.role === 'admin'
}

// 使用示例
const user = {
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
