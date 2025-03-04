import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Vehicle from "./Vehicle";

class Notification extends Model {
  public id!: number;
  public userId!: number;
  public vehicleId!: number;
  public message!: string;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "notifications",
  }
);

// Relations
Notification.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Notification, { foreignKey: "userId" });

Notification.belongsTo(Vehicle, { foreignKey: "vehicleId" });
Vehicle.hasMany(Notification, { foreignKey: "vehicleId" });

export default Notification;
