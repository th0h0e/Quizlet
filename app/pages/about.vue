<script setup lang="ts">
const { data: aboutContent } = await useAsyncData('about-services', () =>
  queryCollection('about')
    .order('order', 'ASC')
    .all()
)
</script>

<template>
  <UPage>
    <UPageBody>
      <ClientOnly>
        <AboutGrid
          v-if="aboutContent"
          :cards="aboutContent"
        />
      </ClientOnly>
    </UPageBody>
  </UPage>
</template>

<style scoped></style>
