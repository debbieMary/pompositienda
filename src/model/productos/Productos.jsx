import React from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import EmptyData from '../../ui/EmptyData';
import PageTitle from "../../ui/PageTitle";
import { useProductos } from '../../hooks/useProductos';
import CustomBorder from '../../ui/CustomBorder';
import CustomSpinner from '../../ui/CustomSpinner';
import CustomProductFilter from  '../../ui/CustomProductFilter';
import ProductoItem from "./ProductoItem"
import ErrorComponent from "../../ui/ErrorComponent"

export default function Productos() {
  const { id_empresa } = useParams();
  const [searchParams] = useSearchParams();
  const id_categoria = searchParams.get("id_categoria");

  const {
    data: productos,
    isLoading,
    error,
  } = useProductos(id_empresa, id_categoria);


console.log("los productos que estan llegando son: ",productos);


  if (isLoading) {
      return (
        <CustomBorder color="salmon">
          <CustomSpinner color="turquesa" size="xlarge">
            Cargando Productos...
          </CustomSpinner>
        </CustomBorder>
      );
    }
  
    if (error) {
      return (
        <ErrorComponent
          titulo={error.message}
          subtitulo="Lo sentimos!!!"
          mensaje="Vuelve a intentarlo luego"
          buttonLabel="Volver al Inicio"
          to="/"
        />
      );
    }


     if (productos?.length === 0) {
        return (
          <EmptyData
            titulo="No hay Productos Cargados"
            buttonLabel="Volver al Inicio"
            to="/"
          />
        );
      }


  return (
    <div className="container py-4">
 <div className="row g-4">
  <PageTitle label="Productos Destacados" Icon={FaShoppingBag} />
  <CustomProductFilter />
  {productos
    .map((singleProduct) => (
      <div key={singleProduct.id_producto} className="col-md-4">
        <ProductoItem producto={singleProduct} />
      </div>
    ))}
</div>
    </div>
  );
}

