import { z } from "zod";

// Create schema for creating a user
export const createUserSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleName: z.enum(["admin", "owner", "buyer"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create schema for updating a user
export const updateUserSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "owner", "buyer"]).optional(),
  updatedAt: z.date().optional(),
});

// Infer TypeScript types from Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
