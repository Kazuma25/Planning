'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipe extends Model {
    static associate(models) {
      // Une Equipe appartient à un Utilisateur
      Equipe.belongsTo(models.User, {
        foreignKey: 'idUtilisateur',
        as: 'utilisateur'
      });
    }
  }

  Equipe.init({
    idEquipe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true // important si tu fais ON DELETE SET NULL
    }
  }, {
    sequelize,
    modelName: 'Equipe',
    tableName: 'Equipes',
    timestamps: true
  });

  return Equipe;
};
