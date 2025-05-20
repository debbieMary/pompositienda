import React from 'react'
import ErrorComponent from '../../ui/ErrorComponent';

export default function NoAutorizado() {
const error = {
    titulo: "Unauthorized",
    sutitulo: "¡Página no autorizada!",
    mensaje:
      "Lo sentimos, no puedes acceder a la página que estás buscando.",
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
