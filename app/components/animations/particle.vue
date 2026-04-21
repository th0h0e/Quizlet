<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

function initParticleAnimation() {
  const container = containerRef.value
  if (!container) return

  // Find all particles in the template
  const particleElements = container.querySelectorAll<HTMLElement>('.particle')
  if (particleElements.length === 0) return

  const gsap = useGSAP()

  interface ParticleData {
    element: HTMLElement
    baseX: number
    baseY: number
    angle: number
    cosAngle: number
    sinAngle: number
    baseRadius: number
    breathingOffset: number
    breathingSpeed: number
    breathingRadius: number
  }

  const particles: ParticleData[] = []
  const initialCenterX = container.offsetWidth / 2
  const initialCenterY = container.offsetHeight / 2
  const initialMaxRadius = Math.min(container.offsetWidth, container.offsetHeight) * 0.34375

  let lastWidth = container.offsetWidth
  let lastHeight = container.offsetHeight
  let currentCenterX = initialCenterX
  let currentCenterY = initialCenterY
  let currentMaxRadius = initialMaxRadius
  let scale = 1

  // Set initial positions for all particles
  particleElements.forEach((particle) => {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * initialMaxRadius
    const x = initialCenterX + Math.cos(angle) * radius
    const y = initialCenterY + Math.sin(angle) * radius

    gsap.set(particle, {
      left: `${x}px`,
      top: `${y}px`
    })

    particles.push({
      element: particle,
      baseX: x,
      baseY: y,
      angle,
      cosAngle: Math.cos(angle),
      sinAngle: Math.sin(angle),
      baseRadius: radius,
      breathingOffset: Math.random() * Math.PI * 2,
      breathingSpeed: 0.5 + Math.random() * 0.5,
      breathingRadius: 20 + Math.random() * 40
    })
  })

  // Animation loop using requestAnimationFrame
  const animateParticles = () => {
    const width = container.offsetWidth
    const height = container.offsetHeight

    // Handle container resize
    if (width !== lastWidth || height !== lastHeight) {
      lastWidth = width
      lastHeight = height
      currentCenterX = width / 2
      currentCenterY = height / 2
      currentMaxRadius = Math.min(width, height) * 0.34375
      scale = currentMaxRadius / initialMaxRadius
    }

    const baseTime = Date.now() * 0.001
    const time08 = baseTime * 0.8

    particles.forEach((particle) => {
      const time = baseTime * particle.breathingSpeed + particle.breathingOffset

      // Calculate base position (circular arrangement scaled to container)
      const scaledBaseRadius = particle.baseRadius * scale
      const scaledBaseX = currentCenterX + particle.cosAngle * scaledBaseRadius
      const scaledBaseY = currentCenterY + particle.sinAngle * scaledBaseRadius

      // Apply breathing motion (sinusoidal)
      const breathingX = Math.cos(time) * particle.breathingRadius * 0.5
      const breathingY = Math.sin(time08) * particle.breathingRadius * 0.3

      // Final position
      const newX = scaledBaseX + breathingX
      const newY = scaledBaseY + breathingY

      // Clamp positions to container bounds
      const clampedX = Math.max(0, Math.min(width - 8, newX))
      const clampedY = Math.max(0, Math.min(height - 8, newY))

      particle.element.style.left = `${clampedX}px`
      particle.element.style.top = `${clampedY}px`

      // Animate opacity with breathing effect
      const opacity = 0.4 + Math.sin(time * 0.6) * 0.3
      particle.element.style.opacity = opacity.toString()
    })

    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

onMounted(async () => {
  await nextTick()
  initParticleAnimation()
})
</script>

<template>
  <div class="border-default bg-elevated h-80 w-full overflow-hidden rounded-lg border">
    <div class="h-full p-0">
      <div
        ref="containerRef"
        class="animation-container"
      >
        <!-- 100 particles that will be animated -->
        <div
          v-for="i in 100"
          :key="i"
          class="particle"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--ui-primary);
  border-radius: 50%;
  opacity: 0.7;
}
</style>
