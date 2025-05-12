import { useMutation } from '@tanstack/react-query';
import { registrarUsuario } from '../services/RegistroServices';
import toast from 'react-hot-toast';

export const useRegistro = () => {
  return useMutation({
    mutationFn: registrarUsuario,
    onSuccess: ()=>{
      toast.success('Usuario Registrado Correctamente');
    },
    onError:()=>{
      toast.error('Hubo un problema al realizar el registro');
    }
  });
};