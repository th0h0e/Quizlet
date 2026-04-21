import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    collections: defineCollection({
      type: 'data',
      source: 'collections/**.yaml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        language: z.string(),
        icon: z.string().optional(),
        color: z.string().optional()
      })
    }),
    vocabCards: defineCollection({
      type: 'data',
      source: 'vocab/**.yaml',
      schema: z.object({
        collection: z.string(),
        term: z.string(),
        definition: z.string(),
        pinyin: z.string().optional(),
        example: z.string().optional(),
        tags: z.array(z.string()).optional(),
        difficulty: z.string().optional(),
        order: z.number().optional()
      })
    })
  }
})
