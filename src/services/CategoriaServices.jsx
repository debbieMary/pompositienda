import { MAIN_URL } from "../utils/MainConstants";

export async function getCategorias(){
    const res = await fetch(`${MAIN_URL}/categorias`);
    if (!res.ok) throw new Error('Error al obtener la lista de categorias');
    return res.json();
}


export const registrarCategoria = async (categoriaData) => {
 
  const response = await fetch(`${MAIN_URL}/registroCategoria`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error || 'Error al registrar categoría');
  }

  return await response.json();
};