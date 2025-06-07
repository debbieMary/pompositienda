import React from "react";
import { FaColumns } from "react-icons/fa";
import CustomForm from "../../ui/CustomForm";
import CustomBorder from "../../ui/CustomBorder";
import PageTitle from "../../ui/PageTitle";
import { useAuth } from "../../context/AuthContext";
import { useInsertInventario } from "../../hooks/useInsertInventario";

export default function RegInventario({ productos }) {
  const { usuario } = useAuth();
  const { mutate } = useInsertInventario();


  function onSubmit(data){
    data.id_usuario= usuario.id_usuario;
    console.log("data", data);
     mutate(data);
  };


  const opcionesProductos = productos.map(producto => ({
  value: producto.id_producto, // Convertir a string (mejor práctica para valores)
  label: producto.nombre_producto
}));

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <CustomBorder color="turquesa" maxWidth="100%">
        <PageTitle label="Registro de Inventario" Icon={FaColumns} />

        <CustomForm onSubmit={onSubmit}>
         { /*<CustomForm.Select
            name="tipo"
            label="Tipo de transacción:"
            options={opcionesTipoRegInventario}
            validation={{ required: "Debe seleccionar un tipo" }}
          />*/
}
          <CustomForm.Select
            name="id_producto"
            label="Producto:"
            options={opcionesProductos}
            validation={{ required: "Debe seleccionar un tipo" }}
          />

          <CustomForm.Input
            name="cantidad"
            type="number"
            label="Cantidad:"
            validation={{
              required: "El Campo es Requerido",
              min: {
                value: 1,
                message: "La cantidad no puede ser menor a 1",
              },
              validate: (value) => !isNaN(value) || "Debe ser un número válido",
            }}
          />

          <CustomForm.TextArea
            name="observaciones"
            label="Observaciones"
            validation={{
              required: "El Campo es Requerido",
            }}
          />

          <CustomForm.Submit>Registrar Inventario</CustomForm.Submit>
        </CustomForm>
      </CustomBorder>
    </div>
  );
}
