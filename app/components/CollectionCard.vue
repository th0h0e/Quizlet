<script setup lang="ts">
defineProps<{
  title: string
  description: string
  language: string
  icon?: string
  cardCount: number
  slug: string
}>()
</script>

<template>
  <NuxtLink :to="`/collection/${slug}`">
    <UCard
      variant="subtle"
      class="hover:ring-primary transition-all duration-200 cursor-pointer h-full"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ icon || '📚' }}</span>
            <div>
              <h3 class="font-semibold text-highlighted">
                {{ title }}
              </h3>
              <p class="text-xs text-muted">
                {{ language }}
              </p>
            </div>
          </div>
          <UIcon name="i-feather:chevron-right" class="size-5 text-muted" />
        </div>
      </template>

      <p class="text-sm text-muted line-clamp-2">
        {{ description }}
      </p>

      <template #footer>
        <div class="flex items-center gap-2">
          <UBadge
            :label="`${cardCount} cards`"
            variant="subtle"
            color="primary"
            size="xs"
          />
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
