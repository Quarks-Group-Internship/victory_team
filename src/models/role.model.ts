import { DataTypes, Model, Sequelize } from "sequelize";

export interface RoleAttributes {
  id?: number;
  name: string;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
}

export function initRoleModel(sequelize: Sequelize) {
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
    { sequelize, modelName: "Role", tableName: "roles", timestamps: false },
  );

  return Role;
}
