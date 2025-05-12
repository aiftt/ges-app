规范：请严格遵循 @.cursor/rules/rule.mdc 规范

计划：@admin.md

问题：

1. 
   check-if-layout-used.js:12 [nuxt] Your project has layouts but the `<NuxtLayout />` component has not been used.

   

迭代：

1. 接入 mongodb，我的数据库配置都在 .env 配置文件里了，不要将数据库信息写死到代码里使用.env里的配置

2. 使用 ui/ 下现有的组件，创建一个后台管理系统页面，页面布局和菜单信息参考：https://boot3.jeecg.com/ 这个，初步原型需要具备以下基础功能

   - 注意命名规范，禁止无意义的命名，如错误示范：`system/menu-management`，正确示范：`system/menu`
   - 注意禁止使用 mock 数据，必须开发对应的接口来接入真实的数据(如果没有可以先初始化基础数据到数据库)
   - 登录页面
   - 菜单包括：菜单管理，用户管理，角色刚里，字典管理，主页（仪表盘）等
   - 注意设计要符合标准的前端UI设计标准

3. 指定完整详尽的开发计划到 docs/admin.md 中，然后按照计划每次只完成一个功能点的步伐推进

---

计划：@plan.md，按照计划推进，每次只完成两个组件以便更仔细的思考实现细节,别忘记添加对应的演示组件和在 pages/demo/components.vue 中添加演示代码，记得更新计划文档。

优化：

1. 将项目中这种类型 统一到一个 d.ts 什么文件中去添加到 tsconfig.json 中去，'base' | 'slow' | 'little' | 'hard' | 'horizontal' | 'vertical' | 'rotate' | 'opacity' | 'crazy' | 'chunk'，方便直接使用，而不是每个地方都要写一遍

重要迭代：注意本次迭代都是跟 css 样式或动画有关的，我的目的是将一些很好用的 css 动画集成到我们的项目中来

这是一个动画库的样式/Users/lizhicheng/Downloads/magic-master/dist/magic.css

思考下如何集成到项目中 ，记得充分利用 scss 的特性来简化样式代码，不然按照magic 源码 css 样式文件会很大

记录：将所有问题记录到 docs/issues.md 下面记录下来，按照问题类型和相关组件划分章节，记录下问题修复时间，状态

问题：

1. Mention 提及组件

   - 输入@之后并没有弹出列表

2. code 组件

   - Html, vue 代码被识别成了 xml
   - 高亮行不生效

3. icon 组件

   - animation 属性没生效

---

问题：

1. Skeleton 骨架屏 动画 效果太low了 优化下动画效果，要有循序渐进的感觉
2. Breadcrumb 面包屑 demo 代码中的 图标都不对

---

问题：

1. messagebox

   - 我滚动的时候，滚动了后面的页面，而不是 messagebox 的实际内容
   - 高度有问题，应该按照内容的实际高度自动化，除非用户手动设置了高度
   - Icon 应该和标题一起 而不是和整个内容并列 太不合理了
   - 关闭的时候报错：service.ts:58 Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

2. message 组件完全不能用，demo中点击按钮没有反应

---

问题：

1. Tree 组件有问题，演示代码也有问题，什么都没有,如图2
2. list 组件 水平列表布局 有问题，如图1
3. Calendar 日历
   - 日期范围限制 选择的时候下面的范围没变化
   - 带事件标记，有事件的格子鼠标放上去的时候应该 用 tooltip 形式 展示内容
   - 事件类型说明里的 Unocss 颜色不对，应该使用主题样式文件中定义的css 变量
4. tour 漫游组件有问题，
   - 点击上/下一步的时候并没有跳到对应的元素上，另外target要支持传入 具体的元素对象和 vue ref 绑定的变量
   - 在弹窗 tour 漫游组件弹窗的时候我还可以滚动背后的页面，这个不对的，在漫游的时候应该组织用户的行为穿透漫游组件
5. timepicker 组件问题
   - 我选择时间之后不该直接关闭，我只是选择了时，这样导致我无法直接选择分秒等，应该在弹出选择框之后需要点击确定才关闭下拉框(或者点击下拉框之外的地方)
6. ColorPicker 颜色选择器
   - 选择颜色值之后变成了 rgba(NaN, NaN, NaN, 0.5) 这种带 NaN 的颜色值，排查下颜色值的计算方式
7. Modal 模态对话框
   - 动画效果，不生效
   - 垂直居中的计算方式有问题，应该要保证内容区居中而不是只有内容区的上边框垂直居中
   - 异步关闭，我点击关闭的时候立即关闭了，并没有延迟效果，并且延迟关闭的时候应该停止交互给出倒计时关闭提示
8. drawer 抽屉，缺少动画效果，出来和隐藏都太生硬
9. menu 菜单组件，应该还没完成包括 demo，继续完善

本次迭代出现很多问题，请谨慎仔细逐个排查并解决问题，切不可引入新的问题，不要粗暴的规避问题，专业点彻底解决所有问题。

问题：

1. Overviewlist
   - 收起 按钮太丑了优化下
   - 展开的时候如果显示不下应该给予滚动条展示，不然被遮挡的部分无法查看
   - 支持下垂直方向上的更多展示(场景：一个列表，列表项占一整行情况)

---

迭代：

1. input tag 添加不同 ui-tag 颜色演示
2. Cascader 级联选择器 改成鼠标放在节点上的时候自动展示下一级，单击选中，去掉双击选中

问题：

1. Autocomplete 选项分组，我选中一个之后，再展开下拉框的时候里面是空的
2. ColorPicker 颜色选择器 带透明度 时候 无法选中颜色，圆圈一值在右下角位置不动，值变成了 rgba(NaN, NaN, NaN, 0.5) 这种无效值，不同颜色格式 也是一样的问题，所有的都有问题 选中颜色都变成了 NaN 这种
3. rate 组件：[Icon] failed to load icon `carbon:heart-filled`，可以考虑换个图标集的图标，如果 carbon 里没有
4. TimePicker 时间选择器 问题还是没解决，不要选择时间的时候就关闭下拉框，点击确定的时候才关闭
5. Split 面板分割：
   1. 分割位置 的值没有随便我拖动发生变化
   2. 最小尺寸限制 不生效
   3. 自定义分隔条样式，我拖动到最右边之后拖动元素消失了导致我没法继续拖动了
6. Collapse 折叠面板
   1. 嵌套面板的时候，里面嵌套的折叠面板超出了外层内容区，如图1

---

迭代：

1. 给最近添加的组件添加 demo（input autocomplete, verification） ，完成之后继续按照计划走
2. input tag 使用已经有的 ui tag 而不是自定义

优化：

1. input number 操作按钮总是要在输入框内部

---

问题：

1. 键盘导航 下拉框 - 点击组件下拉框出不来
1. input number 上下箭头超出范围了，如图1，按钮在两侧的时候有问题+-号都在左边了，聚焦时候边框太丑太粗了优化下

---

问题：

1. Resizablebox 组件不生效 我拖动的时候大小并没变化
2. modal 模态框问题
   1. modal 组件弹出和关闭都太生硬了加点动画，可以考虑使用现有的 auto animate 不行就自己实现
   2. modal 关闭的时候感觉有延迟？？点完会停顿下才消失
   3. modal 不同动画效果 不生效

---

1. 先实现 tag 组件，然后将 select 折叠标签的多选 里的标签改成 tag 组件并且支持配置样式(按照 tag 组件实现)
2. 给 select 下拉框添加个小箭头(美观度你自己设计，参考其他UI库，如element-plus, ant design)
3. 像 element-plus select 一样，要支持 teleport 功能，类似的组件都应该要支持这个功能
4. 要处理页面缩放的时候 select 下拉框位置问题

改进：

1. 不筛选的时候保持使用非 input，只有需要筛选的时候使用 input

2. 选中选择器的时候(不管单选还是有筛选)也要能展开或收起下拉框而不是只能点击箭头，如果是筛选使用的 input 那么在聚焦 input 的时候展开下拉框

问题：

1. 点击选择器的时候会弹出下拉框再次点击的时候应该隐藏下拉框

2. placeholder 重复，输入光标位置不对，如图1

   ![image-20250508103730221](/Users/lizhicheng/Library/Application Support/typora-user-images/image-20250508103730221.png)

3. 分组选项选中后没反应

4. 折叠标签的样式需要适配下 ，如图2：

   ![image-20250508103940272](/Users/lizhicheng/Library/Application Support/typora-user-images/image-20250508103940272.png)

5. 自定义下拉菜单头部样式需要优化，如图3：

   ![image-20250508104059497](/Users/lizhicheng/Library/Application Support/typora-user-images/image-20250508104059497.png)

建议：选择器本身应该使用 input 作为基础，参考 element-plus

问题：

1. 参考 element-plus el-select + el-select-v2，基于现在的实现将element-plus 中下拉框的功能都实现过来(包括但不限于：多选, 自定义模板, 自定义下拉菜单的头部, 自定义下拉菜单的底部, 分组, 筛选选项, 远程搜索, 创建新的选项, 自定义标签，隐藏多余标签的多选, 可过滤的多选, 自定义加载, 空值配置, 自定义宽度等等)
2. 给 ui select 下来面板加上动画效果，可考虑使用 auto animate 功能(参考 auto-animate.vue)
3. 参考 element-plus 源码：/Users/lizhicheng/github/vue/element-plus/packages/components/select 和 select-v2
4. 注意我要的是 ui select 一个组件内完整实现 element-plus select 和 select-v2 完整功能

问题：

1. textarea 自动调整大小并没效果，输入更多行，会出现滚动条高度并没变
1. 不要使用 textareaStyle 内联 style

需求：按照计划推进，实现其他组件

---

需求：

1. 在 composables/ 目录下，结合 pinia + vueuse 实现一个带过期时间的持久化的 store 主要用来保存，比如主题配置，认证配置，菜单配置等需要持久化配置的

问题：

1. 请检查 highlight.js 包下面有哪些样式，不要凭空想想，在切换主题的时候报错：Failed to load theme: github TypeError: Failed to resolve module specifier 'highlight.js/styles/github.css'
2. 我摘出了部分主题可使用，github 系列, atom-one 系列,monokai系列, solarized系列，帮我添加这几个系列的主题即可，然后样式直接静态写死导入

---

问题：

1. trigger/index.vue 内联style 改成 css 变量方式实现
2. trigger/index.vue `<style>` 中主题相关的变量移到全局主题样式下去
3. 删掉 assets/themes 合并到 assets/scss/themes/ 下去

问题：

1. color/index.vue 组件未实现
2. Divider, image, popover, resizebox, tooltip 组件主题变量还未迁移
3. submenu.vue 里还有直接使用 style 的，按照规范替换掉

下面是我查找到的还有直接使用 style 的结果：

```
6 个结果 - 2 文件

components/ui/tooltip/index.vue:
  154
  155:   tooltipRef.value.style.top = `${top}px`
  156:   tooltipRef.value.style.left = `${left}px`
  157  }

components/ui/trigger/index.vue:
  384    // 应用位置
  385:   contentRef.value.style.top = `${top}px`
  386:   contentRef.value.style.left = `${left}px`
  387

  389    if (props.arrow && arrowRef.value) {
  390:     arrowRef.value.style.top = `${arrowTop}px`
  391:     arrowRef.value.style.left = `${arrowLeft}px`
  392    }

components/ui/icon/index.vue:
  49    if (!isPresetSize.value && props.size) {
  50:     styles['--ui-icon-custom-size'] = props.size
  51    }

  54    if (props.color) {
  55:     styles['--ui-icon-custom-color'] = props.color
  56    }

```

迭代：

继续按照计划 @plan.md 实施，完成剩余组件，并优化已有组件适配主题

检查：

1. 检查下 popconfirm,popover,trigger，这是上次会话生产的代码但是会话异常结束了，处于半完成状态，优先完成这几个

清理多余代码：

1. `ui/datepicker/` 及相关的 `pages/demo/datepicker.vue` 等
2. 给项目增加 vue tsx 语法支持

优化：

1. 将 datepicker 拆分成 date/picker.vue 方便后续添加更多日期相关的组件，比如： date/range.vue

问题：

1. 关于 config/provider 组件及其使用方式不对，你这样写死 defaultLightTheme, defaultDarkTheme 的值那会和我的 themes/ 下面的 css 变量冲突了，我觉得 themes/ 下面配置的 CSS 才是最基础的配置，我们应该基于这个配置的色调来做动态配置，而不是这里有写死一套

问题：

1. config/provider 没生效
2. config/provider 中没有使用主题配置，而是写死了 --ui-color-\*

迭代：

继续按照计划 @plan.md 实施，完成剩余组件，并优化已有组件适配主题

迭代：

1. 增加 **@formkit/auto-animate/nuxt** 插件，让页面更加 Motion ，不那么死板，使用 vue 指令方式使用，并且创建 demo 来展示其用法和示例，注册安装之后可以直接使用 `v-auto-animate` 指令

迭代：

1. 添加一个代码组件，用来展示不同语言的代码，可考虑使用相关的插件，需要支持，行数展示，复制等功能
2. 检查下 icon 样式代码，很多图标都展示不出来
3. 检查下分割线组件，并没有什么实际效果，如：文本位置，带文本的，垂直等等
4. 检查所有已经是实现的组件，适配light,dark主题

优化：

1. 主题配置，默认色调暗亮太丑了参考主流UI组件来配置其色调
2. 主要和成功的主题色调是一样的，要区分下参考主流UI组件来配置其色调

检查：按照新规范检查代码，去掉 style 行内样式采用新规范写法

优化：

1. 我看组件中的 primary, success , .. 等样式都直接写死的，这个不对，这些主题性的样式应该维护在全局的 theme-variable.scss 中，然后供 ui 组件使用，不然将来改变主题更变没法做
2. 遍历修改所有 ui 组件，使其遵循第一条，并将其优化总结成规范写道 .cursor/rules 规范文件中去

优化：

1. 给 ui/button 添加一个点击动画效果
2. Button 去掉黑色的边框，太丑了
3. 适配下暗色主题，我切换主题都没啥变化

思考：

作为专业设计师，架构师，前端专家的你，思考一下，如果才能优雅的实现 ui 组件样式，比如：通过 vue v-bind + css variable 特性，或者你认为更好的方案。

问题：

1. 我检查了 ui/ 下还有很多组件里面是直接使用 style 对象，内联样式，全部按照规范替换掉

需求：

1. 将主题相关的样式提取到公共的 scss 文件，方便后续进行主题动态定制
2. 然后在组件中通过 unocss 如 `bg-[var(--var-name)]` 方式来引用，否则后续进行主题定制会很麻烦还得修改每个组件的classname
3. 检查现有的 ui/ 组件中是否用到了 style 内联样式，如果有用到都改成unocss, css 或 css 变量方式

# TODOs

## css

1. [magic](https://github.com/miniMAC/magic)
2. [css shake](https://github.com/elrumordelaluz/csshake)
3. [css loaders](https://css-loaders.com/)
4. [css generators](https://css-generators.com/)
5. [css shapes](https://css-shape.com/)
6. [css tip](https://css-tip.com/)
7. [hover](https://ianlunn.github.io/Hover/)

## 插件

1. [splitpanes](https://antoniandre.github.io/splitpanes/)

## 组件

### Modal

- [ ] 添加动画，解决太生硬问题
- [ ] 嵌套问题

### Input

- [ ] Input 添加补全列表支持

### Carousel

- [ ] 添加更多特效的轮播效果
