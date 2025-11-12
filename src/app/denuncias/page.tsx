// src/app/denuncias/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Divider,
  Stack,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import { DenunciaService } from '../../services/denuncia.service';
import type { Denuncia, CreateDenunciaDTO, UpdateDenunciaDTO } from '../../types/denuncia';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import type { Categoria } from '@/types/categoria';
import { CategoriaService } from '@/services/categoria.service';

type DenunciaStatus = 'Aberta' | 'Em análise' | 'Resolvida' | 'Rejeitada';
type DenunciaPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

interface ExtendedDenuncia extends Denuncia {
  status?: DenunciaStatus;
  prioridade?: DenunciaPrioridade;
}

export default function DenunciasPage() {
  const [denuncias, setDenuncias] = useState<ExtendedDenuncia[]>([]);
  const [filteredDenuncias, setFilteredDenuncias] = useState<ExtendedDenuncia[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDenuncia, setEditingDenuncia] = useState<ExtendedDenuncia | null>(null);
  const [formData, setFormData] = useState({ 
    Nome: '', 
    Descricao: '', 
    IdCategoria: undefined as number | undefined,
    Prioridade: 'Média' as DenunciaPrioridade 
  });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    loadDenuncias();
    loadCategorias();
  }, []);

  useEffect(() => {
    let filtered = denuncias.filter((denuncia) =>
      denuncia.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      denuncia.Descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== 'all') {
      filtered = filtered.filter((d) => d.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((d) => d.prioridade === filterPriority);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((d) => d.IdCategoria?.toString() === filterCategory);
    }

    setFilteredDenuncias(filtered);
  }, [searchTerm, filterStatus, filterPriority, filterCategory, denuncias]);

  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const loadDenuncias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DenunciaService.getAll();
      setDenuncias(data as ExtendedDenuncia[]);
      setFilteredDenuncias(data as ExtendedDenuncia[]);
    } catch (err) {
      setError('Erro ao carregar denúncias. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingDenuncia) {
        const updateData: UpdateDenunciaDTO = {
          Nome: formData.Nome,
          Descricao: formData.Descricao,
        };
        await DenunciaService.update(editingDenuncia.IdDenuncia, updateData);
      } else {
        const createData: CreateDenunciaDTO = {
          Nome: formData.Nome,
          Descricao: formData.Descricao,
          IdCategoria: formData.IdCategoria,
          Prioridade: formData.Prioridade,
        };
        await DenunciaService.create(createData);
      }
      setIsModalOpen(false);
      setFormData({ 
        Nome: '', 
        Descricao: '', 
        IdCategoria: undefined,
        Prioridade: 'Média' 
      });
      setEditingDenuncia(null);
      loadDenuncias();
    } catch (err) {
      setError('Erro ao salvar denúncia.');
      console.error(err);
    }
  };

  const handleEdit = (denuncia: ExtendedDenuncia) => {
    setEditingDenuncia(denuncia);
    setFormData({
      Nome: denuncia.Nome,
      Descricao: denuncia.Descricao,
      IdCategoria: denuncia.IdCategoria || undefined,
      Prioridade: denuncia.prioridade || 'Média',
    });
    setIsModalOpen(true);
    handleMenuClose(denuncia.IdDenuncia);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        await DenunciaService.deactivate(id);
        loadDenuncias();
      } catch (err) {
        setError('Erro ao excluir denúncia.');
        console.error(err);
      }
    }
    handleMenuClose(id);
  };

  const openCreateModal = () => {
    setEditingDenuncia(null);
    setFormData({ 
      Nome: '', 
      Descricao: '', 
      IdCategoria: undefined,
      Prioridade: 'Média' 
    });
    setIsModalOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleMenuClose = (id: number) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const getStatusColor = (status?: DenunciaStatus) => {
    switch (status) {
      case 'Aberta': return 'error';
      case 'Em análise': return 'warning';
      case 'Resolvida': return 'success';
      case 'Rejeitada': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status?: DenunciaStatus) => {
    switch (status) {
      case 'Aberta': return <ErrorIcon />;
      case 'Em análise': return <PendingIcon />;
      case 'Resolvida': return <CheckCircleIcon />;
      case 'Rejeitada': return <ReportProblemIcon />;
      default: return <ReportProblemIcon />;
    }
  };

  const getPriorityColor = (prioridade?: DenunciaPrioridade): string => {
    switch (prioridade) {
      case 'Baixa': return '#4CAF50';
      case 'Média': return '#FF9800';
      case 'Alta': return '#F57C00';
      case 'Urgente': return '#D32F2F';
      default: return '#9E9E9E';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 70px)', py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Denúncias e Ocorrências
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gerencie e acompanhe todas as denúncias do condomínio
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<AddIcon />}
                onClick={openCreateModal}
                size="large"
              >
                Nova Denúncia
              </Button>
            </Box>

            {/* Toolbar */}
            <Paper sx={{ p: 2, mt: 3, borderRadius: '12px' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Buscar denúncias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1, minWidth: 200 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="Aberta">Aberta</MenuItem>
                    <MenuItem value="Em análise">Em análise</MenuItem>
                    <MenuItem value="Resolvida">Resolvida</MenuItem>
                    <MenuItem value="Rejeitada">Rejeitada</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel>Prioridade</InputLabel>
                  <Select
                    value={filterPriority}
                    label="Prioridade"
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <MenuItem value="all">Todas</MenuItem>
                    <MenuItem value="Baixa">Baixa</MenuItem>
                    <MenuItem value="Média">Média</MenuItem>
                    <MenuItem value="Alta">Alta</MenuItem>
                    <MenuItem value="Urgente">Urgente</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={filterCategory}
                    label="Categoria"
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="all">Todas</MenuItem>
                    {categorias.map((cat) => (
                      <MenuItem key={cat.IdCategoria} value={cat.IdCategoria.toString()}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: cat.Cor || '#757575'
                            }}
                          />
                          {cat.Nome}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Divider orientation="vertical" flexItem />
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="grid">
                    <ViewModuleIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewListIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
                <Chip
                  label={`${filteredDenuncias.length} ${filteredDenuncias.length === 1 ? 'denúncia' : 'denúncias'}`}
                  color="error"
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : filteredDenuncias.length === 0 ? (
            <Paper sx={{ textAlign: 'center', py: 8, borderRadius: '16px' }}>
              <ReportProblemIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Nenhuma denúncia encontrada'
                  : 'Nenhuma denúncia cadastrada'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece registrando a primeira denúncia'}
              </Typography>
              {!searchTerm && filterStatus === 'all' && filterPriority === 'all' && (
                <Button variant="contained" color="error" onClick={openCreateModal} startIcon={<AddIcon />}>
                  Registrar Primeira Denúncia
                </Button>
              )}
            </Paper>
          ) : viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredDenuncias.map((denuncia) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={denuncia.IdDenuncia}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      borderLeft: `4px solid ${getPriorityColor(denuncia.prioridade)}`,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            icon={getStatusIcon(denuncia.status)}
                            label={denuncia.status}
                            color={getStatusColor(denuncia.status) as any}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Stack>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, denuncia.IdDenuncia)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl[denuncia.IdDenuncia]}
                          open={Boolean(anchorEl[denuncia.IdDenuncia])}
                          onClose={() => handleMenuClose(denuncia.IdDenuncia)}
                        >
                          <MenuItem onClick={() => handleEdit(denuncia)}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} />
                            Editar
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(denuncia.IdDenuncia)} sx={{ color: 'error.main' }}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                            Excluir
                          </MenuItem>
                        </Menu>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <PriorityHighIcon
                          sx={{
                            color: getPriorityColor(denuncia.prioridade),
                            fontSize: 20,
                          }}
                        />
                        <Chip
                          label={`Prioridade ${denuncia.prioridade}`}
                          size="small"
                          sx={{
                            backgroundColor: getPriorityColor(denuncia.prioridade) + '20',
                            color: getPriorityColor(denuncia.prioridade),
                            fontWeight: 600,
                          }}
                        />
                        {denuncia.categoria && (
                          <Chip
                            label={denuncia.categoria.Nome}
                            size="small"
                            sx={{
                              backgroundColor: denuncia.categoria.Cor || '#757575',
                              color: '#fff',
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
                        {denuncia.Nome}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {denuncia.Descricao}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {denuncia.usuario?.NomeUsuario || 'Anônimo'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(denuncia.Inclusao)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(denuncia)} fullWidth>
                        Gerenciar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredDenuncias.map((denuncia) => (
                <Card key={denuncia.IdDenuncia} sx={{ borderLeft: `4px solid ${getPriorityColor(denuncia.prioridade)}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                          <Chip
                            icon={getStatusIcon(denuncia.status)}
                            label={denuncia.status}
                            color={getStatusColor(denuncia.status) as any}
                            size="small"
                          />
                          <Chip
                            icon={<PriorityHighIcon />}
                            label={`${denuncia.prioridade}`}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(denuncia.prioridade) + '20',
                              color: getPriorityColor(denuncia.prioridade),
                              fontWeight: 600,
                            }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {denuncia.Nome}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {denuncia.Descricao}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {denuncia.usuario?.NomeUsuario || 'Anônimo'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Registrado em {formatDateTime(denuncia.Inclusao)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleEdit(denuncia)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(denuncia.IdDenuncia)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Modal */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
              {editingDenuncia ? 'Editar Denúncia' : 'Nova Denúncia'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
                <TextField
                  label="Título da Denúncia"
                  value={formData.Nome}
                  onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
                  required
                  fullWidth
                  placeholder="Ex: Barulho excessivo - Apto 301"
                />
                <TextField
                  label="Descrição Detalhada"
                  value={formData.Descricao}
                  onChange={(e) => setFormData({ ...formData, Descricao: e.target.value })}
                  required
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="Descreva a ocorrência com detalhes..."
                />
                
                {!editingDenuncia && (
                  <>
                    <FormControl fullWidth>
                      <InputLabel>Categoria</InputLabel>
                      <Select
                        value={formData.IdCategoria || ''}
                        onChange={(e) => setFormData({ ...formData, IdCategoria: e.target.value as number })}
                        label="Categoria"
                      >
                        <MenuItem value="">
                          <em>Nenhuma</em>
                        </MenuItem>
                        {categorias.map((cat) => (
                          <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.Icone} {cat.Nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Prioridade</InputLabel>
                      <Select
                        value={formData.Prioridade}
                        onChange={(e) => setFormData({ ...formData, Prioridade: e.target.value as DenunciaPrioridade })}
                        label="Prioridade"
                      >
                        <MenuItem value="Baixa">Baixa</MenuItem>
                        <MenuItem value="Média">Média</MenuItem>
                        <MenuItem value="Alta">Alta</MenuItem>
                        <MenuItem value="Urgente">Urgente</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={() => setIsModalOpen(false)} color="inherit">
                Cancelar
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="error">
                {editingDenuncia ? 'Atualizar Denúncia' : 'Registrar Denúncia'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
