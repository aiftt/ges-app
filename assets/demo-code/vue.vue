<script setup>
import { computed, onMounted, ref } from 'vue'

// 响应式状态
const count = ref(0)
const name = ref('Vue')

// 计算属性
const message = computed(() => {
  return `Hello, ${name.value}!`
})

// 方法
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log('组件已挂载')
})
</script>

<template>
  <div class="greeting">
    <h1>{{ message }}</h1>
    <button @click="increment">
      点击了 {{ count }} 次
    </button>
  </div>
</template>

<style scoped>
.greeting {
  text-align: center;
  margin-top: 2rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
