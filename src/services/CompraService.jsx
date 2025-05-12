// src/services/pedidoService.js

import { MAIN_URL } from "../utils/MainConstants";

export async function finalizarCompra(pedido) {
  const response = await fetch(`${MAIN_URL}/compra`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });

  // Primero, verificamos si la respuesta fue exitosa
  if (!response.ok) {
    const errorData = await response.json();  // Solo hacemos .json() si el response no es ok
    throw new Error(errorData.error || 'Error al finalizar el pedido');
  }

  // Si la respuesta fue exitosa, entonces procesamos los datos
  const data = await response.json();
  return data;  // { message: "...", id_compra_total: ... }
}
