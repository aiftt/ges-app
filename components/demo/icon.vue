<script setup lang="ts" name="DemoIcon">
/**
 * 图标组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 更新日期: 2024-12-13 - 更新演示代码以适配修改后的图标组件
 * 更新日期: 2024-12-13 - 使用 ui-demo 组件重构演示代码
 */

// 常用图标集合
const iconCollections = [
  { name: 'Material Design Icons', prefix: 'mdi', icons: ['home', 'account', 'cog', 'bell', 'heart', 'email', 'calendar', 'file', 'folder', 'star'] },
  { name: 'Carbon', prefix: 'carbon', icons: ['home', 'user', 'settings', 'notification', 'favorite', 'email', 'calendar', 'document', 'folder', 'star'] },
  { name: 'Ant Design', prefix: 'ant-design', icons: ['home-outlined', 'user-outlined', 'setting-outlined', 'bell-outlined', 'heart-outlined', 'mail-outlined', 'calendar-outlined', 'file-outlined', 'folder-outlined', 'star-outlined'] },
  { name: 'Feather', prefix: 'feather', icons: ['home', 'user', 'settings', 'bell', 'heart', 'mail', 'calendar', 'file', 'folder', 'star'] },
]

// 图标尺寸示例
const iconSizes = [
  { name: '超小', value: 'xs', size: '12px' },
  { name: '小', value: 'sm', size: '16px' },
  { name: '中', value: 'md', size: '24px' },
  { name: '大', value: 'lg', size: '32px' },
  { name: '超大', value: 'xl', size: '48px' },
]

// 图标颜色示例
const iconColors = [
  { name: '主要色', value: 'primary', color: 'var(--ui-color-primary, #10b981)' },
  { name: '成功色', value: 'success', color: 'var(--ui-color-success, #10b981)' },
  { name: '警告色', value: 'warning', color: 'var(--ui-color-warning, #f59e0b)' },
  { name: '危险色', value: 'danger', color: 'var(--ui-color-danger, #ef4444)' },
  { name: '信息色', value: 'info', color: 'var(--ui-color-info, #3b82f6)' },
  { name: '自定义色', value: '#8B5CF6', color: '#8B5CF6' },
]

// 动画效果列表
const animations = [
  { name: '旋转', value: 'spin' as const },
  { name: '跳动', value: 'pulse' as const },
  { name: '摇晃', value: 'shake' as const },
  { name: '闪烁', value: 'blink' as const },
]

// 高级动画效果
const advancedAnimations = [
  { name: '摇摆', value: 'magic-anim-swing', icon: 'mdi:balance-scale' },
  { name: '抖动', value: 'magic-anim-tada', icon: 'mdi:bell-ring' },
  { name: '弹跳', value: 'magic-anim-bounce', icon: 'mdi:basketball' },
  { name: '橡皮筋', value: 'magic-anim-rubberBand', icon: 'mdi:vector-circle' },
  { name: '果冻', value: 'magic-anim-jello', icon: 'mdi:jellyfish' },
  { name: '颤抖', value: 'magic-anim-wobble', icon: 'mdi:pan-horizontal' },
]

// CSS摇晃动画
const shakeAnimations = [
  { name: '小幅摇晃', value: 'css-shake-little', icon: 'mdi:arrow-left-right' },
  { name: '硬式摇晃', value: 'css-shake-hard', icon: 'mdi:anvil' },
  { name: '水平摇晃', value: 'css-shake-horizontal', icon: 'mdi:arrow-left-right-bold' },
  { name: '垂直摇晃', value: 'css-shake-vertical', icon: 'mdi:arrow-up-down-bold' },
  { name: '旋转摇晃', value: 'css-shake-rotate', icon: 'mdi:rotate-3d-variant' },
  { name: '疯狂摇晃', value: 'css-shake-crazy', icon: 'mdi:lightning-bolt' },
]

// 复制图标名称到剪贴板
function copyIconName(collection: string, name: string) {
  const iconName = `${collection}:${name}`
  navigator.clipboard.writeText(iconName)
    .then(() => {
      // 创建Toast消息
      const message = document.createElement('div')
      message.textContent = `已复制图标名称: ${iconName}`
      message.style.position = 'fixed'
      message.style.bottom = '20px'
      message.style.left = '50%'
      message.style.transform = 'translateX(-50%)'
      message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
      message.style.color = 'white'
      message.style.padding = '8px 16px'
      message.style.borderRadius = '4px'
      message.style.zIndex = '9999'
      message.style.opacity = '1'
      message.style.transition = 'opacity 0.3s'

      document.body.appendChild(message)

      // 2秒后移除消息
      setTimeout(() => {
        message.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(message)
        }, 300)
      }, 2000)
    })
    .catch((err) => {
      console.error('复制失败:', err)
    })
}

// 示例代码
const basicIconCode = `<div class="flex flex-wrap items-center gap-4">
  <ui-icon icon="mdi:home" />
  <ui-icon icon="carbon:user" />
  <ui-icon icon="ant-design:setting-outlined" />
  <ui-icon icon="feather:mail" />
  <ui-icon icon="mdi:github" />
  <ui-icon icon="carbon:logo-vue" />
</div>`

const iconSizeCode = `<div class="flex flex-wrap items-end gap-6">
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="12px" />
    <span class="mt-2 text-xs">超小 (12px)</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="16px" />
    <span class="mt-2 text-xs">小 (16px)</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="24px" />
    <span class="mt-2 text-xs">中 (24px)</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="32px" />
    <span class="mt-2 text-xs">大 (32px)</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="48px" />
    <span class="mt-2 text-xs">超大 (48px)</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:star" size="56px" />
    <span class="mt-2 text-xs">自定义 (56px)</span>
  </div>
</div>`

const iconColorCode = `<div class="flex flex-wrap gap-6">
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="primary" size="32px" />
    <span class="mt-2 text-xs">主要色</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="success" size="32px" />
    <span class="mt-2 text-xs">成功色</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="warning" size="32px" />
    <span class="mt-2 text-xs">警告色</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="danger" size="32px" />
    <span class="mt-2 text-xs">危险色</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="info" size="32px" />
    <span class="mt-2 text-xs">信息色</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" color="#8B5CF6" size="32px" />
    <span class="mt-2 text-xs">自定义色</span>
  </div>
</div>`

const iconAnimationCode = `<div class="flex flex-wrap gap-6">
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:refresh" animation="spin" size="32px" color="primary" />
    <span class="mt-2 text-xs">旋转</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" animation="pulse" size="32px" color="primary" />
    <span class="mt-2 text-xs">跳动</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" animation="shake" size="32px" color="primary" />
    <span class="mt-2 text-xs">摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:heart" animation="blink" size="32px" color="primary" />
    <span class="mt-2 text-xs">闪烁</span>
  </div>
</div>`

const iconButtonCode = `<div class="flex flex-wrap gap-4">
  <ui-button type="primary" icon="mdi:plus">创建</ui-button>
  <ui-button type="success" icon="mdi:check">确认</ui-button>
  <ui-button type="danger" icon="mdi:delete">删除</ui-button>
  <ui-button type="info" icon="mdi:information">信息</ui-button>
  <ui-button type="warning" icon="mdi:alert">警告</ui-button>
</div>`

// 高级动画示例代码
const advancedAnimationsCode = `<div class="flex flex-wrap gap-6">
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:balance-scale" animation="magic-anim-swing" size="32px" color="primary" />
    <span class="mt-2 text-xs">摇摆</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:bell-ring" animation="magic-anim-tada" size="32px" color="primary" />
    <span class="mt-2 text-xs">抖动</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:basketball" animation="magic-anim-bounce" size="32px" color="primary" />
    <span class="mt-2 text-xs">弹跳</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:vector-circle" animation="magic-anim-rubberBand" size="32px" color="primary" />
    <span class="mt-2 text-xs">橡皮筋</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:jellyfish" animation="magic-anim-jello" size="32px" color="primary" />
    <span class="mt-2 text-xs">果冻</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:pan-horizontal" animation="magic-anim-wobble" size="32px" color="primary" />
    <span class="mt-2 text-xs">颤抖</span>
  </div>
</div>`

// CSS摇晃动画示例代码
const shakeAnimationsCode = `<div class="flex flex-wrap gap-6">
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:arrow-left-right" animation="css-shake-little" size="32px" color="primary" />
    <span class="mt-2 text-xs">小幅摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:anvil" animation="css-shake-hard" size="32px" color="primary" />
    <span class="mt-2 text-xs">硬式摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:arrow-left-right-bold" animation="css-shake-horizontal" size="32px" color="primary" />
    <span class="mt-2 text-xs">水平摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:arrow-up-down-bold" animation="css-shake-vertical" size="32px" color="primary" />
    <span class="mt-2 text-xs">垂直摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:rotate-3d-variant" animation="css-shake-rotate" size="32px" color="primary" />
    <span class="mt-2 text-xs">旋转摇晃</span>
  </div>
  <div class="flex flex-col items-center">
    <ui-icon icon="mdi:lightning-bolt" animation="css-shake-crazy" size="32px" color="primary" />
    <span class="mt-2 text-xs">疯狂摇晃</span>
  </div>
</div>`
</script>

<template>
  <div class="space-y-6">
    <h2 class="mb-6 text-xl font-bold">
      Icon 图标组件
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      图标组件基于Iconify提供跨框架的图标支持，可以使用多种流行图标库，支持自定义尺寸、颜色和动画效果。
    </p>

    <!-- 基础图标 -->
    <ui-demo
      title="基础图标"
      description="图标组件基于Iconify提供跨框架的图标支持，可以使用多种流行图标库。"
      :code="basicIconCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-icon icon="mdi:home" />
        <ui-icon icon="carbon:user" />
        <ui-icon icon="ant-design:setting-outlined" />
        <ui-icon icon="feather:mail" />
        <ui-icon icon="mdi:github" />
        <ui-icon icon="carbon:logo-vue" />
      </div>
    </ui-demo>

    <!-- 图标尺寸 -->
    <ui-demo
      title="图标尺寸"
      description="支持多种预设尺寸，也可以通过传入自定义尺寸数值设置图标大小。"
      :code="iconSizeCode"
    >
      <div class="flex flex-wrap items-end gap-6">
        <div v-for="size in iconSizes" :key="size.value" class="flex flex-col items-center">
          <ui-icon icon="mdi:star" :size="size.size" />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ size.name }} ({{ size.size }})</span>
        </div>
        <div class="flex flex-col items-center">
          <ui-icon icon="mdi:star" size="56px" />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">自定义 (56px)</span>
        </div>
      </div>
    </ui-demo>

    <!-- 图标颜色 -->
    <ui-demo
      title="图标颜色"
      description="可以使用主题预设的语义化颜色或自定义颜色值。"
      :code="iconColorCode"
    >
      <div class="flex flex-wrap gap-6">
        <div v-for="color in iconColors" :key="color.value" class="flex flex-col items-center">
          <ui-icon icon="mdi:heart" :color="color.value" size="32px" />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ color.name }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 图标动画 -->
    <ui-demo
      title="图标动画"
      description="支持多种动画效果，使图标更具交互性。"
      :code="iconAnimationCode"
    >
      <div class="flex flex-wrap gap-6">
        <div v-for="animation in animations" :key="animation.value" class="flex flex-col items-center">
          <ui-icon
            :icon="animation.value === 'spin' ? 'mdi:refresh' : 'mdi:heart'"
            :animation="animation.value"
            size="32px"
            color="primary"
          />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ animation.name }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 高级动画效果 -->
    <ui-demo
      title="高级动画效果"
      description="使用高级动画效果，使图标更具交互性。"
      :code="advancedAnimationsCode"
    >
      <div class="flex flex-wrap gap-6">
        <div v-for="animation in advancedAnimations" :key="animation.value" class="flex flex-col items-center">
          <ui-icon
            :icon="animation.icon"
            :animation="animation.value"
            size="32px"
            color="primary"
          />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ animation.name }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- CSS摇晃动画 -->
    <ui-demo
      title="CSS摇晃动画"
      description="使用CSS摇晃动画，使图标更具交互性。"
      :code="shakeAnimationsCode"
    >
      <div class="flex flex-wrap gap-6">
        <div v-for="animation in shakeAnimations" :key="animation.value" class="flex flex-col items-center">
          <ui-icon
            :icon="animation.icon"
            :animation="animation.value"
            size="32px"
            color="primary"
          />
          <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ animation.name }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 常用图标集合 -->
    <ui-demo
      title="常用图标集合"
      description="点击图标可复制图标名称。"
      code=""
    >
      <div v-for="collection in iconCollections" :key="collection.prefix" class="mb-8">
        <h4 class="mb-3 text-gray-800 font-medium dark:text-gray-200">
          {{ collection.name }}
        </h4>
        <div class="border rounded bg-white p-4 dark:bg-gray-800">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-3">
            <div
              v-for="icon in collection.icons"
              :key="`${collection.prefix}-${icon}`"
              class="flex flex-col cursor-pointer items-center rounded p-3 transition hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="copyIconName(collection.prefix, icon)"
            >
              <ui-icon :icon="`${collection.prefix}:${icon}`" />
              <span class="mt-2 w-full truncate text-center text-xs text-gray-600 dark:text-gray-400">{{ icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 与按钮结合使用 -->
    <ui-demo
      title="与按钮结合使用"
      description="图标可以与按钮结合使用，提供更好的交互体验。"
      :code="iconButtonCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button type="primary" icon="mdi:plus">
          创建
        </ui-button>
        <ui-button type="success" icon="mdi:check">
          确认
        </ui-button>
        <ui-button type="danger" icon="mdi:delete">
          删除
        </ui-button>
        <ui-button type="info" icon="mdi:information">
          信息
        </ui-button>
        <ui-button type="warning" icon="mdi:alert">
          警告
        </ui-button>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <div class="mt-8">
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        API参考
      </h3>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              属性
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              类型
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              默认值
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              icon
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              图标名称，使用 Iconify 格式，如 'mdi:home'
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              size
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              default
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              图标尺寸，可以是预设值（small/default/large）或 CSS 尺寸值（如 '24px'）
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              color
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              图标颜色，可以是主题预设（primary/success/warning/danger/info）或 CSS 颜色值
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              animation
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              动画效果：可使用预设值（spin/pulse/shake/blink）或直接传递动画类名（魔法动画格式：magic-anim-{name}，CSS摇晃格式：css-shake-{name}）
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              class
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              自定义类名
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-component {
  width: 100%;
}

.demo-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
  padding-bottom: 1.5rem;
}

.demo-section:last-child {
  border-bottom: none;
}

.demo-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.demo-section-desc {
  color: var(--ui-text-color-secondary, #6b7280);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.demo-section-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.demo-code-control {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.demo-code-button {
  background: none;
  border: none;
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.demo-code-button:hover {
  text-decoration: underline;
}

.demo-code {
  background-color: var(--ui-code-bg, #f3f4f6);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--ui-code-color, #1f2937);
}

.demo-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.demo-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  transition: all 0.2s;
}

.demo-icon-item:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.demo-icon-name {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-icon-key {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-text-color-secondary, #6b7280);
}

.demo-api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.demo-api-table th,
.demo-api-table td {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  padding: 0.75rem 1rem;
  text-align: left;
}

.demo-api-table th {
  background-color: var(--ui-table-header-bg, #f9fafb);
  font-weight: 600;
}

.demo-api-table tr:nth-child(even) {
  background-color: var(--ui-table-stripe-bg, #f3f4f6);
}

.dark .demo-code {
  --ui-code-bg: #1f2937;
  --ui-code-color: #e5e7eb;
}

.dark .demo-api-table th {
  --ui-table-header-bg: #111827;
}

.dark .demo-api-table tr:nth-child(even) {
  --ui-table-stripe-bg: #1f2937;
}

.dark .demo-icon-item {
  border-color: var(--ui-border-color, #374151);
}
</style>
