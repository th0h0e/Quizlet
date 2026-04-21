<script setup lang="ts">
defineProps({
  cards: {
    type: Array as () => Array<{
      title: string
      description: string
      image: string
      buttonText: string
      buttonLink?: string
      reverse: boolean
      order: number
    }>,
    required: true
  }
})
</script>

<template>
  <div class="space-y-6">
    <UPageCard
      v-for="card in cards"
      :key="card.order"
      :title="card.title"
      :description="card.description"
      orientation="horizontal"
      variant="outline"
      :reverse="card.reverse"
      :ui="{
        container: 'gap-x-16',
        title: 'text-2xl',
        description: card.reverse ? 'leading-relaxed' : 'whitespace-pre-line leading-relaxed'
      }"
    >
      <figure class="bg-muted flex aspect-square items-center justify-center rounded-xl p-12">
        <img
          :src="card.image"
          :alt="card.title"
          class="h-full w-full object-contain"
        >
      </figure>

      <template #footer>
        <UButton
          variant="outline"
          color="primary"
          size="sm"
          :to="card.buttonLink"
        >
          {{ card.buttonText }}
        </UButton>
      </template>
    </UPageCard>
  </div>
</template>
