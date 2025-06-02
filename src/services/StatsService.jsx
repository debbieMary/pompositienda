import { MAIN_URL } from "../utils/MainConstants";

// src/api/getUsuariosPorFecha.js
export async function getUsuariosPorFecha({ fecha_inicio, fecha_fin }) {
  const res = await fetch(`${MAIN_URL}/usuarios_por_fecha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha_inicio, fecha_fin }),
  });

  if (!res.ok) {
    throw new Error('Error al obtener usuarios por fecha');
  }

  return res.json();
}



export async function getVentasPorFecha({ fecha_inicio, fecha_fin }) {
  const res = await fetch(`${MAIN_URL}/ventas_por_fecha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha_inicio, fecha_fin }),
  });

  if (!res.ok) {
    throw new Error('Error al obtener usuarios por fecha');
  }

  return res.json();
}




export async function getVentasPorDiaDetalle({ fecha_inicio, fecha_fin }) {
  const res = await fetch(`${MAIN_URL}/ventas_por_dia_detalle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha_inicio, fecha_fin }),
  });

  if (!res.ok) throw new Error('Error al obtener las ventas');
  return res.json();
}