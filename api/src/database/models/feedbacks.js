import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Feedback extends Model {
    
    static associate(models) {
      Feedback.belongsTo(models.Product, {
        as: "products",
        foreignKey: "products_idproducts",
      });
    }
  }
  Feedback.init(
    {
      idfeedbacks: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      commentary: {
        type: DataTypes.STRING(250),
      },
      users_idusers: {
        type: DataTypes.INTEGER,
      },
      products_idproducts: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );
  return Feedback;
};
