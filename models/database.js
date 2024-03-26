const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('mom', 'root', 'SakuraNarutoSasuke7', {
  host: 'localhost',
  dialect: 'mysql' // Or your preferred database dialect
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;