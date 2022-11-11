'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pasos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pasos.belongsTo(models.receta,
        {
          foreignKey: 'id_receta',
          target_key: 'id',
        }
      );
    }
  }
  pasos.init({
    paso: DataTypes.STRING,
    id_receta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pasos',
  });
  return pasos;
};