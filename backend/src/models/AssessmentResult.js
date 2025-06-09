const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AssessmentResult = sequelize.define('AssessmentResult', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    application_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'applications',
        key: 'id'
      }
    },
    assessment_type: {
      type: DataTypes.ENUM('technical', 'psychometric', 'ethical', 'creative', 'ai_symbiosis'),
      allowNull: false
    },
    tool_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    
    // Results
    raw_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    normalized_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    details: {
      type: DataTypes.JSON
    },
    
    // AI-specific fields
    ai_prompts_used: {
      type: DataTypes.JSON,
      comment: 'Prompts used during AI collaboration assessment'
    },
    ai_interaction_quality: {
      type: DataTypes.DECIMAL(5, 2)
    },
    
    // Ethical evaluation specific
    ethical_dilemmas_responses: {
      type: DataTypes.JSON
    },
    integrity_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    empathy_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    
    // Creative evaluation specific
    divergent_thinking_score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    innovation_examples: {
      type: DataTypes.JSON
    },
    
    // Metadata
    evaluator_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    evaluation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    duration_minutes: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'assessment_results',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['application_id', 'assessment_type', 'tool_name']
      }
    ]
  });

  return AssessmentResult;
};