import { User } from "./user.model";
import { Role } from "./role.model";

// User model
User.belongsToMany(Role, {
  through: "UserRoles",
  foreignKey: "userId", // force lowercase
  otherKey: "roleId",
});

// Role model
Role.belongsToMany(User, {
  through: "UserRoles",
  foreignKey: "roleId",
  otherKey: "userId",
});

export { User, Role };
