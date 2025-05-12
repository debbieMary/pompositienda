import React from "react";

import ButtonLink from "../../ui/ButtonLink";

import ErrorIcon from "../../ui/ErrorIcon";
import CustomBorder from "../../ui/CustomBorder";
import ErrorComponent from "../../ui/ErrorComponent";

export default function PageNotFound() {
  const error = {
    titulo: "404",
    sutitulo: "¡Página no encontrada!",
    mensaje:
      "Lo sentimos, la página que estás buscando no existe o ha sido movida.",
    to: "/",
    buttonLabel: "Volver al inicio",
  };

  return (
    <ErrorComponent
      titulo={error.titulo}
      subtitulo={error.sutitulo}
      mensaje={error.mensaje}
      buttonLabel={error.buttonLabel}
      to={error.to}
    />
  );
}
