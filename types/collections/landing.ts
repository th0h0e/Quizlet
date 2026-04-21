import { defineCollection } from '@nuxt/content'

export const landingCollection = defineCollection({
  type: 'page',
  source: 'index.md'
})

export type LandingCollection = typeof landingCollection
