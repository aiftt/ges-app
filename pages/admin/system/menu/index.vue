<!--
 * 菜单管理页面
 * 创建日期: 2024-10-10
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
<script setup lang="ts" name="MenuManagement">
import { useLogger } from '~/composables/useLogger'

// 定义页面元数据
definePageMeta({
  layout: 'admin',
  title: '菜单管理',
})

const logger = useLogger('menu-management')

// 菜单数据
const { data: menuData } = await useFetch<{
  success: boolean
  data?: { menus: any[] }
  message?: string
}>('/api/menu')
const menuList = computed(() => (menuData.value?.success && menuData.value?.data?.menus) || [])

// 将树形结构扁平化，方便表格显示
const flattenedMenuList = computed(() => {
  const result: any[] = []

  function flatten(items: any[], level = 0) {
    items.forEach((item) => {
      // 复制并添加层级信息
      const flatItem = {
        ...item,
        level,
      }

      result.push(flatItem)

      if (item.children && item.children.length > 0) {
        flatten(item.children, level + 1)
      }
    })
  }

  flatten(menuList.value)
  return result
})

// 表格列定义
const columns = [
  {
    title: '菜单名称',
    key: 'title',
  },
  {
    title: '图标',
    key: 'icon',
  },
  {
    title: '排序',
    key: 'orderNum',
  },
  {
    title: '权限标识',
    key: 'permission',
  },
  {
    title: '路径',
    key: 'path',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 处理编辑菜单
function handleEditMenu(row: any) {
  logger.info('点击编辑菜单', row)
}

// 处理删除菜单
function handleDeleteMenu(row: any) {
  logger.info('点击删除菜单', row)
}
</script>

<template>
  <div class="menu-management">
    <!-- 页面标题与操作栏 -->
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-xl text-gray-800 font-bold dark:text-white">
        菜单管理
      </h1>
      <ui-button type="primary" class="flex items-center">
        <ui-icon icon="carbon:add" class="mr-1" />
        <span>添加菜单</span>
      </ui-button>
    </div>

    <!-- 表格区域 -->
    <div class="rounded-lg bg-white shadow dark:bg-gray-800">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="border-b border-gray-200 px-4 py-3 text-left text-sm text-gray-500 font-medium dark:border-gray-600 dark:text-gray-300"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item) in flattenedMenuList"
            :key="item.id"
            class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center">
                <span
                  v-if="item.level > 0"
                  class="inline-block"
                  :style="{ paddingLeft: `${item.level * 20}px` }"
                />
                <span>{{ item.title }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">
              <ui-icon v-if="item.icon" :icon="item.icon" class="text-lg" />
              <span v-else>-</span>
            </td>
            <td class="px-4 py-3 text-sm">
              {{ item.orderNum || '-' }}
            </td>
            <td class="px-4 py-3 text-sm">
              <span v-if="item.roles && item.roles.length">
                {{ item.roles.join(', ') }}
              </span>
              <span v-else>-</span>
            </td>
            <td class="px-4 py-3 text-sm">
              {{ item.path || '-' }}
            </td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-2">
                <ui-button size="small" @click="handleEditMenu(item)">
                  编辑
                </ui-button>
                <ui-button
                  size="small"
                  color="danger"
                  @click="handleDeleteMenu(item)"
                >
                  删除
                </ui-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
