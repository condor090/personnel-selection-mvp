const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Candidate = sequelize.define('Candidate', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(50)
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    address: {
      type: DataTypes.TEXT
    },
    
    // Professional info
    current_position: {
      type: DataTypes.STRING(255)
    },
    years_experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    education_level: {
      type: DataTypes.STRING(100)
    },
    resume_url: {
      type: DataTypes.TEXT
    },
    
    // Status
    status: {
      type: DataTypes.ENUM('new', 'in_evaluation', 'approved', 'rejected', 'hired', 'terminated'),
      defaultValue: 'new'
    },
    
    // Metadata
    source: {
      type: DataTypes.STRING(100),
      comment: 'website, referral, headhunter, etc.'
    },
    referral_employee_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'candidates',
    timestamps: true,
    underscored: true
  });

  return Candidate;
};