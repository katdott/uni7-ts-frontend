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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { DenunciaService } from '@/services/denuncia.service';
import type { Denuncia, CreateDenunciaDTO, UpdateDenunciaDTO, DenunciaStatus, DenunciaPrioridade } from '@/types/denuncia';

interface DenunciaModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  denuncia?: Denuncia | null;
}

export default function DenunciaModal({ open, onClose, onSuccess, denuncia }: DenunciaModalProps) {
  const isEdit = !!denuncia;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    status: 'Aberta' as DenunciaStatus,
    prioridade: 'Média' as DenunciaPrioridade,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (denuncia) {
      setFormData({
        nome: denuncia.Nome,
        descricao: denuncia.Descricao,
        status: denuncia.Status,
        prioridade: denuncia.Prioridade,
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        status: 'Aberta',
        prioridade: 'Média',
      });
    }
    setError(null);
  }, [denuncia, open]);

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

      if (isEdit && denuncia) {
        const updateData: UpdateDenunciaDTO = {
          Nome: formData.nome,
          Descricao: formData.descricao,
          Status: formData.status,
          Prioridade: formData.prioridade,
        };
        await DenunciaService.update(denuncia.IdDenuncia, updateData);
      } else {
        const createData: CreateDenunciaDTO = {
          Nome: formData.nome,
          Descricao: formData.descricao,
          Status: formData.status,
          Prioridade: formData.prioridade,
        };
        await DenunciaService.create(createData);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.erro || `Erro ao ${isEdit ? 'atualizar' : 'criar'} denúncia`);
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
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ReportIcon sx={{ fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEdit ? 'Editar Denúncia' : 'Nova Denúncia'}
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
              label="Título da Denúncia"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
              disabled={loading}
              placeholder="Ex: Barulho excessivo apartamento 302"
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
              rows={5}
              required
              disabled={loading}
              placeholder="Descreva os detalhes da denúncia..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  label="Status"
                  disabled={loading}
                  sx={{
                    borderRadius: '12px',
                  }}
                >
                  <MenuItem value="Aberta">Aberta</MenuItem>
                  <MenuItem value="Em análise">Em análise</MenuItem>
                  <MenuItem value="Resolvida">Resolvida</MenuItem>
                  <MenuItem value="Rejeitada">Rejeitada</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Prioridade</InputLabel>
                <Select
                  value={formData.prioridade}
                  onChange={(e) => handleChange('prioridade', e.target.value)}
                  label="Prioridade"
                  disabled={loading}
                  sx={{
                    borderRadius: '12px',
                  }}
                >
                  <MenuItem value="Baixa">Baixa</MenuItem>
                  <MenuItem value="Média">Média</MenuItem>
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Urgente">Urgente</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              },
            }}
          >
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar Denúncia'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
