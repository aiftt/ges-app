<script setup lang="ts" name="PageDemoAutoAnimate">
/**
 * Auto Animate 演示页面
 * 创建日期: 2025-04-29
 * 作者: aiftt
 * 更新日期: 2025-04-29 - 初始创建
 */

// 引入演示组件
</script>

<template>
  <div class="page-auto-animate">
    <header class="page-header">
      <h1 class="page-title">
        Auto Animate 动画效果
      </h1>
      <p class="page-description">
        @formkit/auto-animate 提供了简单易用的动画解决方案，无需任何配置即可为您的应用添加平滑过渡动画。
      </p>
      <div class="page-info">
        <div class="info-item">
          <span class="info-label">安装方式：</span>
          <span class="info-value">pnpm add @formkit/auto-animate @formkit/auto-animate/nuxt</span>
        </div>
        <div class="info-item">
          <span class="info-label">使用方式：</span>
          <span class="info-value">在元素上添加 v-auto-animate 指令即可启用动画效果</span>
        </div>
      </div>
    </header>

    <main class="page-content">
      <DemoAutoAnimate />
    </main>

    <section class="page-code-examples">
      <h2>代码示例</h2>

      <div class="code-card">
        <h3>基础列表动画</h3>
        <ui-code>
          const items = ref(['项目1', '项目2', '项目3']);

          function addItem() {
          items.value.push('新项目' + (items.value.length + 1));
          }

          function removeItem(index) {
          items.value.splice(index, 1);
          }
        </ui-code>

        <ui-code language="html">
          <ul v-auto-animate>
            <li v-for="(item, index) in items" :key="item">
              {{ item }}
              <button @click="removeItem(index)">
                删除
              </button>
            </li>
          </ul>
          <button @click="addItem">
            添加项目
          </button>
        </ui-code>
      </div>

      <div class="code-card">
        <h3>条件渲染动画</h3>
        <ui-code>
          const showContent = ref(false);

          function toggleContent() {
          showContent.value = !showContent.value;
          }
        </ui-code>

        <ui-code language="html">
          <div v-auto-animate>
            <div v-if="showContent" class="content">
              这里是可以展开和收起的内容...
            </div>
          </div>
          <button @click="toggleContent">
            {{ showContent ? '隐藏' : '显示' }}内容
          </button>
        </ui-code>
      </div>

      <div class="code-card">
        <h3>使用选项进行自定义</h3>
        <ui-code>
          import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

          // 在Nuxt应用中使用插件选项
          // nuxt.config.ts
          export default defineNuxtConfig({
          modules: [
          ['@formkit/auto-animate/nuxt', {
          duration: 250, // 默认持续时间 (ms)
          easing: 'ease-in-out', // 默认缓动函数
          active: true, // 默认启用状态
          }]
          ]
          })

          // 在单个组件中使用自定义选项
          const options = {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }
        </ui-code>

        <ui-code language="html">
          <!-- 使用自定义选项 -->
          <div v-auto-animate="options">
            <!-- 内容 -->
          </div>
        </ui-code>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-auto-animate {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  margin-bottom: 3rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--ui-color-primary);
}

.page-description {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: var(--ui-color-text-secondary);
}

.page-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg-subtle);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-weight: bold;
  color: var(--ui-color-primary);
}

.info-value {
  font-family: monospace;
  padding: 0.5rem;
  background-color: var(--ui-color-bg);
  border-radius: 0.25rem;
  overflow-x: auto;
  white-space: nowrap;
}

.page-content {
  margin-bottom: 3rem;
}

.page-code-examples {
  margin-top: 4rem;
}

.page-code-examples h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.code-card {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.code-card h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--ui-color-primary);
}

/* 暗色主题适配 */
:root.dark .page-info {
  background-color: var(--ui-color-bg-subtle-dark);
}

:root.dark .info-value {
  background-color: var(--ui-color-bg-dark);
}

:root.dark .code-card {
  background-color: var(--ui-color-bg-dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }
}
</style>
