<script setup lang="ts">
defineProps<{
  label: string
  active: boolean
}>()
</script>

<template>
  <UBadge
    :color="active ? 'primary' : 'neutral'"
    :variant="active ? 'soft' : 'solid'"
    size="md"
    :ui="
      !active
        ? {
          base: 'bg-transparent ring-0 shadow-none text-neutral-200 transition-colors duration-200'
        }
        : { base: 'text-neutral-200 font-semibold transition-colors duration-200' }
    "
  >
    {{ label }}
  </UBadge>
</template>
