import { Request, Response } from "express";
import { Server } from "socket.io";

/**
 * @desc Envoie une notification via WebSockets
 */
export const sendNotification = (io: Server) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      if (!io) {
        console.error("⚠ Erreur : io n'est pas défini !");
        res.status(500).json({ error: "Erreur interne du serveur : io est manquant." });
        return;
      }

      const { userId, message } = req.body;

      if (!userId || !message) {
        res.status(400).json({ error: "userId et message sont requis." });
        return;
      }

      const notification = { userId, message, timestamp: new Date() };

      io.emit("receiveNotification", notification); // 🔔 Envoi de la notification en temps réel

      res.status(200).json({ message: "Notification envoyée avec succès.", notification });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  };
};
