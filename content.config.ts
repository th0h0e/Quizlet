import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    collections: defineCollection({
      type: 'data',
      source: 'collections/**/*.yaml',
      schema: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        language: { type: 'string', required: true },
        icon: { type: 'string', required: false },
        color: { type: 'string', required: false }
      }
    }),
    vocabCards: defineCollection({
      type: 'data',
      source: 'vocab/**/*.yaml',
      schema: {
        collection: { type: 'string', required: true },
        term: { type: 'string', required: true },
        definition: { type: 'string', required: true },
        pinyin: { type: 'string', required: false },
        example: { type: 'string', required: false },
        tags: { type: 'array', required: false },
        difficulty: { type: 'string', required: false },
        order: { type: 'number', required: false }
      }
    })
  }
})
