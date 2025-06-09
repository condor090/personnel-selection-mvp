const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TrainingCheckpoint = sequelize.define('TrainingCheckpoint', {
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
    checkpoint_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    checkpoint_type: {
      type: DataTypes.STRING(50),
      comment: 'training, evaluation, certification'
    },
    scheduled_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
    // Verification
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'skipped'),
      defaultValue: 'pending'
    },
    completed_date: {
      type: DataTypes.DATE
    },
    
    // Biometric/QR verification
    verification_method: {
      type: DataTypes.STRING(50),
      comment: 'qr, fingerprint, face_recognition'
    },
    verification_data: {
      type: DataTypes.JSON
    },
    
    // Confirmations
    trainer_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    trainer_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    trainer_confirmation_time: {
      type: DataTypes.DATE
    },
    
    trainee_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    trainee_confirmation_time: {
      type: DataTypes.DATE
    },
    
    // Results
    score: {
      type: DataTypes.DECIMAL(5, 2)
    },
    feedback: {
      type: DataTypes.TEXT
    },
    attachments: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'training_checkpoints',
    timestamps: true,
    underscored: true
  });

  return TrainingCheckpoint;
};