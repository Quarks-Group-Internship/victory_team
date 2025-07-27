import { Router } from "express";
import * as userController from "../controllers/user.controller";
import validate from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
