const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock user for MVP (no database)
const mockUser = {
  id: '1',
  email: 'admin@example.com',
  password: 'admin123', // In production, this should be hashed
  full_name: 'Administrador',
  role: 'admin'
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check mock user
    if (email !== mockUser.email || password !== mockUser.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email, role: mockUser.role },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.json({
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        full_name: mockUser.full_name,
        role: mockUser.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    
    if (decoded.email === mockUser.email) {
      res.json({ 
        user: {
          id: mockUser.id,
          email: mockUser.email,
          full_name: mockUser.full_name,
          role: mockUser.role
        }
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;