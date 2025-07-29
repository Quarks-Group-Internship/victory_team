import { z } from "zod";

// Create schema for creating a user
export const createUserSchema = z.object({
  firstname: z
    .string()
    .min(2, "Firstname can't be an empty string or less than 2 character"),
  lastname: z
    .string()
    .min(2, "Lastname can't be an empty string or less than 2 character"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleName: z.enum(["admin", "owner", "buyer"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create schema for updating a user
export const updateUserSchema = z.object({
  firstname: z
    .string()
    .min(2, "Firstname can't be an empty string or less than 2 character")
    .optional(),
  lastname: z
    .string()
    .min(2, "Lastname can't be an empty string or less than 2 character")
    .optional(),
  phone: z.string().min(10, "Phone must be at least 10 digits").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  roleName: z.enum(["admin", "owner", "buyer"]).optional(),
  updatedAt: z.date().optional(),
});

// Infer TypeScript types from Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
