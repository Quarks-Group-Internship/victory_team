import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from "sequelize";

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Sequelize Validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      type: err.name,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        field: e.path,
        value: e.value,
        message: e.message,
      })),
    });
  }

  // Handle Sequelize Unique constraint errors
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      type: err.name,
      message: "Unique constraint violation",
      errors: err.errors.map((e) => ({
        field: e.path,
        value: e.value,
        message: e.message,
      })),
    });
  }

  // Handle Sequelize Foreign key errors
  if (err instanceof ForeignKeyConstraintError) {
    return res.status(409).json({
      type: err.name,
      message: "Foreign key constraint failed",
      index: err.index,
      fields: err.fields,
    });
  }

  // Handle general database errors
  if (err instanceof DatabaseError) {
    return res.status(500).json({
      type: err.name,
      message: err.message,
    });
  }

  // ✅ Default fallback for non-Sequelize errors
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
