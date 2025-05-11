/**
 * UI组件类型定义
 * 创建日期: 2024-09-11
 * 更新日期: 2024-09-13 - 添加更多基础类型
 * 更新日期: 2024-09-14 - 添加边框、列表、步骤条相关类型和菜单相关类型
 * 更新日期: 2024-09-15 - 添加Grid组件相关类型和TsxDemo组件类型、Watermark组件类型
 */

/**
 * 按钮类型
 */
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

/**
 * 标签类型
 */
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

/**
 * 文本类型
 */
export type TextType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'

/**
 * 警告提示类型
 */
export type AlertType = 'info' | 'success' | 'warning' | 'error'

/**
 * 骨架屏类型
 */
export type SkeletonType = 'text' | 'button' | 'avatar' | 'image' | 'paragraph' | 'card' | 'list' | 'custom'

/**
 * 摇晃效果类型
 */
export type ShakeType = 'base' | 'slow' | 'little' | 'hard' | 'horizontal' | 'vertical' | 'rotate' | 'opacity' | 'crazy' | 'chunk'

/**
 * 验证码输入类型
 */
export type VerificationType = 'text' | 'number' | 'alphanumeric'

/**
 * 组件尺寸
 */
export type ComponentSize = 'small' | 'default' | 'large'

/**
 * 下拉菜单位置
 */
export type Placement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'

/**
 * 简单的下拉位置
 */
export type SimplePosition = 'top' | 'bottom'

/**
 * 对齐方式
 */
export type Alignment = 'left' | 'center' | 'right' | 'justify'

/**
 * 元素位置
 */
export type ElementPosition = 'top' | 'right' | 'bottom' | 'left'

/**
 * 评分组件尺寸
 */
export type RateSize = ComponentSize | number

/**
 * 图标尺寸
 */
export type IconSize = ComponentSize | string

/**
 * 图标颜色
 */
export type IconColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | string

/**
 * 头像尺寸
 */
export type AvatarSize = ComponentSize | number

/**
 * 间距大小
 */
export type SpaceGap = ComponentSize | string

/**
 * 颜色选择器尺寸
 */
export type ColorPickerSize = ComponentSize | string

/**
 * 布局方向
 */
export type Direction = 'horizontal' | 'vertical'

/**
 * Flex布局方向
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/**
 * 水平对齐方式
 */
export type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'

/**
 * 垂直对齐方式
 */
export type Align = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

/**
 * Flex换行方式
 */
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * 节点位置
 */
export type Position = 'left' | 'right' | 'alternate'

/**
 * 阴影大小
 */
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'

/**
 * 溢出处理方式
 */
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto'

/**
 * 结果状态
 */
export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

/**
 * 主题
 */
export type Theme = 'light' | 'dark'

/**
 * 边框样式类型
 */
export type BorderType = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none'

/**
 * 步骤条类型
 */
export type StepType = 'default' | 'navigation'

/**
 * 步骤条状态
 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

/**
 * 步骤条尺寸
 */
export type StepSize = 'small' | 'medium' | 'large'

/**
 * 列表尺寸
 */
export type ListSize = 'small' | 'default' | 'large'

/**
 * 上传列表类型
 */
export type UploadListType = 'text' | 'picture' | 'picture-card'

/**
 * 徽章类型
 */
export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/**
 * 徽章位置
 */
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

/**
 * 进度条类型
 */
export type ProgressType = 'default' | 'success' | 'warning' | 'danger' | 'info'

/**
 * 抽屉位置
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

/**
 * 标签页类型
 */
export type TabType = 'line' | 'card' | 'segment'

/**
 * 加载组件类型
 */
export type SpinType = 'circle' | 'dot' | 'pulse'

/**
 * 菜单模式
 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline'

/**
 * 菜单主题
 */
export type MenuTheme = 'light' | 'dark'

/**
 * 弹出位置
 */
export type PopupPlacement = 'right' | 'left'

/**
 * 栅格单元对齐方式
 */
export type ItemsAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

/**
 * 栅格内容对齐方式
 */
export type ContentAlign = 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly'

/**
 * 主题类型
 */
export type ThemeType = 'primary' | 'success' | 'warning' | 'danger'

/**
 * 阴影显示模式
 */
export type ShadowMode = boolean | 'hover'

/**
 * 定位模式
 */
export type PositionMode = 'top' | 'bottom'

/**
 * 字体样式
 */
export type FontStyle = 'none' | 'normal' | 'italic' | 'oblique'

/**
 * 字体粗细
 */
export type FontWeight = 'normal' | 'light' | 'bold' | number
