import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Location extends Model {
  
    static associate(models) {
        Location.belongsTo(models.User, {
            as: "locations",
            foreignKey: "users_idusers",
          });
    }
  };
  Location.init({
    idlocations: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      street: {
        type: DataTypes.STRING,
      },
      street_number: {
        type: DataTypes.INTEGER,
      },
      floor: {
        type: DataTypes.INTEGER,
      },
      apartment: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      town: {
        type: DataTypes.STRING,
      },
      codigo_postal: {
        type: DataTypes.STRING,
      },
      users_idusers: {
        type: DataTypes.INTEGER,
      },
    
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: false
  });
  return Location;
};