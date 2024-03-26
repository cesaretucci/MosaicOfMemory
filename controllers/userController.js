// userController.js

// userController.js

const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Controller functions for user operations...

// Function to hash the user's password before saving
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

exports.createUser = (req, res) => {
  const {username, email, password} = req.body;
  console.log(hashPassword(req.body.password))
  User.create({
      nome_utente: username,
      pwd:password,
      email: email,
      difficulty: 0,
      certified: false,
      card_color: '#E7E6DD',
      background_color: '#E7DDE6',
      partite_giocate: 0,
      partite_vinte: 0
  })
  .then((result) => {
      return res.json({

          message: "Record created successfully!",
      });
  })
  .catch((error) => {
      console.log(error);
      return res.json({
          message: "Unable to create a record!",
      });
  });
};
// Other controller functions...


// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;
    const newData = { email, password };
    const updated = await User.updateUser(userId, newData);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await User.deleteUser(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.setDifficulty = async (req, res) => {
  try {
    const { user_id, difficulty_level } = req.body;
    // Update difficulty level for user
    // Example logic
    await User.update({ difficulty: difficulty_level }, { where: { id: user_id } });

    res.status(200).json({ status: 'Success', message: 'Difficulty level updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to set difficulty level' });
  }
};

exports.setColors = async (req, res) => {
  try {
    const { user_id, color1, color2 } = req.body;
    // Update colors for user
    // Example logic
    await User.update({ card_color: color1, background_color: color2 }, { where: { id: user_id } });

    res.status(200).json({ status: 'Success', message: 'Colors updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to set colors' });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const { success } = req.body;
    const userId = req.params.userId;

    // Retrieve user from the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's score based on success
    if (success) {
      // Increment win count or update score accordingly
      user.partite_vinte += 1;
    } 
    user.partite_giocate += 1; // Increment played games count
    

    // Save the updated user data
    await user.save();

    res.status(200).json({ status: 'Success', message: 'Score updated successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update score' });
  }
};