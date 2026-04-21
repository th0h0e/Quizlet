import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const herosCollection = defineCollection({
  type: 'data',
  source: 'heros/*.json',
  schema: z.object({
    variant: z
      .enum(['plain', 'content-left', 'content-right', 'single', 'centered', 'featured'])
      .optional(),
    logoVisible: z.boolean().optional(),
    title: z.string().optional(),
    paragraph: z.string().optional(),
    backgroundImage: z.string().optional()
  })
})

export type HerosCollection = z.infer<typeof herosCollection.schema>
