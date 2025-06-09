import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Work,
  Assignment,
  Warning,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';

interface DashboardStats {
  totalEmployees: number;
  turnoverRate: number;
  turnoverTrend: 'up' | 'down' | 'stable';
  activePositions: number;
  pendingApplications: number;
  criticalLocations: Array<{
    location: string;
    turnoverRate: number;
  }>;
  monthlyTurnover: Array<{
    month: string;
    rate: number;
  }>;
  assessmentScores: Array<{
    type: string;
    avgScore: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/reports/dashboard');
      setStats(response.data);
    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      // Mock data for development
      setStats({
        totalEmployees: 133,
        turnoverRate: 56,
        turnoverTrend: 'up',
        activePositions: 12,
        pendingApplications: 24,
        criticalLocations: [
          { location: 'Constellation', turnoverRate: 140 },
          { location: 'Anahuac', turnoverRate: 150 },
          { location: 'KIDE', turnoverRate: 15 },
          { location: 'Cocina', turnoverRate: 20 },
        ],
        monthlyTurnover: [
          { month: 'Ene', rate: 45 },
          { month: 'Feb', rate: 52 },
          { month: 'Mar', rate: 58 },
          { month: 'Abr', rate: 55 },
          { month: 'May', rate: 56 },
        ],
        assessmentScores: [
          { type: 'Técnica', avgScore: 75 },
          { type: 'Ética', avgScore: 82 },
          { type: 'Creatividad', avgScore: 68 },
          { type: 'Simbiosis IA', avgScore: 65 },
          { type: 'Psicométrica', avgScore: 78 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error && !stats) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard de Selección de Personal
      </Typography>
      
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Empleados Totales
                  </Typography>
                  <Typography variant="h4">
                    {stats?.totalEmployees}
                  </Typography>
                </Box>
                <People color="primary" fontSize="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Rotación Anual
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" color="error">
                      {stats?.turnoverRate}%
                    </Typography>
                    {stats?.turnoverTrend === 'up' ? (
                      <TrendingUp color="error" sx={{ ml: 1 }} />
                    ) : (
                      <TrendingDown color="success" sx={{ ml: 1 }} />
                    )}
                  </Box>
                </Box>
                <Warning color="error" fontSize="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Posiciones Activas
                  </Typography>
                  <Typography variant="h4">
                    {stats?.activePositions}
                  </Typography>
                </Box>
                <Work color="primary" fontSize="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Aplicaciones Pendientes
                  </Typography>
                  <Typography variant="h4">
                    {stats?.pendingApplications}
                  </Typography>
                </Box>
                <Assignment color="primary" fontSize="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Turnover Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia de Rotación Mensual
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.monthlyTurnover}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#ff7300" 
                  name="Tasa de Rotación (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Critical Locations */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Ubicaciones Críticas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.criticalLocations} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 160]} />
                <YAxis dataKey="location" type="category" />
                <Tooltip />
                <Bar dataKey="turnoverRate" fill="#ff4444" name="Rotación (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Assessment Scores */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Promedio de Evaluaciones
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.assessmentScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#8884d8" name="Puntuación Promedio" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Assessment Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Distribución de Evaluaciones
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.assessmentScores}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.type}: ${entry.avgScore}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="avgScore"
                >
                  {stats?.assessmentScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Alerts Section */}
        <Grid item xs={12}>
          <Alert severity="warning">
            <Typography variant="subtitle1" gutterBottom>
              Alertas Críticas:
            </Typography>
            <ul style={{ margin: 0 }}>
              <li>Constellation y Anahuac presentan rotación crítica superior al 140%</li>
              <li>La rotación anualizada del 56% está muy por encima del objetivo del 20%</li>
              <li>Se requiere atención inmediata en el proceso de selección para ubicaciones críticas</li>
            </ul>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;