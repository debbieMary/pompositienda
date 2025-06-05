import { FaShoppingBag } from "react-icons/fa";
import CustomBorder from "../../ui/CustomBorder";
import { useRegistrarProducto } from "../../hooks/useRegistroProducto";
import toast from "react-hot-toast";
import CustomForm from "../../ui/CustomForm";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import PageTitle from "../../ui/PageTitle";
import { useNavigate } from "react-router-dom";

export default function RegProductos({
  empresas_nuevas,
  categorias_nuevas,
  id_usuario,
}) {
  const navigate = useNavigate();
  const { mutation, isLoading, isError, error } = useRegistrarProducto();

  function onSubmitEmpresa(data) {
    data.id_producto = `prod_${data.sku_id}`;
    data.id_usuario = id_usuario;
    data.status = "active";
    console.log("Datos del nuevo producto:", data);
    if (Number(data.descuento) >= Number(data.precio)) {
      toast.error("El descuento no puede ser igual o mayor al precio");
      return;
    }
    mutation.mutate(data, {
      onSuccess: (muybien) => {
        console.log("Registro exitoso:", muybien);
        toast.success("Registro de producto exitoso");
        navigate("/productos");
      },
      onError: (error) => {
        toast.error("Error al registrar los datos" + error.message);
      },
    });
  }

  if (isLoading) {
    return <CustomSpinner>Registrando nuevo Producto</CustomSpinner>;
  }

  if (isError) {
    console.error("Error al cargar los datos:", error);
    return (
      <ErrorComponent
        titulo="Error de registro"
        subtitulo="No Pudimos Registrar el producto"
        mensaje="Conéctate con el administrador"
        buttonLabel="Volver al Inicio"
        to="/"
      />
    );
  }
  return (
    <>
      <PageTitle label="Registro de Productos" Icon={FaShoppingBag} />
      <CustomForm onSubmit={onSubmitEmpresa}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <CustomForm.Input
                name="nombre_producto"
                label="Nombre del Producto:"
                disabled={isLoading}
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="precio"
                type="number"
                step="0.01"
                disabled={isLoading}
                label="Precio del Producto:"
                validation={{
                  required: "El Campo es Requerido",
                  min: {
                    value: 1,
                    message: "El precio no puede ser menor a 1",
                  },
                  validate: (value) =>
                    !isNaN(value) || "Debe ser un número válido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.TextArea
                name="descripcion"
                rows={1}
                disabled={isLoading}
                label="Descripción del Producto:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CustomForm.Select
                name="id_empresa"
                disabled={isLoading}
                label="Empresa:"
                options={empresas_nuevas}
                validation={{ required: "Debe seleccionar una empresa" }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="descuento"
                label="Descuento:"
                type="number"
                step="0.01"
                disabled={isLoading}
                validation={{
                  required: "El Campo es Requerido",
                  min: {
                    value: 0,
                    message: "El precio no puede ser menor a 0",
                  },
                  validate: (value) =>
                    !isNaN(value) || "Debe ser un número válido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Select
                name="id_categoria"
                disabled={isLoading}
                label="Categoría:"
                options={categorias_nuevas}
                validation={{ required: "Debe seleccionar una categoría" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CustomForm.ImageUpload
                name="imagen_2"
                label="Imagen del Producto:"
                validation={{ required: "La imagen es obligatoria" }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="cantidad_stock"
                disabled={isLoading}
                type="number"
                label="Cantidad en Stock:"
                validation={{
                  required: "El Campo es Requerido",
                  min: {
                    value: 1,
                    message: "La cantidad no puede ser menor a 1",
                  },
                  validate: (value) =>
                    !isNaN(value) || "Debe ser un número válido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="sku_id"
                label="SKU:"
                disabled={isLoading}
                validation={{ required: "El Campo es Requerido" }}
              />
            </div>
          </div>
        </div>

        <CustomForm.Submit>Registrar Producto</CustomForm.Submit>
      </CustomForm>
    </>
  );
}
