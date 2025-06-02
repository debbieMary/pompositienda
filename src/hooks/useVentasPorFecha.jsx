import { useMutation } from '@tanstack/react-query';
import { getVentasPorFecha } from '../services/StatsService';

export function useVentasPorFecha() {
  return useMutation({
    mutationFn: getVentasPorFecha,
  });
}
