import { useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useEmpresas } from '../hooks/useEmpresas';
import { useCategorias } from '../hooks/useCategorias';

export default function FiltroExclusivo() {
  const { id_empresa: empresaParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estado inicial basado en la URL
  const initialFilterType = empresaParam ? 'empresa' : searchParams.get('id_categoria') ? 'categoria' : null;

  const [filterType, setFilterType] = useState(initialFilterType);
  const [selectedValue, setSelectedValue] = useState(
    initialFilterType === 'empresa' ? empresaParam || '' :
    initialFilterType === 'categoria' ? searchParams.get('id_categoria') || '' : ''
  );

  const {
    data: empresas,
    isLoading: isLoadingEmpresas,
    error: errorEmpresas
  } = useEmpresas();

  const {
    data: categorias,
    isLoading: isLoadingCategorias,
    error: errorCategorias
  } = useCategorias();

  if (isLoadingEmpresas || isLoadingCategorias) {
    return <div className="alert alert-dark">Cargando filtros...</div>;
  }

  if (errorEmpresas || errorCategorias) {
    return <div className="alert alert-danger">Error cargando filtros</div>;
  }

  const handleFilterTypeChange = (type) => {
    const newType = filterType === type ? null : type;
    setFilterType(newType);
    setSelectedValue('');
    
    // Limpiar la URL al cambiar el tipo de filtro
    navigate('/productos');
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    
    // Actualizar URL según el tipo de filtro seleccionado
    if (filterType === 'empresa') {
      // Formato: /productos/emp002
      navigate(`/productos/${value}`);
    } else {
      // Formato: /productos?id_categoria=cat002
      const params = new URLSearchParams();
      if (value) {
        params.set('id_categoria', value);
      }
      navigate(`/productos?${params.toString()}`);
    }
  };

  const resetFilters = () => {
    setFilterType(null);
    setSelectedValue('');
    navigate('/productos');
  };

  return (
    <div className="container-fluid p-3 mb-4 py-4 rounded">
      <div className="row g-3 align-items-end">
        {/* Selector de tipo de filtro */}
        <div className="col-md-12">
          <div className="btn-group w-100">
            <button
              type="button"
              className={`btn ${filterType === 'empresa' ? 'active' : ''}`}
              onClick={() => handleFilterTypeChange('empresa')}
              style={{
                backgroundColor: filterType === 'empresa' ? 'var(--pomp-turquesa)' : 'transparent',
                color: filterType === 'empresa' ? 'white' : 'var(--pomp-turquesa-dark)',
                borderColor: 'var(--pomp-turquesa)'
              }}
            >
              Filtrar por Empresa
            </button>
            <button
              type="button"
              className={`btn ${filterType === 'categoria' ? 'active' : ''}`}
              onClick={() => handleFilterTypeChange('categoria')}
              style={{
                backgroundColor: filterType === 'categoria' ? 'var(--pomp-turquesa)' : 'transparent',
                color: filterType === 'categoria' ? 'white' : 'var(--pomp-turquesa-dark)',
                borderColor: 'var(--pomp-turquesa)'
              }}
            >
              Filtrar por Categoría
            </button>
          </div>
        </div>

        {/* Selector de valor según el tipo de filtro */}
        {filterType && (
          <div className="col-md-10">
            <label htmlFor="filter-value" 
                   className="form-label fw-bold"
                   style={{ color: 'var(--pomp-turquesa-dark)' }}>
              {filterType === 'empresa' ? 'Seleccione Empresa:' : 'Seleccione Categoría:'}
            </label>
            <select
              id="filter-value"
              value={selectedValue}
              onChange={handleValueChange}
              className="form-select"
              style={{
                border: '2px solid var(--pomp-turquesa)',
                color: 'var(--pomp-turquesa-dark)'
              }}
            >
              <option value="">{filterType === 'empresa' ? 'Todas las empresas' : 'Todas las categorías'}</option>
              {(filterType === 'empresa' ? empresas : categorias)?.map(item => (
                <option key={item[`id_${filterType}`]} value={item[`id_${filterType}`]}>
                  {item[`nombre_${filterType}`]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botón Reset */}
        {filterType && (
          <div className="col-md-2 d-flex">
            <button
              onClick={resetFilters}
              className="btn w-100"
              style={{
                backgroundColor: 'var(--pomp-salmon)',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              Limpiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}