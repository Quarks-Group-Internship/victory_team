import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config/connection"; // same instance you use everywhere

export interface RoleAttributes {
  id?: number;
  name: string;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize, // <- attach here directly
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  },
);
