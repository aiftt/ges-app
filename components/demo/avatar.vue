<script setup lang="ts" name="DemoAvatar">
/**
 * Avatar 头像组件演示
 * 创建日期: 2024-06-21
 * 作者: aiftt
 * 更新日期: 2024-06-21 - 初始版本
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
</script>

<template>
  <div class="demo-container">
    <h2 class="demo-title">
      Avatar 头像
    </h2>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        基础用法
      </h3>
      <div class="demo-item">
        <ui-avatar :src="users[0].src" />
        <ui-avatar :text="users[1].name" />
        <ui-avatar icon="carbon:user" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;https://xsgames.co/randomusers/avatar.php?g=male&seed=1&quot; />
<ui-avatar text=&quot;李四&quot; />
<ui-avatar icon=&quot;carbon:user&quot; />"
        />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        不同尺寸
      </h3>
      <div class="demo-item">
        <ui-avatar :src="users[0].src" size="small" />
        <ui-avatar :src="users[0].src" />
        <ui-avatar :src="users[0].src" size="large" />
        <ui-avatar :src="users[0].src" :size="64" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;...&quot; size=&quot;small&quot; />
<ui-avatar src=&quot;...&quot; /> <!-- 默认尺寸 -->
<ui-avatar src=&quot;...&quot; size=&quot;large&quot; />
<ui-avatar src=&quot;...&quot; :size=&quot;64&quot; /> <!-- 自定义尺寸 -->"
        />
      </div>
    </section>

    <!-- 不同形状 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        不同形状
      </h3>
      <div class="demo-item">
        <ui-avatar :src="users[1].src" shape="circle" />
        <ui-avatar :src="users[1].src" shape="square" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;...&quot; shape=&quot;circle&quot; /> <!-- 默认圆形 -->
<ui-avatar src=&quot;...&quot; shape=&quot;square&quot; />"
        />
      </div>
    </section>

    <!-- 文字头像 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        文字头像
      </h3>
      <div class="demo-item">
        <ui-avatar v-for="(user, i) in users" :key="i" :text="user.name" :index="i" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar text=&quot;张三&quot; :index=&quot;0&quot; />
<ui-avatar text=&quot;李四&quot; :index=&quot;1&quot; />
<ui-avatar text=&quot;王五&quot; :index=&quot;2&quot; />"
        />
      </div>
    </section>

    <!-- 图标头像 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        图标头像
      </h3>
      <div class="demo-item">
        <ui-avatar icon="carbon:user" />
        <ui-avatar icon="carbon:user-admin" />
        <ui-avatar icon="carbon:user-profile" />
        <ui-avatar icon="carbon:user-avatar" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar icon=&quot;carbon:user&quot; />
<ui-avatar icon=&quot;carbon:user-admin&quot; />
<ui-avatar icon=&quot;carbon:user-profile&quot; />
<ui-avatar icon=&quot;carbon:user-avatar&quot; />"
        />
      </div>
    </section>

    <!-- 带边框 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        带边框
      </h3>
      <div class="demo-item">
        <ui-avatar :src="users[2].src" bordered />
        <ui-avatar :text="users[3].name" bordered />
        <ui-avatar icon="carbon:user" bordered />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;...&quot; bordered />
<ui-avatar text=&quot;赵六&quot; bordered />
<ui-avatar icon=&quot;carbon:user&quot; bordered />"
        />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        自定义颜色
      </h3>
      <div class="demo-item">
        <ui-avatar text="张" bg-color="#8B5CF6" color="#FFFFFF" />
        <ui-avatar text="李" bg-color="#EC4899" color="#FFFFFF" />
        <ui-avatar text="王" bg-color="#10B981" color="#FFFFFF" />
        <ui-avatar text="赵" bg-color="#F59E0B" color="#FFFFFF" />
        <ui-avatar icon="carbon:user" bg-color="#3B82F6" color="#FFFFFF" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar text=&quot;张&quot; bg-color=&quot;#8B5CF6&quot; color=&quot;#FFFFFF&quot; />
<ui-avatar text=&quot;李&quot; bg-color=&quot;#EC4899&quot; color=&quot;#FFFFFF&quot; />
<ui-avatar text=&quot;王&quot; bg-color=&quot;#10B981&quot; color=&quot;#FFFFFF&quot; />
<ui-avatar text=&quot;赵&quot; bg-color=&quot;#F59E0B&quot; color=&quot;#FFFFFF&quot; />
<ui-avatar icon=&quot;carbon:user&quot; bg-color=&quot;#3B82F6&quot; color=&quot;#FFFFFF&quot; />"
        />
      </div>
    </section>

    <!-- 图片适应方式 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        图片适应方式
      </h3>
      <div class="demo-item">
        <div>
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            cover (默认)
          </div>
          <ui-avatar :src="users[4].src" fit="cover" />
        </div>
        <div>
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            contain
          </div>
          <ui-avatar :src="users[4].src" fit="contain" />
        </div>
        <div>
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            fill
          </div>
          <ui-avatar :src="users[4].src" fit="fill" />
        </div>
        <div>
          <div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            none
          </div>
          <ui-avatar :src="users[4].src" fit="none" />
        </div>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;...&quot; fit=&quot;cover&quot; /> <!-- 默认 -->
<ui-avatar src=&quot;...&quot; fit=&quot;contain&quot; />
<ui-avatar src=&quot;...&quot; fit=&quot;fill&quot; />
<ui-avatar src=&quot;...&quot; fit=&quot;none&quot; />"
        />
      </div>
    </section>

    <!-- 加载失败 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        加载失败
      </h3>
      <div class="demo-item">
        <ui-avatar src="/invalid-image.jpg" alt="头像" />
        <ui-avatar :src="errorImage ? 'invalid-url' : users[0].src" :alt="users[0].name" />
        <ui-button size="small" @click="toggleErrorImage">
          {{ errorImage ? '恢复图片' : '模拟加载失败' }}
        </ui-button>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-avatar src=&quot;/invalid-image.jpg&quot; alt=&quot;头像&quot; />"
        />
      </div>
    </section>
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
