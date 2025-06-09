import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  QrCode as QrCodeIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon,
  CameraAlt as CameraIcon,
  Fingerprint as FingerprintIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import QRCode from 'react-qr-code';

interface Checkpoint {
  id: string;
  processName: string;
  subprocess: string;
  microprocedure: string;
  employee: string;
  location: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  requiredVerifications: number;
  completedVerifications: number;
  lastVerification?: {
    timestamp: string;
    verifiedBy: string;
    method: 'qr' | 'biometric';
  };
  nextCheckpoint?: string;
}

const Checkpoints: React.FC = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Mock data
  const activeCheckpoints: Checkpoint[] = [
    {
      id: 'CHK001',
      processName: 'Preparación de Alimentos',
      subprocess: 'Cocina Caliente',
      microprocedure: 'Verificación de temperatura de cocción',
      employee: 'Juan Pérez',
      location: 'Constellation - Cocina Principal',
      status: 'in_progress',
      requiredVerifications: 5,
      completedVerifications: 3,
      lastVerification: {
        timestamp: '2024-01-15T10:30:00',
        verifiedBy: 'María López',
        method: 'qr',
      },
      nextCheckpoint: '11:00 AM',
    },
    {
      id: 'CHK002',
      processName: 'Limpieza y Sanitización',
      subprocess: 'Áreas de Servicio',
      microprocedure: 'Desinfección de superficies',
      employee: 'Ana García',
      location: 'Anahuac - Comedor',
      status: 'pending',
      requiredVerifications: 3,
      completedVerifications: 0,
      nextCheckpoint: '10:45 AM',
    },
    {
      id: 'CHK003',
      processName: 'Control de Inventario',
      subprocess: 'Recepción de Mercancía',
      microprocedure: 'Verificación de cadena de frío',
      employee: 'Carlos Rodríguez',
      location: 'Constellation - Almacén',
      status: 'completed',
      requiredVerifications: 4,
      completedVerifications: 4,
      lastVerification: {
        timestamp: '2024-01-15T09:15:00',
        verifiedBy: 'Luis Martínez',
        method: 'biometric',
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in_progress':
        return <AccessTimeIcon color="info" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'failed':
        return <WarningIcon color="error" />;
      default:
        return null;
    }
  };

  const handleVerify = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setOpenVerifyDialog(true);
  };

  const handleShowQR = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setOpenQRDialog(true);
  };

  const handleVerificationSubmit = () => {
    console.log('Verification submitted:', verificationCode);
    setOpenVerifyDialog(false);
    setVerificationCode('');
  };

  const processSteps = [
    'Iniciar proceso',
    'Verificar materiales/equipos',
    'Ejecutar procedimiento',
    'Registrar resultados',
    'Validar calidad',
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Puntos de Verificación
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Sistema de verificación con códigos QR y biométricos para asegurar el cumplimiento 
        de procesos críticos según el árbol de satisfacción organizacional.
      </Alert>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Checkpoints Activos
              </Typography>
              <Typography variant="h4">
                {activeCheckpoints.filter(c => c.status === 'in_progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pendientes
              </Typography>
              <Typography variant="h4" color="warning.main">
                {activeCheckpoints.filter(c => c.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completados Hoy
              </Typography>
              <Typography variant="h4" color="success.main">
                {activeCheckpoints.filter(c => c.status === 'completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tasa de Cumplimiento
              </Typography>
              <Typography variant="h4">
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Checkpoints */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Checkpoints Activos
        </Typography>
        <List>
          {activeCheckpoints.map((checkpoint) => (
            <Card key={checkpoint.id} sx={{ mb: 2 }}>
              <CardHeader
                avatar={getStatusIcon(checkpoint.status)}
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1">
                      {checkpoint.processName} - {checkpoint.subprocess}
                    </Typography>
                    <Chip 
                      label={checkpoint.status.replace('_', ' ').toUpperCase()} 
                      size="small"
                      color={getStatusColor(checkpoint.status) as any}
                    />
                  </Box>
                }
                subheader={checkpoint.microprocedure}
                action={
                  <Box>
                    <IconButton onClick={() => handleShowQR(checkpoint)}>
                      <QrCodeIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VerifiedIcon />}
                      onClick={() => handleVerify(checkpoint)}
                      disabled={checkpoint.status === 'completed'}
                    >
                      Verificar
                    </Button>
                  </Box>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        Empleado: {checkpoint.employee}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {checkpoint.location}
                      </Typography>
                    </Box>
                    {checkpoint.nextCheckpoint && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          Próximo checkpoint: {checkpoint.nextCheckpoint}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mb={1}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Progreso de verificaciones
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={(checkpoint.completedVerifications / checkpoint.requiredVerifications) * 100}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">
                          {checkpoint.completedVerifications}/{checkpoint.requiredVerifications}
                        </Typography>
                      </Box>
                    </Box>
                    {checkpoint.lastVerification && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Última verificación: {new Date(checkpoint.lastVerification.timestamp).toLocaleString('es-MX')}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          Por: {checkpoint.lastVerification.verifiedBy} ({checkpoint.lastVerification.method.toUpperCase()})
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>

      {/* Process Steps Guide */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Guía de Proceso de Verificación
        </Typography>
        <Stepper orientation="vertical">
          {processSteps.map((step, index) => (
            <Step key={step} active={true}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {index === 0 && 'Escanear código QR o usar verificación biométrica'}
                  {index === 1 && 'Confirmar disponibilidad y estado de recursos'}
                  {index === 2 && 'Seguir el procedimiento paso a paso'}
                  {index === 3 && 'Documentar observaciones y métricas'}
                  {index === 4 && 'Supervisor valida el cumplimiento'}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Verify Dialog */}
      <Dialog open={openVerifyDialog} onClose={() => setOpenVerifyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Verificar Checkpoint
        </DialogTitle>
        <DialogContent>
          {selectedCheckpoint && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Verificando: {selectedCheckpoint.microprocedure}
              </Alert>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<QrCodeIcon />}
                    sx={{ height: '100px' }}
                  >
                    Escanear QR
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<FingerprintIcon />}
                    sx={{ height: '100px' }}
                  >
                    Huella Digital
                  </Button>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Código de Verificación Manual"
                variant="outlined"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Ingrese el código si no puede escanear"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observaciones"
                variant="outlined"
                placeholder="Opcional: Agregue comentarios sobre el proceso"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVerifyDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleVerificationSubmit}
            variant="contained"
            startIcon={<CheckCircleIcon />}
          >
            Confirmar Verificación
          </Button>
        </DialogActions>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)}>
        <DialogTitle>
          Código QR del Checkpoint
        </DialogTitle>
        <DialogContent>
          {selectedCheckpoint && (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body2" gutterBottom>
                {selectedCheckpoint.microprocedure}
              </Typography>
              <Box sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'white', display: 'inline-block' }}>
                <QRCode
                  value={`CHECKPOINT-${selectedCheckpoint.id}-${Date.now()}`}
                  size={200}
                />
              </Box>
              <Typography variant="caption" display="block" color="text.secondary">
                ID: {selectedCheckpoint.id}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Empleado: {selectedCheckpoint.employee}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQRDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Checkpoints;