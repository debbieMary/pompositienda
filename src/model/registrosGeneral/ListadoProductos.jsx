import { useAuth } from "../../context/AuthContext";
import { useEliminar } from "../../hooks/useEliminar";
import CustomTable from "../../ui/CustomTable";
import { ConfirmDialog } from "../../ui/ConfirmDialog"; 
import { useState } from "react";
import PageTitle from "../../ui/PageTitle";
import { FaEdit } from "react-icons/fa";

export default function ListadoProductos({ productos, isLoadingProductos }) {
  const { usuario } = useAuth();
  const eliminarMutation = useEliminar();


    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

  function handleEditar(id_producto) {
    console.log("Editar producto con ID:", id_producto);
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
      tipo: "producto",
      id: selectedItem.id_producto,
      id_usuario: usuario.id_usuario,
    });
    }
    handleHideConfirm();
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
    <>
    <PageTitle label="Listado de Productos" Icon={FaEdit}/>
      <CustomTable
        datos={productos}
        columnas={columnasProductos}
        onEditar={(item) => item && handleEditar(item.id_producto)}
        onEliminar={(item) => item && handleShowConfirm(item)}
        isLoading={isLoadingProductos}
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
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar la empresa "${selectedItem?.nombre_producto}"?`}
      />
    </>
  );
}
