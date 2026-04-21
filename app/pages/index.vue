<script setup lang="ts">
const { data: collections } = await useAsyncData('collections', () =>
  queryCollection('collections').all()
)

const { data: allCards } = await useAsyncData('all-cards', () =>
  queryCollection('vocabCards').all()
)

const collectionCardCounts = computed(() => {
  const counts: Record<string, number> = {}
  if (allCards.value) {
    for (const card of allCards.value) {
      const col = card.collection
      counts[col] = (counts[col] || 0) + 1
    }
  }
  return counts
})

useSeoMeta({
  title: 'My Collections',
  ogTitle: 'Quizlet — Vocabulary Cards'
})
</script>

<template>
  <div class="py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">
        My Collections
      </h1>
      <p class="text-muted mt-1">
        {{ collections?.length || 0 }} collections, {{ allCards?.length || 0 }} cards total
      </p>
    </div>

    <div
      v-if="collections && collections.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <CollectionCard
        v-for="collection in collections"
        :key="collection.id"
        :title="collection.title"
        :description="collection.description"
        :language="collection.language"
        :icon="collection.icon"
        :card-count="collectionCardCounts[collection.stem?.replace('collections/', '')] || 0"
        :slug="collection.stem?.replace('collections/', '') || collection.id"
      />
    </div>

    <div
      v-else
      class="text-center py-20"
    >
      <UIcon name="i-feather:book-open" class="size-16 text-muted mb-4 mx-auto" />
      <h2 class="text-xl font-semibold mb-2">
        No collections yet
      </h2>
      <p class="text-muted mb-6">
        Add collection YAML files to your <code class="text-primary">content/collections/</code> directory to get started.
      </p>
    </div>
  </div>
</template>
