/* eslint-disable no-undef */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // <--- makes it iterative
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Roles");
  },
};
