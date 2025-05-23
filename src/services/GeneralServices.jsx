import { MAIN_URL } from '../utils/MainConstants';

export async function deleteRegisters(tipo, id, id_usuario) {
  const response = await fetch(`${MAIN_URL}/eliminar/${tipo}/${id}/${id_usuario}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || 'Error al eliminar');
  }

  return response.json();
}
