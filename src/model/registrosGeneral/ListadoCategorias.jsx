import React, { useState } from "react";
import CustomTable from "../../ui/CustomTable";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import { ConfirmDialog } from "../../ui/ConfirmDialog"; // Asegúrate de tener esta ruta correcta
import PageTitle from "../../ui/PageTitle";
import { FaEdit } from "react-icons/fa";
import { CustomModal } from "../../ui/CustomModal";
import { useActualizar } from "../../hooks/useActualizar";

export default function ListadoCategorias({ categorias, isLoadingCategorias , id_usuario}) {
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
 const { mutate: actualizar} = useActualizar();  
 
  const [showModal, setShowModal] = useState(false);

  const handleEditar = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

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
        tipo: "categoria",
        id: selectedItem.id_categoria,
        id_usuario: usuario.id_usuario,
      });
    }
    handleHideConfirm();
  }

  const handleSave = (datos) => {
  
   const datosActualizados= {
      nombre_categoria: datos.nombre_categoria,
      descripcion: datos.descripcion,
    };

     actualizar({
      tipo: 'categoria',
      id: datos.id_categoria,
      id_usuario: id_usuario,
      datos: datosActualizados,
    });

    setShowModal(false);
  };

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
    <>
      <PageTitle label="Listado de Categorías" Icon={FaEdit} />
      <CustomTable
        datos={categorias}
        columnas={columnasCategorias}
        onEditar={handleEditar}
        onEliminar={(item) => item && handleShowConfirm(item)}
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

      <ConfirmDialog
        show={showConfirm}
        onHide={handleHideConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Categoría"
        message={`¿Estás seguro de que deseas eliminar la categoría "${selectedItem?.nombre_categoria}"?`}
      />
      <CustomModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        entityType="categoria"
        entityData={selectedItem}
        onSave={(data) => {
          handleSave(data);
        }}
      />
    </>
  );
}
