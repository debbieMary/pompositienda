import { MAIN_URL } from "../utils/MainConstants";

export async function getProductos(id_empresa, id_categoria) {
  // Creamos una URL base y agregamos los parámetros dinámicamente
  let url = `${MAIN_URL}/productos?`;

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
