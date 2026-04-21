import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const videoPostsSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  number: z.number(),
  duration: z.string().optional(),
  videoUrl: z.string().url().optional()
})

export const videoPostsCollection = defineCollection({
  type: 'page',
  source: 'video-posts/**/*.md',
  schema: videoPostsSchema
})

export type VideoPostsCollection = z.infer<typeof videoPostsSchema>
