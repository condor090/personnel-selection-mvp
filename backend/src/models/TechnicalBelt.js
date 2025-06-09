const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TechnicalBelt = sequelize.define('TechnicalBelt', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    hire_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'hires',
        key: 'id'
      }
    },
    belt_level: {
      type: DataTypes.ENUM('white', 'yellow', 'orange', 'green', 'blue', 'brown', 'black'),
      allowNull: false,
      comment: 'Belt progression: white (beginner) to black (expert)'
    },
    position_id: {
      type: DataTypes.UUID,
      references: {
        model: 'positions',
        key: 'id'
      }
    },
    
    // Skills and competencies for this belt
    required_skills: {
      type: DataTypes.JSON,
      comment: 'Array of skills that must be mastered'
    },
    completed_skills: {
      type: DataTypes.JSON,
      defaultValue: [],
      comment: 'Skills already mastered'
    },
    
    // Progress tracking
    progress_percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    
    // Certification
    certification_date: {
      type: DataTypes.DATE
    },
    certified_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    
    // Time tracking
    estimated_days: {
      type: DataTypes.INTEGER,
      comment: 'Estimated days to complete this belt'
    },
    actual_days: {
      type: DataTypes.INTEGER,
      comment: 'Actual days taken'
    },
    
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'expired'),
      defaultValue: 'not_started'
    }
  }, {
    tableName: 'technical_belts',
    timestamps: true,
    underscored: true
  });

  return TechnicalBelt;
};