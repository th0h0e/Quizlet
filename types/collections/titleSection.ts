import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const titleSectionCollection = defineCollection({
  type: 'data',
  source: 'title-section/*.json',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    variant: z
      .enum(['subtle', 'solid', 'outline', 'soft', 'ghost', 'gradient'])
      .optional()
      .default('subtle'),
    links: z
      .array(
        z.object({
          label: z.string(),
          color: z
            .enum(['primary', 'neutral', 'success', 'info', 'warning', 'error'])
            .optional()
            .default('neutral'),
          variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
          trailingIcon: z.string().optional(),
          icon: z.string().optional(),
          to: z.string().optional()
        })
      )
      .optional()
  })
})

export type TitleSectionCollection = z.infer<typeof titleSectionCollection.schema>
