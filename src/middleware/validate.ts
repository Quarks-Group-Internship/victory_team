import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: (error as ZodError).issues.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

export default validate;
