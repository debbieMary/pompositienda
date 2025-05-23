import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import CustomTable from "../../ui/CustomTable";

export default function ListadoProductos({productos, isLoadingProductos}) {
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();

  function handleEditar(id_producto) {
    console.log("Editar producto con ID:", id_producto);
  }

  function handleEliminar(id_producto) {
    console.log("Eliminar producto con ID:"+ id_producto);
    eliminarMutation.mutate({ 
      tipo: "producto", 
      id:id_producto, 
      id_usuario: usuario.id_usuario 
    });
  }
 
  const columnasProductos = [
    { key: "id_producto", titulo: "ID" },
    { key: "nombre_producto", titulo: "Nombre" },
    {
      key: "precio",
      titulo: "Precio",
      formato: (precio) => `Bs. ${precio.toFixed(2)}`,
    },
    { key: "cantidad_stock", titulo: "Stock" },
     { key: "status", titulo: "Estado" },
  ];

  return (
    <CustomTable
  datos={productos}
  columnas={columnasProductos}
  onEditar={(item) => item && handleEditar(item.id_producto)}
  onEliminar={(item) => item && handleEliminar(item.id_producto)}
  isLoading={isLoadingProductos}
  shouldShowActions={(item) => {
    if (!item) return false;
    // Lógica personalizada para mostrar/ocultar acciones
    if ('status' in item) return item.status === 'active';
    if ('activo' in item) return item.activo;
    return true; // Mostrar por defecto si no hay criterio
  }}
  rowClassName={(item) => {
    if (!item) return '';
    // Clases condicionales para filas
    if ('status' in item && item.status === 'inactive') return 'inactive-row';
    if ('activo' in item && !item.activo) return 'inactive-row';
    return '';
  }}
/>
  )
}