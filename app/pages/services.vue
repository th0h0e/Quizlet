<script setup lang="ts">
const { data: services } = await useAsyncData('services', () =>
  queryCollection('services').order('order', 'ASC').all()
)

const { data: pricingPlans } = await useAsyncData('pricing', () =>
  queryCollection('pricing').order('order', 'ASC').all()
)
</script>

<template>
  <UPage>
    <UPageBody>
      <ServiceCards
        v-if="services"
        :services="services"
      />

      <PricingCards
        v-if="pricingPlans"
        :plans="pricingPlans"
      />
    </UPageBody>
  </UPage>
</template>
