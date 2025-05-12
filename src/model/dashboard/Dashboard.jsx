import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h2 className="text-primary mb-4">Bienvenidos a Pompositienda</h2>

      <p className="text-plomo mb-4">
        Pompositienda es un rinconcito mágico donde encontrarás artículos únicos
        y encantadores de distintas categorías, desde accesorios adorables hasta
        detalles especiales que alegran tu día. ¡Todo en un solo lugar, pensado
        para ti y tu estilo pomposo!
      </p>
      <div align="center">
        <img src="banner.jpg" className="w-100" />
      </div>

      <h3 className="text-primary my-4">
        Escoge el Producto de tu Empresa Favorita
      </h3>

      <p className="text-plomo">
        ¿No sabes qué producto elegir? ¡No te preocupes! Conoce nuestras
        <Link
          to="/empresas"
          className="text-decoration-underline text-secondary fw-bold mx-1"
        >
          empresas
        </Link>
        {" "}y descubre todos los
        <Link
          to="/productos"
          className="text-decoration-underline text-secondary fw-bold ms-1"
        >
          productos
        </Link>
        {" "}que tenemos para ti.
      </p>
    </>
  );
}
