import { Router } from "express";
<<<<<<< HEAD
import userRoutes from "./user.routes";
=======
import categoryRoutes from "./category.routes";
>>>>>>> e5b5d55 (Add category feature and update related files)

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});
router.use("/categories", categoryRoutes);

router.use("/api/users", userRoutes);

export default router;
