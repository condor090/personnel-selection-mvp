const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const winston = require('winston');
const { sequelize } = require('./models');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'personnel-selection-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/positions', require('./routes/positions'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/assessments', require('./routes/assessments'));
app.use('/api/hires', require('./routes/hires'));
app.use('/api/checkpoints', require('./routes/checkpoints'));
app.use('/api/reports', require('./routes/reports'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Test database connection - create DB if not exists
    try {
      await sequelize.authenticate();
      logger.info('Database connection established successfully');
    } catch (dbError) {
      if (dbError.original?.code === '3D000') {
        logger.warn('Database does not exist, running without database');
        // Continue without database for MVP demo
      } else {
        throw dbError;
      }
    }

    // Sync database models (in production, use migrations instead)
    if (process.env.NODE_ENV === 'development') {
      try {
        await sequelize.sync({ alter: true });
        logger.info('Database models synchronized');
      } catch (syncError) {
        logger.warn('Could not sync database models:', syncError.message);
      }
    }

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    // Start without database for demo
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} (without database)`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await sequelize.close();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;