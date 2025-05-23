import React from "react";
import CustomTable from "../../ui/CustomTable";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
export default function ListadoCategorias({ categorias, isLoadingCategorias }) {
  console.log("Categorias:", categorias);
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();

  function handleEditar(id_categoria) {
    console.log("Editar categoria con ID:", id_categoria);
    // Aquí puedes implementar la lógica para editar la categoría
  }
  function handleEliminar(id_categoria) {
    console.log("Eliminar categoria con ID:", id_categoria);
    // Aquí puedes implementar la lógica para eliminar la categoría
  }

  const columnasCategorias = [
    { key: "id_categoria", titulo: "ID" },
    { key: "nombre_categoria", titulo: "Nombre" },
    {
      key: "fecha_creacion",
      titulo: "Fecha Creación",
      formato: (fecha) => new Date(fecha).toLocaleDateString(),
    },
    { key: "status", titulo: "Estado" },
  ];

  return (
    <CustomTable
      datos={categorias}
      columnas={columnasCategorias}
      onEditar={(item) => item && handleEditar(item.id_categoria)}
      onEliminar={(item) => item && handleEliminar(item.id_categoria)}
      isLoading={isLoadingCategorias}
      shouldShowActions={(item) => {
        if (!item) return false;
        // Lógica personalizada para mostrar/ocultar acciones
        if ("status" in item) return item.status === "active";
        if ("activo" in item) return item.activo;
        return true; // Mostrar por defecto si no hay criterio
      }}
      rowClassName={(item) => {
        if (!item) return "";
        // Clases condicionales para filas
        if ("status" in item && item.status === "inactive")
          return "inactive-row";
        if ("activo" in item && !item.activo) return "inactive-row";
        return "";
      }}
    />
  );
}
