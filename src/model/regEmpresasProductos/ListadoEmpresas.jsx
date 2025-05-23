import CustomTable from "../../ui/CustomTable";

export default function ListadoEmpresas({empresas, isLoadingEmpresas}) {
    function handleEditar(id_empresa) {
        console.log("Editar empresa con ID:", id_empresa);
        // Aquí puedes implementar la lógica para editar la empresa
    }
        function handleEliminar(id_empresa) {
        console.log("Eliminar empresa con ID:", id_empresa);
        // Aquí puedes implementar la lógica para eliminar la empresa
    }


 // Configuración de columnas para cada tabla
  const columnasEmpresas = [
    { key: "id_empresa", titulo: "ID" },
    { key: "nombre_empresa", titulo: "Nombre" },
    { key: "direccion", titulo: "Dirección" },
    { key: "telefono", titulo: "Teléfono" },
  ];

  return (
       <CustomTable
          datos={empresas}
          columnas={columnasEmpresas}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          isLoading={isLoadingEmpresas}
        />
  )
}
