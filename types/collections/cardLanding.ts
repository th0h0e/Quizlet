import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const cardLandingCollection = defineCollection({
  type: 'data',
  source: 'card-landing/*.json',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    buttonText: z.string(),
    buttonLink: z.string().optional(),
    reverse: z.boolean().optional().default(false),
    order: z.number()
  })
})

export type CardLandingCollection = z.infer<typeof cardLandingCollection.schema>
