<script setup lang="ts">
defineProps<{
  logoVisible?: boolean
  title?: string
  paragraph?: string
}>()
</script>

<template>
  <div class="relative z-10 flex h-[70vh] w-full justify-center">
    <div class="grid w-full max-w-7xl grid-cols-1 grid-rows-3 text-neutral-200 md:grid-cols-2">
      <!-- Row 1: Logo/Header -->
      <div class="col-span-1 flex justify-center border pt-8 md:col-span-2">
        <AppLogo v-if="logoVisible" />
      </div>
      <!-- Row 2: Centered Title -->
      <div class="col-span-1 flex items-center justify-center border md:col-span-2">
        <h2 class="text-center text-5xl font-bold md:text-6xl">
          {{ title }}
        </h2>
      </div>
      <!-- Row 3: Empty left, Paragraph right -->
      <div class="hidden border md:block" />
      <div class="flex items-end border px-4 pb-32 md:pr-4 md:pb-16">
        <div class="w-full max-w-xl border md:mb-8">
          <p
            v-if="paragraph"
            class="text-base leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
