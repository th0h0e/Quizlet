<script setup lang="ts">
const { seo: _seo } = useAppConfig()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0066CC' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
    { rel: 'manifest', href: '/favicon/site.webmanifest' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Frequency Digital',
  titleTemplate: '%s - Frequency Digital',
  ogSiteName: 'Frequency Digital',
  ogTitle: 'Frequency Digital',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="primary" />

    <!-- <AppHeader /> -->

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>

<style>
/* View Transitions API - Subtle crossfade */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Vue Layout Transitions - Subtle fade */
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
