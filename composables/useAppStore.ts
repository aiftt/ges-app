/**
 * 应用状态存储
 * 创建日期: 2024-09-03
 * 更新日期: 2024-10-03 - 修复CACHE_EXPIRES引用
 * 更新日期: 2024-10-07 - 优化菜单加载逻辑和性能
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from '~/composables/useAuthStore'
import { useLogger } from '~/composables/useLogger'
import { CACHE_EXPIRES } from '~/utils/app-config'
import { clearPrefixedStorage, usePersistStorage } from '~/utils/storage'

// 日志记录器
const logger = useLogger('app-store')

// 菜单类型
export interface MenuItem {
  id: string
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
  roles?: string[]
  isHidden?: boolean
}

// 字典类型
export interface DictItem {
  code: string
  name: string
  status?: 'enabled' | 'disabled'
}

export interface DictType {
  code: string
  name: string
  items: DictItem[]
}

// 应用状态存储
export const useAppStore = defineStore('app', () => {
  const authStore = useAuthStore()

  // 全部菜单
  const allMenuStorage = usePersistStorage<MenuItem[]>('menu_all', [], CACHE_EXPIRES)
  const allMenus = allMenuStorage.value

  // 用户可访问的菜单，根据权限过滤
  const userMenus = computed(() => {
    const userRoles = authStore.user?.roles || []
    return filterMenuByRoles(allMenus.value, userRoles)
  })

  // 字典数据
  const dictStorage = usePersistStorage<Record<string, DictType>>('dict_all', {}, CACHE_EXPIRES)
  const dictTypes = dictStorage.value

  // 加载状态
  const menuLoading = ref(false)
  const dictLoading = ref(false)
  const menuError = ref<string | null>(null)

  /**
   * 加载菜单数据
   */
  async function loadMenus(force = false) {
    // 如果已有菜单数据且未强制刷新，则跳过
    if (allMenus.value.length > 0 && !force) {
      logger.info('使用缓存的菜单数据')
      return
    }

    if (menuLoading.value)
      return

    // 重置错误状态
    menuError.value = null
    menuLoading.value = true

    const startTime = Date.now()
    logger.info('加载菜单数据')

    try {
      const response = await $fetch<{
        success: boolean
        data: { menus: MenuItem[] }
        message?: string
      }>('/api/menu')

      if (response.success) {
        allMenus.value = response.data.menus
        logger.info('菜单数据加载成功', { count: allMenus.value.length, time: `${Date.now() - startTime}ms` })
      }
      else {
        // 处理业务逻辑错误
        menuError.value = response.message || '菜单数据加载失败'
        logger.warn('菜单数据加载失败', { message: menuError.value })
      }
    }
    catch (error) {
      // 处理网络错误或服务器错误
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      menuError.value = `菜单数据加载失败: ${errorMessage}`
      logger.error('加载菜单数据失败', error)
    }
    finally {
      menuLoading.value = false
    }
  }

  /**
   * 加载字典数据
   */
  async function loadDictionaries(force = false) {
    // 如果已有字典数据且未强制刷新，则跳过
    if (Object.keys(dictTypes.value).length > 0 && !force) {
      logger.info('使用缓存的字典数据')
      return
    }

    if (dictLoading.value)
      return

    dictLoading.value = true
    logger.info('加载字典数据')

    try {
      const response = await $fetch<{
        success: boolean
        data: { dictTypes: DictType[] }
      }>('/api/dict/all')

      if (response.success) {
        // 转换为对象形式方便查询
        const dictMap: Record<string, DictType> = {}
        response.data.dictTypes.forEach((dict: DictType) => {
          dictMap[dict.code] = dict
        })

        dictTypes.value = dictMap
        logger.info('字典数据加载成功', Object.keys(dictTypes.value).length)
      }
    }
    catch (error) {
      logger.error('加载字典数据失败', error)
    }
    finally {
      dictLoading.value = false
    }
  }

  /**
   * 刷新应用数据（菜单和字典）
   */
  async function refreshAppData() {
    await Promise.all([
      loadMenus(true),
      loadDictionaries(true),
    ])
  }

  /**
   * 清除应用缓存
   */
  function clearAppCache() {
    allMenus.value = []
    dictTypes.value = {}
    clearPrefixedStorage()
    logger.info('应用缓存已清除')
  }

  /**
   * 根据字典类型和编码获取字典项名称
   */
  function getDictLabel(typeCode: string, itemCode: string): string {
    const dictType = dictTypes.value[typeCode]
    if (!dictType)
      return itemCode

    const dictItem = dictType.items.find(item => item.code === itemCode)
    return dictItem?.name || itemCode
  }

  /**
   * 根据字典类型获取字典项列表
   */
  function getDictItems(typeCode: string): DictItem[] {
    const dictType = dictTypes.value[typeCode]
    if (!dictType)
      return []

    return dictType.items.filter(item => item.status !== 'disabled')
  }

  /**
   * 过滤菜单，仅保留用户有权限的菜单项
   */
  function filterMenuByRoles(menus: MenuItem[], userRoles: string[]): MenuItem[] {
    return menus.filter((menu) => {
      // 如果未设置角色要求或者用户拥有管理员角色，则可访问
      const hasAccess = !menu.roles || menu.roles.length === 0
        || userRoles.includes('admin')
        || menu.roles.some(role => userRoles.includes(role))

      // 如果当前项不可访问，则直接过滤掉
      if (!hasAccess || menu.isHidden)
        return false

      // 如果有子菜单，递归过滤
      if (menu.children && menu.children.length > 0) {
        const filteredChildren = filterMenuByRoles(menu.children, userRoles)
        menu.children = filteredChildren

        // 如果过滤后没有子菜单，且当前菜单没有路径，则过滤掉
        if (filteredChildren.length === 0 && !menu.path)
          return false
      }

      return true
    })
  }

  return {
    allMenus,
    userMenus,
    dictTypes,
    menuLoading,
    dictLoading,
    menuError,
    loadMenus,
    loadDictionaries,
    refreshAppData,
    clearAppCache,
    getDictLabel,
    getDictItems,
  }
})
