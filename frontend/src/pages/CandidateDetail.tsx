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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tab,
  Tabs,
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CandidateDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const candidate = {
    id,
    full_name: 'María López Hernández',
    email: 'maria.lopez@email.com',
    phone: '+52 555 2345678',
    birth_date: '1990-05-15',
    address: 'Av. Revolución 123, Col. Centro, CDMX',
    
    // Professional
    current_position: 'Supervisor de Cocina',
    years_experience: 8,
    education_level: 'Licenciatura en Administración',
    resume_url: '/resumes/maria-lopez.pdf',
    
    // Status
    status: 'approved',
    source: 'referral',
    referral_employee: 'Juan Pérez',
    created_at: '2024-01-18',
    
    // Applications
    applications: [
      {
        id: '1',
        position: 'Supervisor de Turno',
        location: 'Anahuac',
        status: 'active',
        overall_score: 85,
        decision: 'approved',
        applied_date: '2024-01-18',
      },
    ],
    
    // Assessment History
    assessments: [
      {
        type: 'technical',
        score: 88,
        date: '2024-01-19',
        evaluator: 'Carlos Mendoza',
      },
      {
        type: 'ethical',
        score: 92,
        date: '2024-01-20',
        evaluator: 'Ana García',
      },
      {
        type: 'creative',
        score: 78,
        date: '2024-01-20',
        evaluator: 'Luis Ramírez',
      },
      {
        type: 'ai_symbiosis',
        score: 82,
        date: '2024-01-21',
        evaluator: 'Patricia Soto',
      },
    ],
    
    // Timeline
    timeline: [
      {
        date: '2024-01-18',
        event: 'Candidato registrado',
        type: 'info',
      },
      {
        date: '2024-01-18',
        event: 'Aplicó a Supervisor de Turno',
        type: 'application',
      },
      {
        date: '2024-01-19',
        event: 'Evaluación técnica completada',
        type: 'assessment',
      },
      {
        date: '2024-01-21',
        event: 'Todas las evaluaciones completadas',
        type: 'success',
      },
      {
        date: '2024-01-22',
        event: 'Aprobado para contratación',
        type: 'approved',
      },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'in_evaluation': return 'warning';
      default: return 'default';
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'approved': return 'success';
      case 'assessment': return 'primary';
      case 'application': return 'secondary';
      default: return 'grey';
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/candidates')}
        >
          Volver
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Perfil del Candidato
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
        >
          Editar
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2, fontSize: '2rem' }}
                >
                  {candidate.full_name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {candidate.full_name}
                </Typography>
                <Chip
                  label={candidate.status}
                  color={getStatusColor(candidate.status)}
                  sx={{ mb: 2 }}
                />
              </Box>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={candidate.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={candidate.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={candidate.current_position}
                    secondary={`${candidate.years_experience} años de experiencia`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={candidate.education_level} />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fuente: {candidate.source} 
                {candidate.referral_employee && ` (${candidate.referral_employee})`}
              </Typography>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AttachFileIcon />}
                sx={{ mt: 2 }}
              >
                Ver CV
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Resumen" />
              <Tab label="Evaluaciones" />
              <Tab label="Aplicaciones" />
              <Tab label="Historial" />
            </Tabs>

            {/* Summary Tab */}
            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Información Personal
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Fecha de Nacimiento
                      </Typography>
                      <Typography variant="body1">
                        {new Date(candidate.birth_date).toLocaleDateString('es-MX')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Edad
                      </Typography>
                      <Typography variant="body1">
                        {new Date().getFullYear() - new Date(candidate.birth_date).getFullYear()} años
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Dirección
                      </Typography>
                      <Typography variant="body1">
                        {candidate.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Resumen de Evaluaciones
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {candidate.assessments.map((assessment) => (
                      <Box key={assessment.type}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">
                            {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {assessment.score}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={assessment.score}
                          color={assessment.score >= 80 ? 'success' : 'warning'}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Assessments Tab */}
            <TabPanel value={activeTab} index={1}>
              <List>
                {candidate.assessments.map((assessment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography>
                              Evaluación {assessment.type}
                            </Typography>
                            <Chip
                              label={`${assessment.score}%`}
                              color={assessment.score >= 80 ? 'success' : 'warning'}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Evaluador: {assessment.evaluator}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Fecha: {new Date(assessment.date).toLocaleDateString('es-MX')}
                            </Typography>
                            <Rating
                              value={assessment.score / 20}
                              readOnly
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < candidate.assessments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            {/* Applications Tab */}
            <TabPanel value={activeTab} index={2}>
              <List>
                {candidate.applications.map((application) => (
                  <ListItem key={application.id}>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography>
                            {application.position} - {application.location}
                          </Typography>
                          <Box display="flex" gap={1}>
                            <Chip
                              label={`Score: ${application.overall_score}%`}
                              size="small"
                              color="primary"
                            />
                            {application.decision && (
                              <Chip
                                label={application.decision}
                                size="small"
                                color={application.decision === 'approved' ? 'success' : 'error'}
                              />
                            )}
                          </Box>
                        </Box>
                      }
                      secondary={`Aplicado: ${new Date(application.applied_date).toLocaleDateString('es-MX')}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/applications/new')}
                >
                  Nueva Aplicación
                </Button>
              </Box>
            </TabPanel>

            {/* Timeline Tab */}
            <TabPanel value={activeTab} index={3}>
              <Timeline>
                {candidate.timeline.map((event, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={getTimelineColor(event.type)}>
                        {event.type === 'approved' && <CheckCircleIcon />}
                        {event.type === 'assessment' && <AssignmentIcon />}
                        {event.type === 'application' && <WorkIcon />}
                        {event.type === 'info' && <ScheduleIcon />}
                      </TimelineDot>
                      {index < candidate.timeline.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1">{event.event}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleDateString('es-MX')}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateDetail;