<script setup lang="ts">
const { data: contactContent } = await useAsyncData('contact-form', () =>
  queryCollection('contact').first()
)

useContactForm()
</script>

<template>
  <div>
    <UCard
      class="mx-auto max-w-7xl"
      :ui="{ body: 'p-8 relative' }"
    >
      <div
        data-contact-card-body
        class="relative"
      >
        <!-- SVG Layer for connector line -->
        <svg
          data-contact-connector="true"
          class="pointer-events-none absolute top-0 left-0"
          style="z-index: 0"
        />

        <div
          class="contact-grid relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-8"
        >
          <!-- Title Section -->
          <div class="md:col-start-1 md:row-start-1">
            <h2 class="mb-6 text-2xl font-bold">
              <span id="contact-title-text">
                {{ contactContent?.title || 'Let us talk' }}
              </span>
            </h2>
            <p class="text-muted m-0 text-base leading-relaxed">
              {{
                contactContent?.description
                  || 'We appreciate your interest in Frequency Digital. Any questions or comments? Feel free to reach out using the contact form or connect with us via email.'
              }}
            </p>
          </div>

          <!-- Contact Form -->
          <div class="flex flex-col gap-4 md:col-start-2 md:row-span-2 md:row-start-1">
            <UFormField
              label="Full Name"
              name="full-name"
            >
              <UInput
                id="full-name"
                type="text"
                placeholder="John Doe"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Email Address"
              name="email-address"
            >
              <UInput
                id="email-address"
                type="email"
                placeholder="john@example.com"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Subject"
              name="subject"
            >
              <UInput
                id="subject"
                type="text"
                placeholder="How can we help?"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Message"
              name="message"
            >
              <UTextarea
                id="message"
                class="w-full"
                :rows="6"
                placeholder="Your message..."
              />
            </UFormField>

            <div class="mt-2 flex justify-start">
              <UButton
                id="contact-send-button"
                color="primary"
              >
                Send
              </UButton>
            </div>
          </div>

          <!-- Company Address -->
          <div class="flex items-start md:col-start-1 md:row-start-2 md:items-end">
            <div class="text-muted text-base leading-loose">
              <p class="text-muted m-0 font-semibold">
                {{ contactContent?.companyInfo?.addressLabel || 'Company Address' }}
              </p>
              <p class="text-muted m-0 font-semibold">
                {{ contactContent?.companyInfo?.companyName || 'Frequency Digital' }}
              </p>
              <p class="text-muted m-0 font-semibold">
                {{ contactContent?.companyInfo?.street || 'Erste Anjeliersdwarsstraat 5-H' }}
              </p>
              <p class="text-muted m-0 font-semibold">
                {{ contactContent?.companyInfo?.city || '1015 NR Amsterdam' }}
              </p>
              <p class="text-muted m-0 font-semibold">
                {{ contactContent?.companyInfo?.emailLabel || 'Company Email' }}:
                {{ contactContent?.companyInfo?.email || 'fq@gmail.com' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.connector-line {
  stroke: var(--ui-primary);
}
</style>
