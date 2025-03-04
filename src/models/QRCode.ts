import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Vehicle from "./Vehicle";

class QRCode extends Model {
  public id!: number;
  public vehicleId!: number;
  public qrCodeData!: string;
}

QRCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    qrCodeData: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "qrcodes",
  }
);

// Relation avec Vehicle
QRCode.belongsTo(Vehicle, { foreignKey: "vehicleId" });
Vehicle.hasOne(QRCode, { foreignKey: "vehicleId" });

export default QRCode;
