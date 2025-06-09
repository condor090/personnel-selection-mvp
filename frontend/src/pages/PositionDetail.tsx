import React from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';

const PositionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on ID
  const position = {
    id,
    code: 'SUP-001',
    title: 'Supervisor de Turno',
    hierarchy_level: 'supervisor',
    department: 'Operaciones',
    location: 'Anahuac',
    is_active: true,
    created_at: '2024-01-10',
    
    // Requirements
    min_experience_years: 3,
    required_education: 'Licenciatura en Administración o afín',
    required_skills: [
      'Liderazgo de equipos',
      'Gestión de conflictos',
      'Conocimiento de procesos operativos',
      'Manejo de KPIs',
    ],
    required_certifications: [
      'Certificación en manejo de alimentos',
      'Primeros auxilios',
    ],
    
    // AI & Ethics
    ai_collaboration_level: 6,
    required_ai_tools: ['ChatGPT', 'Herramientas de análisis de datos', 'Sistemas de gestión'],
    min_ethical_score: 85,
    min_creativity_score: 70,
    min_intuition_score: 75,
    
    // Tree nodes (árbol de satisfacción)
    tree_nodes: [
      { id: 'OP-001', name: 'Gestión de personal', type: 'process' },
      { id: 'OP-002', name: 'Control de calidad', type: 'process' },
      { id: 'OP-003', name: 'Reportes operativos', type: 'subprocess' },
    ],
    
    // Assessment configuration
    assessments: [
      { type: 'technical', tool: 'Evaluación de conocimientos operativos', weight: 0.30 },
      { type: 'ethical', tool: 'Dilemas éticos de supervisión', weight: 0.25 },
      { type: 'creative', tool: 'Resolución de problemas', weight: 0.15 },
      { type: 'ai_symbiosis', tool: 'Colaboración con herramientas IA', weight: 0.20 },
      { type: 'psychometric', tool: 'Perfil de liderazgo', weight: 0.10 },
    ],
  };

  const handleEdit = () => {
    // Navigate to edit page
    navigate(`/positions/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/positions');
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Volver
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {position.title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Editar
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información General
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Código</Typography>
                <Typography variant="body1">{position.code}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Departamento</Typography>
                <Typography variant="body1">{position.department}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Nivel Jerárquico</Typography>
                <Chip label={position.hierarchy_level} color="warning" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Ubicación</Typography>
                <Chip 
                  label={position.location} 
                  color="error"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Estado</Typography>
                <Chip 
                  label={position.is_active ? 'Activo' : 'Inactivo'} 
                  color={position.is_active ? 'success' : 'default'}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Creado</Typography>
                <Typography variant="body1">
                  {new Date(position.created_at).toLocaleDateString('es-MX')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* AI & Ethics Requirements */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Requisitos Especiales
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Nivel de Colaboración IA
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <ComputerIcon color="primary" />
                  <Typography variant="h4">{position.ai_collaboration_level}/10</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Score Ético Mínimo
                </Typography>
                <Typography variant="h5" color="primary">{position.min_ethical_score}%</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Score Creatividad Mínimo
                </Typography>
                <Typography variant="h5" color="secondary">{position.min_creativity_score}%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Requirements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Requisitos Educativos y Experiencia
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Experiencia Mínima"
                  secondary={`${position.min_experience_years} años`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Educación Requerida"
                  secondary={position.required_education}
                />
              </ListItem>
            </List>
            
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Habilidades Requeridas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {position.required_skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Certificaciones
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {position.required_certifications.map((cert, index) => (
                <Chip 
                  key={index} 
                  label={cert} 
                  color="primary" 
                  icon={<CheckCircleIcon />}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* AI Tools */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <ComputerIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Herramientas IA Requeridas
            </Typography>
            <List>
              {position.required_ai_tools.map((tool, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={tool} />
                </ListItem>
              ))}
            </List>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              El candidato debe demostrar capacidad de colaboración efectiva con 
              herramientas de IA para optimizar procesos operativos.
            </Alert>
          </Paper>
        </Grid>

        {/* Assessment Configuration */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Configuración de Evaluaciones
            </Typography>
            <Grid container spacing={2}>
              {position.assessments.map((assessment, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary">
                        {assessment.type.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {assessment.tool}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          Peso:
                        </Typography>
                        <Chip 
                          label={`${(assessment.weight * 100).toFixed(0)}%`} 
                          size="small" 
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Organization Tree */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Árbol de Satisfacción - Nodos Asignados
            </Typography>
            <List>
              {position.tree_nodes.map((node) => (
                <ListItem key={node.id}>
                  <ListItemText 
                    primary={node.name}
                    secondary={`${node.type} - ${node.id}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PositionDetail;