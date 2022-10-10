import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: 'categories',
        foreignKey: 'categories_idcategories',
    });
    Product.hasMany(models.Feedback, {
        as: 'feedbacks',
        foreignKey: "products_idproducts",
    });
    }
  };
  Product.init({
    idproducts:
    {type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true},

    image: DataTypes.STRING(45),

    discount: DataTypes.INTEGER,

    price: DataTypes.INTEGER,

    name: DataTypes.STRING(100),

    description: DataTypes.STRING(100),

    categories_idcategories: DataTypes.INTEGER,

    rating : DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  });
  return Product;
};