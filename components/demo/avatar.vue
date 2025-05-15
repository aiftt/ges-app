<script setup lang="ts" name="DemoAvatar">
/**
 * Avatar 头像组件演示
 * 创建日期: 2024-06-21
 * 作者: aiftt
 * 更新日期: 2024-06-21 - 初始版本
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 演示数据
const users = [
  { name: '张三', src: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=1' },
  { name: '李四', src: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=2' },
  { name: '王五', src: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=3' },
  { name: '赵六', src: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=4' },
  { name: '钱七', src: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=5' },
]

// 模拟图片加载错误
const errorImage = ref(false)
function toggleErrorImage() {
  errorImage.value = !errorImage.value
}

// 代码示例
const basicCode = `<ui-avatar src="https://xsgames.co/randomusers/avatar.php?g=male&seed=1" />
<ui-avatar text="李四" />
<ui-avatar icon="carbon:user" />`

const sizeCode = `<ui-avatar src="..." size="small" />
<ui-avatar src="..." /> <!-- 默认尺寸 -->
<ui-avatar src="..." size="large" />
<ui-avatar src="..." :size="64" /> <!-- 自定义尺寸 -->`

const shapeCode = `<ui-avatar src="..." shape="circle" /> <!-- 默认圆形 -->
<ui-avatar src="..." shape="square" />`

const textCode = `<ui-avatar text="张三" :index="0" />
<ui-avatar text="李四" :index="1" />
<ui-avatar text="王五" :index="2" />
<ui-avatar text="赵六" :index="3" />
<ui-avatar text="钱七" :index="4" />`

const iconCode = `<ui-avatar icon="carbon:user" />
<ui-avatar icon="carbon:user-admin" />
<ui-avatar icon="carbon:user-profile" />
<ui-avatar icon="carbon:user-avatar" />`

const borderedCode = `<ui-avatar src="..." bordered />
<ui-avatar text="赵六" bordered />
<ui-avatar icon="carbon:user" bordered />`

const colorCode = `<ui-avatar text="张" bg-color="#8B5CF6" color="#FFFFFF" />
<ui-avatar text="李" bg-color="#EC4899" color="#FFFFFF" />
<ui-avatar text="王" bg-color="#10B981" color="#FFFFFF" />
<ui-avatar text="赵" bg-color="#F59E0B" color="#FFFFFF" />
<ui-avatar icon="carbon:user" bg-color="#3B82F6" color="#FFFFFF" />`

const fitCode = `<ui-avatar src="..." fit="cover" /> <!-- 默认 -->
<ui-avatar src="..." fit="contain" />
<ui-avatar src="..." fit="fill" />
<ui-avatar src="..." fit="none" />`

const errorCode = `<ui-avatar src="/invalid-image.jpg" alt="头像" />

<!-- 动态切换示例 -->
<ui-avatar :src="errorImage ? 'invalid-url' : users[0].src" alt="头像" />
<ui-button size="small" @click="toggleErrorImage">
  {{ errorImage ? '恢复图片' : '模拟加载失败' }}
</ui-button>

<script setup>
const errorImage = ref(false)
function toggleErrorImage() {
  errorImage.value = !errorImage.value
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Avatar 头像
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用来代表用户或事物的头像组件，支持图片、图标或字符展示。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="支持三种类型：图片头像、图标头像和文字头像。"
      :code="basicCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar :src="users[0].src" />
        <ui-avatar :text="users[1].name" />
        <ui-avatar icon="carbon:user" />
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="头像有小、中、大三种尺寸，也可以通过 size 属性自定义尺寸。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar :src="users[0].src" size="small" />
        <ui-avatar :src="users[0].src" />
        <ui-avatar :src="users[0].src" size="large" />
        <ui-avatar :src="users[0].src" :size="64" />
      </div>
    </ui-demo>

    <!-- 不同形状 -->
    <ui-demo
      title="不同形状"
      description="头像支持圆形和方形两种形状，默认为圆形。"
      :code="shapeCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar :src="users[1].src" shape="circle" />
        <ui-avatar :src="users[1].src" shape="square" />
      </div>
    </ui-demo>

    <!-- 文字头像 -->
    <ui-demo
      title="文字头像"
      description="使用文字作为头像内容，并根据索引自动分配不同的背景色。"
      :code="textCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar v-for="(user, i) in users" :key="i" :text="user.name" :index="i" />
      </div>
    </ui-demo>

    <!-- 图标头像 -->
    <ui-demo
      title="图标头像"
      description="使用图标作为头像内容，支持所有图标库。"
      :code="iconCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar icon="carbon:user" />
        <ui-avatar icon="carbon:user-admin" />
        <ui-avatar icon="carbon:user-profile" />
        <ui-avatar icon="carbon:user-avatar" />
      </div>
    </ui-demo>

    <!-- 带边框 -->
    <ui-demo
      title="带边框"
      description="设置 bordered 属性可以为头像添加边框。"
      :code="borderedCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar :src="users[2].src" bordered />
        <ui-avatar :text="users[3].name" bordered />
        <ui-avatar icon="carbon:user" bordered />
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="设置 bg-color 和 color 属性可以自定义背景色和文字颜色。"
      :code="colorCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar text="张" bg-color="#8B5CF6" color="#FFFFFF" />
        <ui-avatar text="李" bg-color="#EC4899" color="#FFFFFF" />
        <ui-avatar text="王" bg-color="#10B981" color="#FFFFFF" />
        <ui-avatar text="赵" bg-color="#F59E0B" color="#FFFFFF" />
        <ui-avatar icon="carbon:user" bg-color="#3B82F6" color="#FFFFFF" />
      </div>
    </ui-demo>

    <!-- 图片适应方式 -->
    <ui-demo
      title="图片适应方式"
      description="设置 fit 属性可以控制图片如何适应容器。"
      :code="fitCode"
    >
      <div class="flex flex-wrap items-center gap-8">
        <div class="text-center">
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            cover (默认)
          </div>
          <ui-avatar :src="users[4].src" fit="cover" />
        </div>
        <div class="text-center">
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            contain
          </div>
          <ui-avatar :src="users[4].src" fit="contain" />
        </div>
        <div class="text-center">
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            fill
          </div>
          <ui-avatar :src="users[4].src" fit="fill" />
        </div>
        <div class="text-center">
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            none
          </div>
          <ui-avatar :src="users[4].src" fit="none" />
        </div>
      </div>
    </ui-demo>

    <!-- 加载失败 -->
    <ui-demo
      title="加载失败"
      description="图片加载失败时会显示备选内容（自动尝试显示alt文本，如无则显示图标）。"
      :code="errorCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-avatar src="/invalid-image.jpg" alt="头像" />
        <ui-avatar :src="errorImage ? 'invalid-url' : users[0].src" :alt="users[0].name" />
        <ui-button size="small" @click="toggleErrorImage">
          {{ errorImage ? '恢复图片' : '模拟加载失败' }}
        </ui-button>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                src
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图片头像的资源地址
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                alt
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图片头像的替代文本
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图标头像的图标名称
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                text
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文字头像的文本内容
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                头像尺寸
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large' / number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                shape
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                头像形状
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'circle' / 'square'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'circle'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                bordered
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示边框
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                fit
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图片如何适应容器
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'cover' / 'contain' / 'fill' / 'none'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'cover'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                index
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                用于文字头像的背景色索引
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                bg-color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义背景色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义文字颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                error
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图片加载失败时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (e: Event)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  font-family: var(--ui-font-family, system-ui, sans-serif);
  color: var(--ui-color-text);
}

.demo-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
}

.demo-item {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.demo-code {
  border-radius: 6px;
  margin-top: 12px;
  overflow-x: auto;
}
</style>
