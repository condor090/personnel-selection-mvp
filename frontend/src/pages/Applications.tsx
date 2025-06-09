import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Stack,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from '../services/api';

interface Application {
  id: string;
  candidate_name: string;
  position_title: string;
  position_location: string;
  status: string;
  overall_score: number;
  technical_score: number;
  ethical_score: number;
  creative_score: number;
  ai_symbiosis_score: number;
  decision: string | null;
  created_at: string;
}

const Applications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [openScoreDialog, setOpenScoreDialog] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications');
      setApplications(response.data);
    } catch (error) {
      // Mock data for development
      setApplications([
        {
          id: '1',
          candidate_name: 'Juan Pérez García',
          position_title: 'Cocinero',
          position_location: 'Constellation',
          status: 'active',
          overall_score: 72,
          technical_score: 78,
          ethical_score: 65,
          creative_score: 70,
          ai_symbiosis_score: 75,
          decision: null,
          created_at: '2024-01-20',
        },
        {
          id: '2',
          candidate_name: 'María López Hernández',
          position_title: 'Supervisor de Turno',
          position_location: 'Anahuac',
          status: 'active',
          overall_score: 85,
          technical_score: 88,
          ethical_score: 92,
          creative_score: 78,
          ai_symbiosis_score: 82,
          decision: 'approved',
          created_at: '2024-01-18',
        },
        {
          id: '3',
          candidate_name: 'Carlos Rodríguez Martínez',
          position_title: 'Gerente de Unidad',
          position_location: 'KIDE',
          status: 'active',
          overall_score: 90,
          technical_score: 92,
          ethical_score: 95,
          creative_score: 85,
          ai_symbiosis_score: 88,
          decision: 'approved',
          created_at: '2024-01-15',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewApplication = () => {
    navigate('/applications/new');
  };

  const handleViewApplication = (id: string) => {
    navigate(`/applications/${id}`);
  };

  const handleViewScores = (application: Application) => {
    setSelectedApplication(application);
    setOpenScoreDialog(true);
  };

  const getDecisionIcon = (decision: string | null) => {
    switch (decision) {
      case 'approved':
        return <CheckCircleIcon color="success" />;
      case 'rejected':
        return <CancelIcon color="error" />;
      case 'on_hold':
        return <WarningIcon color="warning" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const ScoreBar: React.FC<{ score: number; label: string }> = ({ score, label }) => (
    <Box sx={{ width: '100%', mb: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="caption" fontWeight="bold">{score}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        color={getScoreColor(score)}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );

  const columns: GridColDef[] = [
    {
      field: 'candidate_name',
      headerName: 'Candidato',
      width: 200,
    },
    {
      field: 'position_title',
      headerName: 'Posición',
      width: 150,
    },
    {
      field: 'position_location',
      headerName: 'Ubicación',
      width: 120,
      renderCell: (params) => {
        const isCritical = ['Constellation', 'Anahuac'].includes(params.value);
        return (
          <Chip
            label={params.value}
            color={isCritical ? 'error' : 'default'}
            size="small"
            variant={isCritical ? 'filled' : 'outlined'}
          />
        );
      },
    },
    {
      field: 'overall_score',
      headerName: 'Score General',
      width: 130,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            color={getScoreColor(params.value)}
            sx={{ width: 60, height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" fontWeight="bold">
            {params.value}%
          </Typography>
        </Box>
      ),
    },
    {
      field: 'scores',
      headerName: 'Evaluaciones',
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<AssessmentIcon />}
          onClick={() => handleViewScores(params.row)}
        >
          Ver Detalle
        </Button>
      ),
    },
    {
      field: 'decision',
      headerName: 'Decisión',
      width: 120,
      renderCell: (params) => {
        if (!params.value) {
          return <Chip label="Pendiente" size="small" />;
        }
        return (
          <Box display="flex" alignItems="center" gap={0.5}>
            {getDecisionIcon(params.value)}
            <Typography variant="body2">{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'created_at',
      headerName: 'Fecha',
      width: 100,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString('es-MX'),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => handleViewApplication(params.row.id)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const filteredApplications = applications.filter(
    (app) =>
      app.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Aplicaciones</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewApplication}
        >
          Nueva Aplicación
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por candidato, posición o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredApplications}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={loading}
        />
      </Paper>

      {/* Score Details Dialog */}
      <Dialog
        open={openScoreDialog}
        onClose={() => setOpenScoreDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Detalle de Evaluaciones - {selectedApplication?.candidate_name}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {selectedApplication.position_title} - {selectedApplication.position_location}
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <ScoreBar
                  score={selectedApplication.technical_score}
                  label="Evaluación Técnica"
                />
                <ScoreBar
                  score={selectedApplication.ethical_score}
                  label="Evaluación Ética"
                />
                <ScoreBar
                  score={selectedApplication.creative_score}
                  label="Creatividad e Innovación"
                />
                <ScoreBar
                  score={selectedApplication.ai_symbiosis_score}
                  label="Simbiosis con IA"
                />
              </Box>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Score General
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h4" color={getScoreColor(selectedApplication.overall_score)}>
                    {selectedApplication.overall_score}%
                  </Typography>
                  <Rating
                    value={selectedApplication.overall_score / 20}
                    readOnly
                    precision={0.5}
                  />
                </Box>
              </Box>

              {selectedApplication.overall_score < 70 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  El candidato no alcanza el puntaje mínimo recomendado (70%) para esta posición.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScoreDialog(false)}>Cerrar</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenScoreDialog(false);
              handleViewApplication(selectedApplication!.id);
            }}
          >
            Ver Aplicación Completa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Applications;