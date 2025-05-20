import { useMutation } from '@tanstack/react-query';
import { registrarEmpresa } from '../services/EmpresasServices';

export function useRegistrarEmpresa () {
const mutation = useMutation({
    mutationFn: registrarEmpresa,
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};