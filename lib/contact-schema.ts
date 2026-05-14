import { z } from 'zod';

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name is too long (max 100 characters).'),
  email: z
    .email('Please enter a valid email address.')
    .trim()
    .min(1, 'Email is required.')
    .max(80),
  message: z
    .string()
    .trim()
    .min(1, 'Message must not be empty.')
    .max(2000, 'Message is too long (max 2000 characters).')
});

export type ContactSchemaInput = z.input<typeof ContactSchema>;
