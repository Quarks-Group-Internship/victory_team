import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        firstname: "John",
        lastname: "Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
        password: "Password",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete("Users", {}, {});
}
