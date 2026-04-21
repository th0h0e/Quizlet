<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const path = route.params.slug
  return Array.isArray(path) ? path.join('/') : path
})

const { data: post } = await useAsyncData(
  () => `video-post-${slug.value}`,
  () => queryCollection('videoPosts').path(`/video-posts/${slug.value}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Video post not found', fatal: true })
}

const { data: surround } = await useAsyncData(
  () => `video-post-${slug.value}-surround`,
  () => {
    return queryCollectionItemSurroundings('videoPosts', route.path, {
      fields: ['description']
    })
  }
)

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: post.value.image
})
</script>

<template>
  <UPage v-if="post">
    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <NuxtLink
          to="/"
          class="text-sm text-dimmed hover:text-default transition-colors"
        >
          ← Back to Home
        </NuxtLink>
      </template>
    </UPageHeader>

    <UPageBody>
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-96 object-cover rounded-2xl mb-6"
      >
      <div class="flex items-center gap-4 mb-4">
        <span class="bg-primary text-inverted px-3 py-1 rounded-full text-sm font-medium">
          Step {{ post.number }}
        </span>
        <span
          v-if="post.duration"
          class="text-dimmed text-sm"
        >
          {{ post.duration }}
        </span>
      </div>

      <ContentRenderer :value="post" />

      <section
        v-if="post.videoUrl"
        class="mt-8 mb-8"
      >
        <a
          :href="post.videoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-accent text-inverted px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Watch Video
          <span>→</span>
        </a>
      </section>

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="post?.body?.toc?.links?.length"
      #right
    >
      <UContentToc :links="post.body?.toc?.links" />
    </template>
  </UPage>
</template>
