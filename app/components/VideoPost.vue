<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  image: string
  number?: number
  to?: string
  active?: boolean
}>()

const slug = computed(() => {
  if (props.to) return props.to
  return `/video-posts/${props.title.toLowerCase().replace(/\s+/g, '-')}`
})

const isMobile = useMediaQuery('(max-width: 1023px)')
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})
const shouldBlur = computed(() => hydrated.value && isMobile.value && !props.active)
</script>

<template>
  <NuxtLink :to="slug">
    <UBlogPost
      :title="title"
      :description="description"
      orientation="horizontal"
      variant="outline"
      :ui="{
        root: 'mb-6 hover:ring-accent transition-colors',
        header: 'aspect-auto pointer-events-auto'
      }"
    >
      <template #header>
        <div class="aspect-video overflow-hidden rounded-sm p-3">
          <div class="group/img relative h-full w-full overflow-hidden rounded-sm">
            <img
              :src="image"
              :alt="title"
              class="h-full w-full rounded-sm object-cover"
            >
            <div
              class="pointer-events-none absolute inset-0 rounded-sm backdrop-blur-sm transition-opacity duration-300"
              :class="shouldBlur ? 'opacity-100' : 'opacity-0 group-hover/img:opacity-100'"
            />
            <div
              class="pointer-events-none absolute top-2 left-3 z-10 transition-opacity duration-300"
              :class="shouldBlur ? 'opacity-100' : 'opacity-0 group-hover/img:opacity-100'"
            >
              <UBadge color="primary">
                {{ number }}
              </UBadge>
            </div>
          </div>
        </div>
      </template>
    </UBlogPost>
  </NuxtLink>
</template>
