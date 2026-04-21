import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const docsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        icon: z.string(),
        to: z.string(),
        target: z.string().optional()
      })
    )
    .optional()
})

export const docsCollection = defineCollection({
  type: 'page',
  source: 'docs/**/*.md',
  schema: docsSchema
})

export type DocsCollection = z.infer<typeof docsSchema>
