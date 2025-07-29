import { sequelize } from "../database/config/connection";
import { Role } from "../models/role.model";
import { User, UserAttributes } from "../models/user.model";
import { Op, FindAndCountOptions } from "sequelize";

interface GetAllUsersOptions {
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

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

export const getAllUsers = async (options: GetAllUsersOptions) => {
  const {
    search = "",
    limit,
    offset,
    sortBy = "createdAt",
    sortOrder = "DESC",
  } = options;

  const whereClause = search
    ? {
        [Op.or]: [
          { firstname: { [Op.iLike]: `%${search}%` } },
          { lastname: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const queryOptions: FindAndCountOptions = {
    where: whereClause,
    order: [[sortBy, sortOrder]],
  };

  // Only add pagination if limit is provided
  if (limit !== undefined && limit !== null) {
    queryOptions.limit = limit;
    queryOptions.offset = offset || 0;
  }

  return await User.findAndCountAll(queryOptions);
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
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
