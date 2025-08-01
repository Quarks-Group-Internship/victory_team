import { Request, Response, NextFunction } from "express";
import * as CategoryService from "../services/category.service";
import { NotFoundError } from "../middleware/errorHandler";
import { CategoryInput, CategoryUpdate } from "../schemas/category.schema";

export const create = async (
  req: Request<Record<string, never>, Record<string, never>, CategoryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, search, limit, offset, sortBy, sortOrder } = req.query as {
      status?: string;
      search?: string;
      limit?: string;
      offset?: string;
      sortBy?: string;
      sortOrder?: string;
    };

    const options = {
      status,
      search,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
      sortBy,
      sortOrder,
    };

    const categories = await CategoryService.getAllCategories(options);
    return res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) {
      throw new NotFoundError("Category");
    }
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const update = async (
  req: Request<{ id: string }, Record<string, never>, CategoryUpdate>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await CategoryService.updateCategory(
      req.params.id,
      req.body,
    );
    if (!category) {
      throw new NotFoundError("Category");
    }
    return res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await CategoryService.deleteCategory(req.params.id);
    if (!deleted) {
      throw new NotFoundError("Category");
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};
