import { Router } from "express";
import { generateQRCode, getQRCodeByVehicle, getQRCodeById } from "../controllers/qrcode.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, generateQRCode); 
router.get("/vehicle/:vehicleId", authMiddleware, getQRCodeByVehicle); 
router.get("/:id", authMiddleware, getQRCodeById); 

export default router;
