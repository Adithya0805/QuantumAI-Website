import { z } from 'zod'

export const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  useCase: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const demoSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().optional(),
  teamSize: z.string().min(1, 'Team size required'),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type DemoInput = z.infer<typeof demoSchema>
