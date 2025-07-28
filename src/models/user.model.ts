import { Model, DataTypes, BelongsToManyAddAssociationMixin } from "sequelize";
import { sequelize } from "../database/config/connection";
import { Role } from "./role.model";

export interface UserAttributes {
  id?: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public firstname!: string;
  public lastname!: string;
  public phone!: string;
  public email!: string;
  public password!: string;

  public addRole!: BelongsToManyAddAssociationMixin<Role, string>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "Users",
    modelName: "User",
  },
);
