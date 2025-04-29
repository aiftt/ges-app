<script setup lang="ts">
/**
 * Menu组件示例页面
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复组件引用
 */

// 选中菜单项
// 导入logger
import clientLogger from '~/utils/client-logger'

const selectedKey = ref('home')

// 垂直菜单展开的子菜单
const verticalOpenKeys = ref(['sub1'])

// 切换折叠状态
const collapsed = ref(false)
function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
const logger = clientLogger.child({ tag: 'menu-demo' })

// 处理菜单选择事件
function handleSelect(key: string) {
  if (import.meta.client) {
    logger.info('选中菜单项:', { key })
  }
  selectedKey.value = key
}

// 处理子菜单展开/关闭事件
function handleOpenChange(openKeys: string[]) {
  if (import.meta.client) {
    logger.info('展开的子菜单:', { openKeys })
  }
}
</script>

<template>
  <div class="menu-demo-page">
    <h1>Menu 菜单组件示例</h1>

    <div class="demo-section">
      <h2>水平菜单</h2>
      <div class="demo-box">
        <ui-menu
          mode="horizontal"
          :selected-key="selectedKey"
          @select="handleSelect"
          @open-change="handleOpenChange"
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
            <ui-menu-submenu key="sub1-3" title="产品分类">
              <ui-menu-item key="sub1-3-1">
                电子产品
              </ui-menu-item>
              <ui-menu-item key="sub1-3-2">
                家居用品
              </ui-menu-item>
            </ui-menu-submenu>
          </ui-menu-submenu>
          <ui-menu-item key="about" icon="carbon:information">
            关于我们
          </ui-menu-item>
          <ui-menu-item key="contact" icon="carbon:email" disabled>
            联系我们
          </ui-menu-item>
        </ui-menu>
      </div>
    </div>

    <div class="demo-section">
      <h2>垂直菜单</h2>
      <div class="demo-box">
        <div class="demo-controls">
          <ui-button @click="toggleCollapsed">
            {{ collapsed ? '展开' : '折叠' }}
          </ui-button>
        </div>
        <div class="vertical-menu-container">
          <ui-menu
            mode="vertical"
            :collapsed="collapsed"
            :selected-key="selectedKey"
            :default-open-keys="verticalOpenKeys"
            @select="handleSelect"
            @open-change="handleOpenChange"
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
              <ui-menu-submenu key="sub1-3" title="产品分类" icon="carbon:category">
                <ui-menu-item key="sub1-3-1">
                  电子产品
                </ui-menu-item>
                <ui-menu-item key="sub1-3-2">
                  家居用品
                </ui-menu-item>
              </ui-menu-submenu>
            </ui-menu-submenu>
            <ui-menu-submenu key="sub2" title="用户管理" icon="carbon:user">
              <ui-menu-item key="sub2-1" icon="carbon:user-profile">
                用户列表
              </ui-menu-item>
              <ui-menu-item key="sub2-2" icon="carbon:user-role">
                角色管理
              </ui-menu-item>
            </ui-menu-submenu>
            <ui-menu-item key="settings" icon="carbon:settings">
              系统设置
            </ui-menu-item>
            <ui-menu-item key="logout" icon="carbon:logout" danger>
              退出登录
            </ui-menu-item>
          </ui-menu>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>暗色主题</h2>
      <div class="demo-box dark-theme">
        <ui-menu
          mode="horizontal"
          theme="dark"
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
        </ui-menu>

        <div class="vertical-menu-container mt-4">
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

<style scoped>
.menu-demo-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-box {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px;
  background-color: #fff;
}

.dark-theme {
  background-color: #001529;
  padding: 0;
  border: none;
}

.vertical-menu-container {
  width: 256px;
  transition: width 0.3s;
}

.demo-controls {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
