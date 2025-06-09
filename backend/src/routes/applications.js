const express = require('express');
const router = express.Router();
const { Application, Candidate, Position } = require('../models');

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: Candidate,
          attributes: ['id', 'full_name', 'email']
        },
        {
          model: Position,
          attributes: ['id', 'title', 'location', 'department']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [Candidate, Position]
    });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create application
router.post('/', async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update application
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    await application.update(req.body);
    res.json(application);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;