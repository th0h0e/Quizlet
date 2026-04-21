import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const pricingCollection = defineCollection({
  type: 'data',
  source: 'pricing/*.json',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    price: z.string(),
    priceDescription: z.string(),
    features: z.array(
      z.object({
        text: z.string(),
        included: z.boolean()
      })
    ),
    buttonText: z.string(),
    buttonLink: z.string().optional(),
    buttonVariant: z
      .enum(['outline', 'solid', 'subtle', 'soft', 'ghost', 'link'])
      .optional()
      .default('outline'),
    buttonColor: z
      .enum(['primary', 'neutral', 'success', 'info', 'warning', 'error'])
      .optional()
      .default('neutral'),
    highlighted: z.boolean().optional().default(false),
    order: z.number()
  })
})

export type PricingCollection = z.infer<typeof pricingCollection.schema>
