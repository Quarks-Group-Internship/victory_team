import { Model, DataTypes, Sequelize } from "sequelize";

export interface UserAttributes {
  id?: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public firstname!: string;
    public lastname!: string;
    public phone!: string;
    public email!: string;
    public password!: string;
    public role!: "admin" | "user";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [10, 15] }, // Assuming phone numbers are between 10 and 15 digits
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      indexes: [
        {
          unique: true,
          fields: ["firstname", "lastname", "phone"], // This makes firstname, lastname, and phone unique together per user
        },
      ],
    },
  );

  return User;
};
