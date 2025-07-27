"use strict";
import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    "roles",
    [{ name: "admin" }, { name: "owner" }, { name: "buyer" }],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete("roles", {}, {});
}
