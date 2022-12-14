'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};