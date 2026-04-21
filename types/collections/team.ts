import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const teamCollection = defineCollection({
  type: 'data',
  source: 'team/*.json',
  schema: z.object({
    name: z.string(),
    quote: z.string(),
    image: z.string(),
    order: z.number()
  })
})

export type TeamCollection = z.infer<typeof teamCollection.schema>
