<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})
</script>

<template>
  <UApp>
    <UContainer class="flex min-h-screen flex-col items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-primary mb-4">
          {{ error.statusCode }}
        </h1>
        <p class="text-lg text-muted mb-8">
          {{ error.statusMessage || 'Something went wrong' }}
        </p>
        <UButton to="/" label="Go home" icon="i-feather:home" />
      </div>
    </UContainer>
  </UApp>
</template>
