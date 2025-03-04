import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Vehicle extends Model {
  public id!: number;
  public plate!: string;
  public userId!: number;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "vehicles",
  }
);

// Relation avec User
Vehicle.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Vehicle, { foreignKey: "userId" });

export default Vehicle;
