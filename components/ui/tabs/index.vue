<script setup lang="ts" name="UiTabs">
/**
 * 标签页组件
 * 创建日期: 2024-08-03
 * 作者: aiftt
 * 更新日期: 2024-09-09 - 提取CSS变量到主题文件中
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-14 - 使用TabType类型定义
 */

import type { ComponentSize, ElementPosition, TabType } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 激活的标签页名称或索引
   */
  modelValue?: string | number
  /**
   * 标签类型
   */
  type?: TabType
  /**
   * 标签大小
   */
  size?: ComponentSize
  /**
   * 标签位置
   */
  tabPosition?: ElementPosition
  /**
   * 是否可关闭
   */
  closable?: boolean
  /**
   * 是否显示附加内容
   */
  addable?: boolean
  /**
   * 附加按钮文本
   */
  addText?: string
  /**
   * 是否可编辑
   */
  editable?: boolean
  /**
   * 是否居中
   */
  centered?: boolean
  /**
   * 是否自动扩展宽度
   */
  stretch?: boolean
  /**
   * 自定义标签栏样式
   */
  tabBarStyle?: Record<string, any>
  /**
   * 标签页切换动画
   */
  transition?: string
  /**
   * 背景色
   */
  backgroundColor?: string
  /**
   * 激活标签底部条颜色
   */
  activeBarColor?: string
}>(), {
  type: 'line',
  size: 'default',
  tabPosition: 'top',
  closable: false,
  addable: false,
  addText: '新增',
  editable: false,
  centered: false,
  stretch: false,
  transition: 'fade',
})

// 定义emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'tabClick', pane: any, event: MouseEvent): void
  (e: 'tabChange', name: string | number): void
  (e: 'tabRemove', name: string | number): void
  (e: 'tabAdd'): void
  (e: 'edit', targetName: string | number | null, action: 'add' | 'remove'): void
}>()

// 当前激活的标签名
const activeTab = ref(props.modelValue)

// tabs的根元素
const tabsRoot = ref<HTMLElement | null>(null)

// 标签项列表
const panes = ref<any[]>([])

// 注册标签项
function registerPane(pane: any) {
  if (pane.name) {
    panes.value.push(pane)
    // 如果没有默认激活项，则选中第一个
    if (!activeTab.value && panes.value.length === 1) {
      activeTab.value = pane.name
      emit('update:modelValue', pane.name)
    }
  }
}

// 注销标签项
function unregisterPane(name: string | number) {
  const index = panes.value.findIndex(item => item.name === name)
  if (index > -1) {
    panes.value.splice(index, 1)

    // 如果关闭的是当前激活的标签，则激活其他标签
    if (activeTab.value === name && panes.value.length) {
      const nextTab = panes.value[index] || panes.value[index - 1]
      if (nextTab) {
        activeTab.value = nextTab.name
        emit('update:modelValue', nextTab.name)
        emit('tabChange', nextTab.name)
      }
    }
  }
}

// 激活标签
function setActiveTab(name: string | number, event?: MouseEvent) {
  if (activeTab.value !== name) {
    activeTab.value = name
    emit('update:modelValue', name)
    emit('tabChange', name)
  }

  // 如果提供了事件对象，则触发tab-click事件
  if (event) {
    const pane = panes.value.find(item => item.name === name)
    if (pane) {
      emit('tabClick', pane, event)
    }
  }
}

// 移除标签
function removeTab(name: string | number, event: MouseEvent) {
  event.stopPropagation()
  emit('tabRemove', name)
  emit('edit', name, 'remove')

  unregisterPane(name)
}

// 添加标签
function addTab() {
  emit('tabAdd')
  emit('edit', null, 'add')
}

// 监听modelValue变化
watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== null) {
    activeTab.value = val
  }
})

// 向外部提供方法
defineExpose({
  setActiveTab,
  addTab,
  removeTab,
})

// 向子组件提供上下文
provide('tabs', {
  activeTab,
  type: props.type,
  closable: props.closable,
  editable: props.editable,
  addable: props.addable,
  tabPosition: props.tabPosition,
  registerPane,
  unregisterPane,
  removeTab,
  setActiveTab,
})
</script>

<template>
  <div
    ref="tabsRoot"
    class="ui-tabs"
    :class="[
      `ui-tabs--${type}`,
      `ui-tabs--${size}`,
      `ui-tabs--${tabPosition}`,
      {
        'ui-tabs--centered': centered,
        'ui-tabs--stretch': stretch,
      },
    ]"
  >
    <!-- 标签栏 -->
    <div
      class="ui-tabs-nav-wrap"
      :class="[`ui-tabs-nav-wrap--${tabPosition}`]"
      :style="tabBarStyle"
    >
      <div class="ui-tabs-nav">
        <!-- 标签按钮 -->
        <div
          v-for="pane in panes"
          :key="pane.name"
          class="ui-tabs-tab"
          :class="{
            'ui-tabs-tab--active': activeTab === pane.name,
            'ui-tabs-tab--disabled': pane.disabled,
            [`ui-tabs-tab--${tabPosition}`]: true,
          }"
          :style="{ backgroundColor: activeTab === pane.name ? backgroundColor : '' }"
          @click="!pane.disabled && setActiveTab(pane.name, $event)"
        >
          <div class="ui-tabs-tab-label">
            <div v-if="pane.icon" class="ui-tabs-tab-icon">
              <ui-icon :icon="pane.icon" />
            </div>
            {{ pane.label }}
          </div>
          <ui-icon
            v-if="(closable || pane.closable) && !pane.disabled"
            icon="carbon:close"
            class="ui-tabs-tab-close"
            @click.stop="removeTab(pane.name, $event)"
          />
          <div
            v-if="type === 'line' && activeTab === pane.name"
            class="ui-tabs-active-bar"
            :class="[`ui-tabs-active-bar--${tabPosition}`]"
            :style="{ backgroundColor: activeBarColor }"
          />
        </div>

        <!-- 添加按钮 -->
        <div v-if="addable" class="ui-tabs-add-button" @click="addTab">
          <ui-icon icon="carbon:add" />
          <span v-if="addText" class="ui-tabs-add-text">{{ addText }}</span>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="ui-tabs-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ui-tabs {
  /* CSS变量已迁移到主题文件: assets/scss/themes/light.scss 和 dark.scss 中 */
  display: flex;
  width: 100%;
}

/* 标签位置样式 */
.ui-tabs--top {
  flex-direction: column;
}

.ui-tabs--bottom {
  flex-direction: column-reverse;
}

.ui-tabs--left {
  flex-direction: row;
}

.ui-tabs--right {
  flex-direction: row-reverse;
}

/* 标签导航包装 */
.ui-tabs-nav-wrap {
  position: relative;
  overflow: hidden;
}

.ui-tabs-nav-wrap--top,
.ui-tabs-nav-wrap--bottom {
  border-bottom: 1px solid var(--ui-tabs-border-color);
}

.ui-tabs-nav-wrap--left,
.ui-tabs-nav-wrap--right {
  border-right: 1px solid var(--ui-tabs-border-color);
}

/* 标签导航 */
.ui-tabs-nav {
  display: flex;
  position: relative;
}

.ui-tabs--top .ui-tabs-nav,
.ui-tabs--bottom .ui-tabs-nav {
  flex-direction: row;
}

.ui-tabs--left .ui-tabs-nav,
.ui-tabs--right .ui-tabs-nav {
  flex-direction: column;
}

/* 居中显示 */
.ui-tabs--centered .ui-tabs-nav {
  justify-content: center;
}

/* 拉伸标签 */
.ui-tabs--stretch .ui-tabs-nav {
  display: grid;
}

.ui-tabs--top.ui-tabs--stretch .ui-tabs-nav,
.ui-tabs--bottom.ui-tabs--stretch .ui-tabs-nav {
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}

.ui-tabs--left.ui-tabs--stretch .ui-tabs-nav,
.ui-tabs--right.ui-tabs--stretch .ui-tabs-nav {
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
}

/* 标签按钮 */
.ui-tabs-tab {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0 16px;
  transition:
    color 0.3s,
    background-color 0.3s;
  color: var(--ui-tabs-text-color);
}

.ui-tabs-tab--top,
.ui-tabs-tab--bottom {
  height: 40px;
}

.ui-tabs-tab--left,
.ui-tabs-tab--right {
  height: 36px;
  min-width: 100px;
}

/* 标签尺寸 */
.ui-tabs--small .ui-tabs-tab {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.ui-tabs--large .ui-tabs-tab {
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
}

/* 标签状态 */
.ui-tabs-tab--active {
  color: var(--ui-tabs-active-color);
  font-weight: 500;
}

.ui-tabs-tab:hover:not(.ui-tabs-tab--active):not(.ui-tabs-tab--disabled) {
  color: var(--ui-tabs-active-color);
  background-color: var(--ui-tabs-hover-color);
}

.ui-tabs-tab--disabled {
  color: var(--ui-tabs-disabled-color);
  cursor: not-allowed;
}

/* 标签标签 */
.ui-tabs-tab-label {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.ui-tabs-tab-icon {
  margin-right: 6px;
}

/* 关闭按钮 */
.ui-tabs-tab-close {
  margin-left: 6px;
  font-size: 12px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.ui-tabs-tab-close:hover {
  opacity: 1;
}

/* 添加按钮 */
.ui-tabs-add-button {
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.ui-tabs-add-button:hover {
  opacity: 1;
}

.ui-tabs-add-text {
  margin-left: 4px;
}

/* 活动指示条 */
.ui-tabs-active-bar {
  position: absolute;
  background-color: var(--ui-tabs-active-color);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ui-tabs-active-bar--top {
  height: 2px;
  width: 100%;
  bottom: 0;
  left: 0;
}

.ui-tabs-active-bar--bottom {
  height: 2px;
  width: 100%;
  top: 0;
  left: 0;
}

.ui-tabs-active-bar--left {
  width: 2px;
  height: 100%;
  right: 0;
  top: 0;
}

.ui-tabs-active-bar--right {
  width: 2px;
  height: 100%;
  left: 0;
  top: 0;
}

/* 卡片样式 */
.ui-tabs--card .ui-tabs-tab {
  border: 1px solid var(--ui-tabs-border-color);
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background-color: rgba(0, 0, 0, 0.02);
  margin-right: 2px;
}

.ui-tabs--card.ui-tabs--bottom .ui-tabs-tab {
  border: 1px solid var(--ui-tabs-border-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.ui-tabs--card .ui-tabs-tab--active {
  background-color: var(--ui-tabs-active-bg);
  border-bottom-color: var(--ui-tabs-active-bg);
  z-index: 1;
}

.ui-tabs--card.ui-tabs--bottom .ui-tabs-tab--active {
  border-top-color: var(--ui-tabs-active-bg);
}

/* 分段式样式 */
.ui-tabs--segment .ui-tabs-nav {
  background-color: var(--ui-tabs-hover-color);
  border-radius: 6px;
  padding: 3px;
}

.ui-tabs--segment .ui-tabs-tab {
  border-radius: 4px;
  margin: 0 1px;
}

.ui-tabs--segment .ui-tabs-tab--active {
  background-color: var(--ui-tabs-active-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 内容区域 */
.ui-tabs-content {
  padding: 16px 0;
  flex: 1;
}

.ui-tabs--left .ui-tabs-content,
.ui-tabs--right .ui-tabs-content {
  padding: 0 16px;
}
</style>
