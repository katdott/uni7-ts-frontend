'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: 'warning' | 'error' | 'info' | 'success';
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  severity = 'warning',
}: ConfirmDialogProps) {
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <ErrorIcon sx={{ fontSize: 64, color: '#EF4444' }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 64, color: '#F59E0B' }} />;
      case 'info':
        return <InfoIcon sx={{ fontSize: 64, color: '#3B82F6' }} />;
      case 'success':
        return <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981' }} />;
    }
  };

  const getColor = () => {
    switch (severity) {
      case 'error':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'info':
        return '#3B82F6';
      case 'success':
        return '#10B981';
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.98)'
              : 'rgba(30, 41, 59, 0.98)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogContent sx={{ pt: 4, pb: 2, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>{getIcon()}</Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: getColor(),
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '12px',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'text.secondary',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            borderRadius: '12px',
            px: 3,
            py: 1,
            background: `linear-gradient(135deg, ${getColor()} 0%, ${getColor()}CC 100%)`,
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': {
              background: `linear-gradient(135deg, ${getColor()}CC 0%, ${getColor()}99 100%)`,
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
