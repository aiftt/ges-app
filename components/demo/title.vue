<script setup lang="ts" name="DemoTitle">
/**
 * 标题组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 标题样式类型
const titleTypes = [
  { label: '默认', value: 'default' },
  { label: '主要', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info' },
]

// 标题级别
const titleLevels = [1, 2, 3, 4, 5, 6]

// 字重选项
const fontWeights = [
  { label: '常规', value: 'normal' },
  { label: '中等', value: 'medium' },
  { label: '粗体', value: 'bold' },
]

// 渲染模式
const renderModes = [
  { label: '默认标签渲染', value: 'default' },
  { label: '语义标签渲染', value: 'semantic' },
]

// 示例文本
const titleText = '这是一个示例标题文本'
const longTitleText = '这是一个很长的标题文本，用于测试标题的省略显示效果和多行情况下的表现，长标题通常需要合理的控制和处理'
</script>

<template>
  <div class="space-y-10">
    <!-- 基础标题 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础标题
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        默认标题样式，展示不同级别的标题。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-title v-for="level in titleLevels" :key="level" :level="level">
            H{{ level }} 标题: {{ titleText }}
          </ui-title>
        </div>
      </div>
    </section>

    <!-- 标题类型 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题类型
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置type属性展示不同类型的标题。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-title v-for="type in titleTypes" :key="type.value" :level="2" :type="type.value">
            {{ type.label }}标题: {{ titleText }}
          </ui-title>
        </div>
      </div>
    </section>

    <!-- 字重设置 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        字重设置
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置weight属性调整标题字重。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-title v-for="weight in fontWeights" :key="weight.value" :level="3" :weight="weight.value">
            {{ weight.label }}字重标题: {{ titleText }}
          </ui-title>
        </div>
      </div>
    </section>

    <!-- 标题边距 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题边距
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置withMargin属性控制标题边距。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-6 border-b pb-6 space-y-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            有边距 (默认):
          </div>
          <ui-title :level="2" with-margin>
            {{ titleText }}
          </ui-title>
          <p>标题下方的文本内容将会有合理的间距。</p>
        </div>

        <div class="space-y-0">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            无边距:
          </div>
          <ui-title :level="2" :with-margin="false">
            {{ titleText }}
          </ui-title>
          <p>标题下方的文本内容将会紧密排布，没有额外间距。</p>
        </div>
      </div>
    </section>

    <!-- 标题对齐 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题对齐
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置align属性调整标题对齐方式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <ui-title :level="3" align="left">
            左对齐标题 (默认)
          </ui-title>

          <ui-title :level="3" align="center">
            居中对齐标题
          </ui-title>

          <ui-title :level="3" align="right">
            右对齐标题
          </ui-title>
        </div>
      </div>
    </section>

    <!-- 标题省略 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题省略
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置ellipsis属性实现标题文本截断。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              不省略:
            </div>
            <div class="max-w-md">
              <ui-title :level="3">
                {{ longTitleText }}
              </ui-title>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              单行省略:
            </div>
            <div class="max-w-md">
              <ui-title :level="3" ellipsis>
                {{ longTitleText }}
              </ui-title>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              可交互省略:
            </div>
            <div class="max-w-md">
              <ui-title :level="3" :ellipsis="{ expandable: true, symbol: '展开/收起' }">
                {{ longTitleText }}
              </ui-title>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 标题渲染模式 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题渲染模式
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置render属性控制标题的渲染方式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div v-for="mode in renderModes" :key="mode.value" class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ mode.label }}:
            </div>
            <ui-title :level="2" :render="mode.value">
              {{ titleText }}
            </ui-title>
          </div>
        </div>
      </div>
    </section>

    <!-- 标题与内容 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        标题与内容
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        标题与正文内容的排版组合。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-8">
          <div>
            <ui-title :level="2" type="primary">
              主要文章标题
            </ui-title>
            <ui-paragraph>
              这是一段文章的正文内容。标题和正文的搭配展示了基本的排版布局。良好的标题设计能够有效地吸引读者的注意力，并且引导阅读流程。
            </ui-paragraph>
          </div>

          <div>
            <ui-title :level="3" type="success">
              成功状态的小节标题
            </ui-title>
            <ui-paragraph>
              这是小节的正文内容。在文章的结构中，多级标题能够组织内容层次，使得整体结构更加清晰。
            </ui-paragraph>
            <ui-paragraph type="secondary">
              这是一段次要说明文字，用不同的样式区分主要内容和辅助内容，增强可读性。
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 高级用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        高级用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        标题组件的高级使用方式和组合效果。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-8">
          <div>
            <ui-title :level="2" type="primary">
              <span class="flex items-center">
                <ui-icon icon="carbon:document" class="mr-2 text-xl" />
                带图标的标题
              </span>
            </ui-title>
            <ui-paragraph>
              标题可以与图标组合使用，增强视觉效果和内容识别度。
            </ui-paragraph>
          </div>

          <div>
            <ui-title :level="3" type="warning" class="flex items-center justify-between">
              <span>带操作的标题</span>
              <ui-button size="small">
                操作按钮
              </ui-button>
            </ui-title>
            <ui-paragraph>
              标题区域可以集成操作按钮，方便用户直接在标题处进行相关操作。
            </ui-paragraph>
          </div>

          <div>
            <ui-title :level="4" mark type="danger">
              <span>标记样式标题</span>
            </ui-title>
            <ui-paragraph>
              标题可以使用标记样式，突出重要的标题内容。
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
