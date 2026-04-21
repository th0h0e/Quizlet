<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#6366f1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Quizlet',
  titleTemplate: '%s - Quizlet',
  ogSiteName: 'Quizlet'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="primary" />

    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-feather:book-open" class="size-6 text-primary" />
          <span class="text-lg font-bold">Quizlet</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-sm text-muted">Quizlet — Vocabulary Cards</span>
      </template>
    </UFooter>
  </UApp>
</template>
