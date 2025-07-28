import { User } from "./user.model";
import { Role } from "./role.model";

User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

export { User, Role };
