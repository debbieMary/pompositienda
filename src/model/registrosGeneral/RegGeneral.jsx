import { useCategorias } from "../../hooks/useCategorias";
import { useEmpresas } from "../../hooks/useEmpresas";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import { useEffect, useState } from "react";
import RegEmpresas from "./RegEmpresas";
import RegCategorias from "./RegCategorias";
import { useAuth } from "../../context/AuthContext";
import RegProductos from "./RegProductos";
import ListadoCategorias from "./ListadoCategorias";
import { useProductos } from "../../hooks/useProductos";
import CustomTabs from "../../ui/CustomTabs";
import RegUsuarios from "./RegUsuarios";
import { useAllUsers } from "../../hooks/useAllUsers";
import ListadoEmpresas from "./ListadoEmpresas";
import ListadoProductos from "./ListadoProductos";
import ListadoUsuarios from "./ListadoUsuarios";

export default function RegEmpresasProductos() {
  const {
    data: empresas,
    isLoading: isLoadingEmpresas,
    error: errorEmpresas,
  } = useEmpresas();

  const {
    data: usuarios,
    isLoading: isLoadingUsuarios,
    error: errorUsuarios,
  } = useAllUsers();

  const {
    data: productos,
    isLoading: isLoadingProductos,
    error: errorProductos,
  } = useProductos();

  const { usuario } = useAuth();

  const {
    data: categorias,
    isLoading: isLoadingCategorias,
    error: errorCategorias,
  } = useCategorias();

  const [categorias_nuevas, set_categorias_nuevas] = useState([]);
  const [empresas_nuevas, set_empresas_nuevas] = useState([]);

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

  if (
    isLoadingEmpresas ||
    isLoadingCategorias ||
    isLoadingProductos ||
    isLoadingUsuarios
  ) {
    return <CustomSpinner> Cargando datos...</CustomSpinner>;
  }

  if (errorEmpresas || errorCategorias || errorProductos || errorUsuarios) {
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



  const tabs = [
    {
      id: "categorias",
      label: "Gestión de Categorías",
      content: (
        <>
          <RegCategorias
            categorias_nuevas={categorias_nuevas}
            id_usuario={usuario.id_usuario}
          />
          <ListadoCategorias
            categorias={categorias}
            isLoadingCategorias={isLoadingCategorias}
          />
        </>
      ),
    },
    {
      id: "empresas",
      label: "Gestión de Empresas",
      content: (
        <>
          <RegEmpresas
            categorias_nuevas={categorias_nuevas}
            id_usuario={usuario.id_usuario}
          />
          <ListadoEmpresas
            empresas={empresas}
            isLoadingEmpresas={isLoadingEmpresas}
          />
        </>
      ),
    },
    {
      id: "productos",
      label: "Gestión de Productos",
      content: (
        <>
          <RegProductos
            empresas_nuevas={empresas_nuevas}
            categorias_nuevas={categorias_nuevas}
            id_usuario={usuario.id_usuario}
          />
          <ListadoProductos
            productos={productos}
            isLoadingProductos={isLoadingProductos}
          />
        </>
      ),
    },
    {
      id: "usuarios",
      label: "Gestión de Usuarios",
      content: (
        <>
          <RegUsuarios />
          <ListadoUsuarios
            usuarios={usuarios}
            isLoadingUsuarios={isLoadingUsuarios}
          />
        </>
      ),
    },

  ];

  return <CustomTabs tabs={tabs} defaultTab="categorias" />;
}
