<script setup lang="ts" name="DemoComponents">
/**
 * UI组件展示页面
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-11-15 - 添加 Image 组件
 * 2023-12-01 - 添加 QRCode 组件和 Menu 组件
 * 2023-12-12 - 添加主题色彩展示页面
 * 2023-05-07 - 添加 Scrollbar, Popover, Popconfirm 和 Trigger 组件
 * 2023-05-08 - 统一使用 components/demo 下的组件
 * 2024-05-26 - 添加 Select 组件
 * 2024-06-20 - 添加 Badge 组件
 * 2024-06-21 - 添加 Avatar 组件
 * 2024-06-21 - 修复组件引用性能警告
 * 2024-06-22 - 添加 Card 组件
 * 2024-06-22 - 添加 ResizeBox 组件
 * 2024-06-22 - 添加 Collapse 组件
 * 2024-06-23 - 添加 Modal 组件
 * 2024-06-24 - 添加 Alert 组件
 * 2024-06-25 - 添加 Drawer 组件
 * 2024-07-05 - 添加 Input Number 组件
 * 2024-07-08 - 添加 Input Tag 组件
 * 2024-07-09 - 添加缺失的演示组件
 * 2024-07-09 - 添加 Autocomplete 和 VerificationCode 组件
 * 2024-07-09 - 添加 Split 组件
 * 2024-07-09 - 添加 Cascader 组件
 * 2024-07-09 - 修复布局组件分组中的重复组件和未实现组件引用
 * 2024-07-16 - 添加 Table 和 Pagination 组件
 * 2024-07-22 - 添加 Carousel 组件
 * 2024-07-23 - 添加 Empty 组件
 */
import { computed, markRaw, ref } from 'vue'
import DemoAlert from '~/components/demo/alert.vue'
import DemoAutoAnimate from '~/components/demo/auto-animate.vue'
import DemoAutocomplete from '~/components/demo/autocomplete.vue'
import DemoAvatar from '~/components/demo/avatar.vue'
import DemoBadge from '~/components/demo/badge.vue'
import DemoBorder from '~/components/demo/border.vue'
import DemoButton from '~/components/demo/button.vue'
import DemoCard from '~/components/demo/card.vue'
import DemoCarousel from '~/components/demo/carousel.vue'
import DemoCascader from '~/components/demo/cascader.vue'
import DemoCheckbox from '~/components/demo/checkbox.vue'
import DemoCode from '~/components/demo/code.vue'
import DemoCollapse from '~/components/demo/collapse.vue'
import DemoColorPicker from '~/components/demo/color-picker.vue'
import DemoColor from '~/components/demo/color.vue'
import DemoComponents from '~/components/demo/components.vue'
import DemoConfigProvider from '~/components/demo/config-provider.vue'
import DemoContainer from '~/components/demo/container.vue'
// import DemoDatePicker from '~/components/demo/date-picker.vue' // 暂未实现
import DemoDivider from '~/components/demo/divider.vue'
import DemoDrawer from '~/components/demo/drawer.vue'
import DemoDynamicStyles from '~/components/demo/dynamic-styles.vue'
import DemoEmpty from '~/components/demo/empty.vue'
// import DemoGrid from '~/components/demo/grid.vue' // 暂未实现
import DemoIcon from '~/components/demo/icon.vue'
import DemoImage from '~/components/demo/image.vue'
import DemoInputNumber from '~/components/demo/input-number.vue'
import DemoInputTag from '~/components/demo/input-tag.vue'
import DemoInput from '~/components/demo/input.vue'
// import DemoLayout from '~/components/demo/layout.vue' // 暂未实现
// import DemoLink from '~/components/demo/link.vue' // 暂未实现
import DemoLogger from '~/components/demo/logger.vue'
import DemoMenu from '~/components/demo/menu.vue'
import DemoModal from '~/components/demo/modal.vue'
import DemoOverflowlist from '~/components/demo/overflowlist-demo.vue'
import DemoPagination from '~/components/demo/pagination-demo.vue'
import DemoParagraph from '~/components/demo/paragraph.vue'
import DemoPopconfirm from '~/components/demo/popconfirm.vue'
import DemoPopover from '~/components/demo/popover.vue'
import DemoQrcode from '~/components/demo/qrcode.vue'
import DemoRadio from '~/components/demo/radio.vue'
import DemoRate from '~/components/demo/rate.vue'
import DemoResizeBox from '~/components/demo/resizebox.vue'
import DemoScrollbar from '~/components/demo/scrollbar.vue'
import DemoSelect from '~/components/demo/select.vue'
import DemoSlider from '~/components/demo/slider.vue'
import DemoSpace from '~/components/demo/space.vue'
import DemoSplit from '~/components/demo/split.vue'
import DemoSwitch from '~/components/demo/switch.vue'
import DemoTable from '~/components/demo/table-demo.vue'
import DemoTablePagination from '~/components/demo/table-pagination-demo.vue'
import DemoTag from '~/components/demo/tag.vue'
import DemoText from '~/components/demo/text.vue'
import DemoTextarea from '~/components/demo/textarea.vue'
import DemoTheme from '~/components/demo/theme.vue'
import DemoTimePicker from '~/components/demo/time-picker.vue'
import DemoTitle from '~/components/demo/title.vue'
import DemoTooltip from '~/components/demo/tooltip.vue'
import DemoTrigger from '~/components/demo/trigger.vue'
import DemoTsx from '~/components/demo/tsx.vue'
import DemoTypography from '~/components/demo/typography.vue'
import DemoUpload from '~/components/demo/upload.vue'
import DemoVerificationCode from '~/components/demo/verification-code.vue'

// 组件列表
interface ComponentGroup {
  title: string
  components: {
    name: string
    label: string
    component: any
  }[]
}

const groups = ref<ComponentGroup[]>([
  {
    title: '基础组件',
    components: [
      { name: 'button', label: 'Button 按钮', component: markRaw(DemoButton) },
      { name: 'icon', label: 'Icon 图标', component: markRaw(DemoIcon) },
      { name: 'typography', label: 'Typography 排版', component: markRaw(DemoTypography) },
      { name: 'title', label: 'Title 标题', component: markRaw(DemoTitle) },
      { name: 'paragraph', label: 'Paragraph 段落', component: markRaw(DemoParagraph) },
      { name: 'divider', label: 'Divider 分割线', component: markRaw(DemoDivider) },
      { name: 'space', label: 'Space 间距', component: markRaw(DemoSpace) },
      { name: 'container', label: 'Container 容器', component: markRaw(DemoContainer) },
      // { name: 'layout', label: 'Layout 布局', component: DemoLayout }, // 暂未实现
      // { name: 'grid', label: 'Grid 栅格', component: DemoGrid }, // 暂未实现
      { name: 'text', label: 'Text 文本', component: markRaw(DemoText) },
      { name: 'color', label: 'Color 色彩', component: markRaw(DemoColor) },
      { name: 'border', label: 'Border 边框', component: markRaw(DemoBorder) },
      // { name: 'link', label: 'Link 链接', component: DemoLink }, // 暂未实现
      { name: 'tooltip', label: 'Tooltip 文字提示', component: markRaw(DemoTooltip) },
      { name: 'popover', label: 'Popover 气泡卡片', component: markRaw(DemoPopover) },
      { name: 'popconfirm', label: 'Popconfirm 气泡确认框', component: markRaw(DemoPopconfirm) },
      { name: 'trigger', label: 'Trigger 触发器', component: markRaw(DemoTrigger) },
      { name: 'scrollbar', label: 'Scrollbar 滚动条', component: markRaw(DemoScrollbar) },
      { name: 'auto-animate', label: 'AutoAnimate 自动动画', component: markRaw(DemoAutoAnimate) },
      { name: 'resize-box', label: 'ResizeBox 可调整大小的盒子', component: markRaw(DemoResizeBox) },
      { name: 'split', label: 'Split 面板分割', component: markRaw(DemoSplit) },
      { name: 'pagination', label: 'Pagination 分页', component: markRaw(DemoPagination) },
    ],
  },
  {
    title: '数据展示',
    components: [
      { name: 'table', label: 'Table 表格', component: markRaw(DemoTable) },
      { name: 'table-pagination', label: 'Table+Pagination 表格分页', component: markRaw(DemoTablePagination) },
      { name: 'qrcode', label: 'QRCode 二维码', component: markRaw(DemoQrcode) },
      { name: 'code', label: 'Code 代码', component: markRaw(DemoCode) },
      { name: 'image', label: 'Image 图片', component: markRaw(DemoImage) },
      { name: 'tag', label: 'Tag 标签', component: markRaw(DemoTag) },
      { name: 'badge', label: 'Badge 徽章', component: markRaw(DemoBadge) },
      { name: 'avatar', label: 'Avatar 头像', component: markRaw(DemoAvatar) },
      { name: 'card', label: 'Card 卡片', component: markRaw(DemoCard) },
      { name: 'collapse', label: 'Collapse 折叠面板', component: markRaw(DemoCollapse) },
      { name: 'overflowlist', label: 'OverflowList 折叠列表', component: markRaw(DemoOverflowlist) },
      { name: 'carousel', label: 'Carousel 轮播图', component: markRaw(DemoCarousel) },
      { name: 'empty', label: 'Empty 空状态', component: markRaw(DemoEmpty) },
    ],
  },
  {
    title: '表单组件',
    components: [
      { name: 'input', label: 'Input 输入框', component: markRaw(DemoInput) },
      { name: 'textarea', label: 'Textarea 文本域', component: markRaw(DemoTextarea) },
      { name: 'input-number', label: 'Input Number 数字输入框', component: markRaw(DemoInputNumber) },
      { name: 'input-tag', label: 'Input Tag 标签输入框', component: markRaw(DemoInputTag) },
      { name: 'autocomplete', label: 'Autocomplete 自动完成', component: markRaw(DemoAutocomplete) },
      { name: 'verification-code', label: 'VerificationCode 验证码输入', component: markRaw(DemoVerificationCode) },
      { name: 'cascader', label: 'Cascader 级联选择器', component: markRaw(DemoCascader) },
      { name: 'time-picker', label: 'TimePicker 时间选择器', component: markRaw(DemoTimePicker) },
      { name: 'checkbox', label: 'Checkbox 复选框', component: markRaw(DemoCheckbox) },
      { name: 'radio', label: 'Radio 单选框', component: markRaw(DemoRadio) },
      { name: 'select', label: 'Select 选择器', component: markRaw(DemoSelect) },
      { name: 'switch', label: 'Switch 开关', component: markRaw(DemoSwitch) },
      { name: 'slider', label: 'Slider 滑块', component: markRaw(DemoSlider) },
      { name: 'ColorPicker', label: 'ColorPicker 颜色选择器', component: markRaw(DemoColorPicker) },
      { name: 'Rate', label: 'Rate 评分', component: markRaw(DemoRate) },
      { name: 'upload', label: 'Upload 上传', component: markRaw(DemoUpload) },
      // { name: 'date-picker', label: 'DatePicker 日期选择器', component: DemoDatePicker }, // 暂未实现
    ],
  },
  {
    title: '反馈组件',
    components: [
      { name: 'alert', label: 'Alert 警告提示', component: markRaw(DemoAlert) },
      { name: 'modal', label: 'Modal 模态对话框', component: markRaw(DemoModal) },
      { name: 'drawer', label: 'Drawer 抽屉', component: markRaw(DemoDrawer) },
    ],
  },
  {
    title: '导航组件',
    components: [
      { name: 'menu', label: 'Menu 菜单', component: markRaw(DemoMenu) },
    ],
  },
  {
    title: '工具组件',
    components: [
      { name: 'logger', label: 'Logger 日志', component: markRaw(DemoLogger) },
      { name: 'tsx', label: 'TSX 支持', component: markRaw(DemoTsx) },
    ],
  },
  {
    title: '主题与样式',
    components: [
      { name: 'theme', label: 'Theme 主题', component: markRaw(DemoTheme) },
      { name: 'dynamic-styles', label: 'DynamicStyles 动态样式', component: markRaw(DemoDynamicStyles) },
    ],
  },
  {
    title: '其他',
    components: [
      { name: 'config-provider', label: 'ConfigProvider 全局配置', component: markRaw(DemoConfigProvider) },
      { name: 'components', label: 'Components 组件集合', component: markRaw(DemoComponents) },
    ],
  },
  // 移除重复的布局组件分组，因为其中引用了未实现的组件，且大部分组件与基础组件中重复
])

// 当前选中的组件
const currentComponent = ref(groups.value[0].components[0].name)

// 查询参数
const route = useRoute()
const name = computed(() => route.query.name as string || '')

if (name.value) {
  // 查找是否有与查询参数匹配的组件
  for (const group of groups.value) {
    const found = group.components.find(item => item.name === name.value)
    if (found) {
      currentComponent.value = name.value
      break
    }
  }
}

// 根据当前组件名查找组件实例
const activeComponent = computed(() => {
  for (const group of groups.value) {
    const found = group.components.find(item => item.name === currentComponent.value)
    if (found)
      return found.component
  }
  return null
})

// 更改当前组件
function setComponent(componentName: string) {
  currentComponent.value = componentName
  navigateTo({
    query: { name: componentName },
  }, { replace: true })
}

// 侧边栏样式
const sideBarClass = computed(() => [
  'hidden md:block',
  'md:w-60 lg:w-72',
  'p-4',
  'border-r border-gray-200 dark:border-gray-700',
  'bg-white dark:bg-gray-900',
  'h-full',
])

// 导航项样式
const navItemClass = computed(() => (item: string) => [
  'py-2 px-3 mb-0.5',
  'cursor-pointer',
  'rounded',
  'transition-colors',
  'truncate',
  item === currentComponent.value
    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
])
</script>

<template>
  <div h-full flex>
    <!-- 左侧导航 -->
    <div :class="sideBarClass" fixed left-0 top-0 h-full overflow-y-auto>
      <!-- 分组导航 -->
      <div v-for="(group, i) in groups" :key="i" mb-6>
        <div mb-3 text-sm text-gray-500 font-medium dark:text-gray-400>
          {{ group.title }}
        </div>
        <div>
          <div
            v-for="item in group.components"
            :key="item.name"
            :class="navItemClass(item.name)"
            text-sm
            @click="setComponent(item.name)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 用于占位的元素，确保内容区域不被菜单遮挡 -->
    <div class="hidden md:block lg:w-72 md:w-60" />

    <!-- 右侧内容 -->
    <div flex-1 overflow-auto p-6>
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<style scoped>
.ui-demo {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--ui-bg-color, #f9fafb);
  color: var(--ui-text-color, #111827);
}

.dark .ui-demo {
  --ui-bg-color: #1f2937;
  --ui-text-color: #f9fafb;
  --ui-border-color: #374151;
  --ui-sidebar-bg: #111827;
  --ui-card-bg: #1f2937;
  --ui-active-bg: #2563eb;
  --ui-hover-bg: #374151;
  background-color: var(--ui-bg-color);
  color: var(--ui-text-color);
}

.ui-demo {
  --ui-border-color: #e5e7eb;
  --ui-sidebar-bg: #f3f4f6;
  --ui-card-bg: #ffffff;
  --ui-active-bg: #3b82f6;
  --ui-hover-bg: #e5e7eb;
}

.ui-demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--ui-border-color);
  background-color: var(--ui-card-bg);
}

.ui-demo-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.ui-demo-theme-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ui-demo-theme-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--ui-border-color);
  background-color: var(--ui-card-bg);
  color: var(--ui-text-color);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-demo-theme-button:hover {
  background-color: var(--ui-hover-bg);
}

.ui-demo-container {
  display: flex;
  flex: 1;
}

.ui-demo-sidebar {
  width: 250px;
  padding: 1rem 0;
  border-right: 1px solid var(--ui-border-color);
  background-color: var(--ui-sidebar-bg);
  overflow-y: auto;
}

.ui-demo-category {
  margin-bottom: 1rem;
}

.ui-demo-category-title {
  padding: 0.5rem 1.5rem;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ui-text-color);
  opacity: 0.7;
}

.ui-demo-component-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ui-demo-component-item {
  padding: 0.625rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.ui-demo-component-item:hover {
  background-color: var(--ui-hover-bg);
}

.ui-demo-component-item.active {
  background-color: var(--ui-active-bg);
  color: #ffffff;
}

.ui-demo-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.ui-demo-component-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.ui-demo-component-showcase {
  background-color: var(--ui-card-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--ui-border-color);
  padding: 2rem;
  min-height: 300px;
}

.ui-demo-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--ui-text-color);
  opacity: 0.5;
}
</style>
