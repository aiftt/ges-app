<script setup lang="ts">
/**
 * QRCode组件演示页面
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 使用标准demo组件
 * 更新日期: 2023-12-05 - 清理未使用的变量
 */
import DemoQrcode from '~/components/demo/qrcode.vue'

// 我们使用DemoQrcode组件，不需要这些变量，移除它们
</script>

<template>
  <div class="p-4 md:p-8">
    <DemoQrcode />
  </div>
</template>

<style scoped>
.qrcode-demo {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
