import CustomForm from "../../ui/CustomForm";
import CustomBorder from "../../ui/CustomBorder";
import PageTitle from "../../ui/PageTitle";
import { FaTag } from "react-icons/fa6";
import { getNextCategoryValue } from "../../utils/UtilFunctions";
import { useRegistroCategoria } from "../../hooks/useRegistroCategoria";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
export default function RegCategorias({ categorias_nuevas, id_usuario }) {
  const { mutation, isLoading, isError, error } = useRegistroCategoria();

  function onSubmitCategoria(data) {
    data.id_categoria = getNextCategoryValue(categorias_nuevas);
    data.id_usuario = id_usuario;
    data.status = "active";
    mutation.mutate(data);
    console.log("Datos de la nueva categoría:", data);
  }

  if (isLoading) {
    return <CustomSpinner>Registrando nueva categoría</CustomSpinner>;
  }
  if (isError) {
    console.error("Error al cargar los datos:", error);
    return (
      <ErrorComponent
        titulo="Error"
        subtitulo="No Pudimos Registrar la categoría"
        mensaje="Conéctate con el administrador"
        buttonLabel="Volver al Inicio"
        to="/"
      />
    );
  }

  return (
    <>
      <PageTitle label="Registro de Categorías" Icon={FaTag} />
      <CustomForm onSubmit={onSubmitCategoria}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <CustomForm.Input
                name="nombre_categoria"
                label="Nombre de la Categoría:"
                disabled={isLoading}
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>

            <div className="col-md-6">
              <CustomForm.TextArea
                rows={1}
                name="descripcion"
                label="Descripción de la Categoría:"
                disabled={isLoading}
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>
        </div>
        <CustomForm.Submit>Registrar Nueva Categoría</CustomForm.Submit>
      </CustomForm>
    </>
  );
}
