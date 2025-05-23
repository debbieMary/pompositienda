import { MAIN_URL } from "../utils/MainConstants";

export async function getProductos() {
  try {
    const res = await fetch(`${MAIN_URL}/productos`);
    if (!res.ok) throw new Error("Error al obtener la lista de productos");
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener productos");
  }
  
}



export async function getActiveProductos(id_empresa, id_categoria) {
  // Creamos una URL base y agregamos los parámetros dinámicamente
  let url = `${MAIN_URL}/productos_activos?`;

  // Agregar id_empresa si está disponible
  if (id_empresa) {
    url += `id_empresa=${id_empresa}&`;
  }

  // Agregar id_categoria si está disponible
  if (id_categoria) {
    url += `id_categoria=${id_categoria}&`;
  }

  // Quitamos el último "&" si hay
  url = url.endsWith("&") ? url.slice(0, -1) : url;

  try {
    // Realizamos la petición
    const res = await fetch(url);

    // Verificamos si la respuesta fue correcta
    if (!res.ok) throw new Error("Error al obtener la lista de productos");

    // Retornamos los productos

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener productos");
  }
}


export const registrarProducto = async (productosData) => {
  // Limpiamos el objeto file si está vacío para evitar problemas
 

  const response = await fetch(`${MAIN_URL}/registroProductos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productosData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error || 'Error al registrar el producto');
  }

  return await response.json();
};