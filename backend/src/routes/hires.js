const express = require('express');
const router = express.Router();
const { Hire, Application } = require('../models');

// Get all hires
router.get('/', async (req, res) => {
  try {
    const hires = await Hire.findAll({
      include: [Application]
    });
    res.json(hires);
  } catch (error) {
    console.error('Get hires error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create hire
router.post('/', async (req, res) => {
  try {
    const hire = await Hire.create(req.body);
    res.status(201).json(hire);
  } catch (error) {
    console.error('Create hire error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;