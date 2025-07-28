import { Router } from "express";
import * as CategoryController from "../controllers/category.controller";
import { validate, validateParams } from "../middleware/validation";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
} from "../schemas/category.schema";

const router = Router();

// Create category
router.post("/", validate(createCategorySchema), CategoryController.create);

// Get all categories
router.get("/", CategoryController.getAll);

// Get category by ID
router.get(
  "/:id",
  validateParams(categoryParamsSchema),
  CategoryController.getOne,
);

// Update category
router.put(
  "/:id",
  validateParams(categoryParamsSchema),
  validate(updateCategorySchema),
  CategoryController.update,
);

// Delete category
router.delete(
  "/:id",
  validateParams(categoryParamsSchema),
  CategoryController.remove,
);

export default router;
