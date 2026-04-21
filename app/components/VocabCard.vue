<script setup lang="ts">
const props = defineProps<{
  card: {
    id: string
    term: string
    definition: string
    pinyin?: string
    example?: string
    tags?: string[]
    difficulty?: string
    collection: string
    stem: string
  }
}>()

const difficultyColor = computed(() => {
  switch (props.card.difficulty) {
    case 'beginner': return 'success'
    case 'intermediate': return 'warning'
    case 'advanced': return 'error'
    default: return 'neutral'
  }
})
</script>

<template>
  <UCard variant="subtle" class="h-full">
    <template #header>
      <div>
        <h3 class="text-2xl font-bold">
          {{ card.term }}
        </h3>
        <p v-if="card.pinyin" class="text-sm text-muted mt-1">
          {{ card.pinyin }}
        </p>
      </div>
    </template>

    <p class="text-base">
      {{ card.definition }}
    </p>

    <template #footer>
      <div class="flex flex-col gap-2">
        <p v-if="card.example" class="text-sm italic text-muted">
          "{{ card.example }}"
        </p>
        <div class="flex flex-wrap items-center gap-1">
          <UBadge
            v-for="tag in card.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
            size="xs"
          />
          <UBadge
            v-if="card.difficulty"
            :label="card.difficulty"
            :color="difficultyColor"
            variant="subtle"
            size="xs"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
