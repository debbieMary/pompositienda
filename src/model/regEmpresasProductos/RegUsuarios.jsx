import React from "react";
import { FaUser } from "react-icons/fa";
import { useRegistro } from "../../hooks/useRegistroUsuario";
import { useAuth } from "../../context/AuthContext";
import { convertToTimestamp } from "../../utils/UtilFunctions";
import { useNavigate } from "react-router-dom";
import CustomBorder from "../../ui/CustomBorder";
import CustomRegisterForm from "../../ui/CustomRegisterForm";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import PageTitle from "../../ui/PageTitle";

export default function RegUsuarios() {
  const {
    mutate,
    isPending: isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useRegistro();

  const { usuario: user_admin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (usuario) => {
    usuario.id_usuario = `cli${usuario.ci_usuario}`;
    usuario.fecha_nac_usuario = convertToTimestamp(usuario.fecha_nac_usuario);
    usuario.usuario_creador = user_admin.id_usuario;
    usuario.status = "active";
    console.log(usuario);
    mutate(usuario);
  };

  function reload() {
    reset();
    navigate(location.pathname, { replace: true });
  }

  if (isSuccess) {
    reload();
  }

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
        <CustomRegisterForm onSubmit={onSubmit} needs_role_selector={true}/>
      </CustomBorder>
    </div>
  );
}
