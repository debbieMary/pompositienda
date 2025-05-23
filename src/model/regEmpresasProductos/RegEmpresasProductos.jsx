import { useCategorias } from "../../hooks/useCategorias";
import { useEmpresas } from "../../hooks/useEmpresas";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import { useEffect, useState } from "react";
import RegEmpresas from "./regEmpresas";
import RegCategorias from "./RegCategorias";
import { useAuth } from "../../context/AuthContext";
import RegProductos from "./RegProductos";
import ListasCatProdEmp from "./ListasCatProdEmp";
import { useProductos } from "../../hooks/useProductos";
import CustomTabs from "../../ui/CustomTabs";
import RegUsuarios from "./RegUsuarios";
import { useAllUsers } from "../../hooks/useAllUsers";

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

  if (isLoadingEmpresas || isLoadingCategorias || isLoadingProductos || isLoadingUsuarios) {
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

  // Define las pestañas y su contenido
  const tabs = [
    {
      id: "categorias",
      label: "Categorías",
      content: (
        <RegCategorias
          categorias_nuevas={categorias_nuevas}
          id_usuario={usuario.id_usuario}
        />
      ),
    },
    {
      id: "empresas",
      label: "Empresas",
      content: (
        <RegEmpresas
          categorias_nuevas={categorias_nuevas}
          id_usuario={usuario.id_usuario}
        />
      ),
    },
    {
      id: "productos",
      label: "Productos",
      content: (
        <RegProductos
          empresas_nuevas={empresas_nuevas}
          categorias_nuevas={categorias_nuevas}
          id_usuario={usuario.id_usuario}
        />
      ),
    },
    {
      id: "usuarios",
      label: "Usuarios",
      content: <RegUsuarios />,
    },

    {
      id: "listas",
      label: "Listas",
      content: (
        <ListasCatProdEmp
          categorias={categorias}
          empresas={empresas}
          productos={productos}
          usuarios={usuarios}
          isLoadingEmpresas={isLoadingEmpresas}
          isLoadingCategorias={isLoadingCategorias}
          isLoadingProductos={isLoadingProductos}
          isLoadingUsuarios={isLoadingUsuarios}
        />
      ),
    },
  ];

  return <CustomTabs tabs={tabs} defaultTab="categorias" />;
}
