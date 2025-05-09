<script setup lang="ts">
/**
 * 空状态组件演示
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
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
</script>

<template>
  <div>
    <h2 class="mb-6 text-xl font-bold">
      Empty 空状态
    </h2>

    <!-- 基础用法 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-empty />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        基础的空状态组件，默认显示一个空文档图标和"暂无数据"文字。
      </p>
    </section>

    <!-- 自定义描述文字 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义描述文字
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-empty description="没有找到任何结果" />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        自定义描述文字，可根据具体场景提供更精确的提示信息。
      </p>
    </section>

    <!-- 自定义图标 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义图标
      </h3>
      <div class="grid grid-cols-1 gap-6 border border-gray-200 rounded-lg p-6 md:grid-cols-3">
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
      <p class="mt-2 text-sm text-gray-600">
        使用不同的图标和颜色来表达不同的空状态场景。
      </p>
    </section>

    <!-- 自定义图片 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义图片
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-empty
          :image="customImage"
          description="暂无数据，请稍后再试"
          image-size="120px"
        />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        使用自定义图片代替默认图标，可提供更丰富的视觉表现。
      </p>
    </section>

    <!-- 额外内容 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        额外内容
      </h3>
      <div class="border border-gray-200 rounded-lg p-6">
        <ui-empty description="暂无数据">
          <ui-button type="primary" size="small" class="mt-4">
            创建数据
          </ui-button>
        </ui-empty>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        在空状态下可以添加额外的操作按钮或提示信息。
      </p>
    </section>

    <!-- 实际应用场景 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        实际应用场景
      </h3>
      <div class="mb-4 flex justify-end">
        <ui-button size="small" @click="toggleData">
          {{ hasData ? '清空数据' : '加载数据' }}
        </ui-button>
      </div>
      <div class="overflow-hidden border border-gray-200 rounded-lg">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-gray-500 font-medium">
                ID
              </th>
              <th class="px-4 py-3 text-left text-gray-500 font-medium">
                名称
              </th>
              <th class="px-4 py-3 text-left text-gray-500 font-medium">
                状态
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableData.length">
              <tr v-for="item in tableData" :key="item.id" class="border-t border-gray-200">
                <td class="px-4 py-3 text-gray-600">
                  {{ item.id }}
                </td>
                <td class="px-4 py-3 text-gray-600">
                  {{ item.name }}
                </td>
                <td class="px-4 py-3 text-gray-600">
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
      <p class="mt-2 text-sm text-gray-600">
        在表格、列表等数据容器中使用空状态组件，提供良好的用户体验。
      </p>
    </section>
  </div>
</template>
