<script setup lang="ts" name="DemoDivider">
/**
 * 分割线组件演示
 * 创建日期: 2023-11-30
 * 作者: aiftt
 */

// 分割线方向
const _directions = ['horizontal', 'vertical']

// 分割线文本位置
const textPositions = ['left', 'center', 'right']

// 分割线类型
const dividerTypes = ['solid', 'dashed', 'dotted']

// 分割线颜色
const dividerColors = [
  { name: '默认色', value: '' },
  { name: '主要色', value: 'primary' },
  { name: '成功色', value: 'success' },
  { name: '警告色', value: 'warning' },
  { name: '危险色', value: 'danger' },
  { name: '信息色', value: 'info' },
]

// 段落文本样例
const paragraphText = 'Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。'
</script>

<template>
  <div class="space-y-10">
    <!-- 基础分割线 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础分割线
      </h3>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <p>{{ paragraphText }}</p>
        <ui-divider />
        <p>{{ paragraphText }}</p>
      </div>
    </section>

    <!-- 带文本的分割线 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        带文本的分割线
      </h3>
      <div class="border rounded bg-white p-4 space-y-8 dark:bg-gray-800">
        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider>默认居中</ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider text-position="left">
            左对齐文本
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider text-position="right">
            右对齐文本
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>
      </div>
    </section>

    <!-- 文本位置对比 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本位置
      </h3>
      <div class="border rounded bg-white p-4 space-y-4 dark:bg-gray-800">
        <div v-for="position in textPositions" :key="position" class="flex items-center">
          <span class="w-20 text-gray-600 dark:text-gray-400">{{ position }}</span>
          <div class="flex-1">
            <ui-divider :text-position="position" with-text>
              {{ position }}
            </ui-divider>
          </div>
        </div>
      </div>
    </section>

    <!-- 垂直分割线 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        垂直分割线
      </h3>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="h-40 flex items-center">
          <span>左侧内容</span>
          <ui-divider direction="vertical" width="80%" margin="0 20px" />
          <div class="flex-1">
            <p>{{ paragraphText }}</p>
          </div>
          <ui-divider direction="vertical" width="60%" margin="0 20px" />
          <span>右侧内容</span>
        </div>
      </div>
    </section>

    <!-- 分割线类型 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        分割线类型
      </h3>
      <div class="border rounded bg-white p-4 space-y-6 dark:bg-gray-800">
        <div v-for="type in dividerTypes" :key="type" class="space-y-2">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ type }}
          </div>
          <ui-divider :type="type">
            {{ type }}
          </ui-divider>
        </div>
      </div>
    </section>

    <!-- 分割线颜色 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        分割线颜色
      </h3>
      <div class="border rounded bg-white p-4 space-y-6 dark:bg-gray-800">
        <div v-for="color in dividerColors" :key="color.value || 'default'" class="space-y-2">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ color.name }}
          </div>
          <ui-divider :color="color.value">
            {{ color.name }}
          </ui-divider>
        </div>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义样式
      </h3>
      <div class="border rounded bg-white p-4 space-y-6 dark:bg-gray-800">
        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider
            color="primary"
            width="5px"
            type="solid"
            margin="24px 0"
          >
            粗线分割
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider
            color="#FF6B6B"
            class="custom-divider"
          >
            自定义颜色
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-divider {
  /* 自定义分割线样式 */
  font-weight: bold;
}
</style>
