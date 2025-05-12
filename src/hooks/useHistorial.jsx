// hooks/useHistorial.js

import { useQuery } from '@tanstack/react-query';
import { fetchHistorial } from '../services/HistorialServices';

export const useHistorial = (id_usuario) => {
  return useQuery({
    queryKey: ['historial', id_usuario],
    queryFn: () => fetchHistorial(id_usuario),
    enabled: !!id_usuario, // Solo corre si hay id_cliente
    refetchOnWindowFocus: false, // No recarga automáticamente si vuelves a la pestaña
  });
};