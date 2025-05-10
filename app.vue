<script setup lang="ts" name="AppRoot">
/**
 * 应用程序根组件
 * 创建日期: 2025-05-02
 * 作者: aiftt
 * 更新日期: 2025-05-03 - 改进主题使用方式，使用CSS变量作为基础
 * 更新日期: 2025-05-11 - 修复主题类型错误
 */
import { ref } from 'vue'

// 定义主题类型
type Theme = 'light' | 'dark' | 'auto'

// 自定义的主题覆盖变量（仅包含需要覆盖的变量）
const customLightTheme = {
  // 可以添加需要覆盖的变量，例如：
  // 'color-primary': '#3b82f6' // 将主色调改为蓝色
}

const customDarkTheme = {
  // 可以添加需要覆盖的变量，例如：
  // 'color-primary': '#2563eb' // 将主色调改为深蓝色
}

// 系统初始主题模式 - 默认为'light'
const theme = ref<Theme>('light')
</script>

<template>
  <ui-config-provider
    :theme="theme"
    :light-theme="customLightTheme"
    :dark-theme="customDarkTheme"
  >
    <div>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>

    <!-- 添加全局消息和通知组件 -->
    <ui-message />
    <ui-notification />
    <ui-messagebox />
  </ui-config-provider>
</template>
