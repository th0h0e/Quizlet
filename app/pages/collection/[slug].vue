<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: collection } = await useAsyncData(`collection-${slug}`, () =>
  queryCollection('collections').where('stem', '=', `collections/${slug}`).first()
)

const { data: cards } = await useAsyncData(`cards-${slug}`, () =>
  queryCollection('vocabCards').where('collection', '=', slug).order('order', 'ASC').all()
)

useSeoMeta({
  title: collection.value?.title || 'Collection',
  ogTitle: `${collection.value?.title || 'Collection'} — Quizlet`
})
</script>

<template>
  <div class="py-12">
    <div v-if="collection">
      <!-- Header -->
      <div class="mb-8">
        <UButton
          to="/"
          label="Back to Collections"
          icon="i-feather:arrow-left"
          variant="ghost"
          color="neutral"
          class="mb-4"
        />

        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-3xl">{{ collection.icon }}</span>
              <h1 class="text-3xl font-bold">
                {{ collection.title }}
              </h1>
            </div>
            <p class="text-muted">
              {{ collection.description }}
            </p>
            <div class="flex items-center gap-3 mt-3">
              <UBadge :label="collection.language" variant="subtle" color="primary" />
              <UBadge :label="`${cards?.length || 0} cards`" variant="subtle" />
            </div>
          </div>

          <UButton
            v-if="cards && cards.length > 0"
            :to="`/study/${slug}`"
            label="Study"
            icon="i-feather:layers"
            color="primary"
          />
        </div>
      </div>

      <!-- Cards Grid -->
      <div
        v-if="cards && cards.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <VocabCard
          v-for="card in cards"
          :key="card.id"
          :card="card"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20"
      >
        <UIcon name="i-feather:layers" class="size-16 text-muted mb-4 mx-auto" />
        <h2 class="text-xl font-semibold mb-2">
          No cards yet
        </h2>
        <p class="text-muted">
          Add vocabulary YAML files to <code class="text-primary">content/vocab/{{ slug }}/</code> to populate this collection.
        </p>
      </div>
    </div>

    <!-- Collection Not Found -->
    <div v-else class="text-center py-20">
      <UIcon name="i-feather:frown" class="size-16 text-muted mb-4 mx-auto" />
      <h2 class="text-xl font-semibold mb-2">
        Collection not found
      </h2>
      <UButton to="/" label="Go home" icon="i-feather:home" />
    </div>
  </div>
</template>
