// src/hooks/useActualizar.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRegister } from '../services/GeneralServices';
import toast from 'react-hot-toast';

export function useActualizar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tipo, id, id_usuario, datos }) =>
      updateRegister(tipo, id, id_usuario, datos),

    onSuccess: (data) => {
      toast.success(data.mensaje || 'Actualizado correctamente');
      queryClient.invalidateQueries(); // O puedes pasar la query específica si sabes cuál
    },

    onError: (error) => {
      toast.error(error.message || 'Error al actualizar');
      console.error('Error al actualizar:', error.message);
    },
  });
}
