import { Router } from "express";
import categoryRoutes from "./category.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});
router.use("/categories", categoryRoutes);

export default router;
