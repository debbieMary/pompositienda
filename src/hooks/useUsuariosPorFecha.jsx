import { useMutation } from '@tanstack/react-query';
import { getUsuariosPorFecha } from '../services/StatsService';

export function useUsuariosPorFecha() {
  return useMutation({
    mutationFn: getUsuariosPorFecha,
  });
}
