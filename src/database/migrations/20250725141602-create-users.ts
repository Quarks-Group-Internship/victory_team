// migrations/20250725123456-create-users-table.js
import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Add composite unique index for firstname + lastname + phone
    await queryInterface.addConstraint("Users", {
      fields: ["firstname", "lastname", "phone"],
      type: "unique",
      name: "unique_name_phone",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Users");
  },
};
