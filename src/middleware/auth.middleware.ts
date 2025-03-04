import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * @desc Middleware pour vérifier le token JWT
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Accès refusé. Token manquant." });
    return; // ✅ Ajout d'un return pour éviter que la fonction continue
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // ✅ Stocke les infos du token pour la suite des requêtes
    next(); // ✅ Passe à la prochaine étape (le contrôleur)
  } catch (error) {
    res.status(403).json({ error: "Token invalide." });
    return; // ✅ Ajout d'un return ici aussi
  }
};
