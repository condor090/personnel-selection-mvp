import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slider,
  Chip,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Lightbulb as LightbulbIcon,
  Group as GroupIcon,
  Computer as ComputerIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assessment-tabpanel-${index}`}
      aria-labelledby={`assessment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Assessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [ethicalResponses, setEthicalResponses] = useState<Record<string, string>>({});
  const [creativityScore, setCreativityScore] = useState(50);
  const [aiPrompts, setAiPrompts] = useState<string[]>(['']);
  const [technicalAnswers, setTechnicalAnswers] = useState<Record<string, string>>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEthicalResponse = (questionId: string, value: string) => {
    setEthicalResponses({ ...ethicalResponses, [questionId]: value });
  };

  const handleAddPrompt = () => {
    setAiPrompts([...aiPrompts, '']);
  };

  const handlePromptChange = (index: number, value: string) => {
    const newPrompts = [...aiPrompts];
    newPrompts[index] = value;
    setAiPrompts(newPrompts);
  };

  const ethicalDilemmas = [
    {
      id: 'e1',
      question: 'Un compañero de trabajo te pide que cubras su error que podría costar a la empresa $10,000. ¿Qué harías?',
      options: [
        'Reportar inmediatamente el error a mi supervisor',
        'Ayudar a mi compañero a corregir el error sin reportarlo',
        'Hablar primero con mi compañero para entender la situación',
        'Ignorar la situación ya que no es mi responsabilidad',
      ],
    },
    {
      id: 'e2',
      question: 'Descubres que tu jefe está manipulando reportes para mostrar mejores resultados. ¿Cómo procederías?',
      options: [
        'Documentar la evidencia y reportar a recursos humanos',
        'Confrontar directamente a mi jefe',
        'Buscar otro trabajo sin decir nada',
        'Participar para mantener mi puesto',
      ],
    },
  ];

  const creativityExercises = [
    {
      title: 'Usos Alternativos',
      description: 'Liste 10 usos creativos para un clip de papel más allá de sujetar papeles.',
    },
    {
      title: 'Resolución de Problemas',
      description: 'Su restaurante se quedó sin gas en medio del servicio. ¿Cómo resolvería la situación?',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Evaluaciones de Candidatos
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="assessment tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<PsychologyIcon />} 
            label="Evaluación Ética" 
            iconPosition="start"
          />
          <Tab 
            icon={<LightbulbIcon />} 
            label="Creatividad" 
            iconPosition="start"
          />
          <Tab 
            icon={<ComputerIcon />} 
            label="Simbiosis IA" 
            iconPosition="start"
          />
          <Tab 
            icon={<AssignmentIcon />} 
            label="Técnica" 
            iconPosition="start"
          />
          <Tab 
            icon={<GroupIcon />} 
            label="Psicométrica" 
            iconPosition="start"
          />
        </Tabs>

        {/* Evaluación Ética */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            Dilemas Éticos
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Evalúe la integridad y valores del candidato a través de situaciones éticas reales.
          </Alert>

          {ethicalDilemmas.map((dilemma) => (
            <Card key={dilemma.id} sx={{ mb: 3 }}>
              <CardContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{dilemma.question}</FormLabel>
                  <RadioGroup
                    value={ethicalResponses[dilemma.id] || ''}
                    onChange={(e) => handleEthicalResponse(dilemma.id, e.target.value)}
                  >
                    {dilemma.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Evaluación de Empatía
            </Typography>
            <Rating name="empathy-rating" defaultValue={3} size="large" />
          </Box>
        </TabPanel>

        {/* Creatividad e Innovación */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Ejercicios de Creatividad
          </Typography>

          {creativityExercises.map((exercise, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardHeader title={exercise.title} />
              <CardContent>
                <Typography variant="body2" paragraph>
                  {exercise.description}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Respuesta del candidato..."
                  variant="outlined"
                />
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Nivel de Pensamiento Divergente
            </Typography>
            <Slider
              value={creativityScore}
              onChange={(e, newValue) => setCreativityScore(newValue as number)}
              aria-labelledby="creativity-slider"
              valueLabelDisplay="on"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Box>
        </TabPanel>

        {/* Simbiosis con IA */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Evaluación de Colaboración con IA
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardHeader title="Ejercicio de Prompt Engineering" />
            <CardContent>
              <Typography variant="body2" paragraph>
                Solicite al candidato crear prompts para las siguientes tareas:
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="1. Generar un menú semanal para un restaurante"
                    secondary="Evalúe claridad y especificidad del prompt"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="2. Resolver un problema de inventario"
                    secondary="Evalúe capacidad de proporcionar contexto"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="3. Crear un plan de capacitación"
                    secondary="Evalúe estructuración de la solicitud"
                  />
                </ListItem>
              </List>

              {aiPrompts.map((prompt, index) => (
                <TextField
                  key={index}
                  fullWidth
                  multiline
                  rows={3}
                  value={prompt}
                  onChange={(e) => handlePromptChange(index, e.target.value)}
                  placeholder={`Prompt ${index + 1}`}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ))}
              
              <Button variant="outlined" onClick={handleAddPrompt}>
                Agregar otro prompt
              </Button>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Comprensión de Límites de IA
                  </Typography>
                  <Rating name="ai-limits" defaultValue={0} size="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Pensamiento Crítico sobre Outputs
                  </Typography>
                  <Rating name="critical-thinking" defaultValue={0} size="large" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Evaluación Técnica */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            Evaluación de Competencias Técnicas
          </Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            Las preguntas técnicas deben adaptarse según el puesto específico.
          </Alert>

          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Conocimientos Específicos del Puesto"
              subheader="Evalúe según el manual del puesto y el árbol de satisfacción"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Área de Conocimiento"
                    placeholder="Ej: Procesos de cocina"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nivel de Dominio"
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value="">Seleccione...</option>
                    <option value="basico">Básico</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                    <option value="experto">Experto</option>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Certificaciones Verificadas
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Manejo de Alimentos" color="success" />
              <Chip label="Primeros Auxilios" color="success" />
              <Chip label="HACCP" color="warning" variant="outlined" />
            </Box>
          </Box>
        </TabPanel>

        {/* Evaluación Psicométrica */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h6" gutterBottom>
            Perfil Psicométrico
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Rasgos de Personalidad" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Extroversión"
                        secondary={<LinearProgress variant="determinate" value={75} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Responsabilidad"
                        secondary={<LinearProgress variant="determinate" value={85} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Apertura"
                        secondary={<LinearProgress variant="determinate" value={60} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Amabilidad"
                        secondary={<LinearProgress variant="determinate" value={90} />}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Estabilidad Emocional"
                        secondary={<LinearProgress variant="determinate" value={70} />}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Competencias Conductuales" />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Trabajo en Equipo
                    </Typography>
                    <Rating value={4} readOnly />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Liderazgo
                    </Typography>
                    <Rating value={3} readOnly />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Adaptabilidad
                    </Typography>
                    <Rating value={5} readOnly />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Comunicación
                    </Typography>
                    <Rating value={4} readOnly />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" size="large">
          Guardar Borrador
        </Button>
        <Button variant="contained" size="large">
          Completar Evaluación
        </Button>
      </Box>
    </Box>
  );
};

export default Assessments;