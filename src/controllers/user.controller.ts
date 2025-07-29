import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err instanceof Error ? err : new Error("Internal Server Error"));
  }
};

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, limit, offset, sortBy, sortOrder } = _req.query;
    const parsedSearch = search ? (search as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
    const parsedOffset = offset ? parseInt(offset as string, 10) : undefined;
    const parsedSortBy = sortBy ? (sortBy as string) : "createdAt";
    const parsedSortOrder = sortOrder ? (sortOrder as "ASC" | "DESC") : "DESC";

    const users = await userService.getAllUsers({
      search: parsedSearch,
      limit: parsedLimit,
      offset: parsedOffset,
      sortBy: parsedSortBy,
      sortOrder: parsedSortOrder,
    });
    res.json(users);
  } catch (err) {
    next(err instanceof Error ? err : new Error("Internal Server Error"));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err instanceof Error ? err : new Error("Internal Server Error"));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err) {
    next(err instanceof Error ? err : new Error("Internal Server Error"));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    next(err instanceof Error ? err : new Error("Internal Server Error"));
  }
};
