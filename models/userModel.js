// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db_connect');

const User = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true    
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome_utente: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 3
    }
  },
  certified: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  background_color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  card_color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  partite_giocate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  partite_vinte: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});



module.exports = User;
