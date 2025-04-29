<script setup lang="ts" name="DemoBorder">
/**
 * Border组件演示
 * 创建日期: 2023-12-01
 * 作者: aiftt
 */

// 边框类型
const borderTypes = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']

// 边框宽度
const borderWidths = ['thin', 'medium', 'thick', '1px', '2px', '4px']

// 边框圆角值
const borderRadiuses = ['0', '4px', '8px', '12px', '16px', '9999px']

// 边框颜色
const borderColors = [
  { value: 'primary', name: '主色' },
  { value: 'success', name: '成功色' },
  { value: 'warning', name: '警告色' },
  { value: 'danger', name: '危险色' },
  { value: 'gray-300', name: '浅灰色' },
  { value: 'gray-500', name: '中灰色' },
]

// 阴影大小
const shadows = [
  { value: 'sm', name: '小阴影' },
  { value: 'base', name: '中阴影' },
  { value: 'md', name: '标准阴影' },
  { value: 'lg', name: '大阴影' },
  { value: 'xl', name: '特大阴影' },
  { value: '2xl', name: '超大阴影' },
]
</script>

<template>
  <div class="demo-component">
    <div class="demo-section">
      <h3 class="demo-section-title">
        边框类型 (border-type)
      </h3>
      <p class="demo-section-desc">
        设置不同的边框类型样式
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <div v-for="type in borderTypes" :key="type" class="flex flex-col items-center">
          <ui-border :type="type" class="mb-2 p-4">
            {{ type }}
          </ui-border>
          <span class="text-sm">{{ type }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        边框宽度 (border-width)
      </h3>
      <p class="demo-section-desc">
        设置不同宽度的边框
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <div v-for="width in borderWidths" :key="width" class="flex flex-col items-center">
          <ui-border :width="width" class="mb-2 p-4">
            {{ width }}
          </ui-border>
          <span class="text-sm">{{ width }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        边框颜色 (border-color)
      </h3>
      <p class="demo-section-desc">
        设置不同颜色的边框
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <div v-for="color in borderColors" :key="color.value" class="flex flex-col items-center">
          <ui-border :color="color.value" class="mb-2 p-4">
            {{ color.name }}
          </ui-border>
          <span class="text-sm">{{ color.name }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        边框圆角 (border-radius)
      </h3>
      <p class="demo-section-desc">
        设置不同圆角大小的边框
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <div v-for="radius in borderRadiuses" :key="radius" class="flex flex-col items-center">
          <ui-border :radius="radius" class="mb-2 p-4">
            {{ radius }}
          </ui-border>
          <span class="text-sm">{{ radius }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        边框阴影 (border-shadow)
      </h3>
      <p class="demo-section-desc">
        设置不同阴影效果的边框
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <div v-for="shadow in shadows" :key="shadow.value" class="flex flex-col items-center">
          <ui-border :shadow="shadow.value" class="mb-2 p-4">
            {{ shadow.name }}
          </ui-border>
          <span class="text-sm">{{ shadow.name }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        边框悬停效果 (hover)
      </h3>
      <p class="demo-section-desc">
        鼠标悬停时显示不同的边框效果
      </p>
      <div class="demo-section-content flex flex-wrap gap-4">
        <ui-border hover-shadow="lg" class="mb-2 p-4">
          悬停显示阴影
        </ui-border>

        <ui-border hover-border-color="primary" class="mb-2 p-4">
          悬停变色
        </ui-border>

        <ui-border hover-scale="105" class="mb-2 p-4">
          悬停缩放
        </ui-border>

        <ui-border
          hover-border-color="primary"
          hover-shadow="md"
          hover-scale="103"
          class="mb-2 p-4"
        >
          组合效果
        </ui-border>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-component {
  width: 100%;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section:last-child {
  margin-bottom: 0;
}

.demo-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.demo-section-desc {
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.5);
}

.dark .demo-section-desc {
  color: rgba(255, 255, 255, 0.6);
}

.demo-section-content {
  padding: 1rem 0;
}
</style>
