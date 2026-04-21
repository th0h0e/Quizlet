<script setup lang="ts">
const props = defineProps<{
  term: string
  definition: string
  pinyin?: string
}>()

const isFlipped = ref(false)

function flip() {
  isFlipped.value = !isFlipped.value
}

function reset() {
  isFlipped.value = false
}

defineExpose({ reset })
</script>

<template>
  <div class="flip-card w-full max-w-lg mx-auto" style="height: 280px">
    <div
      class="flip-card-inner relative w-full h-full"
      :class="{ flipped: isFlipped }"
      @click="flip"
    >
      <!-- Front -->
      <div class="flip-card-front absolute inset-0">
        <UCard
          variant="outline"
          class="h-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <p class="text-4xl font-bold mb-2">
            {{ term }}
          </p>
          <p v-if="pinyin" class="text-lg text-muted">
            {{ pinyin }}
          </p>
          <p class="text-xs text-dimmed mt-4">
            Tap to reveal
          </p>
        </UCard>
      </div>

      <!-- Back -->
      <div class="flip-card-back absolute inset-0">
        <UCard
          variant="outline"
          class="h-full flex flex-col items-center justify-center cursor-pointer select-none bg-primary/5"
        >
          <p class="text-2xl font-semibold text-center">
            {{ definition }}
          </p>
          <p class="text-xs text-dimmed mt-4">
            Tap to flip back
          </p>
        </UCard>
      </div>
    </div>
  </div>
</template>
