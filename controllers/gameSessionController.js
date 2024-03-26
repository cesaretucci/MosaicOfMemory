// gameSessionController.js

const GameSession = require('../models/gameSessionModel');
const { Op } = require('sequelize');

// Function to get the average number of helps for a user
exports.getAverageHelps = async (req, res) => {
  try {
    const { user_id } = req.params;
    const averageHelps = await GameSession.findOne({
      attributes: [[GameSession.sequelize.fn('AVG', GameSession.sequelize.col('number_of_helps')), 'average_helps']],
      where: { id_utente: user_id }
    });
    res.json({ average_helps: averageHelps.average_helps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the average time for a user
exports.getAverageTime = async (req, res) => {
  try {
    const { user_id } = req.params;
    const averageTime = await GameSession.findOne({
      attributes: [[GameSession.sequelize.fn('AVG', GameSession.sequelize.col('game_time')), 'average_time']],
      where: { id_utente: user_id }
    });
    res.json({ average_time: averageTime.average_time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the average time per difficulty for a user
exports.getAverageTimePerDifficulty = async (req, res) => {
  try {
    const { user_id, difficulty } = req.params;
    const averageTimePerDifficulty = await GameSession.findOne({
      attributes: [[GameSession.sequelize.fn('AVG', GameSession.sequelize.col('game_time')), 'average_time_per_difficulty']],
      where: { id_utente: user_id, difficulty }
    });
    res.json({ average_time_per_difficulty: averageTimePerDifficulty.average_time_per_difficulty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the success rate for a user
exports.getSuccessRate = async (req, res) => {
  try {
    const { user_id } = req.params;
    const successRate = await GameSession.findOne({
      attributes: [
        [GameSession.sequelize.fn('COUNT', GameSession.sequelize.col('ID')), 'total_sessions'],
        [GameSession.sequelize.fn('SUM', GameSession.sequelize.literal('CASE WHEN completed = true THEN 1 ELSE 0 END')), 'successful_sessions']
      ],
      where: { id_utente: user_id }
    });
    const rate = (successRate.successful_sessions / successRate.total_sessions) * 100;
    res.json({ success_rate: rate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the average number of moves for a user
exports.getAverageMoves = async (req, res) => {
  try {
    const { user_id } = req.params;
    const averageMoves = await GameSession.findOne({
      attributes: [[GameSession.sequelize.fn('AVG', GameSession.sequelize.col('number_of_moves')), 'average_moves']],
      where: { id_utente: user_id }
    });
    res.json({ average_moves: averageMoves.average_moves });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Funzione per gestire le richieste di errore 404
exports.notFound = (req, res, next) => {
    res.status(404).json({ error: 'Not found' });
  };
  
  // Funzione per gestire gli errori globali
exports.handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};
  
  // Funzione per verificare l'autenticazione dell'utente
exports.authenticateUser = (req, res, next) => {
    // Esempio di verifica dell'autenticazione
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};
  
  // Funzione per gestire le richieste di autorizzazione non riuscite
exports.handleUnauthorized = (req, res, next) => {
    res.status(403).json({ error: 'Forbidden' });
};
  