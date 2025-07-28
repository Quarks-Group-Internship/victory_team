import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

router.use("/api/users", userRoutes);

export default router;
