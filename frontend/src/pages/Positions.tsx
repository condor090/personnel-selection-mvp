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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from '../services/api';

interface Position {
  id: string;
  code: string;
  title: string;
  hierarchy_level: 'directive' | 'supervisor' | 'operative';
  department: string;
  location: string;
  ai_collaboration_level: number;
  min_ethical_score: number;
  is_active: boolean;
  created_at: string;
}

const Positions: React.FC = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Partial<Position>>({});

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await api.get('/positions');
      setPositions(response.data);
    } catch (error) {
      // Mock data for development
      setPositions([
        {
          id: '1',
          code: 'COC-001',
          title: 'Cocinero',
          hierarchy_level: 'operative',
          department: 'Cocina',
          location: 'Constellation',
          ai_collaboration_level: 3,
          min_ethical_score: 75,
          is_active: true,
          created_at: '2024-01-15',
        },
        {
          id: '2',
          code: 'SUP-001',
          title: 'Supervisor de Turno',
          hierarchy_level: 'supervisor',
          department: 'Operaciones',
          location: 'Anahuac',
          ai_collaboration_level: 6,
          min_ethical_score: 85,
          is_active: true,
          created_at: '2024-01-10',
        },
        {
          id: '3',
          code: 'GER-001',
          title: 'Gerente de Unidad',
          hierarchy_level: 'directive',
          department: 'Administración',
          location: 'KIDE',
          ai_collaboration_level: 8,
          min_ethical_score: 90,
          is_active: true,
          created_at: '2024-01-05',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePosition = () => {
    setSelectedPosition({});
    setOpenDialog(true);
  };

  const handleEditPosition = (position: Position) => {
    setSelectedPosition(position);
    setOpenDialog(true);
  };

  const handleViewPosition = (id: string) => {
    navigate(`/positions/${id}`);
  };

  const handleSavePosition = async () => {
    try {
      if (selectedPosition.id) {
        await api.put(`/positions/${selectedPosition.id}`, selectedPosition);
      } else {
        await api.post('/positions', selectedPosition);
      }
      setOpenDialog(false);
      fetchPositions();
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };

  const getHierarchyColor = (level: string) => {
    switch (level) {
      case 'directive': return 'error';
      case 'supervisor': return 'warning';
      case 'operative': return 'info';
      default: return 'default';
    }
  };

  const getLocationIcon = (location: string) => {
    const criticalLocations = ['Constellation', 'Anahuac'];
    if (criticalLocations.includes(location)) {
      return <LocationIcon color="error" fontSize="small" />;
    }
    return null;
  };

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Código', width: 100 },
    { field: 'title', headerName: 'Título', width: 200 },
    {
      field: 'hierarchy_level',
      headerName: 'Nivel',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getHierarchyColor(params.value)}
          size="small"
        />
      ),
    },
    { field: 'department', headerName: 'Departamento', width: 150 },
    {
      field: 'location',
      headerName: 'Ubicación',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          {params.value}
          {getLocationIcon(params.value)}
        </Box>
      ),
    },
    {
      field: 'ai_collaboration_level',
      headerName: 'Nivel IA',
      width: 100,
      renderCell: (params) => (
        <Chip label={`${params.value}/10`} size="small" variant="outlined" />
      ),
    },
    {
      field: 'min_ethical_score',
      headerName: 'Score Ético Min',
      width: 130,
      renderCell: (params) => `${params.value}%`,
    },
    {
      field: 'is_active',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Activo' : 'Inactivo'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
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
            onClick={() => handleViewPosition(params.row.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEditPosition(params.row)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredPositions = positions.filter(
    (position) =>
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Posiciones</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePosition}
        >
          Nueva Posición
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por título, código o ubicación..."
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
          rows={filteredPositions}
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
          {selectedPosition.id ? 'Editar Posición' : 'Nueva Posición'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código"
                value={selectedPosition.code || ''}
                onChange={(e) =>
                  setSelectedPosition({ ...selectedPosition, code: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Título"
                value={selectedPosition.title || ''}
                onChange={(e) =>
                  setSelectedPosition({ ...selectedPosition, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nivel Jerárquico</InputLabel>
                <Select
                  value={selectedPosition.hierarchy_level || ''}
                  label="Nivel Jerárquico"
                  onChange={(e) =>
                    setSelectedPosition({
                      ...selectedPosition,
                      hierarchy_level: e.target.value as any,
                    })
                  }
                >
                  <MenuItem value="operative">Operativo</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="directive">Directivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departamento"
                value={selectedPosition.department || ''}
                onChange={(e) =>
                  setSelectedPosition({
                    ...selectedPosition,
                    department: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ubicación"
                value={selectedPosition.location || ''}
                onChange={(e) =>
                  setSelectedPosition({
                    ...selectedPosition,
                    location: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Nivel de Colaboración IA (1-10)"
                value={selectedPosition.ai_collaboration_level || ''}
                onChange={(e) =>
                  setSelectedPosition({
                    ...selectedPosition,
                    ai_collaboration_level: parseInt(e.target.value),
                  })
                }
                InputProps={{ inputProps: { min: 1, max: 10 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Score Ético Mínimo"
                value={selectedPosition.min_ethical_score || ''}
                onChange={(e) =>
                  setSelectedPosition({
                    ...selectedPosition,
                    min_ethical_score: parseInt(e.target.value),
                  })
                }
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSavePosition} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Positions;