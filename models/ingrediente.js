'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingrediente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingrediente.belongsTo(models.receta,
        {
          foreignKey: 'id_receta',
          target_key: 'id',
        }
      );
    }
  }
  ingrediente.init({
    nombre: DataTypes.STRING,
    unidad_medida: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    id_receta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ingrediente',
  });
  return ingrediente;
};