import PageTitle from "../../ui/PageTitle";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaChartBar } from "react-icons/fa";
import { useEffect } from "react";
import { useVentasPorFecha } from "../../hooks/useVentasPorFecha";

// Datos de prueba simulados (sin API)
/*const datosMock = [
  { fecha_compra: "2025-05-20T14:30:00Z", total: 150 },
  { fecha_compra: "2025-05-20T18:45:00Z", total: 200 },
  { fecha_compra: "2025-05-21T10:15:00Z", total: 75 },
  { fecha_compra: "2025-05-22T09:00:00Z", total: 300 },
  { fecha_compra: "2025-05-23T16:20:00Z", total: 180 },
];

const fetchVentasMock = async () => {
  // Simulamos un pequeño retardo de red
  await new Promise((resolve) => setTimeout(resolve, 500));
  return datosMock;
};
*/
export default function VentasPorFecha({ fecha_inicio, fecha_fin }) {
  console.log("desde ventas por dia", fecha_inicio, fecha_fin);

  /*const { data, isLoading, error } = useQuery({
 queryKey: ["ventas-diarias-mock"],
    queryFn: fetchVentasMock,
    select: (data) => {
      // Procesamos los datos para agrupar por día
      return data.reduce((acc, venta) => {
        const fecha = new Date(venta.fecha_compra).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }); // Formato: 20/05/2023
        const existe = acc.find((item) => item.fecha === fecha);

        if (existe) {
          existe.total += venta.total;
        } else {
          acc.push({ fecha, total: venta.total });
        }
        return acc;
      }, []);
    },
  });*/

  const { mutate, data, isPending: isLoading, error } = useVentasPorFecha();
  /*const { data, isLoading } = useQuery({
      queryKey: ['registros-diarios'],
      queryFn: fetchRegistros
    });*/

  useEffect(
    function () {
      mutate({
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
      });
    },
    [fecha_inicio, fecha_fin, mutate]
  );

  if (isLoading)
    return (
      <div
        style={{
          color: "var(--pomp-turquesa)",
          textAlign: "center",
          padding: "20px",
        }}
      >
        Cargando datos de ventas diarias...
      </div>
    );

  if (error) {
    return (
      <ErrorComponent
        titulo="Error al cargar los datos"
        buttonLabel="Volver al inicio"
        to="/"
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        border: "2px solid var(--pomp-turquesa)",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <div align="center">
        <PageTitle label="Ventas por día" Icon={FaChartBar} />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data?.map((item) => ({
            ...item,
            fecha: new Date(item.fecha).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            }), // Ej: "01 Jun"
          }))}
          margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="fecha"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fill: "var(--pomp-plomo-xoscuro)" }}
          />
          <YAxis tick={{ fill: "var(--pomp-plomo-xoscuro)" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--pomp-white)",
              borderColor: "var(--pomp-turquesa)",
              borderRadius: "8px",
            }}
          />
          <Bar
            dataKey="total"
            name="Total vendido"
            fill="var(--pomp-salmon)"
            stroke="var(--pomp-salmon-oscuro)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
