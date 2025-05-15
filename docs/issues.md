# GES UI 组件库问题跟踪

本文件使用复选框记录组件库开发过程中遇到的问题及其修复状态。已解决的问题标记为 `[x]`，未解决的问题标记为 `[ ]`。

## 共用问题

- [x] 组件主题变量位置规范：trigger, segmented 中的 css 变量需要放到 assets/scss/themes 下面

## 表单组件

### QRCode 二维码

- [x] size 属性类型错误：type check failed for prop "size". Expected Number with value 150, got String with value "150"
- [x] errorCorrectionLevel 和 renderAs 属性类型错误：不能将类型"string"分配给类型"'L' | 'M' | 'Q' | 'H' | undefined"

### Code 代码组件

- [x] 行号和高亮行功能不生效：已移除行号和高亮行功能

### Cascader 级联选择器

- [x] 多选模式下，选中一个选项后就关闭了下拉框，且没有回显选中项

### TimePicker 时间选择器

- [ ] 在选择时分秒时不应自动关闭下拉框，应该点击确认后才关闭，以便连续选择时分秒

### TimeSelect 时间选择

- [ ] 下拉框有闪现问题，并且位置计算不正确

### DateTimePicker 日期时间选择器

- [ ] 下拉框被 ui-demo 容器挡住，影响使用

### Select 选择器

- [ ] 多选模式下，选完一个就关闭下拉框，不符合多选的使用场景

### ColorPicker 颜色选择器

- [ ] 自定义预设颜色区域的预设颜色圆圈点击没有反应

## 数据展示组件

### Table 表格

- [x] 表格头部的排序三角图标上下间隔过大，导致头部被撑高：已优化间距并与标题垂直居中

### Timeline 时间线

- [x] 连接线条不可见，导致时间线显示不完整：已修复连接线显示问题

### Tree 树形控件

- [ ] 组件似乎还未实现或有问题

### VirtualTree 虚拟树

- [x] 亮色主题下箭头颜色为纯黑色，与主题不协调：已修改为使用次要文本颜色，与主题保持一致

### Calendar 日历

- [x] 带事件标记的日历需要在鼠标悬停时通过 tooltip 展示事件列表及简介：已实现，使用ui-tooltip组件显示事件详情

## 反馈组件

### Tooltip 文字提示

- [x] 浅色主题下倒三角不明显或看不到

### Popover 气泡卡片

- [x] 没有显示三角标识箭头：问题已确认，Popover组件设置了arrow属性为true，但样式需要改进

### Popconfirm 气泡确认框

- [x] 三角标识样式需要改进，下方和右侧位置时三角位置可能不正确：问题已确认，样式已修复

### Trigger 触发器

- [x] 没有显示三角标识箭头：已修复，已完善CSS变量配置并增强箭头可见性

### Segmented 分段控制器

- [x] 切换时需要添加穿梭动画效果

### Alert 警告提示

- [ ] 需要支持通过 useAlert 方式使用组件

### Dialog 对话框

- [ ] 需要支持通过 useDialog 方式使用组件

### Drawer 抽屉

- [ ] 出现警告 "Extraneous non-props attributes (modelValue) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes."

### Spin 加载中

- [ ] 基础用法和不同尺寸的样式代码缺失

## 导航组件

### Anchor 锚点

- [ ] 滚动时没有预期的效果，组件功能可能有问题

### Dropdown 下拉菜单

- [ ] 下拉菜单默认都展开，点击触发器没有展开或收起效果

### Menu 菜单

- [ ] 左边贴着边界，水平菜单需要有可配置的间距

### Tabs 标签页

- [ ] 切换标签页时需要添加动画效果，修复 transition 相关问题："<transition> can only be used on a single element or component. Use <transition-group> for lists."

### Steps 步骤条

- [ ] 样式不美观，且缺少步骤之间的连接线

## 其他问题

- [ ] 缺少 Notification 组件演示：需要将 @components/demo/notification.vue 添加到 @pages/demo/components.vue 页面
