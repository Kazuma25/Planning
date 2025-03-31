'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planning extends Model {
    static associate(models) {
      // Planning appartient à un Utilisateur
      Planning.belongsTo(models.User, {
        foreignKey: 'idUtilisateur',
        as: 'utilisateur'
      });

      // Planning appartient à un Événement
      Planning.belongsTo(models.Evenement, {
        foreignKey: 'idEvent',
        as: 'evenement'
      });
    }
  }

  Planning.init({
    idUtilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idEvent: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Planning',
    tableName: 'Plannings',
    timestamps: true
  });

  return Planning;
};
