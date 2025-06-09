import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Lightbulb as LightbulbIcon,
  Computer as ComputerIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import QRCode from 'react-qr-code';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDecisionDialog, setOpenDecisionDialog] = useState(false);
  const [decision, setDecision] = useState('');
  const [decisionNotes, setDecisionNotes] = useState('');

  // Mock data
  const application = {
    id,
    candidate: {
      id: '2',
      name: 'María López Hernández',
      email: 'maria.lopez@email.com',
      phone: '+52 555 2345678',
      current_position: 'Supervisor de Cocina',
      experience: 8,
    },
    position: {
      id: '1',
      title: 'Supervisor de Turno',
      location: 'Anahuac',
      department: 'Operaciones',
      hierarchy_level: 'supervisor',
      min_ethical_score: 85,
      ai_collaboration_level: 6,
    },
    status: 'active',
    created_at: '2024-01-18',
    
    // Scores
    overall_score: 85,
    scores: {
      technical: 88,
      ethical: 92,
      creative: 78,
      ai_symbiosis: 82,
      psychometric: 85,
    },
    
    // Matching analysis
    matching: {
      strengths: [
        'Excepcional puntuación ética (92% vs 85% requerido)',
        'Sólida experiencia en supervisión',
        'Alta adaptabilidad demostrada',
      ],
      warnings: [
        'Creatividad ligeramente por debajo del ideal',
        'Primera experiencia en ubicación crítica (Anahuac)',
      ],
      risk_factors: [
        {
          type: 'location',
          level: 'medium',
          description: 'Anahuac tiene alta rotación histórica',
        },
      ],
      recommendation: {
        decision: 'recommended',
        summary: 'Candidato sólido con plan de soporte',
        action: 'Proceder con onboarding reforzado',
      },
    },
    
    // Assessment details
    assessments: [
      {
        type: 'technical',
        completed: true,
        date: '2024-01-19',
        evaluator: 'Carlos Mendoza',
        highlights: [
          'Dominio de procesos operativos',
          'Conocimiento de KPIs',
          'Experiencia en gestión de equipos',
        ],
      },
      {
        type: 'ethical',
        completed: true,
        date: '2024-01-20',
        evaluator: 'Ana García',
        highlights: [
          'Alta integridad en dilemas éticos',
          'Excelente capacidad de empatía',
          'Orientación al bien común',
        ],
      },
      {
        type: 'ai_symbiosis',
        completed: true,
        date: '2024-01-21',
        evaluator: 'Patricia Soto',
        highlights: [
          'Buena comprensión de herramientas IA',
          'Capacidad de prompt engineering',
          'Actitud positiva hacia la tecnología',
        ],
      },
    ],
    
    // Proposed training plan
    training_plan: {
      duration_days: 30,
      checkpoints: [
        { day: 1, activity: 'Inducción general', type: 'mandatory' },
        { day: 3, activity: 'Procesos específicos Anahuac', type: 'mandatory' },
        { day: 7, activity: 'Evaluación inicial', type: 'evaluation' },
        { day: 15, activity: 'Certificación procesos', type: 'certification' },
        { day: 30, activity: 'Evaluación final', type: 'evaluation' },
      ],
      mentor: 'Juan Carlos Ruiz',
    },
  };

  const handleDecision = () => {
    setOpenDecisionDialog(true);
  };

  const handleSaveDecision = () => {
    // Save decision logic
    console.log('Decision:', decision, 'Notes:', decisionNotes);
    setOpenDecisionDialog(false);
  };

  const getScoreColor = (score: number, minimum?: number) => {
    if (minimum && score < minimum) return 'error';
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const ScoreCard = ({ title, score, minimum, icon }: any) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" color={getScoreColor(score, minimum)}>
              {score}%
            </Typography>
            {minimum && (
              <Typography variant="caption" color="text.secondary">
                Mínimo: {minimum}%
              </Typography>
            )}
          </Box>
          <Box>{icon}</Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={score}
          color={getScoreColor(score, minimum)}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/applications')}
        >
          Volver
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Aplicación #{application.id}
        </Typography>
        {!application.matching.recommendation.decision && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDecision}
          >
            Tomar Decisión
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Candidate & Position Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Candidato
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  {application.candidate.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {application.candidate.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {application.candidate.current_position} • {application.candidate.experience} años exp.
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={application.candidate.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teléfono"
                    secondary={application.candidate.phone}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Posición
              </Typography>
              <Box mb={2}>
                <Typography variant="subtitle1">
                  {application.position.title}
                </Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Chip
                    label={application.position.location}
                    color="error"
                    size="small"
                  />
                  <Chip
                    label={application.position.department}
                    size="small"
                  />
                  <Chip
                    label={application.position.hierarchy_level}
                    color="warning"
                    size="small"
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Requisitos Clave
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Score Ético Mínimo"
                    secondary={`${application.position.min_ethical_score}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Nivel Colaboración IA"
                    secondary={`${application.position.ai_collaboration_level}/10`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Overall Score */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6">Score General de Compatibilidad</Typography>
                <Typography variant="h2">{application.overall_score}%</Typography>
              </Box>
              <Box>
                {application.overall_score >= 85 && <CheckCircleIcon sx={{ fontSize: 60 }} />}
                {application.overall_score >= 70 && application.overall_score < 85 && <WarningIcon sx={{ fontSize: 60 }} />}
                {application.overall_score < 70 && <CancelIcon sx={{ fontSize: 60 }} />}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Individual Scores */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Detalle de Evaluaciones
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={2.4}>
              <ScoreCard
                title="Técnica"
                score={application.scores.technical}
                icon={<AssignmentTurnedInIcon color="primary" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <ScoreCard
                title="Ética"
                score={application.scores.ethical}
                minimum={application.position.min_ethical_score}
                icon={<ThumbUpIcon color="success" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <ScoreCard
                title="Creatividad"
                score={application.scores.creative}
                icon={<LightbulbIcon color="warning" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <ScoreCard
                title="Simbiosis IA"
                score={application.scores.ai_symbiosis}
                icon={<ComputerIcon color="info" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <ScoreCard
                title="Psicométrica"
                score={application.scores.psychometric}
                icon={<PsychologyIcon color="secondary" />}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Matching Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                Fortalezas
              </Typography>
              <List>
                {application.matching.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                Puntos de Atención
              </Typography>
              <List>
                {application.matching.warnings.map((warning, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={warning} />
                  </ListItem>
                ))}
              </List>
              
              {application.matching.risk_factors.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="error">
                    Factores de Riesgo
                  </Typography>
                  {application.matching.risk_factors.map((risk, index) => (
                    <Alert 
                      key={index} 
                      severity={risk.level === 'high' ? 'error' : 'warning'}
                      sx={{ mt: 1 }}
                    >
                      {risk.description}
                    </Alert>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendation */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'grey.100' }}>
            <Typography variant="h6" gutterBottom>
              Recomendación del Sistema
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {application.matching.recommendation.decision === 'recommended' && (
                <ThumbUpIcon color="success" sx={{ fontSize: 40 }} />
              )}
              <Box>
                <Typography variant="h5">
                  {application.matching.recommendation.summary}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {application.matching.recommendation.action}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Training Plan */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Plan de Capacitación Propuesto
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Duración: {application.training_plan.duration_days} días • 
                Mentor asignado: {application.training_plan.mentor}
              </Alert>
              
              <Stepper orientation="vertical">
                {application.training_plan.checkpoints.map((checkpoint, index) => (
                  <Step key={index} active>
                    <StepLabel>
                      Día {checkpoint.day}: {checkpoint.activity}
                    </StepLabel>
                    <StepContent>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={checkpoint.type}
                          size="small"
                          color={checkpoint.type === 'mandatory' ? 'primary' : 'secondary'}
                        />
                        {checkpoint.type === 'certification' && (
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="caption">QR de verificación:</Typography>
                            <Box sx={{ mt: 1, p: 1, bgcolor: 'white', display: 'inline-block' }}>
                              <QRCode value={`checkpoint-${index}`} size={80} />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Decision Dialog */}
      <Dialog open={openDecisionDialog} onClose={() => setOpenDecisionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tomar Decisión</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Decisión</InputLabel>
            <Select
              value={decision}
              label="Decisión"
              onChange={(e) => setDecision(e.target.value)}
            >
              <MenuItem value="approved">Aprobar</MenuItem>
              <MenuItem value="rejected">Rechazar</MenuItem>
              <MenuItem value="on_hold">En Espera</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notas de la decisión"
            value={decisionNotes}
            onChange={(e) => setDecisionNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDecisionDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveDecision} variant="contained">
            Guardar Decisión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationDetail;