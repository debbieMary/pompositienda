import { MAIN_URL } from "../utils/MainConstants";

export async function getAllUsuarios(){
    const res = await fetch(`${MAIN_URL}/all_usuarios`);
    if (!res.ok) throw new Error('Error al obtener la lista de usuarios');
    return res.json();
}
