<script setup lang="ts">
defineProps({
  plans: {
    type: Array as () => Array<{
      title: string
      subtitle: string
      price: string
      priceDescription: string
      features: Array<{ text: string, included: boolean }>
      buttonText: string
      buttonLink?: string
      buttonVariant: 'outline' | 'solid' | 'subtle' | 'soft' | 'ghost' | 'link'
      buttonColor: 'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
      highlighted: boolean
      order: number
    }>,
    required: true
  }
})
</script>

<template>
  <section>
    <h2 class="mb-8 text-2xl font-semibold">
      Simple, Transparent Pricing
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <UCard
        v-for="plan in plans"
        :key="plan.order"
        :ui="{ body: 'p-6' }"
      >
        <h3 class="text-lg font-semibold">
          {{ plan.title }}
        </h3>
        <p class="text-muted mt-1 text-sm">
          {{ plan.subtitle }}
        </p>
        <USeparator class="my-4" />
        <div class="my-6">
          <div :class="plan.highlighted ? 'text-4xl font-bold' : 'text-3xl font-semibold'">
            {{ plan.price }}
          </div>
          <p class="text-muted mt-2 text-sm">
            {{ plan.priceDescription }}
          </p>
        </div>
        <ul class="mb-6 space-y-2">
          <li
            v-for="(feature, index) in plan.features"
            :key="index"
            :class="feature.included ? '' : 'text-muted'"
            class="flex items-center gap-2"
          >
            <UIcon
              :name="feature.included ? 'feather:check' : 'feather:x'"
              :class="feature.included ? 'text-success' : ''"
              class="size-4"
            />
            {{ feature.text }}
          </li>
        </ul>
        <UButton
          :variant="plan.buttonVariant"
          :color="plan.buttonColor"
          :to="plan.buttonLink"
          block
        >
          {{ plan.buttonText }}
        </UButton>
      </UCard>
    </div>
  </section>
</template>
