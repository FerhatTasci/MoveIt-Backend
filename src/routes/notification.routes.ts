import { Router } from "express";
import { sendNotification } from "../controllers/notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { io } from "../index"; // ✅ Vérification de l'importation correcte

const router = Router();

router.post("/", authMiddleware, (req, res) => sendNotification(io)(req, res)); // ✅ Correction ici

export default router;
