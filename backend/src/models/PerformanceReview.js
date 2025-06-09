const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PerformanceReview = sequelize.define('PerformanceReview', {
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
    review_period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '30, 60, 90 days'
    },
    
    // Metrics
    productivity_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    quality_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    attendance_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    teamwork_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    ai_tool_adoption: {
      type: DataTypes.DECIMAL(5, 2),
      comment: 'How well the employee adopts and uses AI tools'
    },
    
    // Feedback
    strengths: {
      type: DataTypes.TEXT
    },
    areas_for_improvement: {
      type: DataTypes.TEXT
    },
    action_plan: {
      type: DataTypes.TEXT
    },
    
    // Risk assessment
    turnover_risk: {
      type: DataTypes.STRING(20),
      comment: 'low, medium, high'
    },
    risk_factors: {
      type: DataTypes.JSON
    },
    
    reviewer_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'performance_reviews',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['hire_id', 'review_period']
      }
    ]
  });

  return PerformanceReview;
};