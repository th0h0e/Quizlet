<script setup lang="ts">
defineProps<{
  logoVisible?: boolean
}>()
</script>

<template>
  <div class="relative z-10 flex h-[70vh] w-full justify-center">
    <div class="grid w-full max-w-7xl grid-cols-2 grid-rows-[35vh_35vh] text-neutral-200">
      <!-- Cell 1: Logo/Header (spans 2 columns) -->
      <div class="col-span-2 flex justify-center border pt-8">
        <AppLogo v-if="logoVisible" />
      </div>
      <!-- Cell 2: Empty left column -->
      <div class="border" />
      <!-- Cell 3: Animation (right column) -->
      <div class="flex items-end justify-end border px-4 pb-32 md:pb-16">
        <!-- Mobile: fills full width with 1:1 ratio -->
        <div class="-mb-32 aspect-square w-full border md:aspect-auto md:h-64 md:w-64">
          <AnimationsHeroAnimation class="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
