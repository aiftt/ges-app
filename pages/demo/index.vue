<script setup lang="ts" name="DemoUIPage">
/**
 * UI组件演示页面
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 组件分类
const componentCategories = [
  {
    name: '基础组件',
    icon: 'carbon:cube',
    components: [
      { name: 'Button', path: '/demo/components' },
      { name: 'Divider', path: '/demo/divider' },
      { name: 'Icon', path: '/demo/components' },
      { name: 'Border', path: '/demo/components' },
    ],
  },
  {
    name: '表单组件',
    icon: 'carbon:document',
    components: [
      { name: 'Input', path: '/demo/components' },
      { name: 'Select', path: '/demo/components' },
      { name: 'Checkbox', path: '/demo/components' },
      { name: 'Radio', path: '/demo/components' },
    ],
  },
  {
    name: '数据展示',
    icon: 'carbon:chart-line',
    components: [
      { name: 'Table', path: '/demo/components' },
      { name: 'Card', path: '/demo/components' },
      { name: 'Avatar', path: '/demo/components' },
      { name: 'Badge', path: '/demo/components' },
    ],
  },
  {
    name: '导航组件',
    icon: 'carbon:navigation',
    components: [
      { name: 'Menu', path: '/demo/components' },
      { name: 'Tabs', path: '/demo/components' },
      { name: 'Breadcrumb', path: '/demo/components' },
      { name: 'Pagination', path: '/demo/components' },
    ],
  },
  {
    name: '反馈组件',
    icon: 'carbon:notification',
    components: [
      { name: 'Alert', path: '/demo/components' },
      { name: 'Modal', path: '/demo/components' },
      { name: 'Message', path: '/demo/components' },
      { name: 'Tooltip', path: '/demo/components' },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <header class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto flex items-center justify-between px-4 py-4 container">
        <div class="flex items-center gap-2">
          <ui-icon icon="carbon:cube" size="large" class="text-primary" />
          <h1 class="text-xl text-gray-900 font-bold dark:text-white">
            UI组件演示
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-gray-600 transition-colors dark:text-gray-400 hover:text-primary">
            <ui-icon icon="carbon:home" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="mx-auto px-4 py-12 container">
      <!-- 标题区域 -->
      <section class="mb-12 text-center">
        <h2 class="mb-4 text-3xl text-gray-900 font-bold dark:text-white">
          UI组件库
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          本项目使用自定义UI组件，结合UnoCSS原子化CSS框架，提供了一套简洁、美观的组件库
        </p>
      </section>

      <!-- 组件分类区域 -->
      <section class="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
        <div
          v-for="category in componentCategories"
          :key="category.name"
          class="border border-gray-100 rounded-xl bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-4 flex items-center gap-3">
            <ui-icon :icon="category.icon" size="large" class="text-primary" />
            <h3 class="text-xl text-gray-900 font-bold dark:text-white">
              {{ category.name }}
            </h3>
          </div>

          <ul class="space-y-3">
            <li v-for="component in category.components" :key="component.name">
              <NuxtLink
                :to="component.path"
                class="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="text-gray-700 dark:text-gray-300">{{ component.name }}</span>
                <ui-icon icon="carbon:arrow-right" class="text-gray-400" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>

      <!-- 特色组件展示 -->
      <section class="mt-16">
        <h3 class="mb-6 text-center text-2xl text-gray-900 font-bold dark:text-white">
          特色组件
        </h3>

        <div class="border border-gray-100 rounded-xl bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <!-- Divider组件展示 -->
            <div class="space-y-6">
              <h4 class="text-lg text-gray-900 font-bold dark:text-white">
                Divider 分割线
              </h4>

              <div class="space-y-6">
                <ui-divider>默认分割线</ui-divider>

                <ui-divider type="dashed" text-position="left">
                  左侧文本
                </ui-divider>

                <ui-divider type="dotted" text-position="right" color="primary">
                  右侧文本
                </ui-divider>

                <div class="h-32 flex">
                  <div class="flex flex-1 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
                    内容区域
                  </div>
                  <ui-divider direction="vertical" />
                  <div class="flex flex-1 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
                    内容区域
                  </div>
                </div>
              </div>

              <NuxtLink to="/demo/divider" class="hover:text-primary-dark inline-flex items-center text-primary">
                <span>查看更多Divider示例</span>
                <ui-icon icon="carbon:arrow-right" class="ml-1" />
              </NuxtLink>
            </div>

            <!-- Border组件展示 -->
            <div class="space-y-6">
              <h4 class="text-lg text-gray-900 font-bold dark:text-white">
                Border 边框
              </h4>

              <div class="space-y-4">
                <ui-border>
                  <div class="flex items-center justify-center p-4">
                    默认边框
                  </div>
                </ui-border>

                <ui-border type="dashed" color="primary" radius="lg">
                  <div class="flex items-center justify-center p-4">
                    圆角虚线边框
                  </div>
                </ui-border>

                <ui-border type="solid" color="danger" with-shadow>
                  <div class="flex items-center justify-center p-4">
                    带阴影边框
                  </div>
                </ui-border>

                <ui-border hover-effect="scale">
                  <div class="flex items-center justify-center p-4">
                    悬停缩放效果
                  </div>
                </ui-border>
              </div>

              <NuxtLink to="/demo/components" class="hover:text-primary-dark inline-flex items-center text-primary">
                <span>查看更多Border示例</span>
                <ui-icon icon="carbon:arrow-right" class="ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 按钮组件展示 -->
      <section class="mt-12">
        <div class="border border-gray-100 rounded-xl bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h4 class="mb-6 text-lg text-gray-900 font-bold dark:text-white">
            Button 按钮
          </h4>

          <div class="space-y-8">
            <div class="flex flex-wrap gap-4">
              <ui-button>默认按钮</ui-button>
              <ui-button type="primary">
                主要按钮
              </ui-button>
              <ui-button type="success">
                成功按钮
              </ui-button>
              <ui-button type="warning">
                警告按钮
              </ui-button>
              <ui-button type="danger">
                危险按钮
              </ui-button>
              <ui-button type="info">
                信息按钮
              </ui-button>
            </div>

            <div class="flex flex-wrap gap-4">
              <ui-button size="small">
                小型按钮
              </ui-button>
              <ui-button>默认大小</ui-button>
              <ui-button size="large">
                大型按钮
              </ui-button>
              <ui-button disabled>
                禁用按钮
              </ui-button>
              <ui-button icon="carbon:add">
                图标按钮
              </ui-button>
              <ui-button round>
                圆角按钮
              </ui-button>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink to="/demo/components" class="hover:text-primary-dark inline-flex items-center text-primary">
              <span>查看更多Button示例</span>
              <ui-icon icon="carbon:arrow-right" class="ml-1" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="mt-12 border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto px-4 text-center text-gray-600 container dark:text-gray-400">
        <p>UI组件库演示 &copy; {{ new Date().getFullYear() }}. 版权所有</p>
      </div>
    </footer>
  </div>
</template>
