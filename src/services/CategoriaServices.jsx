import { MAIN_URL } from "../utils/MainConstants";

export async function getCategorias(){
    const res = await fetch(`${MAIN_URL}/categorias`);
    if (!res.ok) throw new Error('Error al obtener la lista de categorias');
    return res.json();
}