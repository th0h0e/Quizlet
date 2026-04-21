<script setup lang="ts">
import { CustomEase } from 'gsap/CustomEase'
import { nextTick, onBeforeMount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

// Register CustomEase plugin before component mounts
onBeforeMount(() => {
  useGSAP().registerPlugin(CustomEase)
})

function initWaveAnimation() {
  // Query from template ref for proper Vue scoping
  const container = containerRef.value
  if (!container)
    return

  const svg = container.querySelector('svg')
  const wave = container.querySelector('.wave-polyline')
  const g = container.querySelector('g')

  if (!svg || !wave || !g)
    return

  // Get GSAP instance
  const gsap = useGSAP()

  // Animation parameters
  const width = 40 // Height of the wave (vertical orientation)
  const amplitude = 15 // Width of the wave oscillation
  const frequency = 30 // Controls the wave offset distribution
  const segments = 40 // Number of points that make up the wave
  const interval = width / segments // Spacing between points

  // Create a custom sinusoidal easing curve
  const sinus = CustomEase.create('sinus-wave', 'M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0')

  gsap.defaults({
    ease: 'sine.inOut'
  })

  // Center the wave horizontally
  gsap.set(g, {
    x: 20
  })

  // Create 100 SVG points and animate them to create the wave effect
  for (let i = 0; i <= segments; i++) {
    const norm = 1 - i / segments // Normalized position (1 to 0)
    const point = (wave as SVGPolylineElement).points.appendItem((svg as SVGSVGElement).createSVGPoint())

    // Position point vertically along the wave path
    point.y = i * interval
    // Position point horizontally using the custom ease curve
    point.x = (amplitude / 2) * sinus(norm)

    // Animate each point to oscillate horizontally, creating wave motion
    gsap
      .to(point, {
        duration: 0.3,
        x: -point.x, // Oscillate to the opposite side
        repeat: -1, // Repeat infinitely
        yoyo: true // Reverse direction each time
      })
      .progress(norm * frequency) // Stagger the animation based on position
  }
}

onMounted(async () => {
  // Wait for DOM to be ready before initializing animation
  await nextTick()
  initWaveAnimation()
})
</script>

<template>
  <div class="w-10 h-10">
    <div
      ref="containerRef"
      class="wave-animation-container"
    >
      <svg viewBox="0 0 40 40">
        <g>
          <line
            class="wave-line"
            y1="0"
            y2="100%"
          />
          <polyline class="wave-polyline" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.wave-animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.wave-animation-container svg {
  width: 40px;
  height: 40px;
  padding: 0;
}

.wave-animation-container svg line {
  stroke-width: 1 !important;
  stroke: var(--ui-primary) !important;
}

.wave-animation-container .wave-polyline {
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: var(--ui-primary);
}
</style>
