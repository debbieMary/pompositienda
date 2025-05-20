import { useMutation } from '@tanstack/react-query';
import { registrarProducto } from '../services/ProductosServices';

export function useRegistrarProducto () {
const mutation = useMutation({
    mutationFn: registrarProducto,
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};