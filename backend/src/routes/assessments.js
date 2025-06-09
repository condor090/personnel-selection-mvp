const express = require('express');
const router = express.Router();
const { AssessmentResult, Application } = require('../models');

// Get assessments for an application
router.get('/application/:applicationId', async (req, res) => {
  try {
    const assessments = await AssessmentResult.findAll({
      where: { application_id: req.params.applicationId }
    });
    res.json(assessments);
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create assessment result
router.post('/', async (req, res) => {
  try {
    const assessment = await AssessmentResult.create(req.body);
    
    // Update application scores if needed
    // This would be enhanced with the MatchingService
    
    res.status(201).json(assessment);
  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;