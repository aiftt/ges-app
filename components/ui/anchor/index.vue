<script setup lang="ts" name="UiAnchor">
/**
 * Anchor 锚点组件
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19
 * 更新内容: 修复 JSX 语法问题
 */

import { useScroll } from '@vueuse/core'
import { onBeforeUnmount, onMounted, provide, reactive, ref, watch } from 'vue'

// 定义类型
interface AnchorLink {
  href: string
  title: string
  children?: AnchorLink[]
}

// 定义属性
const props = withDefaults(defineProps<{
  /**
   * 锚点区域边界，单位：px
   */
  bounds?: number
  /**
   * 自定义高亮类名
   */
  activeClass?: string
  /**
   * 指定滚动到锚点区域的偏移量
   */
  targetOffset?: number
  /**
   * 锚点滚动偏移量，默认与 targetOffset 相同
   */
  scrollOffset?: number
  /**
   * 指定监听滚动的容器
   */
  container?: () => HTMLElement | Window
  /**
   * 是否显示小圆点
   */
  showInkBall?: boolean
  /**
   * 固定模式
   */
  affix?: boolean
  /**
   * 固定模式的偏移量
   */
  offsetTop?: number
  /**
   * 自定义样式类
   */
  customClass?: string
  /**
   * 自定义样式
   */
  customStyle?: Record<string, any>
  /**
   * 向 Anchor 组件添加链接的方式
   */
  items?: AnchorLink[]
}>(), {
  bounds: 5,
  activeClass: '',
  targetOffset: 0,
  scrollOffset: undefined,
  container: () => window,
  showInkBall: true,
  affix: true,
  offsetTop: 0,
  customClass: '',
  customStyle: () => ({}),
  items: () => [],
})

// 事件定义
const emit = defineEmits<{
  (event: 'change', currentActiveLink: string, previousActiveLink: string): void
  (event: 'click', e: Event, link: string): void
}>()

// 响应式状态
const activeLink = ref('')
const prevActiveLink = ref('')
const links = reactive(new Map<string, HTMLElement>())
const wrapperRef = ref<HTMLElement | null>(null)
const animating = ref(false)
const inkTop = ref(0)

// 锚点注册与注销
function registerLink(hash: string, element: HTMLElement) {
  links.set(hash, element)
}

function unregisterLink(hash: string) {
  links.delete(hash)
}

// 获取所有锚点对应的元素
function getLinksElements(): { link: string, top: number }[] {
  const result: { link: string, top: number }[] = []

  links.forEach((element, link) => {
    const id = link.replace(/#/, '')
    const target = document.getElementById(id)

    if (target) {
      const top = getOffsetTop(target, props.container())
      result.push({ link, top })
    }
  })

  // 按照元素在页面中的位置排序
  result.sort((a, b) => a.top - b.top)

  return result
}

// 获取元素相对于容器的顶部偏移
function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (!element)
    return 0

  if (container === window) {
    const rect = element.getBoundingClientRect()
    return rect.top + window.pageYOffset
  }

  return element.offsetTop - (container as HTMLElement).offsetTop
}

// 更新激活的锚点和小圆点位置
function updateActiveLink() {
  if (!wrapperRef.value || animating.value)
    return

  const container = props.container()
  const scrollTop = getScroll(container, true)
  const elements = getLinksElements()

  let active = ''

  // 找出应该激活的锚点
  for (let i = elements.length - 1; i >= 0; i--) {
    const { link, top } = elements[i]
    const targetOffset = props.targetOffset

    if (top <= scrollTop + targetOffset + props.bounds) {
      active = link
      break
    }
  }

  if (active !== activeLink.value) {
    prevActiveLink.value = activeLink.value
    activeLink.value = active

    // 更新圆点位置
    nextTick(() => {
      updateInkPosition()
    })

    emit('change', active, prevActiveLink.value)
  }
}

// 更新圆点位置
function updateInkPosition() {
  if (!wrapperRef.value || !activeLink.value)
    return

  const linkElement = links.get(activeLink.value)
  if (linkElement) {
    const linkRect = linkElement.getBoundingClientRect()
    const wrapperRect = wrapperRef.value.getBoundingClientRect()

    inkTop.value = linkRect.top - wrapperRect.top + linkRect.height / 2
  }
}

// 获取滚动位置
function getScroll(target: HTMLElement | Window, isTop: boolean): number {
  if (target === window) {
    return isTop ? window.pageYOffset : window.pageXOffset
  }
  return isTop ? (target as HTMLElement).scrollTop : (target as HTMLElement).scrollLeft
}

// 滚动到指定锚点
function scrollToHash(hash: string): Promise<void> {
  const id = hash.replace(/#/, '')
  const element = document.getElementById(id)

  if (element) {
    animating.value = true

    const offset = props.scrollOffset !== undefined ? props.scrollOffset : props.targetOffset
    const container = props.container()
    const isWindow = container === window

    // 使用 useScroll 代替 useScrollTo
    const scrollInfo = useScroll(isWindow ? document.documentElement : container as HTMLElement)

    const targetY = getOffsetTop(element, container) - offset
    const duration = 500
    const startTime = Date.now()
    const startY = scrollInfo.y.value
    const diffY = targetY - startY

    return new Promise((resolve) => {
      const scrollStep = () => {
        const now = Date.now()
        const elapsed = now - startTime

        if (elapsed >= duration) {
          scrollInfo.y.value = targetY
          animating.value = false
          activeLink.value = hash
          emit('change', hash, prevActiveLink.value)
          resolve()
          return
        }

        // 使用平滑的缓动函数
        const t = elapsed / duration
        scrollInfo.y.value = startY + diffY * (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

        requestAnimationFrame(scrollStep)
      }

      scrollStep()
    })
  }

  return Promise.resolve()
}

// 处理点击锚点的事件
function handleLinkClick(e: Event, link: string) {
  e.preventDefault()

  emit('click', e, link)
  scrollToHash(link)
}

// 添加滚动事件监听
let scrollEventListener: (() => void) | null = null

function initScrollListener() {
  const container = props.container()

  const handleScroll = () => {
    updateActiveLink()
  }

  container.addEventListener('scroll', handleScroll)

  scrollEventListener = () => {
    container.removeEventListener('scroll', handleScroll)
  }
}

// 监听属性变化
watch(() => props.container(), () => {
  if (scrollEventListener) {
    scrollEventListener()
  }
  initScrollListener()
  updateActiveLink()
})

// 生命周期钩子
onMounted(() => {
  initScrollListener()
  // 初始化时更新一次活动链接
  nextTick(() => {
    updateActiveLink()
  })
})

onBeforeUnmount(() => {
  if (scrollEventListener) {
    scrollEventListener()
  }
})

// 提供给子组件的方法
provide('activeLink', activeLink)
provide('registerLink', registerLink)
provide('unregisterLink', unregisterLink)
provide('scrollToHash', scrollToHash)
provide('activeClass', props.activeClass)

defineExpose({
  activeLink,
  scrollToHash,
})

function getAnchorLinkClass(href: string) {
  return [
    'ui-anchor-link-text',
    activeLink.value === href ? 'ui-anchor-link-active' : '',
    activeLink.value === href && props.activeClass ? props.activeClass : '',
  ]
}
</script>

<template>
  <ui-affix v-if="affix" :offset-top="offsetTop" :custom-class="customClass" :custom-style="customStyle">
    <div ref="wrapperRef" class="ui-anchor">
      <div v-if="showInkBall" class="ui-anchor-ink">
        <span class="ui-anchor-ink-ball" :class="{ visible: activeLink }" :style="{ top: `${inkTop}px` }" />
      </div>
      <ul class="ui-anchor-wrapper">
        <slot>
          <!-- 使用 items 属性自动生成锚点链接，直接使用 v-for 代替复杂的渲染函数 -->
          <template v-if="items && items.length > 0">
            <li v-for="(item, index) in items" :key="index" class="ui-anchor-link">
              <a
                :href="item.href"
                :class="getAnchorLinkClass(item.href)"
                @click="(e) => handleLinkClick(e, item.href)"
              >
                {{ item.title }}
              </a>

              <!-- 递归渲染子链接 -->
              <ul v-if="item.children && item.children.length > 0" class="ui-anchor-link-children">
                <li v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`" class="ui-anchor-link">
                  <a
                    :href="child.href"
                    :class="getAnchorLinkClass(child.href)"
                    @click="(e) => handleLinkClick(e, child.href)"
                  >
                    {{ child.title }}
                  </a>
                  <!-- 最多支持二级子菜单，若需更多层级可使用递归组件 -->
                </li>
              </ul>
            </li>
          </template>
        </slot>
      </ul>
    </div>
  </ui-affix>

  <div v-else ref="wrapperRef" class="ui-anchor" :class="customClass" :style="customStyle">
    <div v-if="showInkBall" class="ui-anchor-ink">
      <span class="ui-anchor-ink-ball" :class="{ visible: activeLink }" :style="{ top: `${inkTop}px` }" />
    </div>
    <ul class="ui-anchor-wrapper">
      <slot>
        <!-- 使用 items 属性自动生成锚点链接，直接使用 v-for 代替复杂的渲染函数 -->
        <template v-if="items && items.length > 0">
          <li v-for="(item, index) in items" :key="index" class="ui-anchor-link">
            <a
              :href="item.href"
              :class="getAnchorLinkClass(item.href)"
              @click="(e) => handleLinkClick(e, item.href)"
            >
              {{ item.title }}
            </a>

            <!-- 递归渲染子链接 -->
            <ul v-if="item.children && item.children.length > 0" class="ui-anchor-link-children">
              <li v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`" class="ui-anchor-link">
                <a
                  :href="child.href"
                  :class="getAnchorLinkClass(child.href)"
                  @click="(e) => handleLinkClick(e, child.href)"
                >
                  {{ child.title }}
                </a>
                <!-- 最多支持二级子菜单，若需更多层级可使用递归组件 -->
              </li>
            </ul>
          </li>
        </template>
      </slot>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.ui-anchor {
  --ui-anchor-border-color: #f0f0f0;
  --ui-anchor-link-color: #595959;
  --ui-anchor-active-color: var(--ui-primary-color, #1890ff);
  --ui-anchor-ink-ball-color: var(--ui-primary-color, #1890ff);

  position: relative;
  padding-left: 16px;
  border-left: 2px solid var(--ui-anchor-border-color);

  &-ink {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;

    &-ball {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 2px solid var(--ui-anchor-ink-ball-color);
      background-color: #fff;
      left: -4px;
      transform: translateY(-50%);
      transition: top 0.3s ease-in-out;
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }
  }

  &-wrapper {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &-link {
    padding: 4px 0;
    list-style: none;

    &-text {
      position: relative;
      display: block;
      color: var(--ui-anchor-link-color);
      text-decoration: none;
      transition: all 0.2s;
      padding: 2px 0;

      &:hover {
        color: var(--ui-anchor-active-color);
      }

      &.ui-anchor-link-active {
        color: var(--ui-anchor-active-color);
      }
    }

    &-children {
      padding-left: 16px;
      list-style: none;
    }
  }

  :deep(.dark) & {
    --ui-anchor-border-color: #333333;
    --ui-anchor-link-color: #a6a6a6;
  }
}
</style>
