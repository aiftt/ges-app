<script setup lang="ts" name="DemoRouteMenu">
/**
 * 路由菜单组件示例
 * 创建日期: 2024-08-30
 * 作者: aiftt
 * 更新日期: 2024-08-30 - 创建组件并展示菜单增强功能
 */

// 选中菜单项
const selectedKey = ref('dashboard')

// 折叠状态
const collapsed = ref(false)

// 路由模式状态
const useRouterMode = ref(false)

// 子菜单触发方式
const triggerType = ref<'hover' | 'click'>('click')
function setTriggerType(type: 'hover' | 'click') {
  triggerType.value = type
}

// 处理菜单选择事件
function handleSelect(key: string) {
  selectedKey.value = key
}

// 菜单项间距
const itemSpacing = ref(8)

// 弹出位置
const popupPlacement = ref<'right' | 'left'>('right')
</script>

<template>
  <div class="demo-route-menu space-y-12">
    <section>
      <h3 class="mb-4 text-lg font-bold">
        菜单功能增强演示
      </h3>

      <div class="mb-4 flex flex-wrap gap-4">
        <ui-space>
          <ui-switch v-model:checked="collapsed" />
          <span>{{ collapsed ? '展开菜单' : '折叠菜单' }}</span>
        </ui-space>

        <ui-space>
          <ui-switch v-model:checked="useRouterMode" />
          <span>{{ useRouterMode ? '路由模式' : '普通模式' }}</span>
        </ui-space>

        <ui-space>
          <span>触发方式:</span>
          <ui-button :type="triggerType === 'click' ? 'primary' : 'default'" size="small" @click="setTriggerType('click')">
            点击展开
          </ui-button>
          <ui-button :type="triggerType === 'hover' ? 'primary' : 'default'" size="small" @click="setTriggerType('hover')">
            悬浮展开
          </ui-button>
        </ui-space>

        <ui-space>
          <span>弹出位置:</span>
          <ui-radio-group v-model:value="popupPlacement">
            <ui-radio value="right">
              右侧
            </ui-radio>
            <ui-radio value="left">
              左侧
            </ui-radio>
          </ui-radio-group>
        </ui-space>

        <ui-space>
          <span>菜单项间距:</span>
          <ui-slider v-model:value="itemSpacing" :min="2" :max="20" :step="1" style="width: 200px;" />
          <span>{{ itemSpacing }}px</span>
        </ui-space>
      </div>

      <div class="flex space-x-8">
        <div class="w-250px border rounded transition-all duration-300">
          <ui-menu
            mode="vertical"
            :collapsed="collapsed"
            :selected-key="selectedKey"
            :trigger-sub-menu-action="triggerType"
            :router="useRouterMode"
            :item-spacing="itemSpacing"
            :popup-placement="popupPlacement"
            class="border-none"
            @select="handleSelect"
          >
            <ui-menu-item item-key="dashboard" icon="carbon:dashboard" to="/dashboard">
              仪表盘
            </ui-menu-item>
            <ui-menu-submenu item-key="products" title="产品管理" icon="carbon:product" to="/products">
              <ui-menu-item item-key="product-list" icon="carbon:list" to="/products/list">
                产品列表
              </ui-menu-item>
              <ui-menu-item item-key="product-add" icon="carbon:add" to="/products/add">
                添加产品
              </ui-menu-item>
              <ui-menu-submenu item-key="product-categories" title="产品分类" icon="carbon:category">
                <ui-menu-item item-key="product-categories-list" to="/products/categories">
                  分类列表
                </ui-menu-item>
                <ui-menu-item item-key="product-categories-add" to="/products/categories/add">
                  添加分类
                </ui-menu-item>
              </ui-menu-submenu>
            </ui-menu-submenu>
            <ui-menu-submenu item-key="orders" title="订单管理" icon="carbon:shopping-cart">
              <ui-menu-item item-key="order-list" icon="carbon:list-checked" to="/orders/list">
                订单列表
              </ui-menu-item>
              <ui-menu-item item-key="order-review" icon="carbon:task" to="/orders/review">
                订单审核
              </ui-menu-item>
            </ui-menu-submenu>
            <ui-menu-submenu item-key="users" title="用户管理" icon="carbon:user">
              <ui-menu-item item-key="user-list" icon="carbon:group" to="/users/list">
                用户列表
              </ui-menu-item>
              <ui-menu-item item-key="user-roles" icon="carbon:user-role" to="/users/roles">
                角色管理
              </ui-menu-item>
              <ui-menu-item item-key="user-permissions" icon="carbon:security" to="/users/permissions">
                权限设置
              </ui-menu-item>
            </ui-menu-submenu>
            <ui-menu-item item-key="settings" icon="carbon:settings" to="/settings">
              系统设置
            </ui-menu-item>
          </ui-menu>
        </div>

        <div class="flex-1 border rounded p-4">
          <div class="mb-4">
            <h2 class="text-lg font-bold">
              功能说明
            </h2>
            <p class="mt-2 text-gray-500">
              1. <strong>路由模式</strong>：启用后点击菜单项将触发路由跳转（此演示中不会真正跳转）
            </p>
            <p class="mt-1 text-gray-500">
              2. <strong>折叠模式</strong>：折叠状态下，鼠标悬浮在图标上会显示子菜单
            </p>
            <p class="mt-1 text-gray-500">
              3. <strong>触发方式</strong>：可以切换点击展开或悬浮展开子菜单
            </p>
            <p class="mt-1 text-gray-500">
              4. <strong>弹出位置</strong>：设置子菜单在折叠状态下的弹出位置
            </p>
            <p class="mt-1 text-gray-500">
              5. <strong>菜单项间距</strong>：调整菜单项之间的水平间距
            </p>
          </div>

          <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-800">
            <p>
              当前选中菜单项: <strong>{{ selectedKey }}</strong>
            </p>
            <p v-if="useRouterMode" class="mt-2">
              路由模式已启用，点击菜单项将跳转到对应路由
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-route-menu {
  /* 组件特有样式 */
}
</style>
