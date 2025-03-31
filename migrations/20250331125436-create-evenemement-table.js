'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evenemements', {
      idEvent: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nom: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      dateDebut: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dateFin: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Evenemements');
  }
};
