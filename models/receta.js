'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      receta.belongsTo(models.categoria,
        {
          foreignKey: 'id_categoria',
          target_key: 'id',
        }
      );
    }
  }
  receta.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    image: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_categoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'receta',
  });
  return receta;
};