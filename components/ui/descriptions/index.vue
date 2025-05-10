<script setup lang="ts" name="UiDescriptions">
/**
 * Descriptions 描述列表组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-08-01 - 修复渲染逻辑，增强span属性支持
 */

const props = withDefaults(defineProps<{
  /**
   * 标题
   */
  title?: string
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 一行的 Descriptions Item 数量
   */
  column?: number | Record<string, number>
  /**
   * 排列方向
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * 尺寸大小
   */
  size?: 'default' | 'small' | 'large'
  /**
   * 是否显示冒号
   */
  colon?: boolean
  /**
   * 自定义标签样式
   */
  labelStyle?: Record<string, string>
  /**
   * 自定义内容样式
   */
  contentStyle?: Record<string, string>
  /**
   * 标签对齐方式
   */
  labelAlign?: 'left' | 'right' | 'center'
  /**
   * 内容对齐方式
   */
  contentAlign?: 'left' | 'right' | 'center'
}>(), {
  bordered: false,
  column: 3,
  layout: 'horizontal',
  size: 'default',
  colon: true,
  labelAlign: 'left',
  contentAlign: 'left',
})

// 注入Descriptions上下文
provide('descriptions', {
  bordered: props.bordered,
  layout: props.layout,
  colon: props.colon,
  column: props.column,
  labelStyle: props.labelStyle,
  contentStyle: props.contentStyle,
  labelAlign: props.labelAlign,
  contentAlign: props.contentAlign,
})

// 计算CSS类
const descriptionClasses = computed(() => {
  return [
    'ui-descriptions',
    `ui-descriptions--${props.size}`,
    `ui-descriptions--${props.layout}`,
    {
      'ui-descriptions--bordered': props.bordered,
    },
  ]
})

// 获取所有的描述项
const items = useSlots().default?.() || []

// 计算实际列数
const actualColumn = computed(() => {
  if (typeof props.column === 'number') {
    return props.column
  }
  // 默认返回基础列数
  return 3
})

// 处理span属性，生成行数据
const rows = computed(() => {
  const result = []
  let currentRow = []
  let currentColSpan = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const span = item.props?.span || 1
    const normalizedSpan = Math.min(span, actualColumn.value)

    // 如果当前行已满，创建新行
    if (currentColSpan + normalizedSpan > actualColumn.value) {
      result.push([...currentRow])
      currentRow = []
      currentColSpan = 0
    }

    // 添加到当前行
    currentRow.push({
      item,
      span: normalizedSpan,
      index: i,
    })
    currentColSpan += normalizedSpan

    // 如果正好填满一行，创建新行
    if (currentColSpan === actualColumn.value) {
      result.push([...currentRow])
      currentRow = []
      currentColSpan = 0
    }
  }

  // 处理最后一行
  if (currentRow.length > 0) {
    result.push(currentRow)
  }

  return result
})
</script>

<template>
  <div :class="descriptionClasses">
    <!-- 标题 -->
    <div v-if="title || $slots.title" class="ui-descriptions-header">
      <div class="ui-descriptions-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div v-if="$slots.extra" class="ui-descriptions-extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- 正文 -->
    <div class="ui-descriptions-view">
      <table>
        <tbody>
          <!-- 水平布局 -->
          <template v-if="layout === 'horizontal'">
            <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
              <template v-for="{ item, span, index } in row" :key="`item-${index}`">
                <th
                  class="ui-descriptions-item-label"
                  :class="{
                    'ui-descriptions-item-colon': colon,
                    [`ui-descriptions-item-label-align-${labelAlign}`]: true,
                  }"
                  :style="labelStyle"
                  :colspan="span"
                >
                  <slot
                    :name="`label-${index}`"
                    v-bind="item.props"
                  >
                    {{ item.props?.label }}
                  </slot>
                </th>
                <td
                  class="ui-descriptions-item-content"
                  :class="{
                    [`ui-descriptions-item-content-align-${contentAlign}`]: true,
                  }"
                  :style="contentStyle"
                  :colspan="span"
                >
                  <slot
                    :name="`content-${index}`"
                    v-bind="item.props"
                  >
                    <component :is="item" />
                  </slot>
                </td>
              </template>
            </tr>
          </template>

          <!-- 垂直布局 -->
          <template v-else>
            <template v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
              <tr>
                <template v-for="{ item, span, index } in row" :key="`label-${index}`">
                  <th
                    class="ui-descriptions-item-label"
                    :class="{
                      'ui-descriptions-item-colon': colon,
                      [`ui-descriptions-item-label-align-${labelAlign}`]: true,
                    }"
                    :style="labelStyle"
                    :colspan="span"
                  >
                    <slot
                      :name="`label-${index}`"
                      v-bind="item.props"
                    >
                      {{ item.props?.label }}
                    </slot>
                  </th>
                </template>
              </tr>
              <tr>
                <template v-for="{ item, span, index } in row" :key="`content-${index}`">
                  <td
                    class="ui-descriptions-item-content"
                    :class="{
                      [`ui-descriptions-item-content-align-${contentAlign}`]: true,
                    }"
                    :style="contentStyle"
                    :colspan="span"
                  >
                    <slot
                      :name="`content-${index}`"
                      v-bind="item.props"
                    >
                      <component :is="item" />
                    </slot>
                  </td>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ui-descriptions {
  --ui-descriptions-bg-color: #ffffff;
  --ui-descriptions-border-color: #e5e7eb;
  --ui-descriptions-title-color: #111827;
  --ui-descriptions-text-color: #374151;
  --ui-descriptions-label-bg-color: #f9fafb;

  display: block;
  width: 100%;
  color: var(--ui-descriptions-text-color);
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--ui-descriptions-bg-color);
}

.ui-descriptions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.ui-descriptions-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--ui-descriptions-title-color);
}

.ui-descriptions-view {
  width: 100%;
}

.ui-descriptions-view table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.ui-descriptions--bordered .ui-descriptions-view table {
  border: 1px solid var(--ui-descriptions-border-color);
}

.ui-descriptions--bordered .ui-descriptions-item-label,
.ui-descriptions--bordered .ui-descriptions-item-content {
  padding: 12px 16px;
  border: 1px solid var(--ui-descriptions-border-color);
}

.ui-descriptions--bordered .ui-descriptions-item-label {
  background-color: var(--ui-descriptions-label-bg-color);
  font-weight: normal;
}

.ui-descriptions-item-label,
.ui-descriptions-item-content {
  padding: 8px 0;
  text-align: left;
  font-size: 14px;
}

.ui-descriptions-item-label {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-descriptions-item-colon::after {
  content: ':';
  margin: 0 8px 0 2px;
}

.ui-descriptions-item-label-align-left {
  text-align: left;
}

.ui-descriptions-item-label-align-right {
  text-align: right;
}

.ui-descriptions-item-label-align-center {
  text-align: center;
}

.ui-descriptions-item-content-align-left {
  text-align: left;
}

.ui-descriptions-item-content-align-right {
  text-align: right;
}

.ui-descriptions-item-content-align-center {
  text-align: center;
}

/* 尺寸变体 */
.ui-descriptions--small .ui-descriptions-item-label,
.ui-descriptions--small .ui-descriptions-item-content {
  padding: 4px 8px;
  font-size: 12px;
}

.ui-descriptions--large .ui-descriptions-item-label,
.ui-descriptions--large .ui-descriptions-item-content {
  padding: 16px 24px;
  font-size: 16px;
}

/* 深色模式 */
:root.dark .ui-descriptions {
  --ui-descriptions-bg-color: #1f2937;
  --ui-descriptions-border-color: #374151;
  --ui-descriptions-title-color: #f9fafb;
  --ui-descriptions-text-color: #e5e7eb;
  --ui-descriptions-label-bg-color: #111827;
}
</style>
