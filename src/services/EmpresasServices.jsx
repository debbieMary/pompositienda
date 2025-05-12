import { MAIN_URL } from "../utils/MainConstants";

export async function getAllEmpresas(){
    const res = await fetch(`${MAIN_URL}/empresas`);
    if (!res.ok) throw new Error('Error al obtener la lista de empresas');
    return res.json();
}