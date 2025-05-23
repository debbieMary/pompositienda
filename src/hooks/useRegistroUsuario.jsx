import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registrarUsuario } from '../services/RegistroServices';
import toast from 'react-hot-toast';

export function useRegistro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrarUsuario,
    onSuccess: ()=>{
      toast.success('Usuario Registrado Correctamente');
       queryClient.invalidateQueries({ queryKey: ['all_usuarios'] });
    },
    onError:()=>{
      toast.error('Hubo un problema al realizar el registro de usuario');
    }
  });
};