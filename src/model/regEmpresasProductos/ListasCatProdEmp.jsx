import { FaList } from "react-icons/fa";
import CustomTable from "../../ui/CustomTable";
import CustomTabs from "../../ui/CustomTabs";
import PageTitle from "../../ui/PageTitle";
import ListadoCategorias from "./ListadoCategorias";
import ListadoEmpresas from "./ListadoEmpresas";
import ListadoProductos from "./ListadoProductos";
import ListadoUsuarios from "./ListadoUsuarios";

export default function ListasCatProdEmp({
  categorias,
  empresas,
  productos,
  usuarios,
  isLoadingEmpresas,
  isLoadingCategorias,
  isLoadingProductos,
  isLoadingUsuarios,
}) {
  const tabs = [
    {
      id: "listado_categorias",
      label: "Categorías",
      content: (
        <ListadoCategorias
          categorias={categorias}
          isLoadingCategorias={isLoadingCategorias}
        />
      ),
    },
    {
      id: "listado_empresas",
      label: "Empresas",
      content: (
        <ListadoEmpresas
          empresas={empresas}
          isLoadingEmpresas={isLoadingEmpresas}
        />
      ),
    },
    {
      id: "listado_productos",
      label: "Productos",
      content: (
        <ListadoProductos
          productos={productos}
          isLoadingProductos={isLoadingProductos}
        />
      ),
    },
    {
      id: "listado_usuarios",
      label: "Usuarios",
      content: (
        <ListadoUsuarios
          usuarios={usuarios}
          isLoadingUsuarios={isLoadingUsuarios}
        />
      ),
    },
  ];

  return (
    <>
      <PageTitle Icon={FaList} label="Listados" />
      <CustomTabs tabs={tabs} defaultTab="listado_categorias" />
    </>
  );
}
