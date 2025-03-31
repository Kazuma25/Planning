'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plannings', {
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
      idEvent: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Evenemements',
          key: 'idEvent'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nom: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('Plannings');
  }
};
