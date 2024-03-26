// cardController.js

const Card = require('../models/cardModel');

// Function to set a new card
exports.setCard = async (req, res) => {
  try {
    const { user_id, nome_card, img, audio } = req.body;
    const card = await Card.createCard(user_id, nome_card, img, audio);
    res.status(201).json({ status_code: 201 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get cards of a user
exports.getUserCards = async (req, res) => {
  try {
    const { user } = req; // Assuming user information is attached to the request object
    const cardList = await Card.findByUserId(user.id);
    res.json({ card_list: cardList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to remove a card
exports.removeCard = async (req, res) => {
  try {
    const { id_card } = req.params;
    const deleted = await Card.deleteCard(id_card);
    if (!deleted) {
      return res.status(404).json({ status_code: 404 });
    }
    res.json({ status_code: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
