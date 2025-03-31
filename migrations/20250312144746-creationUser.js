'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      idUser :{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false, 
      },
      email :{
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nom :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      prenom :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      adresse :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
