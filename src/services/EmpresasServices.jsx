import { MAIN_URL } from "../utils/MainConstants";

export async function getAllEmpresas(){
    const res = await fetch(`${MAIN_URL}/empresas`);
    if (!res.ok) throw new Error('Error al obtener la lista de empresas');
    return res.json();
}




export const registrarEmpresa = async (empresaData) => {
  // Limpiamos el objeto file si está vacío para evitar problemas
 

  const response = await fetch(`${MAIN_URL}/registroEmpresas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(empresaData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error || 'Error al registrar empresa');
  }

  return await response.json();
};