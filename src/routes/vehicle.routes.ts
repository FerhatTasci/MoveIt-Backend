import { Router } from "express";
import { getVehicles, createVehicle, getVehicleById, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

router.get("/",authMiddleware, getVehicles);
router.post("/",authMiddleware, createVehicle);
router.get("/:id",authMiddleware, getVehicleById);
router.put("/:id",authMiddleware, updateVehicle);
router.delete("/:id",authMiddleware, deleteVehicle);

export default router;
