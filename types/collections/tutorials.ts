import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const tutorialsSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  author: z.string().optional(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional()
})

export const tutorialsCollection = defineCollection({
  type: 'page',
  source: 'tutorials/**/*.md',
  schema: tutorialsSchema
})

export type TutorialsCollection = z.infer<typeof tutorialsSchema>
