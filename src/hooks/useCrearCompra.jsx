
import { useMutation } from '@tanstack/react-query';
import { finalizarCompra } from '../services/CompraService';

export function useCrearCompra() {
  const mutation = useMutation({
    mutationFn: finalizarCompra,
    mutationKey:["crear-compra"]
  });

  return mutation;
}