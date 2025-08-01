import { Request, Response, NextFunction } from "express";
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
} from "sequelize";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err instanceof SequelizeValidationError) {
    statusCode = 400;
    message = "Validation error";
    const details = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }));

    return res.status(statusCode).json({
      error: message,
      details,
    });
  }

  if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = "Resource already exists";
    const details = err.errors.map((error) => ({
      field: error.path,
      message: `${error.path} must be unique`,
    }));

    return res.status(statusCode).json({
      error: message,
      details,
    });
  }

  // Log error for debugging
  console.error(`Error ${statusCode}: ${message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
