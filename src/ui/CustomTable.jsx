import CustomSpinner from "./CustomSpinner";
import EmptyData from "./EmptyData";

export default function CustomTable({
  datos = [],
  columnas,
  onEditar,
  onEliminar,
  isLoading = false,
  shouldShowActions = null,
  rowClassName = null
}) {
  const defaultShouldShowActions = () => true;
  const defaultRowClassName = () => "";

  const showActionsFn = shouldShowActions || defaultShouldShowActions;
  const rowClassNameFn = rowClassName || defaultRowClassName;

  if (isLoading) {
    return <CustomSpinner/>;
  }

  if (!datos || datos.length === 0) {
    return <EmptyData titulo="No existen datos aún" buttonLabel="Volver al inicio" to="/"/>;
  }

  // Función mejorada para generar keys únicas incluso con datos duplicados
  const generateUniqueKey = (item, index) => {
    // Intenta con todos los posibles IDs conocidos
    const possibleIds = [
      item.id,
      item.id_producto,
      item.id_categoria,
      item.id_empresa,
      item.id_usuario
    ].filter(Boolean); // Filtra valores falsy
    
    // Si encuentra algún ID, lo usa con el índice como respaldo
    if (possibleIds.length > 0) {
      return `row-${possibleIds[0]}-${index}`;
    }
    
    // Si no hay IDs, genera un hash único basado en contenido + índice
    const contentHash = columnas.reduce((acc, col) => {
      return acc + (item[col.key] ? item[col.key].toString() : '');
    }, '');
    
    return `row-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${contentHash}`;
  };

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
            {datos.map((item, index) => {
              const shouldShow = showActionsFn(item);
              const className = rowClassNameFn(item);
              const rowKey = generateUniqueKey(item, index);
              
              return (
                <tr key={rowKey} className={className}>
                  {columnas.map((columna) => (
                    <td 
                      key={`${rowKey}-${columna.key}`}
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