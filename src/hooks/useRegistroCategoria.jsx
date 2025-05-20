import { useMutation } from '@tanstack/react-query';
import { registrarCategoria } from '../services/CategoriaServices';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRegistroCategoria () {

const navigate = useNavigate();
  const location = useLocation();

  
const mutation = useMutation({
    mutationFn: registrarCategoria,
    
    onSuccess: () => {
      navigate(location.pathname, { replace: true });
      toast.success('Categoría registrada correctamente');
    },
    onError: (error) => {
      toast.error('Error al registrar la categoría:' + error.message);
    },
  });

  return {
    mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};