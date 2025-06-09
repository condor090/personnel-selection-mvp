const express = require('express');
const router = express.Router();
const { Position } = require('../models');

// Get all positions
router.get('/', async (req, res) => {
  try {
    const positions = await Position.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(positions);
  } catch (error) {
    console.error('Get positions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get position by ID
router.get('/:id', async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json(position);
  } catch (error) {
    console.error('Get position error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create position
router.post('/', async (req, res) => {
  try {
    const position = await Position.create(req.body);
    res.status(201).json(position);
  } catch (error) {
    console.error('Create position error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update position
router.put('/:id', async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    await position.update(req.body);
    res.json(position);
  } catch (error) {
    console.error('Update position error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;