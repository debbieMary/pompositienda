import React, { useState } from "react";
import VentasPorDia from "./VentasPorFecha.jsx";
import CustomForm from "../../ui/CustomForm.jsx";
import CustomBorder from "../../ui/CustomBorder.jsx";
import RegistrosDiarios from "./RegistrosUsersPorFecha.jsx";
import toast from "react-hot-toast";
import PageTitle from "../../ui/PageTitle.jsx";
import { FaCalendar, FaChartBar } from "react-icons/fa";
import {
  convertToLiteralDay,
  convertToTimestamp,
} from "../../utils/UtilFunctions.jsx";
import VentasDetalle from "./VentasDetalle.jsx";

export default function Admin() {
  const defaultStart = new Date();
  defaultStart.setHours(0, 0, 1, 0); // 00:00:01

  const defaultEnd = new Date();
  defaultEnd.setHours(23, 59, 59, 999); // 23:59:59

  const [rangoFechas, setRangoFechas] = useState({
    inicio: convertToTimestamp(defaultStart),
    fin: convertToTimestamp(defaultEnd),
  });

  console.log("RANGO DE FECHAS", rangoFechas);

  function onsubmit(data) {
    const fechaInicio = new Date(data.fecha_inicio);
    fechaInicio.setHours(0, 0, 1, 0); // 00:00:01

    const fechaFin = new Date(data.fecha_fin);
    fechaFin.setHours(23, 59, 59, 999); // 23:59:59

    if (fechaFin < fechaInicio) {
      toast.error("Debe elegir un rango de fechas válido");
      return;
    }

    setRangoFechas({
      inicio: convertToTimestamp(fechaInicio),
      fin: convertToTimestamp(fechaFin),
    });
    console.log(rangoFechas);
  }

  return (
    <>
      <CustomForm onSubmit={onsubmit}>
        <PageTitle
          label={`Estadísticas de en rango de fechas: ${convertToLiteralDay(
            rangoFechas.inicio.split(" ")[0]
          )} al ${convertToLiteralDay(rangoFechas.fin.split(" ")[0])}`}
          Icon={FaCalendar}
        />
        <div className="row">
          <div className="col-6">
            <CustomForm.DatePicker
              name="fecha_inicio"
              label={"Fecha Inicio:" + "\u00A0\u00A0\u00A0"}
              validation={{ required: "Debe ingresar la fecha de inicio" }}
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
            />
          </div>
          <div className="col-6">
            <CustomForm.DatePicker
              name="fecha_fin"
              label={"Fecha Final:" + "\u00A0\u00A0\u00A0\u00A0"}
              validation={{ required: "Debe ingresar la fecha final" }}
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
            />
          </div>
        </div>

        <CustomForm.Submit>Seleccionar el rango de fechas</CustomForm.Submit>
      </CustomForm>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <VentasPorDia
          fecha_inicio={rangoFechas.inicio}
          fecha_fin={rangoFechas.fin}
        />
        <VentasDetalle
          fecha_inicio={rangoFechas.inicio}
          fecha_fin={rangoFechas.fin}
        />
        <RegistrosDiarios
          fecha_inicio={rangoFechas.inicio}
          fecha_fin={rangoFechas.fin}
        />
      </div>
    </>
  );
}
