import React, { useEffect, useRef } from "react";
import CustomForm from "../../ui/CustomForm";
import CustomBorder from "../../ui/CustomBorder";
import CustomSpinner from "../../ui/CustomSpinner";
import PageTitle from "../../ui/PageTitle";
import { FaUser } from "react-icons/fa";
import { convertToTimestamp } from "../../utils/UtilFunctions";
import { useRegistro } from "../../hooks/useRegistroUsuario";
import { opcionesCIExp } from "../../utils/MainConstants";
import ErrorComponent from "../../ui/ErrorComponent";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const {
    mutate,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useRegistro();
  const formRef = useRef();
  const navigate = useNavigate();

  const onSubmit = (usuario) => {
    usuario.id_usuario = `cli${usuario.ci_usuario}`;
    usuario.rol_usuario = "cliente";
    usuario.fecha_nac_usuario = convertToTimestamp(usuario.fecha_nac_usuario);
    console.log(usuario);
    mutate(usuario);
  };

  function reload() {
    reset();
    navigate(location.pathname, { replace: true });
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("Datos recibidos:", data);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      window.dispatchEvent(new Event("localStorageUpdated"));
      navigate("/productos"); // Ajusta esta ruta según necesites
    }
  }, [isSuccess, data, navigate]);

  if (isError)
    return (
      <ErrorComponent
        titulo={error.message}
        subtitulo="Pudo ser un problema de conexión o mal ingreso de datos."
        onClick={reload}
        buttonLabel="Volver a intentarlo"
      />
    );

  if (isLoading)
    return <CustomSpinner>Registrando a nuevo usuario...</CustomSpinner>;

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <CustomBorder color="turquesa">
        <PageTitle label="Registro de Usuario" Icon={FaUser} />
        <CustomForm ref={formRef} onSubmit={onSubmit}>
          <CustomForm.Input
            name="nombre1_usuario"
            label="Primer Nombre:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="nombre2_usuario"
            label="Segundo Nombre:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="apellido1_usuario"
            label="Apellido Paterno:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="apellido2_usuario"
            label="Apellido Materno:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="ci_usuario"
            label="Cédula de Identidad:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Select
            name="exp_ci_usuario"
            label="Lugar de Expedición:"
            options={opcionesCIExp}
            validation={{ required: "Debe seleccionar un país" }}
          />

          <CustomForm.Input
            name="celular_usuario"
            label="Número de Celular:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="email_usuario"
            label="Correo Electrónico:"
            type="email"
            validation={{
              required: "El correo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido",
              },
            }}
          />

          <CustomForm.Input
            name="password_usuario"
            label="Contraseña:"
            type="password"
            validation={{
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            }}
          />

          <CustomForm.DatePicker
            name="fecha_nac_usuario"
            label={"Fecha de Nacimiento:" + "\u00A0\u00A0\u00A0"}
            validation={{ required: "Debe ingresar su fecha de nacimiento" }}
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />

          <CustomForm.Submit>Registrarme</CustomForm.Submit>
        </CustomForm>
      </CustomBorder>
    </div>
  );
}
