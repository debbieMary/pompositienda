import React, { useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useVentasPorDiaDetalle } from "../../hooks/useVentasPorDiaDetalle";
import ErrorComponent from "../../ui/ErrorComponent";
import { FaShop } from "react-icons/fa6";
import PageTitle from "../../ui/PageTitle";

// Paleta de colores basada en tus variables CSS
const COLORS = [
  "var(--pomp-turquesa)",
  "var(--pomp-salmon)",
  "var(--pomp-turquesa-dark)",
  "var(--pomp-salmon-oscuro)",
  "var(--pomp-turquesa-claro)",
  "var(--pomp-salmon-light)",
  "var(--pomp-plomo-oscuro)",
];

function agruparPorProductoYFecha(data) {
  const fechas = [...new Set(data.map((item) => item.fecha))];
  const productos = [...new Set(data.map((item) => item.nombre_producto))];

  return fechas.map((fecha) => {
    const entrada = { fecha };
    productos.forEach((prod) => {
      const match = data.find(
        (d) => d.fecha === fecha && d.nombre_producto === prod
      );
      entrada[prod] = match ? parseInt(match.total_vendido) : 0;
    });
    return entrada;
  });
}

export default function VentasDetalle({ fecha_inicio, fecha_fin }) {
  const {
    mutate,
    data,
    isPending: isLoading,
    error,
  } = useVentasPorDiaDetalle();

  useEffect(() => {
    mutate({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
    });
  }, [fecha_inicio, fecha_fin, mutate]);

  const datosAgrupados = data
    ? agruparPorProductoYFecha(
        data.map((item) => ({
          ...item,
          fecha: new Date(item.fecha).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          }), // Ej: "01 Jun"
        }))
      )
    : [];
  const productos = data
    ? [...new Set(data.map((item) => item.nombre_producto))]
    : [];

  if (error) {
    return (
      <ErrorComponent
        titulo="Error al cargar los datos"
        buttonLabel="Volver al inicio"
        to="/"
      />
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          color: "var(--pomp-turquesa)",
          textAlign: "center",
          padding: "40px",
        }}
      >
        Cargando datos de registros de detalle de productos...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "500px", // Aumenté ligeramente la altura
        border: "2px solid var(--pomp-turquesa)",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "var(--pomp-white)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <PageTitle label="Ventas por día" Icon={FaShop} />
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={datosAgrupados}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60, // Más espacio para las etiquetas del eje X
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--pomp-plomo)" />
          <XAxis
            dataKey="fecha"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fill: "var(--pomp-turquesa-dark)" }}
          />
          <YAxis tick={{ fill: "var(--pomp-turquesa-dark)" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--pomp-white)",
              borderColor: "var(--pomp-turquesa)",
              borderRadius: "8px",
              color: "var(--pomp-turquesa-dark)",
            }}
            formatter={(value, name) => [`${value} unidades`, name]}
          />

          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          {productos.map((producto, index) => (
            <Bar
              key={producto}
              dataKey={producto}
              fill={COLORS[index % COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
