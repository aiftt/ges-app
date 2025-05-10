<script setup lang="ts" name="DemoTabs">
/**
 * 标签页组件演示
 * 创建日期: 2024-08-03
 * 作者: aiftt
 */

// 基础标签页当前激活标签
const activeTab = ref('1')

// 卡片式标签页当前激活标签
const activeCardTab = ref('1')

// 分段式标签页当前激活标签
const activeSegmentTab = ref('1')

// 可编辑标签页当前标签
const editableActiveTab = ref('1')

// 可编辑标签页列表
const editableTabs = ref([
  { name: '1', label: '标签 1', content: '标签页内容 1' },
  { name: '2', label: '标签 2', content: '标签页内容 2' },
])

// 标签计数器，用于添加标签
let tabIndex = 2

// 添加标签
function addTab() {
  tabIndex++
  const newTabName = String(tabIndex)

  editableTabs.value.push({
    name: newTabName,
    label: `新标签 ${tabIndex}`,
    content: `新标签内容 ${tabIndex}`,
  })

  editableActiveTab.value = newTabName
}

// 删除标签
function removeTab(targetName: string) {
  // 如果删除的不是当前激活标签，则无需切换
  if (editableActiveTab.value !== targetName) {
    const tabs = editableTabs.value
    const index = tabs.findIndex(tab => tab.name === targetName)
    tabs.splice(index, 1)
    return
  }

  // 删除的是当前激活标签，需要切换到其他标签
  const tabs = editableTabs.value
  const targetIndex = tabs.findIndex(tab => tab.name === targetName)

  // 确定切换方向
  let newActive = ''
  if (tabs.length === 1) {
    // 这是最后一个标签，不做处理
  }
  else if (targetIndex === 0) {
    // 如果是第一个，切换到第二个
    newActive = tabs[1].name
  }
  else {
    // 否则切换到前一个
    newActive = tabs[targetIndex - 1].name
  }

  // 删除标签
  tabs.splice(targetIndex, 1)
  editableActiveTab.value = newActive
}

// 位置选项
type TabPosition = 'top' | 'right' | 'bottom' | 'left'
const tabPosition = ref<TabPosition>('top')
const positions: TabPosition[] = ['top', 'right', 'bottom', 'left']

// 带图标的标签页当前标签
const iconTabActive = ref('1')
</script>

<template>
  <div class="demo-card">
    <h3 class="mb-4 text-lg font-bold">
      标签页 (Tabs)
    </h3>

    <div class="grid grid-cols-1 gap-6">
      <!-- 基础标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          基础标签页
        </h4>
        <ui-tabs v-model="activeTab">
          <ui-tabs-pane name="1" label="标签页一">
            <div class="border rounded p-4">
              <p>标签页一的内容</p>
              <p class="mt-2">
                这是第一个标签页的内容区域
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="标签页二">
            <div class="border rounded p-4">
              <p>标签页二的内容</p>
              <p class="mt-2">
                这是第二个标签页的内容区域
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="标签页三">
            <div class="border rounded p-4">
              <p>标签页三的内容</p>
              <p class="mt-2">
                这是第三个标签页的内容区域
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 卡片式标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          卡片式标签页
        </h4>
        <ui-tabs v-model="activeCardTab" type="card">
          <ui-tabs-pane name="1" label="卡片标签一">
            <div class="border rounded p-4">
              <p>卡片标签一的内容</p>
              <p class="mt-2">
                这是使用卡片样式的标签页
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="卡片标签二">
            <div class="border rounded p-4">
              <p>卡片标签二的内容</p>
              <p class="mt-2">
                卡片样式更加突出
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="卡片标签三">
            <div class="border rounded p-4">
              <p>卡片标签三的内容</p>
              <p class="mt-2">
                适合需要分组的内容展示
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 分段式标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          分段式标签页
        </h4>
        <ui-tabs v-model="activeSegmentTab" type="segment">
          <ui-tabs-pane name="1" label="选项一">
            <div class="border rounded p-4">
              <p>选项一内容</p>
              <p class="mt-2">
                分段式标签页适合作为视图切换器
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="选项二">
            <div class="border rounded p-4">
              <p>选项二内容</p>
              <p class="mt-2">
                分段式样式更加紧凑
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="选项三">
            <div class="border rounded p-4">
              <p>选项三内容</p>
              <p class="mt-2">
                适合作为二级导航
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 不同位置的标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          标签位置
        </h4>
        <div class="mb-4">
          <span class="mr-2">标签位置：</span>
          <div class="inline-flex overflow-hidden border rounded">
            <button
              v-for="pos in positions"
              :key="pos"
              class="px-3 py-1"
              :class="{ 'bg-blue-500 text-white': tabPosition === pos, 'hover:bg-gray-100': tabPosition !== pos }"
              @click="tabPosition = pos"
            >
              {{ pos }}
            </button>
          </div>
        </div>

        <ui-tabs v-model="activeTab" :tab-position="tabPosition">
          <ui-tabs-pane name="1" label="标签页一">
            <div class="border rounded p-4">
              <p>标签页一的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="标签页二">
            <div class="border rounded p-4">
              <p>标签页二的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="标签页三">
            <div class="border rounded p-4">
              <p>标签页三的内容</p>
              <p class="mt-2">
                当前位置：{{ tabPosition }}
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 可关闭与新增标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          可编辑标签页
        </h4>
        <ui-tabs
          v-model="editableActiveTab"
          type="card"
          closable
          addable
          add-text="添加标签"
          @tab-add="addTab"
          @tab-remove="removeTab"
        >
          <ui-tabs-pane
            v-for="item in editableTabs"
            :key="item.name"
            :name="item.name"
            :label="item.label"
          >
            <div class="border rounded p-4">
              <p>{{ item.content }}</p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 带图标的标签页 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          带图标的标签页
        </h4>
        <ui-tabs v-model="iconTabActive">
          <ui-tabs-pane name="1" label="个人信息" icon="carbon:user-avatar">
            <div class="border rounded p-4">
              <p>个人信息内容</p>
              <p class="mt-2">
                这里展示用户的个人资料
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="安全设置" icon="carbon:security">
            <div class="border rounded p-4">
              <p>安全设置内容</p>
              <p class="mt-2">
                这里展示用户的安全相关设置
              </p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="消息通知" icon="carbon:notification">
            <div class="border rounded p-4">
              <p>消息通知内容</p>
              <p class="mt-2">
                这里展示用户的消息设置
              </p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 禁用状态 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          禁用状态
        </h4>
        <ui-tabs v-model="activeTab">
          <ui-tabs-pane name="1" label="可用标签">
            <div class="border rounded p-4">
              <p>可用标签的内容</p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="2" label="禁用标签" disabled>
            <div class="border rounded p-4">
              <p>这个内容不会显示，因为标签被禁用了</p>
            </div>
          </ui-tabs-pane>
          <ui-tabs-pane name="3" label="可用标签">
            <div class="border rounded p-4">
              <p>另一个可用标签的内容</p>
            </div>
          </ui-tabs-pane>
        </ui-tabs>
      </div>

      <!-- 不同尺寸 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-4 text-base font-medium">
          不同尺寸
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              小尺寸：
            </p>
            <ui-tabs v-model="activeTab" size="small">
              <ui-tabs-pane name="1" label="标签一">
                <div class="border rounded p-2">
                  <p>小尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
              <ui-tabs-pane name="2" label="标签二">
                <div class="border rounded p-2">
                  <p>小尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
            </ui-tabs>
          </div>

          <div>
            <p class="mb-2 text-sm">
              默认尺寸：
            </p>
            <ui-tabs v-model="activeTab">
              <ui-tabs-pane name="1" label="标签一">
                <div class="border rounded p-2">
                  <p>默认尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
              <ui-tabs-pane name="2" label="标签二">
                <div class="border rounded p-2">
                  <p>默认尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
            </ui-tabs>
          </div>

          <div>
            <p class="mb-2 text-sm">
              大尺寸：
            </p>
            <ui-tabs v-model="activeTab" size="large">
              <ui-tabs-pane name="1" label="标签一">
                <div class="border rounded p-2">
                  <p>大尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
              <ui-tabs-pane name="2" label="标签二">
                <div class="border rounded p-2">
                  <p>大尺寸标签内容</p>
                </div>
              </ui-tabs-pane>
            </ui-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
