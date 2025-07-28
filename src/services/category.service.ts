import { Category } from "../models/category.model";
import { CategoryAttributes } from "../models/category.model";
import { BadRequestError } from "../middleware/errorHandler";
import { Op, WhereOptions } from "sequelize";

export const createCategory = async (
  data: Omit<CategoryAttributes, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const existingCategory = await Category.findOne({
      where: { name: data.name },
    });

    if (existingCategory) {
      throw new BadRequestError(
        `Category with name "${data.name}" already exists`,
      );
    }

    return await Category.create(data);
  } catch (error: unknown) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create category: ${errorMessage}`);
  }
};

export const getAllCategories = async (options?: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    const whereClause: WhereOptions = {};

    if (options?.status) {
      whereClause.status = options.status;
    }

    if (options?.search) {
      (whereClause as Record<symbol, unknown>)[Op.or] = [
        { name: { [Op.iLike]: `%${options.search}%` } },
        { description: { [Op.iLike]: `%${options.search}%` } },
      ];
    }

    const queryOptions: {
      where: WhereOptions;
      order: [string, string][];
      limit?: number;
      offset?: number;
    } = {
      where: whereClause,
      order: [["createdAt", "DESC"]],
    };

    if (options?.limit) {
      queryOptions.limit = options.limit;
    }
    if (options?.offset) {
      queryOptions.offset = options.offset;
    }

    return await Category.findAll(queryOptions);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch categories: ${errorMessage}`);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    if (!id) {
      throw new BadRequestError("Category ID is required");
    }

    return await Category.findByPk(id);
  } catch (error: unknown) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch category: ${errorMessage}`);
  }
};

export const updateCategory = async (
  id: string,
  data: Partial<Omit<CategoryAttributes, "id" | "createdAt" | "updatedAt">>,
) => {
  try {
    if (!id) {
      throw new BadRequestError("Category ID is required");
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return null;
    }

    if (data.name && data.name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          name: data.name,
          id: { [Op.ne]: id },
        },
      });

      if (existingCategory) {
        throw new BadRequestError(
          `Category with name "${data.name}" already exists`,
        );
      }
    }

    await category.update(data);
    return category;
  } catch (error: unknown) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update category: ${errorMessage}`);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (!id) {
      throw new BadRequestError("Category ID is required");
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return null;
    }

    await category.destroy();
    return true;
  } catch (error: unknown) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete category: ${errorMessage}`);
  }
};

export const getCategoriesByStatus = async (status: string) => {
  try {
    return await Category.findAll({
      where: { status },
      order: [["name", "ASC"]],
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch categories by status: ${errorMessage}`);
  }
};

export const getCategoryCount = async (status?: string) => {
  try {
    const whereClause = status ? { status } : {};
    return await Category.count({ where: whereClause });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to count categories: ${errorMessage}`);
  }
};
