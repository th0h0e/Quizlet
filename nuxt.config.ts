// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
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
  }
})