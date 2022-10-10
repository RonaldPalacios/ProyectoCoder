import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Location, {
        as: "locations",
        foreignKey: "users_idusers",
      });
    }
  };
  User.init({
    idusers:{type:  DataTypes.STRING, primaryKey:true, autoIncrement: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    lastName: DataTypes.DATE,
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};