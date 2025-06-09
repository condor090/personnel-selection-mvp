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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../services/api';

interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  current_position: string;
  years_experience: number;
  education_level: string;
  status: 'new' | 'in_evaluation' | 'approved' | 'rejected' | 'hired';
  source: string;
  created_at: string;
}

const Candidates: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Partial<Candidate>>({});
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/candidates');
      setCandidates(response.data);
    } catch (error) {
      // Mock data for development
      setCandidates([
        {
          id: '1',
          full_name: 'Juan Pérez García',
          email: 'juan.perez@email.com',
          phone: '+52 555 1234567',
          current_position: 'Cocinero Senior',
          years_experience: 5,
          education_level: 'Técnico en Gastronomía',
          status: 'in_evaluation',
          source: 'website',
          created_at: '2024-01-20',
        },
        {
          id: '2',
          full_name: 'María López Hernández',
          email: 'maria.lopez@email.com',
          phone: '+52 555 2345678',
          current_position: 'Supervisor de Cocina',
          years_experience: 8,
          education_level: 'Licenciatura en Administración',
          status: 'approved',
          source: 'referral',
          created_at: '2024-01-18',
        },
        {
          id: '3',
          full_name: 'Carlos Rodríguez Martínez',
          email: 'carlos.rodriguez@email.com',
          phone: '+52 555 3456789',
          current_position: 'Gerente de Restaurante',
          years_experience: 12,
          education_level: 'MBA',
          status: 'hired',
          source: 'headhunter',
          created_at: '2024-01-15',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCandidate = () => {
    setSelectedCandidate({});
    setBirthDate(null);
    setOpenDialog(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleViewCandidate = (id: string) => {
    navigate(`/candidates/${id}`);
  };

  const handleSaveCandidate = async () => {
    try {
      const candidateData = {
        ...selectedCandidate,
        birth_date: birthDate?.toISOString().split('T')[0],
      };
      
      if (selectedCandidate.id) {
        await api.put(`/candidates/${selectedCandidate.id}`, candidateData);
      } else {
        await api.post('/candidates', candidateData);
      }
      setOpenDialog(false);
      fetchCandidates();
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_evaluation': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'hired': return 'info';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website': return '🌐';
      case 'referral': return '👥';
      case 'headhunter': return '🎯';
      default: return '📋';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'full_name',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {params.value.split(' ').map((n: string) => n[0]).join('')}
          </Avatar>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <EmailIcon fontSize="small" color="action" />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <PhoneIcon fontSize="small" color="action" />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'current_position',
      headerName: 'Posición Actual',
      width: 150,
    },
    {
      field: 'years_experience',
      headerName: 'Experiencia',
      width: 100,
      renderCell: (params) => `${params.value} años`,
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'source',
      headerName: 'Fuente',
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <span>{getSourceIcon(params.value)}</span>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleViewCandidate(params.row.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEditCandidate(params.row)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.current_position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Candidatos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCandidate}
        >
          Nuevo Candidato
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nombre, email o posición..."
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
          rows={filteredCandidates}
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

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCandidate.id ? 'Editar Candidato' : 'Nuevo Candidato'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre Completo"
                value={selectedCandidate.full_name || ''}
                onChange={(e) =>
                  setSelectedCandidate({ ...selectedCandidate, full_name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={selectedCandidate.email || ''}
                onChange={(e) =>
                  setSelectedCandidate({ ...selectedCandidate, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={selectedCandidate.phone || ''}
                onChange={(e) =>
                  setSelectedCandidate({ ...selectedCandidate, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Posición Actual"
                value={selectedCandidate.current_position || ''}
                onChange={(e) =>
                  setSelectedCandidate({
                    ...selectedCandidate,
                    current_position: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Años de Experiencia"
                value={selectedCandidate.years_experience || ''}
                onChange={(e) =>
                  setSelectedCandidate({
                    ...selectedCandidate,
                    years_experience: parseInt(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nivel de Educación"
                value={selectedCandidate.education_level || ''}
                onChange={(e) =>
                  setSelectedCandidate({
                    ...selectedCandidate,
                    education_level: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Fuente</InputLabel>
                <Select
                  value={selectedCandidate.source || ''}
                  label="Fuente"
                  onChange={(e) =>
                    setSelectedCandidate({
                      ...selectedCandidate,
                      source: e.target.value,
                    })
                  }
                >
                  <MenuItem value="website">Sitio Web</MenuItem>
                  <MenuItem value="referral">Referencia</MenuItem>
                  <MenuItem value="headhunter">Headhunter</MenuItem>
                  <MenuItem value="other">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Dirección"
                value={(selectedCandidate as any).address || ''}
                onChange={(e) =>
                  setSelectedCandidate({
                    ...selectedCandidate,
                    address: e.target.value,
                  } as any)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Cargar CV
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveCandidate} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Candidates;