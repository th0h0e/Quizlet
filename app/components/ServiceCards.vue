<script setup lang="ts">
defineProps({
  services: {
    type: Array as () => Array<{
      title: string
      description: string
      textSectionTitle: string
      textSectionDescription: string
      image: string
      avatarLabel: string
      avatarColor: 'primary' | 'secondary' | 'accent'
      primaryButtonText: string
      secondaryButtonText: string
    }>,
    required: true
  }
})

const { containerRef, pathRef, cardRefs, svgWidth, svgHeight, pathData } = useServiceGrid()
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <!-- SVG Layer -->
    <svg
      class="pointer-events-none absolute top-0 left-0"
      style="z-index: -1"
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

    <!-- Services Grid -->
    <div class="flex flex-col gap-8">
      <div
        v-for="(service, index) in services"
        :key="service.title"
        :ref="cardRefs.set"
        class="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <!-- Content Half (alternates left/right) -->
        <div
          class="flex flex-col gap-6"
          :class="{ 'md:order-2': index % 2 === 1 }"
        >
          <!-- UCard Section -->
          <UCard class="h-fit">
            <template #header>
              <UAvatar
                :text="service.avatarLabel"
                :color="service.avatarColor"
                size="sm"
              />
            </template>

            <figure>
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full rounded-xl"
                style="aspect-ratio: 16/9; object-fit: cover"
              >
            </figure>

            <h2 class="mt-4 text-lg font-semibold">
              {{ service.title }}
            </h2>
            <p class="text-muted mt-2 text-base">
              {{ service.description }}
            </p>

            <template #footer>
              <div class="flex gap-2">
                <UButton
                  color="primary"
                  size="sm"
                >
                  {{ service.primaryButtonText }}
                </UButton>
                <UButton
                  variant="outline"
                  size="sm"
                >
                  {{ service.secondaryButtonText }}
                </UButton>
              </div>
            </template>
          </UCard>

          <!-- Text Section (below UCard) -->
          <div class="service-text bg-default rounded-lg p-4">
            <UPageFeature
              :title="service.textSectionTitle"
              :description="service.textSectionDescription"
            />
          </div>
        </div>

        <!-- Empty Half - MUST BE INSIDE THE LOOP -->
        <div :class="{ 'md:order-1': index % 2 === 1 }">
          <!-- Intentionally empty -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.connector-line {
  stroke: var(--ui-primary);
}
</style>
