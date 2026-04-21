<script setup lang="ts">
const { data: steps } = await useAsyncData('video-posts', () =>
  queryCollection('videoPosts').order('number', 'ASC').all()
)

const { containerRef, pathRef, cardRefs, svgWidth, svgHeight, pathData } = useVideoGrid()
const { activeIndex } = useActiveVideoPost(cardRefs)
</script>

<template>
  <UPage>
    <UPageBody>
      <div
        ref="containerRef"
        class="bg-elevated relative rounded-3xl p-6"
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

        <div class="relative z-10 space-y-6">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            :ref="cardRefs.set"
          >
            <VideoPost
              :number="step.number"
              :title="step.title"
              :description="step.description"
              :image="step.image"
              :active="index === activeIndex"
            />
          </div>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>

<style scoped>
.connector-line {
  stroke: var(--ui-primary);
}
</style>
