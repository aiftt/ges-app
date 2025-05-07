# UI组件库实现计划

## 实现记录

### 阶段一：基础组件 (第1-6天) - 已完成

在阶段一中，我们完成了14个基础组件的实现，包括布局类组件（Layout、Grid、Space、Container）、展示类组件（Button、Icon、Typography、Divider、Text、Border、Color）、交互类组件（Link）和提示类组件（Tooltip、Auto-Animate）以及配置组件（ConfigProvider）。这些组件都采用了UnoCSS原子化CSS方案，实现了代码的简洁性和可维护性。每个组件都遵循了既定的实现规范，确保了代码的一致性和可维护性。

完成的组件：

- [x] Button - 完成基础按钮组件，支持不同类型、尺寸和状态
- [x] Icon - 完成图标组件，支持各种尺寸和颜色
- [x] Typography - 完成排版组件，包括Text和Paragraph子组件
- [x] Divider - 完成分割线组件，支持水平、垂直和带文本样式
- [x] Layout - 完成布局组件，提供灵活的布局选项
- [x] Grid - 完成栅格布局组件，支持响应式布局
- [x] Space - 完成间距组件，用于设置子元素之间的间距
- [x] Container - 完成容器组件，用于构建页面布局容器
- [x] Link - 完成链接组件，支持内部路由和外部链接
- [x] Text - 完成文本组件，用于文本显示和排版
- [x] Border - 完成边框组件，展示不同样式的边框
- [x] Color - 完成颜色组件，用于展示不同的颜色系统
- [x] Auto-Animate - 完成动画效果组件，提供列表、卡片、表单等元素的平滑过渡动画
- [x] Tooltip - 完成文字提示组件，支持多个位置、两种主题及各种触发方式
- [x] ConfigProvider - 完成全局配置组件，支持主题配置（亮色/暗色/跟随系统）、CSS变量动态设置和全局选项，可在应用的任何层级提供配置
- [x] Popover - 完成气泡卡片组件，支持多种触发方式和自定义内容
- [x] Popconfirm - 完成气泡确认框组件，提供简单的确认交互
- [x] Trigger - 完成通用触发器组件，支持多种触发方式（hover、click、focus、contextmenu、manual）和位置，提供丰富的自定义选项和主题支持
- [x] Scrollbar - 完成自定义滚动条组件，提供更美观的滚动体验，支持垂直和水平滚动，自定义滚动条样式

### 阶段二：数据展示组件 (部分完成)

在阶段二中，我们着手开发数据展示类组件。目前已完成QRCode组件和Code组件的实现。

完成的组件：

- [x] QRCode - 完成二维码组件，支持多种渲染方式（Canvas/SVG/Image）、自定义颜色、Logo添加、错误校正级别调整等功能，同时支持圆角、边距等样式定制
- [x] Code - 完成代码展示组件，基于highlight.js实现语法高亮，支持多种编程语言、行号显示、指定行高亮、亮色/暗色主题切换等功能

### 阶段三：高级交互与过渡动画 (新增)

在阶段三中，我们引入了更多高级交互和动画效果，提升用户体验。

完成的功能：

- [x] Auto-Animate 动画效果 - 引入 `@formkit/auto-animate` 库，通过 Vue 指令 `v-auto-animate` 为列表项添加/删除、条件渲染、卡片切换等场景提供平滑过渡动画，无需编写复杂的动画代码

### 阶段四：表单组件 (进行中)

在阶段四中，我们开始实现基础表单组件，提供数据输入和收集功能。

完成的组件：

- [x] DatePicker - 完成日期选择器组件，支持多种格式、尺寸及交互方式，已重构为更灵活的date/picker.vue结构，便于后续扩展日期相关组件
- [x] Input - 完成输入框组件，支持各种尺寸、状态（禁用、只读、错误）、前后缀图标、清除功能和密码切换，使用v-bind+CSS变量实现自定义样式，支持明暗主题切换
- [x] Textarea - 完成文本域组件，支持自动调整高度、字数统计、清除功能、错误状态和自定义样式，适配明暗主题切换
- [x] Checkbox - 完成复选框组件和复选框组，支持单选/多选模式、中间状态、禁用状态、尺寸变体和主题切换，复选框组支持最大/最小选择数量限制及垂直/水平排列
- [x] Radio - 完成单选按钮组件和单选按钮组，支持禁用状态、尺寸变体和主题切换，支持垂直/水平排列及自定义样式
- [x] Switch - 完成开关组件，支持开启/关闭状态、禁用状态、加载状态、尺寸变体、自定义颜色、文本描述、方形按钮样式和主题切换
- [x] Slider - 完成滑块组件，支持范围选择、步长设置、显示标记点、显示提示气泡、显示输入框、垂直模式、自定义颜色和主题切换

### 阶段五：技术栈增强 (新增)

在阶段五中，我们对项目的技术栈进行了增强，提供了更多现代化的开发方式。

完成的功能：

- [x] TSX支持 - 添加了Vue TSX支持，允许使用TSX语法编写组件，实现了更灵活的组件编写方式
- [x] TSX示例组件 - 完成了TSX演示组件，展示了如何使用TSX编写Vue组件，包括状态管理、事件处理和主题支持

## 组件清单

基于主流UI库的常见组件，我们将实现以下组件：

### 基础组件

- [x] Button - 按钮
- [x] Icon - 图标
- [x] Typography - 排版
- [x] Divider - 分割线
- [x] Layout - 布局
- [x] Grid - 栅格
- [x] Space - 间距
- [x] Container - 布局容器
- [x] Scrollbar - 滚动条
- [x] Link - 链接
- [x] Text - 文本
- [x] Border - 边框
- [x] Color - 色彩
- [x] Tooltip - 文字提示
- [x] Popover - 气泡卡片
- [x] Popconfirm - 气泡确认框
- [x] Trigger - 触发器
- [ ] ResizeBox - 伸缩框
- [ ] Split - 面板分割
- [x] Config Provider - 全局配置

### 表单组件

- [x] Input - 输入框
- [x] Textarea - 文本域
- [ ] Input Number
- [ ] Input Tag
- [ ] VerificationCode
- [ ] Autocomplete
- [ ] Select
- [ ] Cascader
- [x] Checkbox - 复选框
- [x] Radio - 单选按钮
- [x] Switch - 开关
- [x] Slider
- [x] DatePicker
- [ ] TimePicker
- [ ] ColorPicker
- [ ] Rate
- [ ] Upload
- [ ] Transfer

### 数据展示

- [ ] Table - 表格
- [ ] Surely Table - 增强表格
- [ ] Virtualized Table - 虚拟化表格
- [ ] Tag - 标签
- [ ] Badge - 徽章
- [ ] Avatar - 头像
- [ ] Card - 卡片
- [ ] Carousel - 图片轮播
- [ ] Collapse - 折叠面板
- [ ] Comment - 评论
- [ ] Descriptions - 描述列表
- [ ] List - 列表
- [ ] OverflowList - 折叠列表
- [ ] Tree - 树形控件
- [ ] Virtualized Tree - 虚拟化树形控件
- [ ] Calendar - 日历
- [ ] Image - 图片
- [ ] Timeline - 时间线
- [ ] Tour - 漫游式引导
- [ ] Empty - 空状态
- [ ] Statistic - 数值显示
- [ ] Infinite Scroll - 无限滚动
- [ ] Watermark - 水印
- [ ] Segmented - 分段控制器
- [x] QRCode - 二维码
- [x] Code - 代码展示

### 反馈组件

- [ ] Alert - 警告提示
- [ ] Dialog - 对话框
- [ ] Modal - 模态框
- [ ] Drawer - 抽屉
- [ ] Message - 全局提示
- [ ] Message Box - 消息弹出框
- [ ] Notification - 通知提醒框
- [ ] Progress - 进度条
- [ ] Skeleton - 骨架屏
- [ ] Spin - 加载中
- [ ] Result - 结果页

### 导航组件

- [ ] Menu - 菜单
- [ ] Tabs - 标签页
- [ ] Breadcrumb - 面包屑
- [ ] Pagination - 分页
- [ ] Steps - 步骤条
- [ ] Dropdown - 下拉菜单
- [ ] Affix - 固钉
- [ ] Anchor - 锚点
- [ ] BackTop - 返回顶部
- [ ] PageHeader - 页头

### 其他组件

- [ ] ConfigProvider - 全局配置
- [ ] OverflowList - 折叠列表
- [x] TSX Demo - TSX语法演示组件

### 状态管理

- [ ] UI主题状态
- [ ] 全局消息状态
- [ ] 表单状态管理
- [ ] 多语言状态

## UI组件实现规范

### 总体原则

- **使用UnoCSS**: 所有组件优先使用UnoCSS原子类实现样式，避免使用传统CSS
- **响应式设计**: 组件应兼容不同屏幕尺寸，提供良好的响应式体验
- [ ] 可定制性: 通过Props提供丰富的配置选项，满足不同使用场景
- **TypeScript**: 使用TypeScript进行类型定义，提供完善的类型提示
- **组件结构**: 遵循一致的目录结构和命名规范
- **TSX支持**: 支持使用TSX语法编写组件，提供更灵活的组件编写方式

### 目录结构规范

1. **单组件结构**:

   ```
   components/ui/组件名/index.vue
   ```

   或者使用TSX:

   ```
   components/ui/组件名/index.tsx
   ```

   例如：button组件应放置在 `components/ui/button/index.vue`

2. **子组件结构**:
   ```
   components/ui/父组件名/子组件名.vue
   ```
   或者使用TSX:
   ```
   components/ui/父组件名/子组件名.tsx
   ```
   例如：typography下的text组件应放置在 `components/ui/typography/text.vue`

### 命名规范

- 所有目录和文件名必须全部**小写**
- 多词组合时禁止使用**连字符**，禁止使用**驼峰命名**
- 新建组件时，组件名称和目录名称均以小写单个单词命名
- Vue组件内使用 `<script setup lang="ts" name="UiComponentName">` 的格式定义组件名
- TSX组件使用 `defineComponent({ name: 'UiComponentName', ... })` 定义组件名

### 样式实现方式

我们采用以下方式实现组件样式：

1. **使用UnoCSS类名**：通过计算属性动态组合类名实现样式定制

   ```typescript
   const buttonClass = computed(() => {
     const classes = ['inline-flex items-center justify-center']
     if (props.size === 'small')
       classes.push('text-sm px-2.5 py-1.5')
     return classes.join(' ')
   })
   ```

2. **样式变量**：对于需要动态控制但UnoCSS难以处理的样式，使用内联style绑定

   ```typescript
   const buttonStyle = computed(() => {
     const style = {}
     if (props.customColor)
       style.backgroundColor = props.customColor
     return style
   })
   ```

3. **条件渲染**：根据组件状态条件渲染不同的类名
   ```html
   <button :class="[buttonClass, props.disabled ? 'opacity-50 cursor-not-allowed' : '']"></button>
   ```

### 组件结构规范

每个组件应当包含以下几个部分：

1. **注释头**：包含组件描述、创建日期、作者信息

   ```typescript
   /**
    * 按钮组件
    * 创建日期: 2023-11-14
    * 作者: aiftt
    */
   ```

2. **Props定义**：使用TypeScript类型定义Props，每个prop都应有清晰的注释

   ```typescript
   const props = withDefaults(defineProps<{
     /**
      * 按钮类型
      */
     type?: 'primary' | 'secondary' | 'danger'
     /**
      * 按钮大小
      */
     size?: 'small' | 'medium' | 'large'
   }>(), {
     type: 'primary',
     size: 'medium'
   })
   ```

3. **事件定义**：使用TypeScript类型定义Emits

   ```typescript
   const emit = defineEmits<{
     (e: 'click', event: MouseEvent): void
   }>()
   ```

4. **组件逻辑**：使用Composition API实现组件逻辑

   ```typescript
   const isActive = ref(false)
   function handleClick(event: MouseEvent) {
     isActive.value = true
     emit('click', event)
   }
   ```

5. **模板标记**：使用语义化标签和适当的CSS类

   ```html
   <template>
     <button class="ui-button" @click="handleClick">
       <slot></slot>
     </button>
   </template>
   ```

6. **样式定义**：使用scoped样式和CSS变量

   ```html
   <style scoped>
     .ui-button {
       /* 样式 */
     }
   </style>
   ```

### CSS变量主题系统

组件样式应当通过CSS变量实现主题化：

1. **基础变量**：在全局样式文件中定义基础变量

   ```css
   :root {
     --ui-color-primary: #10b981;
     --ui-spacing: 1rem;
   }
   ```

2. **组件使用变量**：组件内使用全局变量，并提供默认值

   ```css
   .ui-button {
     color: var(--ui-button-color, var(--ui-color-primary, #10b981));
   }
   ```

3. **深色模式**：使用`:root.dark`选择器实现深色模式

   ```css
   :root.dark {
     --ui-color-primary: #34d399;
   }
   ```

### 组件测试与文档

1. 为每个组件提供完整的demo页面，展示不同配置选项和使用方式
2. 为每个组件编写清晰的API文档，包括Props、Events和Slots
3. 编写基本的单元测试确保组件功能正常

## 实现计划

### 阶段一：基础组件 (第1-6天) - 已完成

- [x] Button
- [x] Icon
- [x] Typography
- [x] Divider
- [x] Layout
- [x] Grid
- [x] Space
- [x] Container
- [x] Link
- [x] Text
- [x] Border
- [x] Color
- [x] Tooltip
- [x] ConfigProvider
- [x] Popover
- [x] Popconfirm
- [x] Trigger
- [x] Scrollbar

#### 阶段一总结

在阶段一中，我们完成了14个基础组件的实现，包括布局类组件（Layout、Grid、Space、Container）、展示类组件（Button、Icon、Typography、Divider、Text、Border、Color）、交互类组件（Link）和提示类组件（Tooltip、Auto-Animate）以及配置组件（ConfigProvider）。这些组件都采用了UnoCSS原子化CSS方案，实现了代码的简洁性和可维护性。

下一步将继续完成剩余的基础组件，并开始实现布局组件。

### 阶段二：布局组件 (第7-10天)

- [x] Scrollbar
- [ ] ResizeBox
- [ ] Split
- [x] Popconfirm

### 阶段三：表单组件 (第11-22天)

- [x] Input - 输入框
- [x] Textarea - 文本域，支持自动调整高度、字数统计、清除功能、错误状态和自定义样式
- [ ] Input Number
- [ ] Input Tag
- [ ] VerificationCode
- [ ] Autocomplete
- [ ] Select
- [ ] Cascader
- [x] Checkbox - 复选框
- [x] Radio - 单选按钮
- [x] Switch - 开关
- [x] Slider
- [x] DatePicker
- [ ] TimePicker
- [ ] ColorPicker
- [ ] Rate
- [ ] Upload
- [ ] Transfer

### 阶段三表单组件进度

目前已完成的表单组件：

- [x] DatePicker - 完成日期选择器组件，支持多种格式、尺寸及交互方式，已重构为更灵活的date/picker.vue结构，便于后续扩展日期相关组件
- [x] Input - 完成输入框组件，支持各种尺寸、状态（禁用、只读、错误）、前后缀图标、清除功能和密码切换，使用v-bind+CSS变量实现自定义样式，支持明暗主题切换

### 阶段四：数据展示组件 (第23-35天)

- [ ] Table
- [ ] Tag
- [ ] Badge
- [ ] Avatar
- [ ] Card
- [ ] Carousel
- [ ] Collapse
- [ ] Comment
- [ ] Descriptions
- [ ] List
- [ ] OverflowList
- [ ] Tree
- [ ] Calendar
- [ ] Image
- [ ] Timeline
- [ ] Empty
- [ ] Statistic
- [ ] Watermark
- [ ] QRCode

### 阶段五：反馈组件 (第36-42天)

- [ ] Alert
- [ ] Dialog
- [ ] Modal
- [ ] Drawer
- [ ] Message
- [ ] Message Box
- [ ] Notification
- [ ] Progress
- [ ] Skeleton
- [ ] Spin
- [ ] Result

### 阶段六：导航组件 (第43-48天)

- [ ] Menu
- [ ] Tabs
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Steps
- [ ] Dropdown
- [ ] Affix
- [ ] Anchor
- [ ] BackTop
- [ ] PageHeader

### 阶段七：高级组件 (第49-55天)

- [ ] Virtualized Select
- [ ] Virtualized Table
- [ ] Virtualized Tree
- [ ] TreeSelect
- [ ] Infinite Scroll
- [ ] Tour
- [ ] Segmented
- [ ] Mention
- [ ] DateTimePicker
- [ ] TimeSelect
- [ ] Surely Form
- [ ] Surely Table

### 阶段八：状态管理 (第56-60天)

- [ ] UI主题状态系统
- [ ] 全局消息状态管理
- [ ] 表单状态管理
- [ ] 多语言状态管理

### 阶段九：测试与文档 (第61-70天)

- [ ] 组件单元测试
- [ ] 组件文档编写
- [ ] 示例页面优化
- [ ] 主题定制系统
- [ ] 组件交互测试
- [ ] 性能优化
- [ ] 辅助功能/可访问性支持
- [ ] 跨浏览器兼容性测试

## 完成状态说明

- [ ] 未开始：组件尚未开始实现
- [x] 进行中：组件正在实现过程中
- [x] 已完成：组件已完成基本功能并通过测试
- [ ] 已优化：组件已完成性能和用户体验优化
- [ ] 已文档化：组件已添加完整文档和使用示例

## 组件设计理念

### 简洁性

我们的组件设计遵循"少即是多"的原则。UI组件应当:

- 功能单一，专注于解决一个特定问题
- 接口简单，易于理解和使用
- 视觉简洁，减少不必要的装饰

### 一致性

组件库内部应保持一致性，包括：

- 命名一致：相似功能使用相似的命名
- 行为一致：相似组件有相似的交互方式
- 视觉一致：组件间的视觉语言保持统一

### 可组合性

组件应当是可组合的：

- 小组件可以组合成复杂组件
- 组件间可以自由组合，不产生冲突
- 组件API设计考虑组合场景
