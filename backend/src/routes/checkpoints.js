const express = require('express');
const router = express.Router();
const { TrainingCheckpoint } = require('../models');

// Get checkpoints for a hire
router.get('/hire/:hireId', async (req, res) => {
  try {
    const checkpoints = await TrainingCheckpoint.findAll({
      where: { hire_id: req.params.hireId },
      order: [['scheduled_date', 'ASC']]
    });
    res.json(checkpoints);
  } catch (error) {
    console.error('Get checkpoints error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update checkpoint
router.put('/:id', async (req, res) => {
  try {
    const checkpoint = await TrainingCheckpoint.findByPk(req.params.id);
    if (!checkpoint) {
      return res.status(404).json({ error: 'Checkpoint not found' });
    }
    await checkpoint.update(req.body);
    res.json(checkpoint);
  } catch (error) {
    console.error('Update checkpoint error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;