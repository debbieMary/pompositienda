import { useRegistrarEmpresa } from "../../hooks/useRegistroEmpresas";
import { MAIN_URL } from "../../utils/MainConstants";
import toast from "react-hot-toast";
import { FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../ui/CustomForm";
import CustomBorder from "../../ui/CustomBorder";
import PageTitle from "../../ui/PageTitle";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";

export default function RegEmpresas({ categorias_nuevas, id_usuario }) {
  const navigate = useNavigate();

  const { mutation, isLoading, isError, error } = useRegistrarEmpresa();

  const onSubmitEmpresa = (data) => {
    data.id_empresa = `emp${data.razon_social}`;
    data.id_usuario = id_usuario;
    data.status = "active";
    console.log("Datos de la nueva empresa:", data);
    mutation.mutate(data, {
      onSuccess: (muybien) => {
        console.log("Registro exitoso:", muybien);
        toast.success("Registro exitoso");
        navigate("/empresas");
      },
      onError: (error) => {
        toast.error("Error al registrar los datos" + error.message);
      },
    });
  };

  if (isLoading)
    return <CustomSpinner>Registrando nueva Empresa</CustomSpinner>;
  if (isError) {
    console.error("Error al cargar los datos:", error);
    return (
      <ErrorComponent
        titulo="Error"
        subtitulo="No Pudimos Registrar a la empresa"
        mensaje="Conéctate con el administrados"
        buttonLabel="Volver al Inicio"
        to="/"
      />
    );
  }

  return (
    <>
      <PageTitle label="Registro de Empresas" Icon={FaBuilding} />

      <CustomForm onSubmit={onSubmitEmpresa}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <CustomForm.Input
                name="razon_social"
                label="Razón Social:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="nombre_empresa"
                label="Nombre de la Empresa:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.TextArea
                name="descripcion"
                rows={1}
                label="Descripción"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CustomForm.Select
                name="id_categoria"
                label="Categoría:"
                options={categorias_nuevas}
                validation={{ required: "Debe seleccionar una categoría" }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="direccion"
                label="Dirección:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="telefono"
                label="Teléfono:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <CustomForm.Input
                name="facebook"
                label="Facebook:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="instagram"
                label="Instagram:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="tiktok"
                label="Tik Tok:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CustomForm.ImageUpload
                name="imagen_1"
                label="Imagen de la Empresa:"
                validation={{ required: "La imagen es obligatoria" }}
              />
            </div>
            <div className="col-md-4">
              <CustomForm.Input
                name="web"
                label="Página Web:"
                validation={{
                  required: "El Campo es Requerido",
                }}
              />
            </div>
          </div>
        </div>

        <CustomForm.Submit>Registrar Empresa</CustomForm.Submit>
      </CustomForm>
    </>
  );
}
