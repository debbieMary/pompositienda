import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PageTitle from '../../ui/PageTitle';
import { FaUser } from 'react-icons/fa';

// Datos mock: { fecha: string, usuarios: number }
const mockRegistros = [
  { fecha: '2023-06-01', usuarios: 12 },
  { fecha: '2023-06-02', usuarios: 28 },
  { fecha: '2023-06-03', usuarios: 8 },
  { fecha: '2023-06-04', usuarios: 34 },
  { fecha: '2023-06-05', usuarios: 15 },
];

const fetchRegistros = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simula carga
  return mockRegistros.map(item => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) // Ej: "01 Jun"
  }));
};

export default function RegistrosDiarios() {
  const { data, isLoading } = useQuery({
    queryKey: ['registros-diarios'],
    queryFn: fetchRegistros
  });

  if (isLoading) return (
    <div style={{ 
      color: 'var(--pomp-turquesa)', 
      textAlign: 'center', 
      padding: '40px' 
    }}>
      Cargando datos de registros diarios...
    </div>
  );

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
              <PageTitle label="Usuarios Nuevos por día" Icon={FaUser} />
            </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--pomp-plomo)" 
            vertical={false} 
          />
          <XAxis 
            dataKey="fecha" 
            stroke="var(--pomp-plomo-xoscuro)"
            tickMargin={10}
          />
          <YAxis 
            stroke="var(--pomp-plomo-xoscuro)"
            width={30}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--pomp-white)',
              borderColor: 'var(--pomp-turquesa)',
              borderRadius: '6px',
              color: 'var(--pomp-plomo-xoscuro)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="usuarios" 
            stroke="var(--pomp-salmon)" 
            strokeWidth={3}
            dot={{ fill: 'var(--pomp-salmon-oscuro)', r: 5 }}
            activeDot={{ fill: 'var(--pomp-salmon-oscuro)', r: 7, strokeWidth: 0 }}
            name="Usuarios"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}