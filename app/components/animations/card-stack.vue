<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

function initPlayingCardsAnimation() {
  const container = containerRef.value
  if (!container) return

  const playingCards = [...container.querySelectorAll('.playing-card')]
  if (playingCards.length === 0) return

  const gsap = useGSAP()

  interface RelativePosition {
    xOffset: number
    yOffset: number
    rotation: number
  }

  const originalPositionsRelative: RelativePosition[] = [
    { xOffset: -60, yOffset: 30, rotation: -30 },
    { xOffset: -40, yOffset: 0, rotation: -20 },
    { xOffset: -20, yOffset: -15, rotation: -10 },
    { xOffset: 0, yOffset: -20, rotation: 0 },
    { xOffset: 20, yOffset: -15, rotation: 10 },
    { xOffset: 40, yOffset: 0, rotation: 20 },
    { xOffset: 60, yOffset: 30, rotation: 30 }
  ]

  const getAbsolutePositions = (relativePositions: RelativePosition[]) => {
    const centerX = (container as HTMLElement).offsetWidth / 2
    const centerY = (container as HTMLElement).offsetHeight / 2 - 10
    const cardWidth = (container as HTMLElement).offsetWidth * 0.3
    const cardHeight = cardWidth * (4 / 3)

    return relativePositions.map(pos => ({
      left: `${centerX + pos.xOffset - cardWidth / 2}px`,
      top: `${centerY + pos.yOffset - cardHeight / 2}px`,
      rotation: pos.rotation
    }))
  }

  const initialPositions = getAbsolutePositions(originalPositionsRelative)
  playingCards.forEach((card, index) => {
    if (initialPositions[index]) {
      gsap.set(card, {
        left: initialPositions[index].left,
        top: initialPositions[index].top,
        rotation: initialPositions[index].rotation
      })
    }
  })

  const resizeHandlerCards = () => {
    const newPositions = getAbsolutePositions(originalPositionsRelative)
    playingCards.forEach((card, index) => {
      if (newPositions[index]) {
        gsap.set(card, {
          left: newPositions[index].left,
          top: newPositions[index].top,
          rotation: newPositions[index].rotation
        })
      }
    })
  }

  window.addEventListener('resize', resizeHandlerCards)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandlerCards)
  })
}

onMounted(async () => {
  await nextTick()
  initPlayingCardsAnimation()
})
</script>

<template>
  <div class="border-default bg-elevated h-80 w-full overflow-hidden rounded-lg border">
    <div class="h-full p-0">
      <div
        ref="containerRef"
        class="animation-container"
      >
        <div class="card-stack">
          <div class="playing-card" />
          <div class="playing-card" />
          <div class="playing-card" />
          <div class="playing-card" />
          <div class="playing-card" />
          <div class="playing-card" />
          <div class="playing-card" />
        </div>
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

.card-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.playing-card {
  position: absolute;
  width: 30%;
  aspect-ratio: 3/4;
  background: linear-gradient(135deg, var(--ui-primary) 0%, var(--ui-color-neutral-100) 100%);
  border-radius: 16px;
  transform-origin: center center;
  transition:
    transform 0.3s ease-out,
    box-shadow 0.3s ease-out;
  cursor: pointer;
}

.playing-card:hover {
  transform: translateY(-15px) translateZ(0);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--ui-color-neutral-500) 15%, transparent);
  z-index: 10;
}
</style>
