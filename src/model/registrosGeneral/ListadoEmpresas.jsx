import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import CustomTable from "../../ui/CustomTable";
import { ConfirmDialog } from "../../ui/ConfirmDialog"; // Asegúrate de tener esta ruta correcta
import { FaEdit } from "react-icons/fa";
import PageTitle from "../../ui/PageTitle";
import { CustomModal } from "../../ui/CustomModal";
import { useActualizar } from "../../hooks/useActualizar";

export default function ListadoEmpresas({ empresas, isLoadingEmpresas }) {
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { mutate: actualizar} = useActualizar();  
   

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
        tipo: "empresa",
        id: selectedItem.id_empresa,
        id_usuario: usuario.id_usuario,
      });
    }
    handleHideConfirm();
  }

  const handleSave = (datos) => {
    console.log("Datos finales a guardar:", {
      id_empresa: datos.id_empresa,
      
      tipo:"empresa"
    });

   const datosActualizados= {
     nombre_empresa: datos.nombre_empresa,
      descripcion: datos.descripcion,
      direccion: datos.direccion,
      telefono: datos.telefono,
    };

     actualizar({
      tipo: 'empresa',
      id: datos.id_empresa,
      id_usuario: usuario.id_usuario,
      datos: datosActualizados,
    });

    setShowModal(false);
  };

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
        onEditar={handleEditar}
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
        title="Eliminar Empresas"
        message={`¿Estás seguro de que deseas eliminar la empresa "${selectedItem?.nombre_empresa}"?`}
      />

      <CustomModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        entityType="empresa"
        entityData={selectedItem}
        onSave={(data) => {
          handleSave(data);
        }}
      />
    </>
  );
}
