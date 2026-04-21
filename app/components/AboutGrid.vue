<script setup lang="ts">
const props = defineProps({
  cards: {
    type: Array as () => Array<{
      title: string
      description: string
      animationType: 'particles' | 'cards' | 'linesParticles' | 'simpleLines' | 'disks'
      row: number
      column: number
    }>,
    required: true
  }
})

const { containerRef, pathRef, cardRefs, svgWidth, svgHeight, pathData } = useAboutGridPath()

const animationComponents = {
  particles: resolveComponent('AnimationsParticle'),
  cards: resolveComponent('AnimationsCardStack'),
  linesParticles: resolveComponent('AnimationsLineWithParticles'),
  simpleLines: resolveComponent('AnimationsWaveAnimation'),
  disks: resolveComponent('AnimationsDisk')
}

function getAnimationComponent(type: keyof typeof animationComponents) {
  return animationComponents[type] || null
}

const ctaRow = computed(() => {
  if (!props.cards.length) return 1
  const maxRow = Math.max(...props.cards.map(card => card.row))
  return maxRow + 1
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <!-- SVG Layer for connector line -->
    <svg
      class="pointer-events-none absolute top-0 left-0"
      style="z-index: 0"
      :width="svgWidth"
      :height="svgHeight"
    >
      <path
        v-if="pathData"
        ref="pathRef"
        :d="pathData"
        class="connector-line"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="square"
        stroke-linejoin="miter"
      />
    </svg>

    <!-- About Grid -->
    <div class="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Cards -->
      <div
        v-for="card in cards"
        :key="card.title"
        :ref="cardRefs.set"
        :class="card.column === 1 ? 'md:col-start-1' : 'md:col-start-2'"
        :style="{ gridRow: card.row }"
      >
        <UCard class="overflow-hidden shadow-md">
          <template #header>
            <figure class="flex h-80 w-full items-center justify-center">
              <ClientOnly>
                <component :is="getAnimationComponent(card.animationType)" />
              </ClientOnly>
            </figure>
          </template>

          <h2 class="text-lg font-semibold">
            {{ card.title }}
          </h2>
          <p class="text-muted mt-2">
            {{ card.description }}
          </p>
        </UCard>
      </div>

      <!-- Call to Action -->
      <div
        class="about-cta flex flex-col justify-center py-40 md:col-start-2"
        :style="{ gridRow: ctaRow }"
      >
        <h2 class="text-primary mb-4 text-xl font-semibold">
          Questions or thoughts?<br>
          We'd love to connect and<br>
          elaborate in a personal talk.
        </h2>
        <UButton
          variant="outline"
          size="md"
          style="width: fit-content"
        >
          Get in Touch
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.connector-line {
  stroke: var(--ui-primary);
}
</style>
