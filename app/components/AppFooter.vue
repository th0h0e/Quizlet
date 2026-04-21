<script setup lang="ts">
function openLinkedIn() {
  navigateTo('https://www.linkedin.com/', { external: true, open: { target: '_blank' } })
}
</script>

<template>
  <footer class="bg-primary text-inverted p-4">
    <div class="grid grid-cols-3 items-center">
      <!-- Left Column (Empty) -->
      <div />

      <!-- Center Column (Company Name) -->
      <div class="flex justify-center">
        <AppLogo />
      </div>

      <!-- Right Column (Buttons) -->
      <nav class="hidden items-center justify-end gap-4 sm:flex">
        <div class="bg-elevated rounded-full">
          <UButton
            icon="feather:hash"
            color="primary"
            variant="ghost"
            :ui="{ leadingIcon: 'text-primary' }"
            aria-label="Your button description"
            @click="openLinkedIn"
          />
        </div>
        <!-- Dark/Light Mode Toggle -->
        <div class="bg-elevated rounded-full">
          <AppColorModeButton />
        </div>
      </nav>
    </div>
  </footer>
</template>

<style scoped></style>
