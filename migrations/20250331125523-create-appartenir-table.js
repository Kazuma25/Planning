'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appartenirs', {
      idUtilisateur: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'idUtilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idEquipe: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Equipes',
          key: 'idEquipe'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Appartenirs');
  }
};
