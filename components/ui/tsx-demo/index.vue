<script setup lang="tsx" name="UiTsxDemo">
/**
 * TSX演示组件
 * 创建日期: 2024-01-08
 * 作者: aiftt
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 组件标题
   */
  title?: string
  /**
   * 内容
   */
  content?: string
  /**
   * 按钮文本
   */
  buttonText?: string
  /**
   * 主题
   */
  theme?: 'primary' | 'success' | 'warning' | 'danger'
}>(), {
  title: 'TSX演示组件',
  content: '这是一个使用TSX编写的组件',
  buttonText: '点击我',
  theme: 'primary',
})

// 定义事件
const emit = defineEmits<{
  (e: 'click', count: number): void
}>()

const count = ref(0)
const slots = useSlots()

function handleClick() {
  count.value++
  emit('click', count.value)
}

const themeClass = computed(() => {
  switch (props.theme) {
    case 'primary':
      return 'bg-blue-500 hover:bg-blue-600 text-white'
    case 'success':
      return 'bg-green-500 hover:bg-green-600 text-white'
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600 text-white'
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 text-white'
    default:
      return 'bg-blue-500 hover:bg-blue-600 text-white'
  }
})

// TSX 渲染函数
function TsxDemo() {
  return (
    <div class="ui-tsx-demo border rounded p-4">
      <h3 class="mb-2 text-xl font-bold">{props.title}</h3>
      <p class="mb-4">{props.content}</p>
      <div class="mb-3">
        当前计数:
        {count.value}
      </div>
      <button
        class={`px-4 py-2 rounded ${themeClass.value}`}
        onClick={handleClick}
      >
        {props.buttonText}
      </button>
      <div class="mt-4">
        {slots.default?.()}
      </div>
    </div>
  )
}
</script>

<template>
  <TsxDemo />
</template>
