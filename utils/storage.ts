/**
 * 存储工具函数
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

/**
 * 带过期时间的存储项目
 */
export interface StorageItem<T> {
  data: T
  expires: number // 过期时间戳
}

const removers = new Map<string, [() => number | undefined, () => void]>()

/**
 * 创建带过期时间的存储
 * @param key 存储键名
 * @param initialValue 初始值
 * @param expiresIn 过期时间（毫秒）
 * @param storage 存储类型（localStorage/sessionStorage）
 */
export function usePersistStorage<T>(
  key: string,
  initialValue: T,
  expiresIn = CACHE_EXPIRES,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage',
) {
  // 添加前缀
  const prefixedKey = `${STORAGE_PREFIX}${key}`

  // 创建存储对象
  const storageRef = useStorage<StorageItem<T> | null>(
    prefixedKey,
    { data: initialValue, expires: Date.now() + expiresIn },
    storage === 'localStorage' ? undefined : sessionStorage,
  )

  // 判断是否过期
  const isExpired = computed(() => {
    if (!storageRef.value)
      return true
    return Date.now() > storageRef.value.expires
  })

  // 实际存储的值
  const valueRef = ref<T>(initialValue)

  // 初始化：如果存在且未过期则使用存储值，否则使用初始值
  if (storageRef.value && !isExpired.value) {
    // 使用存储的值，但确保是深拷贝以避免引用问题
    try {
      valueRef.value = JSON.parse(JSON.stringify(storageRef.value.data))
    }
    catch {
      // 如果无法解析（例如循环引用），则直接使用
      valueRef.value = storageRef.value.data
    }
  }
  else {
    // 如果过期或不存在，重置为初始值
    storageRef.value = {
      data: initialValue,
      expires: Date.now() + expiresIn,
    }
  }

  // 监听valueRef变化，更新存储
  watch(valueRef, (newValue) => {
    // 确保在更新存储时保留当前的过期时间，而不是重置
    const currentExpires = storageRef.value?.expires || (Date.now() + expiresIn)
    storageRef.value = {
      data: newValue,
      expires: currentExpires,
    }
  }, { deep: true })

  // 更新过期时间
  const updateExpires = () => {
    if (storageRef.value) {
      // 创建新对象以确保触发响应式更新
      storageRef.value = {
        data: storageRef.value.data,
        expires: Date.now() + expiresIn,
      }
    }
  }

  // 清除存储
  const clear = () => {
    storageRef.value = null
    valueRef.value = initialValue
  }

  removers.set(prefixedKey, [() => storageRef.value?.expires, clear])

  return {
    value: valueRef,
    isExpired,
    updateExpires,
    clear,
  }
}

/**
 * 清除所有带特定前缀的存储
 */
export function clearPrefixedStorage() {
  removers.forEach(([, clear]) => {
    clear()
  })
}

/**
 * 检查所有存储是否过期，并清除过期项
 */
export function cleanExpiredStorage() {
  const now = Date.now()

  removers.forEach(([expires, clear]) => {
    const expiredTime = expires?.()
    if (expiredTime && expiredTime < now) {
      clear()
    }
  })
}

/**
 * 初始化存储系统，自动清理过期项
 * 应在应用启动时调用
 */
export function initStorage() {
  // 启动时清理过期存储
  cleanExpiredStorage()

  // 每小时自动清理一次过期存储
  setInterval(cleanExpiredStorage, CLEANUP_INTERVAL)
}
