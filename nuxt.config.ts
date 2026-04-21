// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@compodium/nuxt',
    '@nuxt/content',
    'nuxt-og-image',
    '@vueuse/nuxt',
    'nuxt-studio',
    'v-gsap-nuxt'
  ],

  devtools: {
    // enabled: true
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  ui: {
    theme: {
      defaultVariants: {
        size: 'sm'
      }
    }
  },
  devServer: {
    port: 3001
  },

  experimental: {
    asyncContext: true,
    viewTransition: true
  },

  compatibilityDate: '2026-03-27',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/CustomEase']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never'
      }
    }
  },

  fonts: {
    families: [
      {
        name: 'General Sans',
        src: '~/assets/font/GeneralSans-Variable.woff2',
        global: true
      }
    ]
  },

  icon: {
    serverBundle: {
      collections: ['feather']
    }
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'th0h0e',
      repo: 'Frequency-Nuxt-Studio',
      branch: 'main'
    }
  }
})
