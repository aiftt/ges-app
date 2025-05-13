<!--
  404页面
  创建日期: 2024-09-22
  作者: aiftt
  邮箱: ftt.loves@gmail.com
-->
<script setup lang="ts">
// 监听页面初始化
onMounted(() => {
  // 设置动画相关的状态
  if (import.meta.client) {
    startAnimation()
  }
})

// 控制页面动画
function startAnimation() {
  if (import.meta.client) {
    // 动画宇航员
    const astroElement = document.getElementById('astro-404')
    if (astroElement) {
      astroElement.classList.add('floating')
    }

    // 动画星星
    const starsElement = document.getElementById('stars-404')
    if (starsElement) {
      starsElement.classList.add('twinkling')
    }

    // 动画流星
    createShooting()
  }
}

// 创建流星动画
function createShooting() {
  const shootingStarsContainer = document.getElementById('shooting-stars')
  if (!shootingStarsContainer)
    return

  // 创建5颗流星
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div')
    star.className = 'shooting-star'

    // 随机位置和延迟
    const delay = Math.random() * 15
    const top = Math.random() * 40
    const left = Math.random() * 70 + 20

    star.style.top = `${top}%`
    star.style.left = `${left}%`
    star.style.animationDelay = `${delay}s`

    shootingStarsContainer.appendChild(star)
  }
}
</script>

<template>
  <div class="page-404">
    <!-- 背景元素 -->
    <div id="stars-404" class="stars-background" />
    <div id="shooting-stars" class="shooting-stars-container" />

    <div class="page-404-content">
      <!-- 宇航员图标 -->
      <div id="astro-404" class="astro-container">
        <ui-icon icon="carbon:astronaut" class="astro-icon" />
        <div class="planet" />
        <div class="moon" />
        <div class="satellite" />
      </div>

      <!-- 404文字 -->
      <h1 class="error-code">
        404
      </h1>
      <h2 class="error-title">
        页面迷失在太空中
      </h2>
      <p class="error-desc">
        很抱歉，您要访问的页面似乎已经飘向了未知的宇宙。
        也许这个页面已被移动、删除，或者从未存在过。
      </p>

      <!-- 导航选项 -->
      <div class="action-buttons">
        <ui-button type="primary" size="large" @click="navigateTo('/')">
          <ui-icon icon="carbon:home" class="button-icon" />
          返回首页
        </ui-button>
        <ui-button size="large" @click="$router.back()">
          <ui-icon icon="carbon:arrow-left" class="button-icon" />
          返回上一页
        </ui-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-404 {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(180deg, #0c1445 0%, #1c2951 100%);
  position: relative;
  overflow: hidden;
  color: white;
}

.page-404-content {
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
  position: relative;
  z-index: 5;
}

// 星空背景
.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.9) 100%, transparent),
    radial-gradient(1px 1px at 20px 50px, rgba(255, 255, 255, 0.7) 100%, transparent),
    radial-gradient(1px 1px at 30px 100px, rgba(255, 255, 255, 0.8) 100%, transparent),
    radial-gradient(2px 2px at 70px 40px, rgba(255, 255, 255, 0.6) 100%, transparent),
    radial-gradient(1px 1px at 120px 40px, rgba(255, 255, 255, 0.8) 100%, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.7) 100%, transparent),
    radial-gradient(1px 1px at 180px 150px, rgba(255, 255, 255, 0.7) 100%, transparent),
    radial-gradient(2px 2px at 250px 300px, rgba(255, 255, 255, 0.8) 100%, transparent),
    radial-gradient(1px 1px at 350px 280px, rgba(255, 255, 255, 0.6) 100%, transparent),
    radial-gradient(1px 1px at 320px 100px, rgba(255, 255, 255, 0.7) 100%, transparent),
    radial-gradient(2px 2px at 400px 200px, rgba(255, 255, 255, 0.9) 100%, transparent),
    radial-gradient(1px 1px at 450px 50px, rgba(255, 255, 255, 0.7) 100%, transparent),
    radial-gradient(1px 1px at 500px 300px, rgba(255, 255, 255, 0.8) 100%, transparent);
  background-repeat: repeat;
  z-index: 1;
  opacity: 0.8;

  &.twinkling {
    animation: twinkle 8s ease-in-out infinite;
  }
}

// 流星容器
.shooting-stars-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

// 流星样式
.shooting-star {
  position: absolute;
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0));
  transform: rotate(-45deg);
  animation: shooting 10s linear infinite;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    right: 0;
    top: -1.5px;
  }
}

.astro-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  transition: transform 0.3s ease;

  &.floating {
    animation: float 6s ease-in-out infinite;
  }
}

.astro-icon {
  position: relative;
  z-index: 4;
  font-size: 6rem;
  color: white;
  filter: drop-shadow(0 0 10px rgba(120, 166, 255, 0.5));
}

.planet {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3563b5 0%, #254380 100%);
  bottom: 10px;
  right: 10px;
  z-index: 3;
  opacity: 0.8;
  box-shadow:
    inset -10px -10px 20px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(73, 136, 247, 0.4);
  animation: rotate 30s linear infinite;
}

.moon {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
  top: 30px;
  left: 20px;
  z-index: 2;
  box-shadow:
    inset -5px -5px 10px rgba(0, 0, 0, 0.2),
    0 0 15px rgba(255, 255, 255, 0.4);
  animation: orbitMoon 15s linear infinite;
}

.satellite {
  position: absolute;
  width: 20px;
  height: 8px;
  background: linear-gradient(90deg, #6b7280 0%, #4b5563 100%);
  top: 50px;
  right: 40px;
  z-index: 3;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  animation: orbitSatellite 20s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #9ca3af;
  }

  &::before {
    width: 30px;
    height: 2px;
    top: 3px;
    left: -5px;
    border-radius: 1px;
    transform: rotate(30deg);
  }

  &::after {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    top: -5px;
    right: 2px;
    background: #d1d5db;
  }
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
}

.error-title {
  font-size: 2.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #f3f4f6;
}

.error-desc {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #d1d5db;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.button-icon {
  margin-right: 0.5rem;
}

/* 动画定义 */
@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(-500px) translateY(500px) rotate(-45deg);
    opacity: 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbitMoon {
  0% {
    transform: rotate(0deg) translateX(70px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(70px) rotate(-360deg);
  }
}

@keyframes orbitSatellite {
  0% {
    transform: rotate(0deg) translateX(40px) translateY(20px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(40px) translateY(20px) rotate(-360deg);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .astro-container {
    width: 150px;
    height: 150px;
  }

  .astro-icon {
    font-size: 4rem;
  }

  .planet {
    width: 40px;
    height: 40px;
  }

  .moon {
    width: 15px;
    height: 15px;
  }

  .satellite {
    width: 15px;
    height: 6px;
  }
}
</style>
