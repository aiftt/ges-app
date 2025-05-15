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
- [x] ResizeBox - 完成可调整大小的容器组件，支持各个方向拖拽调整尺寸和保持比例，2024-06-22
- [x] Split - 完成面板分割组件，支持多个面板的分割和布局，2024-07-09
- [x] Pagination - 完成分页组件，支持页码导航、跳页、每页条数设置，2024-07-16

### 阶段二：数据展示组件 (部分完成)

在阶段二中，我们着手开发数据展示类组件。目前已完成QRCode组件、Code组件、Tag组件和Badge组件的实现。

完成的组件：

- [x] QRCode - 完成二维码组件，支持多种渲染方式（Canvas/SVG/Image）、自定义颜色、Logo添加、错误校正级别调整等功能，同时支持圆角、边距等样式定制
- [x] Code - 完成代码展示组件，基于highlight.js实现语法高亮，支持多种编程语言、行号显示、指定行高亮、亮色/暗色主题切换等功能
- [x] Tag - 完成标签组件，支持多种类型、尺寸、可关闭、可点击、圆形等功能，同时支持自定义颜色、图标等个性化定制
- [x] Badge - 完成徽章组件，支持数字、文本和点状显示，可自定义位置和样式，2024-06-20
- [x] Avatar - 完成头像组件，支持图片、文字和图标模式，提供各种尺寸、形状和颜色选项，2024-06-21
- [x] Card - 完成卡片组件，支持标题、内容、footer布局，提供各种样式定制选项，2024-06-22
- [x] Collapse - 完成折叠面板组件，支持手风琴模式、嵌套使用和自定义样式，2024-06-22
- [x] Table - 完成表格组件，支持多种功能包括排序、筛选、展开行、多选、自定义列、固定列、自定义样式等，2024-07-16
- [x] Carousel - 轮播图组件，支持水平和垂直方向轮播，淡入淡出和滑动两种效果，自定义指示器和箭头，2024-07-22
- [x] OverflowList - 折叠列表，支持水平和垂直方向布局，自动处理空间不足时的项目折叠，2024-07-22
- [x] Empty - 空状态组件，提供自定义图标、描述文本和操作区域，适用于无数据场景，2024-07-23
- [x] Timeline - 时间线组件，用于展示时间流或步骤流程，支持垂直/水平方向、交替布局和节点定制，2024-07-27 (节点布局优化完成)
- [x] Watermark - 水印组件，支持文本和图片水印，可配置字体、颜色、旋转角度、透明度等，支持全屏展示和防篡改功能，2024-08-01
- [x] Segmented - 分段控制器组件，支持多种尺寸、禁用状态、圆角样式、块级布局和键盘导航，2024-08-01

### 阶段三：高级交互与过渡动画 (新增)

在阶段三中，我们引入了更多高级交互和动画效果，提升用户体验。

完成的功能：

- [x] Auto-Animate 动画效果 - 引入 `@formkit/auto-animate` 库，通过 Vue 指令 `v-auto-animate` 为列表项添加/删除、条件渲染、卡片切换等场景提供平滑过渡动画，无需编写复杂的动画代码

### 阶段四：表单组件 (部分完成)

在阶段四中，我们开始实现基础表单组件，提供数据输入和收集功能。

完成的组件：

- [x] DatePicker - 完成日期选择器组件，支持多种格式、尺寸及交互方式，已重构为更灵活的date/picker.vue结构，便于后续扩展日期相关组件
- [x] Input - 完成输入框组件，支持各种尺寸、状态（禁用、只读、错误）、前后缀图标、清除功能和密码切换，使用v-bind+CSS变量实现自定义样式，支持明暗主题切换，2025-05-10更新：增强SSR兼容性、添加更多表单功能
- [x] Textarea - 完成文本域组件，支持自动调整高度、字数统计、清除功能、错误状态和自定义样式，适配明暗主题切换
- [x] Checkbox - 完成复选框组件和复选框组，支持单选/多选模式、中间状态、禁用状态、尺寸变体和主题切换，复选框组支持最大/最小选择数量限制及垂直/水平排列
- [x] Radio - 完成单选按钮组件和单选按钮组，支持禁用状态、尺寸变体和主题切换，支持垂直/水平排列及自定义样式
- [x] Switch - 完成开关组件，支持开启/关闭状态、禁用状态、加载状态、尺寸变体、自定义颜色、文本描述、方形按钮样式和主题切换
- [x] Slider - 完成滑块组件，支持范围选择、步长设置、显示标记点、显示提示气泡、显示输入框、垂直模式、自定义颜色和主题切换
- [x] Input Number - 完成数字输入框组件，支持最大/最小值限制和步进操作，2024-07-05
- [x] Input Tag - 完成标签输入框组件，支持动态添加和删除标签，2024-07-08
- [x] Autocomplete - 完成自动完成组件，支持本地和远程数据源，2024-07-09
- [x] Verification Code - 完成验证码输入组件，支持自动聚焦和限制输入，2024-07-09
- [x] Cascader - 完成级联选择器组件，支持多级选择和搜索功能，2024-07-09
- [x] TimePicker - 完成时间选择器组件，支持时间选择、范围选择、12/24小时制等功能，2024-07-09
- [x] ColorPicker - 完成颜色选择器组件，支持RGB、HSL和HEX格式、透明度控制、预设颜色及历史记录，2024-07-10
- [x] Rate - 完成评分组件，支持自定义图标、颜色、半星、辅助文字等功能，2024-07-16
- [x] Upload - 完成上传组件，支持多文件上传、拖拽上传、文件预览、进度显示、自动上传和手动上传等功能，2024-07-16
- [x] Select - 完成下拉选择器组件，支持单选和多选，2024-05-26

### 阶段五：反馈组件 (第36-42天)

- [x] Alert - 警告提示
- [x] Dialog - 对话框，支持多种类型和自定义内容，提供简洁的对话交互形式，2024-08-04，修复问题：2024-08-07
- [x] Modal - 模态框
- [x] Drawer - 抽屉
- [x] Message - 全局消息提示，支持不同类型、自定义选项和样式，提供服务式API调用和组合式API，2024-08-04，修复SSR问题：2024-08-07
- [x] Message Box - 消息弹框，支持确认/提示/警告等类型，自定义按钮和图标，2025-05-14
- [x] Notification - 通知组件，支持多种位置、类型和自定义选项，提供服务式API，2025-05-14
- [x] Progress - 进度条，支持线性和环形两种进度指示，支持多种类型（普通、成功、警告、危险）和尺寸，2024-08-03
- [x] Result - 结果组件，支持成功、错误、警告、信息等结果状态的反馈展示，可自定义图标、内容和操作区域，2024-08-18
- [x] Skeleton - 骨架屏，支持多种类型（文本、按钮、头像、图片、段落、卡片、列表）、自定义样式、动画效果及自定义内容，2024-08-16
- [x] Spin

### 阶段六：导航组件 (第43-48天)

- [x] Menu
- [x] Tabs - 标签页，支持线条、卡片、分段三种类型，可在顶部、右侧、底部、左侧四个位置显示，支持新增、关闭功能，2024-08-03
- [x] Breadcrumb - 面包屑导航，支持多种分隔符、图标、自动折叠、禁用状态及自定义内容，2024-08-16
- [x] Pagination - 完成分页组件，支持页码导航、跳页、每页条数设置，2024-07-16
- [x] Steps
- [x] Dropdown - 下拉菜单组件，支持多种触发方式（hover、click、contextmenu）、多个弹出位置、自定义内容和样式，2024-08-18
- [x] Affix - 固钉组件，支持固定元素在视口的顶部或底部，可设置偏移量和容器，2024-08-19
- [x] Anchor - 锚点组件，支持页面内导航、自动高亮当前位置、可嵌套链接、自定义样式，2024-08-19
- [x] BackTop - 回到顶部组件，支持自定义触发高度、位置、图标和样式，可设置自定义滚动目标，2024-08-25
- [x] PageHeader - 页头组件，支持面包屑导航、返回按钮、标题副标题、额外区域、页脚区域和自定义样式，2024-08-27

### 阶段七：高级组件 (第49-55天)

- [/] Virtualized Select - 虚拟化选择器组件，适用于处理大数据量的选择场景，支持高性能渲染和筛选，2024-09-01，优化提升：2024-09-02
- [x] Virtualized Table - 虚拟化表格组件，用于高效渲染大数据量表格，支持排序、固定列、自定义单元格渲染等功能，2024-09-03
- [x] Virtualized Tree - 虚拟化树组件，处理大数据量层级结构数据，支持展开/折叠、选择、复选框功能，2024-09-03
- [x] TreeSelect - 树形选择器组件，支持单选和多选，可过滤搜索、自定义渲染、复选框等功能，2024-08-30
- [/] Infinite Scroll - 无限滚动组件，支持各种滚动方向、自定义容器和加载状态，适用于大数据分页加载场景，2024-09-01，优化提升：2024-09-02
- [x] Tour - 漫游式引导组件，支持多步骤引导、自定义位置和内容，2024-07-31
- [x] Segmented - 分段控制器组件，用于展示多个选项，支持单选和自定义样式，2024-08-01
- [x] Magic - 魔法动画组件，基于magic.css动画库，提供丰富的动画效果和简单的使用方式，2024-11-22
- [x] Mention - 提及组件，用于在文本输入中@用户等场景，支持自定义前缀和选项过滤，2024-09-01
- [x] DateTimePicker - 日期时间选择器组件，结合日期选择和时间选择功能，支持多种格式、快捷选项和各种配置，2024-08-30
- [x] TimeSelect - 时间选择组件，支持时间范围、步长设置、12/24小时制、自定义前缀和后缀图标，2024-08-27
- [x] SurelyForm - 高级表单组件，支持表单验证、动态表单项、布局定制和复杂数据处理，2024-09-01
- [ ] Surely Table - 高级表格组件，提供更丰富的数据处理和交互功能

### 阶段八：状态管理 (第56-60天)

- [ ] UI主题状态
- [ ] 全局消息状态
- [ ] 表单状态管理
- [ ] 多语言状态

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

## 更新历史

2024-05-26: 更新阶段二到阶段三的过渡，完成 Select 组件
2024-06-20: 添加 Badge 组件到数据展示组件
2024-06-21: 添加 Avatar 组件到数据展示组件
2024-06-22: 添加 Card 组件到数据展示组件
2024-06-22: 添加 ResizeBox 组件到基础组件
2024-06-22: 添加 Collapse 组件到数据展示组件
2024-06-23: 添加 Modal 组件到反馈组件
2024-06-24: 添加 Alert 组件到反馈组件
2024-06-25: 添加 Drawer 组件到反馈组件
2024-07-16: 添加 Table 组件到数据展示组件
2024-07-22: 添加 OverflowList 组件到数据展示组件
2024-07-22: 添加 Carousel 组件到数据展示组件
2024-07-23: 添加 Empty 组件到数据展示组件
2024-08-01: 添加 Watermark 组件到数据展示组件
2024-08-01: 添加 Segmented 组件到数据展示组件
2024-08-03: 添加 Progress 组件到反馈组件
2024-08-03: 添加 Tabs 组件到导航组件
2024-08-16: 添加 Skeleton 组件到反馈组件
2024-08-16: 添加 Breadcrumb 组件到导航组件
2024-08-18: 添加 Result 组件到反馈组件
2024-08-18: 添加 Dropdown 组件到导航组件
2024-08-19: 添加 Affix 和 Anchor 组件到导航组件
2024-08-25: 添加 BackTop 组件到导航组件
2024-08-27: 添加 PageHeader 组件到导航组件和 TimeSelect 组件到表单组件
2024-08-30: 添加 DateTimePicker 和 TreeSelect 组件到高级组件
2025-05-10: 更新 Input 组件，增强SSR兼容性和添加更多表单功能
2025-05-14: 添加 Notification 和 MessageBox 组件到反馈组件
2024-09-01: 添加 VirtualSelect 和 InfiniteScroll 组件到高级组件
2024-09-01: 添加 Mention 和 SurelyForm 组件到高级组件
2024-09-02: 优化 VirtualSelect 和 InfiniteScroll 组件，实现真正的虚拟滚动，解决大数据量DOM元素过多问题
2024-09-03: 添加 VirtualTable 和 VirtualTree 组件到高级组件，实现高性能大数据渲染
2024-11-22: 添加 Magic 动画库，提供丰富的CSS动画效果

# UI组件类型集中管理整改计划

### 目标

为了提高代码质量和可维护性，需要将当前分散在各个UI组件内部定义的接口类型统一迁移到types目录下，集中管理。

### 观察

当前很多UI组件都在组件内部定义了自己的接口和类型，这导致：

1. 类型定义重复，不同组件可能定义了相似但不完全一致的类型
2. 难以复用类型定义
3. 代码组织不清晰，维护成本高

### 整改方案

1. 创建专门的类型定义文件
2. 按照组件类别组织类型
3. 将组件内部定义的类型移动到集中的类型文件中
4. 更新组件，从类型文件中导入所需类型

### 类型文件组织

创建以下类型定义文件:

- types/ui.d.ts - UI基础类型（ButtonType, TagType, AlertType等）
- types/form.d.ts - 表单相关类型（IFormSchema, IFormValidateResult等）
- types/table.d.ts - 表格相关类型（TableColumn, IVirtualTableColumn等）
- types/tree.d.ts - 树组件相关类型（ITreeNode, IVirtualTreeNode等）
- types/select.d.ts - 选择器相关类型（ISelectOption, ICascaderOption等）
- types/config.d.ts - 配置相关类型（Theme, ThemeConfig等）
- types/common.d.ts - 通用类型（IUploadFile, IMenuItem等）

### 整改优先级

按组件使用频率和重要性，设置以下优先级：

#### 高优先级

- SurelyForm
- Table
- Tree
- Select

#### 中优先级

- TreeSelect
- VirtualTable
- Config Provider
- TreeNode
- VirtualTree

#### 低优先级

- Mention
- OverflowList
- Tag

### 执行计划

1. 分析现有组件内部类型定义
2. 创建集中管理的类型定义文件
3. 将类型定义移动到相应文件
4. 更新组件，从类型文件导入所需类型
5. 运行lint和类型检查确保无错误
6. 验证类型修改不影响组件功能

### 执行结果

1. **✅ 已创建所有类型定义文件：**

   - types/ui.d.ts
   - types/form.d.ts
   - types/table.d.ts
   - types/tree.d.ts
   - types/select.d.ts
   - types/config.d.ts
   - types/common.d.ts

2. **✅ 高优先级组件修改完成：**

   - SurelyForm：移除内部类型定义，使用types/form.d.ts
   - Table：移除内部类型定义，使用types/table.d.ts中的TableColumn接口
   - Tree：移除内部类型定义，使用types/tree.d.ts中的ITreeNode接口
   - Select：移除内部类型定义，使用types/select.d.ts中的ISelectOption接口

3. **✅ 中优先级组件修改完成：**

   - TreeSelect：使用types/tree.d.ts中的ITreeNode接口
   - VirtualTable：使用types/table.d.ts中的IVirtualTableColumn和IVirtualTableConfig接口
   - Config Provider：使用types/config.d.ts中的Theme和ThemeConfig接口
   - TreeNode：使用types/tree.d.ts中的ITreeNode接口
   - VirtualTree：使用types/tree.d.ts中的IVirtualTreeNode和IVirtualTreeConfig接口

4. **✅ 低优先级组件修改完成：**

   - Mention：使用types/select.d.ts中的IMentionOption接口
   - OverflowList：使用types/common.d.ts中的IOverflowItem接口
   - Tag：使用types/ui.d.ts中的TagType类型

5. **✅ 完善类型定义：**

   - TableColumn添加所有需要的属性
   - ITreeNode添加selected属性
   - types/ui.d.ts添加所有基础类型
   - 添加评论和更新日期

6. **✅ 额外修改完成：**

   - Dropdown组件：将MenuItem接口移到types/common.d.ts中，更名为IMenuItem
   - Upload组件：使用types/common.d.ts中的IUploadFile接口替换内部的UploadFile接口，
     并将percentage字段替换为percent字段以匹配接口定义

7. **✅ 验证：**
   - 运行pnpm lint，确认无错误
   - 组件demo页面加载正常，组件功能不受影响

# 字符串联合类型集中管理整改计划

### 目标

将项目中散布在各个组件内的字符串联合类型（如'a'|'b'|'c'）统一提取到types目录下集中管理，提高类型一致性和可维护性。

### 观察

目前项目中存在大量组件在props定义中直接使用字符串联合类型的情况，包括但不限于：

1. 按钮类型、尺寸、位置等基础属性
2. 布局方向、对齐方式等布局属性
3. 触发方式、主题等交互属性
4. 状态、模式等功能属性

这导致相同概念的类型在不同组件中可能有不同的定义，增加了维护难度。

### 整改方案

1. 梳理项目中的字符串联合类型
2. 按照类型的用途进行分类
3. 将字符串联合类型添加到合适的类型定义文件中
4. 更新组件，导入并使用统一的类型

### 需要处理的字符串联合类型

#### UI基础类型 (types/ui.d.ts)

- ✅ ButtonType: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
- ✅ TagType: 'default' | 'primary' | 'success' | 'warning' | 'danger'
- ✅ AlertType: 'info' | 'success' | 'warning' | 'error'
- ✅ ComponentSize: 'small' | 'default' | 'large'
- ✅ Placement: 'top' | 'top-start' | 'top-end' | ... | 'left-end'
- ✅ Direction: 'horizontal' | 'vertical'
- ✅ FlexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
- ✅ Justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
- ✅ Align: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
- ✅ Wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
- ✅ Position: 'left' | 'right' | 'alternate'
- ✅ Shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
- ✅ Overflow: 'visible' | 'hidden' | 'scroll' | 'auto'
- ✅ ResultStatus: 'success' | 'error' | 'info' | 'warning'
- ✅ Theme: 'light' | 'dark'

#### 交互类型 (types/interaction.d.ts - 新建)

- ✅ Trigger: 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'
- ✅ EventType: 'click' | 'change' | 'input' | 'focus' | 'blur'
- ✅ LoadingType: 'spinner' | 'dots' | 'bars' | 'circle'
- ✅ AnimationType: 'fade' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
- ✅ NavigationKey: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Enter' | 'Escape' | 'Tab'
- ✅ DragDirection: 'x' | 'y' | 'both'
- ✅ GestureType: 'tap' | 'press' | 'pan' | 'swipe' | 'pinch' | 'rotate'

### 执行计划

1. 分析现有组件中的字符串联合类型
2. 整理类型并按用途分类
3. 添加到相应的类型定义文件
4. 逐步更新组件使用新的类型
5. 运行lint检查确保无错误

### 优先处理组件

1. 布局组件: Layout, Container, Space
2. 弹出组件: Tooltip, Popover, Trigger
3. 反馈组件: Alert, Result, Dialog
4. 列表组件: List, Timeline
5. 其他常用组件

### 执行进度

- ✅ 第一阶段: UI基础类型添加与更新

  - 已添加所有基础布局、样式和状态相关的类型到types/ui.d.ts
  - 确保所有类型都有合适的JSDoc注释

- ✅ 第二阶段: 交互类型添加与更新

  - 创建了新的types/interaction.d.ts文件
  - 添加了所有交互相关的类型定义
  - 确保所有类型都有合适的JSDoc注释

- ✅ 第三阶段: 组件更新

  - 更新了Container组件使用Direction、Shadow和Overflow类型
  - 更新了Space组件使用Direction和Align类型
  - 更新了Layout组件使用FlexDirection、Justify、Align和Wrap类型
  - 更新了Trigger组件使用Trigger、Placement和Theme类型
  - 更新了Tooltip组件使用ElementPosition、Theme和Trigger类型
  - 更新了Result组件使用ResultStatus类型
  - 更新了Dialog组件使用Alignment、ButtonType、AlertType和AnimationType类型
  - 更新了Timeline组件使用Direction和Position类型

- ✅ 第四阶段: 验证与修复
  - 运行pnpm lint确认修改符合代码规范
  - 确认所有组件功能正常运行
  - 所有类型导入路径正确

# UI组件演示重构计划

## 目标

使用新增的`ui-demo`组件重构`components/demo/`目录下的所有组件演示页面，以提供一致的视觉体验和更好的代码展示效果。

## 背景

目前`components/demo/`目录下有大量组件演示文件，每个文件的样式和结构可能不一致，代码展示方式也各不相同。新增的`ui-demo`组件提供了统一的演示界面，支持标题、描述、代码折叠/展开动画等功能，应用到所有演示组件可以提升整体一致性和用户体验。

## 重构范围

需要重构的组件共计90+个，包括但不限于：

- 基础组件：Button、Icon、Typography等
- 数据展示组件：Table、Card、Avatar等
- 表单组件：Input、Select、Checkbox等
- 反馈组件：Alert、Modal、Message等
- 导航组件：Menu、Tabs、Breadcrumb等
- 高级组件：VirtualSelect、InfiniteScroll等

## 重构方案

1. 使用`ui-demo`组件替换现有的演示代码样式和结构
2. 保留现有的演示逻辑和示例代码
3. 提取代码示例到变量中，用于`ui-demo`的`code`属性
4. 添加合适的标题、描述和分组

## 重构优先级

按照组件的使用频率和重要性，设置以下优先级：

### 第一批（高优先级）

- Button
- Input
- Select
- Table
- Form
- Menu
- Modal
- Message

### 第二批（中优先级）

- Checkbox
- Radio
- Tabs
- Card
- Avatar
- Tag
- Pagination
- Dropdown

### 第三批（低优先级）

- ColorPicker
- DatePicker
- Upload
- Timeline
- Progress
- Skeleton
- 其他组件

## 重构步骤

对每个组件执行以下步骤：

1. 分析现有演示组件结构和内容
2. 提取代码示例到独立变量
3. 使用`ui-demo`组件包装每个示例
4. 添加合适的标题、描述和父标题
5. 根据需要设置自定义样式（背景色、边框色等）
6. 测试重构后的演示效果

## 统一命名规范

为确保一致性，所有重构后的演示代码应遵循以下命名规范：

- 代码示例变量：使用`xxxCode`格式，如`basicButtonCode`、`sizeButtonCode`
- 示例标题：使用描述性短语，如"基础用法"、"不同尺寸"
- 分组标题：根据功能分类，如"基础"、"类型"、"尺寸"、"状态"等

## 重构进度追踪

- [ ] 第一批组件重构 (8/8)
  - [x] Button - 2024-12-08 完成
  - [x] Input - 2024-12-08 完成
  - [x] Select - 2024-12-08 完成
  - [x] Table - 2024-12-08 完成
  - [x] Form - 2024-12-08 完成（SurelyForm）
  - [x] Menu - 2024-12-08 完成
  - [x] Modal - 2024-12-08 完成
  - [x] Message - 2024-12-08 完成
- [ ] 第二批组件重构 (8/8)
  - [x] Checkbox - 2024-12-08 完成
  - [x] Radio - 2024-12-08 完成
  - [x] Tabs - 2024-12-08 完成
  - [x] Card - 2024-12-08 完成
  - [x] Avatar - 2024-12-08 完成
  - [x] Tag - 2024-12-08 完成
  - [x] Pagination - 2024-12-08 完成
  - [x] Dropdown - 2024-12-08 完成
- [ ] 第三批组件重构 (15/75+)
  - [x] DatePicker - 2024-12-08 完成（datetime-picker）
  - [x] Upload - 2024-12-08 完成
  - [x] Timeline - 2024-12-08 完成
  - [x] Progress - 2024-12-08 完成
  - [x] Tree - 2024-12-08 完成
  - [x] Auto-Animate - 2024-12-08 完成
  - [x] ColorPicker - 2024-12-08 完成
  - [x] Skeleton - 2024-12-08 完成
  - [x] Result - 2024-12-08 完成
  - [x] Breadcrumb - 2024-12-08 完成
  - [x] Steps - 2024-12-08 完成
  - [x] Spin - 2024-12-08 完成
  - [x] Affix - 2024-12-08 完成
  - [x] Alert - 2024-12-08 完成
  - [x] Anchor - 2024-12-08 完成

## 重构计划时间表

- 开始日期：2024-12-08
- 第一批完成目标：2024-12-15
- 第二批完成目标：2024-12-22
- 第三批完成目标：2025-01-15
- 全部完成目标：2025-01-30

## 质量保证

每个重构完成的组件需确保：

1. 视觉一致性：与其他重构后的组件保持一致的样式
2. 功能完整性：所有原有功能演示保持完整
3. 代码展示正确：代码示例与实际渲染结果一致
4. 响应式适配：在不同屏幕尺寸下正常显示
5. 主题支持：同时支持亮色和暗色主题

## 注意事项

1. 保持原有演示逻辑不变，只调整UI展示方式
2. 确保代码示例与实际渲染一致
3. 代码块使用适当的语言标识（默认为`vue`）
4. 利用`ui-demo`组件的动画效果提升用户体验
5. 合理使用默认展开/折叠功能，避免页面过长
6. 从简单组件开始，逐步推进到复杂组件
