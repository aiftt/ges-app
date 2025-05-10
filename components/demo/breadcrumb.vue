<script setup lang="ts" name="DemoBreadcrumb">
/**
 * 面包屑导航组件示例
 * 创建日期: 2024-08-16
 * 作者: aiftt
 */

// 路由配置示例
const routes1 = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/products', name: '产品', icon: 'mdi:shopping-outline' },
  { path: '/products/electronics', name: '电子产品', icon: 'mdi:chip' },
  { path: '/products/electronics/phones', name: '手机', icon: 'mdi:cellphone' },
]

const routes2 = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/dashboard', name: '控制台', icon: 'mdi:view-grid' },
  { path: '/dashboard/analysis', name: '分析页', icon: 'mdi:chart-pie' },
  { path: '/dashboard/analysis/realtime', name: '实时数据', icon: 'mdi:chart-line' },
  { path: '/dashboard/analysis/realtime/traffic', name: '流量监控', icon: 'mdi:chart-bar' },
  { path: '/dashboard/analysis/realtime/traffic/details', name: '详情', icon: 'mdi:information' },
]

// 长路径示例
const longRoutes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/level1', name: '一级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2', name: '二级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3', name: '三级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4', name: '四级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5', name: '五级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5/target', name: '目标页面', icon: 'mdi:target' },
]

// 不同分隔符示例
const separators = [
  { name: '斜杠', value: '/' },
  { name: '反斜杠', value: '\\' },
  { name: '大于号', value: '>' },
  { name: '箭头', value: '→' },
  { name: '双箭头', value: '>>' },
]

// 当前选中的分隔符
const currentSeparator = ref(separators[0].value)

// 自定义图标分隔符
const useIconSeparator = ref(false)
</script>

<template>
  <div class="demo-breadcrumb">
    <h2>Breadcrumb 面包屑导航</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <p>面包屑导航用于显示当前页面在系统层级结构中的位置，允许用户返回任何一个层级。</p>

      <div class="demo-block">
        <ui-breadcrumb :routes="routes1" />
      </div>
    </div>

    <div class="demo-section">
      <h3>显示首页</h3>
      <p>可以设置 showHome 属性，确保始终显示首页链接</p>

      <div class="demo-block">
        <ui-breadcrumb
          :routes="[
            { path: '/products', name: '产品' },
            { path: '/products/electronics', name: '电子产品' },
          ]"
          show-home
          home-text="主页"
          home-icon="mdi:home"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义分隔符</h3>

      <div class="demo-control">
        <span>选择分隔符：</span>
        <ui-radio-group v-model="currentSeparator">
          <ui-radio
            v-for="item in separators"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }} ({{ item.value }})
          </ui-radio>
        </ui-radio-group>

        <ui-checkbox v-model="useIconSeparator">
          使用图标分隔符
        </ui-checkbox>
      </div>

      <div class="demo-block">
        <ui-breadcrumb
          :routes="routes1"
          :separator="currentSeparator"
          :separator-icon="useIconSeparator ? 'mdi:chevron-right' : ''"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>图标支持</h3>
      <p>可以为每个面包屑项添加图标</p>

      <div class="demo-block">
        <ui-breadcrumb :routes="routes2" />
      </div>
    </div>

    <div class="demo-section">
      <h3>自动折叠</h3>
      <p>当路径层级较多时，可以启用自动折叠功能</p>

      <div class="demo-block">
        <h4>不折叠 (默认)</h4>
        <ui-breadcrumb :routes="longRoutes" />

        <h4 class="mt-4">
          启用折叠
        </h4>
        <ui-breadcrumb
          :routes="longRoutes"
          collapsible
          :max-items="4"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>使用插槽自定义</h3>
      <p>可以使用默认插槽和 BreadcrumbItem 组件自定义面包屑</p>

      <div class="demo-block">
        <ui-breadcrumb separator=">">
          <ui-breadcrumb-item to="/" icon="mdi:home">
            首页
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/components" icon="mdi:package">
            组件
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/components/navigation" icon="mdi:compass">
            导航组件
          </ui-breadcrumb-item>
          <ui-breadcrumb-item icon="mdi:navigation">
            面包屑
          </ui-breadcrumb-item>
        </ui-breadcrumb>
      </div>

      <div class="demo-block">
        <ui-breadcrumb>
          <ui-breadcrumb-item to="/">
            首页
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/user">
            <span class="custom-item">
              <ui-icon icon="mdi:account" />
              <span>用户中心</span>
            </span>
          </ui-breadcrumb-item>
          <ui-breadcrumb-item>
            <span class="custom-item">
              <ui-icon icon="mdi:cog" />
              <span>设置</span>
            </span>
          </ui-breadcrumb-item>
        </ui-breadcrumb>
      </div>
    </div>

    <div class="demo-section">
      <h3>禁用状态</h3>
      <p>可以禁用特定的面包屑项</p>

      <div class="demo-block">
        <ui-breadcrumb>
          <ui-breadcrumb-item to="/">
            首页
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/products">
            产品
          </ui-breadcrumb-item>
          <ui-breadcrumb-item disabled>
            已下架产品
          </ui-breadcrumb-item>
          <ui-breadcrumb-item>产品详情</ui-breadcrumb-item>
        </ui-breadcrumb>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-breadcrumb {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .demo-section {
    margin-bottom: 40px;

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;

      &.mt-4 {
        margin-top: 16px;
      }
    }

    p {
      margin-bottom: 16px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-control {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;

    span {
      font-size: 14px;
    }
  }

  .demo-block {
    padding: 24px;
    margin-bottom: 16px;
    border: 1px solid var(--ui-color-border);
    border-radius: 8px;
    background-color: var(--ui-color-bg-card);
  }

  .custom-item {
    display: inline-flex;
    align-items: center;

    .ui-icon + span {
      margin-left: 4px;
    }
  }
}
</style>
