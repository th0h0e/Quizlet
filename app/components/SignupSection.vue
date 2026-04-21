<script setup lang="ts"></script>

<template>
  <div>
    <UCard
      class="max-w-7xl mx-auto"
      :ui="{ body: 'p-8' }"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Title and Description -->
        <div class="flex items-start lg:items-center">
          <div>
            <h2 class="text-2xl font-bold mb-6">
              Join Frequency Digital
            </h2>
            <p class="text-base text-muted m-0 leading-relaxed">
              You've been referred to Frequency Digital by someone in our network. If you're
              interested in exploring potential collaboration or learning more, please complete the
              form below so we can get in touch.
            </p>
          </div>
        </div>

        <!-- Right Column: Form -->
        <div class="flex flex-col gap-4">
          <UInput
            type="text"
            placeholder="Your Name"
            aria-label="Your Name"
          />

          <UInput
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
          />

          <UInput
            type="text"
            placeholder="Company"
            aria-label="Company"
          />

          <UTextarea
            :rows="6"
            placeholder="Tell us about your project or how we can help"
            aria-label="Your message"
          />

          <div class="flex justify-end">
            <UButton color="primary">
              Send
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
