-- Personnel Selection Tomographic System Database Schema

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'hr_manager', 'evaluator', 'viewer');
CREATE TYPE hierarchy_level AS ENUM ('directive', 'supervisor', 'operative');
CREATE TYPE candidate_status AS ENUM ('new', 'in_evaluation', 'approved', 'rejected', 'hired', 'terminated');
CREATE TYPE assessment_type AS ENUM ('technical', 'psychometric', 'ethical', 'creative', 'ai_symbiosis');
CREATE TYPE checkpoint_status AS ENUM ('pending', 'completed', 'failed', 'skipped');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Organization structure (árbol de satisfacción)
CREATE TABLE organization_tree (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES organization_tree(id),
    node_type VARCHAR(50) NOT NULL, -- 'process', 'subprocess', 'microprocedure'
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Positions
CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    hierarchy_level hierarchy_level NOT NULL,
    department VARCHAR(255),
    location VARCHAR(255), -- 'Constellation', 'Anahuac', etc.
    tree_nodes JSON, -- Array of organization_tree IDs this position covers
    
    -- Position requirements
    min_experience_years INTEGER DEFAULT 0,
    required_education TEXT,
    required_skills JSON,
    required_certifications JSON,
    
    -- AI symbiosis requirements
    ai_collaboration_level INTEGER CHECK (ai_collaboration_level BETWEEN 1 AND 10),
    required_ai_tools JSON,
    
    -- Ethical and creative requirements
    min_ethical_score INTEGER DEFAULT 75,
    min_creativity_score INTEGER DEFAULT 50,
    min_intuition_score INTEGER DEFAULT 50,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Position assessment configurations
CREATE TABLE position_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position_id UUID NOT NULL REFERENCES positions(id),
    assessment_type assessment_type NOT NULL,
    tool_name VARCHAR(255) NOT NULL,
    tool_config JSON,
    weight DECIMAL(3,2) CHECK (weight BETWEEN 0 AND 1),
    is_mandatory BOOLEAN DEFAULT true,
    order_index INTEGER,
    UNIQUE(position_id, assessment_type, tool_name)
);

-- Candidates
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    address TEXT,
    
    -- Professional info
    current_position VARCHAR(255),
    years_experience INTEGER DEFAULT 0,
    education_level VARCHAR(100),
    resume_url TEXT,
    
    -- Status
    status candidate_status DEFAULT 'new',
    
    -- Metadata
    source VARCHAR(100), -- 'website', 'referral', 'headhunter', etc.
    referral_employee_id UUID REFERENCES users(id),
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES candidates(id),
    position_id UUID NOT NULL REFERENCES positions(id),
    status VARCHAR(50) DEFAULT 'active',
    
    -- Scores
    overall_score DECIMAL(5,2),
    technical_score DECIMAL(5,2),
    ethical_score DECIMAL(5,2),
    creative_score DECIMAL(5,2),
    ai_symbiosis_score DECIMAL(5,2),
    
    -- Recommendation
    recommendation TEXT,
    risk_factors JSON,
    
    -- Decision
    decision VARCHAR(50), -- 'approved', 'rejected', 'on_hold'
    decision_date TIMESTAMP,
    decision_by UUID REFERENCES users(id),
    decision_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(candidate_id, position_id)
);

-- Assessment results
CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id),
    assessment_type assessment_type NOT NULL,
    tool_name VARCHAR(255) NOT NULL,
    
    -- Results
    raw_score DECIMAL(5,2),
    normalized_score DECIMAL(5,2),
    details JSON,
    
    -- AI-specific fields
    ai_prompts_used JSON,
    ai_interaction_quality DECIMAL(5,2),
    
    -- Ethical evaluation specific
    ethical_dilemmas_responses JSON,
    integrity_score DECIMAL(5,2),
    empathy_score DECIMAL(5,2),
    
    -- Creative evaluation specific
    divergent_thinking_score DECIMAL(5,2),
    innovation_examples JSON,
    
    -- Metadata
    evaluator_id UUID REFERENCES users(id),
    evaluation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_minutes INTEGER,
    
    UNIQUE(application_id, assessment_type, tool_name)
);

-- Hiring decisions and onboarding
CREATE TABLE hires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id),
    start_date DATE NOT NULL,
    salary DECIMAL(10,2),
    contract_type VARCHAR(50),
    
    -- Onboarding plan
    training_plan JSON,
    assigned_mentor_id UUID REFERENCES users(id),
    probation_end_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training checkpoints
CREATE TABLE training_checkpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hire_id UUID NOT NULL REFERENCES hires(id),
    checkpoint_name VARCHAR(255) NOT NULL,
    checkpoint_type VARCHAR(50), -- 'training', 'evaluation', 'certification'
    scheduled_date TIMESTAMP NOT NULL,
    
    -- Verification
    status checkpoint_status DEFAULT 'pending',
    completed_date TIMESTAMP,
    
    -- Biometric/QR verification
    verification_method VARCHAR(50), -- 'qr', 'fingerprint', 'face_recognition'
    verification_data JSON,
    
    -- Confirmations
    trainer_confirmed BOOLEAN DEFAULT false,
    trainer_id UUID REFERENCES users(id),
    trainer_confirmation_time TIMESTAMP,
    
    trainee_confirmed BOOLEAN DEFAULT false,
    trainee_confirmation_time TIMESTAMP,
    
    -- Results
    score DECIMAL(5,2),
    feedback TEXT,
    attachments JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance tracking (30/60/90 days)
CREATE TABLE performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hire_id UUID NOT NULL REFERENCES hires(id),
    review_period INTEGER NOT NULL, -- 30, 60, 90
    
    -- Metrics
    productivity_score DECIMAL(5,2),
    quality_score DECIMAL(5,2),
    attendance_score DECIMAL(5,2),
    teamwork_score DECIMAL(5,2),
    ai_tool_adoption DECIMAL(5,2),
    
    -- Feedback
    strengths TEXT,
    areas_for_improvement TEXT,
    action_plan TEXT,
    
    -- Risk assessment
    turnover_risk VARCHAR(20), -- 'low', 'medium', 'high'
    risk_factors JSON,
    
    reviewer_id UUID REFERENCES users(id),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(hire_id, review_period)
);

-- Turnover tracking
CREATE TABLE turnover_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hire_id UUID NOT NULL REFERENCES hires(id),
    termination_date DATE NOT NULL,
    reason VARCHAR(100),
    is_voluntary BOOLEAN,
    exit_interview_notes TEXT,
    
    -- Cost analysis
    training_cost DECIMAL(10,2),
    replacement_cost DECIMAL(10,2),
    productivity_loss DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_position ON applications(position_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_assessment_results_application ON assessment_results(application_id);
CREATE INDEX idx_training_checkpoints_hire ON training_checkpoints(hire_id);
CREATE INDEX idx_training_checkpoints_status ON training_checkpoints(status);
CREATE INDEX idx_performance_reviews_hire ON performance_reviews(hire_id);
CREATE INDEX idx_positions_location ON positions(location);
CREATE INDEX idx_positions_hierarchy ON positions(hierarchy_level);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_positions_updated_at BEFORE UPDATE ON positions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_checkpoints_updated_at BEFORE UPDATE ON training_checkpoints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();