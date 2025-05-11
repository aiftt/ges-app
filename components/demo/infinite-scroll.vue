<script setup lang="ts" name="DemoInfiniteScroll">
/**
 * InfiniteScroll 无限滚动组件演示
 * 创建日期: 2024-09-01
 * 作者: aiftt
 * 更新日期: 2024-09-01 - 首次实现
 * 更新日期: 2024-09-02 - 添加虚拟滚动功能演示
 */

import { onMounted, ref } from 'vue'

// 模拟数据项接口
interface IListItem {
  id: number
  title: string
  content: string
}

// 列表数据
const dataList = ref<IListItem[]>([])
// 加载状态
const loading = ref(false)
// 是否还有更多数据
const noMore = ref(false)
// 是否出错
const error = ref(false)
// 当前页码
const currentPage = ref(1)
// 每页数量
const pageSize = ref(10)
// 总页数 (模拟)
const totalPages = 5

// 水平方向滚动数据
const horizontalList = ref<number[]>([])
// 水平滚动加载状态
const horizontalLoading = ref(false)
// 水平方向无更多数据
const horizontalNoMore = ref(false)

// 自定义容器数据
const containerList = ref<IListItem[]>([])
// 自定义容器加载状态
const containerLoading = ref(false)
// 自定义容器无更多数据
const containerNoMore = ref(false)

// 虚拟滚动数据 - 模拟大量数据场景
const virtualScrollData = ref<IListItem[]>([])
const virtualScrollLoading = ref(false)
const virtualScrollNoMore = ref(false)
const virtualScrollPage = ref(1)
const virtualScrollTotalPages = 20 // 模拟大量数据

// 加载更多数据
function loadMoreData() {
  if (loading.value || noMore.value)
    return

  loading.value = true

  // 模拟网络请求延迟
  setTimeout(() => {
    if (currentPage.value <= totalPages) {
      // 模拟数据
      const newItems: IListItem[] = Array.from({ length: pageSize.value }, (_, index) => {
        const itemIndex = (currentPage.value - 1) * pageSize.value + index + 1
        return {
          id: itemIndex,
          title: `项目 ${itemIndex}`,
          content: `这是项目 ${itemIndex} 的详细内容描述。这是一段示例文字，用于展示无限滚动加载的效果。`,
        }
      })

      // 添加到列表
      dataList.value = [...dataList.value, ...newItems]
      currentPage.value++

      // 检查是否还有更多数据
      if (currentPage.value > totalPages) {
        noMore.value = true
      }
    }
    else {
      noMore.value = true
    }

    loading.value = false
  }, 1000)
}

// 模拟错误
function simulateError() {
  error.value = true
  loading.value = false
}

// 重试加载
function retryLoading() {
  error.value = false
  loadMoreData()
}

// 重置数据
function resetData() {
  dataList.value = []
  currentPage.value = 1
  noMore.value = false
  error.value = false

  // 初始加载
  loadMoreData()
}

// 加载水平滚动数据
function loadHorizontalData() {
  if (horizontalLoading.value || horizontalNoMore.value)
    return

  horizontalLoading.value = true

  setTimeout(() => {
    const currentCount = horizontalList.value.length
    if (currentCount < 100) {
      const newItems = Array.from({ length: 10 }, (_, index) => currentCount + index + 1)
      horizontalList.value = [...horizontalList.value, ...newItems]

      if (horizontalList.value.length >= 100) {
        horizontalNoMore.value = true
      }
    }
    else {
      horizontalNoMore.value = true
    }

    horizontalLoading.value = false
  }, 800)
}

// 加载自定义容器数据
function loadContainerData() {
  if (containerLoading.value || containerNoMore.value)
    return

  containerLoading.value = true

  setTimeout(() => {
    const currentCount = containerList.value.length
    if (currentCount < 30) {
      const newItems: IListItem[] = Array.from({ length: 5 }, (_, index) => {
        const itemIndex = currentCount + index + 1
        return {
          id: itemIndex,
          title: `固定容器项目 ${itemIndex}`,
          content: `这是固定容器中的项目 ${itemIndex}。`,
        }
      })

      containerList.value = [...containerList.value, ...newItems]

      if (containerList.value.length >= 30) {
        containerNoMore.value = true
      }
    }
    else {
      containerNoMore.value = true
    }

    containerLoading.value = false
  }, 800)
}

// 加载虚拟滚动数据
function loadVirtualScrollData() {
  if (virtualScrollLoading.value || virtualScrollNoMore.value)
    return

  virtualScrollLoading.value = true

  // 模拟网络请求延迟
  setTimeout(() => {
    if (virtualScrollPage.value <= virtualScrollTotalPages) {
      // 模拟数据 - 每次加载100条数据
      const newItems: IListItem[] = Array.from({ length: 100 }, (_, index) => {
        const itemIndex = (virtualScrollPage.value - 1) * 100 + index + 1
        return {
          id: itemIndex,
          title: `虚拟滚动项目 ${itemIndex}`,
          content: `这是虚拟滚动项目 ${itemIndex} 的内容。虚拟滚动技术允许高效渲染大量数据，无需创建所有DOM元素。`,
        }
      })

      // 添加到列表
      virtualScrollData.value = [...virtualScrollData.value, ...newItems]
      virtualScrollPage.value++

      // 检查是否还有更多数据
      if (virtualScrollPage.value > virtualScrollTotalPages) {
        virtualScrollNoMore.value = true
      }
    }
    else {
      virtualScrollNoMore.value = true
    }

    virtualScrollLoading.value = false
  }, 600)
}

// 组件挂载时初始化数据
onMounted(() => {
  // 初始加载数据
  loadMoreData()
  loadHorizontalData()
  loadContainerData()
  loadVirtualScrollData() // 初始加载虚拟滚动数据
})
</script>

<template>
  <div class="space-y-10">
    <!-- 基础用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        滚动到底部时自动加载更多数据。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4 flex justify-end">
          <ui-button type="primary" size="small" @click="resetData">
            重置数据
          </ui-button>
          <ui-button type="danger" size="small" class="ml-2" :disabled="error" @click="simulateError">
            模拟错误
          </ui-button>
        </div>

        <ui-infinite-scroll
          :loading="loading"
          :no-more="noMore"
          :error="error"
          @load="loadMoreData"
          @retry="retryLoading"
        >
          <div class="space-y-4">
            <div v-for="item in dataList" :key="item.id" class="border rounded p-4">
              <h4 class="mb-2 font-semibold">
                {{ item.title }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {{ item.content }}
              </p>
            </div>
          </div>
        </ui-infinite-scroll>
      </div>
    </section>

    <!-- 水平方向滚动 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        水平方向滚动
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持水平方向的无限滚动加载。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="overflow-x-auto" style="max-width: 100%">
          <ui-infinite-scroll
            :loading="horizontalLoading"
            :no-more="horizontalNoMore"
            direction="top"
            @load="loadHorizontalData"
          >
            <div class="flex pb-4 space-x-4">
              <div
                v-for="item in horizontalList"
                :key="item"
                class="h-40 w-40 flex flex-shrink-0 items-center justify-center border rounded bg-primary-50 dark:bg-gray-700"
              >
                项目 {{ item }}
              </div>
            </div>

            <!-- 自定义加载指示器 -->
            <template #loading>
              <div class="flex items-center justify-center">
                <ui-icon icon="carbon:renew" class="mr-2 animate-spin" />
                <span>加载中...</span>
              </div>
            </template>
          </ui-infinite-scroll>
        </div>
      </div>
    </section>

    <!-- 自定义容器 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义滚动容器
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以指定自定义的滚动容器。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div id="custom-scroll-container" class="h-80 overflow-y-auto border rounded">
          <ui-infinite-scroll
            :loading="containerLoading"
            :no-more="containerNoMore"
            target="#custom-scroll-container"
            @load="loadContainerData"
          >
            <div class="p-4 space-y-4">
              <div v-for="item in containerList" :key="item.id" class="border rounded p-4">
                <h4 class="mb-2 font-semibold">
                  {{ item.title }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </ui-infinite-scroll>
        </div>
      </div>
    </section>

    <!-- 自定义加载和空状态 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        自定义提示内容
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以自定义加载中、无更多数据和错误状态的提示内容。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-infinite-scroll
          :loading="loading"
          :no-more="noMore"
          :error="error"
          loading-text="正在为您加载更多数据..."
          no-more-text="已经到底啦，没有更多内容了"
          error-text="加载失败，请点击重试"
          @load="loadMoreData"
          @retry="retryLoading"
        >
          <div class="space-y-4">
            <div v-for="item in dataList.slice(0, 3)" :key="item.id" class="border rounded p-4">
              <h4 class="mb-2 font-semibold">
                {{ item.title }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {{ item.content }}
              </p>
            </div>
          </div>

          <!-- 自定义无更多数据状态 -->
          <template #no-more>
            <div class="flex items-center justify-center text-gray-500">
              <ui-icon icon="carbon:checkmark" class="mr-2" />
              <span>所有内容已加载完毕</span>
            </div>
          </template>

          <!-- 自定义错误状态 -->
          <template #error>
            <div class="flex cursor-pointer items-center justify-center text-red-500" @click="retryLoading">
              <ui-icon icon="carbon:warning" class="mr-2" />
              <span>出错了，点击重试</span>
            </div>
          </template>
        </ui-infinite-scroll>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        禁用状态
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以禁用无限滚动功能。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="mb-4 flex justify-between">
          <ui-button type="primary" size="small" :disabled="loading || noMore" @click="loadMoreData">
            {{ loading ? '加载中...' : '手动加载更多' }}
          </ui-button>
        </div>

        <ui-infinite-scroll
          :loading="loading"
          :no-more="noMore"
          disabled
          @load="loadMoreData"
        >
          <template #default>
            <div class="space-y-4">
              <div v-for="item in dataList.slice(0, 5)" :key="item.id" class="border rounded p-4">
                <h4 class="mb-2 font-semibold">
                  {{ item.title }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ item.content }}
                </p>
              </div>
            </div>
            <div class="text-center text-gray-500">
              <span>无限滚动已禁用，请点击上方按钮加载更多</span>
            </div>
          </template>
        </ui-infinite-scroll>
      </div>
    </section>

    <!-- 添加虚拟滚动演示部分 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        虚拟滚动
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        使用虚拟滚动技术高效渲染大量数据，同时支持无限加载。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-infinite-scroll
          :loading="virtualScrollLoading"
          :no-more="virtualScrollNoMore"
          virtual-scroll
          :item-height="80"
          :buffer="5"
          height="400px"
          @load="loadVirtualScrollData"
        >
          <div class="space-y-2">
            <template v-for="item in virtualScrollData" :key="item.id">
              <div class="border rounded p-3">
                <h4 class="font-semibold">
                  {{ item.title }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ item.content }}
                </p>
              </div>
            </template>
          </div>

          <template #empty>
            <div class="py-8 text-center text-gray-500">
              <ui-icon icon="carbon:document" class="mb-2 text-4xl" />
              <p>暂无数据</p>
            </div>
          </template>

          <template #loading>
            <div class="flex items-center justify-center py-4">
              <ui-icon icon="carbon:renew" class="mr-2 animate-spin" />
              <span>加载更多数据中...</span>
            </div>
          </template>

          <template #complete>
            <div class="py-4 text-center text-gray-500">
              已加载全部数据（共 {{ virtualScrollData.length }} 条）
            </div>
          </template>
        </ui-infinite-scroll>
      </div>
    </section>

    <!-- 性能对比演示 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        虚拟滚动性能说明
      </h3>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <p class="mb-2 text-gray-600 dark:text-gray-400">
          上面的演示加载了 {{ virtualScrollData.length }} 条数据，但实际只渲染了可见区域的少量DOM元素。
        </p>
        <p class="mb-2 text-gray-600 dark:text-gray-400">
          传统方法会渲染所有 {{ virtualScrollData.length }} 个DOM元素，而虚拟滚动只渲染可见区域和缓冲区的元素，大幅提升性能。
        </p>
        <div class="mt-4 rounded bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          <div class="flex items-start">
            <ui-icon icon="carbon:information" class="mr-2 mt-1 flex-shrink-0" />
            <div>
              <p class="font-medium">
                性能优势：
              </p>
              <ul class="ml-2 mt-1 list-disc list-inside space-y-1">
                <li>减少内存占用和DOM节点数量</li>
                <li>提高滚动性能，避免卡顿</li>
                <li>支持渲染超大数据集（甚至10万+条数据）</li>
                <li>保持相同的用户体验和功能</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
