// gameSessionModel.js

const { DataTypes } = require('sequelize');
const User = require('./userModel')
const sequelize = require('../db_connect'); // assuming you have a database configuration file

const GameSession = sequelize.define('GameSession', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 3
    }
  },
  numero_mosse: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_aiuti: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options (if needed)
});

GameSession.belongsTo(User, { foreignKey: 'USER_ID' });
// CRUD operations

// Create a new game session
GameSession.createGameSession = async function(id_utente, game_time, completed, number_of_moves, number_of_helps) {
  try {
    const gameSession = await this.create({ id_utente, game_time, completed, number_of_moves, number_of_helps });
    return gameSession;
  } catch (error) {
    throw new Error('Error creating game session');
  }
};

// Find a game session by ID
GameSession.findById = async function(gameSessionId) {
  try {
    const gameSession = await this.findByPk(gameSessionId);
    return gameSession;
  } catch (error) {
    throw new Error('Error finding game session by ID');
  }
};

// Update a game session
GameSession.updateGameSession = async function(gameSessionId, newData) {
  try {
    await this.update(newData, { where: { ID: gameSessionId } });
    return true;
  } catch (error) {
    throw new Error('Error updating game session');
  }
};

// Delete a game session
GameSession.deleteGameSession = async function(gameSessionId) {
  try {
    await this.destroy({ where: { ID: gameSessionId } });
    return true;
  } catch (error) {
    throw new Error('Error deleting game session');
  }
};

module.exports = GameSession;
