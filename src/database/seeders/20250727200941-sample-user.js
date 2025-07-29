import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  const users = Array.from({ length: 15 }).map((_, i) => ({
    id: uuidv4(),
    firstname: `User${i + 1}`,
    lastname: `Test${i + 1}`,
    phone: `078000000${i}`,
    email: `user${i + 1}@example.com`,
    password: "Password", // consider hashing in real apps
    createdAt: now,
    updatedAt: now,
  }));

  await queryInterface.bulkInsert("Users", users, {});

  // Retrieve roles by name
  const [roles] = await queryInterface.sequelize.query(
    "SELECT id, name FROM \"Roles\" WHERE name IN ('admin', 'owner', 'buyer');",
  );

  const userRoles = [];

  users.forEach((user, i) => {
    // Assign roles in a round-robin fashion
    const role = roles[i % roles.length];
    userRoles.push({
      userId: user.id,
      roleId: role.id,
      createdAt: now,
      updatedAt: now,
    });
  });

  await queryInterface.bulkInsert("UserRoles", userRoles, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("UserRoles", {}, {});
  await queryInterface.bulkDelete("Users", {}, {});
}
