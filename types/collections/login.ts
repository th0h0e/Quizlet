import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const loginCollection = defineCollection({
  type: 'data',
  source: 'login/*.json',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        })
      )
      .optional(),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        company: z.string().optional()
      })
      .optional()
  })
})

export type LoginCollection = z.infer<typeof loginCollection.schema>
