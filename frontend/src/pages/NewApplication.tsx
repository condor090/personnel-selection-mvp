import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const NewApplication: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [assessmentSchedule, setAssessmentSchedule] = useState<any[]>([]);

  // Mock data
  const candidates = [
    {
      id: '1',
      label: 'Juan Pérez García - Cocinero Senior (5 años exp.)',
      name: 'Juan Pérez García',
      email: 'juan.perez@email.com',
      position: 'Cocinero Senior',
      experience: 5,
    },
    {
      id: '2',
      label: 'Ana Martínez López - Supervisor (3 años exp.)',
      name: 'Ana Martínez López',
      email: 'ana.martinez@email.com',
      position: 'Supervisor',
      experience: 3,
    },
  ];

  const positions = [
    {
      id: '1',
      label: 'Cocinero - Constellation (Operativo)',
      title: 'Cocinero',
      location: 'Constellation',
      level: 'operative',
      department: 'Cocina',
      critical: true,
    },
    {
      id: '2',
      label: 'Supervisor de Turno - Anahuac (Supervisor)',
      title: 'Supervisor de Turno',
      location: 'Anahuac',
      level: 'supervisor',
      department: 'Operaciones',
      critical: true,
    },
    {
      id: '3',
      label: 'Cajero - KIDE (Operativo)',
      title: 'Cajero',
      location: 'KIDE',
      level: 'operative',
      department: 'Servicio',
      critical: false,
    },
  ];

  const evaluators = [
    { id: '1', name: 'Carlos Mendoza', specialty: 'technical' },
    { id: '2', name: 'Ana García', specialty: 'ethical' },
    { id: '3', name: 'Luis Ramírez', specialty: 'creative' },
    { id: '4', name: 'Patricia Soto', specialty: 'ai_symbiosis' },
    { id: '5', name: 'Roberto Díaz', specialty: 'psychometric' },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateApplication = () => {
    // Create application logic
    console.log('Creating application:', {
      candidate: selectedCandidate,
      position: selectedPosition,
      schedule: assessmentSchedule,
    });
    navigate('/applications');
  };

  const addAssessment = () => {
    setAssessmentSchedule([
      ...assessmentSchedule,
      {
        id: Date.now(),
        type: '',
        evaluator: '',
        date: new Date().toISOString().split('T')[0],
      },
    ]);
  };

  const updateAssessment = (index: number, field: string, value: any) => {
    const updated = [...assessmentSchedule];
    updated[index][field] = value;
    setAssessmentSchedule(updated);
  };

  const removeAssessment = (index: number) => {
    setAssessmentSchedule(assessmentSchedule.filter((_, i) => i !== index));
  };

  const steps = [
    {
      label: 'Seleccionar Candidato',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Seleccione el candidato para la aplicación:
          </Typography>
          <Autocomplete
            options={candidates}
            value={selectedCandidate}
            onChange={(event, newValue) => setSelectedCandidate(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Buscar candidato" variant="outlined" />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.position} • {option.experience} años exp.
                  </Typography>
                </Box>
              </Box>
            )}
          />
          
          {selectedCandidate && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información del Candidato
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Nombre
                    </Typography>
                    <Typography variant="body1">{selectedCandidate.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">{selectedCandidate.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Posición Actual
                    </Typography>
                    <Typography variant="body1">{selectedCandidate.position}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Experiencia
                    </Typography>
                    <Typography variant="body1">{selectedCandidate.experience} años</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      ),
    },
    {
      label: 'Seleccionar Posición',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Seleccione la posición a la que aplica:
          </Typography>
          <Autocomplete
            options={positions}
            value={selectedPosition}
            onChange={(event, newValue) => setSelectedPosition(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Buscar posición" variant="outlined" />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box sx={{ width: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">{option.title}</Typography>
                    {option.critical && (
                      <Chip label="Ubicación Crítica" color="error" size="small" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {option.location} • {option.department} • {option.level}
                  </Typography>
                </Box>
              </Box>
            )}
          />
          
          {selectedPosition && (
            <>
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Detalles de la Posición
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Título
                      </Typography>
                      <Typography variant="body1">{selectedPosition.title}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Ubicación
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1">{selectedPosition.location}</Typography>
                        {selectedPosition.critical && (
                          <Chip label="Crítica" color="error" size="small" />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Departamento
                      </Typography>
                      <Typography variant="body1">{selectedPosition.department}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Nivel
                      </Typography>
                      <Typography variant="body1">{selectedPosition.level}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              {selectedPosition.critical && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Esta ubicación tiene historial de alta rotación. Se recomienda 
                  evaluación exhaustiva y plan de retención reforzado.
                </Alert>
              )}
            </>
          )}
        </Box>
      ),
    },
    {
      label: 'Programar Evaluaciones',
      content: (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1">
              Configure las evaluaciones requeridas:
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addAssessment}
              variant="outlined"
            >
              Agregar Evaluación
            </Button>
          </Box>
          
          {assessmentSchedule.length === 0 ? (
            <Alert severity="info">
              No hay evaluaciones programadas. Agregue al menos las evaluaciones básicas.
            </Alert>
          ) : (
            <List>
              {assessmentSchedule.map((assessment, index) => (
                <ListItem key={assessment.id} sx={{ px: 0 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Tipo de Evaluación</InputLabel>
                        <Select
                          value={assessment.type}
                          label="Tipo de Evaluación"
                          onChange={(e) => updateAssessment(index, 'type', e.target.value)}
                        >
                          <MenuItem value="technical">Técnica</MenuItem>
                          <MenuItem value="ethical">Ética</MenuItem>
                          <MenuItem value="creative">Creatividad</MenuItem>
                          <MenuItem value="ai_symbiosis">Simbiosis IA</MenuItem>
                          <MenuItem value="psychometric">Psicométrica</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Evaluador</InputLabel>
                        <Select
                          value={assessment.evaluator}
                          label="Evaluador"
                          onChange={(e) => updateAssessment(index, 'evaluator', e.target.value)}
                        >
                          {evaluators.map((evaluator) => (
                            <MenuItem key={evaluator.id} value={evaluator.id}>
                              {evaluator.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Fecha"
                        value={assessment.date}
                        onChange={(e) => updateAssessment(index, 'date', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => removeAssessment(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
          
          <Alert severity="info" sx={{ mt: 2 }}>
            Recomendación: Para posiciones de nivel {selectedPosition?.level || 'supervisor'}, 
            se sugiere incluir todas las evaluaciones disponibles.
          </Alert>
        </Box>
      ),
    },
    {
      label: 'Confirmar y Crear',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Resumen de la Aplicación
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom color="primary">
                    Candidato
                  </Typography>
                  <Typography variant="body1">{selectedCandidate?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCandidate?.position} • {selectedCandidate?.experience} años exp.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom color="primary">
                    Posición
                  </Typography>
                  <Typography variant="body1">{selectedPosition?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPosition?.location} • {selectedPosition?.department}
                  </Typography>
                  {selectedPosition?.critical && (
                    <Chip label="Ubicación Crítica" color="error" size="small" sx={{ mt: 1 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom color="primary">
                    Evaluaciones Programadas ({assessmentSchedule.length})
                  </Typography>
                  <List dense>
                    {assessmentSchedule.map((assessment) => {
                      const evaluator = evaluators.find(e => e.id === assessment.evaluator);
                      return (
                        <ListItem key={assessment.id}>
                          <ListItemText
                            primary={`Evaluación ${assessment.type}`}
                            secondary={`${evaluator?.name} - ${new Date(assessment.date).toLocaleDateString('es-MX')}`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Al crear esta aplicación:
            </Typography>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Se notificará al candidato por email</li>
              <li>Se agendarán las evaluaciones con los evaluadores</li>
              <li>Se activará el seguimiento automático del proceso</li>
            </ul>
          </Alert>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/applications')}
        >
          Cancelar
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Nueva Aplicación
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mt: 3 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atrás
                  </Button>
                  {index === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleCreateApplication}
                      startIcon={<CheckIcon />}
                      disabled={!selectedCandidate || !selectedPosition || assessmentSchedule.length === 0}
                    >
                      Crear Aplicación
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<ArrowForwardIcon />}
                      disabled={
                        (index === 0 && !selectedCandidate) ||
                        (index === 1 && !selectedPosition)
                      }
                    >
                      Continuar
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default NewApplication;