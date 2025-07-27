// where associations/relationships between models are defined
import { User } from "./user.model";
import { Role } from "./role.model";

User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });
