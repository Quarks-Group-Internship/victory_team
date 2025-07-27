"use strict";
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("roles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // <--- makes it iterative
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("roles");
}
