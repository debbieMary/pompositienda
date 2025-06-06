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



export async function updateRegister(tipo, id, id_usuario, datos) {
  const response = await fetch(`${MAIN_URL}/actualizar/${tipo}/${id}/${id_usuario}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || 'Error al actualizar');
  }

  return response.json();
}
