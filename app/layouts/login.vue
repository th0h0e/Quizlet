<script setup lang="ts">
const toast = useToast()

function testSuccess() {
  toast.add({
    title: 'Success!',
    description: 'Your action was completed successfully.',
    color: 'success',
    icon: 'i-ph-check-circle'
  })
}

function testInfo() {
  toast.add({
    title: 'Information',
    description: 'This is an informational message.',
    color: 'info',
    icon: 'i-ph-info'
  })
}

function testError() {
  toast.add({
    title: 'Error!',
    description: 'Something went wrong. Please try again.',
    color: 'error',
    icon: 'i-ph-x-circle'
  })
}
</script>

<template>
  <div class="relative h-dvh w-full">
    <slot />

    <!-- Test Toast Buttons -->
    <div class="absolute bottom-6 left-6 flex flex-col gap-2">
      <UButton
        size="sm"
        variant="solid"
        color="success"
        @click="testSuccess"
      >
        Test Success
      </UButton>
      <UButton
        size="sm"
        variant="solid"
        color="info"
        @click="testInfo"
      >
        Test Info
      </UButton>
      <UButton
        size="sm"
        variant="solid"
        color="error"
        @click="testError"
      >
        Test Error
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
