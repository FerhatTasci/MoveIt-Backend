import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: console.log, // Afficher les requêtes SQL (peut être désactivé)
  }
);

export default sequelize;