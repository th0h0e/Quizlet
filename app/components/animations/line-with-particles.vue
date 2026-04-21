<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

function initLinesAnimation() {
  const container = containerRef.value
  if (!container) {
    console.warn('Container not found!')
    return
  }

  const lines = container.querySelectorAll('.line-with-particles')
  if (lines.length === 0) return

  lines.forEach((line) => {
    const particles = line.querySelectorAll('.line-particle')

    particles.forEach((particle) => {
      if (Math.random() > 0.6) {
        ;(particle as HTMLElement).style.display = 'none'
        return
      }

      const startX = Math.random() * container.offsetWidth
      const endX = Math.random() * container.offsetWidth
      const animationDelay = Math.random() * 6

      ;(particle as HTMLElement).style.setProperty('--start-x', `${startX}px`)
      ;(particle as HTMLElement).style.setProperty('--end-x', `${endX}px`)
      ;(particle as HTMLElement).style.animationDelay = `${animationDelay}s`
      ;(particle as HTMLElement).style.transform = `translateY(-50%) translateX(${startX}px)`
    })
  })
}

onMounted(async () => {
  await nextTick()
  initLinesAnimation()
})
</script>

<template>
  <div class="border-default bg-elevated h-80 w-full overflow-hidden rounded-lg border">
    <div class="h-full p-0">
      <div
        ref="containerRef"
        class="animation-container"
      >
        <div
          v-for="i in 70"
          :key="i"
          class="line-with-particles"
        >
          <span
            v-for="j in 15"
            :key="j"
            class="line-particle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.line-with-particles {
  height: 1px;
  background-color: var(--ui-primary);
  width: 100%;
  min-width: 200px;
  margin: 4px 0;
  position: relative;
  opacity: 0.8;
  display: block;
}

.line-particle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--ui-primary);
  border-radius: 50%;
  animation: particleMove 6s ease-in-out infinite;
}

@keyframes particleMove {
  0% {
    transform: translateY(-50%) translateX(var(--start-x));
  }
  50% {
    transform: translateY(-50%) translateX(var(--end-x));
  }
  100% {
    transform: translateY(-50%) translateX(var(--start-x));
  }
}
</style>
