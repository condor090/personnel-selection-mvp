import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock data
  const turnoverByLocation = [
    { location: 'Constellation', current: 140, previous: 120, target: 20 },
    { location: 'Anahuac', current: 150, previous: 130, target: 20 },
    { location: 'KIDE', current: 15, previous: 18, target: 20 },
    { location: 'Cocina', current: 20, previous: 25, target: 20 },
    { location: 'Abasto', current: 18, previous: 22, target: 20 },
  ];

  const costAnalysis = [
    { month: 'Enero', trainingCost: 45000, replacementCost: 120000, productivityLoss: 80000 },
    { month: 'Febrero', trainingCost: 52000, replacementCost: 140000, productivityLoss: 95000 },
    { month: 'Marzo', trainingCost: 58000, replacementCost: 160000, productivityLoss: 110000 },
    { month: 'Abril', trainingCost: 55000, replacementCost: 150000, productivityLoss: 105000 },
    { month: 'Mayo', trainingCost: 56000, replacementCost: 155000, productivityLoss: 108000 },
  ];

  const assessmentEffectiveness = [
    { type: 'Técnica', avgScore: 75, hiredSuccess: 82, correlation: 0.89 },
    { type: 'Ética', avgScore: 82, hiredSuccess: 91, correlation: 0.95 },
    { type: 'Creatividad', avgScore: 68, hiredSuccess: 73, correlation: 0.76 },
    { type: 'Simbiosis IA', avgScore: 65, hiredSuccess: 78, correlation: 0.84 },
    { type: 'Psicométrica', avgScore: 78, hiredSuccess: 85, correlation: 0.88 },
  ];

  const radarData = [
    { skill: 'Técnica', A: 85, B: 75 },
    { skill: 'Ética', A: 92, B: 82 },
    { skill: 'Creatividad', A: 78, B: 68 },
    { skill: 'IA', A: 88, B: 65 },
    { skill: 'Liderazgo', A: 85, B: 70 },
    { skill: 'Adaptabilidad', A: 90, B: 75 },
  ];

  const performanceByHierarchy = [
    { level: 'Directivo', avgRetention: 85, avgPerformance: 88, count: 12 },
    { level: 'Supervisor', avgRetention: 72, avgPerformance: 75, count: 28 },
    { level: 'Operativo', avgRetention: 58, avgPerformance: 70, count: 93 },
  ];

  const calculateTotalCost = () => {
    return costAnalysis.reduce((total, month) => {
      return total + month.trainingCost + month.replacementCost + month.productivityLoss;
    }, 0);
  };

  const getRetentionColor = (value: number, target: number) => {
    if (value <= target) return 'success';
    if (value <= target * 1.5) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Reportes y Analytics</Typography>
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={selectedPeriod}
              label="Período"
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <MenuItem value="week">Semana</MenuItem>
              <MenuItem value="month">Mes</MenuItem>
              <MenuItem value="quarter">Trimestre</MenuItem>
              <MenuItem value="year">Año</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Ubicación</InputLabel>
            <Select
              value={selectedLocation}
              label="Ubicación"
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="constellation">Constellation</MenuItem>
              <MenuItem value="anahuac">Anahuac</MenuItem>
              <MenuItem value="kide">KIDE</MenuItem>
              <MenuItem value="cocina">Cocina</MenuItem>
            </Select>
          </FormControl>
          <Button startIcon={<DownloadIcon />} variant="outlined">
            Exportar
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Cost Impact Summary */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Impacto Económico de la Rotación"
              action={
                <Tooltip title="Imprimir reporte">
                  <IconButton>
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={costAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="trainingCost"
                        stroke="#8884d8"
                        name="Costo Capacitación"
                      />
                      <Line
                        type="monotone"
                        dataKey="replacementCost"
                        stroke="#82ca9d"
                        name="Costo Reemplazo"
                      />
                      <Line
                        type="monotone"
                        dataKey="productivityLoss"
                        stroke="#ffc658"
                        name="Pérdida Productividad"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                    <Typography variant="h6" color="error.contrastText">
                      Costo Total (5 meses)
                    </Typography>
                    <Typography variant="h3" color="error.contrastText">
                      ${calculateTotalCost().toLocaleString('es-MX')}
                    </Typography>
                    <Typography variant="body2" color="error.contrastText" sx={{ mt: 1 }}>
                      "Un chingo de lana" en capacitaciones fallidas
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Desglose promedio mensual:</Typography>
                    <Typography variant="body2">• Capacitación: $53,200</Typography>
                    <Typography variant="body2">• Reemplazo: $145,000</Typography>
                    <Typography variant="body2">• Productividad: $99,600</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Turnover by Location */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Rotación por Ubicación" />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ubicación</TableCell>
                      <TableCell align="center">Actual</TableCell>
                      <TableCell align="center">Anterior</TableCell>
                      <TableCell align="center">Meta</TableCell>
                      <TableCell align="center">Tendencia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {turnoverByLocation.map((row) => (
                      <TableRow key={row.location}>
                        <TableCell>
                          {row.location}
                          {['Constellation', 'Anahuac'].includes(row.location) && (
                            <Chip
                              label="Crítico"
                              size="small"
                              color="error"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${row.current}%`}
                            size="small"
                            color={getRetentionColor(row.current, row.target)}
                          />
                        </TableCell>
                        <TableCell align="center">{row.previous}%</TableCell>
                        <TableCell align="center">{row.target}%</TableCell>
                        <TableCell align="center">
                          {row.current > row.previous ? (
                            <TrendingUpIcon color="error" />
                          ) : (
                            <TrendingDownIcon color="success" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Assessment Effectiveness */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Efectividad de Evaluaciones" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assessmentEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="avgScore" fill="#8884d8" name="Score Promedio" />
                  <Bar dataKey="hiredSuccess" fill="#82ca9d" name="Éxito Contratados" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Comparison Radar */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Comparación de Perfiles" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Empleados Exitosos"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Promedio General"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance by Hierarchy */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Desempeño por Nivel Jerárquico" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nivel</TableCell>
                      <TableCell align="center">Retención</TableCell>
                      <TableCell align="center">Desempeño</TableCell>
                      <TableCell align="center">Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {performanceByHierarchy.map((row) => (
                      <TableRow key={row.level}>
                        <TableCell>{row.level}</TableCell>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <Box sx={{ width: 60, mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={row.avgRetention}
                                color={row.avgRetention >= 70 ? 'success' : 'warning'}
                              />
                            </Box>
                            {row.avgRetention}%
                          </Box>
                        </TableCell>
                        <TableCell align="center">{row.avgPerformance}%</TableCell>
                        <TableCell align="center">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Insights */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Insights Clave" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Alert severity="error">
                    <Typography variant="subtitle2" gutterBottom>
                      Ubicaciones Críticas
                    </Typography>
                    Constellation y Anahuac mantienen tasas de rotación superiores al 140%, 
                    requiriendo intervención inmediata en el proceso de selección.
                  </Alert>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Alert severity="warning">
                    <Typography variant="subtitle2" gutterBottom>
                      Correlación Ética-Retención
                    </Typography>
                    La evaluación ética muestra la mayor correlación (0.95) con el éxito 
                    en la retención de personal.
                  </Alert>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Alert severity="info">
                    <Typography variant="subtitle2" gutterBottom>
                      Oportunidad IA
                    </Typography>
                    Los empleados con mayor score en simbiosis IA muestran 40% mejor 
                    productividad en los primeros 90 días.
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;