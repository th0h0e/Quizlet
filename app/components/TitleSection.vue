<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  variant: {
    type: String as () => 'subtle' | 'solid' | 'outline' | 'soft' | 'ghost' | 'gradient',
    default: 'subtle'
  },
  links: {
    type: Array as () => Array<{
      label: string
      color?: 'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
      variant?: 'solid' | 'outline' | 'subtle' | 'soft' | 'ghost' | 'link'
      trailingIcon?: string
      icon?: string
      to?: string
    }>,
    default: () => []
  }
})
</script>

<template>
  <UPageCTA
    :title="title"
    :description="description"
    :variant="variant"
    :links="links"
  />
</template>
