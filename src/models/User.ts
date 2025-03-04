import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;
