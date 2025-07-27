// zod validation middleware for Express.js
// This middleware validates the request body against a Zod schema.
import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // override with validated, typed input
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error,
        });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

export default validate;
