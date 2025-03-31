'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evenement extends Model {
    static associate(models) {
      // Définis ici les associations si besoin plus tard
    }
  }

  Evenement.init({
    idEvent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Evenement',
    tableName: 'Evenemements',
    timestamps: true
  });

  return Evenement;
};
