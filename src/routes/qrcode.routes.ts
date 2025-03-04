import { Router } from "express";
import { generateQRCode, getQRCodeByVehicle, getQRCodeById } from "../controllers/qrcode.controller";

const router = Router();

router.post("/", generateQRCode);  // ✅ Route de création du QR Code
router.get("/vehicle/:vehicleId", getQRCodeByVehicle); // ✅ Récupération via vehicleId
router.get("/:id", getQRCodeById); // ✅ Récupération par ID

export default router;
