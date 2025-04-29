import { computed, defineComponent, ref } from 'vue'

/**
 * TSX演示组件
 * 创建日期: 2024-01-08
 * 作者: aiftt
 */
export default defineComponent({
  name: 'UiTsxDemo',
  props: {
    /**
     * 组件标题
     */
    title: {
      type: String,
      default: 'TSX演示组件',
    },
    /**
     * 内容
     */
    content: {
      type: String,
      default: '这是一个使用TSX编写的组件',
    },
    /**
     * 按钮文本
     */
    buttonText: {
      type: String,
      default: '点击我',
    },
    /**
     * 主题
     */
    theme: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'success', 'warning', 'danger'].includes(value),
    },
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const count = ref(0)

    const handleClick = () => {
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

    return () => (
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
  },
})
