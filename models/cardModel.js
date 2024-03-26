// cardModel.js

// models/cards.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db_connect');


const User = require('./userModel');

const Card = sequelize.define('Cards', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_card: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  audio: {
    type: DataTypes.STRING
  }
});

// Establishing the association with the User model
Card.belongsTo(User, { foreignKey: 'USER_ID' });



module.exports = Card;
