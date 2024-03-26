// sessionModel.js
const User = require('./userModel')

const { DataTypes } = require('sequelize');
const sequelize = require('../db_connect'); // assuming you have a database configuration file

const Session = sequelize.define('Session', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options (if needed)
});

// Establishing the association with the User model
Session.belongsTo(User, { foreignKey: 'USER_ID' });


// CRUD operations

// Create a new session
Session.createSession = async function(user_id, session_type) {
  try {
    const session = await this.create({ user_id, session_type });
    return session;
  } catch (error) {
    throw new Error('Error creating session');
  }
};

// Find a session by ID
Session.findById = async function(sessionId) {
  try {
    const session = await this.findByPk(sessionId);
    return session;
  } catch (error) {
    throw new Error('Error finding session by ID');
  }
};

// Update a session
Session.updateSession = async function(sessionId, newData) {
  try {
    await this.update(newData, { where: { session_id: sessionId } });
    return true;
  } catch (error) {
    throw new Error('Error updating session');
  }
};

// Delete a session
Session.deleteSession = async function(sessionId) {
  try {
    await this.destroy({ where: { session_id: sessionId } });
    return true;
  } catch (error) {
    throw new Error('Error deleting session');
  }
};

module.exports = Session;
