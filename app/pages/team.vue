<script setup lang="ts">
const { data: teamMembers } = await useAsyncData('team', () =>
  queryCollection('team')
    .order('order', 'ASC')
    .all()
)
</script>

<template>
  <UPage>
    <UPageBody>
      <TeamGrid
        v-if="teamMembers?.length"
        :members="teamMembers"
      />
    </UPageBody>
  </UPage>
</template>

<style scoped></style>
