import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
} from '@mui/material';
import {
  SportsMartialArts as BeltIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import QRCode from 'react-qr-code';

interface Belt {
  level: string;
  color: string;
  description: string;
  estimatedDays: number;
  skills: string[];
}

const beltLevels: Belt[] = [
  {
    level: 'white',
    color: '#FFFFFF',
    description: 'Iniciante - Conceptos básicos',
    estimatedDays: 30,
    skills: [
      'Conocimiento del manual del puesto',
      'Procesos básicos de operación',
      'Normas de seguridad e higiene',
      'Uso de herramientas básicas',
    ],
  },
  {
    level: 'yellow',
    color: '#FFEB3B',
    description: 'Principiante - Habilidades fundamentales',
    estimatedDays: 45,
    skills: [
      'Ejecución supervisada de tareas',
      'Manejo de equipos específicos',
      'Protocolo de calidad básico',
      'Trabajo en equipo',
    ],
  },
  {
    level: 'orange',
    color: '#FF9800',
    description: 'Básico - Autonomía inicial',
    estimatedDays: 60,
    skills: [
      'Ejecución autónoma de tareas simples',
      'Resolución de problemas comunes',
      'Apoyo a compañeros nuevos',
      'Reporte de incidencias',
    ],
  },
  {
    level: 'green',
    color: '#4CAF50',
    description: 'Intermedio - Competencia operativa',
    estimatedDays: 90,
    skills: [
      'Dominio completo del puesto',
      'Optimización de procesos',
      'Mentoría básica',
      'Gestión de emergencias',
    ],
  },
  {
    level: 'blue',
    color: '#2196F3',
    description: 'Avanzado - Especialización',
    estimatedDays: 120,
    skills: [
      'Especialización en área específica',
      'Innovación en procesos',
      'Capacitación de personal',
      'Liderazgo situacional',
    ],
  },
  {
    level: 'brown',
    color: '#795548',
    description: 'Experto - Maestría técnica',
    estimatedDays: 180,
    skills: [
      'Dominio multi-área',
      'Diseño de procedimientos',
      'Auditoría de calidad',
      'Gestión de proyectos',
    ],
  },
  {
    level: 'black',
    color: '#000000',
    description: 'Maestro - Liderazgo total',
    estimatedDays: 365,
    skills: [
      'Visión estratégica',
      'Desarrollo organizacional',
      'Mentoring avanzado',
      'Innovación continua',
    ],
  },
];

const BeltSystem: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [openCertifyDialog, setOpenCertifyDialog] = useState(false);
  const [selectedBelt, setSelectedBelt] = useState<Belt | null>(null);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);

  // Mock data
  const employees = [
    {
      id: '1',
      name: 'Juan Pérez',
      position: 'Cocinero',
      location: 'Constellation',
      currentBelt: 'yellow',
      progress: 75,
      startDate: '2024-01-15',
      daysInBelt: 45,
    },
    {
      id: '2',
      name: 'María López',
      position: 'Supervisor',
      location: 'Anahuac',
      currentBelt: 'green',
      progress: 90,
      startDate: '2023-10-01',
      daysInBelt: 120,
    },
  ];

  const getBeltColor = (level: string) => {
    return beltLevels.find(b => b.level === level)?.color || '#CCCCCC';
  };

  const getNextBelt = (currentLevel: string) => {
    const currentIndex = beltLevels.findIndex(b => b.level === currentLevel);
    return currentIndex < beltLevels.length - 1 ? beltLevels[currentIndex + 1] : null;
  };

  const handleCertify = (employee: any) => {
    setSelectedEmployee(employee);
    const nextBelt = getNextBelt(employee.currentBelt);
    setSelectedBelt(nextBelt);
    setCompletedSkills([]);
    setOpenCertifyDialog(true);
  };

  const handleSkillToggle = (skill: string) => {
    setCompletedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleCertifySubmit = () => {
    // Submit certification logic
    console.log('Certifying:', selectedEmployee, selectedBelt, completedSkills);
    setOpenCertifyDialog(false);
  };

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Cintas - Desarrollo Técnico
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        El sistema de cintas permite el desarrollo técnico progresivo del personal, 
        desde cinta blanca (iniciante) hasta cinta negra (maestro).
      </Alert>

      {/* Belt Progression Overview */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Progresión de Cintas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {beltLevels.map((belt, index) => (
            <Box key={belt.level} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: belt.color,
                  border: belt.level === 'white' ? '2px solid #ccc' : 'none',
                  mb: 1,
                }}
              >
                <BeltIcon />
              </Avatar>
              <Typography variant="caption" display="block">
                {belt.level.toUpperCase()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {belt.estimatedDays} días
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Employee Belt Status */}
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} md={6} key={employee.id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: getBeltColor(employee.currentBelt) }}>
                    <BeltIcon />
                  </Avatar>
                }
                title={employee.name}
                subheader={`${employee.position} - ${employee.location}`}
                action={
                  <Chip
                    label={`Cinta ${employee.currentBelt}`}
                    sx={{
                      bgcolor: getBeltColor(employee.currentBelt),
                      color: ['white', 'yellow'].includes(employee.currentBelt) ? 'black' : 'white',
                    }}
                  />
                }
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Progreso en cinta actual
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {employee.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={employee.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'grey.300',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getBeltColor(employee.currentBelt),
                      },
                    }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TimerIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Días en cinta
                        </Typography>
                        <Typography variant="body2">
                          {employee.daysInBelt}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SchoolIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Inicio
                        </Typography>
                        <Typography variant="body2">
                          {new Date(employee.startDate).toLocaleDateString('es-MX')}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AssignmentIcon />}
                  >
                    Ver Detalles
                  </Button>
                  {employee.progress >= 80 && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VerifiedIcon />}
                      onClick={() => handleCertify(employee)}
                    >
                      Certificar Siguiente
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Belt Details */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {beltLevels.slice(0, 4).map((belt) => (
          <Grid item xs={12} sm={6} md={3} key={belt.level}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: belt.color, border: belt.level === 'white' ? '2px solid #ccc' : 'none' }}>
                    <BeltIcon />
                  </Avatar>
                }
                title={`Cinta ${belt.level}`}
                titleTypographyProps={{ variant: 'subtitle1' }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {belt.description}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                  Duración estimada: {belt.estimatedDays} días
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Habilidades requeridas:
                </Typography>
                <List dense>
                  {belt.skills.map((skill, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={skill}
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Certification Dialog */}
      <Dialog open={openCertifyDialog} onClose={() => setOpenCertifyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Certificar Nueva Cinta - {selectedEmployee?.name}
        </DialogTitle>
        <DialogContent>
          {selectedBelt && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Certificando para: Cinta {selectedBelt.level} - {selectedBelt.description}
              </Alert>

              <Typography variant="subtitle1" gutterBottom>
                Verificar dominio de habilidades:
              </Typography>
              <List>
                {selectedBelt.skills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Checkbox
                        checked={completedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Código QR de Certificación
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Box sx={{ p: 2, bgcolor: 'white' }}>
                    <QRCode
                      value={`CERT-${selectedEmployee?.id}-${selectedBelt.level}-${Date.now()}`}
                      size={150}
                    />
                  </Box>
                </Box>
                <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1 }}>
                  Escanear para confirmar certificación
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observaciones"
                variant="outlined"
                sx={{ mt: 2 }}
                placeholder="Comentarios sobre el desempeño del empleado..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCertifyDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleCertifySubmit}
            variant="contained"
            disabled={!selectedBelt || (selectedBelt && completedSkills.length !== selectedBelt.skills.length)}
          >
            Confirmar Certificación
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BeltSystem;