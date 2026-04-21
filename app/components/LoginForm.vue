<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

type Schema = z.output<typeof schema>

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true
  }
]

const isSubmitting = ref(false)

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md flex flex-col items-center">
      <!-- UCard Wrapper -->
      <div class="aspect-square">
        <UCard
          variant="subtle"
          class="mb-12"
        >
          <AnimationsLoginAnimation />
        </UCard>
      </div>

      <!-- UAuthForm Wrapper -->
      <div class="w-full">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          title="Welcome Back"
          description="Enter your credentials to access your account."
          :submit="{
            label: isSubmitting ? 'Logging In...' : 'Log In',
            loading: isSubmitting,
            block: true,
            size: 'sm',
            color: 'primary'
          }"
          @submit="onSubmit"
        >
          <template #password-hint>
            <NuxtLink
              to="#"
              class="text-sm text-muted hover:text-primary transition-colors"
            >
              Forgot password?
            </NuxtLink>
          </template>

          <template #footer>
            <div class="flex flex-col items-center gap-4 mt-4">
              <p class="text-sm text-muted">
                Don't have an account?
                <NuxtLink
                  to="/sign-up"
                  class="text-primary font-medium hover:underline"
                >
                  Sign up
                </NuxtLink>
              </p>
            </div>
          </template>
        </UAuthForm>
      </div>
    </div>
  </div>
</template>
