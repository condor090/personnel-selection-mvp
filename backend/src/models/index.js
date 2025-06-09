const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('./User')(sequelize);
const Position = require('./Position')(sequelize);
const Candidate = require('./Candidate')(sequelize);
const Application = require('./Application')(sequelize);
const AssessmentResult = require('./AssessmentResult')(sequelize);
const Hire = require('./Hire')(sequelize);
const TrainingCheckpoint = require('./TrainingCheckpoint')(sequelize);
const PerformanceReview = require('./PerformanceReview')(sequelize);

// Define associations
const models = {
  User,
  Position,
  Candidate,
  Application,
  AssessmentResult,
  Hire,
  TrainingCheckpoint,
  PerformanceReview
};

// Application associations
Application.belongsTo(Candidate, { foreignKey: 'candidate_id' });
Application.belongsTo(Position, { foreignKey: 'position_id' });
Application.hasMany(AssessmentResult, { foreignKey: 'application_id' });
Application.hasOne(Hire, { foreignKey: 'application_id' });

// Assessment associations
AssessmentResult.belongsTo(Application, { foreignKey: 'application_id' });
AssessmentResult.belongsTo(User, { as: 'evaluator', foreignKey: 'evaluator_id' });

// Hire associations
Hire.belongsTo(Application, { foreignKey: 'application_id' });
Hire.hasMany(TrainingCheckpoint, { foreignKey: 'hire_id' });
Hire.hasMany(PerformanceReview, { foreignKey: 'hire_id' });

// Training checkpoint associations
TrainingCheckpoint.belongsTo(Hire, { foreignKey: 'hire_id' });
TrainingCheckpoint.belongsTo(User, { as: 'trainer', foreignKey: 'trainer_id' });

// Performance review associations
PerformanceReview.belongsTo(Hire, { foreignKey: 'hire_id' });
PerformanceReview.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewer_id' });

module.exports = {
  sequelize,
  ...models
};