import { MAIN_URL } from "../utils/MainConstants";

export async function registrarUsuario(datos) {
    const res = await fetch(`${MAIN_URL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error en el registro');
    }
  
    return res.json();
  };