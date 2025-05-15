<script setup lang="ts" name="DemoUpload">
import type { IUploadFile } from '~/types/common'
/**
 * Upload上传组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 文件列表
const fileList = ref<IUploadFile[]>([])
const fileListPicture = ref<IUploadFile[]>([])
const fileListCard = ref<IUploadFile[]>([])
const fileListDrag = ref<IUploadFile[]>([])
const fileListManual = ref<IUploadFile[]>([])
const fileListAvatar = ref<IUploadFile[]>([])

// 上传前处理
function beforeUpload(file: File): boolean | Promise<File | Blob> {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    throw new Error('只能上传图片文件!')
  }

  // 检查文件大小
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    throw new Error('图片大小不能超过 2MB!')
  }

  return true
}

// 监听上传成功
function handleSuccess(_response: any, file: IUploadFile, _fileList: IUploadFile[]): void {
  console.warn('上传成功:', file.name)
}

// 监听上传错误
function handleError(_error: any, file: IUploadFile, _fileList: IUploadFile[]): void {
  console.error('上传失败:', file.name)
}

// 监听文件预览
function handlePreview(file: IUploadFile): void {
  if (file.url) {
    window.open(file.url)
  }
}

// 监听文件删除
function handleRemove(file: IUploadFile, _fileList: IUploadFile[]): void {
  console.warn('文件已移除:', file.name)
}

// 监听文件数量超出限制
function handleExceed(files: File[], fileList: IUploadFile[]): void {
  console.warn(`超过文件数量限制，最多上传 3 个文件，当前已有 ${fileList.length} 个文件`)
}

// 代码示例
const basicCode = `<ui-upload
  v-model="fileList"
  action="/api/upload"
  :auto-upload="false"
  tips="支持单个或多个文件上传，文件大小不超过 2MB"
  multiple
  @success="handleSuccess"
  @error="handleError"
/>

<script setup lang="ts">
interface UploadFile {
  uid: string
  name: string
  size: number
  type: string
  status: 'ready' | 'uploading' | 'success' | 'error'
  percentage: number
  response?: any
  raw?: File
  error?: string
  url?: string
}

const fileList = ref<UploadFile[]>([])

function handleSuccess(_response: any, file: UploadFile): void {
  console.warn('上传成功:', file.name)
}

function handleError(_error: any, file: UploadFile): void {
  console.error('上传失败:', file.name)
}
<\/script>`

const pictureListCode = `<ui-upload
  v-model="fileListPicture"
  action="/api/upload"
  list-type="picture"
  :auto-upload="false"
  tips="使用 list-type='picture' 显示缩略图"
  multiple
  accept="image/*"
  :before-upload="beforeUpload"
  @preview="handlePreview"
  @remove="handleRemove"
/>

<script setup lang="ts">
const fileListPicture = ref<UploadFile[]>([])

// 上传前处理
function beforeUpload(file: File): boolean | Promise<File | Blob> {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    throw new Error('只能上传图片文件!')
  }

  // 检查文件大小
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    throw new Error('图片大小不能超过 2MB!')
  }

  return true
}

function handlePreview(file: UploadFile): void {
  if (file.url) {
    window.open(file.url)
  }
}

function handleRemove(file: UploadFile): void {
  console.warn('文件已移除:', file.name)
}
<\/script>`

const pictureCardCode = `<ui-upload
  v-model="fileListCard"
  action="/api/upload"
  list-type="picture-card"
  :auto-upload="false"
  tips="显示为卡片网格布局，最大只能上传 3 个文件"
  multiple
  accept="image/*"
  :limit="3"
  :before-upload="beforeUpload"
  @preview="handlePreview"
  @remove="handleRemove"
  @exceed="handleExceed"
/>

<script setup lang="ts">
const fileListCard = ref<UploadFile[]>([])

function handleExceed(files: File[], fileList: UploadFile[]): void {
  console.warn(\`超过文件数量限制，最多上传 3 个文件，当前已有 \${fileList.length} 个文件\`)
}
<\/script>`

const dragCode = `<ui-upload
  v-model="fileListDrag"
  action="/api/upload"
  :auto-upload="false"
  drag
  multiple
  tips="支持拖拽上传或点击上传"
/>

<script setup lang="ts">
const fileListDrag = ref<UploadFile[]>([])
<\/script>`

const manualCode = `<ui-upload
  v-model="fileListManual"
  action="/api/upload"
  :auto-upload="false"
  multiple
  ref="uploadRef"
>
  <template #trigger>
    <ui-button>选择文件</ui-button>
  </template>
  <template #tip>
    <div class="mt-2 text-gray-500">请先选择文件，然后点击上传按钮进行上传</div>
  </template>
  <template #default="{ submit }">
    <div class="mt-4">
      <ui-button type="primary" @click="submit">
        开始上传
      </ui-button>
    </div>
  </template>
</ui-upload>

<script setup lang="ts">
const fileListManual = ref<UploadFile[]>([])
<\/script>`

const avatarCode = `<ui-upload
  v-model="fileListAvatar"
  action="/api/upload"
  :auto-upload="true"
  :limit="1"
  :show-file-list="false"
  accept="image/*"
  :before-upload="beforeUpload"
>
  <template #default="{ handleClick }">
    <div
      class="relative h-24 w-24 cursor-pointer overflow-hidden rounded-lg border border-dashed border-gray-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary"
      @click="handleClick"
    >
      <img
        v-if="fileListAvatar.length && fileListAvatar[0].url"
        :src="fileListAvatar[0].url"
        class="h-full w-full object-cover"
        alt="Avatar"
      />
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center text-gray-500"
      >
        <ui-icon icon="carbon:user-avatar" class="h-8 w-8" />
        <div class="mt-1 text-sm">点击上传</div>
      </div>
    </div>
  </template>
</ui-upload>

<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8c8c8c;
}
</style>
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Upload 上传组件
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      Upload组件允许用户上传文件，支持单文件和多文件上传、自动上传和手动上传、拖拽上传和点击上传等多种模式。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="通过点击上传按钮触发文件选择对话框，默认使用文本列表显示已选择的文件。"
      :code="basicCode"
    >
      <ui-upload
        v-model="fileList"
        action="/api/upload"
        :auto-upload="false"
        tips="支持单个或多个文件上传，文件大小不超过 2MB"
        multiple
        @success="handleSuccess"
        @error="handleError"
      />
    </ui-demo>

    <!-- 图片列表样式 -->
    <ui-demo
      title="图片列表样式"
      description="通过 list-type 属性设置不同的列表样式，picture 模式下会显示文件缩略图。"
      :code="pictureListCode"
    >
      <ui-upload
        v-model="fileListPicture"
        action="/api/upload"
        list-type="picture"
        :auto-upload="false"
        tips="使用 list-type='picture' 显示缩略图"
        multiple
        accept="image/*"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @remove="handleRemove"
      />
    </ui-demo>

    <!-- 照片墙样式 -->
    <ui-demo
      title="照片墙"
      description="使用 list-type='picture-card' 设置照片墙样式，适合图片上传展示。"
      :code="pictureCardCode"
    >
      <ui-upload
        v-model="fileListCard"
        action="/api/upload"
        list-type="picture-card"
        :auto-upload="false"
        tips="显示为卡片网格布局，最大只能上传 3 个文件"
        multiple
        accept="image/*"
        :limit="3"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @remove="handleRemove"
        @exceed="handleExceed"
      />
    </ui-demo>

    <!-- 拖拽上传 -->
    <ui-demo
      title="拖拽上传"
      description="通过 drag 属性启用拖拽上传模式，可以拖拽文件到指定区域进行上传。"
      :code="dragCode"
    >
      <ui-upload
        v-model="fileListDrag"
        action="/api/upload"
        :auto-upload="false"

        multiple drag
        tips="支持拖拽上传或点击上传"
      />
    </ui-demo>

    <!-- 手动上传 -->
    <ui-demo
      title="手动上传"
      description="通过插槽自定义上传按钮和触发，可以先选择文件然后手动触发上传。"
      :code="manualCode"
    >
      <ui-upload
        v-model="fileListManual"
        action="/api/upload"
        :auto-upload="false"
        multiple
      >
        <template #trigger>
          <ui-button>选择文件</ui-button>
        </template>
        <template #tip>
          <div class="mt-2 text-gray-500">
            请先选择文件，然后点击上传按钮进行上传
          </div>
        </template>
        <template #default="{ submit }">
          <div class="mt-4">
            <ui-button type="primary" @click="submit">
              开始上传
            </ui-button>
          </div>
        </template>
      </ui-upload>
    </ui-demo>

    <!-- 头像上传 -->
    <ui-demo
      title="头像上传"
      description="自定义上传组件的默认内容，实现头像上传功能。"
      :code="avatarCode"
    >
      <ui-upload
        v-model="fileListAvatar"
        action="/api/upload"
        :auto-upload="true"
        :limit="1"
        :show-file-list="false"
        accept="image/*"
        :before-upload="beforeUpload"
      >
        <template #default="{ handleClick }">
          <div
            class="relative h-24 w-24 cursor-pointer overflow-hidden border border-gray-300 rounded-lg border-dashed dark:border-gray-700 hover:border-primary dark:hover:border-primary"
            @click="handleClick"
          >
            <img
              v-if="fileListAvatar.length && fileListAvatar[0].url"
              :src="fileListAvatar[0].url"
              class="h-full w-full object-cover"
              alt="Avatar"
            >
            <div
              v-else
              class="h-full w-full flex flex-col items-center justify-center text-gray-500"
            >
              <ui-icon icon="carbon:user-avatar" class="h-8 w-8" />
              <div class="mt-1 text-sm">
                点击上传
              </div>
            </div>
          </div>
        </template>
      </ui-upload>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                modelValue / v-model
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                绑定的文件列表
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                UploadFile[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                action
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                上传的接口地址
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                multiple
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否支持多选文件
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                auto-upload
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否自动上传
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                true
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                list-type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文件列表的类型
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'text' / 'picture' / 'picture-card'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'text'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                drag
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否启用拖拽上传
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                success
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文件上传成功时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (response: any, file: UploadFile) => void
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                error
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文件上传失败时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (error: any, file: UploadFile) => void
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                preview
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                点击文件列表中的文件时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (file: UploadFile) => void
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                remove
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文件从列表中移除时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (file: UploadFile) => void
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                exceed
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文件数量超出限制时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (files: File[], fileList: UploadFile[]) => void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
