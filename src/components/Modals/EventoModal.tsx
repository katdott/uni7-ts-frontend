'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { EventoService } from '@/services/evento.service';
import type { Evento, CreateEventoDTO, UpdateEventoDTO } from '@/types/evento';

interface EventoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  evento?: Evento | null;
}

export default function EventoModal({ open, onClose, onSuccess, evento }: EventoModalProps) {
  const isEdit = !!evento;

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dataEvento: '',
    local: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (evento) {
      // Formatar data para input datetime-local
      const dataFormatada = new Date(evento.dataEvento).toISOString().slice(0, 16);
      
      setFormData({
        titulo: evento.titulo,
        descricao: evento.descricao,
        dataEvento: dataFormatada,
        local: evento.local || '',
      });
    } else {
      setFormData({
        titulo: '',
        descricao: '',
        dataEvento: '',
        local: '',
      });
    }
    setError(null);
  }, [evento, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!formData.titulo.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!formData.descricao.trim()) {
      setError('A descrição é obrigatória');
      return;
    }

    if (!formData.dataEvento) {
      setError('A data do evento é obrigatória');
      return;
    }

    try {
      setLoading(true);

      if (isEdit && evento) {
        const updateData: UpdateEventoDTO = {
          titulo: formData.titulo,
          descricao: formData.descricao,
          dataEvento: formData.dataEvento,
          local: formData.local || undefined,
        };
        await EventoService.update(evento.idEvento, updateData);
      } else {
        const createData: CreateEventoDTO = {
          titulo: formData.titulo,
          descricao: formData.descricao,
          dataEvento: formData.dataEvento,
          local: formData.local || undefined,
        };
        await EventoService.create(createData);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.erro || `Erro ao ${isEdit ? 'atualizar' : 'criar'} evento`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)'
              : 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(30,41,59,0.98) 100%)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CalendarIcon sx={{ fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEdit ? 'Editar Evento' : 'Novo Evento'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Título do Evento"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              fullWidth
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              multiline
              rows={4}
              required
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              fullWidth
              label="Data e Hora do Evento"
              type="datetime-local"
              value={formData.dataEvento}
              onChange={(e) => handleChange('dataEvento', e.target.value)}
              required
              disabled={loading}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              fullWidth
              label="Local (Opcional)"
              value={formData.local}
              onChange={(e) => handleChange('local', e.target.value)}
              disabled={loading}
              placeholder="Ex: Salão de Festas, Área da Piscina..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
              },
            }}
          >
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar Evento'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
