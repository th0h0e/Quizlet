import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

export const contactCollection = defineCollection({
  type: 'data',
  source: 'contact/*.json',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    companyInfo: z
      .object({
        addressLabel: z.string(),
        companyName: z.string(),
        street: z.string(),
        city: z.string(),
        emailLabel: z.string(),
        email: z.string().email()
      })
      .optional(),
    offices: z
      .array(
        z.object({
          city: z.string(),
          address: z.string(),
          phone: z.string().optional(),
          email: z.string().email().optional()
        })
      )
      .optional(),
    social: z
      .object({
        linkedin: z.string().url().optional(),
        twitter: z.string().url().optional(),
        instagram: z.string().url().optional()
      })
      .optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
      .optional()
  })
})

export type ContactCollection = z.infer<typeof contactCollection.schema>
