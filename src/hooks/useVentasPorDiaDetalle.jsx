import { useMutation } from '@tanstack/react-query';
import { getVentasPorDiaDetalle } from '../services/StatsService';




export function useVentasPorDiaDetalle() {
  return useMutation({
    mutationFn: getVentasPorDiaDetalle,
  });
}
