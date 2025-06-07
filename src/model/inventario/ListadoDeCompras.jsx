import React, { useState } from "react";
import { useActualizar } from "../../hooks/useActualizar";
import { useAuth } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import PageTitle from "../../ui/PageTitle";
import CustomTable from "../../ui/CustomTable";
import { CustomModal } from "../../ui/CustomModal";

export default function ListadoDeCompras({ compras, isLoading }) {
  const { usuario } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { mutate: actualizar } = useActualizar();

  const handleEditar = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSave = (datos) => {
   
    const datosActualizados = {
      nombre_factura: datos.nombre_factura,
      nit_factura: datos.nit_factura,
      estado: datos.estado
    };

    actualizar({
      tipo: "compra_total",
      id: datos.id_compra_total,
      id_usuario: usuario.id_usuario,
      datos: datosActualizados,
    });

    setShowModal(false);
  };

  const columnaCompras = [
    { key: "id_compra_total", titulo: "ID Compra" },
    {
      key: "fecha_compra_total",
      titulo: "Fecha de Compra",
      formato: (fecha) => new Date(fecha).toLocaleDateString(),
    },
    { key: "total", titulo: "Total Bs." },
    {
      key: "nombre_factura",
      titulo: "Nombre",
    },
    { key: "nit_factura", titulo: "NIT" },
    { key: "estado", titulo: "Estado" },
  ];

  return (
    <>
      <PageTitle label="Listado de Compras" Icon={FaEdit} />
      <CustomTable
        datos={compras}
        columnas={columnaCompras}
        onEditar={handleEditar}
        isLoading={isLoading}
        shouldShowActions={(item) => {
          if (!item) return false;
          // Solo mostrar acciones si no está cancelado
          return item.estado !== "cancelado";
        }}
        rowClassName={(item) => {
          if (!item) return "";
          // Aplicar clase especial solo para items cancelados
          return item.estado === "cancelado" ? "inactive-row" : "";
        }}
      />

      <CustomModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        entityType="compras"
        entityData={selectedItem}
        onSave={(data) => {
          handleSave(data);
        }}
      />
    </>
  );
}
