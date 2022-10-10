import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Categories extends Model {
    
    static associate(models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categories_idcategories",
          });
    }
  }
  Categories.init(
    {
        idcategories: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
          },
          nombre: {
            type: DataTypes.STRING,
          },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "categories",
      timestamps: false,
    }
  );
  return Categories;
};
