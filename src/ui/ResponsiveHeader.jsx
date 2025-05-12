import React, { useState, useEffect } from "react";
import TeddyBear from "./TeddyBear";
import { useAuth } from "../context/AuthContext";

export default function ResponsiveHeader() {
  
  const { usuario} = useAuth();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para calcular el tamaño de los ositos basado en el ancho de pantalla
  const calculateBearSize = () => {
    if (windowSize.width < 576) return "100px"; // Mobile
    if (windowSize.width < 768) return "100px"; // Small tablets
    if (windowSize.width < 992) return "100px"; // Tablets
    if (windowSize.width < 1200) return "250px"; // Small desktop
    return "250px"; // Large desktop
  };

  // Función para calcular posición vertical
  const calculateTopPosition = () => {
    if (windowSize.width < 576) return "15px";
    return "15px";
  };

  const bearSize = calculateBearSize();
  const topPosition = calculateTopPosition();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Osito izquierdo */}
      <div
        className="bg-red"
        style={{
          position: "absolute",
          top: topPosition,
          marginLeft: -10,
          marginTop: 10,
          left: "10px",
          zIndex: 10,
          width: bearSize,
          height: "auto",
          transition: "all 0.3s ease",
        }}
      >
        <TeddyBear />
      </div>

      {/* Osito derecho */}
      <div
        style={{
          position: "absolute",
          top: topPosition,
          right: "10px",
          marginRight: -10,
          marginTop: 10,
          zIndex: 10,
          width: bearSize,
          height: "auto",
          transition: "all 0.3s ease",
        }}
      >
        <TeddyBear />
      </div>

      {/* Header principal */}
      <header
        className="pomp-header p-4 text-center shadow-lg"
        style={{
          zIndex: 5,
          position: "relative",
          paddingTop: `calc(${bearSize} + 10px)`,
          transition: "padding 0.3s ease",
        }}
      >
        <h1 className="display-4 fw-bold mb-0 animate__animated animate__bounceIn">
          <span className="text-white">Bienvenidos a Pompositienda</span>
        </h1>
        {usuario?.nombre1_usuario ? (
          <p className="mb-0 text-white-90">
            ¡Te damos la bienvenida{" "}
            {`${usuario.nombre1_usuario} ${usuario.apellido1_usuario}`}!
          </p>
        ) : (
          <p className="mb-0 text-white-90">
            ¡Tu lugar favorito para comprar con alegría!
          </p>
        )}
      </header>
    </div>
  );
}
