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
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { AvisoService } from '@/services/aviso.service';
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '@/types/aviso';

interface AvisoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  aviso?: Aviso | null;
}

export default function AvisoModal({ open, onClose, onSuccess, aviso }: AvisoModalProps) {
  const isEdit = !!aviso;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (aviso) {
      setFormData({
        nome: aviso.Nome,
        descricao: aviso.Descricao,
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
      });
    }
    setError(null);
  }, [aviso, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!formData.nome.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!formData.descricao.trim()) {
      setError('A descrição é obrigatória');
      return;
    }

    try {
      setLoading(true);

      if (isEdit && aviso) {
        const updateData: UpdateAvisoDTO = {
          Nome: formData.nome,
          Descricao: formData.descricao,
        };
        await AvisoService.update(aviso.IdAviso, updateData);
      } else {
        const createData: CreateAvisoDTO = {
          Nome: formData.nome,
          Descricao: formData.descricao,
        };
        await AvisoService.create(createData);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.erro || `Erro ao ${isEdit ? 'atualizar' : 'criar'} aviso`);
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
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CampaignIcon sx={{ fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEdit ? 'Editar Aviso' : 'Novo Aviso'}
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
              label="Título do Aviso"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
              disabled={loading}
              placeholder="Ex: Manutenção no Elevador"
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
              rows={6}
              required
              disabled={loading}
              placeholder="Descreva os detalhes do aviso..."
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
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              },
            }}
          >
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar Aviso'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
