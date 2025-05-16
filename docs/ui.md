> 本文档记录 ui/ 下的组件已实现功能和未实现点
>
> 注意点(本文档规范)：
>
> 1. 不用单独新加"已修复问题"章节，直接通过 checkbox 状态记录即可。

# TODO

待完成的组件：

## shadcn

参考来源：[magicui](https://magicui.design/docs/components/marquee)，注意下面名称上的链接为 `pnpm dlx shadcn@latest add "https://magicui.design/r/marquee"` 中的链接部分，只参考其实现原理来移植到 ui/<name>/index.vue 下，名称后面也列出了对应的组件目录位置 `ui/.../...vue`

在实现的时候可以先通过 `pnpm dlx shadcn@latest add "https://magicui.design/r/marquee"` 安装或直接通过链接下载到 `/tmp/` 下，然后参考源码来实现移植到我们的 ui/ 下。

- [ ] [Marquee](https://magicui.design/r/marquee)：`ui/marquee/index.vue`, An infinite scrolling component that can be used to display text, images, or videos.
- [ ] [Terminal](https://magicui.design/r/terminal)：`ui/terminal/index.vue`, An implementation of the MacOS terminal. Useful for showcasing a command line interface.
- [ ] [Bento Grid](https://magicui.design/r/bento-grid)：`ui/bento/grid.vue`, Bento grid is a layout used to showcase the features of a product in a simple and elegant way.
- [ ] [Animated list](https://magicui.design/r/animated-list)：`ui/animated/list.vue`, A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.
- [ ] [Dock](https://magicui.design/r/dock)：`ui/dock/index.vue`, An implementation of the MacOS dock
- [ ] [orbiting-circles](https://magicui.design/r/orbiting-circles)：`ui/orbiting/circles.vue`, A collection of circles which move in orbit along a circular path
- [ ] [icon cloud](https://magicui.design/r/icon-cloud) ：`ui/icon/cloud.vue`，An interactive 3D tag cloud component
- [ ] [file tree](https://magicui.design/r/file-tree): `ui/file/tree.vue`，A component used to showcase the folder and file structure of a directory.
- [ ] [code comparison](https://magicui.design/r/code-comparison): `ui/code/comparison.vue`, A component which compares two code snippets.
- [ ] [script-copy-btn](https://magicui.design/r/script-copy-btn)：`ui/button/copy.vue`，Copy code to clipboard
- [ ] [scroll-progress](https://magicui.design/r/scroll-progress)：`ui/scroll/progress.vue`, Animated Scroll Progress for your pages
- [ ] [Lens](https://magicui.design/r/lens)：`ui/lens/index.vue`，A interactive component that enables zooming into images, videos and other elements.
- [ ] [animated-beam](https://magicui.design/r/animated-beam)：`ui/animated/beam.vue`，An animated beam of light which travels along a path. Useful for showcasing the "integration" features of a website.
- [ ] [border-beam](https://magicui.design/r/border-beam): `ui/border/beam.vue`, An animated beam of light which travels along the border of its container.
- [ ] [shine-border](https://magicui.design/r/shine-border): `ui/border/shine.vue`, Shine border is an animated background border effect.
- [ ] [magic-card](https://magicui.design/r/magic-card), `ui/card/magic.vue`, A spotlight effect that follows your mouse cursor and highlights borders on hover.
- [ ] [meteors](https://magicui.design/r/meteors): `ui/meteor/index.vue`, A meteor shower effect.
- [ ] [Confetti](https://magicui.design/r/confetti): `ui/animated/confetti.vue`, Confetti animations are best used to delight your users when something special happens
- [ ] [Particles](https://magicui.design/r/particles): `ui/animated/particles.vue`, Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity.
- [ ] [Cool mode](https://magicui.design/r/cool-mode): `ui/cool/mode.vue`, Cool mode effect for buttons, links, and other DOMs
- [ ] [scratch-to-reveal](https://magicui.design/r/scratch-to-reveal), `ui/scratch/reveal.vue`, The ScratchToReveal component creates an interactive scratch-off effect with customizable dimensions and animations, revealing hidden content beneath.
- [ ] [text animation](https://magicui.design/r/text-animate), `ui/text/animate.vue`, A text animation component that animates text using a variety of different animations.
- [ ] [line-shadow-text](https://magicui.design/r/line-shadow-text), `ui/text/line-shadow.vue`, A text component with a moving line shadow.
- [ ] [aurora text](https://magicui.design/r/aurora-text), `ui/text/aurora.vue`, A beautiful aurora text effect
- [ ] [video text](https://magicui.design/r/video-text), `ui/text/video.vue`, A text component with a video background.
- [ ] [number-ticker](https://magicui.design/r/number-ticker), `ui/number/ticker.vue`, Animate numbers to count up or down to a target number
- [ ] [animated-shiny-text](https://magicui.design/r/animated-shiny-text), `ui/text/shiny.vue`, A light glare effect which pans across text making it appear as if it is shimmering.
- [ ] [animated-gradient-text](https://magicui.design/r/animated-gradient-text), `ui/text/gradient.vue`, An animated gradient background which transitions between colors for text.
- [ ] [text-reveal](https://magicui.design/r/text-reveal), `ui/text/reveal.vue`, Fade in text as you scroll down the page.
- [ ] [hyper-text](https://magicui.design/r/hyper-text), `ui/text/hyper.vue`, A text animation that scrambles letters before revealing the final text.
- [ ] [word-rotate](https://magicui.design/r/word-rotate), `ui/text/rotate.vue`, A vertical rotation of words
- [ ] [typing-animation](https://magicui.design/r/typing-animation), `ui/text/typing.vue`, Characters appearing in typed animation
- [ ] [scroll-based-velocity](https://magicui.design/r/scroll-based-velocity), `ui/scroll/velocity.vue`, Scrolling text whose speed changes based on scroll speed
- [ ] [flip-text](https://magicui.design/r/flip-text), `ui/text/flip.vue`, Text flipping character animation
- [ ] [box-reveal](https://magicui.design/r/box-reveal), `ui/box/reveal.vue`, Sliding box animation that reveals text behind it.
- [ ] [sparkles-text](https://magicui.design/r/sparkles-text), `ui/text/sparkles.vue`, A dynamic text that generates continuous sparkles with smooth transitions, perfect for highlighting text with animated stars.
- [ ] [morphing-text](https://magicui.design/r/morphing-text), `ui/text/morphing.vue`, A dynamic text morphing component for Magic UI.
- [ ] [spinning-text](https://magicui.design/r/spinning-text), `ui/text/spinning.vue`, The Spinning Text component animates text in a circular motion with customizable speed, direction, color, and transitions for dynamic and engaging effects.
- [ ] [rainbow-button](https://magicui.design/r/rainbow-button), `ui/button/rainbow.vue`, An animated button with a rainbow effect.
- [ ] [shimmer-button](https://magicui.design/r/shimmer-button), `ui/button/shimmer.vue`, A button with a shimmering light which travels around the perimeter.
- [ ] [shiny-button](https://magicui.design/r/shiny-button), `ui/button/shiny.vue`, A shiny button component with dynamic styles in the dark mode or light mode.
- [ ] [interactive-hover-button](https://magicui.design/r/interactive-hover-button), `ui/button/interactive.vue`, A visually engaging button component that responds to hover with dynamic transitions, adapting smoothly between light and dark modes for enhanced user interactivity.
- [ ] [animated-subscribe-button](https://magicui.design/r/animated-subscribe-button), `ui/button/subscribe.vue`, An animated subscribe button useful for showing a micro animation from intial to final result.
- [ ] [pulsating-button](https://magicui.design/r/pulsating-button), `ui/button/pulsating.vue`, An animated pulsating button useful for capturing attention of users.
- [ ] [ripple-button](https://magicui.design/r/ripple-button), `ui/button/ripple.vue`, An animated button with ripple useful for user engagement.
- [ ] [warp-background](https://magicui.design/r/warp-background), `ui/background/warp.vue`, A card with a time warping background effect.
- [ ] [flickering-grid](https://magicui.design/r/flickering-grid), `ui/grid/flickering.vue`, A flickering grid background made with SVGs, fully customizable using Tailwind CSS.
- [ ] [animated-grid-pattern](https://magicui.design/r/animated-grid-pattern), `ui/grid/animated.vue`, A animated background grid pattern made with SVGs, fully customizable using Tailwind CSS.
- [ ] [retro-grid](https://magicui.design/r/retro-grid), `ui/grid/retro.vue`, An animated scrolling retro grid effect
- [ ] [ripple](https://magicui.design/r/ripple), `ui/ripple/index.vue`, An animated ripple effect typically used behind elements to emphasize them.
- [ ] [dot-pattern](https://magicui.design/r/dot-pattern), `ui/dot/pattern.vue`, A background dot pattern made with SVGs, fully customizable using Tailwind CSS.
- [ ] [grid-pattern](https://magicui.design/r/grid-pattern), `ui/grid/pattern.vue`, A background grid pattern made with SVGs, fully customizable using Tailwind CSS.
- [ ] [interactive-grid-pattern](https://magicui.design/r/interactive-grid-pattern), `ui/grid/interactive.vue`, A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS.

# 通用问题

- [x] 组件主题变量位置规范：trigger, segmented 中的 css 变量需要放到 assets/scss/themes 下面
- [x] 缺少 Notification 组件演示：需要将 @components/demo/notification.vue 添加到 @pages/demo/components.vue 页面
- [x] 使用 `ui/table` 更新 @components/demo/ 下演示组件中用到表格的组件
  - 已完成 table-demo.vue, table-pagination-demo.vue 和 table-with-pagination.vue 组件的改造
  - 已确保所有表格相关演示组件都使用 ui-table 组件
- [x] 通篇检查 @components/demo/ 下的组件，使用 @ui/demo 组件重构 demo 代码，保证项目中的 demo 结构样式统一
  - 已完成 table-demo.vue, table-pagination-demo.vue 和 table-with-pagination.vue 组件的 ui-demo 结构改造
  - 已调整组件格式，使其遵循统一的 ui-demo 组件结构

# 表单组件

## Cascader 级联选择器

### 功能点

- [x] 多级时，鼠标悬浮节点上自动展开子节点
- [x] 支持单选和多选模式
- [x] 支持显示完整路径或仅标签
- [x] 支持清空选中项
- [x] 支持搜索过滤选项，搜索结果显示完整路径
- [x] 支持不同尺寸（small、default、large）
- [x] 支持自定义分隔符
- [x] 支持禁用选项和整个组件
- [x] 支持一次性展开所有节点（expandAll模式）

#### 单选模式

- [x] 单击选中节点，同时关闭下拉框
- [x] 支持选中非叶子节点（checkStrictly模式）

#### 多选模式

- [x] 单击选中节点，不关闭下拉框
- [x] 支持标签删除
- [x] 选中项正确回显

### 已修复问题

- [x] 组件存在类型错误：findNodeByValue函数类型不匹配
- [x] 在checkStrictly模式下，单选非叶子节点时也应该关闭下拉框
- [x] 完善expandAll功能，支持一次性展开所有节点
- [x] 多选模式下，选中一个选项后就关闭了下拉框，且没有回显选中项

## Select 选择器

### 功能点

- [x] 支持单选和多选模式
- [x] 支持过滤搜索
- [x] 支持禁用选项和整个组件
- [x] 支持自定义模板渲染

### BUG

- [ ] 多选模式下，选完一个就关闭下拉框，不符合多选的使用场景

## TimePicker 时间选择器

### 功能点

- [x] 支持选择时分秒
- [x] 支持不同尺寸
- [x] 支持禁用状态

### BUG

- [ ] 在选择时分秒时不应自动关闭下拉框，应该点击确认后才关闭，以便连续选择时分秒

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## TimeSelect 时间选择

### 功能点

- [x] 支持时间范围选择
- [x] 支持步进设置

### BUG

- [ ] 下拉框有闪现问题，并且位置计算不正确

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## DateTimePicker 日期时间选择器

### 功能点

- [x] 支持日期和时间的组合选择
- [x] 支持范围选择
- [x] 支持快捷选项

### BUG

- [ ] 下拉框被 ui-demo 容器挡住，影响使用

## DatePicker 日期选择器

### 功能点

- [x] 支持日期选择
- [x] 支持范围选择
- [x] 支持不同格式（年、月、日）
- [x] 支持禁用状态

## Input 输入框

### 功能点

- [x] 支持不同尺寸
- [x] 支持前后缀图标
- [x] 支持禁用状态
- [x] 支持清空功能
- [x] 支持密码显示切换

## Textarea 文本域

### 功能点

- [x] 支持自动高度调整
- [x] 支持字数限制
- [x] 支持禁用状态

## Radio 单选框

### 功能点

- [x] 支持按钮样式
- [x] 支持组选择
- [x] 支持禁用状态

## Checkbox 复选框

### 功能点

- [x] 支持全选/取消全选
- [x] 支持组选择
- [x] 支持禁用状态
- [x] 支持不确定状态（indeterminate）

## Switch 开关

### 功能点

- [x] 支持自定义文字
- [x] 支持不同尺寸
- [x] 支持禁用状态
- [x] 支持加载状态

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Slider 滑块

### 功能点

- [x] 支持范围选择
- [x] 支持步长设置
- [x] 支持显示刻度
- [x] 支持禁用状态

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Upload 上传

### 功能点

- [x] 支持多文件上传
- [x] 支持拖拽上传
- [x] 支持图片预览
- [x] 支持上传进度展示
- [x] 支持上传限制（类型、大小）

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Rate 评分

### 功能点

- [x] 支持自定义图标
- [x] 支持半星选择
- [x] 支持只读模式
- [x] 支持禁用状态

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## ColorPicker 颜色选择器

### 功能点

- [x] 支持颜色选择
- [x] 支持预设颜色
- [x] 支持透明度调整

### BUG

- [ ] 自定义预设颜色区域的预设颜色圆圈点击没有反应

## QRCode 二维码

### 功能点

- [x] 支持生成二维码
- [x] 支持自定义大小和颜色
- [x] 支持不同的纠错级别

### 已修复问题

- [x] size 属性类型错误：type check failed for prop "size". Expected Number with value 150, got String with value "150"
- [x] errorCorrectionLevel 和 renderAs 属性类型错误：不能将类型"string"分配给类型"'L' | 'M' | 'Q' | 'H' | undefined"

## Code 代码组件

### 功能点

- [x] 支持代码高亮
- [x] 支持多种主题

### 已修复问题

- [x] 行号和高亮行功能不生效：已移除行号和高亮行功能

# 数据展示组件

## Table 表格

### 功能点

- [x] 支持自定义列渲染
- [x] 支持排序
- [x] 支持固定表头和列
- [x] 支持分页

### 已修复问题

- [x] 表格头部的排序三角图标上下间隔过大，导致头部被撑高：已优化间距并与标题垂直居中

## Timeline 时间线

### 功能点

- [x] 支持自定义内容
- [x] 支持不同的节点类型
- [x] 支持交替模式

### 已修复问题

- [x] 连接线条不可见，导致时间线显示不完整：已修复连接线显示问题

## Tree 树形控件

### 功能点

- [x] 支持节点展开/折叠
- [x] 支持节点选择
- [x] 支持节点搜索

### BUG

- [ ] 组件似乎还未完全实现或存在问题

## VirtualTree 虚拟树

### 功能点

- [x] 支持大数据量渲染优化
- [x] 支持节点展开/折叠
- [x] 支持节点搜索

### 已修复问题

- [x] 亮色主题下箭头颜色为纯黑色，与主题不协调：已修改为使用次要文本颜色，与主题保持一致

## Calendar 日历

### 功能点

- [x] 支持日期选择
- [x] 支持事件标记
- [x] 支持自定义内容渲染

### 已修复问题

- [x] 带事件标记的日历需要在鼠标悬停时通过 tooltip 展示事件列表及简介：已实现，使用ui-tooltip组件显示事件详情

## Badge 徽标

### 功能点

- [x] 支持数字显示
- [x] 支持自定义颜色
- [x] 支持小圆点模式
- [x] 支持最大值

## Avatar 头像

### 功能点

- [x] 支持图片、图标和文字
- [x] 支持不同尺寸
- [x] 支持自定义形状（圆形、方形）
- [x] 支持组合显示

## Tag 标签

### 功能点

- [x] 支持不同类型
- [x] 支持可关闭
- [x] 支持可选中
- [x] 支持自定义颜色

## Empty 空状态

### 功能点

- [x] 支持自定义图片
- [x] 支持自定义描述文字
- [x] 支持底部内容插槽

## Carousel 轮播

### 功能点

- [x] 支持自动播放
- [x] 支持指示器和切换按钮
- [x] 支持不同方向（水平、垂直）
- [x] 支持卡片模式

## Pagination 分页

### 功能点

- [x] 支持页码和每页条数切换
- [x] 支持快速跳转
- [x] 支持简洁模式
- [x] 支持布局自定义

## Descriptions 描述列表

### 功能点

- [x] 支持自定义标签和内容
- [x] 支持水平和垂直布局
- [x] 支持边框和不同尺寸

## Image 图片

### 功能点

- [x] 支持懒加载
- [x] 支持加载失败显示
- [x] 支持预览功能
- [x] 支持缩放、旋转等操作

## Card 卡片

### 功能点

- [x] 支持标题和额外操作区域
- [x] 支持卡片头部和底部
- [x] 支持阴影显示

## List 列表

### 功能点

- [x] 支持基础列表
- [x] 支持带操作列表
- [x] 支持不同尺寸

## Statistic 统计数值

### 功能点

- [x] 支持值和标题展示
- [x] 支持前缀和后缀
- [x] 支持数值增长/减少动画

## Progress 进度条

### 功能点

- [x] 支持线形、环形和仪表盘样式
- [x] 支持自定义颜色
- [x] 支持进度格式

# 反馈组件

## Tooltip 文字提示

### 功能点

- [x] 支持多个方向显示
- [x] 支持自定义内容
- [x] 支持多种触发方式

### 已修复问题

- [x] 浅色主题下倒三角不明显或看不到

## Popover 气泡卡片

### 功能点

- [x] 支持多个方向显示
- [x] 支持自定义内容
- [x] 支持多种触发方式

### 已修复问题

- [x] 没有显示三角标识箭头：问题已确认，Popover组件设置了arrow属性为true，但样式需要改进

## Popconfirm 气泡确认框

### 功能点

- [x] 支持确认/取消操作
- [x] 支持自定义内容
- [x] 支持不同方向显示

### 已修复问题

- [x] 三角标识样式需要改进，下方和右侧位置时三角位置可能不正确：问题已确认，样式已修复

## Trigger 触发器

### 功能点

- [x] 支持多种触发方式
- [x] 支持自定义内容
- [x] 支持多个方向显示

### 已修复问题

- [x] 没有显示三角标识箭头：已修复，已完善CSS变量配置并增强箭头可见性

## Segmented 分段控制器

### 功能点

- [x] 支持多个选项切换
- [x] 支持禁用状态
- [x] 支持自定义内容渲染

### 已修复问题

- [x] 切换时需要添加穿梭动画效果

## Alert 警告提示

### 功能点

- [x] 支持多种类型（成功、警告、错误等）
- [x] 支持关闭按钮
- [x] 支持自定义图标

### BUG

- [ ] 需要支持通过 useAlert 方式使用组件

## Dialog 对话框

### 功能点

- [x] 支持不同类型的对话框（信息、成功、警告、错误）
- [x] 支持自定义宽度
- [x] 支持自定义按钮文本和样式
- [x] 支持异步关闭

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Drawer 抽屉

### 功能点

- [x] 支持不同位置（左、右、上、下）
- [x] 支持多种尺寸
- [x] 支持自定义页脚
- [x] 支持全屏模式

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Spin 加载中

### 功能点

- [x] 支持全屏加载
- [x] 支持自定义提示文本

### BUG

- [ ] 基础用法和不同尺寸的样式代码缺失

## Message 消息提示

### 功能点

- [x] 支持不同类型（成功、警告、错误等）
- [x] 支持自动关闭
- [x] 支持可关闭模式
- [x] 支持全局方法调用

## Notification 通知

### 功能点

- [x] 支持不同类型（信息、成功、警告、错误）
- [x] 支持不同显示位置
- [x] 支持自定义显示时长
- [x] 支持自定义图标

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Result 结果页

### 功能点

- [x] 支持不同状态（成功、失败、警告等）
- [x] 支持自定义图标
- [x] 支持额外内容

## Skeleton 骨架屏

### 功能点

- [x] 支持多种预设形状
- [x] 支持动画效果
- [x] 支持自定义布局

## Modal 模态框

### 功能点

- [x] 支持自定义标题和内容
- [x] 支持确认和取消操作
- [x] 支持自定义宽度
- [x] 支持全屏展示

# 导航组件

## Anchor 锚点

### 功能点

- [x] 支持链接跳转
- [x] 支持滚动高亮

### BUG

- [ ] 滚动时没有预期的效果，组件功能可能有问题

## Dropdown 下拉菜单

### 功能点

- [x] 支持多级菜单
- [x] 支持自定义内容

### BUG

- [ ] 下拉菜单默认都展开，点击触发器没有展开或收起效果

## Menu 菜单

### 功能点

- [x] 支持水平和垂直模式
- [x] 支持多级菜单
- [x] 支持折叠展开

### BUG

- [ ] 左边贴着边界，水平菜单需要有可配置的间距

## Tabs 标签页

### 功能点

- [x] 支持多种页签样式
- [x] 支持新增和关闭页签

### BUG

- [ ] 切换标签页时需要添加动画效果，修复 transition 相关问题："<transition> can only be used on a single element or component. Use <transition-group> for lists."

## Steps 步骤条

### 功能点

- [x] 支持竖直和水平方向
- [x] 支持自定义图标

### BUG

- [ ] 样式不美观，且缺少步骤之间的连接线

## Breadcrumb 面包屑

### 功能点

- [x] 支持自定义分隔符
- [x] 支持链接功能
- [x] 支持图标显示

## Affix 固钉

### 功能点

- [x] 支持固定位置（顶部、底部）
- [x] 支持偏移量设置
- [x] 支持滚动容器指定

## BackTop 回到顶部

### 功能点

- [x] 支持自定义显示内容
- [x] 支持显示阈值设置
- [x] 支持自定义动画

## PageHeader 页头

### 功能点

- [x] 支持标题和子标题
- [x] 支持返回功能
- [x] 支持额外内容

# 布局组件

## Divider 分割线

### 功能点

- [x] 支持水平和垂直方向
- [x] 支持文字（水平模式）
- [x] 支持不同样式（实线、虚线）

## Grid 栅格

### 功能点

- [x] 支持 24 列布局
- [x] 支持响应式布局
- [x] 支持列偏移
- [x] 支持间隔设置

## Layout 布局

### 功能点

- [x] 支持基础布局（header、sider、content、footer）
- [x] 支持侧边栏收缩
- [x] 支持响应式调整

## Space 间距

### 功能点

- [x] 支持水平和垂直方向
- [x] 支持不同尺寸
- [x] 支持环绕模式
- [x] 支持对齐方式

## Scrollbar 滚动条

### 功能点

- [x] 支持自定义滚动条样式
- [x] 支持自动隐藏
- [x] 支持水平和垂直滚动

## Container 容器

### 功能点

- [x] 支持嵌套使用
- [x] 支持水平和垂直排列
- [x] 支持自定义内容

## ResizeBox 调整尺寸容器

### 功能点

- [x] 支持自由调整尺寸
- [x] 支持限制最大/最小尺寸
- [x] 支持方向限制

## Split 分割面板

### 功能点

- [x] 支持水平和垂直分割
- [x] 支持自定义分割比例
- [x] 支持拖拽调整

# 其他组件

## Icon 图标

### 功能点

- [x] 支持多种图标库
- [x] 支持自定义尺寸和颜色
- [x] 支持动画效果
- [x] 支持 animation 直接传对应动画的 classname，更新添加更多"图标动画" demo

### BUG

- [x] 图标动画不生效，没有动起来，使用 @assets/scss/animations 下已有的动画来做，不需要额外添加动画样式
- [x] 使用 ui-demo 改造 components/demo/icon.vue 演示代码

- [x] 图标动画不生效问题：将自定义的旋转动画替换为项目中已有的动画库（2024-12-13）
  - 移除组件内的动画定义，改用项目现有的 animate-spin、magic-anim-pulse、css-shake-base、magic-anim-flash
  - 将 spin 属性改为 animation 属性，支持更多动画类型（spin、pulse、shake、blink）
- [x] 演示代码统一化：使用 ui-demo 组件重构 components/demo/icon.vue（2024-12-13）
  - 替换旧的 section 结构，统一使用 ui-demo 组件
  - 为每个示例添加代码展示，方便用户理解使用方法
  - 添加 API 参考表格，提供组件属性的详细说明
- [x] 增强动画支持：添加直接传递动画类名的功能（2024-12-13）
  - 修改 animation 属性类型，支持传入字符串类型的动画类名
  - 添加高级动画效果示例，展示 magic-anim 系列动画
  - 添加 CSS 摇晃动画示例，展示 css-shake 系列动画
  - 更新 API 参考文档，说明如何使用不同类型的动画

## Typography 排版

### 功能点

- [x] 支持标题、段落、文本等多种组件
- [x] 支持复制、编辑功能
- [x] 支持文字省略

## Watermark 水印

### 功能点

- [x] 支持文字水印
- [x] 支持图片水印
- [x] 支持自定义样式和位置

## Tour 引导

### 功能点

- [x] 支持多步引导
- [x] 支持自定义内容
- [x] 支持定位目标元素

## Mention 提及

### 功能点

- [x] 支持@提及功能
- [x] 支持自定义建议列表
- [x] 支持多种触发方式

## InfiniteScroll 无限滚动

### 功能点

- [x] 支持自动加载更多
- [x] 支持自定义加载提示
- [x] 支持滚动容器指定

## Link 链接

### 功能点

- [x] 支持不同类型
- [x] 支持禁用状态
- [x] 支持下划线控制
- [x] 支持图标

## OverflowList 组件

### 变更记录

- 2024-12-15: 修复demo组件中类型错误问题，正确使用IOverflowItem接口类型

## Autocomplete 组件

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，提高代码一致性和可维护性

## VerificationCode 组件

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格，并支持暗色模式

## Cascader 组件

### 变更记录

- 2024-12-15: 使用ui-demo组件重构演示页面，添加API参考表格和CascaderOption类型说明，并支持暗色模式
