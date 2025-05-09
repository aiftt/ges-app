<script setup lang="ts" name="UiUpload">
/**
 * 文件上传组件
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 */
import { computed, ref, watch } from 'vue'

// 定义文件类型
interface UploadFile {
  // 唯一标识
  uid: string
  // 文件名
  name: string
  // 文件大小
  size: number
  // 文件类型
  type: string
  // 上传状态：ready, uploading, success, error
  status: 'ready' | 'uploading' | 'success' | 'error'
  // 上传进度
  percentage: number
  // 上传响应数据
  response?: any
  // 原始文件对象
  raw?: File
  // 错误信息
  error?: string
  // 预览URL
  url?: string
}

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值，已上传的文件列表
   */
  modelValue?: UploadFile[]
  /**
   * 上传地址
   */
  action?: string
  /**
   * 上传请求方法
   */
  method?: string
  /**
   * 上传额外参数
   */
  data?: Record<string, any>
  /**
   * 上传时文件名字段
   */
  name?: string
  /**
   * 是否支持多文件上传
   */
  multiple?: boolean
  /**
   * 是否自动上传
   */
  autoUpload?: boolean
  /**
   * 是否拖拽上传
   */
  drag?: boolean
  /**
   * 接受的文件类型
   */
  accept?: string
  /**
   * 上传前的验证函数
   */
  beforeUpload?: (file: File) => boolean | Promise<File | Blob>
  /**
   * 限制文件大小（字节）
   */
  maxSize?: number
  /**
   * 限制文件数量
   */
  limit?: number
  /**
   * 是否显示文件列表
   */
  showFileList?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否支持预览
   */
  previewable?: boolean
  /**
   * 是否支持删除
   */
  removable?: boolean
  /**
   * 上传的请求头
   */
  headers?: Record<string, string>
  /**
   * 是否支持凭证
   */
  withCredentials?: boolean
  /**
   * 上传文件字段名
   */
  fileKey?: string
  /**
   * 是否显示上传按钮
   */
  showButton?: boolean
  /**
   * 按钮文本
   */
  buttonText?: string
  /**
   * 按钮类型
   */
  buttonType?: 'primary' | 'default' | 'danger' | 'warning' | 'info' | 'success'
  /**
   * 按钮尺寸
   */
  buttonSize?: 'small' | 'default' | 'large'
  /**
   * 按钮图标
   */
  buttonIcon?: string
  /**
   * 提示文本
   */
  tips?: string
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 列表类型
   */
  listType?: 'text' | 'picture' | 'picture-card'
}>(), {
  modelValue: () => [],
  method: 'post',
  data: () => ({}),
  name: 'file',
  multiple: false,
  autoUpload: true,
  drag: false,
  maxSize: 0,
  limit: 0,
  showFileList: true,
  disabled: false,
  previewable: true,
  removable: true,
  headers: () => ({}),
  withCredentials: false,
  fileKey: 'file',
  showButton: true,
  buttonText: '点击上传',
  buttonType: 'primary',
  buttonSize: 'default',
  buttonIcon: 'carbon:upload',
  readonly: false,
  listType: 'text',
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: UploadFile[]): void
  (e: 'change', file: UploadFile, fileList: UploadFile[]): void
  (e: 'remove', file: UploadFile, fileList: UploadFile[]): void
  (e: 'success', response: any, file: UploadFile, fileList: UploadFile[]): void
  (e: 'error', error: any, file: UploadFile, fileList: UploadFile[]): void
  (e: 'progress', event: ProgressEvent, file: UploadFile, fileList: UploadFile[]): void
  (e: 'exceed', files: File[], fileList: UploadFile[]): void
  (e: 'preview', file: UploadFile): void
}>()

// 内部状态
const uploadInput = ref<HTMLInputElement | null>(null)
const dragover = ref(false)
const fileList = ref<UploadFile[]>([...props.modelValue])
const uploadingFiles = ref<UploadFile[]>([])

// 计算上传组件类名
const uploadClass = computed(() => [
  'ui-upload',
  {
    'ui-upload--disabled': props.disabled,
    'ui-upload--readonly': props.readonly,
    'ui-upload--drag': props.drag,
    'ui-upload--dragover': dragover.value,
  },
])

// 更新文件列表
watch(() => props.modelValue, (newValue) => {
  fileList.value = [...newValue]
}, { deep: true })

// 生成唯一ID
function generateUid(): string {
  return Math.random().toString(36).substring(2, 15)
}

// 创建上传文件对象
function createUploadFile(file: File): UploadFile {
  const url = URL.createObjectURL(file)
  return {
    uid: generateUid(),
    name: file.name,
    size: file.size,
    type: file.type,
    status: 'ready',
    percentage: 0,
    raw: file,
    url,
  }
}

// 处理文件选择
async function handleFileChange(event: Event) {
  if (props.disabled || props.readonly)
    return

  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length === 0)
    return

  // 文件数量限制
  if (props.limit > 0 && fileList.value.length + files.length > props.limit) {
    emit('exceed', files, fileList.value)
    return
  }

  // 处理文件
  for (const file of files) {
    // 文件大小限制
    if (props.maxSize > 0 && file.size > props.maxSize) {
      continue
    }

    try {
      // 上传前验证
      if (props.beforeUpload) {
        const result = await props.beforeUpload(file)
        if (result === false) {
          continue
        }
      }

      // 创建文件对象
      const uploadFile = createUploadFile(file)

      // 添加到文件列表
      fileList.value.push(uploadFile)
      emit('update:modelValue', fileList.value)
      emit('change', uploadFile, fileList.value)

      // 自动上传
      if (props.autoUpload && props.action) {
        uploadFile.status = 'uploading'
        uploadFile.percentage = 0
        uploadFile.raw = file
        uploadFile.error = undefined
        uploadFile.response = undefined

        // 添加到上传队列
        uploadingFiles.value.push(uploadFile)

        // 开始上传
        doUpload(uploadFile)
      }
    }
    catch (error) {
      console.error('文件处理失败:', error)
    }
  }

  // 清空input，确保相同文件可以再次选择
  if (uploadInput.value) {
    uploadInput.value.value = ''
  }
}

// 上传文件
function doUpload(file: UploadFile) {
  if (!props.action || !file.raw)
    return

  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  // 添加文件
  formData.append(props.fileKey, file.raw)

  // 添加额外数据
  Object.keys(props.data).forEach((key) => {
    formData.append(key, props.data[key])
  })

  // 上传进度事件
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      file.percentage = Math.round((event.loaded * 100) / event.total)
      emit('progress', event, file, fileList.value)
    }
  })

  // 加载完成事件
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      file.status = 'success'
      file.response = xhr.response
      emit('success', xhr.response, file, fileList.value)
    }
    else {
      file.status = 'error'
      file.error = xhr.statusText || '上传失败'
      emit('error', { status: xhr.status, message: xhr.statusText }, file, fileList.value)
    }

    // 从上传队列中移除
    uploadingFiles.value = uploadingFiles.value.filter(f => f.uid !== file.uid)
  })

  // 错误事件
  xhr.addEventListener('error', () => {
    file.status = 'error'
    file.error = '网络错误'
    emit('error', { status: xhr.status, message: '网络错误' }, file, fileList.value)

    // 从上传队列中移除
    uploadingFiles.value = uploadingFiles.value.filter(f => f.uid !== file.uid)
  })

  // 配置请求
  xhr.open(props.method, props.action, true)

  // 设置请求头
  if (xhr.upload) {
    Object.keys(props.headers).forEach((key) => {
      xhr.setRequestHeader(key, props.headers[key])
    })
  }

  // 设置凭证
  xhr.withCredentials = props.withCredentials

  // 设置响应类型
  xhr.responseType = 'json'

  // 发送请求
  xhr.send(formData)
}

// 触发文件选择
function handleClick() {
  if (props.disabled || props.readonly)
    return

  uploadInput.value?.click()
}

// 手动上传
function submit() {
  if (props.disabled || props.readonly)
    return

  const readyFiles = fileList.value.filter(file => file.status === 'ready')

  for (const file of readyFiles) {
    file.status = 'uploading'
    file.percentage = 0
    file.error = undefined
    file.response = undefined

    // 如果有原始文件对象
    if (file.raw) {
      // 添加到上传队列
      uploadingFiles.value.push(file)

      // 开始上传
      doUpload(file)
    }
  }
}

// 移除文件
function handleRemove(file: UploadFile) {
  if (props.disabled || props.readonly)
    return

  // 从列表中移除
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)

  // 更新绑定值
  emit('update:modelValue', fileList.value)
  emit('remove', file, fileList.value)
}

// 预览文件
function handlePreview(file: UploadFile) {
  if (!props.previewable)
    return

  emit('preview', file)
}

// 拖拽相关事件处理
function handleDragOver(event: DragEvent) {
  event.preventDefault()
  if (!props.drag || props.disabled || props.readonly)
    return
  dragover.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  dragover.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  if (!props.drag || props.disabled || props.readonly)
    return

  dragover.value = false

  // 处理拖放的文件
  const files = Array.from(event.dataTransfer?.files || [])

  // 文件数量限制
  if (props.limit > 0 && fileList.value.length + files.length > props.limit) {
    emit('exceed', files, fileList.value)
    return
  }

  // 触发相同的处理逻辑
  const inputEvent = { target: { files: event.dataTransfer?.files } } as unknown as Event
  handleFileChange(inputEvent)
}

// 格式化文件大小
function formatSize(size: number): string {
  if (size < 1024) {
    return `${size} B`
  }
  else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  }
  else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }
  else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }
}

// 暴露方法
defineExpose({
  submit,
  upload: submit,
})
</script>

<template>
  <div :class="uploadClass">
    <!-- 隐藏的文件输入框 -->
    <input
      ref="uploadInput"
      type="file"
      class="ui-upload-input"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileChange"
    >

    <!-- 拖拽上传 -->
    <div
      v-if="drag"
      class="ui-upload-drag"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="handleClick"
    >
      <div class="ui-upload-drag-content">
        <ui-icon icon="carbon:upload" class="ui-upload-drag-icon" />
        <div class="ui-upload-drag-text">
          将文件拖到此处，或<span class="ui-upload-text-link">点击上传</span>
        </div>
        <div v-if="tips" class="ui-upload-tips">
          {{ tips }}
        </div>
      </div>
    </div>

    <!-- 上传按钮 -->
    <ui-button
      v-if="showButton && !drag"
      :type="buttonType"
      :size="buttonSize"
      :disabled="disabled"
      @click="handleClick"
    >
      <ui-icon v-if="buttonIcon" :icon="buttonIcon" class="ui-upload-button-icon" />
      <span>{{ buttonText }}</span>
    </ui-button>

    <!-- 文件列表 - 文本模式 -->
    <div v-if="showFileList && listType === 'text' && fileList.length > 0" class="ui-upload-list ui-upload-list--text">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="ui-upload-list-item"
        :class="{
          'ui-upload-list-item--success': file.status === 'success',
          'ui-upload-list-item--error': file.status === 'error',
          'ui-upload-list-item--uploading': file.status === 'uploading',
        }"
      >
        <!-- 文件图标 -->
        <ui-icon icon="carbon:document" class="ui-upload-list-item-icon" />

        <!-- 文件信息 -->
        <div class="ui-upload-list-item-info" @click="handlePreview(file)">
          <span class="ui-upload-list-item-name">{{ file.name }}</span>
          <span class="ui-upload-list-item-size">{{ formatSize(file.size) }}</span>
        </div>

        <!-- 上传状态 -->
        <div v-if="file.status === 'uploading'" class="ui-upload-list-item-status">
          <div class="ui-upload-list-item-progress">
            <div
              class="ui-upload-list-item-progress-bar"
              :style="{ width: `${file.percentage}%` }"
            />
          </div>
          <span class="ui-upload-list-item-percentage">{{ file.percentage }}%</span>
        </div>

        <!-- 操作按钮 -->
        <div class="ui-upload-list-item-actions">
          <ui-icon
            v-if="previewable && file.url"
            icon="carbon:view"
            class="ui-upload-list-item-action"
            @click="handlePreview(file)"
          />
          <ui-icon
            v-if="removable && !readonly"
            icon="carbon:close"
            class="ui-upload-list-item-action ui-upload-list-item-action--delete"
            @click="handleRemove(file)"
          />
        </div>
      </div>
    </div>

    <!-- 文件列表 - 图片模式 -->
    <div v-if="showFileList && listType === 'picture' && fileList.length > 0" class="ui-upload-list ui-upload-list--picture">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="ui-upload-list-item"
        :class="{
          'ui-upload-list-item--success': file.status === 'success',
          'ui-upload-list-item--error': file.status === 'error',
          'ui-upload-list-item--uploading': file.status === 'uploading',
        }"
      >
        <!-- 缩略图 -->
        <div class="ui-upload-list-item-thumbnail" @click="handlePreview(file)">
          <img v-if="file.url && file.type.startsWith('image/')" :src="file.url" alt="">
          <ui-icon v-else icon="carbon:document" class="ui-upload-list-item-icon" />
        </div>

        <!-- 文件信息 -->
        <div class="ui-upload-list-item-info" @click="handlePreview(file)">
          <span class="ui-upload-list-item-name">{{ file.name }}</span>
          <span class="ui-upload-list-item-size">{{ formatSize(file.size) }}</span>
        </div>

        <!-- 上传状态 -->
        <div v-if="file.status === 'uploading'" class="ui-upload-list-item-status">
          <div class="ui-upload-list-item-progress">
            <div
              class="ui-upload-list-item-progress-bar"
              :style="{ width: `${file.percentage}%` }"
            />
          </div>
          <span class="ui-upload-list-item-percentage">{{ file.percentage }}%</span>
        </div>

        <!-- 操作按钮 -->
        <div class="ui-upload-list-item-actions">
          <ui-icon
            v-if="previewable && file.url"
            icon="carbon:view"
            class="ui-upload-list-item-action"
            @click="handlePreview(file)"
          />
          <ui-icon
            v-if="removable && !readonly"
            icon="carbon:close"
            class="ui-upload-list-item-action ui-upload-list-item-action--delete"
            @click="handleRemove(file)"
          />
        </div>
      </div>
    </div>

    <!-- 文件列表 - 卡片模式 -->
    <div v-if="showFileList && listType === 'picture-card' && fileList.length > 0" class="ui-upload-list ui-upload-list--picture-card">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="ui-upload-list-item"
        :class="{
          'ui-upload-list-item--success': file.status === 'success',
          'ui-upload-list-item--error': file.status === 'error',
          'ui-upload-list-item--uploading': file.status === 'uploading',
        }"
      >
        <!-- 文件内容 -->
        <div class="ui-upload-list-item-content" @click="handlePreview(file)">
          <!-- 预览图 -->
          <img v-if="file.url && file.type.startsWith('image/')" :src="file.url" alt="" class="ui-upload-list-item-image">
          <ui-icon v-else icon="carbon:document" class="ui-upload-list-item-icon" />

          <!-- 文件名和大小 -->
          <div class="ui-upload-list-item-info">
            <span class="ui-upload-list-item-name">{{ file.name }}</span>
            <span class="ui-upload-list-item-size">{{ formatSize(file.size) }}</span>
          </div>
        </div>

        <!-- 上传状态 -->
        <div v-if="file.status === 'uploading'" class="ui-upload-list-item-mask">
          <div class="ui-upload-list-item-progress">
            <div
              class="ui-upload-list-item-progress-bar"
              :style="{ width: `${file.percentage}%` }"
            />
          </div>
          <span class="ui-upload-list-item-percentage">{{ file.percentage }}%</span>
        </div>

        <!-- 操作按钮 - 悬停显示 -->
        <div class="ui-upload-list-item-actions">
          <ui-icon
            v-if="previewable && file.url"
            icon="carbon:view"
            class="ui-upload-list-item-action"
            @click.stop="handlePreview(file)"
          />
          <ui-icon
            v-if="removable && !readonly"
            icon="carbon:close"
            class="ui-upload-list-item-action ui-upload-list-item-action--delete"
            @click.stop="handleRemove(file)"
          />
        </div>
      </div>

      <!-- 上传按钮卡片 -->
      <div v-if="!disabled && !readonly && (!limit || fileList.length < limit)" class="ui-upload-list-item ui-upload-list-item--upload" @click="handleClick">
        <ui-icon icon="carbon:add" class="ui-upload-list-item-upload-icon" />
        <span>{{ buttonText }}</span>
      </div>
    </div>

    <!-- 提示文本 -->
    <div v-if="tips && !drag" class="ui-upload-tips">
      {{ tips }}
    </div>
  </div>
</template>

<style scoped>
.ui-upload {
  display: inline-block;
  font-size: var(--ui-font-size);
  line-height: 1.5;
}

.ui-upload-input {
  display: none;
}

.ui-upload--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-upload-button-icon {
  margin-right: 0.5rem;
}

.ui-upload-tips {
  font-size: 0.85em;
  margin-top: 0.5rem;
  color: var(--ui-color-text-secondary);
}

/* 拖拽上传区域 */
.ui-upload-drag {
  border: 1px dashed var(--ui-border-color);
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-color-bg);
  text-align: center;
  padding: 1.5rem;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background-color 0.3s;
}

.ui-upload-drag:hover,
.ui-upload--dragover .ui-upload-drag {
  border-color: var(--ui-color-primary);
  background-color: var(--ui-color-bg-hover);
}

.ui-upload--disabled .ui-upload-drag {
  cursor: not-allowed;
  border-color: var(--ui-border-color);
  background-color: var(--ui-color-bg-disabled);
}

.ui-upload-drag-icon {
  font-size: 2.5rem;
  color: var(--ui-color-text-secondary);
  margin-bottom: 0.5rem;
}

.ui-upload-drag-text {
  color: var(--ui-color-text);
  margin-bottom: 0.5rem;
}

.ui-upload-text-link {
  color: var(--ui-color-primary);
  text-decoration: none;
}

/* 文件列表 - 通用样式 */
.ui-upload-list {
  margin-top: 1rem;
}

.ui-upload-list-item {
  position: relative;
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-color-bg);
  transition: background-color 0.3s;
}

.ui-upload-list-item--success {
  background-color: rgba(52, 211, 153, 0.1);
}

.ui-upload-list-item--error {
  background-color: rgba(239, 68, 68, 0.1);
}

.ui-upload-list-item-icon {
  color: var(--ui-color-text-secondary);
}

.ui-upload-list-item-name {
  color: var(--ui-color-text);
  font-weight: 500;
  word-break: break-all;
}

.ui-upload-list-item-size {
  color: var(--ui-color-text-secondary);
  font-size: 0.85em;
}

.ui-upload-list-item-progress {
  width: 100%;
  height: 2px;
  background-color: var(--ui-color-bg-hover);
  border-radius: 1px;
  overflow: hidden;
}

.ui-upload-list-item-progress-bar {
  height: 100%;
  background-color: var(--ui-color-primary);
  transition: width 0.3s ease;
}

.ui-upload-list-item-percentage {
  font-size: 0.85em;
  color: var(--ui-color-text-secondary);
}

.ui-upload-list-item-action {
  cursor: pointer;
  color: var(--ui-color-text-secondary);
  padding: 0.25rem;
  border-radius: 50%;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.ui-upload-list-item-action:hover {
  background-color: var(--ui-color-bg-hover);
  color: var(--ui-color-text);
}

.ui-upload-list-item-action--delete:hover {
  color: var(--ui-color-danger);
}

/* 文件列表 - 文本模式 */
.ui-upload-list--text .ui-upload-list-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.ui-upload-list--text .ui-upload-list-item-icon {
  margin-right: 0.5rem;
  font-size: 1.25rem;
}

.ui-upload-list--text .ui-upload-list-item-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ui-upload-list--text .ui-upload-list-item-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
  width: 4rem;
}

.ui-upload-list--text .ui-upload-list-item-actions {
  display: flex;
  align-items: center;
}

/* 文件列表 - 图片模式 */
.ui-upload-list--picture .ui-upload-list-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.ui-upload-list--picture .ui-upload-list-item-thumbnail {
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-color-bg-hover);
  margin-right: 0.5rem;
  cursor: pointer;
}

.ui-upload-list--picture .ui-upload-list-item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-upload-list--picture .ui-upload-list-item-icon {
  font-size: 1.5rem;
}

.ui-upload-list--picture .ui-upload-list-item-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ui-upload-list--picture .ui-upload-list-item-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
  width: 4rem;
}

.ui-upload-list--picture .ui-upload-list-item-actions {
  display: flex;
  align-items: center;
}

/* 文件列表 - 卡片模式 */
.ui-upload-list--picture-card {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ui-upload-list--picture-card .ui-upload-list-item {
  width: 6rem;
  height: 6rem;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.ui-upload-list--picture-card .ui-upload-list-item-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ui-upload-list--picture-card .ui-upload-list-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-upload-list--picture-card .ui-upload-list-item-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.ui-upload-list--picture-card .ui-upload-list-item-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
}

.ui-upload-list--picture-card .ui-upload-list-item:hover .ui-upload-list-item-info {
  display: block;
}

.ui-upload-list--picture-card .ui-upload-list-item-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.ui-upload-list--picture-card .ui-upload-list-item-progress {
  width: 80%;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 0.5rem;
}

.ui-upload-list--picture-card .ui-upload-list-item-percentage {
  color: white;
}

.ui-upload-list--picture-card .ui-upload-list-item-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: var(--ui-border-radius);
  opacity: 0;
  transition: opacity 0.3s;
}

.ui-upload-list--picture-card .ui-upload-list-item:hover .ui-upload-list-item-actions {
  opacity: 1;
}

.ui-upload-list--picture-card .ui-upload-list-item-action {
  color: white;
}

.ui-upload-list--picture-card .ui-upload-list-item-action:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.ui-upload-list--picture-card .ui-upload-list-item--upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--ui-border-color);
  background-color: var(--ui-color-bg);
  cursor: pointer;
  transition:
    border-color 0.3s,
    background-color 0.3s;
}

.ui-upload-list--picture-card .ui-upload-list-item--upload:hover {
  border-color: var(--ui-color-primary);
  background-color: var(--ui-color-bg-hover);
}

.ui-upload-list--picture-card .ui-upload-list-item-upload-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: var(--ui-color-text-secondary);
}
</style>
