// sessionController.js

const Session = require('../models/sessionModel');

// Function to create a new session
exports.createSession = async (req, res) => {
  try {
    const { user_id, session_type } = req.body;
    const session = await Session.createSession(user_id, session_type);
    res.status(201).json({ status_code: 201 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a session
exports.deleteSession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const deleted = await Session.deleteSession(session_id);
    if (!deleted) {
      return res.status(404).json({ status_code: 404 });
    }
    res.json({ status_code: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to set a session as admin session
exports.setAdminSession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const updated = await Session.updateSession(session_id, { session_type: 'admin' });
    if (!updated) {
      return res.status(404).json({ status_code: 404 });
    }
    res.json({ status_code: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to set a session as user session
exports.setUserSession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const updated = await Session.updateSession(session_id, { session_type: 'user' });
    if (!updated) {
      return res.status(404).json({ status_code: 404 });
    }
    res.json({ status_code: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
