import { z } from 'zod';
import { securityPatterns } from './security';

// User validation schemas
export const userLoginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .regex(securityPatterns.email, 'Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password is too long')
});

export const userRegistrationSchema = userLoginSchema.extend({
  name: z.string()
    .min(1, 'Name is required')
    .max(64, 'Name is too long')
    .regex(securityPatterns.safeString, 'Name contains invalid characters'),
  passwordConfirm: z.string().min(1, 'Password confirmation is required'),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm'],
});

// Project validation schema
export const projectSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title is too long')
    .regex(securityPatterns.safeString, 'Title contains invalid characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(5000, 'Description is too long'),
  goal: z.number()
    .min(1, 'Goal amount must be at least 1')
    .max(1000000, 'Goal amount is too high'),
  image: z.string().url().optional(),
});

// Donation validation schema
export const donationSchema = z.object({
  amount: z.number()
    .min(1, 'Amount must be at least 1')
    .max(100000, 'Amount is too high'),
  message: z.string()
    .max(1000, 'Message is too long')
    .optional(),
  projectId: z.string()
    .uuid('Invalid project ID'),
});

// Contribution validation schema
export const contributionSchema = z.object({
  description: z.string()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),
  type: z.enum(['FOOD', 'KNOWLEDGE', 'VOLUNTEER', 'OTHER']),
  projectId: z.string()
    .uuid('Invalid project ID'),
});

// Generic validation function
export function validateInput<T extends z.ZodType>(
  schema: T, 
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: string[] } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => e.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}
