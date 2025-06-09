const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Hire = sequelize.define('Hire', {
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2)
    },
    contract_type: {
      type: DataTypes.STRING(50)
    },
    
    // Onboarding plan
    training_plan: {
      type: DataTypes.JSON,
      comment: 'Structured training plan with milestones'
    },
    assigned_mentor_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    probation_end_date: {
      type: DataTypes.DATEONLY
    }
  }, {
    tableName: 'hires',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  });

  return Hire;
};