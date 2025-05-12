import { MAIN_URL } from "../utils/MainConstants";

export async function loginService(data) {
  try {
    const response = await fetch(`${MAIN_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const result = await response.json();
    return result;
    
  } catch (error) {
    throw new Error(error.message || 'Error de red');
  }
}