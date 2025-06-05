import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import CustomTable from "../../ui/CustomTable";
import { ConfirmDialog } from "../../ui/ConfirmDialog"; // Asegúrate de tener esta ruta correcta
import { FaEdit } from "react-icons/fa";
import PageTitle from "../../ui/PageTitle";

export default function ListadoEmpresas({ empresas, isLoadingEmpresas }) {
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleEditar(id_empresa) {
    console.log("Editar empresa con ID:", id_empresa);
    // Implementa la lógica para editar
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
        tipo: "empresa",
        id: selectedItem.id_empresa,
        id_usuario: usuario.id_usuario,
      });
    }
    handleHideConfirm();
  }

  const columnasEmpresas = [
    { key: "id_empresa", titulo: "ID" },
    { key: "nombre_empresa", titulo: "Nombre" },
    { key: "direccion", titulo: "Dirección" },
    { key: "telefono", titulo: "Teléfono" },
  ];

  return (
    <>
      <PageTitle Icon={FaEdit} label="Listado de Empresas" />
      <CustomTable
        datos={empresas}
        columnas={columnasEmpresas}
        onEditar={(item) => item && handleEditar(item.id_empresa)}
        onEliminar={(item) => item && handleShowConfirm(item)}
        isLoading={isLoadingEmpresas}
        shouldShowActions={(item) => {
          if (!item) return false;
          if ("status" in item) return item.status === "active";
          if ("activo" in item) return item.activo;
          return true;
        }}
        rowClassName={(item) => {
          if (!item) return "";
          if ("status" in item && item.status === "inactive") return "inactive-row";
          if ("activo" in item && !item.activo) return "inactive-row";
          return "";
        }}
      />

      <ConfirmDialog
        show={showConfirm}
        onHide={handleHideConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Empresas"
        message={`¿Estás seguro de que deseas eliminar la empresa "${selectedItem?.nombre_empresa}"?`}
      />
    </>
  );
}