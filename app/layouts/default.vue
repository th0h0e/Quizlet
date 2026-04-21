<script setup lang="ts">
const route = useRoute()

const pageName = computed(() => {
  const name = route.name as string
  if (name === 'index') return 'home'
  return name
})

const { data: heroConfig } = await useAsyncData(
  () => `hero-${pageName.value}`,
  () => queryCollection('heros').where('stem', '=', `heros/${pageName.value}`).first()
)

// Ensure we pass null instead of undefined to Hero component
const heroConfigValue = computed(() => heroConfig.value ?? null)
</script>

<template>
  <div class="bg-primary flex min-h-screen flex-col">
    <div class="h-70vh sticky top-0 z-0">
      <Hero :config="heroConfigValue" />
    </div>

    <div class="main-content-wrapper bg-default relative z-10 -mt-20 overflow-hidden rounded-3xl">
      <UContainer>
        <slot />
      </UContainer>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.main-content-wrapper {
  animation: slide-up 0.5s ease-out forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
