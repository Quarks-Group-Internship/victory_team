import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const createCategorySchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CategoryInput = z.infer<typeof createCategorySchema>;
export type CategoryUpdate = z.infer<typeof updateCategorySchema>;
export type CategoryParams = z.infer<typeof categoryParamsSchema>;
