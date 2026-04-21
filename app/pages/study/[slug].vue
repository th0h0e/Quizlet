<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: collection } = await useAsyncData(`study-collection-${slug}`, () =>
  queryCollection('collections').where('stem', '=', `collections/${slug}`).first()
)

const { data: cards } = await useAsyncData(`study-cards-${slug}`, () =>
  queryCollection('vocabCards').where('collection', '=', slug).order('order', 'ASC').all()
)

const currentIndex = ref(0)
const flashCardRef = ref<{ reset: () => void } | null>(null)

const currentCard = computed(() => {
  if (!cards.value || cards.value.length === 0) return null
  return cards.value[currentIndex.value]
})

const isFinished = computed(() => {
  return currentIndex.value >= (cards.value?.length || 0)
})

function nextCard() {
  currentIndex.value++
  nextTick(() => {
    flashCardRef.value?.reset()
  })
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    nextTick(() => {
      flashCardRef.value?.reset()
    })
  }
}

function restart() {
  currentIndex.value = 0
  nextTick(() => {
    flashCardRef.value?.reset()
  })
}

const progress = computed(() => {
  if (!cards.value || cards.value.length === 0) return 0
  return Math.round(((currentIndex.value + 1) / cards.value.length) * 100)
})

useSeoMeta({
  title: `Study — ${collection.value?.title || 'Collection'}`,
  ogTitle: `Study — ${collection.value?.title || 'Collection'} - Quizlet`
})
</script>

<template>
  <div class="py-12">
    <div v-if="collection && cards && cards.length">
      <!-- Header -->
      <div class="mb-8">
        <UButton
          :to="`/collection/${slug}`"
          label="Back to Collection"
          icon="i-feather:arrow-left"
          variant="ghost"
          color="neutral"
          class="mb-4"
        />

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">
              Study: {{ collection.title }}
            </h1>
            <p class="text-muted">
              Card {{ currentIndex + 1 }} of {{ cards.length }}
            </p>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="mt-4 w-full bg-elevated rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>

      <!-- Flashcard -->
      <div v-if="!isFinished" class="flex flex-col items-center gap-8">
        <FlashCard
          v-if="currentCard"
          ref="flashCardRef"
          :term="currentCard.term"
          :definition="currentCard.definition"
          :pinyin="currentCard.pinyin"
        />

        <!-- Navigation -->
        <div class="flex items-center gap-4">
          <UButton
            icon="i-feather:arrow-left"
            label="Previous"
            variant="outline"
            :disabled="currentIndex === 0"
            @click="prevCard"
          />
          <UButton
            icon="i-feather:arrow-right"
            label="Next"
            trailing
            color="primary"
            @click="nextCard"
          />
        </div>

        <!-- Keyboard shortcuts hint -->
        <p class="text-xs text-dimmed">
          Click the card to flip it
        </p>
      </div>

      <!-- Finished State -->
      <div v-else class="text-center py-20">
        <UIcon name="i-feather:check-circle" class="size-16 text-success mb-4 mx-auto" />
        <h2 class="text-2xl font-bold mb-2">
          Great job!
        </h2>
        <p class="text-muted mb-6">
          You've reviewed all {{ cards.length }} cards in this collection.
        </p>
        <div class="flex justify-center gap-3">
          <UButton label="Study Again" icon="i-feather:refresh-cw" @click="restart" />
          <UButton
            :to="`/collection/${slug}`"
            label="Back to Collection"
            icon="i-feather:arrow-left"
            variant="outline"
          />
        </div>
      </div>
    </div>

    <!-- No cards -->
    <div v-else class="text-center py-20">
      <UIcon name="i-feather:layers" class="size-16 text-muted mb-4 mx-auto" />
      <h2 class="text-xl font-semibold mb-2">
        No cards to study
      </h2>
      <p class="text-muted mb-6">
        Add some cards to this collection first.
      </p>
      <UButton :to="`/collection/${slug}`" label="Go to Collection" icon="i-feather:arrow-left" />
    </div>
  </div>
</template>
