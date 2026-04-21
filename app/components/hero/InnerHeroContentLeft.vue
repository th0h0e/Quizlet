<script setup lang="ts">
defineProps<{
  logoVisible?: boolean
  title?: string
  paragraph?: string
}>()
</script>

<template>
  <div class="relative z-10 flex h-[70vh] w-full justify-center">
    <div
      class="grid w-full max-w-7xl grid-cols-1 grid-rows-[35vh_35vh] text-neutral-200 md:grid-cols-2"
    >
      <!-- Cell 1: Logo/Header (spans 2 columns on tablet/desktop) -->
      <div class="col-span-1 flex justify-center border pt-8 md:col-span-2">
        <AppLogo v-if="logoVisible" />
      </div>
      <!-- Cell 2: Content (bottom row on mobile, left column on tablet/desktop) -->
      <div class="flex items-end border px-4 pb-32 md:pb-16 md:pl-4">
        <div class="w-full max-w-xl border text-left md:mb-8">
          <h2 class="mb-4 text-4xl font-bold">
            {{ title }}
          </h2>
          <p
            v-if="paragraph"
            class="text-base leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
      <!-- Cell 3: Empty (only visible on tablet/desktop) -->
      <div class="hidden border md:block" />
    </div>
  </div>
</template>
