module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('User', {
        idUtilisateur: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    },
    password_field: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    nom: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    adresse: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    });
    return Users;
};