'use client';

import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import type { Categoria } from '@/types/categoria';
import { CategoriaService } from '@/services/categoria.service';

interface CategoriaSelectProps {
  value: number | null | undefined;
  onChange: (categoriaId: number | null) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function CategoriaSelect({
  value,
  onChange,
  label = 'Categoria',
  required = false,
  error = false,
}: CategoriaSelectProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent<number | string>) => {
    const newValue = event.target.value;
    onChange(newValue === '' || newValue === null ? null : Number(newValue));
  };

  const getCategoria = (id: number | null | undefined) => {
    if (!id) return null;
    return categorias.find(cat => cat.IdCategoria === id);
  };

  const categoria = getCategoria(value);

  return (
    <FormControl fullWidth required={required} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ''}
        onChange={handleChange}
        label={label}
        disabled={loading}
        renderValue={(selected) => {
          const cat = getCategoria(selected as number);
          if (!cat) return <em>Selecione uma categoria</em>;
          
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={cat.Nome}
                size="small"
                sx={{
                  bgcolor: cat.Cor || '#757575',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
            </Box>
          );
        }}
      >
        <MenuItem value="">
          <em>Nenhuma categoria</em>
        </MenuItem>
        {categorias.map((cat) => (
          <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={cat.Nome}
                size="small"
                sx={{
                  bgcolor: cat.Cor || '#757575',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
              {cat.Descricao && (
                <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {cat.Descricao}
                </Box>
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
