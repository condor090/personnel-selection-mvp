const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Mock data for MVP - in production, these would be real queries
    const stats = {
      totalEmployees: 133,
      turnoverRate: 56,
      turnoverTrend: 'up',
      activePositions: 12,
      pendingApplications: 24,
      criticalLocations: [
        { location: 'Constellation', turnoverRate: 140 },
        { location: 'Anahuac', turnoverRate: 150 },
        { location: 'KIDE', turnoverRate: 15 },
        { location: 'Cocina', turnoverRate: 20 },
      ],
      monthlyTurnover: [
        { month: 'Ene', rate: 45 },
        { month: 'Feb', rate: 52 },
        { month: 'Mar', rate: 58 },
        { month: 'Abr', rate: 55 },
        { month: 'May', rate: 56 },
      ],
      assessmentScores: [
        { type: 'Técnica', avgScore: 75 },
        { type: 'Ética', avgScore: 82 },
        { type: 'Creatividad', avgScore: 68 },
        { type: 'Simbiosis IA', avgScore: 65 },
        { type: 'Psicométrica', avgScore: 78 },
      ],
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Turnover report
router.get('/turnover', async (req, res) => {
  try {
    // Mock turnover analysis
    const report = {
      summary: {
        total_turnover: 70,
        turnover_rate: 56,
        cost_impact: 1500000, // "un chingo de lana"
        critical_locations: ['Constellation', 'Anahuac']
      },
      by_location: [
        { location: 'Constellation', count: 28, rate: 140 },
        { location: 'Anahuac', count: 30, rate: 150 },
        { location: 'KIDE', count: 3, rate: 15 },
        { location: 'Cocina', count: 4, rate: 20 },
      ]
    };
    
    res.json(report);
  } catch (error) {
    console.error('Turnover report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;