<script setup lang="ts">
defineProps({
  members: {
    type: Array as () => Array<{
      name: string
      quote: string
      image: string
    }>,
    required: true
  }
})

const { containerRef, pathRef, cardRefs, svgWidth, svgHeight, pathData } = useTeamGrid()
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
  >
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

    <UPageGrid class="relative z-10">
      <div
        v-for="(member, index) in members"
        :key="index"
        :ref="cardRefs.set"
      >
        <UPageCard
          orientation="vertical"
          variant="outline"
          :ui="{
            container: 'p-4',
            title: 'text-base font-medium mt-4',
            description: 'text-sm italic'
          }"
        >
          <template #header>
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full rounded-xl"
              style="aspect-ratio: 5/4; object-fit: cover"
            >
          </template>

          <template #title>
            {{ member.name }}
          </template>

          <template #description>
            {{ member.quote }}
          </template>
        </UPageCard>
      </div>
    </UPageGrid>
  </div>
</template>

<style scoped>
.connector-line {
  stroke: var(--ui-primary);
}
</style>
