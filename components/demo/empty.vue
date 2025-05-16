<script setup lang="ts" name="DemoEmpty">
/**
 * 空状态组件演示
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 自定义图片
const customImage = 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'

// 模拟列表数据
const hasData = ref(false)
const tableData = ref(hasData.value
  ? [
      { id: 1, name: '项目1', status: '已完成' },
      { id: 2, name: '项目2', status: '进行中' },
    ]
  : [])

// 切换数据状态
function toggleData() {
  hasData.value = !hasData.value
  tableData.value = hasData.value
    ? [
        { id: 1, name: '项目1', status: '已完成' },
        { id: 2, name: '项目2', status: '进行中' },
      ]
    : []
}

// 示例代码
const basicCode = `<ui-empty />`

const customDescCode = `<ui-empty description="没有找到任何结果" />`

const customIconCode = `<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <div class="flex flex-col items-center">
    <ui-empty
      icon="carbon:search"
      description="没有搜索结果"
      icon-size="40px"
      icon-color="#10b981"
    />
  </div>
  <div class="flex flex-col items-center">
    <ui-empty
      icon="carbon:folder"
      description="文件夹为空"
      icon-size="40px"
      icon-color="#f59e0b"
    />
  </div>
  <div class="flex flex-col items-center">
    <ui-empty
      icon="carbon:warning"
      description="找不到数据"
      icon-size="40px"
      icon-color="#ef4444"
    />
  </div>
</div>`

const customImageCode = `<script setup>
// 自定义图片
const customImage = 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
<\/script>

<template>
  <ui-empty
    :image="customImage"
    description="暂无数据，请稍后再试"
    image-size="120px"
  />
</template>`

const extraContentCode = `<ui-empty description="暂无数据">
  <ui-button type="primary" size="small" class="mt-4">
    创建数据
  </ui-button>
</ui-empty>`

const applicationCode = `<script setup>
import { ref } from 'vue'

// 模拟列表数据
const hasData = ref(false)
const tableData = ref(hasData.value
  ? [
      { id: 1, name: '项目1', status: '已完成' },
      { id: 2, name: '项目2', status: '进行中' },
    ]
  : [])

// 切换数据状态
function toggleData() {
  hasData.value = !hasData.value
  tableData.value = hasData.value
    ? [
        { id: 1, name: '项目1', status: '已完成' },
        { id: 2, name: '项目2', status: '进行中' },
      ]
    : []
}
<\/script>

<template>
  <div>
    <div class="mb-4 flex justify-end">
      <ui-button size="small" @click="toggleData">
        {{ hasData ? '清空数据' : '加载数据' }}
      </ui-button>
    </div>
    <div class="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-800">
            <th class="px-4 py-3 text-left text-gray-500 dark:text-gray-400 font-medium">
              ID
            </th>
            <th class="px-4 py-3 text-left text-gray-500 dark:text-gray-400 font-medium">
              名称
            </th>
            <th class="px-4 py-3 text-left text-gray-500 dark:text-gray-400 font-medium">
              状态
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length">
            <tr v-for="item in tableData" :key="item.id" class="border-t border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                {{ item.id }}
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                {{ item.name }}
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                {{ item.status }}
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3" class="p-8">
              <ui-empty
                icon="carbon:data-table"
                description="暂无表格数据"
              >
                <ui-button type="primary" size="small" @click="toggleData">
                  加载数据
                </ui-button>
              </ui-empty>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Empty 空状态
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      Empty 空状态组件用于在页面没有数据时提供反馈，常用于列表、表格、搜索结果等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的空状态组件，默认显示一个空文档图标和“暂无数据”文字。"
      :code="basicCode"
    >
      <ui-empty />
    </ui-demo>

    <!-- 自定义描述文字 -->
    <ui-demo
      title="自定义描述文字"
      description="自定义描述文字，可根据具体场景提供更精确的提示信息。"
      :code="customDescCode"
    >
      <ui-empty description="没有找到任何结果" />
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="使用不同的图标和颜色来表达不同的空状态场景。"
      :code="customIconCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="flex flex-col items-center">
          <ui-empty
            icon="carbon:search"
            description="没有搜索结果"
            icon-size="40px"
            icon-color="#10b981"
          />
        </div>
        <div class="flex flex-col items-center">
          <ui-empty
            icon="carbon:folder"
            description="文件夹为空"
            icon-size="40px"
            icon-color="#f59e0b"
          />
        </div>
        <div class="flex flex-col items-center">
          <ui-empty
            icon="carbon:warning"
            description="找不到数据"
            icon-size="40px"
            icon-color="#ef4444"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义图片 -->
    <ui-demo
      title="自定义图片"
      description="使用自定义图片代替默认图标，可提供更丰富的视觉表现。"
      :code="customImageCode"
    >
      <ui-empty
        :image="customImage"
        description="暂无数据，请稍后再试"
        image-size="120px"
      />
    </ui-demo>

    <!-- 额外内容 -->
    <ui-demo
      title="额外内容"
      description="在空状态下可以添加额外的操作按钮或提示信息。"
      :code="extraContentCode"
    >
      <ui-empty description="暂无数据">
        <ui-button type="primary" size="small" class="mt-4">
          创建数据
        </ui-button>
      </ui-empty>
    </ui-demo>

    <!-- 实际应用场景 -->
    <ui-demo
      title="实际应用场景"
      description="在表格、列表等数据容器中使用空状态组件，提供良好的用户体验。"
      :code="applicationCode"
    >
      <div>
        <div class="mb-4 flex justify-end">
          <ui-button size="small" @click="toggleData">
            {{ hasData ? '清空数据' : '加载数据' }}
          </ui-button>
        </div>
        <div class="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-800">
                <th class="px-4 py-3 text-left text-gray-500 font-medium dark:text-gray-400">
                  ID
                </th>
                <th class="px-4 py-3 text-left text-gray-500 font-medium dark:text-gray-400">
                  名称
                </th>
                <th class="px-4 py-3 text-left text-gray-500 font-medium dark:text-gray-400">
                  状态
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData.length">
                <tr v-for="item in tableData" :key="item.id" class="border-t border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {{ item.id }}
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {{ item.name }}
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {{ item.status }}
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="3" class="p-8">
                  <ui-empty
                    icon="carbon:data-table"
                    description="暂无表格数据"
                  >
                    <ui-button type="primary" size="small" @click="toggleData">
                      加载数据
                    </ui-button>
                  </ui-empty>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Empty 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            description
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '暂无数据'
          </td>
          <td class="px-4 py-2">
            自定义描述文字
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            icon
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'carbon:document'
          </td>
          <td class="px-4 py-2">
            自定义图标名称
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            icon-size
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            '48px'
          </td>
          <td class="px-4 py-2">
            图标大小
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            icon-color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            图标颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            image
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义图片地址，设置后将覆盖图标
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            image-size
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            '80px'
          </td>
          <td class="px-4 py-2">
            图片大小
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Empty 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            default
          </td>
          <td class="px-4 py-2">
            额外内容，显示在描述文字下方
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            image
          </td>
          <td class="px-4 py-2">
            自定义图片区域内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            description
          </td>
          <td class="px-4 py-2">
            自定义描述文字
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
