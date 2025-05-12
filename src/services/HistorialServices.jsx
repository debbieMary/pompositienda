import { MAIN_URL } from "../utils/MainConstants";

export  async function fetchHistorial(id_usuario){
    const response = await fetch(`${MAIN_URL}/historial?id_usuario=${id_usuario}`);
  
    if (!response.ok) {
      throw new Error('Error al obtener historial');
    }
  
    const data = await response.json();
    return data; // Este será el array de compras
  }