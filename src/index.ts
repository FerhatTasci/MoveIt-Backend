import express from "express";
import http from "http"; // 🔹 Import du module HTTP
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import qrcodeRoutes from "./routes/qrcode.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import notificationRoutes from "./routes/notification.routes"; // 🔹 Import des routes de notifications

dotenv.config();

const app = express();
const server = http.createServer(app); // 🔹 Création du serveur HTTP

// 🔹 Définition de `io` AVANT son exportation
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET","POST"] },
  allowEIO3: true,
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// 🔹 Routes API
app.use("/auth", authRoutes);
app.use("/qrcodes", qrcodeRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/notifications", notificationRoutes); // 🔹 Ajout de la route notifications

io.on("connection", (socket) => {
  console.log(`📡 Un utilisateur connecté : ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`❌ L'utilisateur ${socket.id} s'est déconnecté (${reason})`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});