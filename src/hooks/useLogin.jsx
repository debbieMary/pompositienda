// hooks/useLoginMutation.js
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginService } from '../services/LoginService'; // Ajusta la ruta

export function useLogin() {
  const mutation = useMutation({
    mutationFn: loginService,
    mutationKey:["login"],
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      console.log('Inicio de sesión exitoso:', data);
      toast.success('Inicio de sesión exitoso');
    }
  });

  
  // Retornamos todo lo que necesites
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset
  };
}
