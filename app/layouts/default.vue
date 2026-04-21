<script setup lang="ts">

</script>

<template>
  <div class="bg-primary flex min-h-screen flex-col">
    <div class="h-70vh sticky top-0 z-0">
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
