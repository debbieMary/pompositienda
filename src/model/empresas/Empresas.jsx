import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import EmptyData from "../../ui/EmptyData";
import CustomBorder from "../../ui/CustomBorder";
import EmpresaItem from "./EmpresaItem";
import { FaBuilding } from "react-icons/fa";
import PageTitle from "../../ui/PageTitle";
import { useEmpresas } from "../../hooks/useEmpresas";

export default function Empresas() {

  const {
    data: empresas,
    isLoading,
    error,
  } = useEmpresas();

  if (isLoading) {
    return (
      <CustomBorder color="turquesa">
        <CustomSpinner color="salmon" size="xlarge">
          Cargando empresas...
        </CustomSpinner>
      </CustomBorder>
    );
  }

  if (error) {
    return (
      <ErrorComponent
        titulo={error.message}
        subtitulo="Lo sentimos!!!"
        mensaje="Vuelve a intentarlo luego"
        buttonLabel="Volver al Inicio"
        to="/"
      />
    );
  }

  if (empresas.length === 0) {
    return (
      <EmptyData
        titulo="No hay empresas Registradas"
        buttonLabel="Volver al Inicio"
        to="/"
      />
    );
  }

  return (
    <div className="row g-4">
      <PageTitle label="Nuestras Empresas Favoritas" Icon={FaBuilding} />

      {empresas.map((empresa) => (
        <div key={empresa.id_empresa} className="col-lg-4 col-md-6">
          <EmpresaItem empresa={empresa} />
        </div>
      ))}
    </div>
  );
}
