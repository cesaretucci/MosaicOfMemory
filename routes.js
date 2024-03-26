// routes.js

const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const cardController = require('./controllers/cardController');
const sessionController = require('./controllers/sessionController');
const gameSessionController = require('./controllers/gameSessionController');

// Routes for User Controller
router.post('/user/create', userController.createUser);
// Set difficulty level for user
router.post('/user/difficulty', userController.setDifficulty);

// Enter admin mode
router.post('/admin/enter', userController.enterAdminMode);

// Leave admin mode
router.post('/admin/leave', userController.leaveAdminMode);

// Set colors for user
router.post('/user/colors', userController.setColors);

// Update user score
router.post('/users/score', userController.updateScore);

module.exports = router;
