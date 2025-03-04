import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import userRoutes from "./routes/user.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import qrcodeRoutes from "./routes/qrcode.routes";
import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Obligatoire pour lire les JSON
app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/qrcodes", qrcodeRoutes);
app.use("/auth", authRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de données synchronisée !");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
