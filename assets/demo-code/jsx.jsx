// React JSX示例
import { useEffect, useState } from 'react'

// 函数组件
function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Guest')

  useEffect(() => {
    document.title = `计数器: ${count}`

    return () => {
      console.log('组件卸载')
    }
  }, [count])

  return (
    <div className="counter">
      <h1>
        欢迎,
        {name}
        !
      </h1>
      <p>
        当前计数:
        {count}
      </p>

      <button onClick={() => setCount(count + 1)}>
        增加
      </button>

      <button onClick={() => setCount(count - 1)}>
        减少
      </button>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="输入用户名"
      />
    </div>
  )
}

export default Counter
