<script setup lang="ts">
defineProps<{
  to?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to || '/'"
    class="text-lg font-light tracking-wide whitespace-nowrap"
  >
    <span class="font-medium">Frequency</span> Digital
  </NuxtLink>
</template>
