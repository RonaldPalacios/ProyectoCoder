import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    idproducts:
    {type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true},

    imagen: DataTypes.STRING(45),

    discount: DataTypes.FLOAT,

    price: DataTypes.FLOAT,

    name: DataTypes.STRING(100),

    descriptions: DataTypes.STRING(100),
    
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  });
  return Product;
};