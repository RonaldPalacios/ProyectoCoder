import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
