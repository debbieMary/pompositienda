import React from 'react';
import CustomBorder from './CustomBorder';
import ErrorIcon from './ErrorIcon';
import ButtonLink from './ButtonLink';

export default function ErrorComponent({titulo, subtitulo, mensaje, buttonLabel, to, onClick}) {
  return (
    <CustomBorder>
          {/* Icono de error */}
          <ErrorIcon />
          {/* Título */}
          <h2
            className="display-4 fw-bold mb-2"
            style={{ color: "var(--pomp-turquesa)" }}
          >
            {titulo}
          </h2>
    
          {/* Subtítulo */}
          <h2 className="mb-2" style={{ color: "var(--pomp-salmon)" }}>
           {subtitulo}
          </h2>
    
          {/* Mensaje */}
          <p className="lead mb-4" style={{ color: "var(--pomp-plomo-xoscuro)" }}>
            {mensaje}
          </p>
    
          {/* Botón de regreso */}
          <ButtonLink to={to} onClick={onClick}>{buttonLabel}</ButtonLink>
        </CustomBorder>
  )
}
