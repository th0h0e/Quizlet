import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const aboutCollection = defineCollection({
  type: 'data',
  source: 'about/*.json',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    animationType: z.enum([
      'particles',
      'cards',
      'linesParticles',
      'simpleLines',
      'disks'
    ]),
    row: z.number(),
    column: z.number(),
    order: z.number()
  })
})

export type AboutCollection = z.infer<typeof aboutCollection.schema>
