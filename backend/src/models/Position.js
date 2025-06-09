const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Position = sequelize.define('Position', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hierarchy_level: {
      type: DataTypes.ENUM('directive', 'supervisor', 'operative'),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(255)
    },
    location: {
      type: DataTypes.STRING(255),
      comment: 'Constellation, Anahuac, etc.'
    },
    tree_nodes: {
      type: DataTypes.JSON,
      comment: 'Array of organization_tree IDs this position covers'
    },
    
    // Position requirements
    min_experience_years: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    required_education: {
      type: DataTypes.TEXT
    },
    required_skills: {
      type: DataTypes.JSON
    },
    required_certifications: {
      type: DataTypes.JSON
    },
    
    // AI symbiosis requirements
    ai_collaboration_level: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      },
      comment: 'Level of AI collaboration required (1-10)'
    },
    required_ai_tools: {
      type: DataTypes.JSON
    },
    
    // Ethical and creative requirements
    min_ethical_score: {
      type: DataTypes.INTEGER,
      defaultValue: 75
    },
    min_creativity_score: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    min_intuition_score: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'positions',
    timestamps: true,
    underscored: true
  });

  return Position;
};