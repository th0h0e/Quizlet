<script setup lang="ts">
defineProps<{
  logoVisible?: boolean
  title?: string
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
      <!-- Cell 2: Title (stacked on mobile, side by side on tablet/desktop) -->
      <div class="col-span-1 flex flex-col justify-end border px-4 pb-32 md:col-span-2 md:pb-16">
        <h2 class="border text-left text-5xl font-bold md:mb-8 md:text-6xl">
          {{ title }}
        </h2>
      </div>
    </div>
  </div>
</template>
