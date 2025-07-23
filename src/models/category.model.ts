import { Model, DataTypes, Sequelize } from "sequelize";

export interface CategoryAttributes {
  id?: string;
  name: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public description?: string;
  public status?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initCategoryModel(sequelize: Sequelize) {
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories", 
    }
  );
  return Category;
}
