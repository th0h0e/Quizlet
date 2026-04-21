import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const servicesCollection = defineCollection({
  type: 'data',
  source: 'services/*.json',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    textSectionTitle: z.string(),
    textSectionDescription: z.string(),
    image: z.string(),
    avatarLabel: z.string(),
    avatarColor: z.enum(['primary', 'secondary', 'accent']),
    primaryButtonText: z.string(),
    secondaryButtonText: z.string(),
    order: z.number()
  })
})

export type ServicesCollection = z.infer<typeof servicesCollection.schema>
