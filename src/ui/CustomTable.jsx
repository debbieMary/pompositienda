import React from "react";
import CustomSpinner from "./CustomSpinner";
import EmptyData from "./EmptyData";

export default function CustomTable({
  datos = [],
  columnas,
  onEditar,
  onEliminar,
  isLoading = false,
  shouldShowActions = null, // Cambiado a null para manejo más claro
  rowClassName = null
}) {
  // Funciones por defecto
  const defaultShouldShowActions = () => true;
  const defaultRowClassName = () => "";

  // Usamos las funciones proporcionadas o las por defecto
  const showActionsFn = shouldShowActions || defaultShouldShowActions;
  const rowClassNameFn = rowClassName || defaultRowClassName;

  if (isLoading) {
    return (
      <CustomSpinner/>
    );
  }

  if (!datos || datos.length === 0) {
    return <EmptyData titulo="No existen datos aún" />;
  }

  return (
    <div className="custom-table-container">
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              {columnas.map((columna) => (
                <th key={columna.key} className={columna.className || ''}>
                  {columna.titulo}
                </th>
              ))}
              {(onEditar || onEliminar) && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => {
              const shouldShow = showActionsFn(item);
              const className = rowClassNameFn(item);
              
              return (
                <tr 
                  key={item.id || item.id_producto || item.id_categoria}
                  className={className}
                >
                  {columnas.map((columna) => (
                    <td 
                      key={`${item.id}-${columna.key}`} 
                      data-label={columna.titulo}
                      className={columna.className || ''}
                    >
                      <div className="cell-content">
                        {columna.formato
                          ? columna.formato(item[columna.key], item)
                          : item[columna.key]}
                      </div>
                    </td>
                  ))}
                  
                  {(onEditar || onEliminar) && (
                    <td data-label="Acciones">
                      {shouldShow && (
                        <div className="actions-container">
                          {onEditar && (
                            <button
                              onClick={() => onEditar(item)}
                              className="btn-edit"
                              disabled={!shouldShow}
                            >
                              Editar
                            </button>
                          )}
                          {onEliminar && (
                            <button
                              onClick={() => onEliminar(item)}
                              className="btn-delete"
                              disabled={!shouldShow}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



CustomTable.defaultProps = {
  datos: [],
  isLoading: false,
  shouldShowActions: null,
  rowClassName: null
};