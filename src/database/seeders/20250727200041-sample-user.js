import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        id: uuidv4(),
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

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Users", {}, {});
}
