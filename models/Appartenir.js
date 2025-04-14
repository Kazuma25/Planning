'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appartenir extends Model {
    static associate(models) {
      // Appartenance à un utilisateur
      Appartenir.belongsTo(models.User, {
        foreignKey: 'idUtilisateur',
        as: 'users'
      });

      // Appartenance à une équipe
      Appartenir.belongsTo(models.Equipe, {
        foreignKey: 'idEquipe',
        as: 'equipe'
      });
    }
  }

  Appartenir.init({
    idUtilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idEquipe: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Appartenir',
    tableName: 'Appartenirs',
    timestamps: true
  });

  return Appartenir;
};
