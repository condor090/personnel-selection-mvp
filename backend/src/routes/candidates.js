const express = require('express');
const router = express.Router();
const { Candidate } = require('../models');

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(candidates);
  } catch (error) {
    console.error('Get candidates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error('Get candidate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create candidate
router.post('/', async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    console.error('Create candidate error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update candidate
router.put('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    await candidate.update(req.body);
    res.json(candidate);
  } catch (error) {
    console.error('Update candidate error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;