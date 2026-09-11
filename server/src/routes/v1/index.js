import { Router } from "express";
import { router as productRoutes } from "./products.js";

export const router = Router();

router.use("/products", productRoutes);