# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Sistema Tomográfico de Selección de Personal - MVP to reduce employee turnover (56% annual, 140-150% in critical locations) through multidimensional candidate evaluation and progressive technical development.

## Common Commands

### Development
```bash
# Run full stack development (recommended)
npm run dev

# Run separately
npm run backend:dev    # Backend on port 8091
npm run frontend:dev   # Frontend on port 3008

# Install all dependencies
npm run install:all
```

### Backend Operations (from /backend)
```bash
npm run dev     # Development with auto-restart
npm start       # Production server
npm test        # Run tests
npm run lint    # Code quality check
```

### Frontend Operations (from /frontend)
```bash
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
npm run lint    # TypeScript linting
```

## Architecture

### Stack
- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express + PostgreSQL (Sequelize ORM)
- **Auth**: JWT tokens stored in localStorage
- **API**: RESTful endpoints at `/api/*`

### Key Business Logic

#### MatchingService (`backend/src/services/MatchingService.js`)
Calculates candidate-position compatibility with weighted scoring:
- Technical: 30%, Ethical: 25%, AI Symbiosis: 20%, Creative: 15%, Psychometric: 10%
- Generates risk assessments for high-turnover locations (Constellation, Anahuac)
- Provides recommendations: highly_recommended, recommended, conditional, not_recommended

#### AIAssessmentService (`backend/src/services/AIAssessmentService.js`)
Evaluates AI collaboration readiness:
- Measures prompt engineering, critical thinking, tool adoption
- Generates training recommendations
- Optional OpenAI integration for interview questions

### Database Schema
Core relationships:
- Applications link Candidates ↔ Positions
- Assessment Results belong to Applications
- Hires track successful applications
- Training Checkpoints verify progress with QR/biometric
- Performance Reviews at 30/60/90 days

### Authentication Flow
1. Login at `/api/auth/login` returns JWT
2. Token stored in localStorage
3. Include in Authorization header: `Bearer ${token}`
4. Backend validates on protected routes

### Key Features
1. **Tomographic Evaluation**: 5-dimensional assessment (Technical, Ethical, Creative, AI, Psychometric)
2. **Belt System**: 7-level progression (white→black) at `/belts`
3. **QR Checkpoints**: Process verification at `/checkpoints`
4. **Risk Analytics**: Automated turnover prediction
5. **Mock Mode**: Runs without database for demos

### Environment Configuration
Backend `.env` required:
```
NODE_ENV=development
PORT=8091
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3008
```

### Important Routes
- `/` - Dashboard with turnover metrics
- `/positions` - Job position management
- `/candidates` - Candidate profiles
- `/applications` - Application tracking
- `/assessments` - Evaluation management
- `/belts` - Technical development tracking
- `/checkpoints` - QR verification system

### Testing Credentials
- Email: `admin@example.com`
- Password: `admin123`

### Development Notes
- Frontend hot-reloads on file changes
- Backend uses nodemon for auto-restart
- Supports running without database (mock data)
- CORS configured for local development
- Comprehensive error logging with Winston