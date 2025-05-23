import React from "react";
import CustomTable from "../../ui/CustomTable";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";

export default function ListadoUsuarios({ usuarios, isLoadingUsuarios }) {
  const { usuario: usuario_admin } = useAuth();
  const eliminarMutation = useEliminar();
  function handleEditar(id_usuario) {
    console.log("Editar empresa con ID:", id_usuario);
    // Aquí puedes implementar la lógica para editar la empresa
  }

  function handleEliminar(id_usuario) {
    console.log("Eliminar usuario con ID:" + id_usuario);
    eliminarMutation.mutate({
      tipo: "usuario",
      id: id_usuario,
      id_usuario: usuario_admin.id_usuario,
    });
  }

  const columnasUsuarios = [
    { key: "id_usuario", titulo: "ID" },
    { key: "nombre1_usuario", titulo: "Nombre" },
    { key: "apellido1_usuario", titulo: "Apellido" },
    { key: "email_usuario", titulo: "Email" },
    { key: "rol_usuario", titulo: "Rol" },
    { key: "status", titulo: "Estado" },
  ];

  return (
    <CustomTable
      datos={usuarios}
      columnas={columnasUsuarios}
      onEditar={(item) => item && handleEditar(item.id_usuario)}
      onEliminar={(item) => item && handleEliminar(item.id_usuario)}
      isLoading={isLoadingUsuarios}
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
