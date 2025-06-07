import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertarInventario } from '../services/InventoryService'; // o la ruta correcta
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useInsertInventario(){

const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertarInventario,
    onSuccess: () => {
      navigate("/productos", { replace: true });
      toast.success('Inventario registrado correctamente');
      queryClient.invalidateQueries(); 
    },
    onError: (error) => {
      toast.error('Error al registrar el inventario:' + error.message);
    },
  });
};
