<script setup lang="ts">
const isOpen = ref(false)

const route = useRoute()

function handleNavClick() {
  // Close menu — NuxtLink inside TimelineNavigation handles navigation
  isOpen.value = false
}
// Close menu on route change
watch(
  () => route.path,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <!-- Mobile Only -->
  <div class="md:hidden">
    <!-- Hamburger Button -->
    <UButton
      :icon="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
      color="neutral"
      variant="ghost"
      class="fixed top-6 right-6 z-100"
      aria-label="Toggle menu"
      @click="isOpen = !isOpen"
    />

    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
        @click="isOpen = false"
      />
    </Transition>

    <!-- Menu Panel -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 bottom-0 z-95 w-72 overflow-y-auto bg-neutral-800 shadow-2xl"
      >
        <div class="flex h-full flex-col p-6 pt-20">
          <TimelineNavigation @navigate="handleNavClick" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
