import { useCategorias } from "../../hooks/useCategorias";
import { useEmpresas } from "../../hooks/useEmpresas";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import { useEffect, useState } from "react";
import RegEmpresas from "./regEmpresas";
import RegCategorias from "./RegCategorias";
import { useAuth } from "../../context/AuthContext";
import RegProductos from "./RegProductos";

export default function RegEmpresasProductos() {
  const {
    data: empresas,
    isLoading: isLoadingEmpresas,
    error: errorEmpresas,
  } = useEmpresas();


  const tabStyle = {
  padding: "10px 20px",
  marginRight: "5px",
  border: "none",
  backgroundColor: "var(--pomp-plomo)",
  color: "var(--pomp-plomo-xoscuro)",
  cursor: "pointer",
  borderRadius: "5px 5px 0 0",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: "var(--pomp-turquesa)",
  color: "var(--pomp-white)",
};

  const { usuario } = useAuth();

  const {
    data: categorias,
    isLoading: isLoadingCategorias,
    error: errorCategorias,
  } = useCategorias();

  const [categorias_nuevas, set_categorias_nuevas] = useState([]);
  const [empresas_nuevas, set_empresas_nuevas] = useState([]);
  const [activeTab, setActiveTab] = useState("categorias"); // Estado para la pestaña activa

  useEffect(() => {
    if (categorias) {
      set_categorias_nuevas(
        categorias.map((categoria) => ({
          value: categoria.id_categoria,
          label: categoria.nombre_categoria,
        }))
      );
    } else {
      set_categorias_nuevas([]);
    }
  }, [categorias]);

  useEffect(() => {
    if (empresas) {
      set_empresas_nuevas(
        empresas.map((empresa) => ({
          value: empresa.id_empresa,
          label: empresa.nombre_empresa,
        }))
      );
    } else {
      set_empresas_nuevas([]);
    }
  }, [empresas]);

  if (isLoadingEmpresas || isLoadingCategorias) {
    return <CustomSpinner> Cargando datos...</CustomSpinner>;
  }

  if (errorEmpresas || errorCategorias) {
    return (
      <ErrorComponent
        titulo="Lo sentimos!!!"
        subtitulo="No pudimos cargar los datos"
        mensaje="Inténtelo luego"
        to="/"
        buttonLabel="Volver al Inicio"
      />
    );
  }

  return (
    <div className="container">
      {/* Navegación por pestañas */}
      <div className="tabs-container" style={{ marginBottom: "20px" }}>
        <button
          className={`tab-button ${activeTab === "categorias" ? "active" : ""}`}
          onClick={() => setActiveTab("categorias")}
          style={activeTab === "categorias" ? activeTabStyle : tabStyle}
        >
          Categorías
        </button>
        <button
          className={`tab-button ${activeTab === "empresas" ? "active" : ""}`}
          onClick={() => setActiveTab("empresas")}
          style={activeTab === "empresas" ? activeTabStyle : tabStyle}
        >
          Empresas
        </button>
        <button
          className={`tab-button ${activeTab === "productos" ? "active" : ""}`}
          onClick={() => setActiveTab("productos")}
          style={activeTab === "productos" ? activeTabStyle : tabStyle}
        >
          Productos
        </button>


         <button
          className={`tab-button ${activeTab === "listas" ? "active" : ""}`}
          onClick={() => setActiveTab("listas")}
          style={activeTab === "listas" ? activeTabStyle : tabStyle}
        >
          Listas
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="tab-content">
        {activeTab === "categorias" && (
          <RegCategorias categorias_nuevas={categorias_nuevas} id_usuario={usuario.id_usuario} />
        )}
        {activeTab === "empresas" && (
          <RegEmpresas categorias_nuevas={categorias_nuevas} id_usuario={usuario.id_usuario} />
        )}
        {activeTab === "productos" && (
          <RegProductos empresas_nuevas={empresas_nuevas} categorias_nuevas={categorias_nuevas} id_usuario={usuario.id_usuario} />
        )}
        {activeTab === "productos" && (
          <RegProductos empresas_nuevas={empresas_nuevas} categorias_nuevas={categorias_nuevas} id_usuario={usuario.id_usuario} />
        )}
        {activeTab === "listas" && (
         <div>Listas</div>
         )}
      </div>
    </div>
  );
}
