import React from "react";
import { useGetAllCompras } from "../../hooks/useGetAllCompras";
import CustomTabs from "../../ui/CustomTabs";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import ListadoDeCompras from "./ListadoDeCompras";
import { useProductos } from "../../hooks/useProductos";
import RegInventario from "./RegInventario";

export default function Inventario() {
  const { data: compras, errorListado, isLoadingListado } = useGetAllCompras();
  const {
    data: productos,
    isLoading: isLoadingProductos,
    error: errorProductos,
  } = useProductos();

  if (isLoadingListado || isLoadingProductos) {
    return <CustomSpinner> Cargando datos...</CustomSpinner>;
  }

  if (errorListado || errorProductos) {
    return (
      <ErrorComponent
        titulo="Lo sentimos!!!"
        subtitulo="No pudimos cargar los datos"
        mensaje="Inténtelo luego"
        to="/"
        buttonLabel="Volver al Inicio"
      />
    );
  }

  const tabs = [
    {
      id: "inventario",
      label: "Registro de Inventario",
      content: (
        <>
          <RegInventario productos={productos} />
        </>
      ),
    },
    {
      id: "listado",
      label: "Listado de Compras",
      content: (
        <>
          <ListadoDeCompras compras={compras} isLoading={isLoadingListado} />
        </>
      ),
    },
  ];
  return <CustomTabs tabs={tabs} defaultTab="inventario" />;
}
