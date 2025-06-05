import React, { useState } from "react";
import CustomTable from "../../ui/CustomTable";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import { ConfirmDialog } from "../../ui/ConfirmDialog"; 

export default function ListadoUsuarios({ usuarios, isLoadingUsuarios }) {
  const { usuario: usuario_admin } = useAuth();
  const eliminarMutation = useEliminar();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleEditar(id_usuario) {
    console.log("Editar empresa con ID:", id_usuario);
    // Aquí puedes implementar la lógica para editar la empresa
  }

  function handleShowConfirm(item) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  function handleHideConfirm() {
    setShowConfirm(false);
    setSelectedItem(null);
  }

  function handleConfirmDelete() {
    if (selectedItem) {
      eliminarMutation.mutate({
        tipo: "usuario",
        id: selectedItem.id_usuario,
        id_usuario: usuario_admin.id_usuario,
      });
    }
    handleHideConfirm();
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
    <>
      <CustomTable
        datos={usuarios}
        columnas={columnasUsuarios}
        onEditar={(item) => item && handleEditar(item.id_usuario)}
        onEliminar={(item) => item && handleShowConfirm(item)}
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

      <ConfirmDialog
        show={showConfirm}
        onHide={handleHideConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuarios"
        message={`¿Estás seguro de que deseas eliminar al usuario "${selectedItem?.nombre1_usuario} ${selectedItem?.apellido1_usuario}"?`}
      />
    </>
  );
}
