const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    candidate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'candidates',
        key: 'id'
      }
    },
    position_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'positions',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'active'
    },
    
    // Scores
    overall_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    technical_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    ethical_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    creative_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    ai_symbiosis_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    
    // Recommendation
    recommendation: {
      type: DataTypes.TEXT
    },
    risk_factors: {
      type: DataTypes.JSON
    },
    
    // Decision
    decision: {
      type: DataTypes.STRING(50),
      comment: 'approved, rejected, on_hold'
    },
    decision_date: {
      type: DataTypes.DATE
    },
    decision_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    decision_notes: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'applications',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['candidate_id', 'position_id']
      }
    ]
  });

  return Application;
};