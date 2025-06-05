import React, { useEffect } from "react";
import CustomBorder from "../../ui/CustomBorder";
import CustomSpinner from "../../ui/CustomSpinner";
import PageTitle from "../../ui/PageTitle";
import { FaUser } from "react-icons/fa";
import { convertToTimestamp } from "../../utils/UtilFunctions";
import { useRegistro } from "../../hooks/useRegistroUsuario";
import ErrorComponent from "../../ui/ErrorComponent";
import { useNavigate } from "react-router-dom";
import CustomRegisterForm from "../../ui/CustomRegisterForm";

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
  const navigate = useNavigate();

  const onSubmit = (usuario) => {
    usuario.id_usuario = `cli${usuario.ci_usuario}`;
    usuario.rol_usuario = "cliente";
    usuario.fecha_nac_usuario = convertToTimestamp(usuario.fecha_nac_usuario);
    usuario.usuario_creador =`cli${usuario.ci_usuario}`;
    usuario.status ="active";
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
    <div className="w-100">
      <CustomBorder color="turquesa" maxWidth="100%" padding="px-2 py-3">
        <PageTitle label="Registro de Usuario" Icon={FaUser} />
        <CustomRegisterForm onSubmit={onSubmit}/>
      </CustomBorder>
    </div>
  );
}
