import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRegisters } from '../services/GeneralServices';
import toast from 'react-hot-toast';

export function useEliminar() {
  const queryClient = useQueryClient();

  return useMutation({
    // NO es async aquí
    mutationFn: ({ tipo, id, id_usuario }) => deleteRegisters(tipo, id, id_usuario),

    onSuccess: (data) => {
      toast.success( data.mensaje || 'Elemento eliminado correctamente');
      queryClient.invalidateQueries();
    },

    onError: (error) => {

         toast.error('Error al eliminar:', error.message);
      console.error('Error al eliminar:', error.message);
    },
  });
}
