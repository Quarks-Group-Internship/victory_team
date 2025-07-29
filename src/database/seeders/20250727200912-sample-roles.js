"use strict";

export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "Roles",
    [{ name: "admin" }, { name: "owner" }, { name: "buyer" }],
    {},
  );
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete("Roles", {}, {});
}
