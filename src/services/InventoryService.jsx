import { MAIN_URL } from "../utils/MainConstants";

export const insertarInventario = async (data) => {
  const response = await fetch(`${MAIN_URL}/inventario/insercion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al insertar inventario');
  }

  return response.json();
};
