import { sequelize } from "../database/config/connection";
import { Role } from "../models/role.model";
import { User, UserAttributes } from "../models/user.model";

export const createUser = async (
  data: UserAttributes & { roleName: string },
) => {
  return await sequelize.transaction(async (t) => {
    // 1. Create the user
    const { roleName, ...userData } = data;

    const user = await User.create(userData, { transaction: t });

    // 2. Find the role

    const role = await Role.findOne({
      where: { name: roleName },
      transaction: t,
    });

    console.log("Role: ", role);
    if (!role) {
      throw new Error("Invalid role");
    }

    // 3. Associate
    await user.addRole(role, { transaction: t });

    return user;
  });
};

export const getAllUsers = async () => {
  console.log("User model:", User);
  return await User.findAll();
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

export const updateUser = async (id: string, data: Partial<UserAttributes>) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
};

export const deleteUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
};
