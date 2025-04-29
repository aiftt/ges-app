<script setup lang="ts" name="DemoMenu">
/**
 * Menu组件示例
 * 创建日期: 2023-12-01
 * 作者: aiftt
 */

// 选中菜单项
const selectedKey = ref('home')

// 垂直菜单展开的子菜单
const verticalOpenKeys = ref(['sub1'])

// 切换折叠状态
const collapsed = ref(false)
function toggleCollapsed() {
  collapsed.value = !collapsed.value
}

// 处理菜单选择事件
function handleSelect(key: string) {
  selectedKey.value = key
}
</script>

<template>
  <div class="demo-menu">
    <div class="mb-8">
      <h3 class="mb-4 text-lg font-bold">
        水平菜单
      </h3>
      <ui-menu
        mode="horizontal"
        :selected-key="selectedKey"
        @select="handleSelect"
      >
        <ui-menu-item key="home" icon="carbon:home">
          首页
        </ui-menu-item>
        <ui-menu-submenu key="sub1" title="产品" icon="carbon:product">
          <ui-menu-item key="sub1-1">
            产品列表
          </ui-menu-item>
          <ui-menu-item key="sub1-2">
            产品详情
          </ui-menu-item>
        </ui-menu-submenu>
        <ui-menu-item key="about" icon="carbon:information">
          关于我们
        </ui-menu-item>
        <ui-menu-item key="contact" icon="carbon:email" disabled>
          联系我们
        </ui-menu-item>
      </ui-menu>
    </div>

    <div class="mb-8 flex">
      <div class="mr-4">
        <div class="mb-4">
          <ui-button @click="toggleCollapsed">
            {{ collapsed ? '展开' : '折叠' }}
          </ui-button>
        </div>
        <div class="w-200px transition-width">
          <ui-menu
            mode="vertical"
            :collapsed="collapsed"
            :selected-key="selectedKey"
            :default-open-keys="verticalOpenKeys"
            @select="handleSelect"
          >
            <ui-menu-item key="home" icon="carbon:home">
              首页
            </ui-menu-item>
            <ui-menu-submenu key="sub1" title="产品管理" icon="carbon:product">
              <ui-menu-item key="sub1-1" icon="carbon:list">
                产品列表
              </ui-menu-item>
              <ui-menu-item key="sub1-2" icon="carbon:add">
                添加产品
              </ui-menu-item>
            </ui-menu-submenu>
            <ui-menu-item key="settings" icon="carbon:settings">
              系统设置
            </ui-menu-item>
          </ui-menu>
        </div>
      </div>

      <div class="dark rounded bg-gray-900 p-0">
        <div class="w-200px bg-gray-900">
          <ui-menu
            mode="vertical"
            theme="dark"
            :selected-key="selectedKey"
            @select="handleSelect"
          >
            <ui-menu-item key="home" icon="carbon:home">
              首页
            </ui-menu-item>
            <ui-menu-submenu key="sub1" title="产品管理" icon="carbon:product">
              <ui-menu-item key="sub1-1">
                产品列表
              </ui-menu-item>
              <ui-menu-item key="sub1-2">
                添加产品
              </ui-menu-item>
            </ui-menu-submenu>
            <ui-menu-item key="settings" icon="carbon:settings">
              系统设置
            </ui-menu-item>
          </ui-menu>
        </div>
      </div>
    </div>
  </div>
</template>
